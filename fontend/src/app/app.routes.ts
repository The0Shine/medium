import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WriteComponent } from './pages/write/write.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyStoryComponent } from './pages/my-story/my-story.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';

export const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'post/:id', component: PostDetailComponent },

  // User routes (no guards needed)
  { path: 'write', component: WriteComponent },
  { path: 'write/:id', component: WriteComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-story', component: MyStoryComponent },

  { path: '**', redirectTo: '' },
];
