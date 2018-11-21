import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinusAufgabenComponent } from './minus-aufgaben.component';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [MinusAufgabenComponent],
	exports: [MinusAufgabenComponent]
})
export class MinusAufgabenModule {}
