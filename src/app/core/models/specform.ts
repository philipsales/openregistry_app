import { SpecFormJSON, SpecFormHistoryJSON } from './../interfaces';

import { SpecFormHistory } from './specformhistory';
import { HOST_ATTR } from '@angular/platform-browser/src/dom/dom_renderer';

export class SpecForm {
    qty: string;
    spec: string;
    spec_type: string;
    characteristic: string;
    qty_avail: string;
    mta_qty: string;
    mta_recipient: string;
    mta_file: string;
    history: SpecFormHistory[];

  static fromJSON(json: SpecFormJSON): SpecForm {
    if (typeof json === 'string') {
      return JSON.parse(json, SpecForm.reviver);
    } else {
      const section = Object.create(SpecForm.prototype);
      let output = Object.assign(section, json, {
        qty: json.qty,
        spec: json.spec,
        spec_type: json.spec_type,
        characteristic: json.characteristic,
        qty_avail: json.qty_avail,
        mta_qty: json.mta_qty,
        mta_recipient: json.mta_recipient,
        mta_file: json.mta_file
      });
      if (json.history) {
        output['history'] = json.history.map(SpecFormHistory.fromJSON);
      } else {
        output['history'] = [];
      }
      return output;
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? SpecForm.fromJSON(value) : value;
  }

  constructor(
    qty: string,
    spec: string,
    spec_type: string,
    characteristic: string,
    qty_avail: string,
    mta_qty: string,
    mta_recipient: string,
    mta_file: string,
    history?: SpecFormHistory[]
  ) {
    this.qty = qty;
    this.spec = spec;
    this.spec_type = spec_type;
    this.characteristic = characteristic;
    this.qty_avail = qty_avail;
    this.mta_qty = mta_qty;
    this.mta_recipient = mta_recipient;
    this.mta_file = mta_file;
    if (history) {
      this.history = history;
    }
  }

  toJSON(): SpecFormJSON {
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
        mta_qty: this.mta_qty,
        mta_recipient: this.mta_recipient,
        mta_file: this.mta_file,
        history: history
    });
  }
}
