import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PredictComponent } from './predict/predict.component';
import { ResultComponent } from './result/result.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'predict', component: PredictComponent },
  { path: 'result', component: ResultComponent },
  { path: 'statistic', component: StatisticComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
