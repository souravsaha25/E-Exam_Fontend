import { Component, Input, OnInit } from '@angular/core';
import { QAModel } from 'src/app/Model/QAModel';
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-QusNumber',
  templateUrl: './QusNumber.component.html',
  styleUrls: ['./QusNumber.component.css']
})
export class QusNumberComponent implements OnInit {
  @Input() QA_List: QAModel[] = [];

  constructor(private examService: ExamService) {

  }

  ngOnInit() {

  }

  ChangeQus(qusNo: number) {
    this.examService.currentQusNo = qusNo;
    this.examService.examQAList.forEach((value: QAModel) => {
      if (value.QusNo == this.examService.currentQusNo)
        this.examService.currentQA = value;
    });
    this.examService.getCurrentQA();
  }
}
