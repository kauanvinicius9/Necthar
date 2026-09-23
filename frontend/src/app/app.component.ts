import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Expense, ExpenseResume } from "./models/expense.model";
import { ExpenseService } from "./services/expense.service";
import { ExpenseFormComponent } from "./components/form/expense-form.component";
import { ExpenseListComponent } from "./components/list/expense-list.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent, ExpenseListComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  expenses: Expense[] = [];
  resume: ExpenseResume| null = null;
  loading = true;
  conectionError = false;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.conectionError = false;

    this.expenseService.list().subscribe({
      next: (data) => {
        this.expenses = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.conectionError = true;
      }
    });

    this.expenseService.resume().subscribe({
      next: (r) => (this.resume = r),
      error: () => {}
    });
  }
}
