import { css } from "styled-components";

export const buttonbase = css`
  background: rgb(64, 62, 61);
  border-radius: 100px;
  border-width: 0px;
  color: rgb(255, 255, 255);
  display: inline-block;
  font-family: FuturaPT, sans-serif;
  font-size: 18px;
  font-weight: 700;
  height: 48px;
  min-width: 160px;
  padding: 0px 15px;
  outline: none;
  box-shadow: initial;
  transition: all 100ms linear 0s;
  line-height: 100%;
`;

export const primary = css`
  background: rgb(55, 118, 116);
`;

export const secondary = css`
  background: linear-gradient(
      rgba(255, 255, 255, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    rgb(251, 195, 97);
  background-blend-mode: soft-light, normal;
  color: rgb(64, 62, 61);
`;
