import { useEffect, useMemo, useRef } from "react"
import * as d3 from "d3";
import { DefaultProps } from "../types/DefaultProps";

export default function OneDData(props: DefaultProps) {

  const d3Container = useRef<SVGSVGElement>(null);

  const data = useMemo(() => [10, 30, 40, 15, 100], [])

  useEffect(() => {
    if (!d3Container) return;

    const g = d3.select(d3Container.current)
      .selectAll("circle")
      .data(data)
      .join("circle");

    g.attr("fill", "steelblue")
      .attr("r", 10)
      .attr("cx", (d, i) => i * 50)
      .attr("cy", (d, i) => i * 50)

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