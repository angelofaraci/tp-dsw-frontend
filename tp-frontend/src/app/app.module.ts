import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewsComponent,
    HomeComponent,
    SignInComponent,
    LogInComponent,
    CarouselComponent,
    NavBarComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
