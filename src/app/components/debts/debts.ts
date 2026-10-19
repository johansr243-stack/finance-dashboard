import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService, Debt } from '../../services/finance';

@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debts.html',
  styleUrl: './debts.css'
})
export class DebtsComponent {
  financeService = inject(FinanceService);

  newDebtName = '';
  newDebtAmount: number | null = null;
  newDebtMinPayment: number | null = null;
  newDebtRate: number | null = null;

  addDebt() {
    if (this.newDebtName && this.newDebtAmount && this.newDebtMinPayment && this.newDebtRate != null) {
      const debt: Debt = {
        name: this.newDebtName,
        totalAmount: this.newDebtAmount,
        minPayment: this.newDebtMinPayment,
        interestRate: this.newDebtRate
      };
      this.financeService.addDebt(debt);
      this.newDebtName = '';
      this.newDebtAmount = null;
      this.newDebtMinPayment = null;
      this.newDebtRate = null;
    }
  }

  deleteDebt(index: number) {
    this.financeService.deleteDebt(index);
  }

  /** Posición de esta deuda en la estrategia de pago avalancha (1 = primera en atacar) */
  getRank(name: string): number {
    return this.financeService.payoffPlan().order.indexOf(name) + 1;
  }

  /** Mes proyectado en que esta deuda queda saldada */
  getPayoffMonths(name: string): number | string {
    const months = this.financeService.payoffPlan().payoffMonth[name];
    return months ?? '—';
  }

  /** Participación de esta deuda sobre el total adeudado (peso visual de la barra) */
  getShare(debt: Debt): number {
    const total = this.financeService.getTotalDebt();
    return total > 0 ? (debt.totalAmount / total) * 100 : 0;
  }
}
