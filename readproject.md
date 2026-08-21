# Project Reading Notes: `single-page-order`

## Overview

`single-page-order` is an Angular 21 single page point-of-sale/order screen application. The current UI is centered around a catalog, category filters, a current-order panel, and a receipt modal/print flow.

## Tech Stack

- Angular `^21.0.0`
- Angular CLI/build tooling `^21.0.4`
- TypeScript `~5.9.2`
- RxJS `~7.8.0`
- Bootstrap `^5.3.8`
- Bootstrap Icons `^1.13.1`
- jsPDF `^4.2.1`
- Vitest via Angular unit-test builder

## Important Commands

| Purpose | Command |
| --- | --- |
| Start development server | `npm start` or `ng serve` |
| Build application | `npm run build` or `ng build` |
| Watch build | `npm run watch` |
| Run tests | `npm test` or `ng test` |

## Application Entry Flow

1. `src/main.ts` bootstraps the standalone Angular application.
2. `src/app/app.config.ts` registers router providers using `src/app/app.routes.ts`.
3. `src/app/app.ts` is the root component used by bootstrap.
4. `src/app/app.html` renders a `router-outlet`; authenticated pages render inside `AppShellComponent` with sidebar navigation.

## Routes

Defined in `src/app/app.routes.ts`.

| Path | Target | Notes |
| --- | --- | --- |
| `''` | Redirect to `/login` | Login is the first/default screen. |
| `/login` | Lazy-loaded `LoginPage` | Public login page with `noindex, nofollow` SEO metadata. |
| `/app` | `AppShellComponent` | Auth-protected shell containing sidebar navigation and child routes. |
| `/app/dashboard` | Lazy-loaded `DashboardPage` | Default authenticated dashboard. |
| `/app/order` | Lazy-loaded `OrderPage` | Billing/POS screen. |
| `/app/tables` | Lazy-loaded `TableManagementPage` | Table management placeholder module. |
| `/app/kitchen-tickets` | Lazy-loaded `KitchenTicketsPage` | KOT/kitchen tickets placeholder module. |
| `/app/held-orders` | Lazy-loaded `HeldOrdersPage` | Held orders placeholder module. |
| `/app/customers` | Lazy-loaded `CustomersPage` | Customer records placeholder module. |
| `/app/inventory` | Lazy-loaded `InventoryPage` | Inventory placeholder module. |
| `/app/reports` | Lazy-loaded `ReportsPage` | Reports placeholder module. |
| `/app/staff-roles` | Lazy-loaded `StaffRolesPage` | Staff and roles placeholder module. |
| `/app/settings` | Lazy-loaded `SettingsPage` | Settings placeholder module. |
| `/app/audit-log` | Lazy-loaded `AuditLogPage` | Audit log placeholder module. |
| `**` | Redirect to `/login` | Fallback route. |

## Root App Shell

### `src/app/app.ts`

Root component class: `App`.

Responsibilities:

- Renders the root `RouterOutlet`.
- Initializes dynamic SEO updates through `SeoService`.
- Leaves POS order state and filtering inside `OrderPage`.

Imported UI pieces:

- `RouterOutlet`

### `src/app/app.html`

Current rendered layout:

- Root Angular `router-outlet`
- `/login` renders the login page first
- `/app/*` renders the authenticated shell with sidebar and child routes

## Pages

### `src/app/pages/order/order.page.ts`

Angular standalone-style page component class: `OrderPage`.

Imports:

- `CategoryListComponent`
- `ProductCatalogComponent`
- `OrderPanelComponent`
- `ReceiptComponent`

Template: `src/app/pages/order/order.page.html`.

Responsibilities:

- Injects `PosService`.
- Holds POS screen UI state such as search text, active category, and receipt visibility.
- Filters products by search text and category.
- Handles category changes, product add, checkout, hold order, and receipt modal open/close.

### `src/app/pages/order/order.page.html`

Authenticated billing/POS page containing the catalog search, category filters, product catalog grid, order panel, and conditional receipt modal.

## Feature Components

Feature components are stored under `src/app/component`.

### Category List

Files:

- `src/app/component/category/category-list.component.ts`
- `src/app/component/category/category-list.component.html`
- `src/app/component/category/category-list.component.scss`

Selector: `app-category-list`.

Purpose:

- Displays category pills/buttons.
- Receives the full category list and active category through inputs.
- Emits `categoryChange` when a category is selected.

