import { SpecimenJSON, SpecimenHistoryJSON } from './../interfaces';

import { SpecimenHistory } from './specimenhistory';
import { HOST_ATTR } from '@angular/platform-browser/src/dom/dom_renderer';

export class Specimen {
    qty: number;
    spec: string;
    spec_type: string;
    characteristic: string;
    qty_avail: number;
    history: SpecimenHistory[];

  static fromJSON(json: SpecimenJSON): Specimen {
    if (typeof json === 'string') {
      return JSON.parse(json, Specimen.reviver);
    } else {
      const section = Object.create(Specimen.prototype);
      let output = Object.assign(section, json, {
        qty: json.qty,
        spec: json.spec,
        spec_type: json.spec_type,
        characteristic: json.characteristic,
        qty_avail: json.qty_avail,
      });
      if (json.history) {
        output['history'] = json.history.map(SpecimenHistory.fromJSON);
      } else {
        output['history'] = [];
      }
      return output;
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? Specimen.fromJSON(value) : value;
  }

  constructor(
    qty: number,
    spec: string,
    spec_type: string,
    characteristic: string,
    qty_avail: number,
    history?: SpecimenHistory[]
  ) {
    this.qty = qty;
    this.spec = spec;
    this.spec_type = spec_type;
    this.characteristic = characteristic;
    this.qty_avail = qty_avail;
    if (history) {
      this.history = history;
    }
  }

  toJSON(): SpecimenJSON {
    let history;
    if (this.history) {
      history = this.history.map((this_history) => history.toJSON());
    }
    return Object.assign({}, this, {
        qty: this.qty,
        spec: this.spec,
        spec_type: this.spec_type,
        characteristic: this.characteristic,
        qty_avail: this.qty_avail,
        history: history
    });
  }
}
