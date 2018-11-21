import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberSettingComponent } from './number-setting/number-setting.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
	imports: [CommonModule],
	declarations: [NumberSettingComponent, SettingsComponent],
	exports: [SettingsComponent]
})
export class SharedModule {}
