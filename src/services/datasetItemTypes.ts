export interface DatasetItemBase {
  datasetId: string;
  id: string;
  createdAt: number;
  updatedAt: number;
}

export interface ImageDatasetItem extends DatasetItemBase {
  url: string;
  width: number;
  height: number;
}

export interface VideoDatasetItem extends DatasetItemBase {}
export interface TextDatasetItem extends DatasetItemBase {}
