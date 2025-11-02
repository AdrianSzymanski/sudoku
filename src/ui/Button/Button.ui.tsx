import './Button.ui.css';

type ButtonProps = React.PropsWithChildren & {
  isDisabled?: boolean;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      className='button'
      type='button'
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className='button__content'>
        {children}
      </span>
    </button>
  );
};
