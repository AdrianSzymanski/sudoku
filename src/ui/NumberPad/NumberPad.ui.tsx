import './NumberPad.ui.css';

type NumberPadProps = {
  side: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
};

export const NumberPad: React.FC<NumberPadProps> = ({
  side,
  main,
  footer,
}) => {
  return (
    <div className='number-pad'>
      <div className='number-pad__side'>
        {side}
      </div>
      <div className='number-pad__main'>
        {main}
      </div>
      <div className='number-pad__footer'>
        {footer}
      </div>
      <hr className='number-pad__separator' />
    </div>
  );
};
