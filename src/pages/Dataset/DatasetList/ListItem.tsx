import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import type { DatasetDetail } from "../../../services";
import Moment from "react-moment";
import React from "react";

export interface ListItemProps {
  item: DatasetDetail;
  onEdit: (item: DatasetDetail) => void;
  onSelect: (item: DatasetDetail) => void;
}

export function ListItem({ item, onEdit, onSelect }: ListItemProps) {
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
      <td>
        <ButtonGroup size="sm">
          <Button variant="primary" onClick={() => onEdit(item)}>
            Detail
          </Button>
          <Button onClick={() => onSelect(item)}>Annotate</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
