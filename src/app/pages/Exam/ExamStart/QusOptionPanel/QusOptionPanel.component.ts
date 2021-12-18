import { LocationStrategy } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ExamsModel } from 'src/app/Model/ExamModel';
import { QASubmitModel } from 'src/app/Model/SubmitExamModel';
import { ExamService } from 'src/app/Services/exam.service';
import { QAModel } from '../../../../Model/QAModel';

const KEY = 'time';
let DEFAULT = 0;
@Component({
  selector: 'app-QusOptionPanel',
  templateUrl: './QusOptionPanel.component.html',
  styleUrls: ['./QusOptionPanel.component.css'],
  host: {
    '[class.card]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QusOptionPanelComponent implements OnInit {
  examData: any = {} as QAModel;
  QusAnsData: QAModel[] = [];
  examID: number = 0;
  QAData: QAModel = {} as QAModel;
  CurrentQAData: QAModel = {} as QAModel;
  QAList: QAModel[] = [];
  QASubmitList: QASubmitModel[] = [];
  QASubmit!: QASubmitModel;
  ExamData: ExamsModel = {} as ExamsModel;
  i: number = 1;
  commonData: any = {};
  Name: any = "" as string;

  config: CountdownConfig = { leftTime: DEFAULT, notify: 0 };
  constructor(private examService: ExamService,
    private Activaroute: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private routes: Router) {
    this.Activaroute.queryParams.subscribe(params => {
      this.examID = Number(params['examID']);
    })
    this.preventBackButton();
    this.examService.examQAList = [];
    this.CurrentQAData.GivenAnswer = "";

    this.getDetails(0, this.examID);
    this.Name = sessionStorage.getItem('name')
  }

  ngOnInit(): void {
    this.LoadgetExamByID(this.examID);

    DEFAULT = this.examService.examTimeMin;
    let value = +localStorage.getItem(KEY)!! ?? DEFAULT;
    if (value <= 0) value = DEFAULT;
    this.config = { ...this.config, leftTime: value };
  }

  getDetails(Tid: number, Eid: number) {
    let UID = sessionStorage.getItem('userID');
    this.ExamData.typeID = Tid;
    this.ExamData.UserID = Number(UID);
    this.ExamData.id = Eid;
    this.examService.getAllExamByTopic(this.ExamData).subscribe(
      (response) => {
        this.commonData = response;
        if (this.commonData[0].attend) {
          this.GetAllQusByExamID(this.examID);
        } else {
          this.routes.navigate(['/ExamType']);
        }
      }, (error) => {
        this.routes.navigate(['/ExamType']);
      });
  }

  // Define a function to handle back button and use anywhere
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  LoadgetExamByID(id: number): void {
    this.examService.getExamByID(id).subscribe(data => {
      this.examData = data;

    }, (error) => {

    }, () => {

    })
  }

  GetAllQusByExamID(id: number): void {
    this.examService.getAllQusByExamID(id).subscribe((data: QAModel[]) => {
      this.QusAnsData = data;
      this.QusAnsData.forEach((value: QAModel) => {
        this.QAData = value;
        this.QAData.QusNo = this.i;
        this.QAData.Response = 0;
        this.examService.examQAList.push(this.QAData);
        this.i++;
      });
    }, (error) => {

    }, () => {
      this.QAList = this.examService.examQAList;
      this.getCurrentQA();
      console.log(this.QAList);
    });
  }

  getCurrentQA() {
    this.QAList.forEach((value: QAModel) => {
      if (value.QusNo == this.examService.currentQusNo) {
        this.examService.currentQA = value;
      }
    });
    this.CurrentQAData = this.examService.currentQA;
  }

  handleEvent(ev: CountdownEvent) {
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem(KEY, `${ev.left / 1000}`);
    }
    if (ev.action === 'done') {
      this.confirmSubmit();
    }
  }

  confirmSubmit() {
    this.examService.examQAList.forEach((value: any) => {
      this.QASubmit = {} as QASubmitModel;
      this.QASubmit.QAID = value.ID;
      this.QASubmit.UserID = Number(sessionStorage.getItem('userID'));
      this.QASubmit.GivenAns = value.GivenAnswer;
      this.QASubmit.ExamID = this.examID;
      this.QASubmitList.push(this.QASubmit);
    });

    this.examService.insertSubmitExam(this.QASubmitList).subscribe(data => {
      this.examService.commonData = data;
    }, (error) => {

    }, () => {
      localStorage.removeItem('time');
      this.routes.navigate(['/SubmitExam']);
    });
  }

  cancel() {

  }
}
