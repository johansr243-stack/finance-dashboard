import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reports.html',
    styleUrl: './reports.css'
})
export class ReportsComponent {
    financeService = inject(FinanceService);

    /** Gastos ordenados de mayor a menor, para el ranking visual */
    get sortedExpenses() {
        return [...this.financeService.monthlyExpenses()].sort((a, b) => b.amount - a.amount);
    }

    getExpenseShare(amount: number): number {
        const total = this.financeService.getTotalExpenses();
        return total > 0 ? (amount / total) * 100 : 0;
    }

    /** Cuánto interés te ahorras con la estrategia avalancha frente a pagar solo mínimos */
    get interestSavings(): number {
        const minimumsOnly = this.financeService.minimumsOnlyPlan().totalInterest;
        const avalanche = this.financeService.payoffPlan().totalInterest;
        return Math.max(0, Math.round(minimumsOnly - avalanche));
    }

    /** Ancho relativo de cada barra del flujo mensual, normalizado contra el ingreso */
    getFlowShare(amount: number): number {
        const income = this.financeService.monthlyIncome();
        if (income <= 0) return 0;
        return Math.min(100, Math.max(0, (amount / income) * 100));
    }
}