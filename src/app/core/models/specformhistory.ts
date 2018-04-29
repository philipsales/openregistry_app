import { SpecFormHistoryJSON } from '../interfaces';

export class SpecFormHistory {
    qty: number;
    type: string;
    recipient: string;
    reference: string;


  static fromJSON(json: SpecFormHistoryJSON): SpecFormHistory {
    if (typeof json === 'string') {
      return JSON.parse(json, SpecFormHistory.reviver);
    } else {
      const section = Object.create(SpecFormHistory.prototype);
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
    return key === '' ? SpecFormHistory.fromJSON(value) : value;
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

  toJSON(): SpecFormHistoryJSON {
    return Object.assign({}, this, {
        qty: this.qty,
        type: this.type,
        recipient: this.recipient,
        reference: this.reference
    });
  }
}
