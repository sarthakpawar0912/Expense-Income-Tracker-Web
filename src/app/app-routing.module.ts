import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateExpenseComponent } from './components/expense/update-expense/update-expense.component';
import { IncomeComponent } from './components/income/income.component';
import { UpdateIncomeComponent } from './components/income/update-income/update-income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'expense/:id/edit', component: UpdateExpenseComponent },
  { path: 'income/:id/edit', component: UpdateIncomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
