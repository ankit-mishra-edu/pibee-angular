import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor(private _data: DataService) {}

  ngOnInit(): void {}

  getSearchBoxQuery$(): Observable<string> {
    return this._data.getSearchBoxQuery$();
  }

  setSearchBoxQuery$(value) {
    console.log(value);
    this._data.setSearchBoxQuery$(value);
  }
}
