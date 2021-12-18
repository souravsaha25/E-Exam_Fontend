import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPrint, faCheckCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { ExamsModel } from 'src/app/Model/ExamModel';
import { ExamService } from 'src/app/Services/exam.service';
import { ExamResultModel } from 'src/app/Model/ExamResultModel';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ExamAnalysis',
  templateUrl: './ExamAnalysis.component.html',
  styleUrls: ['./ExamAnalysis.component.css']
})
export class ExamAnalysisComponent implements OnInit {
  print = faPrint;
  right = faCheckCircle;
  wrong = faWindowClose;

  currentDate: any;
  PfdData: any;
  pdfBtn: any;
  QADiv: any;
  EId: number = 0;
  examModel!: ExamsModel;
  examResultAnalysis: ExamResultModel = {} as ExamResultModel;

  constructor(private Activaroute: ActivatedRoute,
    private examService: ExamService) {
    this.Activaroute.queryParams.subscribe(params => {
      this.EId = Number(params['eid']);
      this.getExamAnalysis(this.EId);
    });
  }

  ngOnInit() {
  }

  getExamAnalysis(Eid: number) {
    this.examModel = {} as ExamsModel;
    this.examModel.UserID = Number(sessionStorage.getItem('userID'));
    this.examModel.id = Eid;

    this.examService.getExamAnalysisResult(this.examModel).subscribe((data: ExamResultModel) => {
      this.examResultAnalysis = data;
    }, (error) => {

    }, () => {

    });
  }

  public generatePDF(): void {
    this.QADiv = document.getElementById('QADiv');
    this.QADiv.classList.remove('ScrollStyle');

    this.pdfBtn = document.getElementById('pdfBtn');
    this.pdfBtn.classList.add('d-none');

    this.PfdData = document.getElementById('pdfDiv');
    html2canvas(this.PfdData).then(canvas => {

      let fileWidth = 200;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let Xposition = 5;
      let Yposition = 10;
      PDF.addImage(FILEURI, 'PNG', Xposition, Yposition, fileWidth, fileHeight);

      PDF.save(`Result_${this.examResultAnalysis.ExamName}.pdf`);
      this.QADiv.classList.add('ScrollStyle');
      this.pdfBtn.classList.remove('d-none');
    });
  }
}
