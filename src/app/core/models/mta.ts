import { MTAJSON } from '../interfaces';

export class MTA {
  id: string;
  name: string;
  type: string;
  description: string;
  dir_path: string;
  file?: FormData;
  is_deleted: boolean;

  static fromJSON(json: MTAJSON): MTA {
    if (typeof json === 'string') {
      return JSON.parse(json, MTA.reviver);
    } else {
      const mta = Object.create(MTA.prototype);
      return Object.assign(mta, json, {
        id: json._id,
        name: json.name,
        type: json.type,
        description: json.description,
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
    type: string,
    description: string,
    dir_path: string,
    is_deleted: boolean,
  ) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.dir_path = dir_path;
    this.is_deleted = is_deleted;
  }

  toJSON(): MTAJSON {
    return Object.assign({}, this, {
      _id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      dir_path: this.dir_path,
      is_deleted: this.is_deleted
    });
  }
}
