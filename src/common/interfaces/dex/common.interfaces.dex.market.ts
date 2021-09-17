export interface IDEXMarketInit {
  baseMintPk: string,
  quoteMintPk: string,
  lotSize: string,
  tickSize: string,
}

export interface IDEXMarketSettle {
  marketName: string,
}
