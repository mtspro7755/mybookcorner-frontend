import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BookCardComponent} from "./shared/components/book-card/book-card.component";
import {BookListComponent} from "./pages/book-list/book-list.component";
import {BookSearchComponent} from "./pages/book-search/book-search.component";
import {LoginComponent} from "./pages/login/login.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import { AuthService } from './core/services/auth.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mybookcorner-frontend';
  constructor(public authService: AuthService) {}
}
