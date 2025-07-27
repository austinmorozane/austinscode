// src/components/FunctionGrapher.tsx

import React, { useState } from "react";
import Plot from "react-plotly.js";
import { compile, range } from "mathjs";

type Mode = "function" | "mandelbrot" ;

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

  const drawMandelbrot = (): void => {
    const xMin = -2,
      xMax = 1,
      yMin = -1.5,
      yMax = 1.5;
    const width = 400;
    const height = 400;
    const maxIter = 50;

    const xs: number[] = Array.from({ length: width }, (_, i) => xMin + ((xMax - xMin) * i) / width);
    const ys: number[] = Array.from({ length: height }, (_, j) => yMin + ((yMax - yMin) * j) / height);
    const data: number[][] = [];

    for (let j = 0; j < height; j++) {
      const row: number[] = [];
      for (let i = 0; i < width; i++) {
        let x0 = xs[i];
        let y0 = ys[j];
        let x = 0,
          y = 0,
          iter = 0;
        while (x * x + y * y <= 4 && iter < maxIter) {
          const xtemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xtemp;
          iter++;
        }
        row.push(iter);
      }
      data.push(row);
    }

    setXValues(xs);
    setYValues(ys);
    setZValues(data);
  };



  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (mode === "function") {
      drawFunction(expression);
    } else if (mode === "mandelbrot") {
      drawMandelbrot();
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
              <option value="mandelbrot">Mandelbrot Set</option>
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
                  {
                    z: zValues,
                    type: "heatmap",
                    colorscale: "Viridis",
                    showscale: false,
                  },
                ]
          }
          layout={{
            title:
              mode === "function"
                ? `Plot of f(x) = ${expression}`
                : mode === "mandelbrot"
                ? "Mandelbrot Set"
                : " ",
            xaxis: { title: mode === "function" ? "x" : undefined },
            yaxis: { title: mode === "function" ? "f(x)" : undefined },
          }}
          style={{ width: "80svw", height: "60svh" }}
        />
      </div>
    </>
  );
};
