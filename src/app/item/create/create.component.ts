import { Component } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
   item:Item={
    id:0,
    name:'',
    category:'',
    brand:'',
    inStock:false,
    dateAdded:''
   }

   constructor(private itemService:ItemService,private router:Router){}
   
create() {
  const payload = { ...this.item }; 

  console.log('Payload ',payload);

  if (this.item.dateAdded && typeof this.item.dateAdded !== 'string') {
    const d = this.item.dateAdded as any;
    const jsDate = new Date(d.year, d.month - 1, d.day); 
    payload.dateAdded = jsDate.toISOString(); 
  }

  console.log('Payload being sent:', payload);

  this.itemService.create(payload).subscribe({
    next: () => this.router.navigate(['item/home']),
    error: (err) => console.log(err)
  });
}
    cancel()
    {
      this.router.navigate(["item/home"])
    }
}
