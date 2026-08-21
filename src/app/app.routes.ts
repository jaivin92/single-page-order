import { Routes } from '@angular/router';
import type { SeoConfig } from './services/seo.service';

const orderPageSeo: SeoConfig = {
  title: 'Restaurant POS Billing Screen | Single Page Order',
  description: 'Single page restaurant POS billing interface with category filters, product catalog, current order panel, GST totals, receipt preview, and print flow.',
  keywords: 'restaurant POS billing screen, cafe POS, food order billing, hotel POS, receipt print, GST billing',
  robots: 'index, follow',
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

export const routes: Routes = [
  {
    path: '',
    loadComponent:() => import ('./pages/order/order.page').then(m => m.OrderPage),
    data: {
      seo: orderPageSeo
    },
  }
];
