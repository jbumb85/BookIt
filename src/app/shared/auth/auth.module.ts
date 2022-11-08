import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// import { AppRoutingModule } from "src/app/app-routing.module";
import { SharedModule } from "../shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: AuthComponent }])]
})

export class AuthModule {}
