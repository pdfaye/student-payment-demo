import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from '../services/students.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Payment} from '../models/student.model';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  studentCode!: string;
  dataSource: any;
  studentPayments: any;
  public displayedColumns=['id','date','amount','type','firstname','details'];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private studentService: StudentsService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit() {
    this.studentCode = this.activateRoute.snapshot.params['code'];
    this.studentService.getStudentPayments(this.studentCode)
      .subscribe({
        next: value => {
          this.studentPayments = value;
          this.dataSource = new MatTableDataSource(this.studentPayments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: err => {
          console.log(err);
        }
      })

  }

  newPayment() {
    this.router.navigateByUrl("/admin/new-payment/"+this.studentCode);
  }

  PaymentDetails(payment : Payment) {
    this.router.navigateByUrl("/admin/payment-details/"+payment.id)
  }
}
