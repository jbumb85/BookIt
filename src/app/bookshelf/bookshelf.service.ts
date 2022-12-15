import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../shared/book/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookshelfService {
  bookSelected = new Subject<Book>();
  bookListChanged = new Subject<Book[]>();

  private myBooks: Book[] = [
    // new Book(
    //   '1984',
    //   'George Orwell',
    //   'Sci-Fi',
    //   'https://images-na.ssl-images-amazon.com/images/I/51XvtuFUlxS.jpg'
    // ),

    // new Book(
    //   '1984',
    //   'George Orwell',
    //   'Sci-Fi',
    //   'https://images-na.ssl-images-amazon.com/images/I/51XvtuFUlxS.jpg'
    // ),

    // new Book(
    //   '1984',
    //   'George Orwell',
    //   'Sci-Fi',
    //   'https://images-na.ssl-images-amazon.com/images/I/51XvtuFUlxS.jpg'
    // ),
  ];

  getBooks() {
    return this.myBooks.slice();
  }
  saveBook(book: Book) {
    this.myBooks.push(book);
    this.bookSelected.next(book);
    this.bookListChanged.next(this.getBooks());
  }

  removeBook(idx: number) {
    if (idx >= 0) {
      this.bookSelected.next(this.myBooks[idx])
      this.myBooks.splice(idx, 1);
      this.bookListChanged.next(this.getBooks())
    }
  }




  getBook(idx: number) {
    return this.getBooks()[idx];
  }

  addBook(book: Book) {
    this.myBooks.push(book);
    this.bookListChanged.next(this.getBooks());
  }

  updateBook (idx: number, updateBook: Book) {
    this.myBooks[idx] = updateBook;
    this.bookListChanged.next(this.getBooks());
  }

  setBooks(books: Book[] | []) {
    console.log('%c books: ', 'color: red;', books);

    this.myBooks = books || [];
    this.bookListChanged.next(this.getBooks());
  }

}
