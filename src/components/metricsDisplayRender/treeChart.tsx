import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TreeChartProps {
  queries: { [key: string]: string[] };
}

interface TreeNode {
  name: string;
  children?: TreeNode[];
  x?: number;
  y?: number;
}

// Define HierarchyLink interface
interface HierarchyLink<Datum> {
  source: d3.HierarchyNode<Datum>;
  target: d3.HierarchyNode<Datum>;
}

function modifyQuery(query: string): string {
  let firstIndex = 0;
  if (query.indexOf('<') !== -1) {
    firstIndex = query.indexOf('<');
  } else firstIndex = query.indexOf('"');

  return query.slice(firstIndex + 1, query.length - 2);
}

const createData = ({ queries }: TreeChartProps) => {
  if (!queries || Object.keys(queries).length === 0) {
    return { name: 'User', children: [] };
  }

  return {
    name: 'USER',
    children: Object.entries(queries).map(([key, queryArray]) => ({
      name: key.toUpperCase(),
      children: queryArray.map((query: string) => ({
        name: modifyQuery(query),
      })),
    })),
  };
};

const TreeChart: React.FC<TreeChartProps> = ({ queries }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const data = createData({ queries });

  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove();
    const chart = () => {
      const width = 1500;

      const root = d3.hierarchy<TreeNode>(data);
      if (!root.children) {
        console.error('No children in the tree root:', root);
        return;
      }
      const dx = 27;
      const dy = width / (root.height + 7);
      const tree = d3.cluster<TreeNode>().nodeSize([dx, dy]);

      root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
      tree(root);

      let x0 = Infinity;
      let x1 = -x0;
      root.each((d) => {
        if (d.x !== undefined) {
          if (d.x > x1) x1 = d.x;
          if (d.x < x0) x0 = d.x;
        }
      });

      const height = Math.min(x1 - x0 + dx * 2);

      const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-dy / 3.5, x0 - dx, width, height])
        .attr('style', 'max-width: 100%; height: auto; font: 13px sans-serif;');

      const linkGenerator = d3
        .linkHorizontal()
        .x((d) => (d as unknown as d3.HierarchyNode<TreeNode>).y ?? 0)
        .y((d) => (d as unknown as d3.HierarchyNode<TreeNode>).x ?? 0);

      svg
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#fff')
        .attr('stroke-opacity', 0.3)
        .attr('stroke-width', 1)
        .selectAll('path')
        .data(root.links() as HierarchyLink<TreeNode>[])
        .join('path')
        .attr('d', linkGenerator as unknown as string);

      const node = svg
        .append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll()
        .data(root.descendants())
        .join('g')
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      node
        .append('circle')
        .attr('fill', (d) => (d.children ? '#555' : '#03A062'))
        .attr('r', 2.5);

      node
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', (d) => (d.children ? -6 : 6))
        .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
        .text((d) => d.data.name)
        .attr('fill', '#03A062')
        .attr('paint-order', 'stroke');

      return svg.node() as SVGSVGElement;
    };

    const svg = chart();
    if (svg) {
      ref.current?.appendChild(svg);
    }
  }, [data]);

  return (
    <div style={{ overflow: 'auto', maxWidth: '100%', maxHeight: '1340px' }}>
      <div ref={ref}></div>
    </div>
  );
};

export default TreeChart;
