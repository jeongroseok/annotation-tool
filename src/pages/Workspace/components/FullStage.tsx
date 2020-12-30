import React, { useRef } from "react";

import { Stage } from "react-konva";
import { useElementSize } from "../../../common/hooks";

export default function FullStage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(rootRef);
  return (
    <div style={{ flex: 1 }} ref={rootRef}>
      <Stage width={size.width} height={size.height}>
        {children}
      </Stage>
    </div>
  );
}
