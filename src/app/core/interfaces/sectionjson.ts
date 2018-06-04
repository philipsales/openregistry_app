import {QuestionJSON} from './questionjson';

export interface SectionJSON {
    key: string;
    name: string;
    isTable: boolean;
    order?: number;
    questions?: QuestionJSON[];
}
