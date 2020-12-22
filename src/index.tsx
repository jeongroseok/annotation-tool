import "bootstrap/dist/css/bootstrap.min.css";

// import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Test from "./Test";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Test />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
