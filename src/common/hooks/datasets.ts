import {
  DatasetDetail,
  deleteDatasetDetail,
  getDatasetDetail,
  getDatasetItem,
  listDatasetDetail,
  updateDatasetDetail,
} from "../../services";
import { useCallback, useEffect, useState } from "react";

import type { DatasetItemBase } from "../../services";
import { useLoadingValue } from ".";

export function useDatasetDetailList() {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    DatasetDetail[],
    any
  >();

  useEffect(() => {
    listDatasetDetail().subscribe(setValue, setError);
  }, []);

  return [value, loading, error] as const;
}

export function useDatasetDetail(id: string) {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    DatasetDetail,
    any
  >();

  useEffect(() => {
    getDatasetDetail(id).subscribe(setValue, setError);
  }, [id]);

  const _update = useCallback(
    async (datasetDetail: DatasetDetail) => {
      await updateDatasetDetail({ ...datasetDetail, id });
    },
    [id]
  );
  const _delete = useCallback(
    async (datasetDetail: DatasetDetail) => {
      await deleteDatasetDetail({ ...datasetDetail, id });
    },
    [id]
  );
  return [value, loading, error, _update, _delete] as const;
}

export function useDatasetItem<T extends DatasetItemBase>(
  datasetId: string,
  datasetItemId: string
) {
  const [datasetItem, setDatasetItem] = useState<T>();

  useEffect(() => {
    getDatasetItem<T>(datasetId, datasetItemId).subscribe(setDatasetItem);
  }, [datasetId, datasetItemId]);

  return datasetItem;
}

export function useDatasetItemList() {}

// export function useDatasetCreate(dataset: DatasetDetail) {
//   return createDataset(dataset);
// }
