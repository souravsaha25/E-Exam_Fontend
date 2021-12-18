import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent, ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ApexStroke } from "ng-apexcharts";
import { ApexChartOptions } from 'src/app/Model/ApexChartOptions';
import { ExamsModel } from 'src/app/Model/ExamModel';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { ExamService } from 'src/app/Services/exam.service';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = {} as ChartComponent;
  public TotalExamData: Partial<any> = {} as Partial<any>;
  public TotalAttendExamData: Partial<any> = {} as Partial<any>;

  ExamData: ExamsModel = {} as ExamsModel;
  commonData: any = {};

  constructor(private router: Router,
    private dashboardService: DashboardService) {
      this.geDashboardDetails();
  }

  ngOnInit() {

  }

  geDashboardDetails() {
    let UID = sessionStorage.getItem('userID');
    this.ExamData.UserID = Number(UID);
    this.dashboardService.getDashboard_Radial(this.ExamData).subscribe(
      (response) => {
        this.commonData = response;
        this.TotalExamRadialChart(this.commonData.totalExam, "Total Exam");
        this.TotalAttendExamRadialChart(this.commonData.totalAttendExam, "Total Attend Exam");
      }, (error) => {

      }, () => {

      });
  }

  TotalExamRadialChart(value: number, text: string) {
    this.TotalExamData = {
      series: [value],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [text]
    };
  }

  TotalAttendExamRadialChart(value: number, text: string) {
    this.TotalAttendExamData = {
      series: [value],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [text]
    };
  }
}
