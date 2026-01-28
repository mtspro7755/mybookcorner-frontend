import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes';
  private readonly API_KEY = 'AIzaSyBu3utq3xfCFzeTZwzMS3kobfo-5NZP-L0'; // Ajoutez votre clé API ici

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    return this.http
      .get<any>(`${this.API_URL}?q=${query}&key=${this.API_KEY}`) // Ajoutez la clé API
      .pipe(
        map(response =>
          response.items?.map((item: any) => ({
            googleBookId: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors?.join(', ') || 'Unknown author',
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
          })) || []
        )
      );
  }
}
