import { useStore, type PuzzleValueType } from '@store';
import type { Digit } from '@types';
import { Button, ColorTile, Icon, NumberPad } from '@ui';
import './Actions.component.css';

type ActionsProps = {
  selectedCells: number[];
  valueType: PuzzleValueType;
  onValueTypeChange: (valueType: PuzzleValueType) => void;
};

export const Actions: React.FC<ActionsProps> = ({
  selectedCells,
  valueType,
  onValueTypeChange,
}) => {
  const { makeMove } = useStore(state => state);

  return (
    <div className='actions'>
      <NumberPad
        side={(
          <>
            <Button
              isPressed={valueType === 'normal'}
              isDisabled={valueType === 'normal'}
              onClick={() => onValueTypeChange('normal')}
            >
              <Icon name='inputTypeNormal' />
            </Button>
            <Button
              isPressed={valueType === 'candidate'}
              isDisabled={valueType === 'candidate'}
              onClick={() => onValueTypeChange('candidate')}
            >
              <Icon name='inputTypeCandidate' />
            </Button>
            <Button
              isPressed={valueType === 'pencil'}
              isDisabled={valueType === 'pencil'}
              onClick={() => onValueTypeChange('pencil')}
            >
              <Icon name='inputTypePencilMark' />
            </Button>
            <Button
              isPressed={valueType === 'color'}
              isDisabled={valueType === 'color'}
              onClick={() => onValueTypeChange('color')}
            >
              <Icon name='inputTypeColor' />
            </Button>
          </>
        )}
        main={(
          <>
            {([7, 8, 9, 4, 5, 6, 1, 2, 3] as Digit[]).map((index) => (
              <Button
                onClick={() => makeMove(selectedCells, valueType, index)}
                key={index}
              >
                {
                  valueType !== 'color'
                    ? index
                    : <ColorTile colorIndex={index} />
                }
              </Button>
            ))}
          </>
        )}
        footer={(
          <Button
            isFullWidth={true}
            onClick={() => makeMove(selectedCells, valueType, 0)}
          >
            Delete
          </Button>
        )}
      />
    </div>
  );
};
