import { Injectable, signal, computed } from '@angular/core';
import { OrderItem } from '../model/order.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  readonly gstRate = 18;

  // readonly products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Hex Bolt Set M8 (100pc)',
  //     price: 349,
  //     cat: 'Fasteners',
  //     icon: 'bi-nut',
  //     stock: 'in'
  //   },
  //   {
  //     id: 2,
  //     name: 'Cordless Drill 18V',
  //     price: 4299,
  //     cat: 'Power Tools',
  //     icon: 'bi-lightning-charge',
  //     stock: 'in'
  //   },
  //   {
  //     id: 3,
  //     name: 'Steel Measuring Tape 5m',
  //     price: 229,
  //     cat: 'Hand Tools',
  //     icon: 'bi-rulers',
  //     stock: 'in'
  //   },
  //   {
  //     id: 4,
  //     name: 'PVC Pipe Cutter',
  //     price: 599,
  //     cat: 'Plumbing',
  //     icon: 'bi-scissors',
  //     stock: 'low'
  //   },
  //   {
  //     id: 5,
  //     name: 'Claw Hammer 450g',
  //     price: 389,
  //     cat: 'Hand Tools',
  //     icon: 'bi-hammer',
  //     stock: 'in'
  //   },
  //   {
  //     id: 6,
  //     name: 'Angle Grinder 4"',
  //     price: 2899,
  //     cat: 'Power Tools',
  //     icon: 'bi-gear',
  //     stock: 'in'
  //   },
  //   {
  //     id: 7,
  //     name: 'Copper Wire 1.5mm (90m)',
  //     price: 1899,
  //     cat: 'Electrical',
  //     icon: 'bi-plug',
  //     stock: 'in'
  //   },
  //   {
  //     id: 8,
  //     name: 'LED Panel Light 18W',
  //     price: 249,
  //     cat: 'Electrical',
  //     icon: 'bi-lightbulb',
  //     stock: 'low'
  //   },
  //   {
  //     id: 9,
  //     name: 'Adjustable Wrench 10"',
  //     price: 329,
  //     cat: 'Hand Tools',
  //     icon: 'bi-wrench',
  //     stock: 'in'
  //   },
  //   {
  //     id: 10,
  //     name: 'Brass Gate Valve 1/2"',
  //     price: 459,
  //     cat: 'Plumbing',
  //     icon: 'bi-droplet',
  //     stock: 'in'
  //   },
  //   {
  //     id: 11,
  //     name: 'Safety Helmet ISI',
  //     price: 199,
  //     cat: 'Safety',
  //     icon: 'bi-shield-check',
  //     stock: 'in'
  //   },
  //   {
  //     id: 12,
  //     name: 'Work Gloves (pair)',
  //     price: 99,
  //     cat: 'Safety',
  //     icon: 'bi-hand-index',
  //     stock: 'in'
  //   },
  //   {
  //     id: 13,
  //     name: 'Paint Roller Kit',
  //     price: 279,
  //     cat: 'Fasteners',
  //     icon: 'bi-brush',
  //     stock: 'in'
  //   },
  //   {
  //     id: 14,
  //     name: 'Impact Driver Bits Set',
  //     price: 649,
  //     cat: 'Power Tools',
  //     icon: 'bi-tools',
  //     stock: 'in'
  //   },
  //   {
  //     id: 15,
  //     name: 'MCB Switch 32A',
  //     price: 179,
  //     cat: 'Electrical',
  //     icon: 'bi-toggle-on',
  //     stock: 'low'
  //   },
  //   {
  //     id: 16,
  //     name: 'Teflon Tape 12mm',
  //     price: 29,
  //     cat: 'Plumbing',
  //     icon: 'bi-arrow-repeat',
  //     stock: 'in'
  //   }
  // ];

  readonly products: Product[] = [

    {
      id: 1,
      name: 'Vada Pav',
      price: 40,
      cat: 'Fast Food',
      icon: 'bi-egg-fried',
      stock: 'in'
    },

    {
      id: 2,
      name: 'Cheese Vada Pav',
      price: 60,
      cat: 'Fast Food',
      icon: 'bi-egg-fried',
      stock: 'in'
    },

    {
      id: 3,
      name: 'Veg Sandwich',
      price: 80,
      cat: 'Sandwich',
      icon: 'bi-grid-3x3-gap',
      stock: 'in'
    },

    {
      id: 4,
      name: 'Cheese Sandwich',
      price: 120,
      cat: 'Sandwich',
      icon: 'bi-grid-3x3-gap',
      stock: 'in'
    },

    {
      id: 5,
      name: 'Grilled Sandwich',
      price: 140,
      cat: 'Sandwich',
      icon: 'bi-grid-3x3-gap',
      stock: 'in'
    },

    {
      id: 6,
      name: 'Veg Burger',
      price: 99,
      cat: 'Burger',
      icon: 'bi-circle',
      stock: 'in'
    },

    {
      id: 7,
      name: 'Cheese Burger',
      price: 129,
      cat: 'Burger',
      icon: 'bi-circle',
      stock: 'in'
    },

    {
      id: 8,
      name: 'Double Cheese Burger',
      price: 179,
      cat: 'Burger',
      icon: 'bi-circle',
      stock: 'low'
    },

    {
      id: 9,
      name: 'Margherita Pizza',
      price: 199,
      cat: 'Pizza',
      icon: 'bi-pie-chart',
      stock: 'in'
    },

    {
      id: 10,
      name: 'Veg Cheese Pizza',
      price: 249,
      cat: 'Pizza',
      icon: 'bi-pie-chart',
      stock: 'in'
    },

    {
      id: 11,
      name: 'Paneer Pizza',
      price: 299,
      cat: 'Pizza',
      icon: 'bi-pie-chart',
      stock: 'in'
    },

    {
      id: 12,
      name: 'Farmhouse Pizza',
      price: 329,
      cat: 'Pizza',
      icon: 'bi-pie-chart',
      stock: 'in'
    },

    {
      id: 13,
      name: 'French Fries',
      price: 99,
      cat: 'Sides',
      icon: 'bi-box',
      stock: 'in'
    },

    {
      id: 14,
      name: 'Peri Peri Fries',
      price: 129,
      cat: 'Sides',
      icon: 'bi-box',
      stock: 'in'
    },

    {
      id: 15,
      name: 'Masala Cheese Fries',
      price: 149,
      cat: 'Sides',
      icon: 'bi-box',
      stock: 'low'
    },

    {
      id: 16,
      name: 'Veg Momos',
      price: 120,
      cat: 'Chinese',
      icon: 'bi-basket',
      stock: 'in'
    },

    {
      id: 17,
      name: 'Cheese Momos',
      price: 150,
      cat: 'Chinese',
      icon: 'bi-basket',
      stock: 'in'
    },

    {
      id: 18,
      name: 'Masala Dosa',
      price: 120,
      cat: 'South Indian',
      icon: 'bi-egg-fried',
      stock: 'in'
    },

    {
      id: 19,
      name: 'Paneer Roll',
      price: 140,
      cat: 'Rolls',
      icon: 'bi-arrow-right-circle',
      stock: 'in'
    },

    {
      id: 20,
      name: 'Veg Frankie',
      price: 100,
      cat: 'Rolls',
      icon: 'bi-arrow-right-circle',
      stock: 'in'
    },

    {
      id: 21,
      name: 'Paneer Frankie',
      price: 140,
      cat: 'Rolls',
      icon: 'bi-arrow-right-circle',
      stock: 'in'
    },

    {
      id: 22,
      name: 'Cold Coffee',
      price: 110,
      cat: 'Beverages',
      icon: 'bi-cup-straw',
      stock: 'in'
    },

    {
      id: 23,
      name: 'Masala Chaas',
      price: 50,
      cat: 'Beverages',
      icon: 'bi-cup-straw',
      stock: 'in'
    },

    {
      id: 24,
      name: 'Fresh Lime Soda',
      price: 60,
      cat: 'Beverages',
      icon: 'bi-cup-straw',
      stock: 'in'
    },

    {
      id: 25,
      name: 'Masala Tea',
      price: 30,
      cat: 'Beverages',
      icon: 'bi-cup-hot',
      stock: 'in'
    },

    {
      id: 26,
      name: 'Cold Drink',
      price: 50,
      cat: 'Beverages',
      icon: 'bi-cup-straw',
      stock: 'in'
    },

    {
      id: 27,
      name: 'Chocolate Brownie',
      price: 120,
      cat: 'Desserts',
      icon: 'bi-cake2',
      stock: 'in'
    },

    {
      id: 28,
      name: 'Chocolate Cake',
      price: 150,
      cat: 'Desserts',
      icon: 'bi-cake2',
      stock: 'low'
    },

    {
      id: 29,
      name: 'Ice Cream',
      price: 80,
      cat: 'Desserts',
      icon: 'bi-cup',
      stock: 'in'
    },

    {
      id: 30,
      name: 'Gulab Jamun',
      price: 70,
      cat: 'Desserts',
      icon: 'bi-circle-fill',
      stock: 'in'
    }

  ];

  readonly categories = [
    'All',
    ...new Set(this.products.map(x => x.cat))
  ];

  private _order = signal<OrderItem[]>([]);

  readonly order = this._order.asReadonly();

  readonly totalQty = computed(() =>
    this._order().reduce((sum, item) => sum + item.qty, 0)
  );

  readonly subtotal = computed(() =>
    this._order().reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    )
  );

  readonly tax = computed(() =>
    this.subtotal() * this.gstRate / 100
  );

  readonly grandTotal = computed(() =>
    this.subtotal() + this.tax()
  );

  addToOrder(product: Product): void {

    const currentOrder = [...this._order()];

    const existing = currentOrder.find(
      x => x.id === product.id
    );

    if (existing) {
      existing.qty++;
    } else {
      currentOrder.push({
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        qty: 1
      });
    }

    this._order.set(currentOrder);
  }

  changeQty(id: number, delta: number): void {

    const currentOrder = [...this._order()];

    const item = currentOrder.find(x => x.id === id);

    if (!item) {
      return;
    }

    item.qty += delta;

    if (item.qty <= 0) {
      this._order.set(
        currentOrder.filter(x => x.id !== id)
      );

      return;
    }

    this._order.set(currentOrder);
  }

  removeItem(id: number): void {

    this._order.set(
      this._order().filter(x => x.id !== id)
    );
  }

  clearOrder(): void {
    this._order.set([]);
  }

  formatCurrency(value: number): string {

    return '₹' + value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
