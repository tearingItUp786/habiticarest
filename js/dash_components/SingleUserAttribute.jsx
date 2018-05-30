import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from '../styling/styled';

type SingleUserAttributeType = {
  onClick: Function,
  onMouseOver: Function,
  onFocus: Function,
  number: number,
  tabIndex: string,
  title: string
};

function getImageAltAndUrl(atttributeTitle: string) {
  let src;
  let alt;

  switch (atttributeTitle) {
    case 'Perception':
      src = '../../assets/images/mag_glass.png';
      alt = 'A magnifying glass that shows that you are truly perceptive';
      break;

    case 'Intelligence':
      src = '../../assets/images/book.png';
      alt = 'You are super smart! This is a book icon';
      break;

    case 'Constitution':
      src = '../../assets/images/pot.png';
      alt = 'Not too sure what constitution is but here is a picture of a pot!';
      break;

    case 'Strength':
      src = '../../assets/images/barbell.png';
      alt = 'A barbell that represents how strong you are!';
      break;

    default:
      src = '../../assets/habit_logo.png';
      alt = 'We had to default to the habitica logo because no image could be found!';
  }

  return { src, alt };
}

const SingleUserAttribute = (props: SingleUserAttributeType) => {
  const SingleUserAttributeStyled = styled.div`
    flex-basis: 45%;
    text-align: center;
    cursor: pointer;
    transition: background-color 300ms ease-in;

    @media only screen and (min-width: ${defaultTheme.minMobile}) {
      flex-basis: 25%;
    }

    img {
      transition: transform 300ms ease;
      max-width: 100px;
    }

    h2 {
      color: white;
      font-size: calc(18px + (28 - 18) * (100vw - 400px) / (2400 - 400));
      margin-top: 0;
      margin-bottom: 20px;
      font-weight: normal;
    }

    span {
      display: block;
      color: white;
      font-size: calc(18px + (20 - 18) * (100vw - 400px) / (2400 - 400));
    }

    h2,
    span {
      transition: color 300ms ease, transform 300ms ease;
    }

    &:active,
    &:focus {
      outline: 0;
      border: none;
    }

    &:hover,
    &:active,
    &:focus {
      img {
        transform: scale(1.1, 1.1);
      }

      h2 {
        transform: scale(1.1, 1.1);
        color: ${defaultTheme.linkHoverColor};
      }
    }
  `;

  const { src, alt } = getImageAltAndUrl(props.title);

  return (
    <SingleUserAttributeStyled
      tabIndex={props.tabIndex}
      role="button"
      onKeyDown={() => {}}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onFocus={props.onFocus}
    >
      <h2>
        {props.title}: {props.number}
      </h2>
      <img alt={alt} src={src} />
    </SingleUserAttributeStyled>
  );
};

export default SingleUserAttribute;
