import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    transition: all 0.50s linear;
  }

  .app-title {
    color: ${({ theme }) => theme.appTitle};
  }

  // statictic component

  .ant-card {
    background: ${({ theme }) => theme.statisticsBackgroundColor};
  }
  
  .ant-card-bordered {
    border: ${({ theme }) => `1px solid ${theme.statisticsBorderColor}`}
  }

  .ant-statistic-title {
    color: ${({ theme }) => theme.statisticsFontColor};
  }

  .ant-statistic-content-value {
    color: ${({ theme }) => theme.statisticsFontColor};
  }

  // alert box

  .ant-alert-info {
    background: ${({ theme }) => theme.alertBoxBackgroundColor};
    border: ${({ theme }) => `1px solid ${theme.alertBoxBorderColor}`}
  }

  .ant-alert-message {
    color: ${({ theme }) => theme.alertBoxFontColor};
  }

  // drawer component

  .ant-drawer-body {
    background: ${({ theme }) => theme.drawerBodyBackgroundColor};
    color: ${({ theme }) => theme.drawerBodyFontColor};
  }

  .ant-drawer-body {
      .info-title {
        color: ${({ theme }) => theme.drawerBodyTitleFontColor};
      }
  }

  .ant-drawer-header {
    background: ${({ theme }) => theme.drawerHeaderBackgroundColor};
  }

  .ant-drawer-title {
    color: ${({ theme }) => theme.drawerHeaderFontColor};
  }

  `
