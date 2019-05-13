import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {   path: '', component: MainComponent,
	children: [
		{
			path: 'dashboard',
			loadChildren: './dashboard/dashboard.module#DashboardModule'
		},
	    {
		path: 'admin',
		loadChildren: './admin/admin.module#AdminModule'
	    },
	    {
		path: 'biobanking',
		loadChildren: './biobanking/biobanking.module#BiobankingModule'
	    },
	    {
		path: 'medical',
		loadChildren: './medical/medical.module#MedicalModule'
	    },
	    {
		path: 'my-account',
		loadChildren: './my-account/my-account.module#MyAccountModule'
	    },
	    { path: '', redirectTo: 'dashboard' }
	]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
