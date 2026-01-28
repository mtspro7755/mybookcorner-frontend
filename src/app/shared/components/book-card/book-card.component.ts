import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})

export class BookCardComponent {

  @Input() book!: Book;
  @Output() viewDetails = new EventEmitter<string>();

  onViewDetails() {
    this.viewDetails.emit(this.book.googleBookId);
  }
}
