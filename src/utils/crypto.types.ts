
interface Cryptography {
    hash(input?: string): Promise<string>;
    compare(input: string, actual?: string): Promise<boolean>;
}

export default Cryptography;