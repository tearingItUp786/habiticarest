// @flow;
import React, { Component, Fragment } from 'react';
// import { toast } from 'react-toastify';
import { StyledHR, StyledSection, StyledDiv as Achievements, Titles } from '../styling/styled';
import { getAchievements } from '../config';
import AchievementContainer from './AchievementContainer';

type OverviewShieldsStateType = {
  [key: string]: {
    label: string,
    achievements: {
      [key: string]: {
        title: string,
        text: string,
        icon: string,
        earned: boolean,
        value?: number,
        index: number,
        optionalCount?: number
      }
    }
  }
};

type OverviewShieldPropsType = {
  username: string,
  createdOn: string
};

class OverviewShields extends Component<OverviewShieldPropsType, OverviewShieldsStateType> {
  state = {
    basic: {
      label: 'Basic',
      achievements: {}
    },
    seasonal: {
      label: 'Seasonal',
      achievements: {}
    },
    special: {
      label: 'Special',
      achievements: {}
    }
  };

  async componentDidMount() {
    try {
      const achievements = await getAchievements();
      /* eslint-disable */
      this.setState(achievements);
      /* eslint-enable */
    } catch (error) {
      // const moreText = this.constructor.displayName || this.constructor.name;
      // toast.error(formattedErrorMessage(error.name, moreText), {
      //   autoClose: false
      // });
    }
  }

  render() {
    const { username, createdOn } = this.props;
    const formattedDate = new Date(createdOn).toString();

    return (
      <Fragment>
        <StyledHR />
        <StyledSection>
          <Titles>
            <h2>Overview of {username}</h2>
            <h3>Member since {formattedDate}</h3>
          </Titles>
        </StyledSection>
        <Achievements>
          <AchievementContainer
            label={this.state.basic.label}
            achievements={this.state.basic.achievements}
            defaultNumber={10}
          />
          <AchievementContainer
            label={this.state.seasonal.label}
            achievements={this.state.seasonal.achievements}
            defaultNumber={10}
          />
          <AchievementContainer
            label={this.state.special.label}
            achievements={this.state.special.achievements}
            defaultNumber={10}
          />
        </Achievements>
      </Fragment>
    );
  }
}

export default OverviewShields;
