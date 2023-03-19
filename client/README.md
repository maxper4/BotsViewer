# client react app

Client is a react app consuming the API. 

You should add a config.json file in the src/utils directory with the following content:

```json
{
  "API_BASE_URL": "http://localhost:3000",
  "BOTS": {
        "bot-1" : {
            "name": "Bot 1",
            "page": "/bot-1"
        },
        "bot-2" : {
            "name": "Bot 2",
            "page": "/bot-2"
        }
    }
}
```