import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Archive } from '../../interfaces/archives';
import { ShowErrorService } from '../showError/show-error.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivesServices {
  baseurl = 'http://192.168.1.197:3000/api';

  constructor(private http: HttpClient, private showError: ShowErrorService) { }

  httpOption = {
    headers: new HttpHeaders({
      authorization: 'bearer ' + localStorage.getItem('token')
    })
  }

  uploadFile(data){
    this.thereToken();
    return this.http.post<Archive>(this.baseurl + '/archive/', data, this.httpOption);
  }

  searchFile(name){
    this.thereToken();
    return this.http.get<Archive[]>(this.baseurl + '/archive/find/' + name , this.httpOption);
  }
 
  deleteFile(id){
    this.thereToken();
    return this.http.delete<Archive>(this.baseurl + '/archive/' + id, this.httpOption);
  }

  getFile(id){
    this.thereToken();
    return this.http.get<Archive>(this.baseurl + '/archive/info/' + id, this.httpOption);
  }

  getFiles(){
    this.thereToken();
    return this.http.get<Archive[]>(this.baseurl + '/archive/', this.httpOption);
  }
  
  downloadFile(id){
    let infoFile;
    this.getFile(id).subscribe(
      data => {
        infoFile = data;
        saveAs('http://192.168.1.197:3000/api/archive/file/' + id, infoFile.name);
      }, err =>{
        this.showError.dispatchError(err);
      }
    );
  }

  updateFile(id, data){
    this.thereToken();
    return this.http.put<Archive>(this.baseurl + '/archive/' + id, data, this.httpOption);
  }

  private thereToken(){
    this.httpOption.headers = new HttpHeaders({
      authorization: 'bearer ' + localStorage.getItem('token')
    });
  }
}