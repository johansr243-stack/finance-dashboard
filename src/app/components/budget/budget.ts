import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 1. Importamos el módulo de formularios
import { FinanceService } from '../../services/finance';

interface Expense {
  category: string;
  amount: number;
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule], // 2. Lo registramos aquí
  templateUrl: './budget.html',
  styleUrl: './budget.css'
})
export class BudgetComponent {
  financeService = inject(FinanceService);
  newExpenseName: string = '';
  newExpenseAmount: number | null = null;

  /** Incremento del stepper +/- de ingreso */
  readonly incomeStep = 50000;

  increaseIncome() {
    this.financeService.monthlyIncome.update(v => v + this.incomeStep);
  }

  decreaseIncome() {
    this.financeService.monthlyIncome.update(v => Math.max(0, v - this.incomeStep));
  }

  // 3. Modificamos las funciones para que usen el servicio
  addExpense() {
    if (this.newExpenseName && this.newExpenseAmount) {
      // Actualizamos la lista central del servicio
      this.financeService.monthlyExpenses.update(expenses => [
        ...expenses,
        { category: this.newExpenseName!, amount: this.newExpenseAmount! }
      ]);
      this.newExpenseName = '';
      this.newExpenseAmount = null;
    }
  }

  deleteExpense(index: number) {
    this.financeService.monthlyExpenses.update(expenses => {
      const newExpenses = [...expenses];
      newExpenses.splice(index, 1);
      return newExpenses;
    });
  }
}