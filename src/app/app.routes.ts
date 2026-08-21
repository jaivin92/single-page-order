import { Routes } from '@angular/router';
import type { SeoConfig } from './services/seo.service';
import { authGuard } from './services/auth.guard';
import { AppShellComponent } from './layouts/app-shell/app-shell.component';

const loginSeo: SeoConfig = {
  title: 'Login | Single Page Order POS',
  description: 'Secure login for the Single Page Order restaurant and hotel POS dashboard.',
  robots: 'noindex, nofollow',
  type: 'website'
};

const dashboardSeo: SeoConfig = {
  title: 'POS Dashboard | Single Page Order',
  description: 'Restaurant POS dashboard for sales overview, open orders, table status, and quick operations.',
  robots: 'noindex, nofollow',
  type: 'website'
};

const orderPageSeo: SeoConfig = {
  title: 'Restaurant POS Billing Screen | Single Page Order',
  description: 'Single page restaurant POS billing interface with category filters, product catalog, current order panel, GST totals, receipt preview, and print flow.',
  keywords: 'restaurant POS billing screen, cafe POS, food order billing, hotel POS, receipt print, GST billing',
  robots: 'noindex, nofollow',
  type: 'website',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Single Page Order POS',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Restaurant and hotel POS billing page for quick food ordering, tax calculation, and receipt printing.'
  }
};

const privatePageSeo = (title: string, description: string): SeoConfig => ({
  title: `${title} | Single Page Order POS`,
  description,
  robots: 'noindex, nofollow',
  type: 'website'
});

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
    data: {
      seo: loginSeo
    }
  },
  {
    path: 'app',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
        data: {
          seo: dashboardSeo
        }
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/order/order.page').then(m => m.OrderPage),
        data: {
          seo: orderPageSeo
        }
      },
      {
        path: 'tables',
        loadComponent: () => import('./pages/table-management/table-management.page').then(m => m.TableManagementPage),
        data: {
          seo: privatePageSeo('Table Management', 'Manage restaurant tables, reservations, running bills, and dine-in table status.')
        }
      },
      {
        path: 'kitchen-tickets',
        loadComponent: () => import('./pages/kitchen-tickets/kitchen-tickets.page').then(m => m.KitchenTicketsPage),
        data: {
          seo: privatePageSeo('Kitchen Tickets', 'Track KOT preparation status, kitchen queues, and ready-to-serve order tickets.')
        }
      },
      {
        path: 'held-orders',
        loadComponent: () => import('./pages/held-orders/held-orders.page').then(m => m.HeldOrdersPage),
        data: {
          seo: privatePageSeo('Held Orders', 'Recall held POS orders and continue billing when the customer is ready.')
        }
      },
      {
        path: 'customers',
        loadComponent: () => import('./pages/customers/customers.page').then(m => m.CustomersPage),
        data: {
          seo: privatePageSeo('Customers', 'Manage restaurant POS customer records, loyalty, and order history.')
        }
      },
      {
        path: 'inventory',
        loadComponent: () => import('./pages/inventory/inventory.page').then(m => m.InventoryPage),
        data: {
          seo: privatePageSeo('Inventory', 'Monitor restaurant inventory, stock levels, vendor purchases, and wastage.')
        }
      },
      {
        path: 'reports',
        loadComponent: () => import('./pages/reports/reports.page').then(m => m.ReportsPage),
        data: {
          seo: privatePageSeo('Reports', 'Review restaurant POS sales, tax, item, cashier, and audit reports.')
        }
      },
      {
        path: 'staff-roles',
        loadComponent: () => import('./pages/staff-roles/staff-roles.page').then(m => m.StaffRolesPage),
        data: {
          seo: privatePageSeo('Staff & Roles', 'Manage restaurant POS staff accounts, permissions, roles, and manager approvals.')
        }
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage),
        data: {
          seo: privatePageSeo('Settings', 'Configure taxes, payment modes, printers, receipt branding, and outlet preferences.')
        }
      },
      {
        path: 'audit-log',
        loadComponent: () => import('./pages/audit-log/audit-log.page').then(m => m.AuditLogPage),
        data: {
          seo: privatePageSeo('Audit Log', 'Review POS security events, refunds, voids, discounts, and settings changes.')
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
