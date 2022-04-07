// interface Sopt {
//   name: string;
//   age: number;
//   organization: string;
//   completion: number[];
// }

// const sopt: Sopt = {
//   name: '채정아',
//   age: 18,
//   organization: 'SOPT',
//   completion: [28, 29],
// };

// console.log(sopt);

// const sopts: Sopt[] = [
//   {
//     name: '채정아',
//     age: 18,
//     organization: 'SOPT',
//     completion: [28, 29],
//   },
//   {
//     name: '장서현',
//     age: 19,
//     organization: 'SOPT',
//     completion: [27, 28, 29],
//   },
//   {
//     name: '이현우',
//     age: 5,
//     organization: 'SOPT',
//     completion: [30, 31, 32],
//   },
// ];

/**
 * @인터페이스
 */
interface Sopt {
  season: number;
  group: string[];
  part: string[];
  president: string;

  introduce(): string[];
}

const currentSopt: Sopt = {
  season: 30,
  group: ['YB', 'OB'],
  part: ['서버', '기획', '디자인', '안드로이드', '웹', 'iOS'],
  president: '김규민',
  introduce() {
    return this.part.map(name => {
      return `솝트 내 파트는 ${name} 파트가 있어요!`;
    });
  },
};

console.log(currentSopt.introduce());

/**
 * @선택적_프로퍼티
 */

interface Closet {
  name: string;
  shirt: number;
  pants: number;
  sunglass?: number;
  hat?: number;
}

const ohmygirl: Closet[] = [
  {
    name: '효정',
    shirt: 5,
    pants: 2,
  },
  {
    name: '아린',
    shirt: 2,
    pants: 8,
    hat: 2,
  },
];

const showOhmygirl = (arr: Closet[]) => {
  arr.map(e => console.log(e.name, e.pants, e.shirt, e.hat, e.sunglass));
};

showOhmygirl(ohmygirl);

const returnOhmygirl = (arr: Closet[]): Closet[] => {
  return arr;
};

console.log(returnOhmygirl(ohmygirl));
