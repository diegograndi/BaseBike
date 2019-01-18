import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorksheetsComponent } from './components/worksheets/worksheets.component';
import { WorksheetdetailComponent } from './components/worksheetdetail/worksheetdetail.component';
import { UsersComponent } from './components/users/users.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemdetailComponent } from './components/itemdetail/itemdetail.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { WorksheetItemsComponent } from './components/worksheetitems/worksheetitems.component';
import { WorksheetphotosComponent } from './components/worksheetphotos/worksheetphotos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MessageboardComponent } from './components/messageboard/messageboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';


registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WorksheetsComponent,
    WorksheetdetailComponent,
    UsersComponent,
    ItemsComponent,
    ItemdetailComponent,
    UserdetailComponent,
    WorksheetItemsComponent,
    WorksheetphotosComponent,
    NavbarComponent,
    MessageboardComponent,
    CalendarComponent,
    CalendarHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