Inputs:

- `categories: string[]`
- `activeCategory: string`

Outputs:

- `categoryChange: EventEmitter<string>`

### Product Catalog

Files:

- `src/app/component/productcatlog/product-catalog.component.ts`
- `src/app/component/productcatlog/product-catalog.component.html`
- `src/app/component/productcatlog/product-catalog.component.scss`

Selector: `app-product-catalog`.

Purpose:

- Displays products in a clickable grid.
- Shows product icon, name, price, and stock status.
- Emits selected product to parent component.

Inputs:

- `products: Product[]`

Outputs:

- `productClick: EventEmitter<Product>`

Note: directory name is currently `productcatlog`, not `productcatalog`.

### Order Panel

Files:

- `src/app/component/orderpanel/order-panel.component.ts`
- `src/app/component/orderpanel/order-panel.component.html`
- `src/app/component/orderpanel/order-panel.component.scss`

Selector: `app-order-panel`.

Purpose:

- Displays current order items.
- Allows item quantity increase/decrease.
- Allows item removal.
- Shows subtotal, GST, and grand total.
- Emits checkout, hold, and print actions to the parent.
- Supports `classic` and `compact` view modes.

Injected service:

- `PosService`

Outputs:

- `print: EventEmitter<void>`
- `checkout: EventEmitter<void>`
- `hold: EventEmitter<void>`

### Receipt

Files:

- `src/app/component/receipt/receipt.component.ts`
- `src/app/component/receipt/receipt.component.html`
- `src/app/component/receipt/receipt.component.scss`

Selector: `app-receipt`.

Purpose:

- Displays receipt modal/backdrop.
- Renders receipt content from the current order.
- Prints the receipt by opening a print window and writing receipt HTML/CSS into it.
- Has commented PDF-generation draft code using jsPDF.

Injected service:

- `PosService`

Imports:

- `DatePipe`

Outputs:

- `close: EventEmitter<void>`

Current visible receipt branding:

- `BUILDRIGHT HARDWARE`
- `Hardware & Tools Trading Co.`

Note: receipt branding appears hardware-oriented, while the active catalog products are food items.

### Product View Placeholder

Files:

- `src/app/component/productview/productview.component.ts`
- `src/app/component/productview/productview.compnent.html`

Selector: `product-view-component`.

Purpose:

- Placeholder component used by `OrderPage`.

Note: template filename contains `compnent` instead of `component`.

### Order View Placeholder

Files:

- `src/app/component/orderview/orderview.component.ts`
- `src/app/component/orderview/orderview.compnent.html`

Selector: `order-view-component`.

Purpose:

- Placeholder component used by `OrderPage`.

Note: template content says `Product View`, which appears swapped/mislabeled with product view placeholder content.

## Shared Components

Shared components are stored under `src/app/shared/component`.

### Topbar

Files:

- `src/app/shared/component/topbar/topbar.component.ts`
- `src/app/shared/component/topbar/topbar.component.html`
- `src/app/shared/component/topbar/topbar.component.scss`

Selector: `app-topbar`.

Purpose:

- Displays the app brand, search-like input UI, and shift/time information.
- Maintains a timer to update the displayed date/time every 30 seconds.

Lifecycle hooks:

- `OnInit`
- `OnDestroy`

Current visible brand:

- `BuildRight POS`

Note: topbar search input is currently visual only; main product search is handled in `App` template.

### Header

Files:

- `src/app/shared/component/header/header.component.ts`
- `src/app/shared/component/header/header.component.html`

Selector: `app-header`.

Purpose:

- Simple placeholder header component.

Current status:

- Not active in the current app template; previous usage is commented in `src/app/app.html`.

## Services

### `src/app/services/auth.service.ts`

Service class: `AuthService`.

Purpose:

- Stores a simple local demo session in `localStorage`.
- Exposes an `isAuthenticated` signal.
- Provides `login()` and `logout()` methods for the login page and sidebar.

### `src/app/services/auth.guard.ts`

Guard: `authGuard`.

Purpose:

- Protects `/app/*` routes.
- Redirects unauthenticated users to `/login`.

### `src/app/services/seo.service.ts`

Service class: `SeoService`.

Purpose:

