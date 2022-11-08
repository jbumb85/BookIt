import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookshelfService } from 'src/app/bookshelf/bookshelf.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private bookChangeSub: Subscription;

  constructor(private bookshelfService: BookshelfService) { }

  ngOnInit(): void {
    this.bookChangeSub = this.bookshelfService.bookSelected.subscribe(data => {
      console.log(data);
      alert(`title: ${data.title}\n author: ${data.author}`)
    });
  }

  ngOnDestroy(): void {
      this.bookChangeSub.unsubscribe();
  }
}
