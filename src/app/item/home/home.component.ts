import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAllItem().subscribe((data) => {
      this.items = data;
    });
  }

  delete(id: number) {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      this.itemService.delete(id).subscribe(() => {
        this.items = this.items.filter(itm => itm.id !== id);
      });
    }
  }

  openAddModal() {
    const modalRef = this.modalService.open(ItemModalComponent, { size: 'lg' });

    modalRef.result.then(
      (newItem) => {
        if (newItem) {
          this.items.push(newItem); 
        }
      },
      (reason) => {
      }
    );
  }
}
