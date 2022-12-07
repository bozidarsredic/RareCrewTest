import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { __values } from 'tslib';
import {  Employee } from '../models/employee.model';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';


import { EmployeeService } from '../services/employee.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees : Employee[] = [];
  public chartLabels: string[] = [];
  public map = new Map<string, number>();
  public map2 = new Map<string, string>();
  public chartSeries:ApexNonAxisChartSeries= [];

  chartDetails:ApexChart={
  type:'pie',
  toolbar:{
    show:true
  }
  }

  constructor(private employeeService:EmployeeService) {}

  ngOnInit(): void {

     this.employeeService.getEmployees().subscribe(
      (data:Employee[])=>{

        this.employees=data
        this.employees.forEach(element => {
        var today = new Date(element.StarTimeUtc);
        var Christmas = new Date(element.EndTimeUtc);
        var diffMs = (Number(Christmas) - Number(today));
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        element.Time=diffHrs;

        if(this.map.has(element.EmployeeName)){
          if(element.EmployeeName !== null) {
            this.map.set(element.EmployeeName, Number(this.map.get(element.EmployeeName)) + diffHrs);
          }
        }
        else{
          if(element.EmployeeName !== null) {
            this.map.set(element.EmployeeName,diffHrs)
          }
        }

        });

       for( let [keys,item] of this.map.entries()){
        this.map2.set(item.toString(),keys);
       }
      for(let [keys,item] of this.map.entries()){
        if(keys !== null) {
          this.chartLabels.push(keys);
         this.chartSeries.push(item);
        }
     }

      }
    )
  }

  keyDescOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
    return Number(a.key) > Number(b.key) ? -1 : (Number(b.key) < Number(a.key) ? 1 : 0);
  }

  converStringToNumber(num: string){
    return parseInt(num);
  }

}
