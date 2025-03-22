interface SVGPathElement {
  getTotalLength(): number;
  getPointAtLength(length: number): DOMPoint;
}

interface DOMPoint {
  x: number;
  y: number;
}

// iteratively search a path to get a point close to a desired x coordinate
export function findY (
  path: SVGPathElement,
  pathLength: number,
  x: number,
  width: number
): number {
  const accuracy = 1 // px
  const iterations = Math.ceil(
    Math.log10(accuracy / width) / Math.log10(0.5)
  ) // for width (w), get the # iterations to get to the desired accuracy, generally 1px

  let nextLengthChange = pathLength / 2
  let nextLength = pathLength / 2
  let y = 0

  for (let i = 0; i < iterations; i++) {
    const pos = path.getPointAtLength(nextLength)
    y = pos.y
    nextLength = x < pos.x
      ? nextLength - nextLengthChange
      : nextLength + nextLengthChange
    nextLengthChange = nextLengthChange / 2
  }

  return y
}
