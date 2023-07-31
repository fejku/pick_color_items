const scale = (points: number[]) => {
  const result: number[] = [];
  for (let i = 0; i < points.length; i++) {
    result.push(points[i] * 0.8 + 0.1);
  }
  return result;
};

export const draw = (
  ctx: any,
  width: number,
  height: number,
  points: number[][]
) => {
  ctx.beginPath();
  ctx.lineWidth = 20;
  // ctx.lineJoin = "round";
  ctx.lineCap = "round";
  for (const point of points) {
    const scaledPoints = scale(point);

    ctx.moveTo(scaledPoints[0] * width, scaledPoints[1] * height);

    ctx.bezierCurveTo(
      scaledPoints[2] * width,
      scaledPoints[3] * height,
      scaledPoints[4] * width,
      scaledPoints[5] * height,
      scaledPoints[6] * width,
      scaledPoints[7] * height
    );
  }
  ctx.stroke();
};
