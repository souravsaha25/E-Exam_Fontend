import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ExamsModel } from 'src/app/Model/ExamModel';
import { faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons'
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-SpecificTypeExamList',
  templateUrl: './SpecificTypeExamList.component.html',
  styleUrls: ['./SpecificTypeExamList.component.css']
})
export class SpecificTypeExamListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'examName', 'description', 'totalQus', 'time', 'marks', 'start'];
  dataSource = new MatTableDataSource<ExamsModel>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  start = faArrowRight;
  view = faEye;

  listOfExams: any = {} as ExamsModel;
  TId: number = 0;
  ExamData: ExamsModel = {};

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private examService: ExamService) {
    this.route.queryParams.subscribe(params => {
      this.TId = Number(params['tid']);
      this.getDetails(this.TId);
    })
  }

  ngOnInit() {
  }

  getDetails(id: number): void {
    let UID = sessionStorage.getItem('userID');
    this.ExamData.typeID = id;
    this.ExamData.UserID = Number(UID);
    this.ExamData.id = 0;
    this.examService.getAllExamByTopic(this.ExamData).subscribe(
      (response) => {
        this.listOfExams = response;
        this.dataSource = new MatTableDataSource(this.listOfExams);
        this.dataSource.paginator = this.paginator!;
        this.dataSource.sort = this.sort!;
      }, (error) => {

      }, () => {

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
