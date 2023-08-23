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
getByCategory(Cat:menuItem[]):string{
  let newCategory = Cat[0];
  Cat.forEach((c.menuItem) => {
    if(c.category == Cat){
      newCard = c.category;
    }
    
  });
  
  return newCard;
}
function GetRarestName(allCards:Card[]):string{
  //manual way
  let rareCard:Card = allCards[0];
  allCards.forEach((c:Card) => {
      if(c.rarity > rareCard.rarity)
     {rareCard = c;
     }
  });
  return rareCard.name;


// takes in a customer and gives back a message obout being a gold member
getMemberMessage(c:Customer):string{
  if(c.goldMember == true){
    return "Is gold member!";
  }
  else{
    return "Not gold member";
  }
}

  
}
