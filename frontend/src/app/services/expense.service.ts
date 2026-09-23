import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense, ExpenseResume } from "../models/expense.model";

@Injectable({ providedIn: "root" })
export class ExpenseService {
  private readonly baseUrl = "http://localhost:8080/api/expenses";

  constructor(private http: HttpClient) {}

  list(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl);
  }

  resume(): Observable<ExpenseResume> {
    return this.http.get<ExpenseResume>(`${this.baseUrl}/resume`);
  }

  create(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, expense);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
