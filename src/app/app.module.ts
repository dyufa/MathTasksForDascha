import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './workspaces/home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { PlusAufgabenModule } from './workspaces/plus-aufgaben/plus-aufgaben.module';
import { MinusAufgabenModule } from './workspaces/minus-aufgaben/minus-aufgaben.module';
import { SharedModule } from './_shared/shared.module';
import { OldVersionModule } from './workspaces/old-version/old-version.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		NavbarModule,
		HomeModule,
		PlusAufgabenModule,
		MinusAufgabenModule,
		OldVersionModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
