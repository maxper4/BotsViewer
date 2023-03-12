var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const ipc = require('node-ipc');
const config = require("./config");
const { writeFileSync } = require("fs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var availablesBotsRouter = require("./routes/availablesBots");
var runningBotsRouter = require("./routes/runningBots");
var botsInfosRouter = require("./routes/botsInfos");
var contactorRouter = require("./routes/bots/contactor");

var app = express();

ipc.config.id = "bots-viewer";
ipc.config.retry = 1500;
ipc.config.silent = false;

config.runningBots = [];

config.AVAILABLE_BOTS.map(bot => {
  try{
    ipc.connectToNet(bot.ipcServerName, bot.ipcServerPort);

    ipc.of[bot.ipcServerName].on("disconnect", () => {
      if(config.runningBots.includes(bot.name)){
        config.runningBots = config.runningBots.filter(name => name !== bot.name);
      }
    });

    ipc.of[bot.ipcServerName].on("connect", () => {
      const handler = (data) => {
        if (data === "good") {
          if(!config.runningBots.includes(bot.name))
            config.runningBots.push(bot.name);
          ipc.of[bot.ipcServerName].off("test-running", handler);
        }
      };

      ipc.of[bot.ipcServerName].on("test-running", handler);

      ipc.of[bot.ipcServerName].emit("test-running", "");
    });
  }
  catch{
    
  }
});

const saveConfig = () => {
  writeFileSync("./config.json", JSON.stringify(config, null, 4));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("config", config);
app.set("ipc", ipc);
app.set("saveConfig", saveConfig);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/availablesBots", availablesBotsRouter);
app.use("/runningBots", runningBotsRouter);
app.use("/botsInfos", botsInfosRouter);
app.use("/contactor", contactorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
