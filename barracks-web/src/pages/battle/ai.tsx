import { useMemo } from 'react';
import classnames from 'classnames';
import { Button, Stack, Stat } from '@fjlaubscher/matter';
import { useParams } from 'react-router-dom';

// components
import CompleteRoundForm from '../../components/battle/complete-round-form';
import Layout from '../../components/layout';

// helpers
import { calculateOrderDice } from '../../helpers/list';

// hooks
import { useBattle } from '../../hooks/battle';
import useBattleState from '../../hooks/use-battle-state';
import { useList } from '../../hooks/list';

import styles from './battle.module.scss';

const AIBattle = () => {
  const { key } = useParams();

  const { data: battle, loading: loadingBattle } = useBattle(key);
  const { data: playerList, loading: loadingPlayerList } = useList(battle?.playerListKey);
  const { data: aiList, loading: loadingAiList } = useList(
    battle?.isAIOpponent ? battle.opponentListKey : undefined
  );

  const playerDice = useMemo(() => calculateOrderDice(playerList), [playerList]);
  const aiDice = useMemo(() => calculateOrderDice(aiList), [aiList]);
  const { state, initialize, drawOrderDie, completeRound } = useBattleState();

  const loading = loadingBattle || loadingPlayerList || loadingAiList;

  return (
    <Layout
      title="Battle"
      description="Keep track of your battle with Barracks."
      isLoading={loading}
    >
      <Stack direction="column">
        <Stat title={`Round ${state.round}`} value={state.actor} />
        {state.nextAction === 'INITIALIZE' && (
          <Button variant="success" onClick={() => initialize(playerDice, aiDice)}>
            Start
          </Button>
        )}
        {state.nextAction === 'DRAW_ORDER_DIE' && (
          <>
            <div
              className={styles.diceBag}
              style={{ gridTemplateColumns: `repeat(${state.diceBag.dice.length}, 4rem)` }}
            >
              {state.diceBag.dice.map((d, i) => (
                <div
                  key={`order-die-${i}`}
                  className={classnames(
                    styles.orderDie,
                    i === 0 ? styles[state.actor.toLowerCase()] : undefined
                  )}
                >
                  {i === 0 && state.actor !== 'NONE' ? state.actor : ''}
                </div>
              ))}
            </div>
            <Button variant="info" onClick={() => drawOrderDie()}>
              Draw Order Die
            </Button>
          </>
        )}
        {state.nextAction === 'COMPLETE_ROUND' && (
          <CompleteRoundForm
            initialValues={{ totalAiDice: aiDice, totalPlayerDice: playerDice }}
            onSubmit={(values) => completeRound(values.totalPlayerDice, values.totalAiDice)}
          />
        )}
      </Stack>
    </Layout>
  );
};

export default AIBattle;
