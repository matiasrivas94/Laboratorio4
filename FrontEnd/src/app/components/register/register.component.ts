import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auths/auth.service';
import { Router } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    email; userName; pass; confirm;

    constructor(
        private service:AuthService,
        private router:Router,
        private showError: ShowErrorService) { }
    
    emailValid = /^\w+@\w+\.\w{3}(\.\w{2})?$/; 

    validateEmaill(input) {
        this.email = input.value;
        if(!this.emailValid.test(this.email)){
            this.showError.dispatchError({error:{message:'Invalid Email'}});
        }
    }
  
    authNameValid = /^([A-Z][a-z]){2,25}$/;

    validarAuthName(input){
        let name = input.value;
        if(!this.authNameValid.test(name)){
            this.showError.dispatchError({error:{message:'Invalid Username'}});
        }
    }
    
    evaluate(){
        if(this.pass = this.confirm) return true;
        else return false;
    }

    check() {
        if(this.evaluate() == true){
        this.service.logUp({email:this.email, userName: this.userName, password: this.pass}).subscribe(
            data => {
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
            localStorage.setItem('token', data.token.toString());
            this.router.navigateByUrl("/list");
            window.location.reload();
            }, err => {
            this.showError.dispatchError(err);
            }
        );
        }
    }

    ngOnInit() { }
}