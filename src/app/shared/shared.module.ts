import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "./alert/alert.component";
import { BookComponent } from "./book/book.component";
import { DropdownDirective } from "./directive/dropdown.directive";
import { PlaceholderDirective } from "./directive/placeholder.directive";
import { NotificationComponent } from "./notification/notification.component";

@NgModule({
  declarations: [
  AlertComponent,
  NotificationComponent,
  PlaceholderDirective,
  DropdownDirective,
  BookComponent
  ],
  imports: [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    NotificationComponent,
    CommonModule,
    BookComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class SharedModule {

}
