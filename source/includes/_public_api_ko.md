

# 공개 API

## <code class='get'>GET</code> 호가 정보 조회

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/orderbook'
```

> 예시 응답:

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
 
요청한 마켓의 오더북을 불러온다. 마켓 목록은 [여기서] 확인할 수 있다.

### HTTP Request

<code class="get">GET</code> `https://user-api.hanbitco.com/v1/markets/{currency_pair}/orderbook`

###Path 파라미터

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | 오더북을 불러올 마켓값.

## <code class='get'>GET</code> 최근 체결 내역

```shell
curl --request GET \
  --url 'https://user-api.hanbitco.com/v1/markets/{currency_pair}/trades'
```
> 예시 응답:

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

해당 마켓의 최근 체결 내역을 불러온다.

### HTTP Request

<code class="get">GET</code> `https://user-api.hanbitco.com/v1/markets/{currency_pair}/trades`

### Path 파라미터

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | 최근 체결 내역을 불러올 마켓값.

## <code class="get">GET</code> 현재가 정보

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

요청한 마켓의 최근 체결가, 전일가, 현재가, 최저가, 최고가 및 거래량 정보를 불러온다.

### HTTP Request

<code class="get">GET</code> `https://user-api.hanbitco.com/v1/markets/{currency_pair}/ticker`

### Path 파라미터

Parameter | Type | Description
--------- | ------- | -----------
currency_pair | `string` | 현재가 정보를 불러올 마켓값.
