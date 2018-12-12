import {SpecimenHistoryJSON} from './specimenhistoryjson';

export interface SpecimenJSON {
    qty: number;
    spec: string;
    spec_type: string;
    collectedDate: string;
    characteristic: string;
    qty_avail: number;
    history: SpecimenHistoryJSON[];
}
