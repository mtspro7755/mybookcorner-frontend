import { Routes } from '@angular/router';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./core/guards/auth.guard";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '' }
];

