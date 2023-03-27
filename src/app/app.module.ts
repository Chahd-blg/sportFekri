import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CupEventComponent } from './components/cup-event/cup-event.component';
import { ScoreComponent } from './components/score/score.component';
import { NewsComponent } from './components/news/news.component';
import { StatsComponent } from './components/stats/stats.component';
import { BlogComponent } from './components/blog/blog.component';
import { InfoComponent } from './components/info/info.component';
import { ArticleComponent } from './components/article/article.component';
import { AllmatchesComponent } from './components/allmatches/allmatches.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerComponent } from './components/player/player.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { MatchesTableComponent } from './components/matches-table/matches-table.component';
import { TeamsTableComponent } from './components/teams-table/teams-table.component';
import { PlayersTableComponent } from './components/players-table/players-table.component';
import { AdminComponent } from './components/admin/admin.component';
import { Banner1Component } from './components/banner1/banner1.component';
import { FormsModule,ReactiveFormsModule, } from '@angular/forms';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { AsterixPipe } from './pipes/asterix.pipe';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherComponent } from './components/weather/weather.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CupEventComponent,
    ScoreComponent,
    NewsComponent,
    StatsComponent,
    BlogComponent,
    InfoComponent,
    ArticleComponent,
    AllmatchesComponent,
    PlayersComponent,
    PlayerComponent,
    AddMatchComponent,
    AddPlayerComponent,
    AddTeamComponent,
    MatchesTableComponent,
    TeamsTableComponent,
    PlayersTableComponent,
    AdminComponent,
    Banner1Component,
    MatchInfoComponent,
    AsterixPipe,
    EditMatchComponent,
    MyFilterPipe,
    SearchComponent,
    PlayerInfoComponent,
    TeamInfoComponent,
    ProfileComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
