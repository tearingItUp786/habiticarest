// @flow

import React, { Fragment } from 'react';
import {
  defaultTheme,
  StyledSection,
  StyledHR,
  Titles,
  FlexStyledDiv,
  DonutSpinner,
  SpinnerContainer
} from '../styling/styled';
import { formatDateWithMonths, lineChartOptions } from '../chart_js_helpers/chartHelp';
import HabitTrendsChart from './HabitTrendsChart';

const HabitTrends = (props: HabitTrendsType) => {
  const { habitHistory, userHasHabits, habitsLoaded } = props;
  let renderedContent = (
    <SpinnerContainer>
      <DonutSpinner />
    </SpinnerContainer>
  );
  if (habitsLoaded) {
    if (userHasHabits) {
      const lineCharts = habitHistory.map((val: HabitType) => {
        const { _id, history } = val;

        const data = history.map((historyItem: HabitTypeHistoryProp) => historyItem.value);

        const labels = history.map((historyItem: HabitTypeHistoryProp) => formatDateWithMonths(historyItem.date));

        const chartData = {
          labels,
          datasets: [
            {
              label: `${val.text}`,
              fill: false,
              backgroundColor: `${defaultTheme.buttonColor}`,
              borderColor: `${defaultTheme.buttonColor}`,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: `#fff`,
              pointBackgroundColor: `#fff`,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: `${defaultTheme.linkHoverColor}`,
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 4,
              pointRadius: 3,
              pointHitRadius: 10,
              data
            }
          ]
        };
        return <HabitTrendsChart key={_id} chartData={chartData} options={lineChartOptions({ text: `${val.text}` })} />;
      });

      renderedContent = lineCharts;
    } else {
      renderedContent = (
        <Titles>
          <h2>Sorry! Looks like you do not have any habits at the moment. Head over to Habitica and add some</h2>
        </Titles>
      );
    }
  }

  return (
    <Fragment>
      <StyledHR />
      <StyledSection>
        <Titles>
          <h2>Habit Trends</h2>
        </Titles>
      </StyledSection>
      <FlexStyledDiv>{renderedContent}</FlexStyledDiv>
    </Fragment>
  );
};

export default HabitTrends;
