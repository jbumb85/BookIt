import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  constructor(private http: HttpClient, private libraryService: LibraryService) {}

  ngOnInit(): void {
  }

  onFetchBooks(searchInput: string) {

      this.libraryService.fetchBooks(searchInput)
      // Turn Search Query into lowercase words with plus sign for spaces
      // const formattedQuery = searchInput.split(' ').join('+').toLowerCase();
     // Send HTTP GET Request to the "openLibrary" api endpoint using the transformed input query
  //   this.http.get(`http://openlibrary.org/search.json?q=${formattedQuery}`).subscribe((searchResults) => {
  //     console.log('searchResponse', searchResults);
  //   });
  }

}
