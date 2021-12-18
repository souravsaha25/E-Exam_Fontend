import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ExamsModel } from 'src/app/Model/ExamModel';
import { QAModel } from 'src/app/Model/QAModel';
import { ExamService } from 'src/app/Services/exam.service';
import { ExamResultModel } from '../../../Model/ExamResultModel';

@Component({
  selector: 'app-ExamDetails',
  templateUrl: './ExamDetails.component.html',
  styleUrls: ['./ExamDetails.component.css']
})
export class ExamDetailsComponent implements OnInit {
  icon = faClock;
  EId: number = 0;
  chExam: boolean = true;
  ExamData: ExamsModel = {} as ExamsModel;
  ExamResult!: ExamResultModel;
  commonData: any = {};

  QusAnsData!: any;

  constructor(private Activaroute: ActivatedRoute,
    private routes: Router,
    private examService: ExamService) {
    this.Activaroute.queryParams.subscribe(params => {
      this.EId = Number(params['eid']);

      this.getDetails(0, this.EId);
    });
  }

  ngOnInit() {
  }

  getDetails(Tid: number, Eid: number) {
    let UID = sessionStorage.getItem('userID');
    this.ExamData.typeID = Tid;
    this.ExamData.UserID = Number(UID);
    this.ExamData.id = Eid;
    this.examService.getAllExamByTopic(this.ExamData).subscribe(
      (response) => {
        this.commonData = response;
        if (!this.commonData[0].attend) {
          this.getExamByID(this.EId);
        } else {
          this.routes.navigate(['/ExamType']);
        }
      }, (error) => {
        this.routes.navigate(['/ExamType']);
      });
  }

  getExamByID(id: number): void {
    this.examService.getExamByID(id).subscribe(
      (response: ExamsModel) => {
        this.ExamData = response;
        this.examService.examTimeMin = 0;
        this.examService.examTimeMin = (response.time.minutes * 60);
      }, (error) => {

      }, () => {

      });
  }

  startExam(id?: number): void {
    this.ExamResult = {} as ExamResultModel;
    this.ExamResult.ExamID = this.EId;
    this.ExamResult.UserID = Number(sessionStorage.getItem('userID'));
    this.ExamResult.Marks = 0;
    this.ExamResult.Attend = true;
    this.ExamResult.type = "insert";

    this.examService.saveExamResult(this.ExamResult).subscribe(
      (response) => {

      },
      (error) => {

      },
      () => {
        this.routes.navigate(['/StartExam'], { queryParams: { examID: this.EId } });
      }
    );
  }
}
