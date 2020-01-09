import { HomeComponent } from './Components/home/home.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginGuard } from './Guards/Login/login.guard'
import { UserComponent } from './Components/home/user/user.component'
import { ViewComponent } from './Components/home/view/view.component'
import { UserRouteComponent } from './Components/home/user/user-route/user-route.component'
import { ViewRouteComponent } from './Components/home/view/view-route/view-route.component'
import { SampleComponent } from './sample/sample.component'
import { SearchGuard } from './Guards/search/search.guard'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserRouteComponent,
    canActivate: [ LoginGuard ],
    children: [ {
      path: '', component: UserComponent
      // path: '', component: SampleComponent
    } ]
  },
  {
    path: 'view',
    component: ViewRouteComponent,
    canActivate: [ SearchGuard ],
    children: [ {
      path: '', component: ViewComponent
    } ]
  },
]

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
