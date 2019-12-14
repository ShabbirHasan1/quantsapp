import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import zipMap from 'src/utils/zipMap';
import { map } from 'rxjs/operators';
import { TResult } from './interfaces/TResult.interface';
import { TRes } from './interfaces/TRes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriggerDataService {
  constructor(private readonly http: HttpClient) {}
  data(): Observable<TRes[]> {
    return this.http.get<TResult>('http://localhost:3000/ot').pipe(
      map(data =>
        Object.entries(data)
          .filter(([, [t]]) => t.length > 1)
          .map(([h, t]) => t.map(val => ({ [h]: val })))
          .reduce(zipMap),
      ),
    );
  }
}