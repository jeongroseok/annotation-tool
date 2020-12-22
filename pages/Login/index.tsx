import { Button, Container, Form } from "react-bootstrap";
import React, { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userState } from "../../states";

export default function Login() {
  const setUser = useSetRecoilState(userState);
  const { register, handleSubmit } = useForm();
  const onSubmit = useCallback(async (data) => {
    setUser({
      ...data,
    });
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            ref={register}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
