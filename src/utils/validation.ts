// import { RegExp } from "assemblyscript-regex";

// // export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;

// // export const isUint8Array = (data: any): boolean =>
// //   data instanceof Uint8Array ||
// //   (data && data.constructor && data.constructor.name === "Uint8Array") ||
// //   (data && data.constructor && data.constructor.name === "Buffer");

// // export function uint8ArrayToHexString(uint8Array: Uint8Array): string {
// //   let hexString = "0x";
// //   for (const e of uint8Array) {
// //     const hex = e.toString(16);
// //     hexString += hex.length === 1 ? `0${hex}` : hex;
// //   }
// //   return hexString;
// // }

// export const isHexStrict = (hex: string): boolean => {
//   const regex = new RegExp("^((-)?0x[0-9a-f]+|(0x))$", "i");
//   return typeof hex === "string" && regex.test(hex);
// };

// export const isAddress = (value: string): boolean => {
//   // if (value instanceof Address) {
//   //   return true;
//   // }

//   if (typeof value !== "string") {
//     return false;
//   }

//   let valueToCheck: string;

//   if (typeof value === "string" && !isHexStrict(value)) {
//     valueToCheck =
//       value.toLowerCase().slice(0, 2) == "0x" ? value : `0x${value}`;
//   } else {
//     valueToCheck = value as string;
//   }

//   const regex = new RegExp("^(0x)?[0-9a-fA-F]{40}$", "i");

//   // check if it has the basic requirements of an address
//   if (!regex.test(valueToCheck)) {
//     return false;
//   }
//   return true;
// };
