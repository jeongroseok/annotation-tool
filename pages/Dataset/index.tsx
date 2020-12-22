import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Container } from "react-bootstrap";
import DatasetDetail from "./DatasetDetail";
import DatasetList from "./DatasetList";
import React from "react";

// import CreatePage from "./CreatePage";
export interface MatchParams {
  id: string;
}

export default function Dataset() {
  let match = useRouteMatch<MatchParams>();

  return (
    <Container className="mt-3">
      <Switch>
        <Route exact path={match.path}>
          <DatasetList />
        </Route>
        {/* <Route path={`${match.path}/create`} component={CreatePage} /> */}
        <Route path={`${match.path}/:id`}>
          <DatasetDetail />
        </Route>
      </Switch>
    </Container>
  );
}
