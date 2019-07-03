

# Public API

## <code class='get'>GET</code> Retrieve Orderbook

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/orderbook'
```

> Example Output:

```json
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
 
Retrieves the orderbook for a market with a requested currency_pair.

### HTTP Request

<code class="get">GET</code> `https://user-api.hanbitco.com/v1/markets/{currency_pair}/orderbook`

###Path Parameters 

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | Used to retrieve the orderbook with the respective currency pair.

## <code class='get'>GET</code> Get Trades History

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/trades'
```
> Example output:

```json
{ 
  status: "success",
  data:
   { 
     offset: '0',
     limit: '10',
     items:
      [ 
        { 
          tradeId: "34dc838d-a847-4f3d-92e9-5e3e9ac99e0f",
          currencyPair: "REP_BTC",
          amount: '0.1',
          price: '0.002774',
          buyOrderType: "LIMIT",
          sellOrderType: "LIMIT",
          taker: "SELL",
          createdAt: "2019-02-07T07:07:17.937Z",
          total: '0.0002774',
          timestamp: '1549523237' 
        },
      ],
     total: '15',
     nextPageUrl: "?offset=10&limit=10",
     pageIndex: '0' 
   } 
}
```


Retrieves all the recent trade records of a selected currency market.

### HTTP Request

<code class="get">GET</code> `https://user-api.hanbitco.com/v1/markets/{currency_pair}/trades`

### Path Parameters

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | Used to retrieve the trade records with the respective currency pair.

## <code class="get">GET</code> Current Prices Ticker

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/ticker'
```

```json
{ 
  status: "success",
  data:
   { 
     currencyPair: "REP_BTC",
     timestamp: '1549523237',
     lastPrice: '0.002774',
     lastDayPrice: '0.002767',
     lowPrice: '0.002768',
     highPrice: '0.002776',
     volume: '43.4556' 
   } 
}
```
Retrieves a selected currency pair ticker that contains information such as last matched price, price 24 hours ago, lowest and highest price, and the daily volume.

### HTTP Request

<code class="get">GET</code> `https://user-api.hanbitco.com/v1/markets/{currency_pair}/ticker`

### Path Parameters

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | Used to retrieve the ticker with the respective currency pair.
