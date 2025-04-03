import { Routes } from '@angular/router'; 
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { authGuard } from './auth.guard';
import { VerifyComponent } from './verify/verify.component';

export const routes: Routes = [
    
    {
        path: '',
        redirectTo : 'login',
        pathMatch : 'full'
    } ,
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path: 'register',
        component : RegisterComponent
    },
    {
        path: 'verify',
        component : VerifyComponent
    },
    {
        path: '',
        component : LayoutComponent,
        children:[
            {
                path: 'edit',
                component : EditComponent,
                canActivate : [authGuard]
            }
            ,
            {
                path: 'create',
                component : CreateComponent,
                canActivate : [authGuard]
            },
            {
                path: 'home',
                component : HomeComponent,
                canActivate : [authGuard]
            },
            {
                path: 'favorite',
                component : FavoriteComponent,
                canActivate : [authGuard]
            }
            ,
            {
                path: 'history',
                component : HistoryComponent,
                canActivate : [authGuard]
            }
           
        ]
    },{
        path: '**',
        component: PagenotfoundComponent,
    }
    
// <!-- this is a another method which uses the ID from URL  -->
    // ,
    // {
    //     path: 'edit/:id',
    //     component : EditComponent
    // }


    
    //           <!-- this is a another method which uses the ID from BehaviorSubject   -->
    ,
    
];
