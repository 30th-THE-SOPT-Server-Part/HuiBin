/**
 * @기본_타입
 */
const isDone: boolean = true;
const str: string = 'hello';
const num: number = 2;
// const sum: number = 'sum number';

/**
 * @배열_타입
 */
const array: number[] = [1, 2, 3];
const strArr: Array<string> = ['hello', 'world']; // 제네릭 배열 타입
const objArr: Array<object> = [{ item: 'value' }, { itme: 'value2' }];

/**
 * @object_Object_차이
 */
const foo = (obj: object): void => {
  console.log(obj);
};

const boo = (obj: Object): void => {
  console.log(obj);
};

// foo('hi');
boo('hi');

/**
 * @함수_타입_표현
 */

function foo2(a: number, b: number): number {
  return a + b;
}

const boo2 = (a: number, b: number): number => {
  return a + b;
};

const noReturn = (): void => {
  console.log('hihi');
};

// foo2('hello', 2);

/**
 * @null_undefined
 */

const a: null = null;
// const x: null = 2;

const b: undefined = undefined;
// const y: undefined = null;

console.log(b);

/**
 * @타입_단언
 */

// angle-bracket
const myName: any = '채정아';
const myNameLength: number = (<string>myName).length;

// as
const yourName: any = '강민재';
const yourNameLength: number = (yourName as string).length;

/**
 * @any
 */

const unknown: any = {
  name: '채정아',
  age: 18,
  organization: 'SOPT',
  completion: [28, 29],
};

console.log(unknown);
