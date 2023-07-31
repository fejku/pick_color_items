"use client";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { draw } from "../consts/draw_helpers";
import { LETTER_BIG_A } from "../consts/letter";

interface Point {
  x: number;
  y: number;
}

const punkty: Point[] = [];
let punktyIndeks = 0;

const scalePoint = (point: Point, scale: number): Point => {
  return {
    x: point.x * scale + (1 - scale) / 2,
    y: point.y * scale + (1 - scale) / 2,
  };
};

const scaleCurves = (
  curves: Point[][],
  width: number,
  height: number,
  scale: number
) => {
  const result = [];
  for (const curve of curves) {
    const newCurve = [];
    for (const point of curve) {
      const scaledPoint = scalePoint({ x: point.x, y: point.y }, scale);
      const newPoint = { x: scaledPoint.x * width, y: scaledPoint.y * height };
      newCurve.push(newPoint);
    }
    result.push(newCurve);
  }
  console.log(curves, result);
  return result;
};

const setPoints = (curves: Point[][]) => {
  for (const curve of curves) {
    for (let t = 0; t <= 1; t = t + 0.01) {
      const x =
        Math.pow(1 - t, 3) * curve[0].x +
        3 * Math.pow(1 - t, 2) * t * curve[1].x +
        3 * (1 - t) * Math.pow(t, 2) * curve[2].x +
        Math.pow(t, 3) * curve[3].x;
      const y =
        Math.pow(1 - t, 3) * curve[0].y +
        3 * Math.pow(1 - t, 2) * t * curve[1].y +
        3 * (1 - t) * Math.pow(t, 2) * curve[2].y +
        Math.pow(t, 3) * curve[3].y;
      punkty.push({ x, y });
    }
  }
  console.log(punkty);
};

export default function Home() {
  let isMouseDown = false;
  const canvas = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D | null = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle: HTMLCanvasElement = canvas.current!;
    const width = canvasEle.clientWidth;
    canvasEle.width = width;
    const height = canvasEle.clientHeight;
    canvasEle.height = height;
    console.log(canvasEle.width, canvasEle.height);
    // get context of the canvas
    ctx = canvasEle.getContext("2d")!;

    // draw(ctx, width, height, LETTER_BIG_A);
    // const { x, y } = ustawPunkty(width, height, LETTER_BIG_A);
    // console.log(x, y);
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = "rgba(255, 0, 0, 1)";
    // ctx.lineCap = "round";
    // ctx.fillStyle = "rgba(255, 255, 0, 1)";
    // ctx.arc(x, y, 10, 0, 2 * Math.PI);
    // // ctx.arc(0.1 * width, 0.9 * height, 10, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fill();

    const curves = scaleCurves(LETTER_BIG_A, width, height, 0.8);
    setPoints(curves);
    for (const punkt of punkty) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.lineCap = "round";
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      ctx.arc(punkt.x, punkt.y, 10, 0, 2 * Math.PI);
      // ctx.arc(0.1 * width, 0.9 * height, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log("handleMouseDown");
    isMouseDown = true;

    if (ctx) {
      console.log("handleMouseDown 1");
      if (punktyIndeks < punkty.length) {
        console.log("handleMouseDown 2");
        const cursorX = e.clientX - e.currentTarget.offsetLeft;
        const cursorY = e.clientY - -e.currentTarget.offsetTop;

        if (
          Math.abs(punkty[punktyIndeks].x - cursorX) <= 10 &&
          Math.abs(punkty[punktyIndeks].y - cursorY) <= 10
        ) {
          console.log("handleMouseDown 3");
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(0, 255, 0, 1)";
          ctx.lineCap = "round";
          ctx.fillStyle = "rgba(0, 255, 0, 1)";
          ctx.arc(
            punkty[punktyIndeks].x,
            punkty[punktyIndeks].y,
            10,
            0,
            2 * Math.PI
          );
          // ctx.arc(0.1 * width, 0.9 * height, 10, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fill();
          punktyIndeks++;
        } else {
          punktyIndeks = 0;
        }
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log("handleMouseUp");
    isMouseDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isMouseDown) {
      // console.log(
      //   "handleMouseMove",
      //   e.clientX - e.currentTarget.offsetLeft,
      //   e.clientY - -e.currentTarget.offsetTop
      // );
      // console.log(e.currentTarget.getBoundingClientRect());
      if (ctx) {
        // console.log("handleMouseMove 1");
        if (punktyIndeks < punkty.length) {
          // console.log("handleMouseMove 2");
          const cursorX = e.clientX - e.currentTarget.offsetLeft;
          const cursorY = e.clientY - -e.currentTarget.offsetTop;
          const distance = Math.sqrt(
            Math.pow(punkty[punktyIndeks].x - cursorX, 2) +
              Math.pow(punkty[punktyIndeks].y - cursorY, 2)
          );
          console.log(distance, punktyIndeks);
          if (distance <= 20) {
            if (distance <= 10) {
              // console.log("handleMouseMove 3");
              ctx.beginPath();
              ctx.lineWidth = 1;
              ctx.strokeStyle = "rgba(0, 255, 0, 1)";
              ctx.lineCap = "round";
              ctx.fillStyle = "rgba(0, 255, 0, 1)";
              ctx.arc(
                punkty[punktyIndeks].x,
                punkty[punktyIndeks].y,
                10,
                0,
                2 * Math.PI
              );
              // ctx.arc(0.1 * width, 0.9 * height, 10, 0, 2 * Math.PI);
              ctx.stroke();
              ctx.fill();
              punktyIndeks++;
            }
          } else {
            punktyIndeks = 0;
          }
        }
      }
    }
  };

  return (
    <canvas
      className=" bg-red-200 qwe"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={canvas}
    >
      {/* asd */}
    </canvas>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">app/page.tsx</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Docs{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Learn{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Templates{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Explore the Next.js 13 playground.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`mb-3 text-2xl font-semibold`}>
    //         Deploy{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  );
}
