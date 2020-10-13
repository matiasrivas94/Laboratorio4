import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auths/auth.service';
import { Router } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    email; pass;

    constructor(
        private service:AuthService,
        private router:Router,
        private showError:ShowErrorService
        ) { }

    ngOnInit() { }

    validemail = /^\w+@\w+\.\w{3}(\.\w{2})?$/;

    EmailValid(input) {
        this.email = input.value;
        if(!this.validemail.test(this.email)){
            this.showError.dispatchError({error:{message:' Invalid Email'}})
        }
    }

    login() {
        this.service.logIn({email: this.email, password: this.pass}).subscribe(
            data =>{
                if(localStorage.getItem('token')){
                    localStorage.removeItem('token');
                }
                localStorage.setItem('token', data.token.toString());
                this.router.navigateByUrl('/list');
                window.location.reload();
            }, err =>{
                this.showError.dispatchError(err);
            }
        );
    }
}