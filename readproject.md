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
4. `src/app/app.html` currently renders the main POS layout directly with shared/top-level components.

## Routes

Defined in `src/app/app.routes.ts`.

| Path | Target | Notes |
| --- | --- | --- |
| `''` | Lazy-loaded `OrderPage` from `src/app/pages/order/order.page.ts` | This route exists, but the root app template currently does not render a `router-outlet`; the direct POS screen is rendered from `App` instead. |

## Root App Shell

### `src/app/app.ts`

Root component class: `App`.

Responsibilities:

- Injects `PosService`.
- Holds UI state:
  - `searchText`
  - `activeCategory`
  - `showReceipt`
- Filters products by search text and category.
- Handles category changes, search input, product add, checkout, hold order, and receipt modal open/close.

Imported UI pieces:

- `TopbarComponent`
- `CategoryListComponent`
- `ProductCatalogComponent`
- `OrderPanelComponent`
- `ReceiptComponent`

### `src/app/app.html`

Current rendered POS layout:

- Top bar
- Catalog area
  - Search input
  - Category list
  - Product catalog grid
- Order panel
- Conditional receipt modal when `showReceipt` is true

Note: older router/header markup exists as comments.

## Pages

### `src/app/pages/order/order.page.ts`

Angular standalone-style page component class: `OrderPage`.

Imports:

- `ProductViewComponent`
- `OrderViewComponent`

Template: `src/app/pages/order/order.page.html`.

### `src/app/pages/order/order.page.html`

Simple page layout containing repeated `product-view-component` instances and one `order-view-component`.

Current status:

- Looks like an early placeholder/prototype page.
- It is route-loaded by `app.routes.ts`, but not visible in the current root layout unless a router outlet is restored.

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

Global/application style files:

- `src/styles.scss`
- `src/app/app.scss`
- component-level `.scss` files for topbar, category list, product catalog, order panel, and receipt

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
