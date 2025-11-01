import { Layout } from '@ui';
import { Board } from '../Board';

export const App = () => {
  return (
    <Layout
      main={<Board />}
      side={<div>Action panel</div>}
    />
  );
};
