import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _httpClient:HttpClient) { }

  private baseUrl = "https://localhost:7119/items";

  getAllItem()
  {
    return this._httpClient.get<Item[]>(this.baseUrl);
  }
  create(data:Item)
  {
    return this._httpClient.post(`${this.baseUrl}`, data);
  }
   getById(id:Number)
  {
    return this._httpClient.get<Item>(`${this.baseUrl}/${id}`);
  }
   update(data:Item)
  {
    return this._httpClient.put<Item>(`${this.baseUrl}/${data.id}`,data);
  }
  delete(id:number)
  {
    return this._httpClient.delete<Item>(`${this.baseUrl}/${id}`);
  }
  getCategories() {
  const url = 'https://localhost:7119/categories'; 
  return this._httpClient.get<any[]>(url);
}
}
