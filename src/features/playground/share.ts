import {compressToEncodedURIComponent, decompressFromEncodedURIComponent} from "lz-string";

export type PgState = {
    code: string;
    html: string;
    title?: string;
};

export function encodeState(s: PgState) {
    return compressToEncodedURIComponent(JSON.stringify(s));
}

export function decodeState(q: string | null): PgState | null {
    if (!q) return null;
    try {
        return JSON.parse(decompressFromEncodedURIComponent(q) || '');
    } catch { return null; }
}