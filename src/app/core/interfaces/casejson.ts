import {FormAnswerJSON} from './formanswerjson';

export interface CaseJSON {
    _id?: string;
    case_number: string;
    organization: string;
    diagnosis: string;
    date_created: number;
    forms: FormAnswerJSON[];
    is_deleted?: boolean;
}
