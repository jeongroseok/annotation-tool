import type {
  BoundingBoxAnnotation,
  ImageDatasetItem,
} from "../../../services";
import { findAnnotation, getDatasetItem } from "../../../services";

import { useLoadingValue } from "../../../common/hooks";

export function useDatasetItem(datasetId: string, datasetItemId: string) {
  const { error, loading, setError, setValue, value } = useLoadingValue<
    ImageDatasetItem,
    any
  >();
  getDatasetItem<ImageDatasetItem>(datasetId, datasetItemId).subscribe(
    setValue,
    setError
  );

  return [value, loading, error] as const;
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
  findAnnotation<BoundingBoxAnnotation>(
    datasetId,
    datasetItemId,
    annotatorId
  ).subscribe(setValue, setError);

  return [value, loading, error] as const;
}
