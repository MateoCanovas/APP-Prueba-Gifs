import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponentComponent } from "./componentes/home-component/home-component.component";
import { ListadoComponentComponent } from "./componentes/listado-component/listado-component.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponentComponent,
        pathMatch: 'full'
    },
    {
        path: 'listado',
        component: ListadoComponentComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}