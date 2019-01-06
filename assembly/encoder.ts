const START_SIZE = 32;
// Growth should be aggressive as we don't free old buffer
const GROWTH_MULT = 2;

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

export class BSONEncoder {
    offsets: Array<i32> = new Array<i32>();
    buffer: Uint8Array = new Uint8Array(START_SIZE)
    writeIndex: i32 = 4  // Make place for total size 

    serialize(): Uint8Array {
        this.writeByte(0);
        this.int32(this.writeIndex, 0);
        return this.buffer.subarray(0, this.writeIndex);
    }

    setString(name: string, value: string): void {
        this.writeByte(0x02);           // BSON type: String
        this.cstring(name);
        let startOffset = this.writeIndex;
        this.writeIndex += 4;
        this.cstring(value);
        this.int32(this.writeIndex - startOffset - 4, startOffset);
    }

    setBoolean(name: string, value: bool): void {
        this.writeByte(0x08);           // BSON type: Boolean
        this.cstring(name);
        this.writeByte(value ? 1 : 0);
    }

    setNull(name: string): void {
        this.writeByte(0x0A);             // BSON type: Null
        this.cstring(name);
    }

    setInteger(name: string, value: i32): void {
        this.writeByte(0x10);       // BSON type: int32
        this.cstring(name);
        this.int32(value);
    }

    setUint8Array(name: string, value: Uint8Array): void {
        this.writeByte(0x05);           // BSON type: Binary data
        this.cstring(name);
        this.int32(value.length);
        this.writeByte(0);              // use generic binary subtype 0
        for (let i = 0; i < value.length; i++) {
            this.writeByte(value[i]);
        }
    }

    pushArray(name: string): void {
        this.writeByte(0x04);           // BSON type: Array
        this.cstring(name);
        this.offsets.push(this.writeIndex);
        this.writeIndex += 4;
    }

    popArray(): void {
        this.writeByte(0);
        let startOffset = this.offsets.pop();
        this.int32(this.writeIndex - startOffset, startOffset);
    }

    pushObject(name: string): void {
        this.writeByte(0x03);           // BSON type: Document
        this.cstring(name);
        this.offsets.push(this.writeIndex);
        this.writeIndex += 4;
    }

    popObject(): void {
        this.writeByte(0);
        let startOffset = this.offsets.pop();
        this.int32(this.writeIndex - startOffset, startOffset);
    }

    private cstring(str: string): void {
        // TODO: Handle newlines properly
        // str = str.replace(/\r\n/g, '\n');
        // TODO: Maybe use AssemblyScript std Unicode conversion?
        for (let i = 0, len = str.length; i < len; i++) {
            let c = str.charCodeAt(i);
            if (c < 128) {
                this.writeByte(c);
            } else if (c < 2048) {
                this.writeByte((c >>> 6) | 192);
                this.writeByte((c & 63) | 128);
            } else {
                this.writeByte((c >>> 12) | 224);
                this.writeByte(((c >>> 6) & 63) | 128);
                this.writeByte((c & 63) | 128);
            }
        }
        this.writeByte(0);
    }

    private int32(num: i32, offset: i32 = -1): void {
        if (offset == -1) {
            this.growIfNeeded(4);
            offset = this.writeIndex;
            this.writeIndex += 4;
        }
        this.buffer[offset] = (num) & 0xff;
        this.buffer[offset + 1] = (num >>> 8) & 0xff;
        this.buffer[offset + 2] = (num >>> 16) & 0xff;
        this.buffer[offset + 3] = (num >>> 24) & 0xff;
    }

    private writeByte(b: u32): void {
        this.growIfNeeded(1);
        this.buffer[this.writeIndex++] = b;
    }

    private growIfNeeded(numBytes: i32): void {
        if (this.buffer.length >= this.writeIndex + numBytes) {
            return;
        }

        let oldBuffer = this.buffer;
        this.buffer = new Uint8Array(this.buffer.length * GROWTH_MULT);
        for (let i = 0; i < oldBuffer.length; i++) {
            this.buffer[i] = oldBuffer[i];
        }
    }
}


