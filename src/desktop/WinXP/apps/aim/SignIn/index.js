import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ADD_APP } from '../../../constants/actions';
import { appSettings } from '../../';

import signInImage from '../../../../assets/aim/signInImage.png';

function SignIn({ onClose, dispatch }) {
  const [stage, setStage] = useState('1. Connecting ...');

  useEffect(() => {
    setTimeout(() => {
      setStage('2. Verifying name and password ...');
    }, 2000);
    setTimeout(() => {
      setStage('3. Starting services ...');
    }, 4000);
    setTimeout(() => {
      dispatch({
        type: ADD_APP,
        payload: appSettings.AIMBuddyList,
      });
      onClose();
    }, 5000);
  }, []);

  return (
    <Div>
      <div className="com__sign-in__image-wrapper">
        <img className="com__sign-in__image" src={signInImage} alt="" />
      </div>
      <div className="com__sign-in__hr" />
      <div className="com__sign-in__content">
        <div>{stage}</div>
        <button className="com__button--focused">Cancel</button>
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  font-family: 'MS Sans Serif';
  -webkit-font-smoothing: subpixel-antialiased;
  .com__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 100%;
    height: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }
  .com__options {
    height: 23px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1px 0 1px 2px;
    border-left: 0;
    flex: 1;
  }
  .com__sign-in__image-wrapper {
    text-align: center;
    padding: 5px 5px 3px 5px;
  }
  .com__sign-in__image {
    height: 135px;
  }
  .com__sign-in__hr {
    height: 2px;
    border-top: 1px solid #999;
    border-bottom: 1px solid #efefef;
    margin: 0 5px 5px;
  }
  .com__sign-in__content {
    font-size: 10px;
    text-align: center;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  .com__sign-in__content div {
    margin-bottom: 3px;
    letter-spacing: 0.2px;
  }
  .com__button--focused {
    box-shadow: inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4;
    -webkit-font-smoothing: subpixel-antialiased;
    font-size: 10px;
    box-sizing: border-box;
    margin-top: 2px;
    border: 1px solid #003c74;
    background: linear-gradient(180deg,#fff,#ecebe5 86%,#d8d0c4);
    border-radius: 3px;
    min-height: 20px;
    padding: 0 10px;
    text-rendering: auto;
    color: -internal-light-dark(black, white);
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    appearance: auto;
    writing-mode: horizontal-tb !important;
    font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-weight: ;
    font-stretch: ;
  }
`;

export default SignIn;
