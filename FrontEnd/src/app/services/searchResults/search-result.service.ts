import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  private ids = [];
  private ids$ = new BehaviorSubject<any[]>([]);

  constructor() { }

  public select = () => [...this.ids];
  public select$ = () => this.ids$.asObservable();

  public dispatchIds(ids){
    this.ids = ids;
    this.ids$.next(this.select());
  }
}