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
  const {
    puzzlePastMoves,
    puzzleFutureMoves,
    makeMove,
    undoMove,
    redoMove,
  } = useStore(state => state);

  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '16px', marginRight: '32px' }}>
        <Button
          isDisabled={puzzlePastMoves.length === 0}
          onClick={undoMove}
        >
          Undo
        </Button>
        <Button
          isDisabled={puzzleFutureMoves.length === 0}
          onClick={redoMove}
        >
          Redo
        </Button>
      </div>
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
              isPressed={valueType === 'pencil'}
              isDisabled={valueType === 'pencil'}
              onClick={() => onValueTypeChange('pencil')}
            >
              Pencil
            </Button>
            <Button
              isPressed={valueType === 'candidate'}
              isDisabled={valueType === 'candidate'}
              onClick={() => onValueTypeChange('candidate')}
            >
              Candidate
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
            {/* @TODO: only call makeMove when there is data difference */}
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
    </>
  );
};
