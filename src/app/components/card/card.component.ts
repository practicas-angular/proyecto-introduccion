import { Component, Input } from '@angular/core';
import { UserCard } from '../../interfaces/user_card_simple.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input()
  user!: UserCard;

  /* name: string = this.user.name;
  avatar: string = this.user.avatar; */
  defaultImg: string = 'default.png';
  avatarDirectory: string = '/img/';
}
