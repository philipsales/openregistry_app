import { SpecJSON } from '../interfaces';

export class Spec {
    id: string;
    name: string;
    is_deleted: boolean;

    static fromJSON(json: SpecJSON): Spec {
      if (typeof json === 'string') {
        return JSON.parse(json, Spec.reviver);
      } else {
        const this_spec = Object.create(Spec.prototype);
        delete this_spec._id;
        return Object.assign(this_spec, json, {
          id: json._id,
          name: json.name,
          is_deleted: json.is_deleted
        });
      }
    }

    static reviver(key: string, value: any): any {
      return key === '' ? Spec.fromJSON(value) : value;
    }

    constructor(
      name: string,
    ) {
      this.name = name;
      this.is_deleted = false;
    }

    toJSON(): SpecJSON {
      return Object.assign({}, this, {
        _id: this.id,
        name: this.name,
        is_deleted: this.is_deleted
      });
    }
}

