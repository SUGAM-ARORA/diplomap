```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import type { Alliance } from '$lib/types';

  export let alliances: Alliance[] = [];

  let svg: SVGSVGElement;
  let width = 800;
  let height = 600;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  onMount(() => {
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Process data
    const nodes: any[] = [];
    const links: any[] = [];

    alliances.forEach(alliance => {
      // Add alliance as node
      nodes.push({
        id: alliance.name,
        type: 'alliance',
        group: alliance.type
      });

      // Add member countries as nodes and create links
      alliance.members.forEach(member => {
        if (!nodes.find(n => n.id === member)) {
          nodes.push({
            id: member,
            type: 'country',
            group: 'member'
          });
        }
        links.push({
          source: alliance.name,
          target: member,
          value: alliance.strength
        });
      });
    });

    // Create SVG elements
    const svg = d3.select(svg);

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.value))
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', d => d.type === 'alliance' ? 10 : 5)
      .attr('fill', d => color(d.group))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('title')
      .text(d => d.id);

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force<d3.ForceLink<any, any>>('link')
      .links(links);

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  });
</script>

<div class="w-full h-full overflow-hidden">
  <svg
    bind:this={svg}
    {width}
    {height}
    class="w-full h-full"
    viewBox="0 0 {width} {height}"
  ></svg>
</div>
```