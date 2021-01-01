import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Container,
  ListGroup,
  Table,
} from "react-bootstrap";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../states";
import { findAnnotationsByAnnotator } from "../../services";

export interface AccountMatchParams {}

export default function Account() {
  const match = useRouteMatch<AccountMatchParams>();
  const history = useHistory();
  const user = useRecoilValue(userState);

  return (
    <Container className="mt-3">
      <Switch>
        <Route exact path={`${match.path}`}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>계정 관리</Breadcrumb.Item>
          </Breadcrumb>
          <ListGroup>
            <ListGroup.Item
              action
              onClick={() => {
                history.push(`${match.url}/infomation`);
              }}
            >
              계정 정보
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => {
                history.push(`${match.url}/history`);
              }}
            >
              작업 내역
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => {
                history.push(`${match.url}/payment`);
              }}
            >
              payment
            </ListGroup.Item>
          </ListGroup>
        </Route>
        <Route path={`${match.path}/infomation`}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>계정 관리</Breadcrumb.Item>
            <Breadcrumb.Item active>계정 정보</Breadcrumb.Item>
          </Breadcrumb>
          <div>{user.username}</div>
        </Route>
        <Route path={`${match.path}/history`}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>계정 관리</Breadcrumb.Item>
            <Breadcrumb.Item active>작업 내역</Breadcrumb.Item>
          </Breadcrumb>
          <Table>
            <thead>
              <tr>
                <th>데이터셋 이름</th>
                <th>항목명</th>
                <th>상태</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th>etc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>더미 데이터셋</td>
                <td>-MPgi4H8rACBwkIuax6R</td>
                <td>대기</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <Button
                    onClick={() => {
                      history.push(
                        "/workspace/-MPd8MPujnn9fI6L-Imc/-MPgi4H8rACBwkIuax6R"
                      );
                    }}
                  >
                    수정
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Route>
      </Switch>
    </Container>
  );
}
