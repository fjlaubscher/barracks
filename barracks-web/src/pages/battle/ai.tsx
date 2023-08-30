import { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import { Button, Stack, Stat } from '@fjlaubscher/matter';
import { useParams } from 'react-router-dom';

// components
import CompleteRoundForm from '../../components/battle/complete-round-form';
import type { FormValues as CompleteRoundFormValues } from '../../components/battle/complete-round-form';
import Layout from '../../components/layout';
import OrderDie from '../../components/order-die';
import Stats from '../../components/stats';

// helpers
import { ARMY_NAME_MAPPING } from '../../helpers/data';
import { calculateOrderDice } from '../../helpers/list';

// hooks
import { useBattle } from '../../hooks/battle';
import { useBattleState } from '../../hooks/use-battle-state';
import { useList } from '../../hooks/list';

import styles from './battle.module.scss';

const AIBattle = () => {
  const { key } = useParams();
  const [initialOrderDice, setInitialOrderDice] = useState<CompleteRoundFormValues>({
    totalPlayerDice: 0,
    totalAiDice: 0
  });

  const { data: battle, loading: loadingBattle } = useBattle(key);
  const { data: playerList, loading: loadingPlayerList } = useList(battle?.playerListKey);
  const { data: aiList, loading: loadingAiList } = useList(
    battle?.isAIOpponent ? battle.opponentListKey : undefined
  );

  const playerDice = useMemo(() => calculateOrderDice(playerList), [playerList]);
  const aiDice = useMemo(() => calculateOrderDice(aiList), [aiList]);
  const { state, initialize, drawOrderDie, completeRound } = useBattleState();

  const loading = loadingBattle || loadingPlayerList || loadingAiList;

  const handleInitialize = useCallback(() => {
    setInitialOrderDice({ totalPlayerDice: playerDice, totalAiDice: aiDice });
    initialize(playerDice, aiDice);
  }, [setInitialOrderDice, playerDice, aiDice, initialize]);

  const handleCompleteRound = useCallback(
    ({ totalPlayerDice, totalAiDice }: CompleteRoundFormValues) => {
      setInitialOrderDice({ totalPlayerDice, totalAiDice });
      completeRound(totalPlayerDice, totalAiDice);
    },
    [setInitialOrderDice, completeRound]
  );

  return (
    <Layout
      title="Battle"
      description="Keep track of your battle with Barracks."
      isLoading={loading}
    >
      <Stack direction="column">
        {playerList && aiList && (
          <Stats className={styles.header}>
            <Stat
              title={ARMY_NAME_MAPPING[playerList.army]}
              value={playerList.name}
              description={
                initialOrderDice.totalPlayerDice
                  ? `Remaining Order Dice: ${state.diceBag.remainingPlayerDice}`
                  : undefined
              }
            />
            <Stat
              title={ARMY_NAME_MAPPING[aiList.army]}
              value={aiList.name}
              description={
                initialOrderDice.totalAiDice
                  ? `Remaining Order Dice: ${state.diceBag.remainingRaxDice}`
                  : undefined
              }
            />
          </Stats>
        )}
        {state.actor === 'RAX' && <OrderDie />}
        {state.actor === 'PLAYER' && (
          <div className={classnames(styles.orderDie, styles[state.actor.toLowerCase()])}>
            {state.actor}
          </div>
        )}
        {state.nextAction === 'INITIALIZE' && (
          <Button variant="success" onClick={handleInitialize}>
            Start
          </Button>
        )}
        {state.nextAction === 'DRAW_ORDER_DIE' && (
          <Button onClick={drawOrderDie}>Draw Order Die</Button>
        )}
        {state.nextAction === 'COMPLETE_ROUND' && (
          <CompleteRoundForm initialValues={initialOrderDice} onSubmit={handleCompleteRound} />
        )}
      </Stack>
    </Layout>
  );
};

export default AIBattle;
