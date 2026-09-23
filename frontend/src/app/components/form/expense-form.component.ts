import { Component, EventEmitter, Output } from "@angular/core";
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
  @Output() expenseCreated = new EventEmitter<void>();

  categories: Category[] = Categories;
  error = "";

  newExpense: Expense = {
    description: "",
    value: 0,
    category: "Outros",
    date: new Date().toISOString().substring(0, 10)
  };

  constructor(private expenseService: ExpenseService) {}

  save() {
    this.error = "";

    if (!this.newExpense.description || this.newExpense.value <= 0) {
      this.error = "Preencha a descrição e um valor maior que zero";
      return;
    }

    this.expenseService.create(this.newExpense).subscribe({
      next: () => {
        this.expenseCreated.emit();
        this.newExpense = {
          description: '',
          value: 0,
          category: "Outros",
          date: new Date().toISOString().substring(0, 10)
        };
      },
      error: () => {
        this.error = "Não foi possivel salvar a despesa";
      }
    });
  }
}
