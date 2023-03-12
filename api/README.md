# API

You should add a config.json file with the following content:

```json
{
  "PORT": 3000,
  "AVAILABLE_BOTS": [
     {
        "name": "bot1",
        "ipcServerName": "bot1",
        "ipcServerPort": 8000,
        "lastTimePing": 0,
        "ping": 0
      },
      {
        "name": "bot2",
        "ipcServerName": "bot2",
        "ipcServerPort": 8000,
        "lastTimePing": 0,
        "ping": 0
      }
  ],
  "BETWEEN_BOTS_PING": 10000,
  "BOTS_PING_TIMEOUT": 9999
}
```