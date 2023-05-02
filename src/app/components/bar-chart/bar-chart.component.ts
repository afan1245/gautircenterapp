import { Component, ElementRef, Input, SimpleChanges, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chartData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  chartOptions: any;

  newDataArray: any = [];
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
          type: 'bar',
          height: (9 / 16) * 55 + '%',

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
        let yearsData: any = [];
        console.log('Year data', resp)
        resp.forEach((item: IYear) => {
          const itemData = [
            item.year,
            item.total,
          ];
          yearsData.push(itemData);
        })
        this.chartOptions = {
          chart: {
            type: 'bar'
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
          // legend: {
          //   layout: 'vertical', // changed to vertical layout
          //   align: 'right', // moved to the right
          //   verticalAlign: 'top', // moved to the top
          //   x: -10, // adjust x position to align with chart
          //   reversed: true
          // },
          plotOptions: {
            series: {
              stacking: 'normal',
              dataLabels: {
                enabled: true
              }
            }
          },
          series: [
            {
              name: 'Sales',
              data: yearsData,

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

    // chart: {
      //   type: 'bar'
      // },
      // title: {
      //   text: this.options.text
      // },
      // xAxis: {
      //   categories: this.options.categories
      // },
      // yAxis: {
      //   min: 0,
      //   title: {
      //     text: 'Goals'
      //   }
      // },
      // legend: {
      //   layout: 'vertical', // changed to vertical layout
      //   align: 'right', // moved to the right
      //   verticalAlign: 'top', // moved to the top
      //   x: -10, // adjust x position to align with chart
      //   reversed: true
      // },
      // plotOptions: {
      //   series: {
      //     stacking: 'normal',
      //     dataLabels: {
      //       enabled: true
      //     }
      //   }
      // },
      // series: this.options.series
