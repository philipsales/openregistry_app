// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  API_QUESTION_HOST: 'http://localhost:8888',
  API_QUESTION_ENDPOINT: 'http://localhost:8888/default',
  API_HOST: 'https://api.biobank.ph',
  API_ENDPOINT: 'https://api.biobank.ph/',
  API_ALLOWED_DOMAINS: ['app.biobank.ph:3000', 'api.biobank.ph'],
  ORG_BIOBANK: 'University of the Philippines Diliman',
  ORG_MEDICAL: 'University of the Philippines - Philippine General Hospital',
  DEPT_MEDICAL: 'General Surgery Department',
  DEPT_BIOBANK: 'Institute of Biology',
  FORM_TYPE_BIOBANK: 'Biobanking Repository',
  FORM_TYPE_MEDICAL: 'Patient Repository',
  VERSION: 'V1.00.11'
};
