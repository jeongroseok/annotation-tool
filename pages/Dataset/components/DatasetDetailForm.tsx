import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

import React from "react";

export interface DatasetDetailFormProps {
  defaultValues: DatasetDetailFormData;
  onSubmit: SubmitHandler<DatasetDetailFormData>;
}

export interface DatasetDetailFormData {
  name?: string;
  description?: string;
  items?: string;
  categories?: string;
}

export default function DataDetailForm({
  defaultValues,
  onSubmit,
}: DatasetDetailFormProps) {
  const { register, handleSubmit } = useForm<DatasetDetailFormData>({
    defaultValues: defaultValues,
  });
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" ref={register} />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          ref={register}
        />
      </Form.Group>
      <Form.Group controlId="items">
        <Form.Label>Items</Form.Label>
        <Form.Control as="textarea" rows={10} name="items" ref={register} />
      </Form.Group>
      <Form.Group controlId="categories">
        <Form.Label>Categories(json format)</Form.Label>
        <Form.Control as="textarea" rows={1} name="categories" ref={register} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
