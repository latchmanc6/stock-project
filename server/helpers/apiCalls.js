require("dotenv").config();

// import env from 'dotenv'
// const dotenv = env.config();

const FinnhubAPIKey = process.env.FINNHUB_API_KEY;
const FinnhubSandboxAPIKey = process.env.FINNHUB_SANDBOX_API_KEY;
const AlphaVantageAPIKey = process.env.ALPHA_VANTAGE_API_KEY;

module.export = function getQuetes(stockTicker) {
  return stockTicker;
  // console.log(stockTicker)
  // if (new Date() - new Date(stock.updatedAt) > THREE_MIN) {
  //   fetch(
  //     "https://finnhub.io/api/v1/quote?symbol=" +
  //       stockTicker +
  //       "&token=" +
  //       FinnhubAPIKey
  //   )
  //     .then((response) => response.json())
  //     .then(async (data) => {
  //       await Stocks.update(
  //         {
  //           currentPrice: data.c,
  //         },
  //         { where: { ticker: stockTicker } }
  //       );
  //       success.push({ SuccessStockQuoteData: data });
  //     })
  //     .catch((err) => {
  //       error.push({ ErrorStockQuoteData: err });
  //     });
  // }

  // export default (stockTicker) => {
  // const stockTicker = req.params.ticker;
  // fetch(
  //   "https://finnhub.io/api/v1/quote?symbol=" +
  //     stockTicker +
  //     "&token=" +
  //     FinnhubAPIKey
  // )
  //   // .then((response) => response.json())
  //   .then(async (data) => {
  //     await Stocks.update(
  //       {
  //         currentPrice: data.c,
  //       },
  //       { where: { ticker: stockTicker } }
  //     );
  //     console.log(data)
  //   })
    // .catch((err) => {
    //   res.json({ error: err });
    // });  
}
