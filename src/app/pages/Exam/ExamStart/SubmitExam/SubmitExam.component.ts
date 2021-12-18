import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-SubmitExam',
  templateUrl: './SubmitExam.component.html',
  styleUrls: ['./SubmitExam.component.css']
})
export class SubmitExamComponent implements OnInit {
  examResult: any = {};
  constructor(private examService: ExamService,
    private locationStrategy: LocationStrategy,) {
    this.examResult = this.examService.commonData;
    this.preventBackButton();
  }

  ngOnInit() {
  }

  // Define a function to handle back button and use anywhere
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }
}
