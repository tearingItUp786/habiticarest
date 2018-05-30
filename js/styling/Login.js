import styled, { keyframes } from 'styled-components';

export const slideDown = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Wrapper = styled.section`
  background-color: ${props => props.theme.backgroundColor};
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  color: white;
  width: 50vw;
  min-width: 300px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const FieldSet = styled.fieldset`
  border: none;
  padding-left: 0;
  padding-right: 0;

  label {
    display: block;
    width: 100%;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    display: block;
    width: calc(100% - 2em);
    padding: 1em;
    border: none;
    color: white;
    background-color: ${props => props.theme.inputColor};
  }
`;

export const HabitLogo = styled.img`
  width: 100%;
  max-width: 150px;
  min-height: 150px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  animation: ${slideDown} 1s ease;
`;

export const SubmitButton = styled.input`
  padding: 1em 2em;
  background: ${props => props.theme.buttonColor};
  border: none;
  color: white;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 300ms;
  margin-top: 20px;

  &:hover {
    background-color: white;
    color: black;
  }
`;
