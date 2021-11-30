import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    height: 100vh;
    background-color: ${({ theme }) => theme.bg};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
    /* background: ${({ theme }) => theme.bg_light}; */
  }
  ::-webkit-scrollbar-thumb{
    background: ${({ theme }) => theme.scroll_thumb};
    border-radius: 20px;
    /* border:2px solid ${({ theme }) => theme.bg_light}; */
  }
  #root{
    ${({ theme }) => theme.mixins.flexBox('stretch', 'auto', 'column')}
  }

  .card{
    position: relative;
    overflow: hidden;
    background-color: ${({ theme }) => theme.bg_light};
  }
  .back{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:90;
    background-color: ${({ theme }) => theme.bg};
    @media(min-width:1050px){
      display: none;
    }
  }
  .icon{
    color: ${({ theme }) => theme.color_light};
    font-size:1.2rem;
  }
  button, .btnish {
    position: relative;
    border: none;
    padding: 7px 10px;
    font-size: .95rem;
    border-radius: 4px;
    cursor: pointer;
    transition: filter .3s;
    &,*{
      gap: 5px;
      ${({ theme }) => theme.mixins.flexBox('center', 'center')}
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &:hover{
      filter:brightness(.9)
    }
    &.btn {
      &.blue{
        background-color: ${({ theme }) => theme.bg_blue};
      }
      &.red{
        background-color: red;
      }
      &,*{
        color: ${({ theme }) => theme.color_white};
      }
    }
    &.bluedark {
      background-color: ${({ theme }) => theme.bg_lighter};
      &,*{
        color: ${({ theme }) => theme.color_bluedark};
      }
    }
    &.bigger{
      padding: 10px 15px;
      height: 40px;
      min-width: 100px;
      font-weight: 600;
      &::first-letter{
        text-transform: uppercase;
      }
      &.no-width{
        min-width: auto;
      }
    }
    &.darker{
      &,*{
        color: ${({ theme }) => theme.color_darker};
      }
    }
    &.special{
      background-color: ${({ theme }) => theme.color_dark};
      color: ${({ theme }) => theme.color_white};
      font-size:1.2rem;
      height:55px;
      border-radius: 60px;
      width: auto;
      padding: 0 20px;
      box-shadow: 0 7px 10px ${({ theme }) => theme.default_shadow};
    }
  }
  button,select,input,textarea{
    &.clear{
      border:none;
      background: none;
    }
  }
  i {
    &.icon-circle{
      color: ${({ theme }) => theme.color_light};
      border: 2px solid ${({ theme }) => theme.color_darker};
      border-radius: 50%;
      width: 35px;
      font-size: 1.1rem;
      height: 35px;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        border-color: ${({ theme }) => theme.color_light};
        color: ${({ theme }) => theme.color_light};
      }
    }
  }
  .form-style{
    width: 100%;
    background-color: ${({ theme }) => theme.bg_light};
    border-radius: 6px;
    resize: none;
    height: 45px;
    border:none;
    padding: 0 15px;
    &,*{color: ${({ theme }) => theme.color_light};}
    box-shadow: 0 2px 7px ${({ theme }) => theme.shadow_1};
  }
  .shadow{
    box-shadow: 0 2px 7px ${({ theme }) => theme.shadow_1};
  }

  h1,h2,h3,h4,h5,h6,p,input,td,b{
    color: ${({ theme }) => theme.color_light};
  }
  .pointer{
    cursor: pointer;
  }
  .not-allowed{
    cursor: not-allowed;
    &:hover{
      background: initial;
      color: initial;
      filter: initial;
    }
  }
  label, th  {
    color: ${({ theme }) => theme.color_darker};
  }
  
  .text{
    &.white{
      color: white;
    }
    &.secondary{
      color: ${({ theme }) => theme.color_darker};
    }
    &.small{
      font-size:.8rem;
    }
    &.blue{
      color: ${({ theme }) => theme.alert_success_light};
    }
    &.red{
      color: ${({ theme }) => theme.alert_fail_light};
    }
    &.center{
      text-align:center;
    }
  }
  
  p.label,label {
    padding: 5px 0;
    &::first-letter{
      text-transform: uppercase;
    }
  }
  th{
    text-transform:uppercase;
    font-size:.87rem;
    font-weight:550;
  }

  h1.bold{
    color: ${({ theme }) => theme.color_light};
    font-size:1.2rem;
  }
  li{
    list-style: none;
    a{
      color: ${({ theme }) => theme.color_light};
    }
  }
  a{
    text-decoration: none;
  }
  .alert {
    z-index: 100;
    &::first-letter {
      text-transform: uppercase;
    }
    font-size: 1rem;
    font-weight: 300;
    text-align: center;
    &.box{
      padding: 15px 10px;
      color: ${({ theme }) => theme.color_white};
      &[data-is='success'] {
        background-color: ${({ theme }) => theme.alert_success};
      }
      &[data-is='fail'] {
        background-color: ${({ theme }) => theme.alert_fail};
      }
    }
    &.text{
      font-weight:500;
      &[data-is='success_light'] {
        color: ${({ theme }) => theme.alert_success_light};
      }
      &[data-is='fail_light'] {
        color: ${({ theme }) => theme.alert_fail_light};
      }
      
    }
  }
  .hdr {
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.underline};
    padding-bottom: 10px;
    margin-bottom:20px;
  }
  .padding{
    padding: 20px;
  }
  .padding_2{
    padding: 10px;
  }
  .gap{
    gap: 20px;
  }
  .fluid{
    height: calc(100vh - 100px);
  }
  .flex-1{
    flex: 1 1 auto;
  }
  .bg{
    background-color: ${({ theme }) => theme.underline};
    &.green_light{
    background-color: #6bb96b;
    }
  }
  .bg_alt{
    background-color: ${({ theme }) => theme.underline_alt};
  }
  .loading{
    &:before{
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    content: "";
    z-index: 1;
    transform: skewX(-15deg);
    background: linear-gradient(to right, transparent, rgba(255,255,255,.2), transparent);
    animation: skeleton 1.1s linear infinite;
    @keyframes skeleton{
      from{
        left: -100%;
      }to{
        left: 100%;
      }
    }
  }
  }
