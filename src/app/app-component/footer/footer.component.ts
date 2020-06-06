import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/app-interface/User';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  loggedInUser$: Observable<IUser>;
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
  }
}
