import { MTAJSON } from '../interfaces';

export class MTA {
  id: string;
  name: string;
  dir_path: string;
  is_deleted: boolean;

  static fromJSON(json: MTAJSON): MTA {
    if (typeof json === 'string') {
      return JSON.parse(json, MTA.reviver);
    } else {
      const mta = Object.create(MTA.prototype);
      return Object.assign(mta, json, {
        id: json._id,
        name: json.name,
        dir_path: json.dir_path,
        is_deleted: json.is_deleted
      });
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? MTA.fromJSON(value) : value;
  }

  constructor(
    name: string,
    dir_path: string,
    is_deleted: boolean,
  ) {
    this.name = name;
    this.dir_path = dir_path;
    this.is_deleted = is_deleted;
  }

  toJSON(): MTAJSON {
    return Object.assign({}, this, {
      _id: this.id,
      name: this.name,
      dir_path: this.dir_path,
      is_deleted: this.is_deleted
    });
  }
}
