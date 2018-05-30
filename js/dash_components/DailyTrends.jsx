// @flow

import React, { Fragment } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import {
  defaultTheme,
  StyledSection,
  StyledHR,
  Titles,
  FlexStyledDiv,
  DonutSpinner,
  SpinnerContainer
} from '../styling/styled';
import { ChartContainer } from '../styling/ChartJs';
import { barChartOptions } from '../chart_js_helpers/chartHelp';

const DailyTrends = (props: DailyTrendsType) => {
  const { dailyHistory, userHasDailies, dailiesLoaded } = props;

  let renderedContent = (
    <SpinnerContainer>
      <DonutSpinner />
    </SpinnerContainer>
  );

  if (dailiesLoaded) {
    if (userHasDailies) {
      const chartData = dailyHistory.map((val: HabitType) => {
        let completedCount = 0;
        let incompletedCount = 0;
        val.history.reduce((prevVal: HabitTypeHistoryProp, currentVal: HabitTypeHistoryProp) => {
          if (
            (prevVal.value === null && currentVal.value > 0) ||
            (prevVal.value !== null && currentVal.value > prevVal.value)
          ) {
            completedCount += 1;
          } else if (
            (prevVal.value === null && currentVal.value < 0) ||
            (prevVal.value !== null && currentVal.value < prevVal.value)
          ) {
            incompletedCount += 1;
          }

          return currentVal;
        });

        return { label: val.text, completedCount, incompletedCount };
      });

      const data = {
        labels: chartData.map(val => val.label),
        datasets: [
          {
            label: 'Completed',
            backgroundColor: `${defaultTheme.buttonColor}`,
            data: chartData.map(val => val.completedCount)
          },
          {
            label: 'Incompleted',
            backgroundColor: `${defaultTheme.errorColor}`,
            data: chartData.map(val => val.incompletedCount)
          }
        ]
      };

      renderedContent = (
        <ChartContainer>
          <HorizontalBar data={data} options={barChartOptions()} redraw />
        </ChartContainer>
      );
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
          <h2>Dailies completed vs incompleted history</h2>
        </Titles>
      </StyledSection>
      <FlexStyledDiv>{renderedContent}</FlexStyledDiv>
    </Fragment>
  );
};

export default DailyTrends;
