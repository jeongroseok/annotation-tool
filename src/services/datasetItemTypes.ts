import type { DatasetDetail } from "./datasetDetail";

export interface DatasetItemBase {
  id: string;
  datasetDetail: DatasetDetail;
}

export interface ImageItemDataset extends DatasetItemBase {
  url: string;
  width: number;
  height: number;
}

export interface VideoItemDataset extends DatasetItemBase {}
export interface TextItemDataset extends DatasetItemBase {}
