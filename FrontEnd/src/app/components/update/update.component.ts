import { Component, OnInit, NgZone } from '@angular/core';
import { ArchivesServices } from '../../services/archives/archives.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';
import { Archive } from 'src/app/interfaces/archives';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

    uploadedFiles: Array<File>;

    public archive: Archive;

    constructor(private service:ArchivesServices, 
                private router:Router, 
                private showError: ShowErrorService,
                 private route: ActivatedRoute) { }

    updates(){
        let fromData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++){
            fromData.append("archives", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        this.service.updateFile(this.archive._id, fromData).subscribe(data =>{
            this.router.navigateByUrl('/list');
        }, err => {
            this.showError.dispatchError(err);
        });
    }

    ngOnInit() {
        let id = this.route.snapshot.params.fileID;
        this.service.getFile(id).subscribe(data=>{
            this.archive = data;
        }, err => {
            this.showError.dispatchError(err);
        });
    }
    
    fileChange(element){
        this.uploadedFiles = element.target.files;
    }

    cancel() {
        this.uploadedFiles = new Array<File>();
    }
}