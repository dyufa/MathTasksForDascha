import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './workspaces/home/home.component';
import { PlusAufgabenComponent } from './workspaces/plus-aufgaben/plus-aufgaben.component';
import { MinusAufgabenComponent } from './workspaces/minus-aufgaben/minus-aufgaben.component';
import { OldVersionComponent } from './workspaces/old-version/old-version.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'plus', component: PlusAufgabenComponent },
	{ path: 'minus', component: MinusAufgabenComponent },
	{ path: 'old', component: OldVersionComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
