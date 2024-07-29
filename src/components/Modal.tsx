// src/components/Modal.tsx
import React from "react";
import styled from "styled-components";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const ModalContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 99999;
  left: 0;
  bottom: 0;
  width: 100%;
  background: black;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transform: ${({ visible }) => (visible ? "translateY(0)" : "translateY(100%)")};
  transition: transform 0.3s ease-in-out;
  max-height: 50vh;
  overflow: auto;
`;

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out;
`;

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <>
      <ModalContainer visible={visible}>{children}</ModalContainer>
    </>
  );
};

export default Modal;
