import React, { Component } from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring';
import { defaultTheme, StyledReactTooltip } from '../styling/styled';

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 48%;
    margin-bottom: 40px;

    &:nth-child(odd) {
      margin-right: 2%;
    }

    &:nth-child(even) {
      margin-left: 2%;
    }
  }
`;

const TagCount = styled.span`
  padding: 15px;
  border-left: 1px solid black;
  color: white;
  width: 20px;
  text-align: center;
`;

const StyledLi = styled.li`
  display: inline-flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${defaultTheme.buttonColor};
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 1px 0 0 black; /* Border bottom */
  box-shadow: 0 -1px 0 0 black; /* Border top */
  box-shadow: -1px 0 0 0 black; /* Border left */
  box-shadow: 1px 0 0 0 black; /* Border right */
  box-shadow: 0 0 0 1px black; /* All the borders by using the spread properties */
`;

const SubStyledLi = StyledLi.extend`
  background: ${props => props.background};
  color: black;
  cursor: initial;
`;

const TagName = styled.span`
  flex: 1;
  padding: 10px;
`;

type TaskTagsListStateType = {
  showAll: boolean
};

class TaskTagsList extends Component<TaskTagsListInnerType, TaskTagsListStateType> {
  state = {
    showAll: false
  };

  getTasks = () => {
    const tagName = Object.keys(this.props).toString();
    const innerArray = this.props[tagName];
    let tasksArray = [];

    if (this.state.showAll) {
      tasksArray = innerArray.map((innerVal: HabitType) => {
        const { _id } = innerVal;
        return { key: _id, ...innerVal };
      });
    }

    return { tagName, tasksArray };
  };

  handleClick = () => {
    const newState = this.state.showAll;
    this.setState({ showAll: !newState });
  };

  render() {
    const { tagName, tasksArray } = this.getTasks();

    /*eslint-disable*/
    return (
      <StyledUl>
        <StyledLi onClick={this.handleClick}>
          <TagName>{tagName}</TagName>
          <TagCount>{this.props[tagName].length}</TagCount>
        </StyledLi>
        <Transition
          keys={tasksArray.map(item => item.key)}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ display: 'none' }}
        >
          {tasksArray.map(item => styles => (
            <SubStyledLi
              style={styles}
              background={
                item.type === 'daily'
                  ? item.completed ? defaultTheme.linkHoverColor : defaultTheme.errorColor
                  : defaultTheme.buttonColor
              }
              data-tip={`${item.text}`}
              data-for={`${item.text}`}
            >
              <TagName>{item.text}</TagName>
              <StyledReactTooltip id={`${item.text}`}>
                <h4>
                  {item.type === 'daily'
                    ? item.completed
                      ? `Completed Task ${item.type}`
                      : `Looks like you still have to do this ${item.type}`
                    : `${item.type} so don't worry about it`}
                </h4>
              </StyledReactTooltip>
            </SubStyledLi>
          ))}
        </Transition>
      </StyledUl>
    );
  }
}

export default TaskTagsList;
