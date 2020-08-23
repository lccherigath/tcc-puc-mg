import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, Observable, empty } from 'rxjs';
import { tap, catchError, map, take } from 'rxjs/operators';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import { MiningComplexService } from 'src/app/shared/services/mining-complex.service';
import { ToastMessageService } from 'src/app/shared/services/toast-message.service';
import { MiningComplex } from 'src/app/shared/models/mining-complex';



@Component({
  selector: 'app-mining-complex-schedule',
  templateUrl: './mining-complex-schedule.component.html',
  styleUrls: ['./mining-complex-schedule.component.scss'],
})
export class MiningComplexScheduleComponent implements OnInit {

  events: any[] = [];
  options: any;

  // miningComplex$: Observable<MiningComplex>;
  miningComplex: MiningComplex;
  error$ = new Subject<boolean>();
  miningComplexId: number;

  displayDialog = false;
  dialogTitle: string;

  // constructor(private modal: NgbModal) {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private miningComplexService: MiningComplexService,
    private toastr: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.miningComplexId = params.id;
      // console.log(id);

      this.loadData();

    });

    this.options = {
      // selectable: true,
      // eventColor: '#0f0',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin],
      // defaultDate: '2017-02-01',
      themeSystem: 'bootstrap',
      header: {
        left: 'prevYear,prev,today,next,nextYear addEventButton',
        center: '',
        right: 'title',
      },
      footer: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: '',
        right: 'listMonth,listWeek,listDay'
      },
      customButtons: {
        addEventButton: {
          text: 'novo evento',
          click: this.dateClick
        }
      },
      buttonText: {
        month: 'mês', week: 'semana', day: 'dia',
        listMonth: 'lista/mês', listWeek: 'lista/semana', listDay: 'lista/dia',
      },
      bootstrapFontAwesome: {
        today: 'fa-calendar-day',
        close: 'fa-times',
        prev: 'fa-chevron-left',
        next: 'fa-chevron-right',
        prevYear: 'fa-angle-double-left',
        nextYear: 'fa-angle-double-right',
        addEventButton: 'fa-calendar-plus',
      },
      businessHours: [ // specify an array instead
        {
          daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday, Tuesday, Wednesday, Thursday, Friday
          startTime: '08:00',
          endTime: '18:00'
        },
        {
          daysOfWeek: [ 6 ],
          startTime: '09:00',
          endTime: '14:00'
        }
      ],
      // editable: true,
      locale: 'pt-br',
      height: (window.innerHeight - 70 - 40 - 46),
      noEventsMessage: 'Nenhum evento para ser exibido',
      weekNumbers: true,
      weekLabel: '',
      nowIndicator: true,
      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      eventLimit: true,
      timeGrid: { eventLimit: 6 },
      eventLimitText: 'eventos',
      eventClick: this.eventClick,
      dateClick: this.dateClick,
    };
  }

  loadData = () => {
    // this.miningComplex$ = this.miningComplexService
    this.miningComplexService
      .loadById(this.miningComplexId, true)
      .subscribe(
        data => {
          this.miningComplex = data;
          // console.log(this.miningComplex.ativos);
          this.miningComplex.ativos.forEach(item => {
            item.manutencoes.forEach(element => {
              const event: any = {
                id: element.id,
                title: `${item.descricao}: ${element.descricao}`,
                // url: element,
                start: element.data_hora,
                end: element.conclusao,
                // color: 'red'
              };
              event.color = this.setColor(event);
              this.events.push(event);
            });
          });
        },
        error => {
          this.toastr.showMessage('error', '', 'Erro ao buscar dados no servidor');
          this.error$.next(true);
        }
      );
      // .pipe(
      //   // map((data: any) => this.miningComplex = data.results),
      //   // tap(console.log),
      //   // delay(1000),
      //   tap(ev => this.miningComplex = ev),
      //   catchError(error => {
      //     this.toastr.showMessage('error', '', 'Erro ao buscar dados no servidor');
      //     this.error$.next(true);
      //     return empty();
      //   }),
      //   take(1)
      // );
  }

  eventClick = (info) => {
    // alert('Event: ' + info.event.title);
    // console.log(info.event.id, info.event.start.toISOString().substring(0, 10), info.event.end.toISOString().substring(0, 10));
    this.displayDialog = true;
    this.dialogTitle = 'Alterar Evento';
  }

  dateClick = (info) => {
    // alert('Event: ' + info.event.title);
    // console.log(info.event.id, info.event.start.toISOString().substring(0, 10), info.event.end.toISOString().substring(0, 10));
    console.log(info.date);
    this.displayDialog = true;
    this.dialogTitle = 'Novo Evento';
  }

  setColor = (event: any) => {
    const today = new Date();
    const start = new Date(event.start);
    if (event.end) {
      const end = new Date(event.end);
      if (end < today) { // Concluído
        return '#187F3D'; // verde
      }
    } else {
      if (start < today) { // passado e sem fim
        return '#FFBE3A'; // laranja
      }
    }
    return '#116FBF'; // azul padrão do full calendar
  }

}
