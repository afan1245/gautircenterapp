import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chartData.service';
import { Router } from '@angular/router';
import {
  faSortDown,
  faSortUp,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  originalOrdersTotalToday: any;
  originalOrdersTotalTodayAbbr: any;
  currentYearTotal: any;
  currentYearTotalAbbr: any;
  pickedYearTotal: any;
  pickedYearTotalAbbr: any;
  percentChange: any;

  faSortDown = faSortDown;
  faSortUp = faSortUp;
  faCalendar = faCalendar;

  yearData: any = [];
  dataRows = [];

  loading = false;

  selectedYear = '';
  selectedMonth = '';
  selectedDay = '';
  loader = false;

  showChangeModal = false;
  selectCompareYear: any;

  yearList = [];
  monthList: {
    monthNumber: number;
    monthName: string;
  }[] = [];
  dayList = [];
  hourList = [];

  customGoal = 0;
  customGoalAbbr = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(this.customGoal);
  customGoalProgress: any;

  isEditable: boolean = false;

  customDate = new Date();
  model: any = null;
  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: true,
    dateFormat: 'dd.mm.yyyy',
    // other options are here...
    appendSelectorToBody: true,
    markCurrentDay: true,
    stylesData: {
      selector: 'dp1',
      styles: `
        .dp1 .myDpIconLeftArrow,
        .dp1 .myDpIconRightArrow,
        .dp1 .myDpHeaderBtn {
          color: #fff;
        }
        .dp1 .myDpHeaderBtn:focus,
        .dp1 .myDpMonthLabel:focus,
        .dp1 .myDpYearLabel:focus {
          color: #66afe9;
        }
        .dp1 .myDpDaycell:focus,
        .dp1 .myDpMonthcell:focus,
        .dp1 .myDpYearcell:focus {
          box-shadow: inset 0 0 0 1px #66afe9;
        }
        .dp1 .myDpSelector:focus {
          box-shadow: -1px 1px 6px 0px #ADD8E6;
        }
        .dp1 .myDpSelectorArrow:after {
          border-color: rgba(108, 117, 125, 0);
          border-bottom-color: #19376D;
        }
        .dp1 .myDpSelectorArrow:focus:before {
          border-bottom-color: #ADD8E6;
        }
        .dp1 .myDpCurrMonth,
        .dp1 .myDpMonthcell,
        .dp1 .myDpYearcell {
          color: #fff;
          font-weight: bold;
        }
        .dp1 .myDpDaycellWeekNbr {
          color: #fff;
          background-color: #19376D;
        }
        .dp1 .myDpPrevMonth,
        .dp1 .myDpNextMonth {
          color: #bbb;
        }
        .dp1 .myDpWeekDayTitle {
          background-color: #19376D;
          color: #fff;
          font-weight: bold;
        }
        .dp1 .myDpHeaderBtnEnabled:hover,
        .dp1 .myDpMonthLabel:hover,
        .dp1 .myDpYearLabel:hover,
        .dp1 .myDpFooterBtn:hover {
          color: #fff;
        }
        .dp1 .myDpMarkCurrDay,
        .dp1 .myDpMarkCurrMonth,
        .dp1 .myDpMarkCurrYear {
          border-bottom: 2px solid #fff;
        }
        .dp1 .myDpTableSingleDay:hover,
        .dp1 .myDpTableSingleMonth:hover,
        .dp1 .myDpTableSingleYear:hover {
          background-color: #fff;
          color: #000;
          font-weight: bold;
        }
        .dp1 .myDpDaycell,
        .dp1 .myDpMonthcell,
        .dp1 .myDpYearcell {
          background-color: #19376D;
        }
        .dp1 .myDpRangeColor {
          background-color: #0B2447;
          color: #fff;
        }
        .dp1 .myDpSelectedDay,
        .dp1 .myDpSelectedMonth,
        .dp1 .myDpSelectedYear {
          background-color: #aaa;
          color: #fff;
          font-weight: bold;
          box-shadow: inset 0 0 0 1px #fff;
        }
        .dp1 .myDpSelector,
        .dp1 .myDpMonthYearSelBar,
        .dp1 .myDpFooterBar {
          background-color: #19376D;
        }
        .dp1 .myDpDisabled {
          color: #fff;
          background: repeating-linear-gradient(-45deg, #19376D 7px, #d3d3d3 8px, transparent 7px, transparent 14px);
        }
        .dp1 .myDpHighlight {
          color: 	#e7131a;
        }
       `,
    },
  };

  onRangeSelect(range: any) {
    console.log(range);
    if (range === '1d') {
      this.chartData
        .getOrderTotalForRange('2023-01-30', '2023-01-31')
        .subscribe({
          next: (resp: any) => {
            console.log('dateChangeResp', resp);
            this.originalOrdersTotalToday = resp[0].original_orders_total;
            this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(this.originalOrdersTotalToday);
            this.customGoalProgress =
              ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
                1
              ) + '%';
          },
        });
    }
  }

  makeEditable() {
    this.isEditable = true;
  }

  constructor(
    private chartData: ChartService,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  onGlobalDateRangeChanged(date: NgbDate) {
    if (!this.globalFromDate && !this.globalToDate) {
      this.globalFromDate = date;
    } else if (
      this.globalFromDate &&
      !this.globalToDate &&
      date.after(this.globalFromDate)
    ) {
      this.globalToDate = date;
    } else {
      this.globalToDate = null;
      this.globalFromDate = date;
    }

    const beginDate =
      this.globalFromDate.year +
      '-' +
      this.globalFromDate.month +
      '-' +
      this.globalFromDate.day;
    const endDate = this.globalToDate
      ? this.globalToDate.year +
        '-' +
        this.globalToDate.month +
        '-' +
        this.globalToDate.day
      : null;
    if (beginDate && endDate) {
      this.fullDate = beginDate + ' to ' + endDate;
      this.chartData.getOrderTotalForRange(beginDate, endDate).subscribe({
        next: (resp: any) => {
          console.log('dateChangeResp', resp);
          this.originalOrdersTotalToday = resp[0].original_orders_total;
          this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short',
          }).format(this.originalOrdersTotalToday);
          this.customGoalProgress =
            ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(
              1
            ) + '%';
        },
      });
    }
  }

  onDateChanged(event: IMyDateModel) {
    const begin = event.dateRange?.beginDate;
    const end = event.dateRange?.endDate;

    const beginDate = begin
      ? begin.year + '-' + begin.month + '-' + begin.day
      : null;
    const endDate = end ? end.year + '-' + end.month + '-' + end.day : null;

    this.chartData.getOrderTotalForRange(beginDate, endDate).subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.customGoal = resp[0].original_orders_total;
        this.customGoalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.customGoal);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });
  }

  makeNonEditable() {
    this.isEditable = false;
  }

  setCustomGoal(event: any) {
    this.customGoal = event.target.value;
    this.customGoalAbbr = Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(this.customGoal);
    this.customGoalProgress =
      ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
      '%';
  }

  toggleChangeModal() {
    this.showChangeModal = !this.showChangeModal;
    console.log('showChangeModal', this.showChangeModal);
  }

  onSelectCompareYearChange(event: any) {
    this.selectCompareYear = event.target.value;
    console.log('selectCompareYear', this.selectCompareYear);
  }

  ngOnInit(): void {
    this.chartData.getOrderTotalForRange('2023-01-31', '2023-01-31').subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.originalOrdersTotalToday = resp[0].original_orders_total;
        this.originalOrdersTotalTodayAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.originalOrdersTotalToday);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });

    this.chartData.getOrderTotalForRange('2023-01-30', '2023-01-30').subscribe({
      next: (resp: any) => {
        console.log('dateChangeResp', resp);
        this.customGoal = resp[0].original_orders_total;
        this.customGoalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.customGoal);
        this.customGoalProgress =
          ((this.originalOrdersTotalToday / this.customGoal) * 100).toFixed(1) +
          '%';
      },
    });

    this.chartData.getData(2023).subscribe({
      next: (resp: any) => {
        this.currentYearTotal = resp[0].original_orders_total;
        this.currentYearTotalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.currentYearTotal);
        this.percentChange =
          ((this.currentYearTotal - this.pickedYearTotal) /
            this.pickedYearTotal) *
          100;
      },
    });
    this.chartData.getData(2022).subscribe({
      next: (resp: any) => {
        this.pickedYearTotal = resp[0].original_orders_total;
        this.pickedYearTotalAbbr = Intl.NumberFormat('en-US', {
          notation: 'compact',
          compactDisplay: 'short',
        }).format(this.pickedYearTotal);
        this.percentChange =
          ((this.currentYearTotal - this.pickedYearTotal) /
            this.pickedYearTotal) *
          100;
      },
    });
  }

  onSelectYearChange(event: any) {
    this.selectedYear = event.target.value;
    console.log('selectedYear', this.selectedYear);
    this.loader = true;

    this.chartData.getOrderTotalForYear(this.selectedYear).subscribe({
      next: (resp: any) => {
        this.yearData = [];
        console.log('Year data', resp);
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        this.monthList = resp.map((item: any) => {
          return {
            monthNumber: monthNames.indexOf(item.monthName) + 1,
            monthName: item.monthName,
          };
        });
        console.log('monthList', this.monthList);
        resp.forEach((item: IItem) => {
          const itemData = [item.monthName, item.total];
          this.yearData.push(itemData);
        });
        console.log('yearDATA', this.yearData);
        this.chartData.dataArray.next(this.yearData);
        this.loader = false;
      },
    });
  }

  onSelectMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    console.log('selectedMonth', this.selectedMonth);

    this.loader = true;

    this.chartData
      .getOrderTotalByDay(this.selectedYear, this.selectedMonth)
      .subscribe({
        next: (resp: any) => {
          let monthData: any = [];
          console.log('month Data', resp);
          this.dayList = resp.map((item: any) => item.day);
          resp.forEach((item: IDay) => {
            const itemData = [item.day, item.total];
            monthData.push(itemData);
          });
          console.log('New month data', monthData);
          this.chartData.dataArray.next(monthData);
          this.loader = false;
        },
      });
  }

  onSelectDayChange(event: any) {
    this.selectedDay = event.target.value;
    console.log('selectedDay', this.selectedDay);
    this.loader = true;

    this.chartData
      .getOrderTotalByHour(
        this.selectedYear,
        this.selectedMonth,
        this.selectedDay
      )
      .subscribe({
        next: (resp: any) => {
          let hourData: any = [];
          console.log('hour Data', resp);
          this.hourList = resp.map((item: any) => item.hour);
          resp.forEach((item: IHour) => {
            const itemData = [item.hour, item.total];
            hourData.push(itemData);
          });
          console.log('New month data', hourData);
          this.chartData.dataArray.next(hourData);
          this.loader = false;
        },
      });
  }

  barChartOptions = {
    text: 'New Bar Chart 1',
    categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17'],
    series: this.yearData,
  };
}

class IItem {
  'monthName': string;
  'total': number;
}

class IDay {
  'day': string;
  'total': number;
}

class IHour {
  'hour': string;
  'total': number;
}
