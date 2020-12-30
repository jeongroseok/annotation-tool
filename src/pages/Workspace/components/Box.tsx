import { Rect, Transformer } from "react-konva";

import React from "react";

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BoxProps {
  rectangle: Rectangle;
  color: string;
  selected: boolean;
  onSelect?: () => void;
  onChange?: (value: Rectangle) => void;
}

export default function Box({
  rectangle,
  color,
  selected,
  onSelect,
  onChange,
}: BoxProps) {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  React.useEffect(() => {
    trRef.current.nodes([shapeRef.current]);
    trRef.current.getLayer().batchDraw();
  }, []);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        x={rectangle.x}
        y={rectangle.y}
        width={rectangle.width}
        height={rectangle.height}
        fill={`#${color}32`}
        draggable
        onDragEnd={(e) => {
          onChange &&
            onChange({
              width: rectangle.width,
              height: rectangle.height,
              x: e.target.x(),
              y: e.target.y(),
            });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          if (onChange) {
            onChange({
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }
        }}
      />
      <Transformer
        ref={trRef}
        anchorSize={9}
        anchorFill={`#${color}64`}
        anchorStroke={`#${color}C8`}
        borderStroke={`#${color}C8`}
        borderDash={[6, 4]}
        borderStrokeWidth={2}
        rotateEnabled={false}
        resizeEnabled={selected}
        borderEnabled={true}
        keepRatio={false}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </React.Fragment>
  );
}
