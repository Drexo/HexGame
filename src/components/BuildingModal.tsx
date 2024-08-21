import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isVisible: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

interface StyledProps {
  isVisible: boolean;
}

const ModalOverlay = styled.div<StyledProps>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  transition: opacity 0.5s;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  z-index: 99999;
`;

const ModalContent = styled.div<StyledProps>`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background: black;
  width: 100%;
  height: 50%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  z-index: 100000;
  transition: 0.5s;

  ${(props) =>
    props.isVisible
      ? `
      height: 50dvh;
  `
      : `
      height: 0;
  `};
`;

const BuildingModal: React.FC<ModalProps> = ({ isVisible, content, onClose }) => {
  return (
    <ModalOverlay isVisible={isVisible} onClick={onClose}>
      <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <div>{content}</div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BuildingModal;
