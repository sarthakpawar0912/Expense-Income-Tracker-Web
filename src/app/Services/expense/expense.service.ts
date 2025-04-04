import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "expense-income-tracker-production.up.railway.app/";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  postExpense(expense: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/expense/", expense);
  }
  
  getAllExpenses(): Observable<any> {
    return this.http.get(BASIC_URL + "api/expense/all");
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/expense/${id}`);
  }
  
  getExpenseById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/expense/${id}`);
  }

  updateExpense(id: number, expenseDTO: any): Observable<string> {
    return this.http.put<string>(BASIC_URL + `api/expense/${id}`, expenseDTO);
  }
  
}
