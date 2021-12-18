import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamsModel } from 'src/app/Model/ExamModel';
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-ExamType',
  templateUrl: './ExamType.component.html',
  styleUrls: ['./ExamType.component.css']
})
export class ExamTypeComponent implements OnInit {

  listOfExamType: any;
  listAllExamByType: any;
  constructor(private fb: FormBuilder,
    private examService: ExamService) { }

  ExamData: ExamsModel = {}as ExamsModel;

  ngOnInit() {
    this.loadDataFromServer();
  }

  loadDataFromServer(): void {
    this.examService.getAllExamType().subscribe(data => {
      this.listOfExamType = data;
    })
  }
}
