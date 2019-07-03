# 개인 API

## <code class="get">GET</code> 전체 잔고 조회

```javascript
const request = require("request")
const sign = require("jsonwebtoken").sign

const clientId = `${clientId}`;
const clientSecret =  `${clientSecret}`;

const payload = {
  clientId, 
  nonce: (new Date).getTime()
};

const token = sign(payload, clientSecret);

var options = {
  method: "GET",
  url: "https://user-api.hanbitco.com/v1/balances",
  headers: {Authorization: `Bearer ${token}`}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```
> 예시 응답:

```json
{ status: "success",
  data:
   [ 
     { 
       currency: "BCH", 
       balance: '2.19', 
       tradable: '2.19' 
     },
     { 
       currency: "BTC",
       balance: '34.67261377',
       tradable: '32.14838915' 
     },
     { 
       currency: "EOS",
       balance: '939.60880658',
       tradable: '464.41852158' 
     },
     { 
       currency: "ETH",
       balance: '99.63595433',
       tradable: '98.39185433' 
     } 
   ] 
}
```

계정 지갑의 모든 암호화폐의 전체 및 거래 가능한 잔고를 불러온다.

### HTTP Request

<code class='get'>GET</code> `https://user-api.hanbitco.com/v1/balances`

### 헤더

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | 인증 토큰 `JWT`

### 응답

Key | Type | Description
--------- | ------- | -----------
currency | `string` | 암호화폐 값
balance | `string` | 해당 암호화폐의 전체 잔고
tradable | `string` | 해당 암호화폐의 거래 가능 잔고

## <code class="get">GET</code> 특정 암호화폐 잔고 조회

```javascript
const request = require("request");
const { sign } = require("jsonwebtoken");
const queryString = require("query-string");

const clientId = `${clientId}`;
const clientSecret =  `${clientSecret}`;

const query = queryString.stringify({ currency: "BTC" });

const payload = {
  clientId,
  query,
  nonce: (new Date).getTime(),
};

const token = sign(payload, clientSecret);

var options = {
  method: "GET",
  url: "https://user-api.hanbitco.com/v1/balances?currency=BTC",
  headers: {Authorization: `Bearer ${token}`}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

> Example output:

```json
{
  status: "success",
  data: 
  [
    {
      currency:"BTC",
      balance:'34.67261377',
      tradable:'32.14838915'
    }
  ]
}
```

특정 암호화폐의 잔고와 거래 가능한 잔고를 조회햔다.

### HTTP Request

<code class="get">GET</code>`https://user-api.hanbitco.com/v1/balances?currency=currency`

### Path 파라미터

Parameter | Type | Description
--------- | ------- | -----------
currency | `string` | 암호화폐 값 (e.g BTC) 

### 헤더

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | 인증 토큰 `JWT`  

### 응답

Key | Type | Description
--------- | ------- | -----------
currency | `string` | 암호화폐 값
balance | `string` | 해당 암호화폐의 전체 잔고
tradable | `string` | 해당 암호화폐의 거래 가능한 잔고

## <code class="post">POST</code> 주문 생성

```javascript
const request = require("request");
const { sign } = require("jsonwebtoken");
const queryString = require("query-string");
const uuid = require('uuid/v1');

const clientId = `${clientId}`;
const clientSecret =  `${clientSecret}`;

const body = {
  orderId: uuid(),
  currencyPair: 'pib_btc', 
  side: 'sell', 
  price: '0.00000013', 
  amount: '1000'
};
  
const query = queryString.stringify(body, { sort: (a, b) => a > b ? 1 : -1 });

const payload = {
  clientId,
  query,
  nonce: (new Date).getTime(),
};

const token = sign(payload, clientSecret);

var options = {
  method: "POST",
  url: "https://user-api.hanbitco.com/v1/orders",
  headers: {Authorization: `Bearer ${token}`}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

> Example output:

```json
{
  status:"success",
  data: 
  {
    orderId:"27112ab0-1362-11e9-a084-3756505aeaaf",
    currencyPair:"PIB_BTC",
    side:"SELL",
    type:"LIMIT",
    amount:'1000',
    price:'0.00000013',
    remains:'1000',
    fee:'0.000000195',
    feeRate:'0.0015',
    status:"CREATED",
    timestamp:'1546964790'
  }
}

```

해당 마켓에 매수/매도 주문을 생성한다.

### HTTP Request

<code class="post">POST</code>`https://user-api.hanbitco.com/v1/orders`

### Body 파라미터

Key | Type | Description
--------- | ------- | -----------
orderId | `string` | 주문의 고유 ID `UUID`
currencyPair | `string` | 주문을 생성할 마켓 `예) ETH_BTC`
side | `string` | 주문 종류 `'buy' or 'sell'`
price | `string` | Price of currency per amount
amount | `string` | Amount of currency to buy or sell

