import { Seat } from "./States";

export function GenSeatArray(Width: number, Height: number) {
  return [...Array(Width * Height).keys()].map(i => {
    return { isEnabled: true, ID: i, showedNumber: i + 1 };
  });
}

export function CheckInputError(N: number, Min: number, Max: number) {
  return isNaN(N) || Min > N || Max < N;
}

export function Randomize(
  CurrentSeats: Seat[],
  width: number,
  isForceFrontFunctionEnabled: boolean,
  ForceFrontList: number[],
  ForceFrontRange: number
): Seat[] {
  const EnabledSeats: Seat[] = CurrentSeats.filter(s => s.isEnabled);
  const ShowedNumbers: number[] = EnabledSeats.map(s => s.showedNumber);

  //シャッフル (Fisher-Yates)
  let count: number = 0;
  while (true) {
    ++count;
    for (let i = ShowedNumbers.length - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = ShowedNumbers[i];
      ShowedNumbers[i] = ShowedNumbers[r];
      ShowedNumbers[r] = tmp;
    }

    if (!isForceFrontFunctionEnabled) break;

    let flag = false;
    ForceFrontList.forEach(n => {
      flag = flag || ShowedNumbers.indexOf(n) > width * ForceFrontRange - 1;
    });
    if (!flag) break;
  }
  console.log(`${count}回の試行`);

  for (let i = 0; i < EnabledSeats.length; i++) {
    EnabledSeats[i].showedNumber = ShowedNumbers[i];
  }

  const NewArray = CurrentSeats.slice();
  for (let i = 0; i < NewArray.length; i++) {
    EnabledSeats.forEach(s => {
      if (NewArray[i].ID == s.ID) {
        NewArray[i].showedNumber = s.showedNumber;
      }
    });
  }

  return NewArray;
}
