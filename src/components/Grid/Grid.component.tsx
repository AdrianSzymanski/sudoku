import './Grid.component.css';

type GridProps = React.PropsWithChildren;

export const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div className='grid'>
      {children}
    </div>
  );
};
