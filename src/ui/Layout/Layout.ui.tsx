import './Layout.ui.css';

type LayoutProps = {
  header: React.ReactNode;
  main: React.ReactNode;
  side: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  header,
  main,
  side,
}) => {
  return (
    <div className='layout'>
      <div className='layout__header'>
        {header}
      </div>
      <div className='layout__body'>
        <div className='layout__content'>
          {main}
        </div>
        <div className='layout__side'>
          {side}
        </div>
      </div>
    </div>
  );
};
