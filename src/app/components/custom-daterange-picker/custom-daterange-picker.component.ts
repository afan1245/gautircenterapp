import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {
  faCalendar,
  faSliders,
  faClockRotateLeft,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-daterange-picker',
  templateUrl: './custom-daterange-picker.component.html',
  styleUrls: ['./custom-daterange-picker.component.scss'],
})
export class CustomDaterangePickerComponent {
  @Output() onDateChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() fullDate = moment(new Date()).format('YYYY-MM-DD');
  @Input() onRangeSelect: any;
  @Output() changeDate = new EventEmitter<string>();

  date: any = moment(new Date()).format('YYYY-MM-DD');

  hoveredDate: NgbDate | null = null;

  faCalendar = faCalendar;
  faSliders = faSliders;
  faClockRotateLeft = faClockRotateLeft;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  divName = 'range';
  datePickerVisible = false;

  isButtonDisabled = true;

  constructor(calendar: NgbCalendar, private elementRef: ElementRef) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();

    if (this.fullDate === this.date) {
      this.isButtonDisabled = true;
    }
  }

  getDateString() {
    if (
      this.fullDate ===
      moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD')
    ) {
      return 'Yesterday';
    } else if (this.fullDate === this.date) {
      return 'Today';
    }

    return this.fullDate;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.datePickerVisible = false;
    }
  }

  changeDateHandler(value: any) {
    if (value === 'prev') {
      this.isButtonDisabled = false;
    }
    this.changeDate.emit(value);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      this.datePickerVisible = false;
    }
    this.onDateChange.emit(date);
    console.log('DATE', date);
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  selected: Date | null | any;
  choosedDate(e: any) {}

  changeSection(num: any) {
    this.divName = num;
  }
  setDatePickerVisible() {
    this.datePickerVisible = !this.datePickerVisible;
  }
}
