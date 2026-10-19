import { Injectable, signal, computed } from '@angular/core';

// 1. Interfaces actualizadas para coincidir con tus componentes
export interface Expense {
    name: string;
    amount: number;
}

export interface Debt {
    name: string;
    totalAmount: number;
    interestRate: number;
    minimumPayment: number;
}

@Injectable({
    providedIn: 'root'
})
export class FinanceService {

    // ==========================================
    // ESTADOS REACTIVOS (SIGNALS)
    // Al tipar estas variables, Angular ya no arrojará el error "implicitly has an 'any' type"
    // ==========================================
    monthlyIncome = signal<number>(0);
    monthlyExpenses = signal<Expense[]>([]);
    myDebts = signal<Debt[]>([]);

    constructor() { }

    // ==========================================
    // VALORES CALCULADOS (COMPUTED SIGNALS)
    // Se actualizan automáticamente cuando cambia un estado reactivo
    // ==========================================

    getTotalDebt = computed(() => {
        return this.myDebts().reduce((total, debt) => total + debt.totalAmount, 0);
    });

    getTotalExpenses = computed(() => {
        return this.monthlyExpenses().reduce((total, exp) => total + exp.amount, 0);
    });

    getSurplus = computed(() => {
        return this.monthlyIncome() - this.getTotalExpenses();
    });

    debtToIncomeRatio = computed(() => {
        const income = this.monthlyIncome();
        return income > 0 ? (this.getTotalDebt() / income) * 100 : 0;
    });

    insightMessage = computed(() => {
        const surplus = this.getSurplus();
        if (surplus > 0) return '¡Buen trabajo! Tienes un excedente este mes para ahorrar o abonar a tus deudas.';
        if (surplus < 0) return 'Cuidado, tus gastos mensuales superan tus ingresos.';
        return 'Tus finanzas están al límite, revisa tus gastos.';
    });

    // Estructura base para los planes de pago (Evitará los errores de TS)
    // Más adelante podemos programar la lógica matemática del método Bola de Nieve o Avalancha
    payoffPlan = computed(() => {
        return {
            reachable: this.getSurplus() > 0,
            months: 0,
            order: this.myDebts().map(d => d.name),
            payoffMonth: {} as Record<string, number>,
            totalInterest: 0
        };
    });

    minimumsOnlyPlan = computed(() => {
        return {
            totalInterest: 0
        };
    });

    // ==========================================
    // MÉTODOS DE ACCIÓN
    // ==========================================

    addDebt(debt: Debt) {
        // Agrega una nueva deuda al final de la lista inmutable
        this.myDebts.update(debts => [...debts, debt]);
    }

    deleteDebt(index: number) {
        // Filtra la deuda basándose en su índice
        this.myDebts.update(debts => debts.filter((_, i) => i !== index));
    }
}