# 개요

## 인증값 생성

> Payload의 구성은 다음과 같습니다.

```json
  {
    access_key: "발급 받은 access key (필수)",
    nonce: "현재 시간, epoch milliseconds (필수)",
    query: "파라미터의 querystring(파라미터가 있을 경우 필수)"
  }
```


Private API 요청 시, 발급 받은 Client Id와 Client Secret으로 token을 생성하여 Authorization 헤더를 통해 전송합니다. Authorization 헤더에 등록 할 token은 JWT(https://jwt.io) 형식을 따릅니다.

서명 방식은 HS256 을 권장하며, secret으로 발급받은 Secret key를 사용합니다.

<aside class="warning">
payload의 query 값은 Query String 이어야 합니다. JSON 및 기타 포멧은 허용되지 않습니다.
</aside>

<aside class="notice">
Signature 생성시 secret encoding 옵션을 확인해주세요. 발급된 secret key는 base64로 encoding 되어있지 않습니다. JWT 관련 library를 사용하신다면 해당 옵션을 확인해주세요.
</aside>

>Parameter가 없을 경우,

```javascript
const jwt = require("jsonwebtoken");

const payload = {
  clientId: "발급받은 Client Id",
  nonce: (new Date).getTime()
};

const jwtToken = jwt.sign(payload, "발급받은 Client Secret");
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

>Parameter가 존재할 경우,

```javascript 
const jwt = require("jsonwebtoken");
const querystring = require("query-string");
const query = queryString.stringify(
  {/* 요청할 파라미터 */}, 
  { sort: (a, b) => a > b ? 1 : -1 } //QueryString은 알파벳 순으로 나열되어야 합니다.
);

const payload = {
  clientId: "발급받은 Client Id",
  nonce: (new Date).getTime(),
  query: query
};

const jwtToken = jwt.sign(payload, "발급받은 Secret key");
const authorizationToken = `Bearer ${jwtToken}`;

```