export interface UserJSON {
    _id?: string;
    username: string;
    password: string;
    isDeleted: boolean;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    email: string;
    mobile_number: string;
    verification_status: string;
    roles: string[];
    departments: {_id: string, name: string}[];
    organizations: {_id:string, name:string}[];
    position: string[];
    isActive: boolean;
}
