import { useCallback, useReducer } from 'react';

type BattleState = {
  round: number;
  diceBag: string[];
  active: 'PLAYER' | 'AI' | undefined;
};

type BattleAction = {
  type: 'INITIALIZE' | 'DRAW_ORDER_DIE' | 'COMPLETE_ROUND' | 'COMPLETE_BATTLE';
  payload?: CompleteRoundPayload;
};

type CompleteRoundPayload = {
  totalPlayerDice: number;
  totalAiDice: number;
};

type BattleStateReducer = (state: BattleState, action: BattleAction) => BattleState;

const reducer: BattleStateReducer = (state, action) => {
  switch (action.type) {
    case 'DRAW_ORDER_DIE':
      const newDiceBag = [...state.diceBag];
      const index = Math.floor(Math.random() * newDiceBag.length);
      const active = newDiceBag[index] as 'PLAYER' | 'AI';
      newDiceBag.splice(index, 1);

      return { ...state, active, diceBag: newDiceBag };
    case 'INITIALIZE':
    case 'COMPLETE_ROUND':
      const { totalPlayerDice, totalAiDice } = action.payload as CompleteRoundPayload;

      return {
        ...state,
        active: undefined,
        diceBag: fillDiceBag(totalPlayerDice, totalAiDice),
        round: state.round + 1
      };
    case 'COMPLETE_BATTLE':
      return { ...state };
    default:
      return state;
  }
};

const fillDiceBag = (totalPlayerDice: number, totalAiDice: number) => {
  const diceBag: string[] = [];

  for (let i = 0; i < totalPlayerDice; i++) {
    diceBag.push('PLAYER');
  }

  for (let i = 0; i < totalAiDice; i++) {
    diceBag.push('AI');
  }

  return diceBag
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const useBattleState = () => {
  const [state, dispatch] = useReducer(reducer, {
    round: 0,
    diceBag: [],
    active: undefined
  });

  const handleInitialize = useCallback(
    (totalPlayerDice: number, totalAiDice: number) => {
      console.log('initializing');
      dispatch({ type: 'INITIALIZE', payload: { totalPlayerDice, totalAiDice } });
    },
    [dispatch]
  );

  const handleDrawDice = useCallback(() => {
    dispatch({ type: 'DRAW_ORDER_DIE' });
  }, [dispatch]);

  const handleCompleteRound = useCallback(
    (totalPlayerDice: number, totalAiDice: number) => {
      dispatch({ type: 'COMPLETE_ROUND', payload: { totalPlayerDice, totalAiDice } });
    },
    [dispatch]
  );

  return {
    state,
    drawDice: handleDrawDice,
    completeRound: handleCompleteRound,
    initialize: handleInitialize
  };
};

export default useBattleState;
