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
  reportCounts: any[] = [];
  templateForm: FormGroup;
  selectedReport: Report;

  questionnaireForm: Form[];
  dropdown_change: boolean;

  searchCriteria: SearchCriteria;
  questionnaireFields: {} = {};
  has_errors: boolean;

  tableHeaders: string[] = [];
  testData: any[] = [];
  tempHeader: string[] = [];

  constructor(
    private formService: FormService,
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria();
    this.has_errors = false;
    this.dropdown_change = false;

    this.getMedicalForms();
  }

  getMedicalForms() {
    this.formService
      .getMedicalForms()
      .subscribe(
        forms => {
          this.questionnaireForm = forms;
        }
    );
  }

  setCSVOptions(headersArray): any {

    return {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      noDownload: false,
      headers: headersArray
    };
  }

  onClickDownloadAggregate(): any {
    const aggregateData: any[] = [];
    const headers = ['critieria', 'count'];
    const options = this.setCSVOptions(headers);
    const form_name = this.searchCriteria.form_name.replace(/ /g, '');
    const filename = 'Aggregated.' + form_name + '.' + new Date().toLocaleString();

    for (const key in this.reportCounts) {
      if (key) {
        const value = this.reportCounts[key];
        const temp = {};
        temp['key'] = key;
        temp['value'] = value;
        aggregateData.push(temp);
      }
    }

    this.exportCSV(aggregateData, filename, options);

  }

  exportCSV(data, filename, options): any {
    return new Angular5Csv(data, filename, options);
  }

  onClickDownloadRaw(): any {
    console.log('hell0 ');
    this.reportService
      .getMedicalReportRaw()
      .subscribe(
        reportraw => {
          this.buildCSVTemplate(reportraw);
          // this.reports = reports;
        }
      );
  }

  // TODO: Smart dropdown for questionnaire Fields
  onDropdownFormType(newObject: any) {
    const search_criteria = [];
    search_criteria['form_name'] = newObject['value'];

    this.reportService
      .getMedicalReportCounts(search_criteria)
      .subscribe(
        reportcounts => {
          this.questionnaireFields = reportcounts['payload'][0]['questions'];
          this.dropdown_change = true;
        }
      );
  }

  onClickSearch(search_criteria: any) {

    this.reportService
      .getMedicalReportCountResults(search_criteria)
      .subscribe(
        reportcountresults => {
          this.reportCounts = reportcountresults;
        }
      );
  }

  buildCSVTemplate(reports): any {
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
    const form_name = this.testData[0]['_form_name'].replace(/ /g, '');

    const finalRawResults = [];
    for (const item of this.testData){
       let temp = this.sortObject(item);
       finalRawResults.push(temp);
    }

    new Angular5Csv(finalRawResults, 'Raw.' + form_name + '.'+ new Date().toLocaleString(), options);
  }

  sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
  }

}
