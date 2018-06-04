import {SpecimenJSON} from './specimenjson';

export interface SpecFormJSON {
    form_id: string;
    form_name: string;
    specimen: SpecimenJSON[];
}
