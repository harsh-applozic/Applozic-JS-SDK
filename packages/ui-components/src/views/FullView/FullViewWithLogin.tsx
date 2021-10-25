import React from 'react';
import LoginPage from '../../components/LoginPage';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { ViewWithLoginProps } from '../ViewProps';
import FullViewApp from './FullViewApp';

function FullViewAppWithLogin({ loginPage }: ViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const user = useGetSelfDetails();

  if (!isClientLoaded) {
    return <div>Loading Applozic Client...</div>;
  }
  return user ? (
    <FullViewApp />
  ) : (
    <LoginPage
      topHeader={loginPage.topHeader}
      topSubHeader={loginPage.topSubHeader}
    />
  );
}

export default FullViewAppWithLogin;
