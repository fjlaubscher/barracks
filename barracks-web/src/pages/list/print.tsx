import { useParams } from 'react-router-dom';
import { Loader } from '@fjlaubscher/matter';

// components
import PrintList from '../../components/list/print';

// hooks
import { useArmy } from '../../hooks/army';
import { useCore } from '../../hooks/core';
import { useList } from '../../hooks/list';

const PrintListPage = () => {
  const { key } = useParams();

  const { data: core, loading: loadingCore } = useCore();
  const { data: list, loading: loadingList } = useList(key);
  const { army, loading: loadingArmy } = useArmy(list?.army);

  const isLoading = loadingArmy || loadingCore || loadingList;

  return isLoading ? <Loader /> : <PrintList army={army} core={core} list={list} />;
};

export default PrintListPage;
