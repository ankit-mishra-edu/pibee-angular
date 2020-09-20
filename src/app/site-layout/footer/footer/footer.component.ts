import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../services/data.service';

import { IUser } from '../../../modules/shared/interfaces/User';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  loggedInUser$: Observable<IUser>;
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.getLoggedInUser$();
  }
}
