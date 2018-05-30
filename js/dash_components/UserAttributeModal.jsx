// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';
// import { rgba } from 'polished';
import { formatTitleFromUserAttribute } from '../config';
import { defaultTheme } from '../styling/styled';

const delayedFade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ModalChild = styled.div`
  position: relative;
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  z-index: 5;
  background: ${defaultTheme.inputColor};
  color: white;
  opacity: 0;
  animation: ${delayedFade} 300ms 300ms ease-in forwards;
`;

const ModalHeader = styled.div`
  padding: 15px;
  background: rgba(${defaultTheme.rgbYellow}, 1);

  h3 {
    color: black;
    margin: 0 0 5px 0;
  }

  h4 {
    color: black;
    margin: 0;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;

  span {
    flex-basis: 50%;
    margin-bottom: 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  font-weight: bold;
  font-size: 14px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 300ms ease-in;
  color: black;

  &:hover {
    opacity: 1;
  }
`;

const UserAttributeModal = (props: UserAttributeModalType) => (
  <ModalChild>
    <ModalHeader>
      <h3>
        {formatTitleFromUserAttribute(props.title)}: {props.total}
      </h3>
      <h4>Breakdown</h4>
    </ModalHeader>
    <ModalBody>
      <span>Base Props: {props.baseStat}</span>
      <span>Class Bonus: {props.classBonus}</span>
      <span>Gear Bonus: {props.gearBonus}</span>
      <span>Buff Bonus: {props.buffBonus}</span>
      <span>Level Bonus: {props.levelBonus}</span>
    </ModalBody>

    <CloseButton onClick={props.hideModal}>✖</CloseButton>
  </ModalChild>
);

export default UserAttributeModal;
