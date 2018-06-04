import { SpecFormJSON, SpecimenJSON } from './../interfaces';

import { Specimen } from './specimen';
import { HOST_ATTR } from '@angular/platform-browser/src/dom/dom_renderer';

export class SpecForm {
    form_id: string;
    form_name: string;
    specimen: Specimen[];

  static fromJSON(json: SpecFormJSON): SpecForm {
    if (typeof json === 'string') {
      return JSON.parse(json, SpecForm.reviver);
    } else {
      const section = Object.create(SpecForm.prototype);
      let output = Object.assign(section, json, {
        form_if: json.form_id,
        form_name: json.form_name
      });
      if (json.specimen) {
        output['specimen'] = json.specimen.map(Specimen.fromJSON);
      } else {
        output['specimen'] = [];
      }
      return output;
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? SpecForm.fromJSON(value) : value;
  }

  constructor(
    form_id: string,
    form_name: string,
    specimen: Specimen[]
  ) {
    this.form_id = form_id;
    this.form_name = form_name;
    this.specimen = specimen;
  }

  toJSON(): SpecFormJSON {
    let specimen;
    if (this.specimen) {
      specimen = this.specimen.map((this_specimen) => this_specimen.toJSON());
    }
    return Object.assign({}, this, {
        form_id: this.form_id,
        form_name: this.form_name,
        specimen: specimen
    });
  }
}
