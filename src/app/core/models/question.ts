import { Option } from './option';
import { QuestionJSON } from '../interfaces';
import { element } from 'protractor';

export class Question {
  key: string;
  label: string;
  type: string;
  value: string;
  required: boolean;
  order?: number;
  options?: Option[];
  medical_library?: string;
  medical_library_version?: string;
  medical_code?: string;
  medical_name?: string;
  medical_shortname?: string;
  medical_description?: string;

  static fromJSON(json: QuestionJSON): Question {
    if (typeof json === 'string') {
        return JSON.parse(json, Question.reviver);
    } else {
        const question = Object.create(Question.prototype);
        let options_array = json.options.split('|');
        let options_obj : Option[] = [];
        if (options_array) {
          options_array.forEach((element) => {
            if (element) {
              options_obj.push(new Option(element));
            }
          });
        }
        return Object.assign(question, json, {
          key: json.key,
          label: json.label,
          type: json.type,
          value: json.value,
          required: json.required,
          order: json.order,
          options: options_obj
        });
    }
  }

  static fromAnyToJSON(json): QuestionJSON {
    let stringified_options = '';
    json.options.forEach((element) => {
      if (element) {
        if (stringified_options === '') {
          stringified_options = element.name;
        } else {
          stringified_options += '|' + element.name;
        }
      }
    });

    let out = Object.assign({}, json, {
      key: json.key,
      label: json.label,
      type: json.type,
      value: json.value,
      required: json.required,
      order: json.order,
      options: stringified_options
    });
    return out;
  }

  static reviver(key: string, value: any): any {
    return key === '' ? Question.fromJSON(value) : value;
  }

  constructor(
    key: string,
    label: string,
    type: string,
    value: string,
    required: boolean,
    order: number,
    options: Option[]
  ) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.value = value;
    this.required = required;
    this.order = order;
    this.options = options;
  }

  toJSON(): QuestionJSON {
    let stringified_options = '';
    this.options.forEach((element) => {
      if (element) {
        if (stringified_options === '') {
          stringified_options = element.name;
        } else {
          stringified_options += '|' + element.name;
        }
      }
    });

    return Object.assign({}, this, {
      key: this.key,
      label: this.label,
      type: this.type,
      value: this.value,
      required: this.required,
      order: this.order,
      options: stringified_options
    });
  }
}
