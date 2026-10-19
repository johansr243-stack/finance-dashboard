import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  navItems: NavItem[] = [
    { label: 'Resumen', icon: '◈', path: '/resumen' },
    { label: 'Deudas', icon: '◇', path: '/deudas' },
    { label: 'Reportes', icon: '◆', path: '/reportes' },
    { label: 'Metas', icon: '◎', path: '/metas' },
  ];
}