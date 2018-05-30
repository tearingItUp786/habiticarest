import styled, { injectGlobal, keyframes } from 'styled-components';
import ReactTooltip from 'react-tooltip';

injectGlobal`
  body {
    font-family: 'Raleway', sans-serif;
    background: #111;
  }
`;

export const defaultTheme = {
  backgroundColor: '#111',
  baseFont: `'Raleway', sans-serif`,
  inputColor: '#1e1e1e',
  buttonColor: '#073FAE',
  errorColor: '#E9090C',
  textColor: '#fff',
  linkHoverColor: '#FFD200',
  rgbRed: '233, 9, 12',
  rgbBlue: '7, 63, 174',
  rgbYellow: '255, 210, 0',
  minMobile: '768px'
};

export const StyledReactTooltip = styled(ReactTooltip)`
  color: white !important;
  background-color: ${defaultTheme.backgroundColor} !important;
  max-width: 150px !important;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

/* Dashboard Styling */
export const MainWrapper = styled.section`
  max-width: 1200px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 30px 15px;
  margin-top: 80px;
  background: ${props => props.theme.inputColor};
`;

export const StyledHR = styled.hr`
  margin-top: 3em;
  margin-bottom: 3em;
  border-color: #fff;
  border-width: 1px;
  border-style: solid;
  opacity: 0.7;
  background: white;
`;

export const StyledSection = styled.section`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

export const Titles = styled.div`
  margin-bottom: 50px;

  h2 {
    color: white;
    text-align: center;
    font-size: calc(22px + (30 - 22) * (100vw - 400px) / (2400 - 400));
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: normal;
  }

  h3 {
    color: white;
    margin-bottom: 5px;
    margin-top: 0;
    text-align: center;
    font-weight: normal;
    font-size: calc(16px + (20 - 16) * (100vw - 400px) / (2400 - 400));
  }
`;

export const StyledDiv = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const AvatarWrapper = styled.div`
  padding-top: 0;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  image-rendering: pixelated;
  position: relative;
  width: 175px;
  height: 147px;

  @media only screen and (min-width: ${defaultTheme.minMobile}) {
    padding-top: 24.5px;
    margin: 0;
  }
`;

export const CharacterSprite = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 auto 0 24px;

  span {
    position: absolute;
  }
`;

export const FlexStyledDiv = StyledDiv.extend`
  display: flex;
  flex-wrap: wrap;
`;

export const DonutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const DonutSpinner = styled.div`
  display: inline-block;
  border: 7px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${defaultTheme.buttonColor};
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: ${DonutSpin} 1.2s linear infinite;
`;

export const SpinnerContainer = styled.div`
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
