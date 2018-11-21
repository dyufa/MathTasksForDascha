import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusAufgabenComponent } from './plus-aufgaben.component';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [PlusAufgabenComponent],
	exports: [PlusAufgabenComponent]
})
export class PlusAufgabenModule {}
