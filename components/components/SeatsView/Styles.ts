"use strict";

import { makeStyles } from "@material-ui/core/styles";

// 参照
// https://imgur.com/a/9RSolAE

export const SeatPanelStyleGenerator = makeStyles({
  style: {
    width: "5vw",
    height: "5vh",
    fontSize: "2.5vmin",
    textAlign: "center",
    marginBottom: "0.4vh",
    marginTop: "0.4vh",
    marginLeft: "0.4vw",
    marginRight: "0.4vw",
    border: "1px solid #4153AF",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0 0 1px #4153AF"
  }
});

export const TeacherDeskContainer = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
});

export const TeacherDesk = makeStyles({
  root: {
    width: "10vw",
    height: "5vh",
    fontSize: "2.5vmin",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    border: "1px solid #bbb",
    color: "#888"
  }
});

export const SeatsView = makeStyles({
  horizontalContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  verticalContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    transform: "translateY(3vh)"
  }
});
