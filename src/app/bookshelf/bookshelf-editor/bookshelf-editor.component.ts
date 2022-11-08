import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/shared/book/book.model';
import { BookshelfService } from '../bookshelf.service';

@Component({
  selector: 'app-bookshelf-editor',
  templateUrl: './bookshelf-editor.component.html',
  styleUrls: ['./bookshelf-editor.component.css']
})
export class BookshelfEditorComponent implements OnInit {
  idx: number;
  isEditMode = false;
  bookDetails: Book = {
    title: '',
    author: '',
    genre: '',
    coverImagePath: '',
  };

  constructor(private route: ActivatedRoute, private router: Router, private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.idx = +params['id'];
        this.isEditMode = params['id'] != null;
        // console.log("%c isEditMode: ", "color: red;", this.isEditMode);
        if(this.isEditMode) {
          this.bookDetails = this.bookshelfService.getBook(this.idx)
        }
      }
    )
  }

  onSubmit(formObj: NgForm) {
    //Destructor book properties
    const {title, author, genre, coverImagePath} = formObj.value;

    // Set local bookDetails to formObj value
    this.bookDetails = new Book(title,author,genre, coverImagePath);

    // Conditional statement to call different methods/functions depending on what "mode" we are in
    if(this.isEditMode) {
      // Edit book
      this.bookshelfService.updateBook(this.idx, this.bookDetails);
    } else {
      // Create new book
      this.bookshelfService.addBook(this.bookDetails);
    }
    // Reset Form
    this.onResetForm();
  }

  onResetForm() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
