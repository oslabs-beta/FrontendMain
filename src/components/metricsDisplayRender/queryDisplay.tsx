import TreeChart from './treeChart';

interface QueryDisplayProps {
  queries: { [key: string]: string[] };
}

export function QueryDisplay({ queries }: QueryDisplayProps) {
  return (
    <div className='queryDisplay-container'>
      <div
        style={{
          background: '#303030',
          height: '100vh',
          borderRadius: '7px',
          border: '0.1px solid rgba(171, 171, 171, 0.25)',
        }}
      >
        <TreeChart queries={queries} />
      </div>
    </div>
  );
}
