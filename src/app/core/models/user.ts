import { UserJSON } from '../interfaces';

export class User {
    id?: string;
    username: string;
    isDeleted: boolean;
    password: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    email: string;
    mobile_number: string;
    verification_status: string;
    department: string;
    roles: string[];
    departments: string[];
    // organizations: { organization: number, position: number }[];
    organizations: string;
    position: string;
    isActive: boolean;

    static fromJSON(json: UserJSON): User {
        if (typeof json === 'string') {
            return JSON.parse(json, User.reviver);
        } else {
            const user = Object.create(User.prototype);
            return Object.assign(user, json, {
                id: json._id,
                username: json.username,
                isDeleted: json.isDeleted,
                first_name: json.first_name,
                last_name: json.last_name,
                middle_name: json.middle_name,
                gender: json.gender,
                email: json.username,
                mobile_number: json.mobile_number,
                verification_status: json.verification_status,
                roles: json.roles,
                departments: json.departments,
                position: json.position,
                organizations: json.organizations,
                isActive: json.isActive,
            });
        }
    }

    static reviver(key: string, value: any): any {
        return key === '' ? User.fromJSON(value) : value;
    }

    constructor(
        username: string,
        isDeleted: boolean,
        first_name: string,
        last_name: string,
        middle_name: string,
        gender: string,
        mobile_number: string,
        position: string,
        verification_status: string,
        isActive: boolean,
    ) {
        this.username = username;
        this.isDeleted = isDeleted;
        this.first_name = first_name;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.gender = gender;
        this.email = username;
        this.mobile_number = mobile_number;
        this.roles = [];
        this.departments = [];
        this.position = position;
        this.verification_status = verification_status;
        this.isActive = isActive;
    }

    toJSON(): UserJSON {
        console.log('foo', this.isActive);
        return Object.assign({}, this, {
            username: this.username,
            password: this.password,
            isDeleted: this.isDeleted,
            isActive: this.isActive,
            first_name: this.first_name,
            last_name: this.last_name,
            middle_name: this.middle_name,
            gender: this.gender,
            email: this.email,
            mobile_number: this.mobile_number,
            verification_status: this.verification_status,
            departments: this.departments,
            roles: this.roles,
            position: this.position
        });
    }
}
