import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OldVersionComponent } from './old-version.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OldVersionComponent],
  exports: [OldVersionComponent]
})
export class OldVersionModule { }
