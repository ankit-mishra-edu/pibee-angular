import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(public _data: DataService) {}

  ngOnInit(): void {}
}
