import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
// import { RouterModule } from "@angular/router";
import { SortBooksPipe } from "../shared/pipes/sortBooks.pipe";
import { SharedModule } from "../shared/shared.module";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookshelfEditorComponent } from "./bookshelf-editor/bookshelf-editor.component";
import { BookshelfHomeComponent } from "./bookshelf-home/bookshelf-home.component";
import { BookshelfRoutingModule } from "./bookshelf-routing.module";
import { BookshelfComponent } from "./bookshelf.component";

@NgModule({
  declarations: [
    BookshelfComponent,
    BookListComponent,
    BookDetailsComponent,
    BookshelfHomeComponent,
    BookshelfEditorComponent,
    SortBooksPipe,
  ],
  imports: [SharedModule, BookshelfRoutingModule, CommonModule]
})

export class BookshelfModule {}
