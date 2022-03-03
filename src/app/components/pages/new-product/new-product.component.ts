import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;
currentUser: any;
  isLoggedIn = false;
  constructor(private service: ProductService, private router: Router,private tokenStorage: TokenStorageService ,private toast :NgToastService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if(this.isLoggedIn){
      this.currentUser = this.tokenStorage.getUser();
      console.log(this.currentUser);
    }

    this.productForm = new FormGroup({
      name: new FormControl(),
      img: new FormControl(),
      categoryname: new FormControl(),
      details: new FormControl()
    });
  }

  addProduct(){
    let product = {
      name: this.productForm.value.name,
      img: this.productForm.value.img,
      categoryname: this.productForm.value.categoryname,
      details: this.productForm.value.details,
      // postName:this.currentUser.name,
      // postEmail: this.currentUser.email,
      // postTel: this.currentUser.tel
    }
      this.service.addProduct(product).subscribe((res)=>{
        console.log(res);
        if(res.msg="Add a product complete."){
          // window.alert("Add Complete");
            this.toast.success({detail:'Success',summary:'Add Product  Success', sticky:true,position:'tr'})
            
          this.router.navigate(["/product"]);
        }else{
          this.toast.error({detail:'Error',summary:'This Not Success', sticky:true,position:'tr'})
          this.router.navigate(["/product/new"]);
        }
      });
  }

}
