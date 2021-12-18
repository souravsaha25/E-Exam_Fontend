import { ApexAxisChartSeries, ApexChart, ApexFill, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexXAxis } from "ng-apexcharts";

export interface ApexChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
}
