import { Component, Input, OnInit } from '@angular/core';
import { DataItems } from '../note.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

  @Input() video: DataItems;
  @Input() index : number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
