import { SectionJSON } from './sectionjson';
import { TableSectionJSON } from './tablesectionjson';
import { PrincipalInvestigator } from '../models/principalinvestigator';

export interface FormJSON {
    _id?: string;
    id?: string;
    name: string;
    organization: string[];
    department: string[];
    type: string;
    approval?: string;
    status?: string;
    created_by?: string;
    date_created?: number;
    validity_date?: Date;
    dir_path?: string;
    is_deleted?: boolean;
    is_table?: boolean;
    table_section: TableSectionJSON[];
    sections?: SectionJSON[];
    isValid: boolean;
    coinvestigator: string;
    principalinvestigator: PrincipalInvestigator[];
}
