import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from '../../../Services/income/income.service';

@Component({
  selector: 'app-update-income',
  standalone:false,
  templateUrl:'./update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  listOfCategory: string[] = [
    "Salary", "Freelancing", "Investment", "Stocks", "Bitcoin", "Bank Transfer", "Youtube", "Other"
  ];
  id!: number;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incomeService: IncomeService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.incomeForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.getIncomeById();
  }

  getIncomeById() {
    this.incomeService.getIncomeById(this.id).subscribe(
      (res) => {
        this.incomeForm.patchValue({
          ...res,
          date: new Date(res.date) // Convert string to Date object
        });
      },
      (error) => {
        this.message.error("Error fetching income details", { nzDuration: 5000 });
      }
    );
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(
        res => {
          this.message.success("Income updated successfully", { nzDuration: 5000 });
          this.router.navigateByUrl("/income");
        },
        error => {
          this.message.error("Error while updating income: " + error.message, { nzDuration: 5000 });
        }
      );
    }
  }
}