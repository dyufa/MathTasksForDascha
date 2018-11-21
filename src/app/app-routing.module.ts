import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './workspaces/home/home.component';
import { PlusAufgabenComponent } from './workspaces/plus-aufgaben/plus-aufgaben.component';
import { MinusAufgabenComponent } from './workspaces/minus-aufgaben/minus-aufgaben.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'plus', component: PlusAufgabenComponent },
	{ path: 'minus', component: MinusAufgabenComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
