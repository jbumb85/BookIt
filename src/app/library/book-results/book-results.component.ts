import { Component, OnInit } from '@angular/core';
import { BookshelfService } from 'src/app/bookshelf/bookshelf.service';
import { Book } from 'src/app/shared/book/book.model';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.css']
})
export class BookResultsComponent implements OnInit {

  bookResults: Book[] = [];

  constructor(private bookshelfService: BookshelfService, private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.bookResults = this.libraryService.getBooks();
    this.libraryService.bookListChanged.subscribe((books: Book[]) => {
      this.bookResults = books;
    })
  }

  onSaveBook(book: Book) {
    return this.bookshelfService.saveBook(book);
  }

}
