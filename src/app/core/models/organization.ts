import { OrganizationJSON }   from '../interfaces';

export class Organization {
    id: string;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    static fromJSON(json: OrganizationJSON): Organization {
        if (typeof json === 'string') {
            return JSON.parse(json, Organization.reviver);
        } else {
            const organization = Object.create(Organization.prototype);
            return Object.assign(organization, {
                id: json._id,
                name: json.name,
            });
        }
    }

    static reviver(key: string, value: any): any {
        return key === '' ? Organization.fromJSON(value) : value;
    }

    toJSON(): OrganizationJSON {
        return Object.assign({}, this, {
            _id: this.id,
            name: this.name,
        });
    }
}
