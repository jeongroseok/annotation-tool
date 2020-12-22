import DatasetDetailForm, {
  DatasetDetailFormData,
} from "../components/DatasetDetailForm";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Breadcrumb } from "react-bootstrap";
import { MatchParams } from "../";
import { useDataset } from "../hooks";

export default function DatasetDetail() {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>();
  const [dataset, , , updateDataset] = useDataset(match.params.id);
  const [formValues, setFormValues] = useState<DatasetDetailFormData>();

  useEffect(() => {
    if (!dataset) return;
    setFormValues({
      ...dataset,
      categories: JSON.stringify(dataset?.categories),
      // items: JSON.stringify(dataset?.items),
    });
  }, [dataset]);

  const handleSubmit = useCallback(async (data) => {
    data.categories = data.categories.split(",");
    data.items = JSON.parse(data.items);
    await updateDataset(data);
    history.goBack();
  }, []);

  if (!formValues) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/datasets">데이터셋 관리</Breadcrumb.Item>
        <Breadcrumb.Item active>데이터셋 상세</Breadcrumb.Item>
      </Breadcrumb>
      <DatasetDetailForm onSubmit={handleSubmit} defaultValues={formValues} />
    </>
  );
}
