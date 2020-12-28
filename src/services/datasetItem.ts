import { listVal, objectVal } from "rxfire/database";
import { map, switchMap } from "rxjs/operators";

import type { DatasetItemBase } from "./datasetItemTypes";
import { firebase } from "./firebase";

export function createDataset<T extends DatasetItemBase>(
  datasetId: string,
  datasetItems: Omit<T, "id" | "datasetId" | "createdAt" | "updatedAt">[]
): Pick<Promise<any>, "then" | "catch"> {
  const ref = firebase.database().ref("/datasets").child(datasetId);
  const dataset: any = {};
  datasetItems.forEach((item) => {
    const id = ref.push().key;
    if (!id) throw "key generation error";
    const datasetItem: any = {
      ...item,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    };
    delete datasetItem.id;
    dataset[id] = datasetItem;
  });
  return ref.update(dataset);
}

export function updateDatasetItem<T extends DatasetItemBase>(
  datasetItem: T
): Pick<Promise<any>, "then" | "catch"> {
  const { datasetId, id, createdAt, ...rest } = datasetItem;
  return firebase
    .database()
    .ref("/datasets")
    .child(datasetId)
    .child(id)
    .update({
      ...rest,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
}

export function deleteDatasetItem<T extends DatasetItemBase>(datasetItem: T) {
  return firebase
    .database()
    .ref("/datasets")
    .child(datasetItem.datasetId)
    .child(datasetItem.id)
    .remove();
}

export function getDataset<T extends DatasetItemBase>(datasetId: string) {
  return listVal<T>(
    firebase.database().ref("/datasets").child(datasetId),
    "id"
  ).pipe(
    map((values) =>
      values.map((value) => {
        return { ...value, datasetId } as T;
      })
    )
  );
}

export function getDatasetItem<T extends DatasetItemBase>(
  datasetId: string,
  itemId: string
) {
  return objectVal<T>(
    firebase.database().ref("/datasets").child(datasetId).child(itemId),
    "id"
  ).pipe(map((value) => ({ ...value, datasetId })));
}
