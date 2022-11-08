import React from "react";
import styled from "@emotion/styled";
import { Banner, Button, Page, Section, Text } from "../index";
import Colors from "../colors";

/**
 * Style component based on a div element
 * Styling for the background of the modal
 */
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

/**
 * Style component based on a div element
 * Styling for the modal panel itself
 */
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

const Modal = ({ children, ...props }) => {
  return (
    <StyledBG>
      <StyledModal data-testid={"modal-1"}>
        <Page
          borderRadius={"15px 15px 15px 15px"}
          templateRows={"auto"}
          height={"unset"}
        >
          <Banner
            bgColor={Colors.Mono[0]}
            justifyContent={"space-between"}
            borderRadius={"15px 15px 0px 0px"}
            height={"75px"}
          >
            <Text
              content={props.title}
              bgColor={Colors.Mono[0]}
              fontSize={1.5}
              fontWeight={"1000"}
              margin={"auto 35px"}
            />
            <Button
              margin={"auto 10px"}
              content={"X"}
              onClickHandler={props.onClickHandler}
              fontWeight={"1000"}
            />
          </Banner>
          <Section bgColor={Colors.Mono[0]} borderRadius={"0 0 15px 15px"}>
            {children}
          </Section>
        </Page>
      </StyledModal>
    </StyledBG>
  );
};

export default Modal;
