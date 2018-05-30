import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from './styling/styled';

const StyledFooter = styled.footer`
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
`;

const StyledH3 = styled.h3`
  font-family: ${defaultTheme.baseFont};
  flex-basis: 100%;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 10px;
  color: white;
  font-size: calc(22px + (30 - 22) * (100vw - 400px) / (2400 - 400));
  text-align: center;
`;

const StyledA = styled.a`
  text-decoration: none;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;

  &:hover,
  &:active,
  &:focus {
    h4 {
      color: ${defaultTheme.linkHoverColor};

      &:hover,
      &:active,
      &:focus {
        color: ${defaultTheme.linkHoverColor};
      }
    }
  }
`;

const StyledH4 = styled.h4`
  transition: color 300ms ease;
  font-family: ${defaultTheme.baseFont};
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 10px;
  color: white;
  font-size: calc(16px + (20 - 16) * (100vw - 400px) / (2400 - 400));
  text-align: center;
`;

const StyledP = styled.p`
  font-family: ${defaultTheme.baseFont};
  flex-basis: 100%;
  font-weight: normal;
  font-style: italic;
  margin-top: 0;
  margin-bottom: 10px;
  color: white;
  font-size: calc(14px + (18 - 14) * (100vw - 400px) / (2400 - 400));
  text-align: center;
`;

const Footer = () => (
  <StyledFooter>
    <StyledH3>Designed By</StyledH3>
    <StyledA target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/bainstaranveer/">
      <StyledH4>Taranveer Bains</StyledH4>
    </StyledA>
    <StyledP>I was born not knowing and have had only a little time to change that here and there.</StyledP>
  </StyledFooter>
);

export default Footer;
