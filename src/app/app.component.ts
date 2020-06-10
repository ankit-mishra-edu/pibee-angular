import { Component } from '@angular/core';
import { IUser } from './app-interface/User';
import { DataService } from './app-service/data-service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this._data.GetLoggedInUser().subscribe((loggedInUserResponse) => {
      this._data.loggedInUser = loggedInUserResponse;
    });

    this._data.GetAllUsers().subscribe((getAllUsersResponse) => {
      this._data.allUsersArray = getAllUsersResponse;
    });
  }
}