`
const mixins = {
  flexBox: (align = 'center', space = 'center', dir = 'row') => {
    return {
      display: 'flex',
      'align-items': align,
      'justify-content': space,
      'flex-direction': dir,
    }
  },
  fluid: (width = '350px') => {
    return {
      width: 'calc(100% - 20px)',
      margin: '0 auto',
      'max-width': width,
    }
  },
  before: (
    color = 'bg_blue',
    width = '100%',
    height = '3px',
    left = '0px',
    bottom = '0px'
  ) => {
    return {
      position: 'absolute',
      left: left,
      bottom: bottom,
      width: width,
      height: height,
      'background-color': all_theme[0][color],
    }
  },
}
export const black = {
  bg: '#121212',
  bg_avatar: '',
  bg_light: '#212525',
  bg_lighter: '#444',
  bg_blue: '#2474ed',
  bg_back: '#f0f0f0',
  scroll_thumb: '#717171',
  default_shadow: 'rgba(0,0,0,.3)',
  light_shadow: 'rgba(0,0,0,.1)',
  shadow_1: 'rgba(0,0,0,.5)',
  color_light: '#f0f0f0',
  color_white: '#fefefe',
  color_bluedark: '#0099ff',
  color_dark: '#7777',
  color_darker: '#bbb',
  green_light: '#6bb96b',
  alert_success: '#12db12ae',
  alert_fail: '#e22222df',
  alert_success_light: 'green',
  alert_fail_light: 'orangered',
  underline: 'rgba(255,255,255,.1)',
  underline_alt: 'rgba(255,255,255,.2)',
  mixins,
}

const white = {
  bg: '#f0f0f0',
  bg_light: '#fff',
  bg_lighter: '#f4f4f4',
  bg_blue: '#0099ff',
  bg_back: '#f0f0f0',
  scroll_thumb: '#ccc',
  default_shadow: 'rgba(0,0,0,.3)',
  light_shadow: 'rgba(0,0,0,.1)',
  shadow_1: 'rgba(0,0,0,.07)',
  color_light: '#212121',
  color_white: '#fefefe',
  color_bluedark: '#2474ed',
  color_dark: '#171717',
  color_darker: '#717171',
  green_light: '#86c786',
  alert_success: '#12db12ae',
  alert_fail: '#e22222df',
  alert_success_light: 'green',
  alert_fail_light: 'orangered',
  underline: 'rgba(0,0,0,.06)',
  underline_alt: 'rgba(0,0,0,.1)',
  mixins,
}

const blue = {
  bg: '#202d3f',
  bg_light: '#324257',
  bg_lighter: '#293649',
  bg_blue: '#2474ed',
  bg_back: 'rgba(0,0,0,.8)',
  scroll_thumb: '#8093aa',
  default_shadow: 'rgba(0,0,0,.3)',
  light_shadow: 'rgba(0,0,0,.1)',
  shadow_1: 'rgba(0,0,0,.2)',
  color_light: '#fefefe',
  color_white: '#fefefe',
  color_bluedark: '#5897f3',
  color_dark: '#171717',
  color_darker: '#8c9aaf',
  green_light: '#6bb96b',
  alert_success: '#12db12ae',
  alert_fail: '#e22222df',
  alert_success_light: 'green',
  alert_fail_light: 'orangered',
  underline: 'rgba(255,255,255,.1)',
  underline_alt: 'rgba(255,255,255,.2)',
  mixins,
}

export const all_theme = [blue, black, white]
