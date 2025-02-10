import { BigInt } from "@graphprotocol/graph-ts";
export const zeroAddress = "0x0000000000000000000000000000000000000000";
export const burnAddresses = [
  "0x000000000000000000000000000000000000dead",
  "0x00000000000000000000000000000000deadbeef",
  "0xdeaddeaddeaddeaddeaddeaddeaddeaddeaddead",
];

export const USDC_ADDRESS =
  "0x40fCa9cB1AB15eD9B5bDA19A52ac00A78AE08e1D".toLowerCase(); // Example address
export const IP_ADDRESS =
  "0x1516000000000000000000000000000000000000".toLowerCase(); // odyssey address
export const PRICE_PRECISION = BigInt.fromString("1000000000000000000"); // 1e18

// All factory addresses
// @ts-ignore
export const WHITELISTED_DEX_ADDRESSES_MAPPING: Map<string, string> = new Map<
  string,
  string
>();
WHITELISTED_DEX_ADDRESSES_MAPPING.set(
  "0x700722d24f9256be288f56449e8ab1d27c4a70ca",
  "PiperX V2"
);
WHITELISTED_DEX_ADDRESSES_MAPPING.set(
  "0xf3d448d7a83f749695c49d8411247fc3868fb633",
  "PiperX V3"
);
WHITELISTED_DEX_ADDRESSES_MAPPING.set(
  "0x45B3fBfE020cEd4F7a3d1AD8B23e3e7FC500E5e7",
  "StoryHunt V3"
);
WHITELISTED_DEX_ADDRESSES_MAPPING.set(
  "0xC7bffBdE003267D6c2588832206a632e6aF11fcA",
  "StoryHunt V3 PoolDeployer"
);
