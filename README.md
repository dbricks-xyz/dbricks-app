# client

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
1. create a .env file
2. add `VUE_APP_NETWORK=localnet` to it
3. yarn update (this pulls teh latest dbricks-lib)
4. yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Test on mainnet

instructions:
1. change client's .env file like so
NETWORK=mainnet
VUE_APP_NETWORK=mainnet

2. change server's .env file like so (where the path leads to a legit KP file with some SOL on it on mainnet)
NETWORK=mainnet
KP_PATH=/Users/ilmoi/.config/solana/id.json

3. make sure you have the quote currency in the wallet (eg usdc)

4. restart the client and server after updating the above

5. go to dex.projectserum.com and click the little (i) icon next to the market to get market address

```
example addresses
sol-usdc (mainnet): 9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT
```

6. paste the market address into the market field on the FE, place your trade

