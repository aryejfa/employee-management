import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatRupiah } from '../../utilities/utilities';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  rupiahNumber: any = formatRupiah;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
  }
}

