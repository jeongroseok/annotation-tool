import type {
  BoundingBoxAnnotation,
  DatasetDetail,
  ImageDatasetItem,
} from "../../../services";
import {
  getAllDatasetItemIds,
  getAnnotation,
  getDatasetDetail,
  getDatasetItem,
} from "../../../services";
import { useEffect, useState } from "react";

import { useLoadingValue } from "../../../common/hooks";

export function useDatasetItem(datasetId: string, datasetItemId?: string) {
  const [datasetDetail, setDatasetDetail] = useState<DatasetDetail>();
  const [datasetItem, setDatasetItem] = useState<ImageDatasetItem>();

  useEffect(() => {
    if (datasetItemId) {
      getDatasetItem<ImageDatasetItem>(datasetId, datasetItemId).subscribe(
        setDatasetItem
      );
    } else {
      getAllDatasetItemIds(datasetId).subscribe((ids) => {
        if (!ids) return;
        getDatasetItem<ImageDatasetItem>(datasetId, ids[0]).subscribe(
          setDatasetItem
        );
      });
    }
    getDatasetDetail(datasetId).subscribe(setDatasetDetail);
  }, [datasetId, datasetItemId]);

  return { datasetDetail, datasetItem } as const;
}

export function useAnnotation(
  annotatorId: string,
  datasetId: string,
  datasetItemId: string
) {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    BoundingBoxAnnotation,
    any
  >();
  getAnnotation<BoundingBoxAnnotation>(
    datasetId,
    datasetItemId,
    annotatorId
  ).subscribe(setValue, setError);

  return [value, loading, error] as const;
}
