import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../core/models/book.model';
import { BookCardComponent } from "../../shared/components/book-card/book-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    BookCardComponent,
    CommonModule
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  @Input() books: Book[] = [];

  constructor(private router: Router) {}

  onViewDetails(bookId: string): void {
    this.router.navigate(['/books', bookId]);
  }
}
