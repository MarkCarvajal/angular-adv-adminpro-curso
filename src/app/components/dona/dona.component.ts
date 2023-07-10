import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html'
})
export class DonaComponent implements OnInit {

  ngOnInit() {
    this.doughnutChartData.labels = this.labels;
    this.doughnutChartData.datasets[0].data = this.data;
  }

  @Input() titulo: string = 'Sin titulo';
  @Input() labels: string[] = ['Label1', 'Label2', 'Label3'];
  @Input() data: number[] = [50, 30 , 20];


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [] ,
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059']
      },
    ],
  };

}
