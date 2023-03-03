import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [AuthComponent],
	imports: [SharedModule, CommonModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}