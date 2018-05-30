import styled from 'styled-components';
import Modal from '../dash_components/Modal';

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  z-index: 5;
`;

export const ModalStyled = styled(Modal)`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;
