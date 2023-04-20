import * as Styles from "./Styles";
import { Paper } from "@material-ui/core";
import * as React from "react";

export type SeatPanelProperty = {
  isEnabled: boolean;
  showedNumber: number;
  ID: number;
  onClick: (ID: number) => void;
};

export function SeatPanel(Property: SeatPanelProperty) {
  const Style = Styles.SeatPanelStyleGenerator().style;
  return (
    <Paper
      className={Style}
      style={{ opacity: Property.isEnabled ? 1 : 0 }}
      onClick={e => Property.onClick(Property.ID)}
    >
      <div>{Property.showedNumber}</div>
    </Paper>
  );
}
