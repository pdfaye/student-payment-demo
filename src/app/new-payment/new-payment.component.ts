import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PaymentType} from '../models/student.model';
import {StudentsService} from '../services/students.service';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  public paymentFormGroup!: FormGroup;
  public studentCode!: string;
  public paymentTypes: string[] = [];
  pdfFileUrl!: string;
  showProgress : boolean = false;
  constructor(private fb: FormBuilder,
              private activatedRoute : ActivatedRoute,
              private studentsService: StudentsService) {
  }
  ngOnInit() {
    for(let elt in PaymentType){
      let value = PaymentType[elt];
      if (typeof value == "string"){
        this.paymentTypes.push(value);
      }

    }
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.paymentFormGroup = this.fb.group({
      date: this.fb.control(''),
      amount: this.fb.control(''),
      type: this.fb.control(''),
      studentCode: this.fb.control(this.studentCode),
      fileSource: this.fb.control(''),
      fileName: this.fb.control(''),


    });

  }

  newPayment() {
    this.showProgress= true;
    let date:Date = new Date(this.paymentFormGroup.value.date);
    let dateFormatted = date.getDate()+'/'+(date.getMonth()+1) + '/'+date.getFullYear();
    let formData:FormData= new FormData();
    formData.set('date', dateFormatted);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);
    formData.set('file', this.paymentFormGroup.value.fileSource);

    this.studentsService.savePayment(formData).subscribe(
      {
        next:value => {
          this.showProgress=false;
          alert('Payment Saved successfully!')
        },
        error:err => {
          console.log(err);
        }
      }
    );

  }

  selectFile(event: any) {
    if(event.target.files.length>0){
      let file = event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource : file,
        fileName : file.name,
      });
      this.pdfFileUrl = URL.createObjectURL(file);
    }

  }

  afterLoadComplete(event: any) {
    console.log(event)

  }
}
