import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/auth.guard';
import { AdminAuthGuard } from 'src/admin.auth.guard';
import { GamePageComponent } from './game-page/game-page.component';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { LevelingComponent } from './leveling/leveling.component';
import { GameCreationComponent } from './game-creation/game-creation.component';
import { GameListComponent } from './game-list/game-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LogInComponent},
  { path: 'loginAdmin', component: AdminLogInComponent},
  { path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignInComponent},
  { path: 'home', component: HomeComponent },
  { path: 'game/:id', component: GamePageComponent, canActivate: [AuthGuard] },
  { path: 'leveling', component: LevelingComponent, canActivate:[AdminAuthGuard]},
  { path: 'creategame', component: GameCreationComponent, canActivate:[AdminAuthGuard]},
  { path: 'listgames', component: GameListComponent, canActivate:[AdminAuthGuard]},
  { path: '**',  redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
