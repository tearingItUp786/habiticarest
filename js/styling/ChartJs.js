import styled from 'styled-components';
import { defaultTheme } from './styled';

export const BasicChartContainer = styled.div`
  position: relative;
  width: 50%;
`;

export const LineChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  &:nth-child(n + 2) {
    margin-top: 60px;
  }

  @media only screen and (min-mobile ${defaultTheme.minMobile}) {
    height: 80vw;
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    height: 500px;
  }
`;

export const PieChartContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    width: calc(50% - 20px);
    height: 400px;

    &:first-child {
      margin-right: 20px;
    }
  }
`;
