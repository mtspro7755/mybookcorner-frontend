import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CommentService } from '../../core/services/comment.service';
import { Book } from '../../core/models/book.model';
import { Comment } from '../../core/models/comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})

export class BookDetailComponent implements OnInit {

  book!: Book;
  comments: Comment[] = [];
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')!;
    this.loadBook(bookId);
    this.loadComments(bookId);
  }

  loadBook(bookId: string): void {
    this.bookService.searchBooks(bookId).subscribe(books => {
      this.book = books[0];
    });
  }

  loadComments(bookId: string): void {
    this.commentService.getCommentsByBook(bookId).subscribe(data => {
      this.comments = data;
    });
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    const comment: Comment = {
      content: this.newComment,
      userId: 1, // fake user
      googleBookId: this.book.googleBookId
    };

    this.commentService.addComment(comment).subscribe(saved => {
      this.comments.push(saved);
      this.newComment = '';
    });
  }
}
