import { Injectable } from '@angular/core';
import data from '../data/data.json';

@Injectable({
  providedIn: 'root',
})
export class DocService {
  public constructor() {}

  public getDocs() {
    return data as any;
  }
}
