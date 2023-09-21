import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/auth.guard';
import { GamePageComponent } from './game-page/game-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LogInComponent},
  { path: 'myprofile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignInComponent},
  { path: 'home', component: HomeComponent },
  { path: 'reviewexample', component: GamePageComponent },
  { path: '**',  redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
