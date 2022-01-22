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
 * <Button variant='primary | secondary'/>
*/

export const CardRound = styled.div.attrs({
  className: "card"
})`
  border-radius: 10px;
`

// export const Card = {
//   borderRadius: "10px",
//   backgroundColor: 'rgb(255, 255, 255)',
//   boxSshadow: 'rgb(59 59 59 / 5%) 0px 5px 15px 0px',
//   fontSize: '16px',
//   border: 'none'
// }
// background: rgb(55, 118, 116);

// export const Button = styled.button`
  // background: ${(props) =>
  //   props.variant === "primary"
  //     ? "rgb(55, 118, 116)"
  //     : "linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), rgb(251, 195, 97)"};
  // border-radius: 100px;
  // border-width: 0px;
  // color: rgb(255, 255, 255);
  // display: inline-block;
  // font-family: FuturaPT, sans-serif;
  // font-size: 18px;
  // font-weight: 700;
  // height: 48px;
  // min-width: 160px;
  // padding: 0px 15px;
  // outline: none;
  // box-shadow: initial;
  // transition: all 100ms linear 0s;
  // line-height: 100%;
//   ${(props) => props && props.variant.secondary`
//     background: linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), rgb(251, 195, 97);
//     background-blend-mode: soft-light, normal;
//     color: rgb(64, 62, 61);`
//   }
// `;

// ${(props) => props && props.secondary`
  // background: linear-gradient(rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), rgb(251, 195, 97);
  // background-blend-mode: soft-light, normal;
  // color: rgb(64, 62, 61);
// `}
// background: rgb(64, 62, 61);
