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
  annotator: string;
  state: AnnotationState;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  category: string | null;
}

export interface BoundingBoxAnnotation extends AnnotationBase {
  boundingBoxes: BoundingBox[];
}
