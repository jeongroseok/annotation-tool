import {
  DatasetDetail,
  deleteDatasetDetail,
  getDatasetDetail,
  listDatasetDetail,
  updateDatasetDetail,
} from "../../../services";
import { useCallback, useEffect } from "react";

import { useLoadingValue } from "../../../common/hooks";

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

export function useDatasetItemList() {}

// export function useDatasetCreate(dataset: DatasetDetail) {
//   return createDataset(dataset);
// }
