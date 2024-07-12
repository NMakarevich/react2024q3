import './loader.scss';

interface Props {
  isLoading: boolean;
}

export default function Loader(props: Props) {
  const { isLoading } = props;
  return <div className={isLoading ? 'loading' : 'hidden'}>Loading...</div>;
}
