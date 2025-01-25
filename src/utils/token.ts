import { Address, BigDecimal, ethereum } from "@graphprotocol/graph-ts";

import { ERC20 } from "../../generated/ERC20/ERC20";
import { Token } from "../../generated/schema";

export function loadOrCreateToken(address: Address): Token | null {
  let token = Token.load(address.toHex());
  if (!token) {
    let erc20 = ERC20.bind(address);

    let nameResult = erc20.try_name();
    if (nameResult.reverted) {
      return null;
    }

    let symbolResult = erc20.try_symbol();
    if (symbolResult.reverted) {
      return null;
    }

    let decimalsResult = erc20.try_decimals();
    if (decimalsResult.reverted) {
      return null;
    }

    let totalSupplyResult = erc20.try_totalSupply();
    if (totalSupplyResult.reverted) {
      return null;
    }

    // Ignore any weird tokens to avoid overflowing the `decimals` field (which is an i32)
    // On mainnet for example there is at least one token which has a huge value for `decimals`
    // and that would overflow the Token entity's i32 field for the decimals
    if (decimalsResult.value > 255) {
      return null;
    }

    token = new Token(address.toHex());
    token.name = nameResult.value;
    token.symbol = symbolResult.value;
    token.decimals = decimalsResult.value;
    token.totalSupply = totalSupplyResult.value;
    token.circulatingSupply = totalSupplyResult.value; // TODO: calculate circulating supply using external APIs
    token.save();
  }
  return token;
}
