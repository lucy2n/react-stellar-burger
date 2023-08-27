import { Navigate, useLocation } from 'react-router-dom';
import { RoutePathname } from '../../utils/constants';
import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

const Protected = ({ onlyUnAuth = false, component }: { onlyUnAuth?: boolean, component: JSX.Element}): JSX.Element | null => {
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    console.log('Auth is not checked');
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: RoutePathname.homePage } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={RoutePathname.loginPage} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: JSX.Element}) => (
    <Protected onlyUnAuth={true} component={component} />
);