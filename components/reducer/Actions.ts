type NumberAction = {
  type: "ChangeSeatHeight" | "ChangeSeatWidth" | "DeleteForceFrontListEntry";
  value: number;
};

type BooleanAction = {
  type: "ChangeForceFrontFunctionEnabled";
  value: boolean;
};

type StringAction = {
  type: "ChangeForceFrontRangeInput" | "ChangeForceFrontNumberInput";
  value: string;
};

type EditSeatAction = {
  type: "DeleteSeat";
  ID: number;
};

type EnterAction = {
  type: "AddToForceFrontList";
  isDispatchedByEnterKey: boolean;
};

type NoArgAction = {
  type: "RebuildSeatArray" | "Randomize";
};

export type Action =
  | NumberAction
  | BooleanAction
  | StringAction
  | EditSeatAction
  | EnterAction
  | NoArgAction;
