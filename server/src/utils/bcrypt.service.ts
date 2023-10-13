import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService {
    private readonly saltRounds: number = 10
    constructor() {
    }

    async hash(plainText: string) {
        return await hash(plainText, this.saltRounds)
    }

    async compare(plainText: string, hashed: string) {
        console.log(hashed, plainText)
        return await compare(plainText, hashed)
    }
}