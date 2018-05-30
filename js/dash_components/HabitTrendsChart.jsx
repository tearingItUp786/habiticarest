// @flow
import React, { Component, Fragment } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { defaultTheme } from '../styling/styled';
import { LineChartContainer } from '../styling/ChartJs';

type HabitTrendsChartPropsType = any;

type HabitTrendsChartStateType = any;

const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    display: none;
  }
`;

const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const StyledInput = styled.input`
  &:checked + span {
    background-color: ${defaultTheme.buttonColor};
  }

  &:checked + span::before {
    transform: translateX(26px);
  }
`;

const StyledH3 = styled.h3`
  color: white;
  font-family: ${defaultTheme.baseFont};
  margin-top: 0;
  margin-bottom: 0;
  font-weight: normal;
`;

const StyledSliderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 10px;

  h3 {
    margin-right: 15px;
  }
`;

class HabitTrendsChart extends Component<HabitTrendsChartPropsType, HabitTrendsChartStateType> {
  state = {
    chartData: this.props.chartData,
    options: this.props.options
  };

  handleToggle = (evt: SyntheticEvent<HTMLInputElement>) => {
    let { options } = this.state;
    const { chartData } = this.state;

    const { currentTarget } = evt;

    if (currentTarget.type === 'checkbox') {
      if (currentTarget.checked) {
        options = {
          ...options,
          elements: {
            line: {
              tension: 0.5
            }
          }
        };
      } else {
        options = {
          ...options,
          elements: {
            line: {
              tension: 0.1
            }
          }
        };
      }
      this.setState({ options, chartData });
    }
  };

  render() {
    const { chartData, options } = this.state;

    return (
      <Fragment>
        <LineChartContainer>
          <Line data={chartData} options={options} redraw />
        </LineChartContainer>
        <StyledSliderContainer>
          <StyledH3>Smooth Line</StyledH3>
          <StyledLabel>
            <StyledInput type="checkbox" onClick={this.handleToggle} />
            <StyledSlider />
          </StyledLabel>
        </StyledSliderContainer>
      </Fragment>
    );
  }
}

export default HabitTrendsChart;
