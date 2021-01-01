import React from "react";
import {
  faArrowsAlt,
  faBars,
  faCog,
  faDrawPolygon,
  faFileExport,
  faMousePointer,
  faRulerCombined,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const StyledDiv = styled.div`
  padding: 10px 0;
  width: 50px;
  background-color: #292c31;
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

export const LeftBarItem = styled.a`
  width: 50px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props: { selected?: boolean }) =>
    props.selected ? "#fff" : "#aaa"};
  &:hover {
    color: #fff;
  }
  &:first-child {
    margin-bottom: auto;
  }
  &:last-child {
    margin-top: auto;
  }
`;

export default function Toolbar({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <StyledDiv>
      <LeftBarItem style={{ justifySelf: "flex-start" }}>
        <FontAwesomeIcon icon={faBars} />
      </LeftBarItem>
      <LeftBarItem selected>
        <FontAwesomeIcon
          icon={faMousePointer}
          onClick={() => onSelect("pointer")}
        />
      </LeftBarItem>
      <LeftBarItem>
        <FontAwesomeIcon icon={faArrowsAlt} />
      </LeftBarItem>
      <LeftBarItem>
        <FontAwesomeIcon icon={faDrawPolygon} />
      </LeftBarItem>
      <LeftBarItem>
        <FontAwesomeIcon icon={faRulerCombined} />
      </LeftBarItem>
      <LeftBarItem>
        <FontAwesomeIcon icon={faSearchPlus} />
      </LeftBarItem>
      <LeftBarItem>
        <FontAwesomeIcon
          icon={faFileExport}
          onClick={() => onSelect("export")}
        />
      </LeftBarItem>
      <LeftBarItem>
        <FontAwesomeIcon icon={faCog} />
      </LeftBarItem>
    </StyledDiv>
  );
}
