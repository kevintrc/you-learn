import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "./auth.gaurd";
import { EditGuard } from "./edit.guard";
import { EditComponent } from "./edit/edit.component";
import { LoggedAuthGaurd } from "./loggedAuth.gaurd";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PublicComponent } from "./public/public.component";
import { SearcherComponent } from "./searcher/searcher.component";
import { UsernotesComponent } from "./usernotes/usernotes.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/public', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoggedAuthGaurd] },
    { path: 'public', component: PublicComponent },
    { path: 'search', component: SearcherComponent, canActivate: [AuthGaurd] },
    { path: 'new/:id', component: EditComponent, canActivate: [AuthGaurd, EditGuard] },
    { path: 'usernotes', component: UsernotesComponent, canActivate: [AuthGaurd] },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGaurd, LoggedAuthGaurd, EditGuard]
})

export class AppRoutingModule {

}