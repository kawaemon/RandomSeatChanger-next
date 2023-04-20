import { State } from "./States";
import { Action } from "./Actions";
import { GenSeatArray, Randomize, CheckInputError } from "./ReducerUtils";

export function Reducer(state: State, action: Action): State {
  console.log(action);

  let Result: State;

  switch (action.type) {
    case "ChangeSeatWidth":
      if (action.value == state.SeatWidth) return state;

      Result = {
        ...state,
        SeatWidth: action.value,
        SeatArray: GenSeatArray(action.value, state.SeatHeight)
      };
      break;

    case "ChangeSeatHeight":
      if (action.value == state.SeatHeight) return state;

      Result = {
        ...state,
        SeatHeight: action.value,
        SeatArray: GenSeatArray(state.SeatWidth, action.value)
      };
      break;

    case "RebuildSeatArray":
      Result = {
        ...state,
        SeatArray: GenSeatArray(state.SeatWidth, state.SeatHeight)
      };
      break;

    case "DeleteSeat":
      let n = 0;
      Result = {
        ...state,
        SeatArray: state.SeatArray.map(s => {
          let isEnabled = !(s.ID == action.ID) && s.isEnabled;
          s.isEnabled = isEnabled;
          s.showedNumber = isEnabled ? ++n : n;
          return s;
        })
      };
      break;

    case "ChangeForceFrontFunctionEnabled":
      {
        if (action.value) {
          const ForceFrontNumberInput = parseInt(state.ForceFrontNumberInput);
          const isForceFrontNumberInputError =
            CheckInputError(ForceFrontNumberInput, 1, state.SeatArray.length) ||
            state.ForceFrontList.includes(ForceFrontNumberInput);
          const isForceFrontRangeInputError = CheckInputError(
            parseInt(state.ForceFrontRangeInput),
            1,
            state.SeatHeight
          );

          Result = {
            ...state,
            isForceFrontFunctionEnabled: true,
            isAddToForceFrontListButtonEnabled: !isForceFrontNumberInputError,
            isForceFrontNumberInputError: isForceFrontNumberInputError,
            isForceFrontRangeInputError: isForceFrontRangeInputError
          };
        } else {
          Result = {
            ...state,
            isForceFrontFunctionEnabled: false,
            isAddToForceFrontListButtonEnabled: false,
            isForceFrontNumberInputError: false,
            isForceFrontRangeInputError: false,
            CanExecute: true
          };
        }
      }
      break;

    case "ChangeForceFrontRangeInput":
      {
        let Input = parseInt(action.value);
        const isInputError = CheckInputError(Input, 1, state.SeatHeight);
        if (isInputError) Input = state.ForceFrontRange;

        Result = {
          ...state,
          isForceFrontRangeInputError: isInputError,
          ForceFrontRangeInput: action.value,
          ForceFrontRange: Input
        };
      }
      break;

    case "ChangeForceFrontNumberInput":
      {
        let Input = parseInt(action.value);
        const isInputError =
          CheckInputError(Input, 1, state.SeatArray.length) ||
          state.ForceFrontList.includes(Input);

        Result = {
          ...state,
          isForceFrontNumberInputError: isInputError,
          isAddToForceFrontListButtonEnabled: !isInputError,
          ForceFrontNumberInput: action.value
        };
      }
      break;

    case "AddToForceFrontList":
      {
        if (state.isForceFrontNumberInputError) return state;
        const List = state.ForceFrontList.slice();
        List.push(parseInt(state.ForceFrontNumberInput));
        Result = {
          ...state,
          ForceFrontList: List.sort((a, b) => a - b),
          isAddToForceFrontListButtonEnabled: false,
          isForceFrontNumberInputError: true,
          ForceFrontNumberInput: action.isDispatchedByEnterKey
            ? ""
            : state.ForceFrontNumberInput
        };
      }
      break;

    case "DeleteForceFrontListEntry":
      {
        Result = {
          ...state,
          ForceFrontList: state.ForceFrontList.filter(
            (_, i) => i !== action.value
          )
        };
      }
      break;

    case "Randomize":
      Result = {
        ...state,
        SeatArray: Randomize(
          state.SeatArray,
          state.SeatWidth,
          state.isForceFrontFunctionEnabled,
          state.ForceFrontList,
          state.ForceFrontRange
        )
      };
      break;
  }

  if (Result.isForceFrontFunctionEnabled) {
    const ListLength = Object.keys(Result.ForceFrontList).length;
    const Limit =
      Result.SeatWidth * Result.ForceFrontRange -
      Result.SeatArray.filter(s => !s.isEnabled).length;

    console.log(`LimitLength: ${ListLength}  Limit: ${Limit}`);

    if (ListLength >= Limit) {
      Result.isAddToForceFrontListButtonEnabled = false;
      Result.AddToForceFrontListText = "数が多すぎます";
      Result.CanExecute = !(ListLength > Limit);
    } else {
      Result.isAddToForceFrontListButtonEnabled = true;
      Result.AddToForceFrontListText = "リストに追加";
      Result.CanExecute = true;
    }

    if (Result.isForceFrontRangeInputError) Result.CanExecute = false;
    if (Result.isForceFrontNumberInputError)
      Result.isAddToForceFrontListButtonEnabled = false;
  }

  return Result;
}
