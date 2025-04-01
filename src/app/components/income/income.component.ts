import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../Services/income/income.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']  // Correct the styleUrls property
})
export class IncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  listOfCategory: string[] = [
    "Salary",
    "Freelancing",
    "Investment",
    "Stocks",
    "Bitcoin",
    "Bank Transfer",
    "Youtube",
    "Other"
  ];
  incomes: any;

  
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private incomeService:IncomeService
  ) {}

  ngOnInit() {
    this.getAllIncomes();
    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
  }


getAllIncomes(){
  this.incomeService.getAllIncomes().subscribe(res=>{
    this.incomes=res;
    console.log(this.incomes);
  })
}
  onSubmit() {
    this.incomeService.postIncome(this.incomeForm.value).subscribe(
      res=> {
        this.message.success("Income Posted SuccessFully",{nzDuration:5000});
        this.getAllIncomes();   
        this.incomeForm.reset();
      },error=> { 
            this.message.error("Error While Posting Income",{nzDuration:5000});
          }
    );
  } 


  
  deleteIncome(id: number) {
    this.incomeService.deleteIncome(id).subscribe(
      res => {
        this.message.success("Income deleted successfully", { nzDuration: 5000 });
        this.getAllIncomes();
      },
      (error: HttpErrorResponse) => { // Specify the type here as well
        this.message.error("Error while Deleting Income", { nzDuration: 5000 });
      }
    );

  }



}
