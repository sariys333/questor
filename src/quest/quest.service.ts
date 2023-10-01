import { Injectable } from '@nestjs/common';
import { Quest } from './types/quest.type';


const list = [
    new Quest(),
    new Quest(),
    new Quest(),
    new Quest(),
    new Quest(),
    new Quest(),
]

@Injectable()
export class QuestService {

    getList(): Quest[] {
        return list;
    }

}
