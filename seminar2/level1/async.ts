/**
 * @비동기_콜백함수
 */
console.log('Hello Server');

setTimeout(() => {
  console.log('Set Timeout');
}, 3000);

console.log('Finish');

/**
 * @비동기_Promise
 */
const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) resolve('Success!');
  else reject(new Error('Condition is false'));
});

promise.then(data => console.log(data)).catch(error => console.log(error));

// Promise Chaining
const restaurant = (callback: () => void, time: number) => {
  setTimeout(callback, time);
};

const order = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    restaurant(() => {
      console.log('[레스토랑 진행 상황 - 음식 주문]');
      resolve('음식 주문 시작');
    }, 1000);
  });
};

const cook = (progress: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    restaurant(() => {
      console.log('[레스토랑 진행 상황 - 음식 조리]');
      resolve(`${progress} -> 음식 조리 중`);
    }, 2000);
  });
};

const serving = (progress: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    restaurant(() => {
      console.log('[레스토랑 진행 상황 - 음식 서빙]');
      resolve(`${progress} -> 음식 서빙 중`);
    }, 3000);
  });
};

const eat = (progress: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    restaurant(() => {
      console.log('[레스토랑 진행 상황 - 음식 먹기]');
      resolve(`${progress} -> 음식 먹는 중`);
    }, 4000);
  });
};

order()
  .then(progress => cook(progress))
  .then(progress => serving(progress))
  .then(progress => eat(progress))
  .then(progress => console.log(progress));

// 단일 catch
Promise.resolve(123)
  .then(res => {
    throw new Error('에러 발생!');

    return 456; // 절대 실행되지 않음
  })
  .then(res => {
    console.log(res); // 절대 실행되지 않음

    return Promise(resolve(789));
  })
  .catch(error => console.log(error.message));

/**
 * @비동기_Async_Await
 */
const asyncFunc1 = (msg: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`asyncFunc1 - ${msg}`);
    }, 1000);
  });
};

const asyncFunc2 = (msg: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`asyncFunc2 - ${msg}`);
    }, 1500);
  });
};

// Promise 사용
const promiseMain1 = () => {
  asyncFunc1('server part')
    .then(result => {
      console.log(result);

      return asyncFunc2('김희빈');
    })
    .then(result => console.log(result));
};

promiseMain1();

// async & await 사용
const asyncMain = async () => {
  let result = await asyncFunc1('server part');

  console.log(result);

  result = await asyncFunc2('김희빈');

  console.log(result);
};

asyncMain();
