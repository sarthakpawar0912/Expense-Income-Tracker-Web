import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../Services/expense/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
 
  expenseForm!: FormGroup;
  listOfCategory: string[] = [
    "Education", "Groceries", "Health", "Subscription",
    "Takeaways", "Clothing", "Travelling", "Other"
  ];
  expenses: any[] = []; // Typed as array for clarity
  id?: number; // Optional since it’s not always set

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if id exists in route params (for editing)
    this.id = this.activatedRoute.snapshot.params['id'];

    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.getAllExpenses();
    if (this.id) {
      this.getExpenseById(); // Load existing expense if editing
    }
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      console.log('Form data:', this.expenseForm.value);
      const expenseData = { ...this.expenseForm.value };
      // Ensure date is in ISO format (YYYY-MM-DD)
      expenseData.date = expenseData.date.toISOString().split('T')[0];

      this.expenseService.postExpense(expenseData).subscribe({
        next: (res) => {
          this.message.success("Expense posted successfully", { nzDuration: 5000 });
          this.expenseForm.reset();
          this.getAllExpenses(); // Refresh list
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error while posting:", error);
          this.message.error(`Error while posting expense: ${error.status} - ${error.message}`, { nzDuration: 5000 });
        }
      });
    }
  }
  
  getAllExpenses(): void {
    this.expenseService.getAllExpenses().subscribe(
      (res) => {
        this.expenses = res;
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this.message.error("Error fetching expenses", { nzDuration: 5000 });
      }
    );

    this.getExpenseById();
  }

  getExpenseById() {
    if (!this.id) return; // Avoid making a request if `id` is undefined

    this.expenseService.getExpenseById(this.id).subscribe(
      (res) => {
        this.expenseForm.patchValue(res);
      },
      (error) => {
        this.message.error("Something went wrong.", { nzDuration: 5000 });
      }
    );
  }

  updateExpense(id: number): void {
    this.router.navigateByUrl(`expense/${id}/edit`);
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(
      (res) => {
        this.message.success("Expense deleted successfully", { nzDuration: 5000 });
        this.getAllExpenses();
      },
      (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this.message.error("Error while deleting expense", { nzDuration: 5000 });
      }
    );
  }

}
