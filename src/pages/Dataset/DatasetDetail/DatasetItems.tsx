import {
  ImageDatasetItem,
  createDatasetItem,
  deleteDatasetItem,
  getAllDatasetItemIds,
  getDatasetItem,
} from "../../../services";
import React, { useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { combineLatest } from "rxjs";
import { switchMap } from "rxjs/operators";

function DatasetItemCreate({ datasetId }: { datasetId: string }) {
  const [url, setUrl] = useState<string>();
  return (
    <div>
      <div className={"mt-3"}>항목 추가</div>
      <div>
        <input type="text" onChange={({ target }) => setUrl(target.value)} />
        {url && (
          <button
            onClick={() =>
              createDatasetItem<ImageDatasetItem>(datasetId, {
                width: 100,
                height: 100,
                url,
              })
            }
          >
            추가
          </button>
        )}
      </div>
    </div>
  );
}

export default function DatasetItems({ datasetId }: { datasetId: string }) {
  const [datasetItems, setDatasetItems] = useState<ImageDatasetItem[]>();

  useEffect(() => {
    getAllDatasetItemIds(datasetId)
      .pipe(
        switchMap((ids) =>
          combineLatest(
            ids.map((id) => getDatasetItem<ImageDatasetItem>(datasetId, id))
          )
        )
      )
      .subscribe(setDatasetItems);
  }, [datasetId]);

  return (
    <div>
      <DatasetItemCreate datasetId={datasetId} />
      <div className={"mt-3"}>항목</div>
      <ListGroup>
        {datasetItems &&
          datasetItems.map((item) => (
            <ListGroup.Item>
              {item.url} ({item.width}x{item.height})
              <button onClick={() => deleteDatasetItem(item)}>삭제</button>
            </ListGroup.Item>
          ))}
        {!datasetItems?.length && "empty"}
      </ListGroup>
    </div>
  );
}
