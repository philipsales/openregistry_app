// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_QUESTION_HOST: 'http://localhost:8888',
  API_QUESTION_ENDPOINT: 'http://localhost:8888/default',
  // API_HOST: 'http://localhost:3001',
  API_HOST: 'https://ewan.kristhiantiu.com',
  // API_ENDPOINT: 'http://localhost:3001/',
  API_ENDPOINT: 'https://ewan.kristhiantiu.com/',
  API_ALLOWED_DOMAINS: ['localhost:3001', 'kristhiantiu.com:3000', 'ewan.kristhiantiu.com', 'test.kristhiantiu.com'],
  ORG_BIOBANK: 'University of the Philippines Diliman',
  ORG_MEDICAL: 'University of the Philippines - Philippine General Hospital',
  DEPT_MEDICAL: 'General Surgery Department',
  DEPT_BIOBANK: 'Institute of Biology',
  FORM_TYPE_BIOBANK: 'Biobanking Repository',
  FORM_TYPE_MEDICAL: 'Patient Repository',
  VERSION: 'v01.00.00-alpha'
};  