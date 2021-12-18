import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AllExams',
  templateUrl: './AllExams.component.html',
  styleUrls: ['./AllExams.component.css']
})
export class AllExamsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Excam Name', 'Topic', 'Time','Total Quschins','Your Marks'];
  constructor() { }

  ngOnInit() {
  }

}
