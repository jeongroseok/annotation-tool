import {
  Dataset,
  createDataset,
  deleteDataset,
  getDataset,
  listDataset,
  updateDataset,
} from "../../../services";

import { useCallback } from "react";
import { useLoadingValue } from "../../../common/hooks";

export function useDatasetList() {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    Dataset[],
    any
  >();
  listDataset().subscribe(setValue, setError);
  return [value, loading, error] as const;
}

export function useDataset(id: string) {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    Dataset,
    any
  >();
  getDataset(id).subscribe(setValue, setError);
  const _update = useCallback(
    async (dataset: Dataset) => {
      await updateDataset({ ...dataset, id });
    },
    [id]
  );
  const _delete = useCallback(
    async (dataset: Dataset) => {
      await deleteDataset({ ...dataset, id });
    },
    [id]
  );
  return [value, loading, error, _update, _delete] as const;
}

export function useDatasetCreate(dataset: Dataset) {
  return createDataset(dataset);
}
