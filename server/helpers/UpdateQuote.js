module.export = function(stockTicker) {
// export default (stockTicker) => {
  // const stockTicker = req.params.ticker;
  fetch(
    "https://finnhub.io/api/v1/quote?symbol=" +
      stockTicker +
      "&token=" +
      FinnhubAPIKey
  )
    // .then((response) => response.json())
    .then(async (data) => {
      await Stocks.update(
        {
          currentPrice: data.c,
        },
        { where: { ticker: stockTicker } }
      );
      console.log(data)
    })
    // .catch((err) => {
    //   res.json({ error: err });
    // });
}
