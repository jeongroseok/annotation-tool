import { Breadcrumb, Button } from "react-bootstrap";
import React, { useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import List from "./List";
import { useDatasetDetailList } from "../../../common/hooks";

export default function DatasetList() {
  const match = useRouteMatch();
  const history = useHistory();
  const [datasetDetails] = useDatasetDetailList();

  const handleCreate = useCallback(() => {
    history.push(`${match.url}/create`);
  }, []);

  const handleEdit = useCallback((item) => {
    history.push(`${match.url}/${item.id}`);
  }, []);

  const handleSelect = useCallback((item) => {
    history.push(`workspace/${item.id}`);
  }, []);

  const handleReviewClick = useCallback((item) => {
    // history.push(`workspace/${item.id}`);
  }, []);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>데이터셋 관리</Breadcrumb.Item>
        <Breadcrumb.Item active>데이터셋 목록</Breadcrumb.Item>
      </Breadcrumb>
      <Button variant="primary" onClick={handleCreate}>
        New
      </Button>
      <List
        items={datasetDetails}
        onEdit={handleEdit}
        onSelect={handleSelect}
        onReviewClick={handleReviewClick}
      />
    </>
  );
}
