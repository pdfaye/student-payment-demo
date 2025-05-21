import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../services/students.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{

  paymentID! : number;
  pdfFileUrl! : any;
  constructor(private studentService: StudentsService, private activateRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.paymentID = this.activateRoute.snapshot.params['id'];
    this.studentService.getPaymentDetails(this.paymentID).subscribe(
      {
        next:value => {
          let blob:Blob= new Blob([value], {type:'application/Pdf'});
          this.pdfFileUrl = URL.createObjectURL(blob)
        },
        error:err => {
          console.log(err);
        }
      }
    )
  }

  afterLoadComplete(event: any){

  }
}
