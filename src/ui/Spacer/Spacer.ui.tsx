import clsx from 'clsx';
import './Spacer.ui.css';

type SpacerProps = React.PropsWithChildren & {
  stack?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
};

export const Spacer: React.FC<SpacerProps> = ({
  stack = 'row',
  align = 'stretch',
  children,
}) => {
  return (
    <div className={clsx('spacer', {
      'spacer--stack-row': stack === 'row',
      'spacer--stack-column': stack === 'column',
      'spacer--align-start': align === 'start',
      'spacer--align-center': align === 'center',
      'spacer--align-end': align === 'end',
      'spacer--align-stretch': align === 'stretch',
    })}>
      {children}
    </div>
  );
};