### 헤더

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | 인증 토큰 `JWT`  

### 응답

Key | Type | Description
--------- | ------- | -----------
orderId | `string` | 주문의 고유 ID `UUID`
currencyPair | `string` | 마켓 종류 `예) ETH_BTC`
side | `string` | 주문 종류 `"BUY" or "SELL"`
type | `string` | 주문 형태 `"LIMIT"`
amount | `string` | 총 주문 수량
price | `string` | 주문 가격
remains | `string` | 주문 잔량
fee | `string` | 총 주문 수수료
feeRate | `string` | 적용 수수료율
status | `string` | 주문 상태 `예) CREATED`
timestamp | `string` | 주문 생성 시각

## <code class="delete">DELETE</code> 주문 취소

```javascript
const request = require("request");
const { sign } = require("jsonwebtoken");
const queryString = require("query-string");
const uuid = require('uuid/v1');

const clientId = `${clientId}`;
const clientSecret =  `${clientSecret}`;

const body = {
  orderId: "27112ab0-1362-11e9-a084-3756505aeaaf"
};
  
const query = queryString.stringify(body);

const payload = {
  clientId,
  query,
  nonce: (new Date).getTime(),
};

const token = sign(payload, clientSecret);

var options = {
  method: "DELETE",
  url: "https://user-api.hanbitco.com/v1/orders",
  headers: {Authorization: `Bearer ${token}`}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

> 예시 응답:

```json
{
  status:"success",
  data: 
  {
    orderId:"27113ab0-1362-11e9-a084-3756505aeaaf",
    currencyPair:"PIB_BTC",
    side:"SELL",
    type:"LIMIT",
    amount:'1000',
    price:'0.00000013',
    remains:'1000',
    fee:'0.000000195',
    feeRate:'0.0015',
    status:"CANCELING",
    timestamp:'1546964790'
  }
}

```

해당 마켓의 주문을 취소함. 

### HTTP Request

<code class="delete">DELETE</code>`https://user-api.hanbitco.com/v1/orders`

### Body 파라미터

Key | Type | Description
--------- | ------- | -----------
orderId | `string` | 주문의 고유 ID `UUID`

### 헤더

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | 인증 토큰 `JWT`  

### 응답

Key | Type | Description
--------- | ------- | -----------
orderId | `string` | 주문의 고유 ID `UUID`
currencyPair | `string` | 마켓 종류 예) ETH_BTC
side | `string` | 주문 종류 `"BUY" or "SELL"`
type | `string` | 주문 형태 `"LIMIT"`
amount | `string` | 총 주문 수량
price | `string` | 주문 가격
remains | `string` | 주문 잔량
fee | `string` | 총 주문 수수료
feeRate | `string` | 주문 적용 수수료율
status | `string` | 주문 상태 `CREATED`
timestamp | `string` | 주문 생성 시각

## <code class='get'>GET</code> 주문 조회

```javascript
const request = require("request");
const { sign } = require("jsonwebtoken");
const queryString = require("query-string");
const uuid = require('uuid/v1');

const clientId = `${clientId}`;
const clientSecret =  `${clientSecret}`;

const body = {
  currencyPair: 'rep_btc', 
  side: 'sell', 
  limit: 10,
  offset: 0,
};
  
const query = queryString.stringify(body, { sort: (a, b) => a > b ? 1 : -1 });

const payload = {
  clientId,
  query,
  nonce: (new Date).getTime(),
};

const token = sign(payload, clientSecret);

var options = {
  method: "GET",
  url: `https://user-api.hanbitco.com/v1/orders?${query}`,
  headers: {Authorization: `Bearer ${token}`}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

> 예시 응답:

```json
{ 
  status: "success",
  data:
   { 
     items:
      [ 
        { 
          orderId: "a43d4f93-2aa6-11e9-a5c7-b978e9f3ec42",
          currencyPair: "REP_BTC",
          side: "SELL",
          type: "LIMIT",
          amount: '2.3505',
          price: '0.003936',
          remains: '2.3505',
          fee: '0.000004625784',
          feeRate: '0.0005',
          status: "CREATED",
          timestamp: '1549523166' 
        } 
      ],
     offset: '10',
     limit: '1',
     total: '116',
     pageIndex: '10' 
   } 
}

```

해당 마켓의 모든 주문을 LIMIT 값과 OFFSET값에 기반해 주문 정보를 불러온다.

<aside class="notice">
만약 limit 값이 10이고 offset 값이 0이면 해당 API는 최근 10개의 주문을 불러온다. 만약 limit 값이 20이고 offset 값이 1이면, 최근 21번째에서 40번째 주문까지 존재하는 주문 정보를 불러온다.
</aside>



