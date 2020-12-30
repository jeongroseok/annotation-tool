import { list, listVal, objectVal } from "rxfire/database";

import type { DatasetItemBase } from "./datasetItemTypes";
import { firebase } from "./firebase";
import { map } from "rxjs/operators";

export function createDataset<T extends DatasetItemBase>(
  datasetId: string,
  datasetItems: Omit<T, "id" | "datasetId" | "createdAt" | "updatedAt">[]
): Pick<Promise<any>, "then" | "catch"> {
  const ref = firebase.database().ref("/datasets").child(datasetId);
  const dataset: any = {};

  datasetItems.forEach((item) => {
    const id = ref.push().key;
    if (!id) throw new Error("key generation error");
    const datasetItem: any = {
      ...item,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    };
    delete datasetItem.id;
    dataset[id] = datasetItem;
  });

  return ref.set(dataset);
}

export function createDatasetItem<T extends DatasetItemBase>(
  datasetId: string,
  datasetItem: Omit<T, "id" | "datasetId" | "createdAt" | "updatedAt">
): Pick<Promise<any>, "then" | "catch"> {
  return firebase
    .database()
    .ref("/datasets")
    .child(datasetId)
    .push({
      ...datasetItem,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
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

export function getAllDatasetItemIds(datasetId: string) {
  return list(firebase.database().ref("/datasets").child(datasetId)).pipe(
    map((values) => values.map((value) => value.snapshot.key as string))
  );
}

export function getDatasetItem<T extends DatasetItemBase>(
  datasetId: string,
  datasetItemId: string
) {
  return objectVal<T>(
    firebase.database().ref("/datasets").child(datasetId).child(datasetItemId),
    "id"
  ).pipe(map((value) => ({ ...value, datasetId } as T)));
}
