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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
