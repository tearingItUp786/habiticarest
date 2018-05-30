// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import { defaultTheme, StyledReactTooltip } from '../styling/styled';

type AchievementType = {
  title: string,
  text: string,
  icon: string,
  earned: boolean,
  cssClass: string,
  key: string
};

type AchievementContainerPropsType = {
  label: string,
  achievements: {
    [key: string]: AchievementType
  },
  defaultNumber: number
};

type AchievementContainerStateType = {
  showAll: boolean
};

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  .achievement-container {
    flex-basis: 20%;
    margin-bottom: 20px;

    .achievement {
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    .achievement-container {
      flex-basis: 10%;
      margin-bottom: 20px;

      .achievement {
        margin-right: auto;
        margin-left: 0;
      }
    }
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 1em 1em;
  margin-left: auto;
  margin-right: auto;
  background: ${props => props.theme.buttonColor};
  border: none;
  color: white;
  display: block;
  transition: background-color 300ms;
  max-width: 150px;

  &:hover {
    background-color: white;
    color: black;
  }

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    max-width: 250px;
    margin: 0;
  }
`;

const StyledLabel = styled.h3`
  color: white;
  text-align: center;
  font-size: calc(20px + (26 - 20) * (100vw - 400px) / (2400 - 400));
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: normal;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    text-align: left;
  }
`;

const DivContainer = styled.div`
  margin-bottom: 50px;
`;
class AchievementContainer extends Component<AchievementContainerPropsType, AchievementContainerStateType> {
  state = {
    showAll: false
  };

  getAchievements = () => {
    // // this code is here to fix the flow issue with using Object.values;
    // // the code here is hella imperative and needs to be cleaned up a bit imo
    const achValues: Array<AchievementType> = Object.keys(this.props.achievements).map(
      key => this.props.achievements[key]
    );

    let achievementArray = [];
    if (this.state.showAll) {
      achievementArray = achValues.map(innerObj => {
        const cssClass = innerObj.earned ? innerObj.icon : 'achievement-unearned';

        return { key: innerObj.icon, cssClass, ...innerObj };
      });
    } else {
      for (let i = 0; i < this.props.defaultNumber && i < achValues.length; i += 1) {
        const cssClass = achValues[i].earned ? achValues[i].icon : 'achievement-unearned';
        achievementArray[i] = { key: achValues[i].icon, cssClass, ...achValues[i] };
      }
    }
    return achievementArray;
  };

  handleClick = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll }, this.getAchievements);
  };

  render() {
    const achs = this.getAchievements();
    const buttonText = this.state.showAll ? 'Hide' : 'Show All';
    return (
      <DivContainer>
        <StyledLabel>{this.props.label} Achievements</StyledLabel>
        <StyledDiv>
          <Transition
            keys={achs.map(item => item.key)}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0, height: 0, marginBottom: 0 }}
          >
            {achs.map(item => styles => (
              <div className="achievement-container" style={{ ...styles }}>
                <div
                  data-tip={`${item.title}`}
                  data-for={`${item.title}`}
                  className={`achievement ${item.cssClass} ${item.cssClass}2x`}
                />
                <StyledReactTooltip id={`${item.title}`}>
                  <h4>{`${item.title}`}</h4>
                  <span>{`${item.text}`}</span>
                </StyledReactTooltip>
              </div>
            ))}
          </Transition>
        </StyledDiv>
        {Object.keys(this.props.achievements).length > this.props.defaultNumber ? (
          <StyledButton onClick={this.handleClick}>{buttonText}</StyledButton>
        ) : null}
      </DivContainer>
    );
  }
}

export default AchievementContainer;
