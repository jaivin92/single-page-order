import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-list',
  standalone: true,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  @Input() categories: string[] = [];

  @Input() activeCategory = 'All';

  @Output() categoryChange =
    new EventEmitter<string>();

  selectCategory(category: string): void {
    this.categoryChange.emit(category);
  }
}
