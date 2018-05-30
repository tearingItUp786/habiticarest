// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import { formatTitleFromUserAttribute } from '../config';
import UserAttributeModal from './UserAttributeModal';
import SingleUserAttribute from './SingleUserAttribute';
import { DonutSpinner, SpinnerContainer, defaultTheme } from '../styling/styled';
import { ModalWrapper, ModalStyled } from '../styling/Modal';

const UserAtts = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  margin-top: 50px;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    margin-top: 75px;
  }
`;

const transState = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

class UserAttributes extends Component<UserAttributeStateDataType, UserAttributesStateType> {
  state = {
    showModal: false,
    modalReady: false,
    statBreakdown: {
      baseStat: {
        con: 0,
        per: 0,
        str: 0,
        int: 0
      },
      buff: {
        con: 0,
        per: 0,
        str: 0,
        int: 0
      },
      classBonus: {
        con: 0,
        per: 0,
        str: 0,
        int: 0
      },
      con: 0,
      gearBonus: {
        con: 0,
        per: 0,
        str: 0,
        int: 0
      },
      int: 0,
      levelBonus: {
        con: 0,
        per: 0,
        str: 0,
        int: 0
      },
      maxMP: 0,
      per: 0,
      str: 0
    }
  };

  componentWillReceiveProps(nextProps: UserAttributeStateDataType) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.setState({ statBreakdown: nextProps, modalReady: true });
    }
  }

  modal = undefined;

  handleShow = (data: UserAttributeModalType) => {
    this.setState({ showModal: true });
    const modalRoot = document.getElementById('modalRoot');
    this.modal = (
      <ModalStyled modalRoot={modalRoot}>
        <UserAttributeModal {...data} />
      </ModalStyled>
    );
  };

  handleHide = () => {
    this.setState({ showModal: false });
    this.modal = null;
  };

  render() {
    const { statBreakdown, modalReady } = this.state;
    let body;

    if (modalReady) {
      body = (
        <UserAtts>
          {['per', 'con', 'str', 'int'].map(stat => {
            const attData = {
              title: stat,
              total: statBreakdown[stat],
              baseStat: statBreakdown.baseStat[stat],
              classBonus: statBreakdown.classBonus[stat],
              gearBonus: statBreakdown.gearBonus[stat],
              buffBonus: statBreakdown.buff[stat],
              levelBonus: statBreakdown.levelBonus[stat],
              hideModal: this.handleHide
            };

            return (
              <SingleUserAttribute
                key={stat}
                title={formatTitleFromUserAttribute(stat)}
                tabIndex="0"
                number={statBreakdown[stat]}
                onClick={() => this.handleShow(attData)}
              />
            );
          })}
          <Transition in={this.state.showModal} unmountOnExit timeout={300}>
            {(state: string) => <ModalWrapper style={{ ...transState[state] }}>{this.modal}</ModalWrapper>}
          </Transition>
        </UserAtts>
      );
    } else {
      body = (
        <SpinnerContainer>
          <DonutSpinner />
        </SpinnerContainer>
      );
    }
    return body;
  }
}

export default UserAttributes;
