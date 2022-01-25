import styled from "styled-components";
import * as StyledButton from "./StyledButton";
import * as StyledBox from "./StyledBox";

/*--------- Button design ----------*/

/**
 * variants='primary = dark green', 'secondary = yellow'
 *
 * import { Button } from 'components/Styled/style.js';
 * <Button variant='primary | secondary'/>
 */

const ButtonBase = styled.button`
  ${StyledButton.buttonbase};
  ${(props) => StyledButton[props.variant]};
  ${(props) => StyledButton[props.size]};
`;

export const Button = ({ variant, size, ...rest }) => (
  <ButtonBase variant={variant} size={size} {...rest} />
);

/**
 * import { BoxRound } from 'components/Styled/style.js';
 */

const BoxBase = styled.div`
  ${StyledBox.baseBox};
  ${(props) => StyledBox[props.size]};
`;

export const BoxRound = ({ size, ...rest }) => (
  <BoxBase size={size} {...rest} />
);
  
/**
 * override Bootstrap <Card> component design
 *
 * import { CardRound } from 'components/Styled/style.js';
 */

export const CardRound = styled.div.attrs({
  className: "card",
})`
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  font-size: 16px;
  border: none;
`;

/**
 * override Bootstrap <Table> component design
 *
 * import { TableRound } from 'components/Styled/style.js';
 */

export const TableRound = styled.table.attrs({
  clasaName: "table",
})`
  border-radius: 10px;
  background-color: rgb(255,255,255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  width: 100%;
`;

/**
 * override Bootstrap <Navbar> component design
 *
 * import { StyliedNavbar } from 'components/Styled/style.js';
 */

export const StyliedNavbar = styled.nav.attrs({
  className: "navbar navbar-expand-lg"
})`
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  height: 75px;
`
