import { Member } from './member';

export interface Dinner {
  member: Member[];

  shuffle(array: Member[]): Member[];
  organize(array: Member[]): void;
}
