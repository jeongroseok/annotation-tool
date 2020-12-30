import * as pages from "./pages";

import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { useEffect } from "react";

import { useRecoilValue } from "recoil";
import { userState } from "./states";

// 앱 전반적 환경 설정
// 게임에서 main.cpp와 동일? => service와 manager생성
export default function App() {
  const user = useRecoilValue(userState);
  // if (!user) {
  // return <pages.Login />;
  // }

  return (
    <Router>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {user.username}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link as={Link} to="/datasets">
                  데이터셋 관리
                </Nav.Link>
                <Nav.Link as={Link} to="/accounts">
                  계정 관리
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div style={{ flex: 1, display: "flex" }}>
          <Switch>
            <Route path="/datasets" component={pages.Dataset} />
            <Route
              path="/workspace/:datasetId/:datasetItemId?"
              component={pages.Workspace}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
