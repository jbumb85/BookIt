import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes  } from "@angular/router";
import { BookDetailsComponent } from "./bookshelf/book-details/book-details.component";
import { BookResolverService } from "./bookshelf/book-resolver.service";
import { BookshelfEditorComponent } from "./bookshelf/bookshelf-editor/bookshelf-editor.component";
import { BookshelfHomeComponent } from "./bookshelf/bookshelf-home/bookshelf-home.component";
import { BookshelfComponent } from "./bookshelf/bookshelf.component";
import { LibraryComponent } from "./library/library.component";
import { AuthComponent } from "./shared/auth/auth.component";
import { AuthGuard } from "./shared/auth/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/bookshelf', pathMatch: 'full'},
  // { path: 'bookshelf', component: BookshelfComponent, canActivate: [AuthGuard], children: [
  //  { path: '', component: BookshelfHomeComponent},
  //  { path: 'new', component: BookshelfEditorComponent},
  //  { path: ':id', component: BookDetailsComponent, resolve: [BookResolverService]},
  //  { path: ':id/edit', component: BookshelfEditorComponent, resolve: [BookResolverService]},
  // ]},
  // { path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  // {path: 'auth', component: AuthComponent}
  {
    path: "auth",
    loadChildren: () =>
      import("./shared/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "bookshelf",
    loadChildren: () =>
      import("./bookshelf/bookshelf.module").then(m => m.BookshelfModule)
  },
  {
    path: "library",
    loadChildren: () =>
      import("./library/library.module").then(m => m.LibraryModule)
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
