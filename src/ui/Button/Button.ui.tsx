import clsx from 'clsx';
import './Button.ui.css';

type ButtonProps = React.PropsWithChildren & {
  isPressed?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  isPressed = false,
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      className={clsx('button', {
        'button--is-pressed': isPressed,
      })}
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
