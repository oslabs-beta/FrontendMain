import '../css/system.css';
import { QueryDisplay } from './metricsDisplayRender/queryDisplay';
import { QueryEditor } from './metricsDisplayRender/queryEditor';

interface SystemProps {
  queries: { [key: string]: string[] };
  setQueries: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

const System: React.FC<SystemProps> = ({ queries, setQueries }) => {
  return (
    <div className='system'>
      <QueryDisplay queries={queries}/>
      <QueryEditor queries={queries} setQueries={setQueries} />
    </div>
  );
};

export default System;
