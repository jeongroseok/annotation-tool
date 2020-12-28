export enum AnnotationState {
  NotStarted,
  InProgress,
  Pending, // or pending review
  Rejected,
  Approved,
}

export interface AnnotationBase {
  id: string;
  datasetId: string;
  datasetItemId: string;
  createdAt: number;
  updatedAt: number;
  annotator: number;
  state: AnnotationState;
}

export interface BoundingBoxAnnotation extends AnnotationBase {
  boundingBoxes: { x: number; y: number; width: number; height: number };
}
