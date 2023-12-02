/* import { DataSource } from '@angular/cdk/collections';
import { IUser } from '@models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceUser extends DataSource<IUser[]> {

  data = new BehaviorSubject<IUser[]>([]);
  originalData: IUser[]= [];

  connect(): Observable<IUser[]> {
    return this.data;
  }

  init(data: IUser[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

} */

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class GenericDataSource<T> extends DataSource<T> {

  data = new BehaviorSubject<T[]>([]);
  originalData: T[] = [];

  connect(): Observable<T[]> {
    return this.data;
  }

  init(data: T[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() {}

}
