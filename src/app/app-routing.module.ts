import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { CanDeactivateGuardService } from './_guards/can-deactivate-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: './main/main.module#MainModule',
        // canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: 'app/auth/auth.module#AuthModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        CanDeactivateGuardService
    ]
})
export class AppRoutingModule { }

