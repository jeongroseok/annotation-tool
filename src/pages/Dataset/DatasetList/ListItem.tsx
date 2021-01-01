import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { DatasetDetail, getAllDatasetItemIds, listAnnotation } from "../../../services";
import Moment from "react-moment";
import React from "react";
import { map } from "rxjs/operators";

export interface ListItemProps {
  item: DatasetDetail;
  onEdit: (item: DatasetDetail) => void;
  onSelect: (item: DatasetDetail) => void;
  onReviewClick: (item: DatasetDetail) => void;
}

export function ListItem({ item, onEdit, onSelect, onReviewClick }: ListItemProps) {
  // getAllDatasetItemIds(item.id).pipe(map((ids) => {
  //   listAnnotation()
  // }))
  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td scope="row">
        <Moment format="YYYY/MM/DD">{item.updatedAt}</Moment>
      </td>
      <td scope="row">
        <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>
      </td>
      <td scope="row">
        0%
      </td>
      <td>
        <ButtonGroup size="sm">
          <Button variant="primary" onClick={() => onEdit(item)}>
            Detail
          </Button>
          <Button onClick={() => onSelect(item)}>Annotate</Button>
          <Button onClick={() => onReviewClick(item)}>Review</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
