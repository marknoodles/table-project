import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Documents } from './app.models';
import { DocService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public positionNumber: number = 1;
  public editDoc: boolean = false;
  public statuses = {
    registred: 'Зарегистрирован',
    accepted: 'Принят',
  };
  public displayedColumns: string[] = [
    'position',
    'fio',
    'post',
    'docName',
    'address',
    'docDate',
    'status',
    'edit',
  ];

  public dataSource: Array<Documents>;
  public sortedData: Array<Documents>;

  constructor(private docService: DocService) {}

  @ViewChild(MatSort) sort: MatSort;

  public ngOnInit() {
    this.dataSource = this.docService.getDocs();
    this.sortedData = this.dataSource;
  }

  public sortData(sort: Sort) {
    const data: Documents[] = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a: Documents, b: Documents) => {
      const isAsc: boolean = sort.direction === 'asc';
      switch (sort.active) {
        case 'fio':
          return this.compareString(
            a.author ? a.author.fio : '',
            b.author ? b.author.fio : '',
            isAsc
          );
        case 'post':
          return this.compareString(
            a.author ? a.author.post : '',
            b.author ? b.author.post : '',
            isAsc
          );
        case 'docName':
          return this.compareString(a.docName, b.docName, isAsc);
        case 'address':
          return this.compareString(a.address, b.address, isAsc);
        case 'docDate':
          return this.compareString(a.docDate, b.docDate, isAsc);
        case 'status':
          return this.compareString(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  public compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public compareString(a: string, b: string, isAsc: boolean) {
    return a.localeCompare(b, 'da-DK') * (isAsc ? 1 : -1);
  }

  public addData() {
    let newDoc: Documents = {
      id: '',
      docCode: '',
      docDate: '',
      docName: '',
      docType: '',
      address: '',
      status: '',
      isSpecial: false,
      isEdit: true,
      author: {
        account: '',
        fio: '',
        post: '',
      },
    };

    this.sortedData.push(newDoc);
    this.sortedData = [...this.sortedData]; // this refreshes the mat table as it doesn't see changes
  }
  public editDocument(i: number) {
    this.sortedData[i].isEdit = !this.sortedData[i].isEdit;
  }
  public setDocData(fieldName: string, i: number, event: any) {
    if(fieldName === 'fio' || fieldName === "post"){
      this.sortedData[i].author[fieldName] = event.target.value;
    }else{
      this.sortedData[i][fieldName] = event.target.value;
    }
  }
}
