import { Component, OnInit } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.css']
})
export class SnackComponent implements OnInit {
  snackData : string
  constructor() { }

  ngOnInit() {
  
  }

}
