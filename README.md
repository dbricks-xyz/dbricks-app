# Local deployment
Follow the steps outlined for local deployment in `dbricks-server`, with a few exceptions:
1. Any variables you add to `.env` must be prepended with `VUE_APP_`. ie:
```dotenv
VUE_APP_NETWORK=mainnet
VUE_APP_LOCAL_SERUM_PROG_ID = DVieqxNimmtbZpZTw2sZiSAohNJuHLywGaMs47RAW97Z
```
2. The final command is `yarn serve` instead of `yarn debug`
3. Ensure that client and server are running the same network (Eg both mainnet) - or you'll get errors
4. Don't forget to sign the transaction once you get it back from the backend. The first time the wallet appears *on top* of your browser - but after that it appears *behind*. It's a bug.

# Place a trade on serum (mainnet)
1. Ensure your wallet is funded with the quote currency (eg if you're buying SOL for USDC, you must have USDC in your wallet)
2. Go to `dex.projectserum.com` and click the little (i) icon next to the market to get market address
```
example addresses
sol-usdc (mainnet): 9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT
```
3. Paste the market address into the market field on the FE, place your trade

# Production [TBD]
```
yarn build
```
