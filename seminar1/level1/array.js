const arr = [1, 'item', true];
const arr2 = Array(4, null, { item: 'item' });

arr.map(item => console.log(item));
arr2.map(item => console.log(item));

/**
 * @함수_선언식
 */
function sum(a, b) {
  return a + b;
}

/**
 * @함수_표현식
 */
const sum2 = (a, b) => {
  return a + b;
};

console.log(typeof arr);
console.log(typeof 'hi');

const numArr = [1, 2, 3];
const newArr = numArr.map(x => x * 2);

console.log(newArr);
