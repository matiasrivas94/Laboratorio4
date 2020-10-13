import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { ArchivesServices } from './services/archives/archives.service';

import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Route[] = [
  {path: '', component: LogInComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'download', component: DownloadComponent},
  {path: 'list', component: ListComponent},
  {path: 'list/search', component: ListComponent},
  {path: 'logUp', component: RegisterComponent},
  {path: 'update/:fileID', component:UpdateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    UploadComponent,  
    DownloadComponent,
    ListComponent,
    RegisterComponent,
    UpdateComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArchivesServices],
  bootstrap: [AppComponent]
})
export class AppModule { }