import * as React from "react";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import { vw, vh } from "../../utils/SizeCalcurator";
import * as Styles from "./Styles";
import { State as GlobalState } from "../../reducer/States";
import { Action as GlobalAction } from "../../reducer/Actions";

export type SettingsProps = {
  Dispatch: (g: GlobalAction) => void;
  State: GlobalState;
};

export function Settings(Property: SettingsProps) {
  const styles = Styles.Styles();

  return (
    <>
      <h2>設定</h2>
      <h3>席数の指定</h3>
      <div className={styles.VerticalContainer}>
        <div className={styles.HorizontalContainer}>
          <div className={styles.sliderText}>縦に並ぶ数</div>
          <div>
            <Slider
              style={Styles.sliderStyle}
              marks
              step={1}
              min={1}
              max={12}
              value={Property.State.SeatHeight}
              onChange={(_, n) =>
                Property.Dispatch({
                  type: "ChangeSeatHeight",
                  value: n as number,
                })
              }
            />
          </div>
          <div>{Property.State.SeatHeight}</div>
        </div>

        <div className={styles.HorizontalContainer}>
          <div className={styles.sliderText}>横に並ぶ数</div>
          <div>
            <Slider
              style={Styles.sliderStyle}
              marks
              step={1}
              min={1}
              max={13}
              value={Property.State.SeatWidth}
              onChange={(_, n) =>
                Property.Dispatch({
                  type: "ChangeSeatWidth",
                  value: n as number,
                })
              }
            />
          </div>
          <div>{Property.State.SeatWidth}</div>
        </div>
      </div>
      <div className={styles.tipText}>
        削除したい席を、左の席イメージ上でクリックすると消去できます。
      </div>
      <div className={styles.buttonContainer}>
        <Button
          color="primary"
          className={styles.restoreButton}
          onClick={() => Property.Dispatch({ type: "RebuildSeatArray" })}
        >
          削除した席を復元
        </Button>
      </div>
      <div>
        <h3>
          <Checkbox
            color="primary"
            checked={Property.State.isForceFrontFunctionEnabled}
            onChange={(e) =>
              Property.Dispatch({
                type: "ChangeForceFrontFunctionEnabled",
                value: e.target.checked,
              })
            }
          />
          強制的に前列に来る人の設定
        </h3>
      </div>
      <div className={styles.frontRow}>
        前から
        <Input
          placeholder=""
          className={styles.rangeInput}
          color="primary"
          error={Property.State.isForceFrontRangeInputError}
          value={Property.State.ForceFrontRangeInput}
          disabled={!Property.State.isForceFrontFunctionEnabled}
          type="number"
          onChange={(e) =>
            Property.Dispatch({
              type: "ChangeForceFrontRangeInput",
              value: e.target.value,
            })
          }
        />
        列目以内に
        <Paper className={`${styles.forceFrontListPaper} ${styles.fixedSize}`}>
          <FixedSizeGrid
            columnCount={2}
            rowCount={Object.keys(Property.State.ForceFrontList).length / 2 + 1}
            width={vw(40)}
            height={vh(30)}
            columnWidth={vw(20)}
            rowHeight={vh(8)}
          >
            {ForceFrontListEntryProvider(
              Property.State.ForceFrontList,
              styles.listEntry,
              !Property.State.isForceFrontFunctionEnabled,
              (n: number) => {
                Property.Dispatch({
                  type: "DeleteForceFrontListEntry",
                  value: n,
                });
              }
            )}
          </FixedSizeGrid>
        </Paper>
        <div className={styles.addList_div}>
          <span className={styles.addList}>
            出席番号
            <Input
              placeholder=""
              className={styles.forceFrontInput}
              disabled={!Property.State.isForceFrontFunctionEnabled}
              error={Property.State.isForceFrontNumberInputError}
              value={Property.State.ForceFrontNumberInput}
              type="number"
              onChange={(e) => {
                Property.Dispatch({
                  type: "ChangeForceFrontNumberInput",
                  value: e.target.value,
                });
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  Property.Dispatch({
                    type: "AddToForceFrontList",
                    isDispatchedByEnterKey: true,
                  });
                }
              }}
            />
            番
          </span>
          <Button
            disabled={!Property.State.isAddToForceFrontListButtonEnabled}
            color="primary"
            variant="contained"
            onClick={(e) => {
              Property.Dispatch({
                type: "AddToForceFrontList",
                isDispatchedByEnterKey: false,
              });
            }}
          >
            {Property.State.AddToForceFrontListText}
          </Button>
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        disabled={!Property.State.CanExecute}
        className={styles.executeButton}
        onClick={(e) => {
          Property.Dispatch({ type: "Randomize" });
        }}
      >
        実行!
      </Button>
    </>
  );
}

//前列に来る人リストの一つ一つの要素を返す関数を返す関数
function ForceFrontListEntryProvider(
  CurrentList: number[],
  ClassName: string,
  isDisabled: boolean,
  deleteHandler: (n: number) => void
): (props: GridChildComponentProps) => JSX.Element {
  return (props: GridChildComponentProps) => {
    const [isHovered, setHovered] = useState(false);
    const arrayIndex = props.rowIndex * 2 + props.columnIndex;
    if (Object.keys(CurrentList).length > arrayIndex) {
      return (
        <ListItem
          button
          style={props.style}
          className={ClassName}
          onClick={(e) => deleteHandler(arrayIndex)}
          onMouseEnter={(e) => setHovered(true)}
          onMouseLeave={(e) => setHovered(false)}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                textDecoration: isDisabled ? "line-through" : "",
                textDecorationColor: "red",
              }}
            >{`${CurrentList[arrayIndex]}番`}</div>
            <small style={{ margin: "0 2vw 0 0 " }}>
              <DeleteIcon color={isHovered ? "secondary" : "disabled"} />
            </small>
          </div>
        </ListItem>
      );
    } else {
      return <div />;
    }
  };
}
