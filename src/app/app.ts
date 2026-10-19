import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { FinanceService } from './services/finance';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'finance-dashboard';
  financeService = inject(FinanceService);

  /** Nivel de salud financiera según la relación deuda/ingreso (DTI) */
  getHealthLevel(): 'good' | 'warn' | 'bad' {
    const pct = this.financeService.debtToIncomeRatio();
    if (pct <= 20) return 'good';
    if (pct <= 36) return 'warn';
    return 'bad';
  }
}