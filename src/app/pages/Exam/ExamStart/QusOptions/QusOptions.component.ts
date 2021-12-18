import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QAModel } from 'src/app/Model/QAModel';
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-QusOptions',
  templateUrl: './QusOptions.component.html',
  styleUrls: ['./QusOptions.component.css']
})
export class QusOptionsComponent implements OnInit {
  @Input() QA_Data: QAModel = {} as QAModel;
  @Input() QA_List: QAModel[] = [];

  //radioValue: string = "";

  examID: number = 0;
  i: number = 1;

  constructor(private examService: ExamService,
    private Activaroute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.examService.QA.subscribe((data:QAModel) => {
      this.QA_Data = data;
    }, (error) => {

    }, () => {
      console.log(this.QA_Data);
    });
  }

  saveResponce(qNo: number, res: number) {
    this.examService.examQAList.forEach((value: QAModel) => {
      if (value.QusNo == qNo) {
        value.GivenAnswer = this.QA_Data.GivenAnswer;
        if (res != 4)
          value.Response = res;
      }
    });
  }

  ChangeQus(qusNo: number) {
    this.examService.currentQusNo = qusNo;
    this.examService.examQAList.forEach((value: QAModel) => {
      if (value.QusNo == this.examService.currentQusNo)
        this.examService.currentQA = value;
    });
    this.examService.getCurrentQA();
  }

  saveNext(qNo: number) {
    if (this.QA_Data.GivenAnswer != "" && this.QA_Data.GivenAnswer !== undefined)
      this.saveResponce(qNo, 1);
    else
      this.saveResponce(qNo, 0);

    this.ChangeQus(qNo + 1);
  }

  PreviousQA(qNo: number) {
    this.saveResponce(qNo, 4);
    if (qNo > 1)
      this.ChangeQus(qNo - 1);
    else
      this.ChangeQus(qNo);
  }

  saveNextReview(qNo: number) {
    if (this.QA_Data.GivenAnswer != "" && this.QA_Data.GivenAnswer !== undefined)
      this.saveResponce(qNo, 2);
    else
      this.saveResponce(qNo, 3);

    this.ChangeQus(qNo + 1);
  }

  clearResponce(qNo: number) {
    this.saveResponce(qNo, 0);
    this.QA_Data.GivenAnswer = "";
  }

}
