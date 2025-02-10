import { Address, BigInt, log } from "@graphprotocol/graph-ts";

import { DEX } from "../../generated/schema";
import { WHITELISTED_DEX_ADDRESSES_MAPPING } from "./constants";

export function loadOrCreateDEX(address: Address): DEX | null {
  if (!WHITELISTED_DEX_ADDRESSES_MAPPING[address.toHexString()]) {
    log.debug("DEX not whitelisted: {}", [address.toHexString()]);
    return null;
  }

  let dex = DEX.load(address.toHexString());
  if (!dex) {
    dex = new DEX(address.toHexString());
		dex.name = WHITELISTED_DEX_ADDRESSES_MAPPING[address.toHexString()]
    dex.save();
  }
  return dex;
}
