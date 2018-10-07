import { SpecTypeJSON } from '../interfaces';

export class SpecType {
    id: string;
    name: string;
    is_deleted: boolean;

    static fromJSON(json: SpecTypeJSON): SpecType {
      if (typeof json === 'string') {
        return JSON.parse(json, SpecType.reviver);
      } else {
        const this_spectype = Object.create(SpecType.prototype);
        delete this_spectype._id;
        return Object.assign(this_spectype, json, {
          id: json._id,
          name: json.name,
          is_deleted: json.is_deleted
        });
      }
    }

    static reviver(key: string, value: any): any {
      return key === '' ? SpecType.fromJSON(value) : value;
    }

    constructor(
      name: string,
    ) {
      this.name = name;
      this.is_deleted = false;
    }

    toJSON(): SpecTypeJSON {
      return Object.assign({}, this, {
        _id: this.id,
        name: this.name,
        is_deleted: this.is_deleted
      });
    }
}

