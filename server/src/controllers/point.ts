import { Point } from '../interfaces';
import { isGridMoveValid, isPointVisited, isIntersecting } from './rules';

let currentPoint: Point;

export const EMPTY_POINT: Point = { x: -1, y: -1 };
export const visitedPoints: Point[] = [];
export let endPoints: Point[] = [];
export const edges: { [key: string]: boolean } = {};

export const getCurrentPoint = (): Point => {
  return currentPoint;
}

export const setCurrentPoint = (point: Point): void => {
  currentPoint = point;
}

export const isValidStartPoint = (point: Point): boolean => {
  if (!endPoints.length || endPoints.find(end => end.x === point.x && end.y === point.y)) {
    return true;
  }
  return false;
};

export const isValidEndPoint = (point: Point, start: Point = getCurrentPoint()): boolean => {
  if (!isPointVisited(point) && isGridMoveValid(start, point) && !isIntersecting(start, point)) {
    return true
  }
  return false;
}

export const processStartPoint = (point: Point): void => {
  setCurrentPoint(point);
}

export const processEndPoint = (point: Point): void => {
  if (!endPoints.length) {
    visitedPoints.push(currentPoint);
    endPoints.push(currentPoint);
  } else {
    // Remove the old end point
    endPoints = endPoints.filter(n => !(n.x === currentPoint.x && n.y === currentPoint.y));
  }
  // Add the new end point
  endPoints.push(point);
  // Add the intermediate points
  getPathPoints(currentPoint, point)
    .forEach(p => visitedPoints.push(p));
  // Set the active node to empty
  setCurrentPoint(EMPTY_POINT);
}

export const addEdge = (p1: Point, p2: Point): void => {
  const coords = `${p1.x},${p1.y}|${p2.x},${p2.y}`;
  edges[coords] = true;
}

export const getPathPoints = (from: Point, to: Point): Point[] => {
  const points = [];
  const xDelta = to.x > from.x ? 1 : -1;
  const yDelta = to.y > from.y ? 1 : -1;
  let point = from;
  while (point.x !== to.x || point.y !== to.y) {
    const next = { ...point };
    if (Math.abs(point.x) !== Math.abs(to.x)) {
      next.x = point.x + xDelta;
    }
    if (Math.abs(point.y) !== Math.abs(to.y)) {
      next.y = point.y + yDelta;
    }
    addEdge(point, next);
    points.push(next);
    point = next;
  }
  return points;
}

export const getAdjacentPoints = (node: Point): Point[] => {
  const points: Point[] = [];
  [-1, 0, 1].forEach(dx => {
    [-1, 0, 1].forEach(dy => {
      const x = node.x + dx;
      const y = node.y + dy;
      if (x >= 0 && x <= 3 && y >= 0 && y <= 3 && !(x === node.x && y === node.y)) {
        points.push({ x, y });
      }
    });
  });
  return points;
};

export const removeEndPoint = (point: Point): void => {
  setCurrentPoint(EMPTY_POINT);
}