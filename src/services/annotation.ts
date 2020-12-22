import { listVal, objectVal } from "rxfire/database";

import type { AnnotationBase } from "./annotationTypes";
import { Observable } from "rxjs";
import { firebase } from "./firebase";

export function createAnnotation<T extends AnnotationBase>(
  annotation: T
): Pick<Promise<any>, "then" | "catch"> {
  if (annotation.datasetId && annotation.datasetItemId) {
    return firebase
      .database()
      .ref("/annotations")
      .push({
        ...annotation,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });
  } else {
    throw "missing id";
  }
}

export function updateAnnotation<T extends AnnotationBase>(annotation: T) {
  if (annotation.id) {
    return firebase
      .database()
      .ref("/annotations")
      .child(annotation.id)
      .update({
        ...annotation,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
      });
  } else {
    throw "missing id";
  }
}

export function deleteAnnotation<T extends AnnotationBase>(annotation: T) {
  if (annotation.id) {
    return firebase
      .database()
      .ref("/annotations")
      .child(annotation.id)
      .remove();
  } else {
    throw "missing id";
  }
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
