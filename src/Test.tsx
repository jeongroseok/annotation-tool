import {
  DatasetDetail,
  ImageDatasetItem,
  deleteDatasetItem,
  getDataset,
  getDatasetItem,
  listDatasetDetail,
} from "./services";
import React, { useEffect, useState } from "react";
import { listVal, objectVal } from "rxfire/database";

export default function Test() {
  const [list, setList] = useState<ImageDatasetItem[]>();
  const [value, setValue] = useState<ImageDatasetItem>();
  useEffect(() => {
    getDataset<ImageDatasetItem>("-MPd8MPujnn9fI6L-Imc").subscribe(setList);
    getDatasetItem<ImageDatasetItem>(
      "-MPd8MPujnn9fI6L-Imc",
      "-MPeSwtkTqu81zQb4KDe"
    ).subscribe(setValue);
    // (async () => {
    //   const newDatasetDetail: Pick<
    //     DatasetDetail,
    //     "name" | "description" | "categories"
    //   > = {
    //     name: "더미 데이터셋",
    //     description: "더미 데이터셋 입니다.",
    //     categories: ["사람", "기타"],
    //   };
    //   await createDatasetDetail(newDatasetDetail);
    // })();
  }, []);
  const o: Pick<ImageDatasetItem, "url" | "width" | "height"> = {
    url: "test url",
    width: 123,
    height: 123,
  };
  return (
    <div>
      <ul>
        {list &&
          list.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                console.log(item);
                deleteDatasetItem(item);
              }}
            >
              {item.id}
            </li>
          ))}
      </ul>
      <div>{value && JSON.stringify(value)}</div>
    </div>
  );
}
