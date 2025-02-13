import * as d3 from "d3";
import { useLayoutEffect, useRef } from "react";
import { DefaultProps } from "../types/DefaultProps";

export default function Activity2(props: DefaultProps) {

  const d3Ref = useRef<SVGSVGElement>(null);

  function getData() {
    let data = [];
    let itemSize = 0;

    for (let i = 0; i < 10; i++) {
      itemSize = Math.ceil(Math.random() * 5) * 10;
      data.push(itemSize);
    }
    return data;
  }

  function update(data: ReturnType<typeof getData>) {
    d3.select(d3Ref.current)
      .selectAll("circle")
      .data(data)
      .join(
        function(enter) {
          return enter.append("circle").style("opacity", 0.25);
        },
        function(update) {
          return update.style("opacity", 1);
        }
      )
      .attr("cx", (d, i) => i * 100)
      .attr("cy", 50)
      .attr("r", (d: number) => 0.5 * d)
      .style("fill", "orange");
  }

  function updateAll() {
    const newData = getData();
    update(newData);
  }

  useLayoutEffect(() => {
    // Init data
    updateAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: props.height, width: props.width }}>
      <svg ref={d3Ref} height={props.height} width={props.width} /> 
      <button onClick={() => updateAll()}>Click me!</button>
    </div>
  )
}