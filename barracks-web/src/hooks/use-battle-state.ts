import { useCallback, useMemo, useReducer } from 'react';

type BattleState = {
  round: number;
  diceBag: string[];
  actor: 'PLAYER' | 'RAX' | 'NONE';
};

type BattleAction = {
  type: 'INITIALIZE' | 'DRAW_ORDER_DIE' | 'COMPLETE_ROUND';
  payload?: CompleteRoundPayload;
};

type CompleteRoundPayload = {
  totalPlayerDice: number;
  totalAiDice: number;
};

type BattleStateReducer = (state: BattleState, action: BattleAction) => BattleState;

const INITIAL_STATE: BattleState = {
  actor: 'NONE',
  diceBag: [],
  round: 0
};

const reducer: BattleStateReducer = (state, action) => {
  console.log(`🪖 RAX 🪖: ${action.type}`, action.payload);

  switch (action.type) {
    case 'INITIALIZE':
      return {
        actor: 'NONE',
        diceBag: fillDiceBag(action.payload?.totalPlayerDice, action.payload?.totalAiDice),
        round: 1
      };
    case 'DRAW_ORDER_DIE':
      const newDiceBag = [...state.diceBag];
      const index = Math.floor(Math.random() * newDiceBag.length);
      const active = newDiceBag[index] as BattleState['actor'];
      newDiceBag.splice(index, 1);

      return { ...state, actor: active, diceBag: newDiceBag };
    case 'COMPLETE_ROUND':
      const payload = action.payload as CompleteRoundPayload;

      return {
        ...state,
        actor: 'NONE',
        diceBag: fillDiceBag(action.payload?.totalPlayerDice, action.payload?.totalAiDice),
        round: state.round + 1
      };
    default:
      return state;
  }
};

const fillDiceBag = (totalPlayerDice: number = 0, totalAiDice: number = 0) => {
  if (totalPlayerDice === 0 && totalAiDice === 0) return [];

  const diceBag: string[] = [];

  for (let i = 0; i < totalPlayerDice; i++) {
    diceBag.push('PLAYER');
  }

  for (let i = 0; i < totalAiDice; i++) {
    diceBag.push('RAX');
  }

  return diceBag
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const getNextAction = (state: BattleState): BattleAction['type'] => {
  if (state.round === 0) {
    return 'INITIALIZE';
  }

  if (state.diceBag.length === 0) {
    return 'COMPLETE_ROUND';
  }

  return 'DRAW_ORDER_DIE';
};

const useBattleState = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleInitialize = useCallback(
    (totalPlayerDice: number, totalAiDice: number) => {
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

  const memoedState = useMemo(() => {
    return {
      actor: state.actor,
      round: state.round,
      diceBag: {
        dice: state.diceBag,
        player: state.diceBag.filter((d) => d === 'PLAYER').length,
        rax: state.diceBag.filter((d) => d === 'RAX').length
      },
      nextAction: getNextAction(state)
    };
  }, [state]);

  return {
    state: memoedState,
    drawOrderDie: handleDrawDice,
    completeRound: handleCompleteRound,
    initialize: handleInitialize
  };
};

export default useBattleState;
