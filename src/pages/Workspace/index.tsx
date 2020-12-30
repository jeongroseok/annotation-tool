import {
  AnnotationState,
  BoundingBoxAnnotation,
  DatasetDetail,
  ImageDatasetItem,
  createAnnotation,
  getAllDatasetItemIds,
  getAnnotation,
  getDatasetDetail,
  getDatasetItem,
  listAnnotation,
  updateAnnotation,
} from "../../services";
import { Button, Container } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

import { Editor } from "./components";
import { firebase } from "../../services/firebase";
import produce from "immer";
import { useDatasetDetail } from "../../common/hooks";

export interface WorkspaceMatchParams {
  datasetId: string;
  datasetItemId: string;
}

// reducer 사용
// lazy sync로 바꿀것; 데이터량 최적화
export default function Workspace() {
  const history = useHistory();
  const params = useParams<WorkspaceMatchParams>();
  const [datasetDetail] = useDatasetDetail(params.datasetId);
  const [datasetItem, setDatasetItem] = useState<ImageDatasetItem>();
  const [annotation, setAnnotation] = useState<BoundingBoxAnnotation>();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (datasetDetail) setCategories(datasetDetail.categories);
  }, [datasetDetail]);

  useEffect(() => {
    if (!params.datasetId) return;
    if (params.datasetItemId) {
      getDatasetItem<ImageDatasetItem>(
        params.datasetId,
        params.datasetItemId
      ).subscribe(setDatasetItem);
    } else {
      getAllDatasetItemIds(params.datasetId).subscribe((ids) => {
        if (!ids) return;
        getDatasetItem<ImageDatasetItem>(params.datasetId, ids[0]).subscribe(
          setDatasetItem
        );
      });
    }
  }, [params.datasetId, params.datasetItemId]);

  useEffect(() => {
    if (!datasetItem) return;
    listAnnotation<BoundingBoxAnnotation>(
      datasetItem.datasetId,
      datasetItem.id
    ).subscribe((annotations) => {
      if (annotations.length > 0) {
        setAnnotation(annotations[0]);
      } else {
        const anno = {
          datasetId: datasetItem.datasetId,
          datasetItemId: datasetItem.id,
          annotator: "0",
          state: AnnotationState.NotStarted,
          boundingBoxes: [],
        };
        createAnnotation<BoundingBoxAnnotation>(anno);
      }
    });
  }, [datasetItem]);

  // useEffect(() => {
  //   if (!datasetItem) return;
  //   if (!datasetItem.annotations) return;
  //   console.log(datasetItem.annotations);
  //   setRectangles(
  //     datasetItem.annotations.map((a) => ({
  //       ...a,
  //       color: cc.hsv.hex(Math.random() * 360, 80, 100),
  //     }))
  //   );
  // }, [datasetItem]);

  // const onItemSave = useCallback(() => {
  //   firebase
  //     .database()
  //     .ref("datasets")
  //     .child(params.datasetId)
  //     .child("items")
  //     .child(params.datasetItemId)
  //     .child("annotations")
  //     .set(rectangles);
  //   console.log(rectangles);
  // }, [selectedId, rectangles]);

  const onBoundingBoxesChange = useCallback(
    (boundingBoxes) => {
      updateAnnotation<BoundingBoxAnnotation>({
        ...annotation,
        boundingBoxes,
      } as BoundingBoxAnnotation);
    },
    [annotation]
  );

  if (!datasetDetail || !datasetItem || !annotation) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ flexDirection: "row", backgroundColor: "black" }}>
        <Button
          onClick={() => {
            getAllDatasetItemIds(params.datasetId).subscribe((ids) => {
              if (!ids) return;
              const id = ids[ids.indexOf(datasetItem.id) - 1];
              console.log(id);
              history.push(`/workspace/${datasetDetail.id}/${id}`);
            });
          }}
        >
          이전
        </Button>
        <Button
          onClick={() => {
            getAllDatasetItemIds(params.datasetId).subscribe((ids) => {
              if (!ids) return;
              const id = ids[ids.indexOf(datasetItem.id) + 1];
              console.log(id);
              history.push(`/workspace/${datasetDetail.id}/${id}`);
            });
          }}
        >
          다음
        </Button>
      </div>
      <Editor
        backgoundImage={datasetItem.url}
        categories={datasetDetail.categories}
        boundingBoxes={annotation.boundingBoxes || []}
        onBoundingBoxesChange={onBoundingBoxesChange}
      />
    </div>
  );
}
