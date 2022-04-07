import { Dinner } from './interface/Dinner';
import { Member } from './interface/Member';

const dinner: Dinner = {
  member: [
    {
      name: '채정아',
      group: 'ob',
    },
    {
      name: '김동재',
      group: 'yb',
    },
    {
      name: '강민재',
      group: 'yb',
    },
    {
      name: '김루희',
      group: 'ob',
    },
    {
      name: '박진수',
      group: 'ob',
    },
  ],
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);

    return array;
  },
  organize(array) {
    this.shuffle(array);

    const ob = array.find(o => o.group === 'ob') as Member;
    const yb = array.find(o => o.group === 'yb') as Member;
    const dinnerMember = [ob.name, yb.name];

    console.log(`오늘의 저녁 식사 멤버는 ${dinnerMember[0]}, ${dinnerMember[1]}`);
  },
};

dinner.organize(dinner.member);
