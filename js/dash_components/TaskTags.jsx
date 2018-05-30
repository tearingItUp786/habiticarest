import React, { Fragment } from 'react';
import TaskTagsList from './TaskTagsList';
import { StyledHR, StyledSection, FlexStyledDiv, Titles, DonutSpinner, SpinnerContainer } from '../styling/styled';

const AlignTopFlexDiv = FlexStyledDiv.extend`
  align-items: baseline;
`;

const TaskTags = (props: TaskTagsPropType) => {
  const { userHasTags, tagsLoaded, userTasksByTag } = props;

  let renderedContent = (
    <SpinnerContainer>
      <DonutSpinner />
    </SpinnerContainer>
  );

  if (tagsLoaded) {
    if (userHasTags) {
      const tagKeys = Object.keys(userTasksByTag);
      renderedContent = tagKeys.map(key => <TaskTagsList key={key} {...userTasksByTag[key]} />);
    } else {
      renderedContent = (
        <Titles>
          <h2>Sorry! Looks like you do not have any Tags at the moment. Head over to Habitica and add some</h2>
        </Titles>
      );
    }
  }

  return (
    <Fragment>
      <StyledHR />
      <StyledSection>
        <Titles>
          <h2>Task Tags</h2>
        </Titles>
      </StyledSection>
      <AlignTopFlexDiv>{renderedContent}</AlignTopFlexDiv>
    </Fragment>
  );
};

export default TaskTags;