### HTTP Request

<code class="get">GET</code>`https://user-api.hanbitco.com/v1/orders`

### Query 파라미터

Key | Type | Description
--------- | ------- | -----------
currencyPair | `string` | 주문을 생성할 마켓 `예) ETH_BTC`
side | `string` | 주문 종류 `'buy' or 'sell'`
limit | `int32` | API가 불러올 정보 개수 제한
offset | `int32` | 조회할 주문의 offset

### 헤더

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | 인증 토큰 `JWT`  

### 응답

Key | Type | Description
--------- | ------- | -----------
items | array[item] | 조회된 주문 배열
offset | `string` | 현재 조회된 주문의 offset
limit | `string` | 요청된 주문의 조회 개수
total | `string` | 페이징을 제외한 조건에 맞는 총 주문의 개수
pageIndex | `string` | 현재 페이지의 인덱스

### 응답 (Item)

Key | Type | Description
--------- | ------- | -----------
orderId | `string` | 주문의 고유 ID `UUID`
currencyPair | `string` | 마켓 종류 예) ETH_BTC
side | `string` | 주문 종류 `"BUY" or "SELL"`
type | `string` | 주문 형태 `"LIMIT"`
amount | `string` | 총 주문 수량
price | `string` | 주문 가격
remains | `string` | 주문 잔량
fee | `string` | 총 주문 수수료
feeRate | `string` | 주문 적용 수수료율
status | `string` | 주문 상태 `CREATED`
timestamp | `string` | 주문 생성 시각

## <code class='get'>GET</code> 체결 주문 조회

```javascript
const request = require("request");
const { sign } = require("jsonwebtoken");
const queryString = require("query-string");
const uuid = require('uuid/v1');

const clientId = `${clientId}`;
const clientSecret =  `${clientSecret}`;

const body = {
  currencyPair: 'rep_btc', 
  side: 'sell', 
  limit: 1,
  offset: 0,
};
  
const query = queryString.stringify(body, { sort: (a, b) => a > b ? 1 : -1 });

const payload = {
  clientId,
  query,
  nonce: (new Date).getTime(),
};

const token = sign(payload, clientSecret);

var options = {
  method: "GET",
  url: `https://user-api.hanbitco.com/v1/trades?${query}`,
  headers: {Authorization: `Bearer ${token}`}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

> 예시 응답:

```json
{ 
  status: "success",
  data:
   { 
     items:
      [ 
        { 
          tradeId: "a43d4f93-2aa6-11e9-a5c7-b978e9f3ec42",
          currencyPair: "REP_BTC",
          side: "SELL",
          type: "LIMIT",
          amount: '2.1111',
          price: '0.002774',
          fee: '0.000000001384',
          taker: 'SELL
          timestamp: '1549523336' 
        } 
      ],
     offset: '0',
     limit: '1',
     total: '11',
     pageIndex: '0' 
   } 
}

```

해당 마켓에 체결된 모든 주문을 LIMIT 값과 OFFSET값에 기반해 거래 정보를 불러온다.

<aside class="notice">
만약 limit 값이 10이고 offset 값이 0이면 해당 API는 최근 10개의 주문을 불러온다. 만약 limit 값이 20이고 offset 값이 1이면, 최근 21번째에서 40번째 주문까지 존재하는 주문 정보를 불러온다.
</aside>



### HTTP Request

<code class="get">GET</code>`https://user-api.hanbitco.com/v1/trades`

### Query 파라미터

Key | Type | Description
--------- | ------- | -----------
currencyPair | `string` | 주문을 생성할 마켓 `예) ETH_BTC`
side | `string` | 주문 종류 `'buy' or 'sell'`
limit | `int32` | API가 불러올 정보 개수 제한
offset | `int32` | 조회할 주문의 offset

### 헤더

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | 인증 토큰 `JWT`  

### 응답

Key | Type | Description
--------- | ------- | -----------
items | array[item] | 조회된 주문 배열
offset | `string` | 현재 조회된 주문의 offset
limit | `string` | 요청된 주문의 조회 개수
total | `string` | 페이징을 제외한 조건에 맞는 총 주문의 개수
pageIndex | `string` | 현재 페이지의 인덱스

### 응답 (Item)

Key | Type | Description
--------- | ------- | -----------
tradeId | `string` | 주문의 고유 ID `UUID`
currencyPair | `string` | 마켓 종류 예) ETH_BTC
side | `string` | 주문 종류 `"BUY" or "SELL"`
type | `string` | 주문 형태 `"LIMIT"`
amount | `string` | 체결 수량
price | `string` | 체결 가격
fee | `string` | 체결 수수료
taker | `string` | taker
timestamp | `string` | 주문 생성 시각

