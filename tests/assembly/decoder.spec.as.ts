import "allocator/arena";

import { BSONDecoder, BSONHandler } from "../../assembly/decoder";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

class BSONTestHandler extends BSONHandler {
    isFirstKey: boolean = true
    inObject: Array<boolean> = [false]
    result: string = ""

    setString(name: string, value: string): void {
        this.writeKey(name);
        this.writeString(value);
    }

    setBoolean(name: string, value: bool): void {
        this.writeKey(name);
        this.writeBoolean(value);
    }

    setNull(name: string): void {
        this.writeKey(name);
        this.write("null");
    }

    setInteger(name: string, value: i32): void {
        this.writeKey(name);
        this.writeInteger(value);
    }

    setUint8Array(name: string, value: Uint8Array): void {
        assert(false, "Not implemented");
    }

    pushArray(name: string): bool {
        this.writeKey(name);
        this.write("[");
        this.isFirstKey = true
        this.inObject.push(false);
        return true;
    }

    popArray(): void {
        this.write("]");
    }

    pushObject(name: string): bool {
        this.writeKey(name);
        this.write("{");
        this.isFirstKey = true
        this.inObject.push(true);
        return true;
    }

    popObject(): void {
        this.write("}");
    }

    private writeKey(str: string): void {
        if (!this.isFirstKey ) {
            this.write(",");
        } else {
            this.isFirstKey = false;
        }
        if (str != null) {
            this.writeString(str);
            this.write(":");
        }
    }

    private writeString(str: string): void {
        // TODO: Implement encoding
        this.write(str);
    }

    private writeBoolean(value: bool): void {
        this.write(value ? "true" : "false");
    }

    private writeInteger(value: i32): void {
        // TODO: More efficient encoding
        let arr: Array<i32> = [value];
        this.write(arr.toString());
    }

    private write(str: string): void {
        this.result += str;
    }
}


export class StringConversionTests {
    private static handler : BSONTestHandler = new BSONTestHandler();

    static setUp(): void {
        this.handler = new BSONTestHandler();
    }

    static createDecoder(): BSONDecoder<BSONTestHandler> {
        return new BSONDecoder(this.handler);
    }

    static shouldHandleEmptyObject(): bool {
        this.handler.pushObject(null);
        this.createDecoder().deserialize(hex2bin("0500000000"));
        this.handler.popObject();
        return this.handler.result == "{}";   
    }
  
    static shouldHandleInt32(): bool {
        this.handler.pushObject(null);
        this.createDecoder().deserialize(hex2bin("0e00000010696e74003412000000"));
        this.handler.popObject();
        return this.handler.result == "{int:4660}"
    }
}

function bytes2array(typedArr: Uint8Array): Array<u8> {
    let arr = new Array<u8>();
    for (let i = 0; i < typedArr.length; i++) {
        arr.push(typedArr[i]);
    }
    return arr;
}

function hex2bin(hex: string): Uint8Array {
    let bin = new Uint8Array(hex.length >>> 1);
    for (let i = 0, len = hex.length >>> 1; i < len; i++) {
        bin[i] = u32(parseInt(hex.substr(i << 1, 2), 16));
    }
    return bin;
}