import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-taskcalendar',
  templateUrl: './taskcalendar.component.html',
  styleUrls: ['./taskcalendar.component.scss']
})
export class TaskcalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialDate: '2021-09-12',
    editable: true,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: [
      {
        title: 'All Day Event',
        start: '2021-09-01'
      },
      {
        title: 'Long Event',
        start: '2021-09-07',
        end: '2021-09-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-09-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-09-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2021-09-11',
        end: '2021-09-13'
      },
      {
        title: 'Meeting',
        start: '2021-09-12T10:30:00',
        end: '2021-09-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2021-09-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2021-09-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2021-10-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2021-10-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2021-10-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2020-09-28'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
