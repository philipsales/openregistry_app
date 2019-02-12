import { SpecimenHistoryJSON } from '../interfaces';

export class SpecimenHistory {
    qty: number;
    date_done: Date;
    type: string;
    recipient: string;
    reference: string;


  static fromJSON(json: SpecimenHistoryJSON): SpecimenHistory {
    if (typeof json === 'string') {
      return JSON.parse(json, SpecimenHistory.reviver);
    } else {
      const section = Object.create(SpecimenHistory.prototype);
      const output = Object.assign(section, json, {
        qty: json.qty,
        date_done: new Date(json.date_done),
        type: json.type,
        recipient: json.recipient,
        reference: json.reference
      });

      return output;
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? SpecimenHistory.fromJSON(value) : value;
  }

  constructor(
    qty: number,
    date_done: Date,
    type: string,
    recipient: string,
    reference: string
  ) {
    this.qty = qty;
    this.date_done = date_done;
    this.type = type;
    this.recipient = recipient;
    this.reference = reference;
  }

  toJSON(): SpecimenHistoryJSON {
    let dateISO = '';
    if (this.date_done != null && !isNaN(this.date_done.getTime())) {
      dateISO = this.date_done.toISOString();
    }
    return Object.assign({}, this, {
        qty: this.qty,
        date_done: dateISO,
        type: this.type,
        recipient: this.recipient,
        reference: this.reference
    });
  }
}
