import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BicycleModel} from '../../models/bicycle.model';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html'
})
export class DialogComponent {
    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: BicycleModel) {
    }
    onYesClick(): void {
      this.dialogRef.close(this.data);
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
}
