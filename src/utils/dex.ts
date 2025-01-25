import { Address } from "@graphprotocol/graph-ts";

import { DEX } from "../../generated/schema";

export function loadOrCreateDEX(address: Address): DEX {
  let dex = DEX.load(address.toHex());
  if (!dex) {
    dex = new DEX(address.toHex());
		dex.name = address.toString(); // TODO: get name from factory
		dex.swapRouters = [];
    dex.save();
  }
  return dex;
}
