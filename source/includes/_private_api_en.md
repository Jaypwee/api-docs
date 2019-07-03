# Private API

## <code class="get">GET</code> Get Balance

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
> Example outputs:

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

Retrieves the balances and tradable balances of all the currencies in the account.

### HTTP Request

<code class='get'>GET</code> `https://user-api.hanbitco.com/v1/balances`

### Headers

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | Authorization Token `JWT`

### Response

Key | Type | Description
--------- | ------- | -----------
currency | `string` | Currency Code
balance | `string` | Total Balance of a currency
tradable | `string` | Amount of currency available for trading.


## <code class="get">GET</code> Get Currency Balance


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

Retrieves the balances and tradable balances of a specific currency in the account. 

### HTTP Request

<code class="get">GET</code>`https://user-api.hanbitco.com/v1/balances?currency=currency`

### Path Parameters

Parameter | Type | Description
--------- | ------- | -----------
currency | `string` | currency (e.g BTC) 

### Headers

Parameter | Type | Description
--------- | ------- | -----------
Authorization | `string` | Authorization Token `JWT` 

### Response

Key | Type | Description
--------- | ------- | -----------
currency | `string` | Currency Code
balance | `string` | Total Balance of a currency
tradable | `string` | Amount of currency available for trading.

## <code class="post">POST</code> Create Order

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

Creates an order for a specific market. 

### HTTP Request

<code class="post">POST</code>`https://user-api.hanbitco.com/v1/orders`

### Body Parameters

Key | Type | Description
--------- | ------- | -----------
orderId | string | A Unique Id (UUID) for the order
currencyPair | string | The market of the respective currency pair to order from `e.g 'eth_btc'`
side | string | Order type `'buy' or 'sell'`
price | string | Price of currency per amount
amount | string | Amount of currency to buy or sell

### Headers

Parameter | Type | Description
--------- | ------- | -----------
Authorization | string | Authorization Token `JWT` 

### Response

Key | Type | Description
--------- | ------- | -----------
orderId | string | A Unique Id (UUID) for the order
currencyPair | string | Currency pair of the market
side | string | Order Type `"BUY" or "SELL"`
type | string | Matching type ("LIMIT")
amount | string | Total order amount
price | string | Order price
remains | string | Remaining amount
fee | string | Total transaction fee
feeRate | string | Fee rates
status | string | Order status
timestamp | string | Time of order created

## <code class="delete">DELETE</code> Cancel Order

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

> Example output:

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

Deletes an order for a specific market. 

### HTTP Request

<code class="delete">DELETE</code>`https://user-api.hanbitco.com/v1/orders`

### Body Parameters

Key | Type | Description
--------- | ------- | -----------
orderId | string | A Unique Id (UUID) for the order

### Headers

Parameter | Type | Description
--------- | ------- | -----------
Authorization | string | Authorization Token `JWT` 

### Response

Key | Type | Description
--------- | ------- | -----------
orderId | string | A Unique Id (UUID) for the order
currencyPair | string | Currency pair of the market
side | string | Order Type `"BUY" or "SELL"`
type | string | Matching type ("LIMIT")
amount | string | Total order amount
price | string | Order price
remains | string | Remaining amount
fee | string | Total transaction fee
feeRate | string | Fee rates
status | string | Order status
timestamp | string | Time of order created

## <code class='get'>GET</code> Get Orders

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

> Example output:

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

Retrieves all the orders of a specific currency pair market based on the requested limit and offset. 

<aside class="notice">
If the limit is 10 and the offset is 0, the API will return the recent 10 orders. If the limit is 20 and the offset is 1, it will return the 21th order to the 40th recent order (if it exists)
</aside>



### HTTP Request

<code class="get">GET</code>`https://user-api.hanbitco.com/v1/orders`

### Query Parameters

Key | Type | Description
--------- | ------- | -----------
currencyPair | string | The market of the respective currency pair to order from `e.g 'eth_btc'`
side | string | Order type `'buy' or 'sell'`
limit | string | Limit the amount of items to retrieve
offset | string | Offset the amount of orders to retrieve based on the limit.

### Headers

Parameter | Type | Description
--------- | ------- | -----------
Authorization | string | Authorization Token `JWT` 

### Response

Key | Type | Description
--------- | ------- | -----------
items | array[item] | Array of all the orders retrieved
offset | string | Offset of the orders
limit | string | Amount of orders to retrieve
total | string | Total number of orders that exist (disregarding limit and offset)
pageIndex | string | Current page index

### Response (Item)

Key | Type | Description
--------- | ------- | -----------
orderId | string | A Unique Id (UUID) for the order
currencyPair | string | Currency pair of the market
side | string | Order Type `"BUY" or "SELL"`
type | string | Matching type ("LIMIT")
amount | string | Total order amount
price | string | Order price
remains | string | Remaining amount
fee | string | Total transaction fee
feeRate | string | Fee rates
status | string | Order status
timestamp | string | Time of order created

## <code class='get'>GET</code> Get Matched Orders

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

> Example output:

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

### Query Parameters

Key | Type | Description
--------- | ------- | -----------
currencyPair | string | The market of the respective currency pair to order from `e.g 'eth_btc'`
side | string | Order type `'buy' or 'sell'`
limit | string | Limit the amount of items to retrieve
offset | string | Offset the amount of orders to retrieve based on the limit.

### Headers

Parameter | Type | Description
--------- | ------- | -----------
Authorization | string | Authorization Token `JWT`  

### Response

items | array[item] | Array of all the orders retrieved
offset | string | Offset of the orders
limit | string | Amount of orders to retrieve
total | string | Total number of orders that exist (disregarding limit and offset)
pageIndex | string | Current page index

### Response (Item)

Key | Type | Description
--------- | ------- | -----------
tradeId | string | A unique tradeId `UUID`
currencyPair | string | Currency pair of the market
side | string | Order type `"BUY" or "SELL"`
type | string | Matching type `"LIMIT"`
amount | string | Matched amount
price | string | Matched price
fee | string | Matched fee
taker | string | taker
timestamp | string | time of order created

