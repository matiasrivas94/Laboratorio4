import { Component, OnInit } from '@angular/core';
import { ArchivesServices } from '../../services/archives/archives.service';
import { ActivatedRoute } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';
import { SearchResultService } from 'src/app/services/searchResults/search-result.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  archives = [];

  public ids$;

  constructor(
    private serviceArchive: ArchivesServices, 
    private router: ActivatedRoute,
    private showError: ShowErrorService,
    private searchResult: SearchResultService) { }

  listItems(){
    this.serviceArchive.getFiles().subscribe(
      data => {
        this.archives = data;
      }, err => {
        this.dispatchError(err);
      }
    );
  }

  search(){
    let array = this.ids$.source._value;
    for (let id of array) {
      this.serviceArchive.getFile(id).subscribe(
        data=>{
          this.archives.push(data);
        }, err => {
          this.dispatchError(err);
        }
      );
    }
  }

  delete(id) {
    this.serviceArchive.deleteFile(id).subscribe(
      ()=>{
        this.listItems();
      }, err => {
        this.dispatchError(err);
      }
    );
  }

  download(id){
    this.serviceArchive.downloadFile(id);
  }

  ngOnInit() {
    this.ids$ = this.searchResult.select$();
    if(this.router.snapshot.url.length > 1)
      this.search();
    else
      this.listItems();
  }
  
  dispatchError(err) {
    this.showError.dispatchError(err);
  }
}