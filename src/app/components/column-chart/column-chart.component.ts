import { Component, ElementRef, Input, SimpleChanges, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  chartOptions: any;

  newDataArray:any = [];
  subscription: Subscription = new Subscription;

  theme = 'light';
  loader = false;

  constructor(private chartData: ChartService) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target === document.body &&
          mutation.attributeName === 'class'
        ) {
          this.updateChartTheme();
        }
      });
    });
    observer.observe(document.body, { attributes: true });
  }



  ngOnInit() {

    this.subscription = this.chartData.dataArray.subscribe(array => {
      console.log('Array', array)
      this.newDataArray = array;

      this.chartOptions = {
        chart: {
          type: 'column',
          height: (9 / 16) * 40 + '%',

        },

        title: {
          text: 'Sales',
          style: {
            color: '#000',
            fontFamily: 'Verdana, sans-serif',
          },
        },

        // subtitle: {
        //   text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
        // },
        xAxis: {
          type: 'category',
          labels: {
            rotation: 0,
            style: {
              color: '#000',
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Dollars in 1000' + "'" + 's',
          },
          labels: {
            rotation: 0,
            style: {
              // height: '100px',
              color: '#000',
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: 'Sales: <b>{point.y:.1f} </b>',
        },
        series: [
          {
            name: 'Population',
            data: array,

            dataLabels: {
              enabled: false, // Remove data labels from columns

            },
            color: '#2f7ed8', // Change color of columns
            pointWidth: 25, // Reduce width of columns
            backgroundColor: '#FCFFC5',
          },
        ],

      };
      Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
      this.updateChartTheme();
    })
    this.loadInitialchart();
  }

  loadInitialchart() {
    this.loader = true;
    this.chartData.getOrderTotalYears().subscribe({
      next: resp => {
        let yearsData:any = [];
        console.log('Year data', resp)
        resp.forEach((item:IYear) => {
          const itemData = [
            item.year,
            item.total,
          ];
            yearsData.push(itemData);
        })
        this.chartOptions = {
          chart: {
            type: 'column',
            height: (9 / 16) * 55 + '%',
          },

          title: {
            text: 'Sales',
            style: {
              color: '#000',
              fontFamily: 'Verdana, sans-serif',
            },
          },

          xAxis: {
            type: 'category',
            labels: {
              rotation: 0,
              style: {
                color: '#000',

                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
          // yAxis: {

          //   labels: {
          //     enabled: false,
          //   },
          //   title: {
          //     text: null, // Hide y-axis title
          //   },
          //   axisLabel: {
          //     text: '', // Hide "Values" label
          //   },
          //   min: 0,
          // },
          yAxis: {
            min: 0,
            title: {
              text: 'Dollars in 1000' + "'" + 's',
            },
            labels: {
              rotation: 0,
              style: {
                // height: '100px',
                color: '#000',
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
              },
            },
          },
          legend: {
            enabled: false,
          },
          tooltip: {
            pointFormat: 'Sales: <b>{point.y:.1f}</b>',
          },
          series: [
            {
              name: 'Population',
              data: yearsData,

              dataLabels: {
                enabled: false, // Remove data labels from columns

              },
              color: '#2f7ed8', // Change color of columns
              pointWidth: 25, // Reduce width of columns
              backgroundColor: '#FCFFC5',
            },
          ],
          plotOptions: {
            column: {
              events: {
                click: function (event:any) {
                  const name = +event.point.name
                  alert('Value of clicked column: ' + name);
                },
              },
            },
          },

        };
        Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
        this.updateChartTheme();
        this.loader = false;
      },
      error: error => {

      }
    })
  }

  updateChartTheme() {
    this.theme = document.body.classList.contains('dark-theme')
      ? 'dark'
      : 'light';

    this.chartOptions.chart.backgroundColor =
      this.theme === 'dark' ? '#19376D' : '#fff';
    this.chartOptions.xAxis.labels.style.color =
      this.theme === 'dark' ? '#fff' : '#000';
      this.chartOptions.yAxis.labels.style.color =
      this.theme === 'dark' ? '#fff' : '#000';
    this.chartOptions.title.style.color =
      this.theme === 'dark' ? '#fff' : '#000';

    Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }

  ngAfterViewInit() {
    // Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

class IYear {
  "year": string;
  "total": number;
}

// column single color

// chart: {
//   type: 'column'
// },
// title: {
//   text: 'Sales'
// },
// // subtitle: {
// //   text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
// // },
// xAxis: {
//   type: 'category',
//   labels: {
//     rotation: 0,
//     style: {
//       fontSize: '13px',
//       fontFamily: 'Verdana, sans-serif'
//     }
//   }
// },
// yAxis: {
//   // min: 0,
//   // title: {
//   //   text: 'Population (millions)'
//   // }
//   labels: {
//     enabled: false
//   },
//   title: {
//     text: null // Hide y-axis title
//   },
//   axisLabel: {
//     text: '' // Hide "Values" label
//   },
//   min: 0
// },
// legend: {
//   enabled: false
// },
// tooltip: {
//   pointFormat: 'Sales: <b>{point.y:.1f} millions</b>'
// },
// series: [{
//   name: 'Population',
//   data: [

//     ['12:00', 27.79],
//     ['1:00', 22.23],
//     ['2:00', 21.91],
//     ['3:00', 21.74],
//     ['4:00', 21.32],
//     ['5:00', 20.89],
//     ['6:00', 20.67],
//     ['7:00', 19.11],
//     ['8:00', 16.45],
//     ['9:00', 16.38],
//     ['10:00', 15.41],
//     ['11:00', 15.25],
//     ['12:00', 14.974],
//     ['1:00', 14.970],
//     ['2:00', 14.86],
//     ['3:00', 14.16],
//     ['4:00', 13.79],
//     ['5:00', 13.64],

//   ],
//   dataLabels: {
//     enabled: false // Remove data labels from columns
//     // enabled: true,
//     // rotation: -90,
//     // color: '#FFFFFF',
//     // align: 'right',
//     // format: '{point.y:.1f}', // one decimal
//     // y: 10, // 10 pixels down from the top
//     // style: {
//     //   fontSize: '13px',
//     //   fontFamily: 'Verdana, sans-serif'
//     // }
//   },
//   color: '#b39ddb', // Change color of columns
//   pointWidth: 10 // Reduce width of columns
// }]

// stacked column

// chart: {
//   type: 'column'
// },
// title: {
//   text: 'Major trophies for some English teams',
//   align: 'left'
// },
// xAxis: {
//   categories: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United']
// },
// yAxis: {
//   min: 0,
//   title: {
//     text: 'Count trophies'
//   },
//   stackLabels: {
//     enabled: true,
//     style: {
//       fontWeight: 'bold',
//       color: ( // theme
//         Highcharts?.defaultOptions?.title?.style &&
//         Highcharts.defaultOptions.title.style.color
//       ) || 'gray',
//       textOutline: 'none'
//     }
//   }
// },
// legend: {
//   align: 'left',
//   x: 70,
//   verticalAlign: 'top',
//   y: 70,
//   floating: true,
//   backgroundColor:
//     Highcharts?.defaultOptions?.legend?.backgroundColor || 'white',
//   borderColor: '#CCC',
//   borderWidth: 1,
//   shadow: false
// },
// tooltip: {
//   headerFormat: '<b>{point.x}</b><br/>',
//   pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
// },
// plotOptions: {
//   column: {
//     stacking: 'normal',
//     dataLabels: {
//       enabled: true
//     }
//   }
// },
// series: [{
//   name: 'BPL',
//   data: [3, 5, 1, 13]
// }, {
//   name: 'FA Cup',
//   data: [14, 8, 8, 12]
// }, {
//   name: 'CL',
//   data: [0, 2, 6, 3]
// }]
