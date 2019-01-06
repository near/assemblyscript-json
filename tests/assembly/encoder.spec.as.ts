import "allocator/arena";

import { BSONEncoder } from "../../assembly/encoder";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

let encoder : BSONEncoder;

export class StringConversionTests {

    static setUp(): void {
        encoder = new BSONEncoder();
    }

    static shouldHandleEmptyObject(): bool {
        return encodedMatches("0500000000");
    }

    static shouldHandleInt32(): bool {
        encoder.setInteger("int", 0x1234);
        return encodedMatches("0e00000010696e74003412000000");
    }

    static shouldHandleNegativeInt32(): bool {
        encoder.setInteger("int", -10);
        return encodedMatches("0e00000010696e7400f6ffffff00");
    }

    static shouldHandleString(): bool {
        encoder.setString("str", "Hello World");
        return encodedMatches("1a00000002737472000c00000048656c6c6f20576f726c640000");
    }

    static shouldHandleUnicodeString(): bool {
        encoder.setString("str", "\u00C4\u00D6\u00DC\u00DF");
        return encodedMatches("17000000027374720009000000c384c396c39cc39f0000");
    }

    static shouldHandleBoolFalse(): bool {
        encoder.setBoolean("bool", false);
        return encodedMatches("0c00000008626f6f6c000000");
    }

    static shouldHandleBoolTrue(): bool {
        encoder.setBoolean("bool", true);
        return encodedMatches("0c00000008626f6f6c000100");
    }

    static shouldHandleNull(): bool {
        encoder.setNull("nul");
        return encodedMatches("0a0000000a6e756c0000");
    }

    static shouldHandleBinary(): bool {
        encoder.setUint8Array("bin", array2bytes([1, 2, 3, 4, 5, 6, 7, 8, 9, 0xFF]));
        return encodedMatches("190000000562696e000a00000000010203040506070809ff00");
    }

    static shouldHandleArray(): bool {
        let arr : Array<i32> = [0xFA, 0xFB, 0xFC, 0xFD];
        encoder.pushArray("arr");
        for (let i = 0; i < arr.length; i++) {
            encoder.setInteger(itoa(i), arr[i]);
        }
        encoder.popArray();
        return encodedMatches("2b000000046172720021000000103000fa000000103100fb000000103200fc000000103300fd0000000000");
    }

    static shouldHandleNestedArray(): bool {
        encoder.pushArray("arr");
        encoder.pushArray("0");
        let innerArray : Array<i32> = [0x10, 0x11, 0x12, 0x13];
        for (let i = 0; i < innerArray.length; i++) {
            encoder.setInteger(itoa(i), innerArray[i]);
        }
        encoder.popArray();
        let outerArray : Array<i32> = [0xFA, 0xFB, 0xFC, 0xFD];
        for (let i = 0; i < outerArray.length; i++) {
            encoder.setInteger(itoa(i + 1), outerArray[i]);
        }
        encoder.popArray();
        return encodedMatches("4f000000046172720045000000043000210000001030001000000010310011000000103200120000001033001300000000103100fa000000103200fb000000103300fc000000103400fd0000000000");
    }

    static shouldHandleObject(): bool {
        encoder.pushObject("obj");
        encoder.setInteger("int", 10);
        encoder.setString("str", "");
        encoder.popObject();
        return encodedMatches("22000000036f626a001800000010696e74000a000000027374720001000000000000");
    }
}

// TODO: Expose this from std instead of this ugly hack
function itoa(i: i32): string {
    let arr: Array<i32> = [i];
    return arr.toString();
}

function encodedMatches(hexStr: String): bool {
    let bson = encoder.serialize();
    let asHex = bin2hex(bson);
    let result = asHex == hexStr;
    if (!result) {
        logStr("expected: " + hexStr);
        logStr("actual:   " + asHex);
    }
    return result;
}

function bin2hex(bin: Uint8Array, uppercase: boolean = false): string {
    let hex = uppercase ? "0123456789ABCDEF" : "0123456789abcdef";
    let str = "";
    for (let i = 0, len = bin.length; i < len; i++) {
        str += hex.charAt((bin[i] >>> 4) & 0x0f) + hex.charAt(bin[i] & 0x0f);
    }
    return str;
}

function array2bytes(arr: Array<u8>): Uint8Array {
    let bytes = new Uint8Array(arr.length);
    for (let i: i32 = 0; i < arr.length; i++) {
        bytes[i] = arr[i];
    }
    return bytes;
}