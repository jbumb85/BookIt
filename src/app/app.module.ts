import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { BookshelfComponent } from './bookshelf/bookshelf.component';
// import { LibraryComponent } from './library/library.component';
// import { BookListComponent } from './bookshelf/book-list/book-list.component';
// import { BookDetailsComponent } from './bookshelf/book-details/book-details.component';
// import { BookResultsComponent } from './library/book-results/book-results.component';
// import { BookSearchComponent } from './library/book-search/book-search.component';
// import { SharedComponent } from './shared/shared.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
// import { BookComponent } from './shared/book/book.component';
// import { DropdownDirective } from './shared/directive/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
// import { BookshelfHomeComponent } from './bookshelf/bookshelf-home/bookshelf-home.component';
// import { BookshelfEditorComponent } from './bookshelf/bookshelf-editor/bookshelf-editor.component';
// import { NotificationComponent } from './shared/notification/notification.component';
// import { BookFormTdComponent } from './bookshelf/book-form-td/book-form-td.component';
// import { BookFormReactiveComponent } from './bookshelf/book-form-reactive/book-form-reactive.component';
// import { SortBooksPipe } from './shared/pipes/sortBooks.pipe';
// import { AuthComponent } from './shared/auth/auth.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { LibraryModule } from './library/library.module';
import { SharedModule } from './shared/shared.module';
import { BookshelfModule } from './bookshelf/bookshelf.module';
import { AuthModule } from './shared/auth/auth.module';
// import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    // BookshelfComponent,
    // LibraryComponent,
    // BookListComponent,
    // BookDetailsComponent,
    // BookResultsComponent,
    // BookSearchComponent,
    // SharedComponent,
    NavigationComponent,
    // BookComponent,
    // DropdownDirective,
    // BookshelfHomeComponent,
    // BookshelfEditorComponent,
    // NotificationComponent,
    // BookFormTdComponent,
    // BookFormReactiveComponent,
    // SortBooksPipe,
    // AuthComponent,
    // AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LibraryModule,
    SharedModule,
    BookshelfModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
