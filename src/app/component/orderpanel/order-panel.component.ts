import {
  Component,
  EventEmitter,
  Output,
  inject
} from '@angular/core';

import { PosService } from '../../services/pos.service';

@Component({
  selector: 'app-order-panel',
  standalone: true,
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.scss'
})
export class OrderPanelComponent {

  readonly pos = inject(PosService);

  viewMode: 'classic' | 'compact' = 'classic';

  @Output() print =
    new EventEmitter<void>();

  @Output() checkout =
    new EventEmitter<void>();

  @Output() hold =
    new EventEmitter<void>();

  setView(mode: 'classic' | 'compact'): void {
    this.viewMode = mode;
  }

  increase(id: number): void {
    this.pos.changeQty(id, 1);
  }

  decrease(id: number): void {
    this.pos.changeQty(id, -1);
  }

  remove(id: number): void {
    this.pos.removeItem(id);
  }
}
