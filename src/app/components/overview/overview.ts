import { Component } from '@angular/core';
import { BudgetComponent } from '../budget/budget';
import { DebtsComponent } from '../debts/debts';

@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [BudgetComponent, DebtsComponent],
    templateUrl: './overview.html',
    styleUrl: './overview.css'
})
export class OverviewComponent { }