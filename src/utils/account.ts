import { Address, BigInt } from "@graphprotocol/graph-ts";

import { Account } from "../../generated/schema";

export function loadOrCreateAccount(address: Address): Account {
  let account = Account.load(address.toHex());
  if (!account) {
    account = new Account(address.toHex());
    account.tvlUSD = BigInt.zero();
    account.tvlNative = BigInt.zero();
    account.tradingVolumeUSD = BigInt.zero();
    account.tradingVolumeNative = BigInt.zero();
    account.save();
  }
  return account;
}
