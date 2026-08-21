import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  @Input() collapsed = false;

  @Output() toggleSidebar = new EventEmitter<void>();

  readonly sections: SidebarSection[] = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: 'bi-speedometer2', route: '/app/dashboard' }
      ]
    },
    {
      title: 'Operations',
      items: [
        { label: 'Billing / POS', icon: 'bi-cart3', route: '/app/order' },
        { label: 'Table Management', icon: 'bi-grid-3x3-gap', route: '/app/tables' },
        { label: 'Kitchen Tickets', icon: 'bi-fire', route: '/app/kitchen-tickets' },
        { label: 'Held Orders', icon: 'bi-clock', route: '/app/held-orders' }
      ]
    },
    {
      title: 'Records',
      items: [
        { label: 'Customers', icon: 'bi-people', route: '/app/customers' },
        { label: 'Inventory', icon: 'bi-box-seam', route: '/app/inventory' }
      ]
    },
    {
      title: 'Insights',
      items: [
        { label: 'Reports', icon: 'bi-bar-chart', route: '/app/reports' }
      ]
    },
    {
      title: 'Admin',
      items: [
        { label: 'Staff & Roles', icon: 'bi-person-badge', route: '/app/staff-roles' },
        { label: 'Settings', icon: 'bi-gear', route: '/app/settings' },
        { label: 'Audit Log', icon: 'bi-shield-lock', route: '/app/audit-log' }
      ]
    }
  ];

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
