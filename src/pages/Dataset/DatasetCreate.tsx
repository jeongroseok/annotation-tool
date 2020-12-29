import React, { useCallback } from "react";

import { Breadcrumb } from "react-bootstrap";
import DatasetDetailForm from "./components/DatasetDetailForm";
import { createDatasetDetail } from "../../services";
import { useHistory } from "react-router-dom";

export default function DatasetCreate() {
  const history = useHistory();

  const handleSubmit = useCallback(async (data) => {
    data.categories = data.categories.split(",");
    createDatasetDetail(data);
    history.goBack();
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/datasets">데이터셋 관리</Breadcrumb.Item>
        <Breadcrumb.Item active>데이터셋 상세</Breadcrumb.Item>
      </Breadcrumb>
      <DatasetDetailForm defaultValues={{}} onSubmit={handleSubmit} />
    </>
  );
}
