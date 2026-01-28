import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/models/book.model';
import { BookListComponent } from "../book-list/book-list.component";

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BookListComponent
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})
export class BookSearchComponent {
  query = '';
  books: Book[] = [];
  loading = false;
  error = '';

  constructor(private bookService: BookService) {}

  onSearch(): void {
    if (!this.query || this.query.trim().length < 3) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.bookService.searchBooks(this.query.trim()).subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Unable to load books. Please try again later.';
        this.loading = false;
      }
    });
  }

}
