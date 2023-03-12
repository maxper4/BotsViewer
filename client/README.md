# client react app

Client is a react app consuming the API. 

You should add a config.json file in the src/utils directory with the following content:

```json
{
  "API_BASE_URL": "http://localhost:3000",
  "BOTS_PAGE": {
        "bot1": "/page-bot1",
        "bot2": "/page-bot2"
    }
}
```