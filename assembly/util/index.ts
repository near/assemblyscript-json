

export namespace Buffer {
    export function fromString(str: string): Uint8Array {
        let arr: Uint8Array= new Uint8Array(String.UTF8.byteLength(str, false));
        let ptr = changetype<usize>(String.UTF8.encode(str, false));
        memory.copy(Buffer.getPtr(arr), ptr, String.UTF8.byteLength(str, false));
        return arr;
    }

    export function toString(arr: Uint8Array): string {
        return String.UTF8.decode(arr.buffer, false);
    }

    export function getPtr(arr: Uint8Array): usize {
        //@ts-ignore Does exist
        return arr.dataStart
    }

    export function readString(arr: Uint8Array, start: usize, end: usize): string {
        return String.UTF8.decodeUnsafe(getPtr(arr) + start, end - start);
    }
}