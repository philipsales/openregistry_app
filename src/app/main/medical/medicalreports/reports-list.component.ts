import { Component, OnInit } from '@angular/core';

import { FormService, ReportService } from 'app/core/services';
import { Form, Report, SearchCriteria } from 'app/core/models';
import { FormGroup } from '@angular/forms';

import * as FileSaver from 'file-saver';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

// import * as jsPDF from 'jspdf';
declare var jsPDF: any;

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports: Report[];
  testHeader: string[];
  reportCounts: any[] = [];
  templateForm: FormGroup;
  selectedReport: Report;

  questionnaireForm: Form[];
  dropdown_change: boolean;

  searchCriteria: SearchCriteria;
  questionnaireFields: {} = {};
  has_errors: boolean;


  constructor(
    private formService: FormService,
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria();
    this.testHeader = [];
    this.has_errors = false;
    this.dropdown_change = false;

    this.initForms();
  }

  initForms() {
    this.formService.getMedicalForms().subscribe(
      forms => {
        this.questionnaireForm = forms;
      }
    );
  }

  view(id: number): void {
    console.info("---id--", id);

    this.reportService
      .getReport(id)
      .then(selectedReport => {
        console.info("selectedReport: ", selectedReport);
        this.selectedReport = selectedReport;
      });
  }


  downloadJSON(): any {
    console.log("DOWNLOAD JSON ");
    this.reportService
      .downloadFileCSV()
      .subscribe((response) => {
        //FileSaver.saveAs(response, "testHeader.json");
          this.pivotTable(response);
      });
  }

  downloadPDF(): any {
    this.reportService
      .downloadFilePDF()
      .subscribe((response) => {
        FileSaver.saveAs(response, "testHeader.pdf");
      });
  }


  onDownloadMedicalAggregated(): any {
  let tempKV: any[] = [];

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: ['critieria', 'count']
    };
    console.log('AGGGREGATED', this.reportCounts);


    for (let key in this.reportCounts) {
      let value = this.reportCounts[key];
      console.log('VALUE AGGRE', value);
      let temp = {};
      temp['key'] = key;
      temp['value'] = value;
      tempKV.push(temp);
      // Use `key` and `value`
    }

    console.log('TEMPL KV', tempKV);
    const form_name = this.searchCriteria.form_name.replace(/ /g, '');

    
    //new Angular5Csv(this.reportCounts, 'Aggregated.' + new Date().toLocaleString(), options);
    new Angular5Csv(tempKV, 'Aggregated.' + form_name + '.' + new Date().toLocaleString(), options);
  }

  onDownloadMedicalRaw(): any {
    console.log('hell0 ');
    this.reportService
      .getMedicalReportRaw()
      .subscribe(
        reportraw => {
          this.pivotTable(reportraw);
          // this.reports = reports;
        }
      );
  }

  // TODO: Smart dropdown for questionnaire Fields
  onChangeDropdown(newObject: any) {
    console.log('dropdownChange', newObject['value']);
    const search_criteria = [];
    search_criteria['form_name'] = newObject['value'];

    this.reportService
    .getMedicalReportCounts(search_criteria)
    .subscribe(
      reportcounts => {
        console.log('---report counts---', reportcounts['payload'][0]);
        const temp = reportcounts['payload'][0];

        console.log('-temp--', temp);
        console.log('-bjectkys--', Object.keys(temp));
        this.questionnaireFields = reportcounts['payload'][0]['questions'];
        // this.questionnaireFields = Object.keys(temp);
        this.dropdown_change = true;
      }
    );
  }


  onViewMedicalCountClick(search_criteria: any) {
    console.log('ON VIEW MEDICAL COUNTCLICK', search_criteria);

    this.reportService
      // .getMedicalReportCounts(search_criteria)
      .getMedicalReportCountResults(search_criteria)
      .subscribe(
        reportcounts => {
          this.tableCounts(reportcounts);
          // this.reports = reports;
        }
      );
  }

  onViewMedicalCount(input_parameters: any) {
    const params = [];
    params['form'] = 'Gynecology Cancer Form';
    params['diagnosis'] = 'neoplasm';
    params['admission_start_date'] = '';
    params['admission_end_date'] = '';
    console.log('ON VIEW MEDICAL COUNT CLICK', params);

    this.reportService
      .getMedicalReportCounts(params)
      .subscribe(
        reportcounts => {
          this.tableCounts(reportcounts);
          // this.reports = reports;
        }
      );
  }

  tableCounts(reports): any {
    // this.reportCounts = reports.payload;
    console.log('TABLECOUNTS', reports);
    this.objectKeys = Object.keys;
    this.reportCounts = reports;
  }


  reportsTable: any[];
  tableHeaders: string[]=[]; 
  tableHeaders2: string[]=[]; 
  unique: string[]=[];
  testData: any[]=[];
  tempHeader: string[]=[];
  
  pivotTable(reports): any {
    this.testData = [];
    this.tempHeader = [];

    this.testData = reports.payload;
    console.log('raw testData', this.testData);

    this.testData.map((headers) => {
      for (const key of Object.keys(headers)){
        this.tempHeader.push(key);
      }
    });

    console.log('v1 testData', this.testData);
    this.tableHeaders = this.tempHeader.sort().filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    console.log('tableHealders', this.tableHeaders);

    for (const header of this.tableHeaders) {
      for (const keys of Object.values(this.testData)) {
          if (!(header in keys)) {
            console.log('keys--header', keys[header]);
            keys[header] = '';
          }
      }
    }

    console.log('v2 testdata--', this.testData[0]);
    console.log('v2 testdata-sort', this.sortObject(this.testData[0]));
    console.log('v2 testdata-values-', Object.values(this.testData[0]));
    console.log('v2 testdata-values-sort', Object.values(this.sortObject(this.testData[0])));

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: this.tableHeaders.sort()
    };

    const foo = this.sortObject(this.testData[0]);
    const bar = this.sortObject(this.testData[1]);
    const barz = this.sortObject(this.testData[2]);
    const foobar = this.testData[1];

    const form_name = this.testData[0]['_form_name'].replace(/ /g, '');

    const fofo = [];
    fofo.push(foo);
    fofo.push(bar);
    fofo.push(barz);
    console.log('v2 fofo-', fofo);
    console.log('v2 form_name-', form_name);

    const finalRawResults = [];
    for (const item of this.testData){
       let temp = this.sortObject(item);
       finalRawResults.push(temp);
    }


    //new Angular5Csv(fofo, 'raw-data-'+ new Date(), options);
    new Angular5Csv(finalRawResults, 'Raw.' + form_name + '.'+ new Date().toLocaleString(), options);
    //new Angular5Csv(, 'raw-data-'+ new Date(), options);
  }

  sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
  }

  generateTestHeader(): any {
    this.testHeader.push("_case_number");
    this.testHeader.push("_form_name");
    this.testHeader.push("Diagnosis - Primary Organ Site - Uterus");
    this.testHeader.push("Diagnosis - Primary Organ Site - Ovary");
    this.testHeader.push("Diagnosis - Primary Organ Site");
    this.testHeader.push("Risk Factors - Age of menopause");
  }

  generateTestData(): any {

    var breastData1 = {
      "_form_name": "Breast Cancer Form",
      "_case_number": "04",
      "Diagnosis - Primary Organ Site - Uterus": "1",
      "Diagnosis - Primary Organ Site - Ovary": "1"
    };
    var breastData2 = {
      "_form_name": "Breast Cancer Form",
      "_case_number": "099",
      "Diagnosis - Primary Organ Site": "Uterus"
    };
    var gyneData = {
      "_form_name": "Gynecology Cancer Form",
      "_case_number": "04",
      "Risk Factors - Age of menopause": "46",
    }

    this.testData.push(breastData1);
    this.testData.push(breastData2);
    this.testData.push(gyneData);
    console.log(this.testData);
  }

  newData: any[]=[];
  objectKeys = Object.keys;

  setPivotTable(): any{

    console.log('initial--',this.testData);
    for (let header of this.tableHeaders) {
      for (let keys of Object.values(this.testData)) {
          if(!(header in keys)){ 
            console.log('keys--header',keys[header]);
            keys[header] = "";
          }
      }
    } 

    console.log('headers--',this.tableHeaders);
    console.log('FINAL--',this.testData);
    this.testData = Object.values(this.testData);
    console.log('Valeus onlly--',this.testData);
    var values= Object.values(this.testData);
    var keys = Object.keys(this.testData);
    console.log('keys--',keys);
    console.log('values--',values);
    console.log('vaiheaderslues--',Object.keys(values[0]));

    this.tableHeaders2 = Object.keys(values[0]);
        var testBlob = new Blob();

      //testBlob = new Blob([JSON.stringify(this.testData)], {type: 'application/csv'});
      //FileSaver.saveAs(testBlob, "testHeader.csv");
     // this.setCSVTemplate(this.testData);
  }

  setCSVTemplate(data): any {


   new Angular5Csv(data, 'My Report');
   // new Angular5Csv(data, 'My Report');
       /*
    var testBlob = new Blob([JSON.stringify(CSV)], 
      {type: 'data:application/octet-stream;base64'});
    var testBlob = new Blob([JSON.stringify(CSV)], 
      {type: 'application/csv'});

    FileSaver.saveAs(testBlob, "testHeader.csv");
    */
  }

  setPivotTableTest(): any{

    this.generateTestData();
    this.generateTestHeader();

    for (let header of this.testHeader) {
      for (let keys of Object.values(this.testData)) {
          if(!(header in keys)){ 
            keys[header] = "";
          }
      }
    } 
        console.log('FINAL--',this.testData);
        this.testData = Object.values(this.testData);
        console.log('Valeus onlly--',this.testData);

  }


}
