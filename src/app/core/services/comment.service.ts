import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})





@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly API_URL = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  getCommentsByBook(bookId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.API_URL}?bookId=${bookId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.API_URL, comment);
  }
}
