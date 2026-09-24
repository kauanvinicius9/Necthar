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

  readonly displayValue = signal<string>("R$ 0,00");

  constructor(
    private expenseService: ExpenseService
  ) {}

  onValueInput(event: Event): void {
    const input =  event.target as HTMLInputElement;

    let digits = input.value.replace(/\D/g, "");

    if (!digits) digits = "0";

    const numericValue = parseFloat(digits) / 100;
    this.newExpense.update((exp) => ({ ...exp, value: numericValue }));

    const formatted = numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
    this.displayValue.set(formatted)
  }

  save(): void {
    const currentExpense = this.newExpense();
    const description = currentExpense.description.trim();
    const value = Number(currentExpense.value.toFixed(2));

    if (!description) {
      this.setError("Escreva a descrição da despesa");
      return;
    }

    if (isNaN(value) || value <= 0) {
      this.setError("O valor deve ser maior que R$ 0.00");
      return;
    }

    if (value > 1_000_000) {
      this.setError("O valor máximo permitido por despesa é R$ 1.000.000,00");
      return;
    }

    this.error.set("");

    this.expenseService.create({ ...currentExpense, value } as Expense).subscribe({
      next: () => {
        this.expenseCreated.emit();
        this.resetForm();
      },
      error: (error: any) => {
        this.setError("Não foi possivel salvar a despesa");
      }
    });
  }

  private setError(message: string): void {
    this.error.set(message);
    setTimeout(() => {
      this.error.set("");
    }, 4000);
  }

  private resetForm(): void {
    this.newExpense.set({
      description: "",
      value: 0,
      category: "Outros",
      date: new Date().toISOString().substring(0, 10)
    });
    
    this.displayValue.set("R$ 0,00");
  }
}
