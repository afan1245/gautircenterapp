import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBell, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent {
  faBell = faBell;
  faCalendar = faCalendar;

  customDate = new Date();

  @Output() onDateChanged: EventEmitter<any> = new EventEmitter<any>();
  @Input() fullDate: any;
  @Output() onRangeSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeDate = new EventEmitter<string>();

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

  changeDateHandler(value: any) {
    this.changeDate.emit(value);
  }

  onDateChange(event: any) {
    this.onDateChanged.emit(event);
  }

  myDateInit: boolean = true;
  model: any = null;

  constructor() {
    console.log(this.fullDate + 'full');
  }

  ngOnInit() {
    if (this.myDateInit) {
      // Initialize to specific date range with IMyDate object.
      // Begin date = today. End date = today + 3.
      let begin: Date = new Date();
      let end: Date = new Date();
      end.setDate(end.getDate() + 3);

      this.model = {
        isRange: true,
        dateRange: {
          beginDate: {
            year: begin.getFullYear(),
            month: begin.getMonth() + 1,
            day: begin.getDate(),
          },
          endDate: {
            year: end.getFullYear(),
            month: end.getMonth() + 1,
            day: end.getDate(),
          },
        },
      };
    } else {
      // Initialize to specific date range with a javascript date object.
      // Begin date = today. End date = today + 3.
      let begin: Date = new Date();
      let end: Date = new Date();
      end.setDate(end.getDate() + 3);

      this.model = {
        isRange: true,
        dateRange: {
          beginJsDate: begin,
          endJsDate: end,
        },
      };
    }
  }
}
