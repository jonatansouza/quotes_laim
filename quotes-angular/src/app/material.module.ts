import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatPaginatorModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatMenuModule } from '@angular/material'

const EXPOSE_MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule
]

@NgModule({
  imports: [
    CommonModule,
    ...EXPOSE_MODULES
  ],
  exports: [
    ...EXPOSE_MODULES
  ],
  declarations: []
})
export class MaterialModule { }
