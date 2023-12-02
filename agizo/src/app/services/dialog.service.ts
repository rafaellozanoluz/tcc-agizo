import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogRef: MatDialogRef<any> | null;

  constructor(private dialog: MatDialog) {
    this.dialogRef = null;
  }

  openDialog(component: ComponentType<any>): void {
    this.dialogRef = this.dialog.open(component, {
      disableClose: true,
      width: '250px',
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}