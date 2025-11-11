import { icons } from './icons';
import './Icon.ui.css';

type IconProps = {
  name: keyof typeof icons;
};

export const Icon: React.FC<IconProps> = ({ name }) => {
  const IconComponent = icons[name];

  return (
    <div className='icon'>
      <IconComponent />
    </div>
  );
};
