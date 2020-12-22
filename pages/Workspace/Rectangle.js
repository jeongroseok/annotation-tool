import { Rect, Transformer } from "react-konva";

import React from "react";

export default function Rectangle({
  x,
  y,
  width,
  height,
  color,
  selected,
  onSelect,
  onChange,
}) {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

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
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`#${color}32`}
        draggable
        onDragEnd={(e) => {
          onChange({
            width,
            height,
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
          onChange({
            width,
            height,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
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
