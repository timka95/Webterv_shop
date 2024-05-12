import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButton],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  confirm() {
    // Confirm deletion and close the dialog
    this.dialogRef.close(true);
  }

  cancel() {
    // Cancel deletion and close the dialog
    this.dialogRef.close(false);
  }
}
