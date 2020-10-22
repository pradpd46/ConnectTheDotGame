import { Point } from "../interfaces";
import { EMPTY_POINT, setCurrentPoint, visitedPoints, getPathPoints, edges , getAdjacentPoints, isValidEndPoint, endPoints} from "./point";

export const init = () => {
  setCurrentPoint(EMPTY_POINT);
}

export const isGridMoveValid = (from: Point, to: Point): boolean => (
  from.x === to.x || from.y === to.y || Math.abs(from.x - to.x) === Math.abs(from.y - to.y)
);

export const isPointVisited = (point: Point): boolean => (
  !!visitedPoints.find(visited => visited.x === point.x && visited.y === point.y)
);

export const isIntersecting = (from: Point, to: Point): boolean => {
  const points = getPathPoints(from, to);
  if (!points.length) {
    // check level-0 points
    return true;
  } else if (isEdgeIntersecting(from, to)) {
    return true;
  } else {
    return !points.every(p => {
      return !visitedPoints.find(visited =>
        visited.x === p.x
        && visited.y === p.y
      );
    });
  }
};

export const isEdgeIntersecting = (from: Point, to: Point): boolean => {
  if (from.x !== to.x && from.y !== to.y) {
    const xDelta = to.x > from.x ? 1 : -1;
    const yDelta = to.y > from.y ? 1 : -1;
    const p1 = { x: from.x + xDelta, y: from.y };
    const p2 = { x: from.x, y: from.y + yDelta };
    const coords1 = `${p1.x},${p1.y}|${p2.x},${p2.y}`;
    const coords2 = `${p2.x},${p2.y}|${p1.x},${p1.y}`;
    if (edges[coords1] || edges[coords2]) {
      return true;
    }
    return false;
  }
  return false;
}

export const isGameOver = () => {
  return !(
    getAdjacentPoints(endPoints[0]).some(node => isValidEndPoint(node, endPoints[0]))
    || getAdjacentPoints(endPoints[1]).some(node => isValidEndPoint(node, endPoints[1]))
  );
}