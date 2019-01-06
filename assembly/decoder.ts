import { StringConversionTests } from "../tests/assembly/encoder.spec.as";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

/**
 * Extend from this class to handle events from parser.
 * Default implementation traverses whole object tree and does nothing.
 */
export abstract class JSONHandler {
    setString(name: string, value: string): void {
    }

    setBoolean(name: string, value: bool): void {
    }

    setNull(name: string): void {
    }

    setInteger(name: string, value: i32): void {
    }

    setUint8Array(name: string, value: Uint8Array): void {
    }

    pushArray(name: string): bool {
        return true;
    }

    popArray(): void {
    }

    pushObject(name: string): bool {
        return true;
    }

    popObject(): void {
    }
}

/**
 * Extend from this class to handle events from parser.
 * This implementation crashes on every unimplemented set/push method
 * to allow easier validation of input.
 */
export class ThrowingJSONHandler extends JSONHandler {
    setString(name: string, value: string): void {
       assert(false, 'Unexpected string field ' + name + ' : "' + value + '"');
    }

    setBoolean(name: string, value: bool): void {
       assert(false, 'Unexpected boolean field ' + name + ' : ' + (value ? 'true' : 'false'));
    }

    setNull(name: string): void {
       assert(false, 'Unexpected null field ' + name);
    }

    setInteger(name: string, value: i32): void {
       let arr: Array<i32> = [value];
       assert(false, 'Unexpected integer field ' + name + ' : ' + arr.toString());
    }

    setUint8Array(name: string, value: Uint8Array): void {
        assert(false, 'Unexpected byte array field ' + name);
    }

    pushArray(name: string): bool {
        assert(false, 'Unexpected array field' + name);
        return true;
    }

    pushObject(name: string): bool {
        assert(false, 'Unexpected object field ' + name);
        return true;
    }
}

const TRUE_STR = "true";
const FALSE_STR = "false";

export class JSONDecoder<JSONHandlerT extends JSONHandler> {

    handler: JSONHandlerT;
    readIndex: i32 = 0;
    buffer: Uint8Array = null;
    lastKey: string = null;

    constructor(handler: JSONHandlerT) {
        this.handler = handler;
    }

    deserialize(buffer: Uint8Array, startIndex: i32 = 0): void {
        this.readIndex = startIndex;
        this.buffer = buffer;
        this.lastKey = null

        assert(this.parseValue(), "Cannot parse JSON");
    }

    private peekChar(): i32 {
        return this.buffer[this.readIndex];
    }

    private readChar(): i32 {
        assert(this.readIndex < this.buffer.length, "Unexpected input end");
        return this.buffer[this.readIndex++];
    }

    private parseValue(): boolean {
        return this.parseObject()
            || this.parseArray()
            || this.parseString()
            || this.parseBoolean()
            || this.parseNumber()
            || this.parseNull()
        // TODO: Error if input left
    }

    private parseObject(): boolean {
        if (this.peekChar() != "{".charCodeAt(0)) {
            return false;
        }
        this.handler.pushObject(this.lastKey);
        this.readChar();

        let firstItem = true;
        while (this.peekChar() != "}".charCodeAt(0)) {
            if (!firstItem) {
                assert(this.readChar() == ",".charCodeAt(0), "Expected ','");
            } else {
                firstItem = false;
            }
            this.parseKey();
            this.parseValue();
        }
        assert(this.readChar() == "}".charCodeAt(0), "Unexpected end of object");
        this.handler.popObject();
        return true;
    }

    private parseKey(): void {
        this.lastKey = this.readString();
        assert(this.readChar() == ":".charCodeAt(0), "Expected ':'");
    }

    private parseArray(): boolean {
        // TODO
        return false;
    }

    private parseString(): boolean {
        if (this.peekChar() != '"'.charCodeAt(0)) {
            return false;
        }
        this.handler.setString(this.lastKey, this.readString());
        return true;
    }

    private readString(): String {
        assert(this.readChar() == '"'.charCodeAt(0), "Expected double-quoted string");
        let savedIndex = this.readIndex;
        for (;;) {
            let byte = this.readChar();
            assert(byte >= 0x20, "Unexpected control character");
            // TODO: Make sure unicode handled properly
            if (byte == '"'.charCodeAt(0)) {
                return String.fromUTF8(this.buffer.buffer.data + savedIndex, this.readIndex - savedIndex - 1);
            }
            if (byte == "\\".charCodeAt(0)) {
                // TODO: Decode string properly
                let skipCount = 1;
                if (this.peekChar() == "u".charCodeAt(0)) {
                    skipCount += 4;
                }
                for (; skipCount > 0; skipCount--) {
                    this.readChar();
                }
            }
        }
        // Should never happen
        return "";
    }

    private parseNumber(): boolean {
        // TODO: Parse floats
        let number: i32 = 0;
        let sign: i32 = 1;
        if (this.peekChar() == "-".charCodeAt(0)) {
            sign = -1;
            this.readChar();
        }
        let digits = 0;
        while ("0".charCodeAt(0) <= this.peekChar() && this.peekChar() <= "9".charCodeAt(0) ) {
            let byte = this.readChar();
            number *= 10;
            number += byte - "0".charCodeAt(0);
            digits++;
        }
        if (digits > 0) {
            this.handler.setInteger(this.lastKey, number * sign);
            return true;
        }
        return false;
    }

    private parseBoolean(): boolean {
        if (this.peekChar() == FALSE_STR.charCodeAt(0)) {
            for (let i = 0; i < FALSE_STR.length; i++) {
                assert(FALSE_STR.charCodeAt(i) == this.readChar(), "Expected false");
            }
            this.handler.setBoolean(this.lastKey, false);
            return true;
        }
        if (this.peekChar() == TRUE_STR.charCodeAt(0)) {
            for (let i = 0; i < TRUE_STR.length; i++) {
                assert(TRUE_STR.charCodeAt(i) == this.readChar(), "Expected true");
            }
            this.handler.setBoolean(this.lastKey, true);
            return true;
        }

        return false;
    }

    private parseNull(): boolean {
        assert(false, "Method not implemented.");
        return false;
    }
}
