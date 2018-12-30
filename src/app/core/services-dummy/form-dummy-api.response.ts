import { tumorRegistryTemplate } from '../data/template-tumor-form';
import { survivalDataTemplate } from '../data/template-survival-form';
import { mendelimsTemplate } from '../data/template-mendelims-form';

import { InMemoryDbService } from 'angular-in-memory-web-api';
export class FormDummyApiResponse implements InMemoryDbService {


  createDb() {

  let forms = [
    {
      id: 2342, 
      name: "Breast Cancer Form v.2", 
      organization: "University of the Philippines - Philippine General Hospital", 
      department: "General Surgery Department", 
      type: "Patient Repository", 
      approval: "Approved", 
      status: "Primary", 
      created_by: "Dr. Apple", 
      is_deleted: false,
      sections: [
        {
          key: '32423de423x49-efdf-6162-88ed-3d6c743423c', 
          name: "Demographic History",
          order: 0,
          questions: [
              { 
                key: '43yyaa449-efdf-6162-88ed-3d6c7442343c', 
                label: 'What is your name', 
                type: 'textbox', 
                value: '', 
                required: true, 
                order:  0,
                options: []
              },
              { 
                key: '43ex31a449-efdf-6162-88ed-3d6c7442343c', 
                label: 'What is your gender', 
                type: 'radiobutton', 
                value: 'value', 
                required: true, 
                order:  0,
                options: [
                  {
                    key: '32xse449-efdf-6162-88ed-3d6c7442343c', 
                    name: "male"
                  },
                  {
                    key: '332aa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "female"
                  }
                ] 
              },
              { 
                key: '43ede4432zx-6162-88ed-23423234', 
                label: 'What is your marraige status', 
                type:  'dropdown', 
                value: '', 
                required: true, 
                order:  1,
                options: [
                  {
                    key: 'xseaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "divorce"
                  },
                  {
                    key: 'aqeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "married"
                  },
                  {
                    key: 'axxeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "single"
                  }
                ] 
              },
          ]
        },
        {
          key: '43ede449-efdf-6162-88ed-3d6c743423c', 
          name: "Family Health Illness History",
          order: 1,
          questions: [
              { 
                key: '31za323fdf-6162-88ed-3d6c744f8c', 
                label: 'What are your Past Present History', 
                type:   'textarea', 
                value:  '', 
                required: false, 
                order:  0,
                options: [] 
              },
              { 
                key: '31zae449-efdf-6162-88ed-3d6c744f8c', 
                label: 'What are your Admission Date', 
                type:   'datepicker', 
                value:  '', 
                required: true, 
                order:  0,
                options: [] 
              },
              { 
                key: '43ede449-efdf-6162-88ed-3d6c744f8c', 
                label: 'What are your Family History of Disease', 
                type:   'checkbox', 
                value:  'value', 
                required: false, 
                order:  0,
                options: [
                  {
                    key: 'bxseeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "Diabetes"
                  },
                  {
                    key: 'xseeawaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "Hypertension"
                  }
                ] 
              },
          ]
        },

      ]
    },

    //new form array

    {
      id: 323423432, 
      name: "Thyroid Cancer Form v.0", 
      organization: "University of the Philippines - Philippine General Hospital", 
      department: "General Surgery Department", 
      type: "Patient Repository", 
      approval: "Approved", 
      status: "Not Active", 
      created_by: "Dr. Apple", 
      is_deleted: false,
      sections: [
        {
          key: '32423de423x49-efdf-6162-88ed-3d6c743423c', 
          name: "Demographic History",
          order: 0,
          questions: [
              { 
                key: '43yyaa449-efdf-6162-88ed-3d6c7442343c', 
                label: 'What is your name', 
                type: 'textbox', 
                value: '', 
                required: true, 
                order:  0,
                options: []
              },
              { 
                key: '43ex31a449-efdf-6162-88ed-3d6c7442343c', 
                label: 'What is your gender', 
                type: 'radiobutton', 
                value: 'value', 
                required: true, 
                order:  0,
                options: [
                  {
                    key: '32xse449-efdf-6162-88ed-3d6c7442343c', 
                    name: "female"
                  },
                  {
                    key: '332aa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "male"
                  }
                ] 
              },
              { 
                key: '43ede4432zx-6162-88ed-23423234', 
                label: 'What is your marraige status', 
                type:  'dropdown', 
                value: '', 
                required: true, 
                order:  1,
                options: [
                  {
                    key: 'xseaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "divorce"
                  },
                  {
                    key: 'aqeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "married"
                  },
                  {
                    key: 'axxeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "single"
                  }
                ] 
              },
          ]
        },
        {
          key: '43ede449-efdf-6162-88ed-3d6c743423c', 
          name: "Family Health Illness History",
          order: 1,
          questions: [
              { 
                key: '31za323fdf-6162-88ed-3d6c744f8c', 
                label: 'What are your Past Present History', 
                type:   'textarea', 
                value:  '', 
                required: false, 
                order:  0,
                options: [] 
              },
              { 
                key: '31zae449-efdf-6162-88ed-3d6c744f8c', 
                label: 'What are your Admission Date', 
                type:   'datepicker', 
                value:  '', 
                required: true, 
                order:  0,
                options: [] 
              },
              { 
                key: '43ede449-efdf-6162-88ed-3d6c744f8c', 
                label: 'What are your Family History of Disease', 
                type:   'checkbox', 
                value:  'value', 
                required: false, 
                order:  0,
                options: [
                  {
                    key: 'bxseeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "Diabetes"
                  },
                  {
                    key: 'xseeawaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "Hypertension"
                  }
                ] 
              },
          ]
        },

      ]
    },

    //insert new array
    {
      id: 111, 
      name: "Cervical Cancer Form v.1", 
      organization: "University of the Philippines - Diliman", 
      department: "Institute of Biology", 
      type: "Biobanking Repository", 
      approval: "Pending", 
      status: "Not Active", 
      created_by: "Dr. Apple", 
      is_deleted: false,
      sections: [
        {
          key: '32423de423x49-efdf-6162-88ed-3d6c743423c', 
          name: "Demographic History",
          order: 0,
          questions: [
              { 
                key: '43yyaa449-efdf-6162-88ed-3d6c7442343c', 
                label: 'What is your name', 
                type: 'textbox', 
                value: '', 
                required: true, 
                order:  0,
                options: []
              },
              { 
                key: '43ede4432zx-6162-88ed-23423234', 
                label: 'What is your marraige status', 
                type:  'dropdown', 
                value: '', 
                required: true, 
                order:  1,
                options: [
                  {
                    key: 'xseaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "divorce"
                  },
                  {
                    key: 'aqeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "married"
                  },
                  {
                    key: 'axxeaa449-efdf-6162-88ed-3d6c7442343c', 
                    name: "single"
                  }
                ] 
              },
          ]
        }
      ]
    }
  ];


    let registryTypes = [
      { 
        id: 0, 
        name: "Biobanking Repository", 
        date_created: "10-10-2017", 
        date_updated: '',
        is_deleted: false
      },
      { 
        id: 1, 
        name: "Patient Repository", 
        date_created: "10-10-2017", 
        date_updated: '',
        is_deleted: false
      }
    ];

    let departments = [
      { 
        id: 0, 
        name: "General Surgery Department" 
      },
      { 
        id: 1, 
        name: "Obstetric Gynecology Department" 
      },
      { 
        id: 1, 
        name: "Institute of Biology" 
      }
    ];

    return { 
      //forms         : forms, 
      forms         : forms.concat(tumorRegistryTemplate)
                           .concat(survivalDataTemplate)
                           .concat(mendelimsTemplate),
      registrytypes : registryTypes,
      // departments   : departments 
    };
  }
}
