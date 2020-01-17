export namespace Buffer {
    export function fromString(str: string): Uint8Array {
        let arr: Uint8Array= new Uint8Array(String.UTF8.byteLength(str, false));
        let ptr = changetype<usize>(String.UTF8.encode(str, false));
        memory.copy(getDataPtr(arr), ptr, String.UTF8.byteLength(str, false));
        return arr;
    }

    export function toString(arr: Uint8Array): string {
        return String.UTF8.decode(arr.buffer, false);
    }

    /**
     * Returns a pointer to the start of the raw data (i.e. after the header)
     *
     * @see https://docs.assemblyscript.org/details/memory#internals
     */
    export function getDataPtr(arr: Uint8Array): usize {
        return changetype<usize>(arr.buffer) + arr.byteOffset;
    }

    export function readString(arr: Uint8Array, start: usize, end: usize): string {
        return String.UTF8.decodeUnsafe(getDataPtr(arr) + start, end - start);
    }
}
