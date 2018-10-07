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
        let out =  Object.assign(this_spec, json, {
          name: json.name,
          is_deleted: json.is_deleted
        });
        if (json._id) {
          out.id = json._id;
        }
        delete out._id;
        return out;
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
      let is_deleted = this.is_deleted;
      if (!is_deleted === true) {
        is_deleted = false;
      }
      return Object.assign({}, this, {
        _id: this.id,
        name: this.name,
        is_deleted: is_deleted
      });
    }
}

