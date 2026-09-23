import { Component, output, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Expense, Categories, Category } from "../../models/expense.model";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: "app-expense-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./expense-form.component.html",
  styleUrl: "./expense-form.component.css"
})
export class ExpenseFormComponent {
  readonly expenseCreated = output<void>();
  readonly categories = signal<Category[]>(Categories);
  readonly error = signal<string>("");

  readonly newExpense = signal<Omit<Expense, "id">>({
    description: "",
    value: 0,
    category: "Outros",
    date: new Date().toISOString().substring(0, 10)
  });

  constructor(
    private expenseService: ExpenseService
  ) {}

  save(): void {
    const currentExpense = this.newExpense();

    if (!currentExpense.description.trim() || currentExpense.value <= 0) {
      this.error.set("Preencha a descrição e um valor maior que zero");

      setTimeout(() => {
        this.error.set("");
      }, 4000);
      return;
    }

    this.error.set("");

    this.expenseService.create(currentExpense as Expense).subscribe({
      next: () => {
        this.expenseCreated.emit();
        this.newExpense.set({
          description: "",
          value: 0,
          category: "Outros",
          date: new Date().toISOString().substring(0, 10)
        });
      },
      error: (error: any) => {
        this.error.set("Não foi possivel salvar a despesa");

        setTimeout(() => {
          this.error.set("");
        }, 4000);
      }
    });
  }
}
