import { Component } from '@angular/core';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

   // create an array of menu items
 allTasks:List[] = [
  {
  taskTitle: "Get Carryout",
  // description: "need to grab dinner for tomorrow",
  complete: true
  },
  {
    taskTitle: "Buy School Supplies",
    // description: "here is a bunch of stuff that is needed",
    complete: false
    },
    {
      taskTitle: "Give the dog a bath",
      // description: "Make sure to comb him first",
      complete: false
      },
      {
        taskTitle: "Get 3 bottles of wine",
        // description: "you'll need this after completing all the tasks",
        complete: true
      },
]

  taskTitle: string = "";
  newTask: List = {} as List;
  addTask():void{
    let result:List = {
      taskTitle: this.newTask.taskTitle,
      // description: this.newTask.description,
      complete: this.newTask.complete = false
    }
    this.allTasks.push(result);
    this.newTask = {} as List;
  }
  
  // displayMessage():boolean{
  //   let result:boolean = false;
  //   this.allList.forEach((t:Todo) => {
  //     if(t.completed == false){
        
  //       result = true;
  //     }

      
  //   });
  //   return result;
  // }


  removeTask(completedTask:List):void{
    let index = this.allTasks.findIndex((t:List) => t == completedTask);
    //this.allTasks.splice(index, 1);
    completedTask.complete = true;
  }


















// // Create a method called getByCategory()
// // This should take in a string called Cat
// // This should return an array of MenuItem where Cat matches Category


// // getByCategory(Cat:string):MenuItem[]{
// //   let allItems: MenuItem[] = [];
// //   this.menu.forEach((c:MenuItem) => {
// //     if(c.category == Cat){
// //       allItems.push(c);
// //     }
// //   });
// //   return allItems;
// // }

// getByCategory(Cat:string):MenuItem[]{
// return this.menu.filter((c:MenuItem) => c.category == Cat);
// }



// // getUniqueCategory():string[]{
// // let result: string [] = [];
// //   this.menu.forEach((c) => {
// //     if(result.includes(c.category)==false)
// //     {
// //     result.push(c.category)
// //     }
// //   });
// //   return result;
// // }


// getUniqueCategory():string[]{
// return  [...new Set(this.menu.map(item => item.category))];
// }

// }



}
