import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GamePageComponent } from './game-page/game-page.component';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { LevelingComponent } from './leveling/leveling.component';
import { GameCreationComponent } from './game-creation/game-creation.component';
import { GameListComponent } from './game-list/game-list.component';
import { ReviewComponent } from './review/review.component';
import { UserReviewComponent } from './user-review/user-review.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    LogInComponent,
    CarouselComponent,
    NavBarComponent,
    CardComponent,
    ProfileComponent,
    GamePageComponent,
    AdminLogInComponent,
    LevelingComponent,
    GameCreationComponent,
    GameListComponent,
    ReviewComponent,
    UserReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
