## Why give up

Because caddy json config is so fuck, but if use Caddyfile is better, so I have a new try with Caddyfile manager ui. I will make it public when I have done it 

let us see the output of the below Caddyfile 

```Caddyfile
http://a.ltd:5001 {
  file_server
}

http://b.ltd:5001, http://a.ltd:5002 {
  file_server
}
```

```json
{
  "apps": {
    "http": {
      "servers": {
        "srv0": {
          "listen": [":5001"],
          "routes": [
            {
              "match": [{ "host": ["a.ltd"] }],
              "handle": [
                {
                  "handler": "subroute",
                  "routes": [
                    {
                      "handle": [
                        { "handler": "file_server", "hide": ["Caddyfile"] }
                      ]
                    }
                  ]
                }
              ],
              "terminal": true
            },
            {
              "match": [{ "host": ["b.ltd"] }],
              "handle": [
                {
                  "handler": "subroute",
                  "routes": [
                    {
                      "handle": [
                        { "handler": "file_server", "hide": ["Caddyfile"] }
                      ]
                    }
                  ]
                }
              ],
              "terminal": true
            }
          ],
          "automatic_https": { "skip": ["a.ltd", "b.ltd"] }
        },
        "srv1": {
          "listen": [":5002"],
          "routes": [
            {
              "match": [{ "host": ["a.ltd"] }],
              "handle": [
                {
                  "handler": "subroute",
                  "routes": [
                    {
                      "handle": [
                        { "handler": "file_server", "hide": ["Caddyfile"] }
                      ]
                    }
                  ]
                }
              ],
              "terminal": true
            }
          ],
          "automatic_https": { "skip": ["a.ltd"] }
        }
      }
    }
  }
}

```
