import './Layout.ui.css';

type LayoutProps = {
  main: React.ReactNode;
  side: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ main, side }) => {
  return (
    <div className='layout'>
      <div className='layout__main'>
        {main}
      </div>
      <div className='layout__side'>
        {side}
      </div>
    </div>
  );
};
