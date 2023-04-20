export type Seat = {
  isEnabled: boolean;
  ID: number;
  showedNumber: number;
};

export type State = {
  SeatWidth: number;
  SeatHeight: number;
  SeatArray: Seat[];

  isForceFrontFunctionEnabled: boolean;

  ForceFrontList: number[];
  ForceFrontRange: number;

  ForceFrontNumberInput: string;
  isForceFrontNumberInputError: boolean;

  ForceFrontRangeInput: string;
  isForceFrontRangeInputError: boolean;

  AddToForceFrontListText: string;
  isAddToForceFrontListButtonEnabled: boolean;

  CanExecute: boolean;
};

export const InitialState: State = {
  SeatWidth: 5,
  SeatHeight: 5,
  SeatArray: [...Array(25).keys()].map(i => {
    return { isEnabled: true, ID: i, showedNumber: i + 1 };
  }),

  isForceFrontFunctionEnabled: true,

  ForceFrontList: [],
  ForceFrontRange: 2,

  ForceFrontNumberInput: "1",
  isForceFrontNumberInputError: false,

  ForceFrontRangeInput: "2",
  isForceFrontRangeInputError: false,

  AddToForceFrontListText: "リストに追加",
  isAddToForceFrontListButtonEnabled: true,

  CanExecute: true
};
