import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../item.service';
import { Category } from '../Category';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrl: './item-modal.component.css'
})
export class ItemModalComponent implements OnInit {
     item: Item = { id: 0, name: '', category: '', brand: '' };
     categories: Category[] = [];

  constructor(
    public modal: NgbActiveModal,
    private itemService: ItemService
  ) {}

    ngOnInit(): void {
    this.loadCategories();
  }

loadCategories() {
  this.itemService.getCategories().subscribe({
    next: (data: Category[]) => this.categories = data,
    error: (err) => console.error('Error fetching categories', err)
  });
}

  create() {
    this.itemService.create(this.item).subscribe({
      next: (data) => {
        this.modal.close(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancel() {
    this.modal.dismiss();
  }
}
