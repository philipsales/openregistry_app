import { CaseJSON, FormAnswerJSON, SpecFormJSON } from './../interfaces';
import { SpecForm } from './specform';
import { FormAnswer } from './formanswer';

export class Case {
  id: string;
  case_nbr: string;
  organization: string;
  date_created: Date;
  diagnosis?: string;
  is_active?: string;
  specforms?: SpecForm[];
  forms?: FormAnswer[];
  is_deleted: boolean;
  created_by?: string;

  static fromJSON(json): Case {
    if (typeof json === 'string') {
      return JSON.parse(json, Case.reviver);
    } else {
      const instance = Object.create(Case.prototype);
      let output = Object.assign(instance, json, {
        id: json._id,
        case_nbr: json.case_number,
        organization: json.organization,
        diagnosis: json.diagnosis,
        is_active: json.is_active,
        date_created: new Date(json.date_created),
        is_deleted: json.isDeleted,
        created_by: json.created_by
      });
      if (json.specforms) {
        output['specforms'] = json.specforms.map(SpecForm.fromJSON);
      } else {
        output['specforms'] = [];
      }
      if (json.forms) {
        output['forms'] = json.forms.map(FormAnswer.fromJSON);
      } else {
        output['forms'] = [];
      }
      return output;
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? Case.fromJSON(value) : value;
  }

  constructor(
    case_nbr: string,
    organization: string,
    diagnosis: string,
    forms: FormAnswer[],
    created_by?: string,
    is_active?: string
  ) {
    this.case_nbr = case_nbr;
    this.organization = organization;
    this.diagnosis = diagnosis;
    this.is_active = is_active;
    this.forms = forms;
    this.is_deleted = false;
    this.created_by = created_by;
  }

  toJSON(): CaseJSON {
    let forms: FormAnswerJSON[] = [];
    let specforms: SpecFormJSON[] = [];
    let date_created: number = (new Date).getTime();
    if (this.forms) {
      forms = this.forms.map((form) => form.toJSON());
    }
    if (this.specforms) {
      specforms = this.specforms.map((cur_specform: SpecForm) => cur_specform.toJSON());
    }
    if (this.date_created) {
      date_created = this.date_created.getTime();
    }

    return Object.assign({}, this, {
      case_number: this.case_nbr,
      organization: this.organization,
      diagnosis: this.diagnosis,
      is_active: this.is_active,
      date_created: date_created,
      created_by: this.created_by,
      specforms: specforms,
      forms: forms
    });
  }
}
