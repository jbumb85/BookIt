import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take, exhaustMap } from 'rxjs';
import { BookshelfService } from 'src/app/bookshelf/bookshelf.service';

import { Book } from '../book.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  firebaseRootURL =
    'https://bookit-app-ebd3d-default-rtdb.firebaseio.com/books.json';

  constructor(
    private http: HttpClient,
    private bookshelfService: BookshelfService,
  ) {}

  saveBooksToFirebase() {
    const books = this.bookshelfService.getBooks();

    this.http.put(this.firebaseRootURL, books).subscribe((res) => {
      console.log('FireBase DB Response', res);
    });
  }

  fetchBooksFromFirebase() {
    // return this.authService.currentUser.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     console.log(user);
    //     return this.http
    //       .get(this.firebaseRootURL, {
    //         params: new HttpParams().set('auth', user.token),
    //       })
    //       .pipe(
    //         tap((books: Book[]) => {
    //           this.bookshelfService.setBooks(books);
    //         })
    //       );
    //   })
    // );
    return this.http.get<Book[]>(this.firebaseRootURL, {}).pipe(tap((books) => {
      this.bookshelfService.setBooks(books);
    }))
  }
}
