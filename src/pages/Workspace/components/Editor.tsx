import { Background, PropertyBar, Toolbar } from ".";
import Box, { Rectangle } from "./Box";
import { Button, Container } from "react-bootstrap";
import { Image, Layer, Stage } from "react-konva";
import React, { useCallback, useRef, useState } from "react";

import type { BoundingBox } from "../../../services";
import cc from "color-convert";
import produce from "immer";
import { useElementSize } from "../../../common/hooks";

interface EditorProps {
  backgoundImage: string;
  boundingBoxes: BoundingBox[];
  categories: string[];
  onBoundingBoxesChange?: (boundingBoxes: BoundingBox[]) => void;
  onBoundingBoxesSelected?: (boundingBox: BoundingBox) => void;
}

export default function Editor({
  backgoundImage,
  boundingBoxes,
  categories,
  onBoundingBoxesChange,
  onBoundingBoxesSelected,
}: EditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(rootRef);
  const [rectangle, setRectangle] = useState<Rectangle | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMouseDown = useCallback((e) => {
    if (e.target.className !== "Image") return;
    const [x, y] = [Math.round(e.evt.offsetX), Math.round(e.evt.offsetY)];
    setRectangle({
      x,
      y,
      width: 0,
      height: 0,
    });
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!rectangle) return;
      const [x, y] = [Math.round(e.evt.offsetX), Math.round(e.evt.offsetY)];
      setRectangle({
        ...rectangle,
        width: x - rectangle.x,
        height: y - rectangle.y,
      });
    },
    [rectangle]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!rectangle) return;
      if (rectangle.width <= 1 || rectangle.height <= 1) {
        setRectangle(null);
        return;
      }
      onBoundingBoxesChange?.(
        produce(boundingBoxes, (draft) => {
          draft.push({ ...rectangle, category: categories[0] });
        })
      );
      setRectangle(null);
      //   setRectangles(
      //     produce(boundingBoxes, (draft) => {
      //       draft.push(rectangle);
      //       setRectangle(null);
      //     })
      //   );
      //   setSelectedId(boundingBoxes.length);
    },
    [rectangle]
  );

  const handleChange = useCallback(
    (i, rectangle) => {
      onBoundingBoxesChange?.(
        produce(boundingBoxes, (draft) => {
          draft[i] = { ...draft[i], ...rectangle };
        })
      );
    },
    [boundingBoxes]
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#171719",
      }}
    >
      <Toolbar onSelect={(text) => {}} />
      <div style={{ flex: 1 }} ref={rootRef}>
        <Stage width={size.width} height={size.height}>
          <Layer
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Background url={backgoundImage} />
            {boundingBoxes.map((rectangle, i) => {
              return (
                <Box
                  key={i}
                  rectangle={rectangle}
                  color={cc.hsv.hex([0, 0, 100])}
                  selected={i === selectedId}
                  onSelect={() => {
                    setSelectedId(i);
                    onBoundingBoxesSelected?.(boundingBoxes[i]);
                  }}
                  onChange={(shape) => {
                    handleChange(i, shape);
                  }}
                />
              );
            })}
            {rectangle && (
              <Box
                rectangle={rectangle}
                color={cc.hsv.hex([0, 0, 100])}
                selected={false}
              />
            )}
          </Layer>
        </Stage>
      </div>

      <PropertyBar>
        {selectedId !== null && (
          <Container style={{ color: "white" }}>
            <p>x: {boundingBoxes[selectedId].x}</p>
            <p>y: {boundingBoxes[selectedId].y}</p>
            <p>width: {boundingBoxes[selectedId].width}</p>
            <p>height: {boundingBoxes[selectedId].height}</p>
            <p>
              <select
                value={boundingBoxes[selectedId].category || ""}
                onChange={({ target }) => {
                  onBoundingBoxesChange?.(
                    produce(boundingBoxes, (draft) => {
                      draft[selectedId].category = target.value;
                    })
                  );
                }}
              >
                {categories.map((x) => (
                  <option value={x}>{x}</option>
                ))}
              </select>
            </p>
            <p>
              <Button
                variant="danger"
                onClick={() => {
                  onBoundingBoxesChange?.(
                    produce(boundingBoxes, (draft) => {
                      const id = selectedId;
                      setSelectedId(null);
                      draft.splice(id, 1);
                    })
                  );
                }}
              >
                Delete bbox
              </Button>
            </p>
            {/* <p>
              <Button
                onClick={() =>
                  history.push(
                    `/workspace/${params.datasetId}/${
                      Number(params.datasetItemId) - 1
                    }`
                  )
                }
              >
                Prev item
              </Button>
            </p>
            <p>
              <Button
                onClick={() =>
                  history.push(
                    `/workspace/${params.datasetId}/${
                      Number(params.datasetItemId) + 1
                    }`
                  )
                }
              >
                Next item
              </Button>
            </p> */}
          </Container>
        )}
      </PropertyBar>
    </div>
  );
}
