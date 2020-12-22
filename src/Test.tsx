import {
  DatasetBase,
  DatasetDetail,
  ImageDataset,
  getDatasetItem,
} from "./services";
import React, { useEffect, useState } from "react";

export default function Test() {
  const [val, setVal] = useState<ImageDataset>();
  useEffect(() => {
    getDatasetItem<ImageDataset>("-MJRe27mU0AMT8vn387r", "0").subscribe(setVal);
  }, []);
  useEffect(() => {
    console.log(val);
  }, [val]);
  return <div>test</div>;
}
