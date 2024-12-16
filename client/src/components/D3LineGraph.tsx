import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  time: string;
  rate: number;
  moisture: number;
}

const D3LineGraph: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data.length === 0) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Define scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.time)) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.rate) || 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const lineRate = d3
      .line<DataPoint>()
      .x((d) => xScale(new Date(d.time)))
      .y((d) => yScale(d.rate))
      .curve(d3.curveMonotoneX);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((d: any) => d3.timeFormat("%H:%M:%S")(new Date(d)))
      )

      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineRate(data));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default D3LineGraph;
