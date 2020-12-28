import { listVal, objectVal } from "rxfire/database";

import type { AnnotationBase } from "./annotationTypes";
import { Observable } from "rxjs";
import { firebase } from "./firebase";

export function createAnnotation<T extends AnnotationBase>({
  datasetId,
  datasetItemId,
  ...annotationData
}: Omit<T, "id" | "createdAt" | "updatedAt">): Pick<
  Promise<any>,
  "then" | "catch"
> {
  return firebase
    .database()
    .ref("/annotations")
    .child(datasetId)
    .child(datasetItemId)
    .push({
      datasetId,
      datasetItemId,
      ...annotationData,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
}

export function updateAnnotation<T extends AnnotationBase>(
  annotation: Partial<Omit<T, "id" | "datasetId" | "datasetItemId">> &
    Pick<T, "id" | "datasetId" | "datasetItemId">
) {
  const {
    datasetId,
    datasetItemId,
    id,
    createdAt,
    updatedAt,
    ...rest
  } = annotation;
  return firebase
    .database()
    .ref("/annotations")
    .child(datasetId)
    .child(datasetItemId)
    .child(id)
    .update({
      ...rest,
      updatedAt: firebase.database.ServerValue.TIMESTAMP,
    });
}

export function deleteAnnotation<T extends AnnotationBase>(annotation: T) {
  return firebase.database().ref("/annotations").child(annotation.id).remove();
}

export function getAnnotationById<T extends AnnotationBase>(id: string) {
  return objectVal<T>(firebase.database().ref("/annotations").child(id), "id");
}

export function findAnnotation<T extends AnnotationBase>(
  datasetId: string,
  datasetItemId: string,
  annotatorId: string
) {
  return objectVal<T>(
    firebase
      .database()
      .ref("/annotations")
      .orderByChild("datasetItemId")
      .equalTo(datasetItemId)
      .orderByChild("annotatorId")
      .equalTo(annotatorId)
      .orderByChild("datasetId")
      .equalTo(datasetId),
    "id"
  );
}

export function listAnnotation<T extends AnnotationBase>(
  datasetId: string,
  datasetItemId: string
) {
  return listVal<T>(
    firebase
      .database()
      .ref("/annotations")
      .orderByChild("datasetId")
      .equalTo(datasetId)
      .orderByChild("datasetItemId")
      .equalTo(datasetItemId),
    "id"
  );
}
