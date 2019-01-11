import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { WorksheetsComponent} from './components/worksheets/worksheets.component';
import { WorksheetdetailComponent} from './components/worksheetdetail/worksheetdetail.component';
import { UsersComponent} from './components/users/users.component';
import { UserdetailComponent} from './components/userdetail/userdetail.component';
import { ItemsComponent} from './components/items/items.component';
import { ItemdetailComponent} from './components/itemdetail/itemdetail.component';
import { CalendarComponent} from './components/calendar/calendar.component';

const routes: Routes = [

  {
    path: 'calendar',
    component: CalendarComponent
  },
   {
    path: 'worksheets',
    component: WorksheetsComponent
  },

  {
    path: 'worksheetdetail/:wshid/:usrid',
    component: WorksheetdetailComponent
  },
  {
    path: 'worksheetdetail/add',
    component: WorksheetdetailComponent
  }

  ,
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'userdetail/:usrid',
    component: UserdetailComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'itemdetail/:itmid',
    component: ItemdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
