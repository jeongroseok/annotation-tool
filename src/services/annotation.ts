import { listVal, objectVal } from "rxfire/database";
import { map, switchMap } from "rxjs/operators";

import type { AnnotationBase } from "./annotationTypes";
import { Observable } from "rxjs";
import { firebase } from "./firebase";

export function createAnnotation<T extends AnnotationBase>(
  annotation: Omit<T, "id" | "createdAt" | "updatedAt">
): Pick<Promise<any>, "then" | "catch"> {
  const { datasetId, datasetItemId, ...rest } = annotation;
  return firebase
    .database()
    .ref("/annotations")
    .child(datasetId)
    .child(datasetItemId)
    .push({
      ...rest,
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

export function deleteAnnotation<T extends AnnotationBase>(
  annotation: Pick<T, "id" | "datasetId" | "datasetItemId">
) {
  return firebase
    .database()
    .ref("/annotations")
    .child(annotation.datasetId)
    .child(annotation.datasetItemId)
    .child(annotation.id)
    .remove();
}

export function getAnnotation<T extends AnnotationBase>(
  datasetId: string,
  datasetItemId: string,
  annotationId: string
) {
  return objectVal<T>(
    firebase
      .database()
      .ref("/annotations")
      .child(datasetId)
      .child(datasetItemId)
      .child(annotationId),
    "id"
  ).pipe(map((value) => ({ ...value, datasetId, datasetItemId })));
}

export function findAnnotationsByAnnotator<T extends AnnotationBase>(
  datasetId: string,
  datasetItemId: string,
  annotator: string
) {
  return listVal<T>(
    firebase
      .database()
      .ref("/annotations")
      .child(datasetId)
      .child(datasetItemId)
      .orderByChild("annotator")
      .equalTo(annotator),
    "id"
  ).pipe(
    map((values) =>
      values.map((value) => ({ ...value, datasetId, datasetItemId }))
    )
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
      .child(datasetId)
      .child(datasetItemId),
    "id"
  ).pipe(
    map((values) =>
      values.map((value) => ({ ...value, datasetId, datasetItemId }))
    )
  );
}
