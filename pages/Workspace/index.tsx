import { Button, Container } from "react-bootstrap";
import { Image, Layer, Stage } from "react-konva";
import { PropertyBar, Toolbar } from "./components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import Rectangle from "./Rectangle";
import cc from "color-convert";
import { firebase } from "../../services/firebase";
import produce from "immer";
import { useDatasetItem } from "./hooks";
import { useElementSize } from "../../common/hooks";
import useImage from "use-image";

export interface MatchParams {
  datasetId: string;
  itemId: string;
}

export default function Workspace() {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>();
  const rootRef = useRef<Element>();
  const size = useElementSize(rootRef);
  const [datasetItem] = useDatasetItem(
    match.params.datasetId,
    match.params.itemId
  );
  const [image] = useImage(datasetItem?.url);
  const [rectangles, setRectangles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [rectangle, setRectangle] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const ref = firebase
      .database()
      .ref("datasets")
      .child(match.params.datasetId);
    ref.on("value", (s) => {
      setCategories(s.child("categories").val());
    });
    return () => {
      ref.off("value");
    };
  }, [match.params.datasetId]);

  useEffect(() => {
    if (!datasetItem) return;
    if (!datasetItem.annotations) return;
    console.log(datasetItem.annotations);
    setRectangles(
      datasetItem.annotations.map((a) => ({
        ...a,
        color: cc.hsv.hex(Math.random() * 360, 80, 100),
      }))
    );
  }, [datasetItem]);

  const handleChange = useCallback(
    (i, shape) => {
      setRectangles(
        produce(rectangles, (draft) => {
          draft[i] = { ...draft[i], ...shape };
        })
      );
    },
    [rectangles]
  );

  const handleMouseDown = useCallback((e) => {
    if (e.target.className !== "Image") return;
    const [x, y] = [Math.round(e.evt.offsetX), Math.round(e.evt.offsetY)];
    setRectangle({
      x,
      y,
      width: 0,
      height: 0,
      color: cc.hsv.hex(Math.random() * 360, 80, 100),
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
      setRectangles(
        produce(rectangles, (draft) => {
          draft.push(rectangle);
          setRectangle(null);
        })
      );
      setSelectedId(rectangles.length);
    },
    [rectangle]
  );

  const onItemSave = useCallback(() => {
    firebase
      .database()
      .ref("datasets")
      .child(match.params.datasetId)
      .child("items")
      .child(match.params.itemId)
      .child("annotations")
      .set(rectangles);
    console.log(rectangles);
  }, [selectedId, rectangles]);

  const onAnnotationSet = useCallback(
    (c) => {
      setRectangles(
        produce(rectangles, (draft) => {
          draft[selectedId].category = c;
        })
      );
    },
    [selectedId, rectangles]
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
      <Toolbar />
      <div style={{ flex: 1 }} ref={rootRef}>
        <Stage width={size.width} height={size.height}>
          <Layer
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Image image={image} />
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  {...rect}
                  selected={i === selectedId}
                  onSelect={() => setSelectedId(i)}
                  onChange={(shape) => {
                    handleChange(i, shape);
                  }}
                />
              );
            })}
            {rectangle && <Rectangle {...rectangle} selected={false} />}
          </Layer>
        </Stage>
      </div>
      <PropertyBar>
        <Container>
          <p>x: {rectangles[selectedId]?.x}</p>
          <p>y: {rectangles[selectedId]?.y}</p>
          <p>width: {rectangles[selectedId]?.width}</p>
          <p>height: {rectangles[selectedId]?.height}</p>
          <p>
            <select
              value={rectangles[selectedId]?.category}
              onChange={(e) => onAnnotationSet(e.target.value)}
            >
              {categories.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </p>
          <p>
            <Button onClick={onItemSave}>Save</Button>
          </p>
          <p>
            <Button
              onClick={() =>
                history.push(
                  `/workspace/${match.params.datasetId}/${
                    Number(match.params.itemId) - 1
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
                  `/workspace/${match.params.datasetId}/${
                    Number(match.params.itemId) + 1
                  }`
                )
              }
            >
              Next item
            </Button>
          </p>
        </Container>
      </PropertyBar>
    </div>
  );
}
