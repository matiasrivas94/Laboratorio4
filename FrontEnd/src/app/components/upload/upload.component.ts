import { Component, OnInit, NgZone } from '@angular/core';
import { ArchivesServices } from '../../services/archives/archives.service';
import { Router } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';
// https://blog.jscrambler.com/implementing-file-upload-using-node-and-angular/
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  
  uploadedFiles: Array<File>;

  constructor(private service:ArchivesServices,
              private ngZone:NgZone,
              private router:Router,
              private showError: ShowErrorService) { }
  
  uploads(){
    let fromData = new FormData();

    for (var i = 0; i < this.uploadedFiles.length; i++)
    {
      fromData.append("archives", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.service.uploadFile(fromData).subscribe(data =>{
    console.log(data);
    this.ngZone.run(()=>{this.router.navigateByUrl('/list')})
    },
    err => {
      this.showError.dispatchError(err);
    });
  }

  fileChange(element){
    this.uploadedFiles = element.target.files;
  }

  cancel() {
    this.uploadedFiles = new Array<File>();
  }
  
  ngOnInit() { }
}