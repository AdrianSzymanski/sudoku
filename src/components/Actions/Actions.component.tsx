import { useStore, type PuzzleValueType } from '@store';
import { Button, NumberPad } from '@ui';

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
    <NumberPad
      side={(
        <>
          <Button
            isPressed={valueType === 'normal'}
            isDisabled={valueType === 'normal'}
            onClick={() => onValueTypeChange('normal')}
          >
            Normal
          </Button>
          <Button
            isPressed={valueType === 'candidate'}
            isDisabled={valueType === 'candidate'}
            onClick={() => onValueTypeChange('candidate')}
          >
            Candidate
          </Button>
          <Button
            isPressed={valueType === 'pencil'}
            isDisabled={valueType === 'pencil'}
            onClick={() => onValueTypeChange('pencil')}
          >
            Pencil
          </Button>
          <Button
            isPressed={valueType === 'color'}
            isDisabled={valueType === 'color'}
            onClick={() => onValueTypeChange('color')}
          >
            Color
          </Button>
        </>
      )}
      main={(
        <>
          <Button onClick={() => makeMove(selectedCells, valueType, 7)}>7</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 8)}>8</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 9)}>9</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 4)}>4</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 5)}>5</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 6)}>6</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 1)}>1</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 2)}>2</Button>
          <Button onClick={() => makeMove(selectedCells, valueType, 3)}>3</Button>
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
  );
};
