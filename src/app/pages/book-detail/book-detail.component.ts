import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { CommentService } from '../../core/services/comment.service';
import { AuthService } from '../../core/services/auth.service'; // Ajout de l'import
import { Book } from '../../core/models/book.model';
import { Comment } from '../../core/models/comment';
import { User } from '../../core/models/user'; // Ajout de l'import
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  book!: Book;
  comments: Comment[] = [];
  newComment = '';
  user: User | null = null; // Déclaration de l'utilisateur pour le HTML

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private commentService: CommentService,
    private authService: AuthService // Injection du service d'authentification
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id')!;

    // Récupération de l'utilisateur actuel pour l'affichage et les RG
    this.user = this.authService.getCurrentUser();

    this.loadBook(bookId);
    this.loadComments(bookId);
  }

  loadBook(bookId: string): void {
    this.bookService.searchBooks(bookId).subscribe(books => {
      if (books && books.length > 0) {
        this.book = books[0];
      }
    });
  }

  loadComments(bookId: string): void {
    this.commentService.getCommentsByBook(bookId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => console.error("Erreur lors du chargement des commentaires", err)
    });
  }

  addComment(): void {
    // RG1 : Vérification que le champ est renseigné
    if (!this.newComment.trim() || !this.user) return;

    const comment: Comment = {
      content: this.newComment,
      userId: this.user.id, // Utilisation de l'ID réel au lieu du "fake 1"
      googleBookId: this.book.googleBookId
    };

    this.commentService.addComment(comment).subscribe({
      next: (saved) => {
        this.comments.unshift(saved); // Ajoute le nouveau commentaire en haut de liste
        this.newComment = ''; // Vide le champ après succès
      },
      error: (err) => alert("Erreur lors de l'envoi du commentaire")
    });
  }
}
