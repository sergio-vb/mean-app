import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html'
})
export class TasksComponent{

    tasks:Task[];
    newTaskTitle:string;

    constructor(private taskService:TaskService){
        this.taskService.getTasks().subscribe(tasks => {
            console.log(tasks);
            this.tasks = tasks;
        });
    }

    addTask(event:Event){
        event.preventDefault;
        console.log('addTask called. Title:', this.newTaskTitle);
        var newTask = {
            title: this.newTaskTitle,
            isDone: false
        }

        this.taskService.addTask(newTask).subscribe( (task:any) => {
            this.tasks.push(task);
            this.newTaskTitle = "";
        });
    }
    
    deleteTask(id:string){
        this.taskService.deleteTask(id).subscribe(data => {
            if(data.n === 1){ //Operation successful
                this.tasks = this.tasks.filter(task => (task._id !== id));
            }
        });
    }

    changeTaskStatus(updatedTask:Task){
        const _task = Object.assign({}, updatedTask, {isDone: !updatedTask.isDone});

        this.taskService.updateTask(_task).subscribe(data => {
            updatedTask.isDone = !updatedTask.isDone;
        });
    }
}