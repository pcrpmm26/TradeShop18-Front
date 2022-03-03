import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:any;
  searchForm!: FormGroup;

  constructor(private service : ProductService, private router : Router, private toast :NgToastService ) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      name: new FormControl()
    });

    this.service.getProducts().subscribe((res: any)=>{
      this.products = res.data;
    })
  }

  searchName(){
    this.service.getProductByName(this.searchForm.value.name).subscribe((res: any)=>{
      this.products = res.data;
    })
  }

  daleteProduct(id: any){
    this.toast.error({detail:'Delete Success',summary:'Delete Success', sticky:true,position:'tr'})
    if(confirm("Comfirm Delete")){
      this.service.deleteProduct(id).subscribe((res)=>{
        this.router.navigateByUrl('/',{skipLocationChange: true})
        .then(()=>{
          this.router.navigate(['/product']);
        });
      });
    }
  }

}
