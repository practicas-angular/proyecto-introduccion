import { Component } from '@angular/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserFiltersComponent } from '../../components/user-filters/user-filters.component';

@Component({
  selector: 'app-about',
  imports: [NavbarComponent, UserTableComponent, UserFiltersComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutPage {

}
