import './Header.ui.css';

type HeaderProps = React.PropsWithChildren & {
  header: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({
  header,
  children,
}) => {
  return (
    <div className='header'>
      <h1 className='header__title'>
        {header}
      </h1>
      <div className='header__body'>
        {children}
      </div>
    </div>
  );
};
