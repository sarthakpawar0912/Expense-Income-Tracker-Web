import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DemoNgZorroAntdModule } from './DemoNgZorroAntdModule';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateExpenseComponent } from './components/expense/update-expense/update-expense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardComponent, NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IncomeComponent } from './components/income/income.component';
import { UpdateIncomeComponent } from './components/income/update-income/update-income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    UpdateExpenseComponent,
    IncomeComponent,
    UpdateIncomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzPaginationModule,
    NzCardModule, // Single import for nz-card and nz-card-grid
    NzGridModule, // For nz-row and nz-col
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    DemoNgZorroAntdModule,
    NzCardModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzGridModule,
    NzDatePickerModule,
    HttpClientModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

