import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { colors } from '../../utility/colors';
import { Subject } from 'rxjs';
import { WorksheetsService} from '../../services/worksheets.service';
import {Worksheet} from '../../models/worksheet';
import { Observable } from 'rxjs';
import {NgbDateFRParserFormatter} from '../../utility/dateformat';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarUtils,
  CalendarMonthViewDay,
  DAYS_OF_WEEK,
} from 'angular-calendar';

const RED_CELL: 'red-cell' = 'red-cell';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styles: [
    `
      .custom-event span a{
        color: #ffffff !important;
      }    `
  ]
})


export class CalendarComponent implements OnInit {
  view: string = 'month';
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  worksheets: Worksheet[];
  events: CalendarEvent[] ;
  locale: string = 'it';
  activeDayIsOpen = true;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  dateformatter: NgbDateFRParserFormatter;
  cssClass: string = RED_CELL;


  constructor(private wshSrv: WorksheetsService) { }

ngOnInit() {
this.wshSrv.list('').subscribe(result => {
                                    this.worksheets = result;
                                    this.events = [];
                                    for (let int = 0; int < this.worksheets.length; int++) {
                                      if (this.worksheets[int].status === false) {
                                        this.events.push(
                                          {
                                          title:  '<a style href="/worksheetdetail/' +
                                                  this.worksheets[int].worksheetID  + '/' + this.worksheets[int].userID + '">' +
                                                  'Scheda N.' +
                                                  this.worksheets[int].webID.toString() + ' : ' +
                                                  this.worksheets[int].brand + ' ' +
                                                  this.worksheets[int].model + ' ' +
                                                  this.worksheets[int].type + ' ' +
                                                  this.worksheets[int].color + ' ' + '(' +
                                                  this.worksheets[int].firstname + ' ' + this.worksheets[int].lastname + ')</a>',
                                          start: new Date(Number(this.worksheets[int].dateDelivery.substr(0, 4)),
                                                          Number(this.worksheets[int].dateDelivery.substr(4, 2)) - 1,
                                                          Number(this.worksheets[int].dateDelivery.substr(6, 2))),
                                          draggable: true,
                                          color: colors.red,
                                          cssClass: 'custom-event',
                                          meta: this.worksheets[int]

                                          }
                                        );
                                      }
                                  this.refresh.next();
                                    }

                                 }
                      );
}



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {

    this.dateformatter = new NgbDateFRParserFormatter();
    event.start = newStart;
    event.end = newEnd;

    console.log(this.dateformatter.YYYYMMDDformat2(newStart.getFullYear(), newStart.getUTCMonth() + 1 , newStart.getUTCDate() + 1 ));

   (<Worksheet> event.meta).dateDelivery = (this.dateformatter.YYYYMMDDformat2(newStart.getFullYear(),
                                                                               newStart.getUTCMonth() + 1 ,
                                                                               newStart.getUTCDate() + 1 )).toString();

  this.wshSrv.update(event.meta).subscribe();

  this.refresh.next();

  }



  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.events.length >= 3) {
        day.cssClass = 'background-color: #ff4a4a !important;';
      }
    });
  }
}
