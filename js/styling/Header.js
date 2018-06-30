import styled from 'styled-components';

export const Navbar = styled.nav`
  color: ${props => props.theme.textColor};
  padding: 5px 15px;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: calc(100% - 30px);
  z-index: 10;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;

    li {
      font-size: 1em;
      text-transform: uppercase;
      letter-spacing: 2px;

      img {
        height: 50px;
      }

      button {
        color: white;
        padding: 25px 0 25px 25px;
        text-decoration: none;
        transition: color 0.2s ease;
        text-transform: uppercase;
        border: none;
        background: none;
        letter-spacing: 2px;
        cursor: pointer;

        &:hover,
        &:active {
          outline: none;
          border: 0;
          color: ${props => props.theme.linkHoverColor};
        }
      }
    }
  }
`;

export default undefined;
