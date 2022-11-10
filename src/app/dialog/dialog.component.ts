import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
   
  conditionList = ["Brand New", "Useded", "Refurbished"]
  productform !: FormGroup
  constructor(private formBuilder:FormBuilder,private api: ApiService, private dialogref: MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.productform = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      condition : ['',Validators.required],
      price : ['',Validators.required],
      description : ['',Validators.required],
      date : ['',Validators.required]
    })
  }
  addproduct() {
    // console.log(this.productform.value);
    if(this.productform.valid) {
      this.api.postproduct(this.productform.value)
      .subscribe({
        next:(res)=>{
          alert("Product added successfully");
          this.productform.reset();
          this.dialogref.close();
        },
        error:()=>{
          alert("error while adding a product")
        }
      })
    }
  }

}
