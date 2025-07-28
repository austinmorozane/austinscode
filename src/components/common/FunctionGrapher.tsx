// src/components/FunctionGrapher.tsx

import React, { useState } from "react";
import Plot from "react-plotly.js";
import { compile, range } from "mathjs";

type Mode = "function" | "fractal" ;

export const FunctionGrapher: React.FC = () => {
  const [mode, setMode] = useState<Mode>("function");
  const [expression, setExpression] = useState<string>("cos(x)");
  const [xValues, setXValues] = useState<number[]>([]);
  const [yValues, setYValues] = useState<number[]>([]);
  const [zValues, setZValues] = useState<number[][]>([]);

  const drawFunction = (exprText: string): void => {
    try {
      const expr = compile(exprText);
      const xs = range(-10, 10, 0.1).toArray() as number[];
      const ys = xs.map((x) => expr.evaluate({ x }));
      setXValues(xs);
      setYValues(ys);
      setZValues([]);
    } catch (err) {
      alert("Error in expression: " + err);
      console.error(err);
    }
  };





  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (mode === "function") {
      drawFunction(expression);
    } 
  };

  return (
    <>
      <a rel="noopener noreferrer" href="https://github.com/austinhutchen/austinscode/tree/master/src/components/common">
        <h2 className="hlight"> Function Graphing Engine (Typescript DESMOS clone)</h2>
      </a>
      <div className="projDesc">
        <div className="fadeSide">
          <p>A function plotting engine to graph 2-d functions and <a rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Mandelbrot_set">parametric fractals</a>using<a rel="noopener noreferrer" href="https://plotly.com/javascript/heatmaps/"> heatmap </a>.</p>
        </div>
      </div>

      <div
        style={{
          display: "inline-block",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: "2svw",
          border: "2px solid white",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Mode:{" "}
            <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
              <option value="function">Function</option>
            </select>
          </label>{" "}
          <br />
          {mode === "function" && (
            <label>
              f(x) ={" "}
              <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="e.g., sin(x) + x^2"
              />
            </label>
          )}
          <button type="submit">Plot</button>
        </form>

        <Plot
          data={
            mode === "function"
              ? [
                  {
                    x: xValues,
                    y: yValues,
                    type: "scatter",
                    mode: "lines",
                    marker: { color: "blue" },
                  },
                ]
              : [
                {} 
                ]
          }
          layout={{
            title:
              mode === "function"
                ? `Plot of f(x) = ${expression}`
                : " ",
            xaxis: { title: mode === "function" ? "x" : undefined },
            yaxis: { title: mode === "function" ? "f(x)" : undefined },
          }}
          style={{ width: "70svw", height: "60svh" }}
        />
      </div>
    </>
  );
};
