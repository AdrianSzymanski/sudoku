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
      {children}
    </button>
  );
};
