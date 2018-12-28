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
  aggregated_data: any[] = [];

  questionnaire_form: Form[];
  questionnaire_fields: {} = {};

  dropdown_change: boolean;

  searchCriteria: SearchCriteria;
  has_errors: boolean;

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
          this.questionnaire_form = forms;
        }
    );
  }

  onDropdownFormType(newObject: any) {
    const search_criteria = [];
    search_criteria['form_name'] = newObject['value'];

    this.reportService
      .getMedicalReportCounts(search_criteria)
      .subscribe(
        reportcounts => {
          this.questionnaire_fields = reportcounts['payload'][0]['questions'];
          this.dropdown_change = true;
        }
      );
  }

  onClickSearch(search_criteria: any) {

    this.reportService
      .getMedicalReportCountResults(search_criteria)
      .subscribe(
        reportcountresults => {
          this.aggregated_data = reportcountresults;
        }
      );
  }

  onClickDownloadAggregate(): any {
    const csv_body: any[] = [];
    let csv_options: {} = {};
    let csv_headers: string[] = [];
    let form_name = '';
    let filename = '';

    csv_options = this.setCSVOptions(csv_headers);
    csv_headers = ['critieria', 'count'];
    form_name = this.searchCriteria.form_name.replace(/ /g, '');
    filename = 'Aggregated.' + form_name + '.' + new Date().toLocaleString();

    for (const key in this.aggregated_data) {
      if (key) {
        const temp = {};
        temp['key'] = key;
        temp['value'] = this.aggregated_data[key];
        csv_body.push(temp);
      }
    }

    this.exportCSV(csv_body, filename, csv_options);
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

  exportCSV(data, filename, options): any {
    return new Angular5Csv(data, filename, options);
  }

  onClickDownloadRaw(): any {

    this.reportService
      .getMedicalReportRaw()
      .subscribe(
        reportraw => {
          this.buildCSVTemplate(reportraw);
        }
      );
  }

  buildCSVTemplate(data): any {
    let csv_options: {} = {};
    let csv_headers: string[] = [];
    let csv_body = [];
    let raw_data: any[] = [];
    let form_name = '';
    let filename = '';

    raw_data = data.payload;
    form_name = raw_data[0]['_form_name'].replace(/ /g, '');
    filename = 'Raw.' + form_name + '.' + new Date().toLocaleString();

    csv_headers = this.setCSVHeader(raw_data);
    csv_body = this.setCSVBody(raw_data);
    csv_options = this.setCSVOptions(csv_headers);

    this.exportCSV(csv_body, filename, csv_options);
  }

  setCSVHeader(raw_data): any {
    let csv_tableHeaders: string[] = [];
    const csv_tempHeaders: string[] = [];

    raw_data.map((headers) => {
      for (const key of Object.keys(headers)){
        csv_tempHeaders.push(key);
      }
    });

    csv_tableHeaders = csv_tempHeaders.sort().filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    for (const header of csv_tableHeaders) {
      for (const keys of Object.values(raw_data)) {
          if (!(header in keys)) {
            keys[header] = '';
          }
      }
    }

    return csv_tableHeaders.sort();
  }

  setCSVBody(raw_data): any {
    const csv_data = [];

    for (const item of raw_data){
       const temp = this.sortObject(item);
       csv_data.push(temp);
    }

    return csv_data;
  }

  sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
  }

}
