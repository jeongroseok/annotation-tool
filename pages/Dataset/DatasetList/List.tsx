import React, { useCallback } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import type { Dataset } from "../../../services";
import Table from "react-bootstrap/Table";

interface ListItemProps {
  item: Dataset;
  onEdit: (item: Dataset) => void;
  onSelect: (item: Dataset) => void;
}

function ListItem({ item, onEdit, onSelect }: ListItemProps) {
  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td scope="row">{}</td>
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

interface ListProps {
  items: Dataset[] | undefined;
  onEdit: (item: Dataset) => void;
  onSelect: (item: Dataset) => void;
}
export default function List({ items, onEdit, onSelect }: ListProps) {
  return (
    <Table className="mt-3" responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>CreatedAt</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              onEdit={onEdit}
              onSelect={onSelect}
            />
          ))}
      </tbody>
    </Table>
  );
}
