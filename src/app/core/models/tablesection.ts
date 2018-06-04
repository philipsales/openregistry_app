import { TableSectionJSON } from './../interfaces';

export class TableSection {
    specimen: string;
    type: string;

    static fromJSON(json: TableSectionJSON): TableSection {
      if (typeof json === 'string') {
          return JSON.parse(json, TableSection.reviver);
      } else {
          const section = Object.create(TableSection.prototype);
          let output = Object.assign(section, json, {
            specimen: json.specimen,
            type: json.type
          });
          return output;
      }
    }

    static reviver(key: string, value: any): any {
      return key === '' ? TableSection.fromJSON(value) : value;
    }

    constructor(
      specimen: string,
      type: string
    ) {
      this.specimen = specimen;
      this.type = type;
    }

    toJSON(): TableSectionJSON {
      return Object.assign({}, this, {
        specimen: this.specimen,
        type: this.type
      });
    }
  }
