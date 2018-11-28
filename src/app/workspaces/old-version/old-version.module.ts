import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OldVersionComponent } from './old-version.component';

@NgModule({
  imports: [
	CommonModule,
	FormsModule
  ],
  declarations: [OldVersionComponent],
  exports: [OldVersionComponent]
})
export class OldVersionModule { }
