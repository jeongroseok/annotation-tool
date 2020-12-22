import { listVal, objectVal } from "rxfire/database";

import { Observable } from "rxjs";
import { firebase } from "./firebase";

export function createDatasetDetail(
  datasetDetail: DatasetDetail
): Pick<Promise<any>, "then" | "catch"> {
  return firebase
    .database()
    .ref("/datasetDetails")
    .push({
      ...datasetDetail,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
}

export function updateDatasetDetail(datasetDetail: DatasetDetail) {
  if (datasetDetail.id) {
    return firebase
      .database()
      .ref("/datasetDetails")
      .child(datasetDetail.id)
      .update({
        ...datasetDetail,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });
  } else {
    throw "missing id";
  }
}

export function deleteDatasetDetail(datasetDetail: DatasetDetail) {
  if (datasetDetail.id) {
    return firebase
      .database()
      .ref("/datasetDetails")
      .child(datasetDetail.id)
      .remove();
  } else {
    throw "missing id";
  }
}

export function getDatasetDetail(id: string) {
  return objectVal<DatasetDetail>(
    firebase.database().ref("/datasetDetails").child(id),
    "id"
  );
}

export function listDatasetDetail() {
  return listVal<DatasetDetail>(
    firebase.database().ref("/datasetDetails"),
    "id"
  );
}

export interface DatasetDetail {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  categories?: string[];
}
