import { Organization }   from './organization';
import { DepartmentJSON } from '../interfaces/departmentJSON';

export class Department {
  id?           : string;
  name          : string = '';
  description?  : string = '';
  code?         : string = '';
  organization? : Organization = new Organization('');

  constructor(args:any={}) {
    let {_id, ...tArgs} = args;
    Object.assign(this, tArgs, {id: _id});
  }

  toJSON(): DepartmentJSON {
    let {id, ...instance} = this as Department;
    return Object.assign(<DepartmentJSON>{}, instance, {_id: this.id});
  }

  static fromJSON(departmentJSON: DepartmentJSON): Department {
    let {_id, ...deptJSON} = departmentJSON;
    let args = Object.assign(deptJSON, {id: _id});
    return new Department(args);
  }
}
