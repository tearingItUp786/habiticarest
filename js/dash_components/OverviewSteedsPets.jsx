// @flow

import React, { Component, Fragment } from 'react';
import { Pie } from 'react-chartjs-2';
import { FlexStyledDiv, StyledHR, StyledSection, Titles, defaultTheme } from '../styling/styled';
import { PieChartContainer } from '../styling/ChartJs';
import { pieChartOptions } from '../chart_js_helpers/chartHelp';

type OverviewSteedsPetsPropsType = {
  beastMaster: boolean,
  mountMaster: boolean,
  pets: { [key: string]: number },
  worldPets: { [key: string]: number },
  mounts: { [key: string]: boolean },
  worldMounts: { [key: string]: boolean }
};

type ChartType = {
  labels: Array<string>,
  datasets: [
    {
      label: string,
      data: Array<number>,
      backgroundColor: Array<string>
    }
  ]
};

type OverviewSteedsPetsStateType = {
  petData: ChartType,
  mountData: ChartType
};

function getCountOfAnimalsOwned(worldAnimalObject, userAnimals, accumulator) {
  let accumulatorCopy = accumulator;

  return Object.keys(worldAnimalObject).reduce((reducer, currentVal) => {
    if (Object.prototype.hasOwnProperty.call(userAnimals, currentVal)) {
      return (accumulatorCopy += 1);
    }
    return reducer;
  }, accumulatorCopy);
}

function chartDataArrayFormatter(ownedCount, unownedCount, predicate) {
  const totalCount = ownedCount + unownedCount;
  if (predicate) {
    return [totalCount, 0];
  }
  return [ownedCount, unownedCount];
}

class OverviewSteedsPets extends Component<OverviewSteedsPetsPropsType, OverviewSteedsPetsStateType> {
  state = {
    petData: {
      labels: ['Owned', 'Unowned'],
      datasets: [
        {
          label: 'Pet Data',
          data: [0, 0],
          backgroundColor: [defaultTheme.buttonColor, defaultTheme.errorColor]
        }
      ]
    },
    mountData: {
      labels: ['Owned', 'Unowned'],
      datasets: [
        {
          label: 'Mount Data',
          data: [0, 0],
          backgroundColor: [defaultTheme.buttonColor, defaultTheme.errorColor]
        }
      ]
    }
  };

  componentWillReceiveProps(nextProps: OverviewSteedsPetsPropsType) {
    const { petData, mountData } = this.state;
    const { pets, worldPets, mounts, worldMounts, beastMaster, mountMaster } = nextProps;

    // private function that'll compare the world pets with the users pets
    // a user might have more pets than the world pets so need to run a reducer to compare
    // will return a number;
    const petCount = getCountOfAnimalsOwned(worldPets, pets, 0);
    const mountCount = getCountOfAnimalsOwned(worldMounts, mounts, 0);

    const unownedPetCount = Object.keys(worldPets).length - petCount;
    const unownedMountCount = Object.keys(worldMounts).length - mountCount;

    // handle imperative activities of applying predicates and making changes to data array.
    const petDataArray = chartDataArrayFormatter(petCount, unownedPetCount, beastMaster);
    const mountDataArray = chartDataArrayFormatter(mountCount, unownedMountCount, mountMaster);

    petData.datasets[0].data = petDataArray;
    mountData.datasets[0].data = mountDataArray;

    this.setState({ petData });
    this.setState({ mountData });
  }

  render() {
    const { petData, mountData } = this.state;
    return (
      <Fragment>
        <StyledHR />
        <StyledSection>
          <Titles>
            <h2>Pets and Steeds</h2>
          </Titles>
        </StyledSection>
        <FlexStyledDiv>
          <PieChartContainer>
            <Pie data={petData} options={pieChartOptions({ text: 'Pets owned and unowned' })} />
          </PieChartContainer>
          <PieChartContainer>
            <Pie data={mountData} options={pieChartOptions({ text: 'Mounts owned and unowned' })} />
          </PieChartContainer>
        </FlexStyledDiv>
      </Fragment>
    );
  }
}

export default OverviewSteedsPets;
