import { Section } from './section';
import { TableSection } from './tablesection';
import { FormJSON } from './../interfaces';

export class Form {
  id: string;
  name: string;
  organization: string[];
  department: string[];
  type: string[];
  approval?: string;
  validity_date?: Date;
  dir_path?: string;
  file?: FormData;
  status?: string;
  created_by?: string;
  date_created?: Date;
  is_deleted?: boolean;
  is_table?: boolean;
  table_section: TableSection[] = [];
  sections?: Section[];

  static fromJSON(json: FormJSON): Form {
    if (typeof json === 'string') {
      return JSON.parse(json, Form.reviver);
    } else {
      const section = Object.create(Form.prototype);
      let id = '';
      if (json._id) {
        id = json._id;
      } else if (json.id) {
        id = json.id;
      }

      let output = Object.assign(section, json, {
        id: id,
        name: json.name,
        organization: json.organization,
        department: json.department,
        type: json.type,
        approval: json.approval,
        status: json.status,
        created_by: json.created_by,
        date_created: new Date(json.date_created),
        validity_date: json.validity_date,
        dir_path: json.dir_path,
        is_deleted: json.is_deleted,
        is_table: json.is_table
      });

      if (json.table_section) {
        output['table_section'] = json.table_section.map(TableSection.fromJSON);
      } else {
        output['table_section'] = [];
      }

      if (json.sections) {
        output['sections'] = json.sections.map(Section.fromJSON);
      } else {
        output['sections'] = [];
      }
      return output;
    }
  }

  static fromAnyToJSON(json): FormJSON {
    let date_created;
    let table_section;
    let sections;
    if (json.date_created) {
      date_created = json.date_created.getTime();
    }
    if (json.table_section) {
      table_section = json.table_section.map((this_section) => TableSection.fromJSON(this_section));
    }
    if (json.sections) {
      sections = json.sections.map((section) => Section.fromAnyToJSON(section));
    }
    return Object.assign({}, json, {
      _id: json.id,
      name: json.name,
      organization: json.organization,
      department: json.department,
      type: json.type,
      approval: json.approval,
      status: json.status,
      created_by: json.created_by,
      date_created: date_created,
      validity_date: json.validity_date,
      dir_path: json.dir_path,
      is_deleted: json.is_deleted,
      is_table: json.is_table,
      table_section: table_section,
      sections: sections
    });
  }

  static reviver(key: string, value: any): any {
    return key === '' ? Form.fromJSON(value) : value;
  }

  constructor(
    name: string,
    organization: string[],
    department: string[],
    type: string[],
    status: string,
    sections?: Section[],
    validity_date?: Date,
    dir_path?: string,
    file?: FormData,
    date_created?: Date
  ) {
    this.name = name;
    this.organization = organization;
    this.department = department;
    this.type = type;
    this.status = status;
    this.validity_date = validity_date;
    this.dir_path = dir_path;
    this.file = file;
    this.date_created = date_created;

    if (sections) {
      this.sections = sections;
    }
  }

  toJSON(): FormJSON {
    let date_created;
    let table_section;
    let sections;
    if (this.date_created) {
      date_created = this.date_created.getTime();
    }
    if (this.table_section) {
      table_section = this.table_section.map((this_section) => this_section.toJSON());
    }
    if (this.sections) {
      sections = this.sections.map((section) => section.toJSON());
    }
    return Object.assign({}, this, {
      _id: this.id,
      name: this.name,
      organization: this.organization,
      department: this.department,
      type: this.type,
      approval: this.approval,
      status: this.status,
      created_by: this.created_by,
      date_created: date_created,
      validity_date: this.validity_date,
      dir_path: this.dir_path,
      is_deleted: this.is_deleted,
      is_table: this.is_table,
      table_section: this.table_section,
      sections: sections
    });
  }
}
