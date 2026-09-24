import { Component, OnInit, signal } from "@angular/core";
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
  readonly expenses = signal<Expense[]>([]);
  readonly resume = signal<ExpenseResume| null>(null);
  readonly loading = signal<boolean>(true);
  readonly connectionError = signal<boolean>(false);

  constructor(
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.connectionError.set(false);

    this.expenseService.list().subscribe({
      next: (data) => {
        this.expenses.set(data);
        this.loading.set(false);
      },

      error: (error: any) => {
        this.loading.set(false);
        this.connectionError.set(true);
        console.error("Erro ao conectar à API", error);

        setTimeout(() => {
          this.connectionError.set(false);
        }, 4000);
      }
    });

    this.expenseService.resume().subscribe({
      next: (r) => this.resume.set(r),
      error: (err) => console.error("Erro ao carregar resumo", err)
    });
  }
}
