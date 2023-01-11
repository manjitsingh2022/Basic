import styled from "styled-components";
// import {
//   Button,
//   Select,
//   Table,
//   Layout,
//   Menu,
//   Collapse,
//   Tabs,
//   Card,
//   Tag,
//   Breadcrumb,
//   Typography,
//   Progress,
//   Modal,
//   Steps,
//   PageHeader,
//   Tooltip,
//   Transfer,
//   Radio,
//   Segmented,
//   Timeline,
//   Empty,
// } from "antd";
import { COLORS, /* siteThemeColors */ } from "./color";
export const PageWrap = styled.div`
  padding: 66px 0px 20px 0px;
  // background: ${COLORS.backgroundDark};
  min-height : 100vh; 
  // height: 100%;
  width: 100%;
  
`;
export const HeaderWrap = styled.div`
  font-family: Roboto;
 
`;
export const LogWrap = styled.div`
  min-height: 240px;
  width: 470px;
  background: #1b1b1b;
  // opacity:0.7;   
  right: 120px;
  border-radius: 20px 20px 20px 20px;
  padding: 40px;
  margin-top: 50px;
  // margin-bottom: 100px;
`;

export const PageWraps = styled.div`
   padding : 20px 32px 20px 100px;   
   min-height : 100vh;   
   background: ${COLORS.backgroundDark};
   font-family: Roboto;
`;
export const FormWrap = styled.div`
width: 100%;
margin-bottom: 20px;
display: flex;
border-radius: calc(0.1 * 100px);
box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.38);
justify-content: space-evenly;
`;
export const StyledCard = styled.div`
  
  // white-space: nowrap;
  overflow: hidden;
  padding: 0;
`;