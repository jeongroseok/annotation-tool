import {
  AnnotationState,
  BoundingBoxAnnotation,
  DatasetDetail,
  ImageDatasetItem,
  createAnnotation,
  deleteAnnotation,
  deleteDatasetItem,
  findAnnotationsByAnnotator,
  getAnnotation,
  getDataset,
  listAnnotation,
  updateAnnotation,
} from "./services";
import React, { useEffect, useState } from "react";
import { listVal, objectVal } from "rxfire/database";

export default function Test() {
  const [items, setItems] = useState<ImageDatasetItem[]>();
  const [annotations, setAnnotations] = useState<BoundingBoxAnnotation[]>();
  const [selectedItem, setSelectedItem] = useState<ImageDatasetItem>();
  const [value, setValue] = useState<BoundingBoxAnnotation[]>();
  useEffect(() => {
    getDataset<ImageDatasetItem>("-MPd8MPujnn9fI6L-Imc").subscribe(setItems);
    findAnnotationsByAnnotator<BoundingBoxAnnotation>(
      "-MPd8MPujnn9fI6L-Imc",
      "-MPeSwtkTqu81zQb4KDe",
      "작업자"
    ).subscribe(setValue);
  }, []);
  useEffect(() => {
    if (!selectedItem) return;
    listAnnotation<BoundingBoxAnnotation>(
      selectedItem.datasetId,
      selectedItem.id
    ).subscribe(setAnnotations);
  }, [selectedItem]);
  const create = (datasetId: string, datasetItemId: string) =>
    ({
      id: "asdf",
      datasetId: datasetId,
      datasetItemId: datasetItemId,
      annotator: "작업자",
      state: AnnotationState.NotStarted,
      boundingBoxes: [{ x: 0, y: 0, width: 100, height: 100 }],
    } as BoundingBoxAnnotation);
  return (
    <div>
      <h4>items {selectedItem?.id}</h4>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.id} onClick={() => setSelectedItem(item)}>
              {item.id}
              <button
                onClick={() => {
                  createAnnotation<BoundingBoxAnnotation>(
                    create(item.datasetId, item.id)
                  );
                }}
              >
                new
              </button>
            </li>
          ))}
      </ul>
      <h4>annotations</h4>
      <ul>
        {annotations &&
          annotations.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                console.log(item);
                updateAnnotation({
                  ...item,
                  boundingBoxes: [{ ...item.boundingBoxes[0], x: 100 }],
                } as BoundingBoxAnnotation);
              }}
            >
              {item.annotator}
            </li>
          ))}
      </ul>
      <div>{value && JSON.stringify(value)}</div>
    </div>
  );
}
