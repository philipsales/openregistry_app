import { SpecimenHistoryJSON } from '../interfaces';

export class SpecimenHistory {
    qty: number;
    type: string;
    recipient: string;
    reference: string;


  static fromJSON(json: SpecimenHistoryJSON): SpecimenHistory {
    if (typeof json === 'string') {
      return JSON.parse(json, SpecimenHistory.reviver);
    } else {
      const section = Object.create(SpecimenHistory.prototype);
      let output = Object.assign(section, json, {
        qty: json.qty,
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
    type: string,
    recipient: string,
    reference: string
  ) {
    this.qty = qty;
    this.type = type;
    this.recipient = recipient;
    this.reference = reference;
  }

  toJSON(): SpecimenHistoryJSON {
    return Object.assign({}, this, {
        qty: this.qty,
        type: this.type,
        recipient: this.recipient,
        reference: this.reference
    });
  }
}
