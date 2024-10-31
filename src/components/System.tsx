import '../css/system.css';
import { QueryDisplay } from './metricsDisplayRender/queryDisplay';
import { QueryEditor } from './metricsDisplayRender/queryEditor';

interface SystemProps {
  queries: { [key: string]: string[] };
  setQueries: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
  updateLocalStorageQueries: (queries: { [key: string]: string[] }) => void;
}

const System: React.FC<SystemProps> = ({
  queries,
  setQueries,
  updateLocalStorageQueries,
}) => {
  return (
    <div className='system'>
      <QueryDisplay queries={queries} />
      <QueryEditor
        queries={queries}
        setQueries={setQueries}
        updateLocalStorageQueries={updateLocalStorageQueries}
      />
    </div>
  );
};

export default System;
