import { Component, OnInit, ElementRef } from '@angular/core';

import { toDoTask } from './shared/mock-data/task'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  
  private taskList : any = [];
  private taskList_All : any;
  private deletedItem : any =[];
  private isEnable : boolean = false;
  

  constructor(private elRef:ElementRef) { }

  ngOnInit() {

    /* Get task name from json data */
    this.taskList_All = toDoTask.tasks;
    this.taskList_All.forEach(element => {
      this.taskList.push(element.name);
    });
  }

  public completeItem(){

     /* Highlight completed task */

    let fullListContent = this.elRef.nativeElement.getElementsByClassName('fullList')[0];
    for(let i=0;i<fullListContent.children.length;i++){
      let chkElement=fullListContent.children[i].getElementsByTagName('input')[0];
      if(chkElement.checked==true)
      {
        let taskValue=fullListContent.children[i].style.backgroundColor="lightcyan";
      }
    }
  }

  public addItem(newModalItem:any){

     /* Add new Item */

    let newItem :"";
    this.taskList.push(newModalItem.value)
    this.isEnable=true;
  }

  public selectAllTasks(){

     /* Select all checkboxes */

    let selectAll = this.elRef.nativeElement.getElementsByClassName('selectAll')[0];
    if(selectAll.checked == true)
    {
      let fullListContent = this.elRef.nativeElement.getElementsByClassName('fullList')[0];
      for(let i=0;i<fullListContent.children.length;i++){
        let chkElement=fullListContent.children[i].getElementsByTagName('input')[0];
        chkElement.checked = true;
    }
  }
  else
  {
    let fullListContent = this.elRef.nativeElement.getElementsByClassName('fullList')[0];
    for(let i=0;i<fullListContent.children.length;i++){
      let chkElement=fullListContent.children[i].getElementsByTagName('input')[0];
      chkElement.checked = false;
    }
  }
  }


 public deleteItem(){

    /* delete marked item and pushed to new table */
    
    let fullListContent = this.elRef.nativeElement.getElementsByClassName('fullList')[0];
    for(let i=0;i<fullListContent.children.length;i++){
      let chkElement=fullListContent.children[i].getElementsByTagName('input')[0];
      if(chkElement.checked==true)
      {
        let taskValue=fullListContent.children[i].getElementsByClassName('taskName')[0];
        let taskListVal = (taskValue.textContent.trim());
        for(let j=0;j<this.taskList.length;j++)
        {
          if(taskListVal==this.taskList[j])
          {
            this.deletedItem.push(this.taskList[j]);
             this.taskList.splice(j,1);
            // this.taskList.length--;
             
          }
        }
       
      }

    }
    
    console.log(this.deletedItem  )
    //console.log(chkVal.nextElementSibling.textContent.trim());
  }

}
