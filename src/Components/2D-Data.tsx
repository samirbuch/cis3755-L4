import { useEffect, useMemo, useRef } from "react"
import * as d3 from "d3";
import { DefaultProps } from "../types/DefaultProps";

export default function TwoDData(props: DefaultProps) {

  const d3Container = useRef<SVGSVGElement>(null);

  const data = useMemo(() => [
    { name: 'London', population: 8674000 },
    { name: 'New York', population: 8406000 },
    { name: 'Sydney', population: 4293000 },
    { name: 'Paris', population: 2244000 },
    { name: 'Beijing', population: 11510000 }
  ], [])

  useEffect(() => {
    if (!d3Container) return;

    const g = d3.select(d3Container.current)
      .selectAll("rect")
      .data(data)
      .join("rect");

    g.attr("fill", "steelblue")
      .attr("height", (d: typeof data[0]) => d.population / 1_000_000)
      .attr("width", (d: typeof data[0]) => d.population / 1_000_000)
      .attr("x", (d, i) => i * 50)
      .attr("y", (d, i) => i * 50)

    g.attr("transform", "translate(50, 50)");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d3Container]);

  return (
    <svg
      ref={d3Container}
      height={props.height}
      width={props.width}
    />
  )
}
