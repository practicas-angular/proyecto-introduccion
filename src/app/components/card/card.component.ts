import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input()
  user!: Partial<User>;

  /* name: string = this.user.name;
  avatar: string = this.user.avatar; */
  defaultImg: string = 'default.png';
  avatarDirectory: string = '/img/';
}
