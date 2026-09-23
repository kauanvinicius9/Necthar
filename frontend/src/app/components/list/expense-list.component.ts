import { Component, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Expense } from "../../models/expense.model";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: "app-expense-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./expense-list.component.html",
  styleUrl: "./expense-list.component.css"
})
export class ExpenseListComponent {
  readonly expenses = input<Expense[]>([]);
  readonly deletedExpense = output<void>();

  constructor(
    private expenseService: ExpenseService
  ) {}

  delete(id?: number) {
    if (id === undefined) return;
    this.expenseService.delete(id).subscribe(() => this.deletedExpense.emit());
  }
}
