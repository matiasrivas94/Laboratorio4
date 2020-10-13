import { Component } from '@angular/core';
import { ArchivesServices } from './services/archives/archives.service';
import { Router } from '@angular/router';
import { ShowErrorService } from './services/showError/show-error.service';
import { SearchResultService  } from './services/searchResults/search-result.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Api-Files';
    name:string = "";
    loged:boolean = false;

    public error$;

    constructor(
        private service:ArchivesServices,
        private router:Router,
        private showError:ShowErrorService,
        private searchResult:SearchResultService
    )
    {
        if(localStorage.getItem('token')){
            this.loged = true;
        }
    }

    search(name){
        this.service.searchFile(name).subscribe(
            data => {
                let ids = [];
                for(let id of data){
                    ids.push(id._id);
                }
                this.searchResult.dispatchIds(ids);
                this.router.navigateByUrl('tolist/search');
            }, err => {
            this.showError.dispatchError(err);
            }
        );
    }

    singOff() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    ngOnInit() {
        this.error$ = this.showError.select$();
    };
}