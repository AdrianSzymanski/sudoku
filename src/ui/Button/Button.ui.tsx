import './Button.ui.css';

type ButtonProps = React.PropsWithChildren & {
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className='button'
      onClick={onClick}
      type='button'
    >
      <span className='button__content'>
        {children}
      </span>
    </button>
  );
};
