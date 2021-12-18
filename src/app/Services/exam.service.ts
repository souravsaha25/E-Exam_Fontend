import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExamsModel } from '../Model/ExamModel';
import { QAModel } from '../Model/QAModel';
import { Observable, Subject } from 'rxjs';
import { QASubmitModel } from '../Model/SubmitExamModel';
import { ExamResultModel } from '../Model/ExamResultModel';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  baseURL = environment.baseUrl;
  examID = 0;
  commonData: any = {};
  chExam: boolean = true;

  examQAList: QAModel[] = [];
  currentQusNo: number = 1;
  currentQA: QAModel = {} as QAModel;
  //examResult: any = {};
  examResultData: ExamResultModel = {} as ExamResultModel;
  examTimeMin: number = 0;
  ExamData: ExamsModel = {} as ExamsModel;

  private currentQAData = new Subject<QAModel>();
  QA = this.currentQAData.asObservable();

  constructor(private http: HttpClient) { }

  getAllExamType() {
    const token = sessionStorage.getItem('token');
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseURL + '/Exam/examtype', { headers: reqHeader });
  }

  getAllExamByTopic(data: ExamsModel) {
    const token = sessionStorage.getItem('token')
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL + '/Exam/allexam', data, { headers: reqHeader });
  }

  getExamByID(id: number) {
    const token = sessionStorage.getItem('token')
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL + '/Exam/exambyID', id, { headers: reqHeader });
  }

  getAllQusByExamID(id: number): Observable<QAModel[]> {
    const token = sessionStorage.getItem('token')
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<QAModel[]>(this.baseURL + '/Exam/GetAllQusByExamID', id, { headers: reqHeader });
  }
  saveExamResult(model: ExamResultModel) {
    const token = sessionStorage.getItem('token')
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL + '/Exam/SaveExamResult', model, { headers: reqHeader });
  }

  insertSubmitExam(modelList: QASubmitModel[]) {
    const token = sessionStorage.getItem('token')
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL + '/Exam/SubmitExam', modelList, { headers: reqHeader });
  }

  getExamAnalysisResult(data: ExamsModel): Observable<ExamResultModel> {
    const token = sessionStorage.getItem('token');
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ExamResultModel>(this.baseURL + '/Exam/ExamAnalysisResult', data, { headers: reqHeader });
  }

  getCurrentQA() {
    this.currentQAData.next(this.currentQA);
  }
}
