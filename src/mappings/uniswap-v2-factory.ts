import { PairCreated } from "../../generated/UniswapV2Factory/UniswapV2Factory";
import { TokenPair } from "../../generated/schema";

import { loadOrCreateDEX, loadOrCreateToken } from "../utils";

export function handlePairCreated(event: PairCreated): void {
  let token0 = loadOrCreateToken(event.params.token0);
  if (!token0) {
    return;
  }

  let token1 = loadOrCreateToken(event.params.token1);
  if (!token1) {
    return;
  }

  const factoryAddr = event.address;
  const dex = loadOrCreateDEX(factoryAddr);

  let tokenPair = new TokenPair(token0.id + "-" + token1.id);
  tokenPair.token0 = token0.id;
  tokenPair.token1 = token1.id;
  tokenPair.exchange = dex.id;
  tokenPair.pool = event.params.pair.toHex();
  tokenPair.save();
}
