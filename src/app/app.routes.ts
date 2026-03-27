import { Routes } from '@angular/router';
import { TestingPageDirectivesComponent } from './pages/testing-page-directives/testing-page-directives.component';
import { HomePage } from './pages/home/home.component';
import { AboutPage } from './pages/about/about.component';
import { ContactPage } from './pages/contact/contact.component';
import { UserDetailsPageComponent } from './components/user-details-page/user-details-page.component';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'testing-directives', component: TestingPageDirectivesComponent },
    { path: 'home', component: HomePage },
    { path: 'contact', component: ContactPage },
    { path: 'about', component: AboutPage },
    { path: 'detail/:id', component: UserDetailsPageComponent },

];
