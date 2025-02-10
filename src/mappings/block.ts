import { ethereum } from "@graphprotocol/graph-ts";

import { Block } from "../../generated/schema";

export function handleBlock(block: ethereum.Block): void {
  const blockEntity = new Block(block.hash.toHex());
  blockEntity.height = block.number.toI32();
  blockEntity.timestamp = block.timestamp.toI64();
  blockEntity.save();
}
