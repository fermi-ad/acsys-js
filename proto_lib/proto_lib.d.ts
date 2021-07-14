export declare class MarshalError extends Error {
    constructor(t: string, v: string);
}
export declare class UnmarshalError extends Error {
    constructor(t1: number, t2: number);
}
interface Marshalable {
    marshal(): IterableIterator<number>;
}
export declare class PROTOCOL {
    static m_tagged_int(tag: number, v: number): IterableIterator<number>;
    static m_bool(v: boolean): IterableIterator<number>;
    static m_int(v: number): IterableIterator<number>;
    static m_enum(v: number): IterableIterator<number>;
    static m_float(v: number): IterableIterator<number>;
    static m_string(v: string): IterableIterator<number>;
    static m_binary(v: ArrayBuffer): IterableIterator<number>;
    static m_array<T>(f: (v: T) => IterableIterator<number>, a: Array<T>): IterableIterator<number>;
    static m_struct(v: Marshalable): IterableIterator<number>;
    static get_next(i: Iterator<number>): number;
    static validate_header(v: number, i: Iterator<number>): void;
    static u_tagged_int(tag: number, g: Iterator<number>): number;
    static u_int(g: Iterator<number>): number;
    static u_float(g: Iterator<number>): number;
    static u_bool(g: Iterator<number>): boolean;
    static u_string(g: Iterator<number>): string;
    static u_binary(g: Iterator<number>): ArrayBuffer;
    static u_array<T>(f: (iter: Iterator<number>) => T, g: Iterator<number>): Array<T>;
}
export {};
