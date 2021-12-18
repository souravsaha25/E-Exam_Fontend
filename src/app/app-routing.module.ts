import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponentComponent } from './pages/User/AddUser-component/AddUser-component.component';
import { LoginComponentComponent } from './pages/User/Login-component/Login-component.component';
import { LayoutComponentComponent } from './pages/Layout-component/Layout-component.component';
import { AllUsersComponent } from './pages/User/AllUsers/AllUsers.component';
import { DashboardComponent } from './pages/Dashboard/Dashboard.component';
import { RegisterComponent } from './pages/User/Register/Register.component';
import { ConfrimEmailComponent } from './pages/User/ConfrimEmail/ConfrimEmail.component';
import { ExamTypeComponent } from './pages/Exam/ExamType/ExamType.component';
import { SpecificTypeExamListComponent } from './pages/Exam/SpecificTypeExamList/SpecificTypeExamList.component';
import { ExamDetailsComponent } from './pages/Exam/ExamDetails/ExamDetails.component';
import { QusOptionPanelComponent } from './pages/Exam/ExamStart/QusOptionPanel/QusOptionPanel.component';
import { SubmitExamComponent } from './pages/Exam/ExamStart/SubmitExam/SubmitExam.component';
import { ExamAnalysisComponent } from './pages/Exam/ExamAnalysis/ExamAnalysis.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Login' },
  { path: 'Login', component: LoginComponentComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'confrimemail', component: ConfrimEmailComponent },
  {
    path: '', component: LayoutComponentComponent,
    children: [
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'AddUser', component: AddUserComponentComponent },
      { path: 'AllUsers', component: AllUsersComponent },
      { path: 'ExamType', component: ExamTypeComponent },
      { path: 'SpecificTypeExamList', component: SpecificTypeExamListComponent },
      { path: 'ExamDetails', component: ExamDetailsComponent },
      { path: 'StartExam', component: QusOptionPanelComponent },
      { path: 'SubmitExam', component: SubmitExamComponent },
      { path: 'ExamAnalysis', component: ExamAnalysisComponent }
    ]
  }
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
