import * as d3 from "d3";
import { useLayoutEffect, useMemo, useRef } from "react";
import { DefaultProps } from "../types/DefaultProps";
import { Car } from "../types/Car";

interface Activity2Props extends DefaultProps {
  data: Car[]
}
export default function Activity2(props: Activity2Props) {

  const d3Ref = useRef<SVGSVGElement>(null);

  const scale = useMemo(() => d3.scaleLinear(), []);
  const axis = useMemo(() => d3.axisBottom(scale), [scale]);

  function createVis() {
    if (!d3Ref.current) return;

    d3.select(d3Ref.current)
      .selectAll("circle")
      .data(props.data)
      .join(
        function (enter) {
          return enter.append("circle").style("opacity", 0.25)
        },
        function (update) {
          return update.style("opacity", 1)
        }
      )
      .attr("cx", (d, i) => scale(i * 10))
      .attr("cy", 50)
      .attr("r", (d: Car) => d.hwy * 0.5)
      .style("fill", "blue");

    d3.select(d3Ref.current)
      .append("g")
      .transition()
      .call(axis).attr("transform", "translate(0,90)");
  }

  useLayoutEffect(() => {
    createVis();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <div style={{ height: props.height, width: props.width }}>
      <svg ref={d3Ref} height={props.height} width={props.width} />
      <button onClick={() => createVis()}>Click me!</button>
    </div>
  )
}