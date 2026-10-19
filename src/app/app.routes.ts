import { Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview';
import { DebtsComponent } from './components/debts/debts';
import { ReportsComponent } from './components/reports/reports';
//import { GoalsComponent } from './components/goals/goals';

export const routes: Routes = [
    { path: '', redirectTo: 'resumen', pathMatch: 'full' },
    { path: 'resumen', component: OverviewComponent, title: 'Resumen · Panel Financiero' },
    { path: 'deudas', component: DebtsComponent, title: 'Deudas · Panel Financiero' },
    { path: 'reportes', component: ReportsComponent, title: 'Reportes · Panel Financiero' },
    // { path: 'metas', component: GoalsComponent, title: 'Metas · Panel Financiero' },
    { path: '**', redirectTo: 'resumen' },
];