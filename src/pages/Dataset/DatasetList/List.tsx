import type { DatasetDetail } from "../../../services";
import { ListItem } from "./ListItem";
import React from "react";
import Table from "react-bootstrap/Table";

interface ListProps {
  items: DatasetDetail[] | undefined;
  onEdit: (item: DatasetDetail) => void;
  onSelect: (item: DatasetDetail) => void;
}
export default function List({ items, onEdit, onSelect }: ListProps) {
  return (
    <Table className="mt-3" responsive striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>UpdatedAt</th>
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
