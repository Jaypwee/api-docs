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