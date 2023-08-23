import { Component } from '@angular/core';
import { MenuItem } from './models/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chirpus Pizza Lab';


  // create an array of menu items
 menu:MenuItem[] = [
    {
    name: "Chicken Fingers",
    category: "Dinner",
    price: 11.99
    },
    {
    name: "Pizza",
    category: "Dinner",
    price: 11.99
    },
    {
    name: "Wings",
    category: "Sides",
    price: 8.99
    },
    {
    name: "Breadsticks",
    category: "Sides",
    price: 4.99
    },
    {
    name: "Caesar Salad",
    category: "Salads",
    price: 5.99
    },
    {
    name: "Cinnamon Roll",
    category: "Dessert",
    price: 8.99
    },
]

// Create a method called getByCategory()
// This should take in a string called Cat
// This should return an array of MenuItem where Cat matches Category
getByCategory(Cat:string):MenuItem[]{
  let allItems: MenuItem[] = [];
  this.menu.forEach((c) => {
    if(c.category == Cat){
      allItems.push(c);
    }
  });
  return allItems;
}


getUniqueCategory():string[]{
let result: string [] = [];
  this.menu.forEach((c) => {
    if(result.includes(c.category)==false)
    {
    result.push(c.category)
    }
  });
  return result;
}




}
