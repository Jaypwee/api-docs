---
title: Hanbitco API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Introduction

## Authentication request

> Payload consists of the following:

```json
  {
    "access_key": "Issued access key (required)",
    "nonce": "Current time, epoch milliseconds (required)",
    "query": "Parameter's querystring (required if parameters are available)"
  }
```


When requesting a Private API, generate a token with the issued Client Id and Client Secret and send it through the Authorization header. The token to register in the Authorization header follows the [JWT](https://jwt.io)

HS256 is recommended for signing, and the secret key issued as a secret is used.

<aside class="warning">
The query value of the payload must be a Query String. JSON and other formats are not allowed.
</aside>

<aside class="notice">
Check the secret encoding option when creating the signature. The issued secret key is not encoded in base64. If you are using a JWT related libary, please check the options.
</aside>

>If the parameters are not available

```javascript
const jwt = require("jsonwebtoken");

const payload = {
  clientId: "Issued Client Id",
  nonce: (new Date).getTime()
};

const jwtToken = jwt.sign(payload, "Issued Client Secret");
const authorizationToken = `Bearer ${jwtToken}`;
```

<br/>
<br/>
<br/>
<br/>


<br/>
<br/>
<br/>
<br/>


<br/>
<br/>
<br/>
<br/>

>If the parameters are available

```javascript 
const jwt = require("jsonwebtoken");
const querystring = require("query-string");

const query = queryString.stringify(
  {/* requested parameters */}, 
  { sort: (a, b) => a > b ? 1 : -1 } //QueryString must be alphabetically ordered.
);

const payload = {
  clientId: "Issued Client Id",
  nonce: (new Date).getTime(),
  query: query
};

const jwtToken = jwt.sign(payload, "Issued Secret key");
const authorizationToken = `Bearer ${jwtToken}`;

```

# Public API

## `GET`   Retrieve Orderbook

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/orderbook'
```

> Example Output:

```json-doc
  {
    status: "success",
    data:
    { 
      asks:
        [ 
          [ 
            '0.002776', // PRICE
            '2.5937'    // QTY
          ],
          [ 
            '0.003936',
            '2.3505' 
          ],
        ],
      bids:
        [ 
          [ 
            '0.000041', // PRICE
            '0.6829'    // QTY
          ],
          [ 
            '0.001773', 
            '0.4438' 
          ],
        ] 
    } 
  }
```
 
Retrieves the orderbook for a market with a requested currency_pair. The list of currency pairs can be found on the [currencyPair] section.

###Path Parameters 

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | Used to retrieve the orderbook with the respective currency pair.

## <code class='prefix'>GET</code> Get Trades History

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/trades'
```
```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    id: 1,
    name: "Fluffums",
    "breed: "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Max",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/api/kittens`

### Query Parameters

Parameter | Type | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve

## Delete a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.delete(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -X DELETE
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.delete(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "deleted" : ":("
}
```

This endpoint deletes a specific kitten.

### HTTP Request

`DELETE http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to delete

