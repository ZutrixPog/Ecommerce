import Cryptography from "./crypto.types";
import bcrypt from 'bcrypt';

class BcryptWrapper implements Cryptography {

    async hash(input: string): Promise<string> {
        return await bcrypt.hash(input, 10);
    }

    async compare(input: string, actual: string): Promise<boolean> {
        return await bcrypt.compare(input, actual);
    }
}

export default BcryptWrapper;