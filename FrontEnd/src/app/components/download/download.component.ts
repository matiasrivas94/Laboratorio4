import { Component, OnInit } from '@angular/core';
import { ArchivesServices  } from '../../services/archives/archives.service';
import { Archive } from '../../interfaces/archives';
import { ShowErrorService } from '../../services/showError/show-error.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  archive: Archive = null;
  id = null;

  constructor(private service: ArchivesServices, private showError: ShowErrorService) { }

  search(id){
    this.service.getFile(id).subscribe(data=>{
      this.archive = data;
    }, err => {
      this.showError.dispatchError(err);
    });
  }

  download(id){
    this.service.downloadFile(id);
  }

  cancel(){
    this.archive = null;
    this.id = null;
  }

  ngOnInit() { }
}