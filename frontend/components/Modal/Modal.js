import React from "react";
import styled from "@emotion/styled";
import {
  Banner,
  Button,
  Flex,
  Form,
  MultiLineInput,
  Page,
  Section,
  SingleLineInput,
  Text,
} from "../index";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 100%;
  max-height: 100%;
  z-index: 4;
  background-color: white;
  border-radius: 15px;
`;

const StyledBG = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Modal = ({ children, title, onClickHandler }) => {
  return (
    <StyledBG>
      <StyledModal>
        <Page
          borderRadius={"15px 15px 15px 15px"}
          templateRows={"auto"}
          height={"unset"}
        >
          <Banner
            bgColor={"white"}
            justifyContent={"space-between"}
            borderRadius={"15px 15px 0px 0px"}
            height={"75px"}
          >
            <Text
              content={title}
              bgColor={"white"}
              fontSize={1.5}
              fontWeight={"1000"}
            />
            <Button
              content={"X"}
              onClickHandler={onClickHandler}
              fontWeight={"1000"}
            />
          </Banner>
          <Section bgColor={"white"} borderRadius={"0 0 15px 15px"}>
            {children}
          </Section>
        </Page>
      </StyledModal>
    </StyledBG>
  );
};

export default Modal;
