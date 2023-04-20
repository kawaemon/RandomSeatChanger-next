import * as React from "react";
import * as Styles from "./Styles";
import { Paper } from "@material-ui/core";
import { SeatPanel } from "./SeatPanel";
import { State } from "../../reducer/States";
import { Action } from "../../reducer/Actions";

export type SeatsViewProperty = {
  State: State;
  Dispatch: (a: Action) => void;
};

function GenSeatPanelElement(Property: SeatsViewProperty, ID: number) {
  return (
    <SeatPanel
      key={ID}
      ID={ID}
      isEnabled={Property.State.SeatArray[ID].isEnabled}
      onClick={n => Property.Dispatch({ type: "DeleteSeat", ID: n })}
      showedNumber={Property.State.SeatArray[ID].showedNumber}
    />
  );
}

// 構造はだいたいこんな感じ
// https://imgur.com/a/9RSolAE

export function SeatsView(Property: SeatsViewProperty) {
  const TeacherDeskStyle = Styles.TeacherDesk().root;
  const TeacherDeskContainerStyle = Styles.TeacherDeskContainer().root;
  const GridStyle = Styles.SeatsView();

  return (
    <div>
      <h2>席イメージ</h2>
      <div className={TeacherDeskContainerStyle}>
        <Paper className={TeacherDeskStyle}>教卓</Paper>
      </div>

      <div className={GridStyle.verticalContainer}>
        {[...Array(Property.State.SeatHeight).keys()].map(n => {
          return (
            <div className={GridStyle.horizontalContainer} key={n}>
              {[...Array(Property.State.SeatWidth).keys()].map(p =>
                GenSeatPanelElement(Property, n * Property.State.SeatWidth + p)
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
