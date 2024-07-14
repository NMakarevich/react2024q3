import React from 'react';
import './loader.scss';

interface Props {
  isLoading: boolean;
}

export default function Loader(props: Props): React.ReactNode {
  const { isLoading } = props;
  return isLoading && <div className="loading">Loading...</div>;
}
