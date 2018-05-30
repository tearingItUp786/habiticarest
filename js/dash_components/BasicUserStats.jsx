// @flow

import React, { Fragment } from 'react';
import Progress from 'react-progressbar';
import styled, { ThemeProvider } from 'styled-components';
// import { rgba } from 'polished';
import UserAvatar from './UserAvatar';
import { defaultTheme } from '../styling/styled';
import UserAttributes from './UserAttributes';

const UserBasics = styled.article`
  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    margin: 0;
    display: flex;
    align-items: center;
  }
`;

const UserStatsWrapper = styled.div`
  display: block;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    max-width: 100vw;
    margin: 0;
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, auto);
    grid-gap: 0 40px;
  }
`;

const UserName = styled.h2`
  color: white;
  font-size: calc(16px + (20 - 16) * (100vw - 400px) / (2400 - 400));
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 0;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    margin: 0;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const UserClass = UserName.extend`
  font-weight: normal;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }
`;

const UserLevel = UserName.extend`
  font-weight: normal;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    grid-column: 2 / 3;
    grid-row: 6 / 7;
  }
`;

const BasicUserStats = (props: DashboardStateType) => (
  <Fragment>
    <UserBasics>
      <UserAvatar {...props} />

      <UserStatsWrapper>
        <SingleUserStatsBar
          name="HP"
          numerator={props.stats.hp}
          denominator={props.stats.maxHealth}
          backgroundColor={defaultTheme.rgbRed}
          color={defaultTheme.errorColor}
          gridColumnName="1/2"
          gridRowName="1/2"
          gridColumnBar="1/2"
          gridRowBar="2/3"
        />
        <SingleUserStatsBar
          name="MP"
          numerator={props.stats.mp}
          denominator={props.stats.maxMP}
          backgroundColor={defaultTheme.rgbBlue}
          color={defaultTheme.buttonColor}
          gridColumnName="1/2"
          gridRowName="3/4"
          gridColumnBar="1/2"
          gridRowBar="4/5"
        />
        <SingleUserStatsBar
          name="EXP"
          numerator={props.stats.exp}
          denominator={props.stats.toNextLevel}
          backgroundColor={defaultTheme.rgbYellow}
          color={defaultTheme.linkHoverColor}
          gridColumnName="1/2"
          gridRowName="5/6"
          gridColumnBar="1/2"
          gridRowBar="6/7"
        />

        <UserName>User: {props.profile.name}</UserName>
        <UserClass>Class: {props.stats.class}</UserClass>
        <UserLevel>Level: {props.stats.lvl}</UserLevel>
      </UserStatsWrapper>
    </UserBasics>
    <UserAttributes {...props.worldState.statBreakdown} />
  </Fragment>
);

const ProgressBarName = styled.span`
  display: block;
  color: white;
  margin-bottom: 5px;
  grid-column: ${props => props.theme.gridColumnName};
  grid-row: ${props => props.theme.gridRowName};
`;

const ProgressBarWrapper = styled.div`
  max-width: 400px;
  margin-bottom: 10px;

  .progressbar-container {
    background-color: ${props => props.theme.backgroundColor};
    border-radius: 5px;

    .progressbar-progress {
      height: 15px !important;
      border-radius: 5px;
    }
  }

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    max-width: 100vw;
    grid-column: ${props => props.theme.gridColumnBar};
    grid-row: ${props => props.theme.gridRowBar};
    align-self: center;
  }
`;

const SingleUserStatsBar = (props: {
  name: string,
  numerator: number,
  denominator: number,
  backgroundColor: string,
  color: string,
  gridColumnName: string,
  gridRowName: string,
  gridColumnBar: string,
  gridRowBar: string
}) => {
  const theme = {
    backgroundColor: `rgba(${props.backgroundColor}, .2)`,
    gridColumnName: `${props.gridColumnName}`,
    gridRowName: `${props.gridRowName}`,
    gridColumnBar: `${props.gridColumnBar}`,
    gridRowBar: `${props.gridRowBar}`
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <ProgressBarName>
          {props.name}: {Math.ceil(props.numerator)}/{props.denominator}
        </ProgressBarName>
        <ProgressBarWrapper>
          <Progress completed={props.numerator / props.denominator * 100} color={props.color} />
        </ProgressBarWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default BasicUserStats;
