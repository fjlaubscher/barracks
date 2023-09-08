import { useCallback, useMemo, useReducer } from 'react';

type BattleState = {
  round: number;
  diceBag: string[];
  actor: 'PLAYER' | 'RAX' | 'NONE';
};

type DrawOrderDiePayload = {
  diceBag: string[];
  actor: BattleState['actor'];
};

type CompleteRoundPayload = {
  totalPlayerDice: number;
  totalRaxDice: number;
};

type BattleAction = {
  type: 'INITIALIZE' | 'DRAW_ORDER_DIE' | 'COMPLETE_ROUND';
  payload?: CompleteRoundPayload | DrawOrderDiePayload;
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
        diceBag: fillDiceBag(action.payload as CompleteRoundPayload),
        round: 1
      };
    case 'DRAW_ORDER_DIE':
      return { ...state, ...action.payload };
    case 'COMPLETE_ROUND':
      return {
        ...state,
        actor: 'NONE',
        diceBag: fillDiceBag(action.payload as CompleteRoundPayload),
        round: state.round + 1
      };
    default:
      return state;
  }
};

const fillDiceBag = ({ totalPlayerDice, totalRaxDice }: CompleteRoundPayload) => {
  if (!totalPlayerDice && !totalRaxDice) return [];

  const diceBag: string[] = [];

  for (let i = 0; i < totalPlayerDice; i++) {
    diceBag.push('PLAYER');
  }

  for (let i = 0; i < totalRaxDice; i++) {
    diceBag.push('RAX');
  }

  return diceBag;
};

const shuffleDiceBag = (diceBag: string[]) =>
  diceBag
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const getNextAction = (state: BattleState): BattleAction['type'] => {
  if (state.round === 0) {
    return 'INITIALIZE';
  }

  if (state.diceBag.length === 0) {
    return 'COMPLETE_ROUND';
  }

  return 'DRAW_ORDER_DIE';
};

export const useBattleState = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleInitialize = useCallback(
    (totalPlayerDice: number, totalRaxDice: number) => {
      dispatch({ type: 'INITIALIZE', payload: { totalPlayerDice, totalRaxDice } });
    },
    [dispatch]
  );

  const handleDrawDice = useCallback(() => {
    const diceBag = shuffleDiceBag([...state.diceBag]);
    const actor = diceBag[0] as BattleState['actor'];
    diceBag.splice(0, 1);

    dispatch({ type: 'DRAW_ORDER_DIE', payload: { diceBag, actor } });
  }, [state, dispatch]);

  const handleCompleteRound = useCallback(
    (totalPlayerDice: number, totalRaxDice: number) => {
      dispatch({ type: 'COMPLETE_ROUND', payload: { totalPlayerDice, totalRaxDice } });
    },
    [dispatch]
  );

  const memoedState = useMemo(() => {
    const remainingPlayerDice = state.diceBag.filter((d) => d === 'PLAYER').length;
    const remainingRaxDice = state.diceBag.length - remainingPlayerDice;

    return {
      actor: state.actor,
      round: state.round,
      diceBag: {
        dice: state.diceBag,
        remainingPlayerDice,
        remainingRaxDice
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
