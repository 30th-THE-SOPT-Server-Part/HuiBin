import { Member } from './member';

export interface Dinner {
  members: Member[];

  shuffle(members: Member[]): Member[];
  organize(members: Member[]): void;
}
