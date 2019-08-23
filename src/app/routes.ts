import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuardService } from './shared/services/auth-guard.service'

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'lead-list',
        component: LeadListComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'lead-details/:id',
        component: LeadDetailsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'create-lead',
        component: LeadDetailsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '',
        redirectTo: '/lead-list',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];

export default appRoutes;