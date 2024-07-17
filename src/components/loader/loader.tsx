import React, { useContext } from 'react';
import './loader.scss';
import { ThemeContext, IThemeContext } from '../../App.tsx';

interface Props {
  isLoading: boolean;
}

export default function Loader(props: Props): React.ReactNode {
  const { theme } = useContext(ThemeContext) as IThemeContext;
  const { isLoading } = props;

  return (
    isLoading && <div className={`loading theme-${theme}`}>Loading...</div>
  );
}
