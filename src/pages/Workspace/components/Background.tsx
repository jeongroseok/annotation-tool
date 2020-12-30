import { Image } from "react-konva";
import React from "react";
import useImage from "use-image";

export default function Background({ url }: { url?: string }) {
  const [image] = useImage(url ? url : "");
  return <Image image={image} />;
}