- Provides dynamic page-wise SEO updates for Angular routes.
- Updates document title, description, keywords, robots, canonical URL, Open Graph tags, Twitter card tags, and JSON-LD structured data.
- Reads route-level `data.seo` from Angular router navigation events.
- Provides a helper for building restaurant/POS SEO metadata for future pages.

Current setup:

- `App` initializes the SEO service during root component construction.
- The root route has SEO data for the restaurant POS billing screen.
- `src/index.html` contains baseline SEO tags before Angular runtime updates them.

### `src/app/services/pos.service.ts`

Service class: `PosService`.

Purpose:

- Owns product catalog data.
- Derives category list.
- Owns current order state using Angular signals.
- Provides computed order totals.
- Provides order mutation methods.
- Provides currency formatting.

Provided in:

- Root injector via `@Injectable({ providedIn: 'root' })`.

Important fields:

- `gstRate = 18`
- `products: Product[]`
- `categories`
- private `_order = signal<OrderItem[]>([])`
- readonly `order = this._order.asReadonly()`
- computed `totalQty`
- computed `subtotal`
- computed `tax`
- computed `grandTotal`

Important methods:

- `addToOrder(product: Product): void`
- `changeQty(id: number, delta: number): void`
- `removeItem(id: number): void`
- `clearOrder(): void`
- `formatCurrency(value: number): string`

Product catalog categories currently include:

- `Fast Food`
- `Sandwich`
- `Burger`
- `Pizza`
- `Sides`
- `Chinese`
- `South Indian`
- `Rolls`
- `Beverages`
- `Desserts`

## Models

### `src/app/model/product.model.ts`

Interface: `Product`.

Fields:

- `id: number`
- `name: string`
- `price: number`
- `cat: string`
- `icon: string`
- `stock: 'in' | 'low'`

### `src/app/model/order.model.ts`

Interface: `OrderItem`.

Fields:

- `id: number`
- `name: string`
- `price: number`
- `icon: string`
- `qty: number`

## Styles and Assets

### Global stylesheet

Primary global stylesheet:

- `src/styles.scss`

Use `src/styles.scss` for app-wide styling that should be available everywhere, including:

- CSS resets/base element styles
- Bootstrap override variables or global Bootstrap utility adjustments
- Theme tokens such as colors, font families, spacing scale, border radius, shadows, and z-index values
- Shared utility classes such as `.mono`, layout helpers, button helpers, receipt/print helpers, and responsive helpers
- Global typography rules
- Global form/input/button defaults
- Any cross-component styles that are reused by multiple pages or components

Avoid scattering reusable/global rules across component SCSS files. Keep component SCSS files focused on styles that belong only to that component.

### Application and component styles

Other style files currently present:

- `src/app/app.scss` for root app layout styles
- component-level `.scss` files for topbar, category list, product catalog, order panel, and receipt

Recommended stylesheet boundary:

| Style type | Suggested location |
| --- | --- |
| Global reset/theme/utilities | `src/styles.scss` |
| Shared classes reused by several components | `src/styles.scss` |
| Root shell layout only | `src/app/app.scss` |
| Component-private visuals | Component `.scss` file |
| Print-wide receipt rules reused by preview/print/PDF | Prefer `src/styles.scss` or a shared imported SCSS partial |

Static assets:

- `public/favicon.ico`

Configured global styles/scripts in `angular.json`:

- Bootstrap CSS
- Bootstrap Icons CSS
- `src/styles.scss`
- Bootstrap bundle JS

## Tests

Existing test file:

- `src/app/app.spec.ts`

Configured test command:

- `npm test`

## Current Architecture Summary

```text
main.ts
  └── bootstrapApplication(App, appConfig)
        ├── app.config.ts
        │     └── provideRouter(routes)
        ├── app.routes.ts
        │     └── '' -> lazy OrderPage
        └── App root component
              ├── TopbarComponent
              ├── CategoryListComponent
              ├── ProductCatalogComponent
              ├── OrderPanelComponent
              └── ReceiptComponent
```

## Data Flow Summary

```text
PosService
  ├── products and categories
  ├── order signal
  ├── computed totals
  └── mutation methods

App
  ├── filters products by search/category
  ├── passes filteredProducts to ProductCatalogComponent
  ├── passes categories/activeCategory to CategoryListComponent
  ├── delegates order state display/actions to OrderPanelComponent
  └── opens ReceiptComponent when print bill is requested
```

## Notes for Future Work

- This document is an inventory/read-through only.
- No application code was changed while creating this project reading note.
