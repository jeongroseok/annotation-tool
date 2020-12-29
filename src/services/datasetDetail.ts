import { listVal, objectVal } from "rxfire/database";

import { firebase } from "./firebase";

export interface DatasetDetail {
  readonly id: string;
  name: string;
  description: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  categories: string[];
}

export function createDatasetDetail(
  datasetDetail: Pick<DatasetDetail, "name" | "description" | "categories">
): Pick<Promise<any>, "then" | "catch"> {
  const { name, description, categories } = datasetDetail;
  return firebase.database().ref("/datasetDetails").push({
    name,
    description,
    categories,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  });
}

export function updateDatasetDetail({
  id,
  name,
  description,
  categories,
}: Partial<Omit<DatasetDetail, "id">> & Pick<DatasetDetail, "id">) {
  return firebase.database().ref("/datasetDetails").child(id).update({
    name,
    description,
    categories,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  });
}

export function deleteDatasetDetail({ id }: Pick<DatasetDetail, "id">) {
  return firebase.database().ref("/datasetDetails").child(id).remove();
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
