import { Layout } from './components';
import { Board } from './containers';
import './App.css';

export const App = () => {
  return (
    <Layout
      main={<Board />}
      side={<div>Action panel</div>}
    />
  );
};
