import styled from "styled-components";
import * as StyledButton from './StyledButton'

/*--------- Button design ----------*/

/** 
 * variants='primary = dark green', 'secondary = yellow'
 * 
 * import { Button } from 'components/Styled/style.js';
 * <Button variant='primary | secondary'/>
*/

const ButtonBase = styled.button`
  ${StyledButton.buttonbase};
  ${props => StyledButton[props.variant]};
`;

export const Button = ({ variant, ...rest }) => (
  <ButtonBase
    variant={variant}
    {...rest}
  />
);

/** 
 * override Bootstrap <Card> component design
 * 
 * import { CardRound } from 'components/Styled/style.js';
*/

export const CardRound = styled.div.attrs({
  className: "card"
})`
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  font-size: 16px;
  border: none;
`
// 
