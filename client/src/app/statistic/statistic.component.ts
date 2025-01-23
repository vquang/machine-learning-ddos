import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexPlotOptions, ApexFill } from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables } from 'chart.js';

import { COLUMNS_PREDICT, FEATURES, LABELS } from '../constant'
import { ApiService } from '../api.service';

Chart.register(...registerables);
interface DataStructure {
  [key: string]: {
    [key: string]: number; // Inner object keys are strings, and values are numbers
  };
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit {
  @ViewChild('labelBar', { static: true }) labelBar!: ElementRef;
  @ViewChild('featureBar', { static: true }) featureBar!: ElementRef;
  @ViewChild('timestampLine') timestampLine!: ElementRef<HTMLCanvasElement>;
  labelChart: Chart | null = null;
  featureChart: Chart | null = null;
  data: DataStructure = {};
  destinationIP = {};
  sourceIP = {};
  destinationPort = {};
  sourcePort = {};
  protocol = {};
  timestamp = {};
  label = {};
  featureState = 'Destination IP'

  constructor(private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.statistics();
  }

  loadLabelChart(feature: object, name = ''): void {
    const labels = Object.keys(feature);
    const values = Object.values(feature);

    let bar = this.labelBar.nativeElement;

    this.labelChart = new Chart(bar, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: name,
            data: values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Label'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Totals'
            },
          }
        }
      }
    });
  }

  loadFeatureChart(feature: object, name = ''): void {
    const labels = Object.keys(feature);
    const values = Object.values(feature);

    let bar = this.featureBar.nativeElement;
    if (this.featureChart) {
      this.featureChart.destroy();
    }

    this.featureChart = new Chart(bar, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: name,
            data: values,
            backgroundColor: [
              'rgba(75, 192, 192, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Feature'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Totals'
            },
          }
        }
      }
    });
  }

  loadTimeChart(feature: object, name = ''): void {
    const labels = Object.keys(feature);
    const values = Object.values(feature);

    const test = this.timestampLine.nativeElement;

    new Chart(this.timestampLine.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Timestamp Data',
            data: values,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Timestamp'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Totals'
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  chooseFeature(name = ''):void {
    if(name === 'Destination IP') this.loadFeatureChart(this.destinationIP, name);
    if(name === 'Source IP') this.loadFeatureChart(this.sourceIP, name);
    if(name === 'Destination Port') this.loadFeatureChart(this.destinationPort, name);
    if(name === 'Source Port') this.loadFeatureChart(this.sourcePort, name);
    if(name === 'Protocol') this.loadFeatureChart(this.protocol, name);
    this.featureState = name;
  }

  statistics():void {
    const requestData = {
      filepath: localStorage.getItem('mainFile')
    };

    this.apiService.statistic(requestData).subscribe({
      next: (response) => {
        console.log(response);
        this.data = response;
        this.destinationIP = response['Destination IP'];
        this.sourceIP = response['Source IP'];
        this.destinationPort = response['Destination Port'];
        this.sourcePort = response['Source Port'];
        this.protocol = response['Protocol'];
        this.timestamp = response['Timestamp'];
        this.label = response['Label'];
        this.loadLabelChart(this.label, 'Label');
        this.chooseFeature('Destination IP')
        this.loadTimeChart(this.timestamp, 'Timestamp')
      },
      error: (error) => {
        console.error('Error fetching statistics:', error);
        this.toastr.error('Thất Bại', 'Kết Quả');
      }
    });
  }

}
