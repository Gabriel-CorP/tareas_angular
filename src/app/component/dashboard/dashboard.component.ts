import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskObj: Task= new Task();
  taskArr:Task[]=[];
  addTaskValue:string='';
  valorAEditar:string="";
 constructor(private crudService:CrudService){

 }
 ngOnInit():void{
  this.valorAEditar="";
this.taskObj=new Task();
this.taskArr=[];
this.getAllTasks();

 }
 getAllTasks(){
  this.crudService.getAllTask().subscribe(
    response=>{
      this.taskArr=response;
    },error=>{
      alert("no es posible obtener la lista de tareas");
    }

  )
 }
 addTask(){
  this.taskObj.task_name=this.addTaskValue;
  this.crudService.addTask(this.taskObj).subscribe(
    res=>{
      console.log(this.taskObj.task_name);
      this.ngOnInit();
      this.addTaskValue='';
    }, error=>{
      alert(error);
    }
  )
 }
 editTask(){
  this.taskObj.task_name=this.valorAEditar;
  this.crudService.editTask(this.taskObj).subscribe(
    result=>{
      
      this.ngOnInit();
    }, error=>{
      alert("falló al actualizar");

    }
  )
 }
 deleteTask(tarea:Task){
this.crudService.deleteTask(tarea).subscribe(
  result=>{
    this.ngOnInit();
  },error=>{
    alert("falló al eliminar");
  }
)
 }

call(tarea:Task){
this.taskObj=tarea;
this.valorAEditar=tarea.task_name;
}

}
