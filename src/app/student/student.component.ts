import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StudentsService} from '../services/students.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router} from '@angular/router';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  students!: Array<Student>;
  public dataSource!: MatTableDataSource<Student>;
  public displayedColumns=['id','code','firstname','lastname','programId','payments'];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private studentService: StudentsService, private router: Router) {
  }
  ngOnInit() {
    this.studentService.getAllStudents()
      .subscribe({
        next:data => {
          this.students = data;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.log(err);
        }
      })
  }


  public studentPayment(student: Student) {
    this.router.navigateByUrl("/admin/student-details/"+student.code);
  }
}
