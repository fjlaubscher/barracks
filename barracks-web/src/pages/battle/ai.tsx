import { Button, Stack, Stat } from '@fjlaubscher/matter';
import { useParams } from 'react-router-dom';

// components
import Layout from '../../components/layout';

// helpers
import { calculateOrderDice } from '../../helpers/list';

// hooks
import { useBattle } from '../../hooks/battle';
import useBattleState from '../../hooks/use-battle-state';
import { useList } from '../../hooks/list';
import { useMemo } from 'react';

const AIBattle = () => {
  const { key } = useParams();

  const { data: battle, loading: loadingBattle } = useBattle(key);
  const { data: playerList, loading: loadingPlayerList } = useList(battle?.playerListKey);
  const { data: aiList, loading: loadingAiList } = useList(
    battle?.isAIOpponent ? battle.opponentListKey : undefined
  );

  const playerDice = useMemo(() => calculateOrderDice(playerList), [playerList]);
  const aiDice = useMemo(() => calculateOrderDice(aiList), [aiList]);
  const { state, drawDice, initialize } = useBattleState();

  const loading = loadingBattle || loadingPlayerList || loadingAiList;

  return (
    <Layout
      title="Battle"
      description="Keep track of your battle with Barracks."
      isLoading={loading}
    >
      <Stack direction="column">
        <Stat title={`Round ${state.round}`} value={state.active || 'NONE'} />
        {state.diceBag.length ? (
          <Button onClick={() => drawDice()}>Draw Dice</Button>
        ) : (
          <Button onClick={() => initialize(playerDice, aiDice)}>End Round</Button>
        )}
      </Stack>
    </Layout>
  );
};

export default AIBattle;
