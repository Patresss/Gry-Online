import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css']
})
export class GameDialogComponent implements OnInit {

  dialogTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data.dialogTitle;
  }

  ngOnInit(): void {
    this.autoCloseDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  autoCloseDialog(): void {
    setTimeout(() => {
      this.closeDialog();
    }, 3000);
  }


}
