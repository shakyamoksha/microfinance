import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html'
})
export class DocumentViewComponent implements OnInit, AfterViewInit {
  attachment;

  constructor(public dialogRef: MatDialogRef<DocumentViewComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.attachment = this.data;
  }

  ngAfterViewInit(): void {
    console.clear();
  }

}
