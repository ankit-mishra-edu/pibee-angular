import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../../../../services/data.service';
import { SpeechService } from '../../../../services/speech.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  listenClicks$ = new Subject<void>();

  spokenKeyword$ = this.listenClicks$.pipe(
    switchMap(() => this._speechService.listen())
  );

  constructor(
    private _data: DataService,
    private _speechService: SpeechService
  ) {}

  ngOnInit(): void {}

  getSearchBoxQuery$(): Observable<string> {
    return this._data.getSearchBoxQuery$();
  }

  setSearchBoxQuery$(value) {
    console.log(value);
    this._data.setSearchBoxQuery$(value);
  }

  getListenClicks$(value) {
    this._speechService.getListenClicks$();
  }

  setListenClicks$() {
    console.log('Button clicked....In SearchBox.ts');
    this._speechService.setListenClicks$('1');
  }
}
