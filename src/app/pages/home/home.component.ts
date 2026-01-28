import { Component } from '@angular/core';
import {BookSearchComponent} from "../book-search/book-search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BookSearchComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
