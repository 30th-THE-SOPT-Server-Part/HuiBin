import { Dinner } from './interface/dinner';

const dinner: Dinner = {
  members: [
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
  shuffle(members) {
    members.sort(() => Math.random() - 0.5);

    return members;
  },
  organize(members) {
    this.shuffle(members);

    const ob = members.find(member => member.group === 'ob');
    const yb = members.find(member => member.group === 'yb');

    if (ob && yb) {
      const dinnerMembers = [ob.name, yb.name];

      console.log(`오늘의 저녁 식사 멤버는 ${dinnerMembers[0]}, ${dinnerMembers[1]}`);
    }
  },
};

dinner.organize(dinner.members);
