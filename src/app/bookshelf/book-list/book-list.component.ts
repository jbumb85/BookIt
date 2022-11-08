
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/book/book.model';
import { BookshelfService } from '../bookshelf.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  @Input() book: Book
@Output() currentSelectedBook = new EventEmitter<Book>()
sortSwitcher = true;
sortField = 'author';
private bookListSub: Subscription;

  myBooks: Book[] = [];

  constructor(private bookshelfService: BookshelfService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.myBooks = this.bookshelfService.getBooks();

  this.bookListSub = this.bookshelfService.bookListChanged.subscribe((books: Book[]) => {this.myBooks = books});
  }

  ngOnDestroy(): void {
    this.bookListSub.unsubscribe();
  }

  onRemoveBook(idx) {
    this.bookshelfService.removeBook(idx);
  }

  onNewBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSort() {
    this.sortSwitcher = !this.sortSwitcher;

    if (this.sortSwitcher) {
      this.sortField = 'author'
    } else {
      this.sortField = 'title'
    }
  }

}
