import { Layout } from '@ui';
import { Actions } from '../Actions';
import { Board } from '../Board';

export const App = () => {
  return (
    <Layout
      main={<Board />}
      side={<Actions />}
    />
  );
};
