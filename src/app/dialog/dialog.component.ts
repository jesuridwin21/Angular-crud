import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// export let MAT_DIALOG_DATA = new InjectionToken<MatDialogRef>('')

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
   
  conditionList = ["Brand New", "Useded", "Refurbished"]
  productform !: FormGroup;
  actionbtn : string = "Save"
  constructor(private formBuilder:FormBuilder,private api: ApiService,
     @Inject(MAT_DIALOG_DATA) public  editdata : any,
    private dialogref: MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.productform = this.formBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      condition : ['',Validators.required],
      price : ['',Validators.required],
      description : ['',Validators.required],
      date : ['',Validators.required]
    });
    // console.log(this.editdata);
    if(this.editdata) {
      this.actionbtn = "Update";
      this.productform.controls['productName'].setValue(this.editdata.productName);
      this.productform.controls['category'].setValue(this.editdata.category);
      this.productform.controls['condition'].setValue(this.editdata.condition);
      this.productform.controls['price'].setValue(this.editdata.price);
      this.productform.controls['description'].setValue(this.editdata.description);
      this.productform.controls['date'].setValue(this.editdata.date);
    }
  }
  addproduct() {
    // console.log(this.productform.value);
    if(!this.editdata) {
      if(this.productform.valid) {
        this.api.postproduct(this.productform.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully!!!!");
            this.productform.reset();
            this.dialogref.close('Save');
          },
          error:()=>{
            alert("error while adding a product")
          }
        })
      }
    }else {
      this.updateproduct()
    }
  }
 
  updateproduct() {
    this.api.putproduct(this.productform.value,this.editdata.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully");
        this.productform.reset();
        this.dialogref.close('Update');
      },
      error:()=>{
        alert("Error!! data not updated");
      }
    })
  }

}
