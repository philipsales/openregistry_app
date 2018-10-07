import { Component, OnInit } from '@angular/core';

import { ReportService } from 'app/core/services';
import { Report } from 'app/core/models';

import * as FileSaver from 'file-saver';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

//import * as jsPDF from 'jspdf';
declare var jsPDF: any;

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportListComponent implements OnInit {

  reports: Report[];
  testHeader: string[]=[];
  reportCounts: any[];
  private selectedReport: Report;

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    /*
    this.reportService
      .getReports()
      .then(reports => {
        console.log(reports);
        return this.reports = reports;
      });
      */

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

  downloadJSPDF(): any {
    var columns = [
      { title: "Demographics", datakey: "id" },
      { title: "Total", datakey: "name" }
    ];
    var rows = [
      { "id": 1, "name": "Male" },
      { "id": 2, "name": "Female" }
    ];

    var doc = new jsPDF('p', 'pt');
    doc.text("Breast Cancer Stats");
    doc.autoTable(columns, rows);
    doc.save("table.pdf");
  }

  onDownloadMedicalRaw(): any {
    console.log('hell0 ');
    this.reportService
      .getMedicalReportRaw()
      .subscribe(
        reportraw => {
          this.pivotTable(reportraw);
          //this.reports = reports;
        }
      );
  }


  onViewMedicalCount(): any {
    console.log('hell0 ');
    this.reportService
      .getMedicalReportCounts()
      .subscribe(
        reportcounts => {
          this.tableCounts(reportcounts);
          //this.reports = reports;
        }
      );
  }

  tableCounts(reports): any {
    this.reportCounts = reports.payload;
  }


  reportsTable: any[];
  tableHeaders: string[]=[]; 
  tableHeaders2: string[]=[]; 
  unique: string[]=[];
  testData: any[]=[];
  tempHeader: string[]=[];
  
  pivotTable(reports): any {

    this.testData = reports.payload;
    console.log('raw testData', this.testData);

    this.testData.map((headers) => {
      for (let key of Object.keys(headers)){
        this.tempHeader.push(key);
      }
    });

    console.log('v1 testData', this.testData);
    
    this.tableHeaders = this.tempHeader.sort().filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    })

    console.log('tableHealders', this.tableHeaders);

    for (let header of this.tableHeaders) {
      for (let keys of Object.values(this.testData)) {
          if(!(header in keys)){ 
            console.log('keys--header',keys[header]);
            keys[header] = "";
          }
      }
    } 

    console.log('v2 testdata--',this.testData[0]);
    console.log('v2 testdata-sort',this.sortObject(this.testData[0]));
    console.log('v2 testdata-values-',Object.values(this.testData[0]));
    console.log('v2 testdata-values-sort',Object.values(this.sortObject(this.testData[0])));

    var options = { 
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

    var foo = this.sortObject(this.testData[0]); 
    var bar = this.sortObject(this.testData[1]); 
    var barz = this.sortObject(this.testData[2]); 
    var foobar = this.testData[1]; 

    var fofo = [];
    fofo.push(foo);
    fofo.push(bar);
    fofo.push(barz);
   
    console.log('v2 fofo-',fofo);


    new Angular5Csv(fofo, 'raw-data-'+ new Date(), options);
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
