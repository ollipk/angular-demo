import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,TaskItemComponent,AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  constructor(private taskService : TaskService) {}
    tasks: Task[] = [];
    ngOnInit(): void {
      this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);

    }
    deleteTask(task: Task) {
      this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id!==task.id));
    }
    toggleReminder(task: Task) {
      task.reminder = !task.reminder;
      this.taskService.updateReminder(task).subscribe();
      //this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id!==task.id));
    }
    addTask(task: Task) {
      this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
    }
}
