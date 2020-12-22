import { listVal, objectVal } from "rxfire/database";
import { map, switchMap } from "rxjs/operators";

import type { DatasetBase } from "./datasetTypes";
import { Observable } from "rxjs";
import { firebase } from "./firebase";
import { getDatasetDetail } from "./datasetDetail";

export function createDataset<T extends DatasetBase>(
  datasetId: string,
  dataset: T[]
): Pick<Promise<any>, "then" | "catch"> {
  return firebase
    .database()
    .ref("/datasets")
    .child(datasetId)
    .push({
      ...dataset,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
}

export function updateDataset<T extends { datasetId: string; id: string }>(
  dataset: T
): Pick<Promise<any>, "then" | "catch"> {
  if (dataset.id && dataset.datasetId) {
    return firebase
      .database()
      .ref("/datasets")
      .child(dataset.datasetId)
      .child(dataset.id)
      .push({
        ...dataset,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });
  } else {
    throw "missing id";
  }
}

export function deleteDataset<T extends { datasetId: string; id: string }>(
  dataset: T
) {
  if (dataset.id && dataset.datasetId) {
    return firebase
      .database()
      .ref("/datasets")
      .child(dataset.datasetId)
      .child("items")
      .child(dataset.id)
      .remove();
  } else {
    throw "missing id";
  }
}

export function getDataset<T extends DatasetBase>(id: string) {
  return getDatasetDetail(id).pipe(
    switchMap((datasetDetail) => {
      return listVal<T>(
        firebase.database().ref("/datasets").child(id),
        "id"
      ).pipe(
        map((dataset) =>
          dataset.map((datasetItem) => ({ ...datasetItem, datasetDetail } as T))
        )
      );
    })
  );
}

export function getDatasetItem<T extends DatasetBase>(
  datasetId: string,
  itemId: string
) {
  return getDatasetDetail(datasetId).pipe(
    switchMap((datasetDetail) => {
      return objectVal<T>(
        firebase.database().ref("/datasets").child(datasetId).child(itemId),
        "id"
      ).pipe(map((datasetItem) => ({ ...datasetItem, datasetDetail } as T)));
    })
  );
}
