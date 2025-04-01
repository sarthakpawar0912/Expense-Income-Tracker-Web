import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from '../../../Services/expense/expense.service';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss']
})
export class UpdateExpenseComponent implements OnInit {
 
  expenseForm!: FormGroup;
  listOfCategory: string[] = [
    "Education",
    "Groceries",
    "Health",
    "Subscription",
    "Takeaways",
    "Clothing",
    "Travelling",
    "Other"
  ];
  expenses: any;
  id!: number;  // Declare the variable without initializing it

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];  // Initialize 'id' in ngOnInit
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.getExpenseById();
  }

  getExpenseById() {
    this.expenseService.getExpenseById(this.id).subscribe(
      (res) => {
        this.expenseForm.patchValue(res);
      },
      (error) => {
        this.message.error('Something Went Wrong.', { nzDuration: 5000 });
      }
    );
  }

 
  
  // submitForm() {
  //   this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe(
  //     (res) => {
  //       // Assuming the response is a plain text message
  //       this.message.success(res, { nzDuration: 5000 });
  //       this.router.navigateByUrl("/expense");
  //     },
  //     (error) => {
  //       // Handle errors properly
  //       this.message.error(error.error || "Error while updating expense", { nzDuration: 5000 });
  //     }
  //   );
  // }
  
  submitForm() {
    this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe(res=>{
      this.message.success("Expense Updated Succesfully",{nzDuration:5000});
      this.router.navigateByUrl("/expense");
    },error=>{
      this.message.error("error while updating expense",{nzDuration: 5000});
    }
    );
  }
  
  
}
