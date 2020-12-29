import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Breadcrumb } from "react-bootstrap";
import DatasetDetailForm from "../components/DatasetDetailForm";
import DatasetItems from "./DatasetItems";
import { MatchParams } from "../";
import { useDatasetDetail } from "../hooks";

export default function DatasetDetail() {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>();
  const [datasetDetail, loading, error, updateDatasetDetail] = useDatasetDetail(
    match.params.id
  );

  const handleSubmit = useCallback(async (data) => {
    data.categories = data.categories.split(",");
    await updateDatasetDetail(data);
    history.goBack();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!datasetDetail) {
    return <div>empty object</div>;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/datasets">데이터셋 관리</Breadcrumb.Item>
        <Breadcrumb.Item active>데이터셋 상세</Breadcrumb.Item>
      </Breadcrumb>
      <DatasetDetailForm
        onSubmit={handleSubmit}
        defaultValues={datasetDetail}
      />
      <DatasetItems datasetId={match.params.id} />
    </>
  );
}
