import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn : boolean;
  title = 'piBeeAngular';

  ngOnInit(): void {
    this.isLoggedIn();    
  }

  isLoggedIn() {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.loggedIn = true;
    }
    else if (localStorage.getItem('isLoggedIn') == "false") {
      this.loggedIn = false;
    }
    return(this.loggedIn)
  }
}
