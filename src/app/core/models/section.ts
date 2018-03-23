import { Question } from './question';
import { SectionJSON } from './../interfaces';

export class Section {
  key: string;
  name: string;
  order?: number;
  questions?: Question[];
  isTable: boolean;

  static fromJSON(json: SectionJSON): Section {
    if (typeof json === 'string') {
        return JSON.parse(json, Section.reviver);
    } else {
        const section = Object.create(Section.prototype);
        let output = Object.assign(section, json, {
          key: json.key,
          name: json.name,
          order: json.order,
          isTable: json.isTable
        });
        if (json.questions) {
          output['questions'] = json.questions.map(Question.fromJSON);
        } else {
          output['questions'] = [];
        }
        return output;
    }
  }

  static reviver(key: string, value: any): any {
    return key === '' ? Section.fromJSON(value) : value;
  }

  static fromAnyToJSON(json): SectionJSON {
    let questions;
    if (json.questions) {
      questions = json.questions.map((question) => Question.fromAnyToJSON(question));
    }
    return Object.assign({}, json, {
      key: json.key,
      name: json.name,
      order: json.order,
      questions: questions,
      isTable: json.isTable
    });
  }

  constructor(
    key: string,
    name: string,
    order?: number,
    questions?: Question[]
  ) {
    if (key) {
      this.key = key;
    }
    this.name = name;
    this.order = order;
    this.questions = questions;
    this.isTable = false;
  }

  toJSON(): SectionJSON {
    let questions;
    if (this.questions) {
      questions = this.questions.map((question) => question.toJSON());
    }
    return Object.assign({}, this, {
      key: this.key,
      name: this.name,
      order: this.order,
      questions: questions,
      isTable: this.isTable
    });
  }
}
