/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/configs/constants.ts":
/*!**********************************!*\
  !*** ./src/configs/constants.ts ***!
  \**********************************/
/*! namespace exports */
/*! export MOVE_TIMEOUT_MILLIS [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MOVE_TIMEOUT_MILLIS": () => /* binding */ MOVE_TIMEOUT_MILLIS
/* harmony export */ });
var MOVE_TIMEOUT_MILLIS = 5000;


/***/ }),

/***/ "./src/controllers/app.ts":
/*!********************************!*\
  !*** ./src/controllers/app.ts ***!
  \********************************/
/*! namespace exports */
/*! export start [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "start": () => /* binding */ start
/* harmony export */ });
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./message */ "./src/controllers/message.ts");

var start = function (app) {
    app.ports.request.subscribe(function (message) {
        var payload = JSON.parse(message);
        var response = (0,_message__WEBPACK_IMPORTED_MODULE_0__.handleRequest)(payload);
        (0,_message__WEBPACK_IMPORTED_MODULE_0__.sendResponse)(response);
    });
};


/***/ }),

/***/ "./src/controllers/game.ts":
/*!*********************************!*\
  !*** ./src/controllers/game.ts ***!
  \*********************************/
/*! namespace exports */
/*! export endPointClicked [provided] [no usage info] [missing usage info prevents renaming] */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! export onPointClicked [provided] [no usage info] [missing usage info prevents renaming] */
/*! export startPointClicked [provided] [no usage info] [missing usage info prevents renaming] */
/*! export startTimeout [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init,
/* harmony export */   "onPointClicked": () => /* binding */ onPointClicked,
/* harmony export */   "startPointClicked": () => /* binding */ startPointClicked,
/* harmony export */   "endPointClicked": () => /* binding */ endPointClicked,
/* harmony export */   "startTimeout": () => /* binding */ startTimeout
/* harmony export */ });
/* harmony import */ var _configs_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../configs/constants */ "./src/configs/constants.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/controllers/player.ts");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rules */ "./src/controllers/rules.ts");
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./point */ "./src/controllers/point.ts");
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./message */ "./src/controllers/message.ts");





var timeout = null;
var init = function () {
    (0,_player__WEBPACK_IMPORTED_MODULE_0__.init)();
    (0,_rules__WEBPACK_IMPORTED_MODULE_1__.init)();
    var activePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.getActivePlayer)();
    return {
        msg: "INITIALIZE" /* INITIALIZE */,
        body: {
            newLine: null,
            heading: activePlayer.name,
            message: "Awaiting {name}'s Move" /* AWAITING_MOVE */.replace('{name}', activePlayer.name)
        }
    };
};
var onPointClicked = function (point) {
    if ((0,_point__WEBPACK_IMPORTED_MODULE_2__.getCurrentPoint)() === _point__WEBPACK_IMPORTED_MODULE_2__.EMPTY_POINT) {
        return startPointClicked(point);
    }
    else {
        return endPointClicked(point);
    }
};
var startPointClicked = function (point) {
    var valid = (0,_point__WEBPACK_IMPORTED_MODULE_2__.isValidStartPoint)(point);
    var activePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.getActivePlayer)();
    if (valid) {
        (0,_point__WEBPACK_IMPORTED_MODULE_2__.setCurrentPoint)(point);
        return {
            msg: "VALID_START_NODE" /* VALID_START_NODE */,
            body: {
                newLine: null,
                heading: activePlayer.name,
                message: "Select a second node to complete the line." /* SELECT_SECOND_NODE */
            }
        };
    }
    else {
        return {
            msg: "INVALID_START_NODE" /* INVALID_START_NODE */,
            body: {
                newLine: null,
                heading: activePlayer.name,
                message: "Not a valid starting position." /* NOT_VALID_START */
            }
        };
    }
};
var endPointClicked = function (point) {
    var valid = (0,_point__WEBPACK_IMPORTED_MODULE_2__.isValidEndPoint)(point);
    if (valid) {
        var start = (0,_point__WEBPACK_IMPORTED_MODULE_2__.getCurrentPoint)();
        (0,_point__WEBPACK_IMPORTED_MODULE_2__.processEndPoint)(point);
        (0,_player__WEBPACK_IMPORTED_MODULE_0__.togglePlayer)();
        var activePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.getActivePlayer)();
        if ((0,_rules__WEBPACK_IMPORTED_MODULE_1__.isGameOver)()) {
            // if (false) {
            return {
                msg: "GAME_OVER" /* GAME_OVER */,
                body: {
                    newLine: {
                        start: start,
                        end: point
                    },
                    heading: "Game Over" /* GAME_OVER */,
                    message: "{name} Wins!" /* PLAYER_WIN */.replace('{name}', activePlayer.name)
                }
            };
        }
        else {
            return {
                msg: "VALID_END_NODE" /* VALID_END_NODE */,
                body: {
                    newLine: {
                        start: start,
                        end: point
                    },
                    heading: activePlayer.name,
                    message: ""
                }
            };
        }
    }
    else {
        var activePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.getActivePlayer)();
        (0,_point__WEBPACK_IMPORTED_MODULE_2__.removeEndPoint)(point);
        return {
            msg: "INVALID_END_NODE" /* INVALID_END_NODE */,
            body: {
                newLine: null,
                heading: activePlayer.name,
                message: "Invalid move!" /* INVALID_MOVE */
            }
        };
    }
};
var startTimeout = function () {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = window.setTimeout(function () {
        var activePlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.getActivePlayer)();
        (0,_message__WEBPACK_IMPORTED_MODULE_3__.sendResponse)({
            msg: "UPDATE_TEXT" /* UPDATE_TEXT */,
            body: {
                newLine: null,
                heading: activePlayer.name,
                message: "Hey {name}, are you asleep?" /* MOVE_TIMEOUT */.replace('{name}', activePlayer.name)
            }
        });
    }, _configs_constants__WEBPACK_IMPORTED_MODULE_4__.MOVE_TIMEOUT_MILLIS);
    return timeout;
};


/***/ }),

/***/ "./src/controllers/logger.ts":
/*!***********************************!*\
  !*** ./src/controllers/logger.ts ***!
  \***********************************/
/*! namespace exports */
/*! export Logger [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => /* binding */ Logger
/* harmony export */ });
var Logger;
(function (Logger) {
    Logger.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        // tslint:disable-next-line:no-console
        console.info.apply(console, message);
    };
    Logger.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        // tslint:disable-next-line:no-console
        console.error.apply(console, message);
    };
})(Logger || (Logger = {}));


/***/ }),

/***/ "./src/controllers/message.ts":
/*!************************************!*\
  !*** ./src/controllers/message.ts ***!
  \************************************/
/*! namespace exports */
/*! export handleRequest [provided] [no usage info] [missing usage info prevents renaming] */
/*! export sendResponse [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleRequest": () => /* binding */ handleRequest,
/* harmony export */   "sendResponse": () => /* binding */ sendResponse
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/controllers/game.ts");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "./src/controllers/logger.ts");


var handleRequest = function (request) {
    _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info('REQUEST', request);
    (0,_game__WEBPACK_IMPORTED_MODULE_0__.startTimeout)();
    switch (request.msg) {
        case "INITIALIZE" /* INITIALIZE */:
            return (0,_game__WEBPACK_IMPORTED_MODULE_0__.init)();
        case "NODE_CLICKED" /* NODE_CLICKED */:
            return (0,_game__WEBPACK_IMPORTED_MODULE_0__.onPointClicked)(request.body);
        case "ERROR" /* ERROR */:
            _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.error('ERROR', request);
            return null;
        default:
            return null;
    }
};
var sendResponse = function (response) {
    if (response) {
        _logger__WEBPACK_IMPORTED_MODULE_1__.Logger.info('RESPONSE', response);
        app.ports.response.send(response);
    }
};


/***/ }),

/***/ "./src/controllers/player.ts":
/*!***********************************!*\
  !*** ./src/controllers/player.ts ***!
  \***********************************/
/*! namespace exports */
/*! export getActivePlayer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setActivePlayer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export togglePlayer [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init,
/* harmony export */   "getActivePlayer": () => /* binding */ getActivePlayer,
/* harmony export */   "setActivePlayer": () => /* binding */ setActivePlayer,
/* harmony export */   "togglePlayer": () => /* binding */ togglePlayer
/* harmony export */ });
var players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' }
];
var activePlayer;
var init = function () {
    setActivePlayer(players[0]);
};
var getActivePlayer = function () {
    return activePlayer;
};
var setActivePlayer = function (player) {
    activePlayer = player;
};
var togglePlayer = function () {
    setActivePlayer(activePlayer.id === players[0].id ? players[1] : players[0]);
};


/***/ }),

/***/ "./src/controllers/point.ts":
/*!**********************************!*\
  !*** ./src/controllers/point.ts ***!
  \**********************************/
/*! namespace exports */
/*! export EMPTY_POINT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addEdge [provided] [no usage info] [missing usage info prevents renaming] */
/*! export edges [provided] [no usage info] [missing usage info prevents renaming] */
/*! export endPoints [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getAdjacentPoints [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCurrentPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPathPoints [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isValidEndPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isValidStartPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export processEndPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export processStartPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeEndPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setCurrentPoint [provided] [no usage info] [missing usage info prevents renaming] */
/*! export visitedPoints [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_POINT": () => /* binding */ EMPTY_POINT,
/* harmony export */   "visitedPoints": () => /* binding */ visitedPoints,
/* harmony export */   "endPoints": () => /* binding */ endPoints,
/* harmony export */   "edges": () => /* binding */ edges,
/* harmony export */   "getCurrentPoint": () => /* binding */ getCurrentPoint,
/* harmony export */   "setCurrentPoint": () => /* binding */ setCurrentPoint,
/* harmony export */   "isValidStartPoint": () => /* binding */ isValidStartPoint,
/* harmony export */   "isValidEndPoint": () => /* binding */ isValidEndPoint,
/* harmony export */   "processStartPoint": () => /* binding */ processStartPoint,
/* harmony export */   "processEndPoint": () => /* binding */ processEndPoint,
/* harmony export */   "addEdge": () => /* binding */ addEdge,
/* harmony export */   "getPathPoints": () => /* binding */ getPathPoints,
/* harmony export */   "getAdjacentPoints": () => /* binding */ getAdjacentPoints,
/* harmony export */   "removeEndPoint": () => /* binding */ removeEndPoint
/* harmony export */ });
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rules */ "./src/controllers/rules.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var currentPoint;
var EMPTY_POINT = { x: -1, y: -1 };
var visitedPoints = [];
var endPoints = [];
var edges = {};
var getCurrentPoint = function () {
    return currentPoint;
};
var setCurrentPoint = function (point) {
    currentPoint = point;
};
var isValidStartPoint = function (point) {
    if (!endPoints.length || endPoints.find(function (end) { return end.x === point.x && end.y === point.y; })) {
        return true;
    }
    return false;
};
var isValidEndPoint = function (point, start) {
    if (start === void 0) { start = getCurrentPoint(); }
    if (!(0,_rules__WEBPACK_IMPORTED_MODULE_0__.isPointVisited)(point) && (0,_rules__WEBPACK_IMPORTED_MODULE_0__.isGridMoveValid)(start, point) && !(0,_rules__WEBPACK_IMPORTED_MODULE_0__.isIntersecting)(start, point)) {
        return true;
    }
    return false;
};
var processStartPoint = function (point) {
    setCurrentPoint(point);
};
var processEndPoint = function (point) {
    if (!endPoints.length) {
        visitedPoints.push(currentPoint);
        endPoints.push(currentPoint);
    }
    else {
        // Remove the old end point
        endPoints = endPoints.filter(function (n) { return !(n.x === currentPoint.x && n.y === currentPoint.y); });
    }
    // Add the new end point
    endPoints.push(point);
    // Add the intermediate points
    getPathPoints(currentPoint, point)
        .forEach(function (p) { return visitedPoints.push(p); });
    // Set the active node to empty
    setCurrentPoint(EMPTY_POINT);
};
var addEdge = function (p1, p2) {
    var coords = p1.x + "," + p1.y + "|" + p2.x + "," + p2.y;
    edges[coords] = true;
};
var getPathPoints = function (from, to) {
    var points = [];
    var xDelta = to.x > from.x ? 1 : -1;
    var yDelta = to.y > from.y ? 1 : -1;
    var point = from;
    while (point.x !== to.x || point.y !== to.y) {
        var next = __assign({}, point);
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
};
var getAdjacentPoints = function (node) {
    var points = [];
    [-1, 0, 1].forEach(function (dx) {
        [-1, 0, 1].forEach(function (dy) {
            var x = node.x + dx;
            var y = node.y + dy;
            if (x >= 0 && x <= 3 && y >= 0 && y <= 3 && !(x === node.x && y === node.y)) {
                points.push({ x: x, y: y });
            }
        });
    });
    return points;
};
var removeEndPoint = function (point) {
    setCurrentPoint(EMPTY_POINT);
};


/***/ }),

/***/ "./src/controllers/rules.ts":
/*!**********************************!*\
  !*** ./src/controllers/rules.ts ***!
  \**********************************/
/*! namespace exports */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isEdgeIntersecting [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isGameOver [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isGridMoveValid [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isIntersecting [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isPointVisited [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init,
/* harmony export */   "isGridMoveValid": () => /* binding */ isGridMoveValid,
/* harmony export */   "isPointVisited": () => /* binding */ isPointVisited,
/* harmony export */   "isIntersecting": () => /* binding */ isIntersecting,
/* harmony export */   "isEdgeIntersecting": () => /* binding */ isEdgeIntersecting,
/* harmony export */   "isGameOver": () => /* binding */ isGameOver
/* harmony export */ });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/controllers/point.ts");

var init = function () {
    (0,_point__WEBPACK_IMPORTED_MODULE_0__.setCurrentPoint)(_point__WEBPACK_IMPORTED_MODULE_0__.EMPTY_POINT);
};
var isGridMoveValid = function (from, to) { return (from.x === to.x || from.y === to.y || Math.abs(from.x - to.x) === Math.abs(from.y - to.y)); };
var isPointVisited = function (point) { return (!!_point__WEBPACK_IMPORTED_MODULE_0__.visitedPoints.find(function (visited) { return visited.x === point.x && visited.y === point.y; })); };
var isIntersecting = function (from, to) {
    var points = (0,_point__WEBPACK_IMPORTED_MODULE_0__.getPathPoints)(from, to);
    if (!points.length) {
        // check level-0 points
        return true;
    }
    else if (isEdgeIntersecting(from, to)) {
        return true;
    }
    else {
        return !points.every(function (p) {
            return !_point__WEBPACK_IMPORTED_MODULE_0__.visitedPoints.find(function (visited) {
                return visited.x === p.x
                    && visited.y === p.y;
            });
        });
    }
};
var isEdgeIntersecting = function (from, to) {
    if (from.x !== to.x && from.y !== to.y) {
        var xDelta = to.x > from.x ? 1 : -1;
        var yDelta = to.y > from.y ? 1 : -1;
        var p1 = { x: from.x + xDelta, y: from.y };
        var p2 = { x: from.x, y: from.y + yDelta };
        var coords1 = p1.x + "," + p1.y + "|" + p2.x + "," + p2.y;
        var coords2 = p2.x + "," + p2.y + "|" + p1.x + "," + p1.y;
        if (_point__WEBPACK_IMPORTED_MODULE_0__.edges[coords1] || _point__WEBPACK_IMPORTED_MODULE_0__.edges[coords2]) {
            return true;
        }
        return false;
    }
    return false;
};
var isGameOver = function () {
    return !((0,_point__WEBPACK_IMPORTED_MODULE_0__.getAdjacentPoints)(_point__WEBPACK_IMPORTED_MODULE_0__.endPoints[0]).some(function (node) { return (0,_point__WEBPACK_IMPORTED_MODULE_0__.isValidEndPoint)(node, _point__WEBPACK_IMPORTED_MODULE_0__.endPoints[0]); })
        || (0,_point__WEBPACK_IMPORTED_MODULE_0__.getAdjacentPoints)(_point__WEBPACK_IMPORTED_MODULE_0__.endPoints[1]).some(function (node) { return (0,_point__WEBPACK_IMPORTED_MODULE_0__.isValidEndPoint)(node, _point__WEBPACK_IMPORTED_MODULE_0__.endPoints[1]); }));
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/app */ "./src/controllers/app.ts");

(0,_controllers_app__WEBPACK_IMPORTED_MODULE_0__.start)(app);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb25uZWN0LXRoZS1kb3RzLy4vc3JjL2NvbmZpZ3MvY29uc3RhbnRzLnRzIiwid2VicGFjazovL2Nvbm5lY3QtdGhlLWRvdHMvLi9zcmMvY29udHJvbGxlcnMvYXBwLnRzIiwid2VicGFjazovL2Nvbm5lY3QtdGhlLWRvdHMvLi9zcmMvY29udHJvbGxlcnMvZ2FtZS50cyIsIndlYnBhY2s6Ly9jb25uZWN0LXRoZS1kb3RzLy4vc3JjL2NvbnRyb2xsZXJzL2xvZ2dlci50cyIsIndlYnBhY2s6Ly9jb25uZWN0LXRoZS1kb3RzLy4vc3JjL2NvbnRyb2xsZXJzL21lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vY29ubmVjdC10aGUtZG90cy8uL3NyYy9jb250cm9sbGVycy9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vY29ubmVjdC10aGUtZG90cy8uL3NyYy9jb250cm9sbGVycy9wb2ludC50cyIsIndlYnBhY2s6Ly9jb25uZWN0LXRoZS1kb3RzLy4vc3JjL2NvbnRyb2xsZXJzL3J1bGVzLnRzIiwid2VicGFjazovL2Nvbm5lY3QtdGhlLWRvdHMvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY29ubmVjdC10aGUtZG90cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb25uZWN0LXRoZS1kb3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb25uZWN0LXRoZS1kb3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29ubmVjdC10aGUtZG90cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nvbm5lY3QtdGhlLWRvdHMvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCTyxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7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Q2xELElBQU0sT0FBTyxHQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQUksRUFBRSxDQUFDLENBQUMsU0FBSSxFQUFFLENBQUMsQ0FBQyxTQUFJLEVBQUUsQ0FBQyxDQUFHLENBQUM7UUFDbEQsSUFBSSx5Q0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLHlDQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFTSxJQUFNLFVBQVUsR0FBRztJQUN4QixPQUFPLENBQUMsQ0FDTix5REFBaUIsQ0FBQyxnREFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQUksSUFBSSw4REFBZSxDQUFDLElBQUksRUFBRSxnREFBWSxDQUFDLEVBQW5DLENBQW1DLENBQUM7V0FDOUUseURBQWlCLENBQUMsZ0RBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFJLElBQUksOERBQWUsQ0FBQyxJQUFJLEVBQUUsZ0RBQVksQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQ3JGLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDckR5QztBQUUxQyx1REFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O1VDRlg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBlbnVtIFJlcXVlc3RUeXBlIHtcbiAgSU5JVElBTElaRSA9ICdJTklUSUFMSVpFJyxcbiAgTk9ERV9DTElDS0VEID0gJ05PREVfQ0xJQ0tFRCcsXG4gIEVSUk9SID0gJ0VSUk9SJyxcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUmVzcG9uc2VUeXBlIHtcbiAgSU5JVElBTElaRSA9ICdJTklUSUFMSVpFJyxcbiAgVkFMSURfU1RBUlRfTk9ERSA9ICdWQUxJRF9TVEFSVF9OT0RFJyxcbiAgSU5WQUxJRF9TVEFSVF9OT0RFID0gJ0lOVkFMSURfU1RBUlRfTk9ERScsXG4gIFZBTElEX0VORF9OT0RFID0gJ1ZBTElEX0VORF9OT0RFJyxcbiAgSU5WQUxJRF9FTkRfTk9ERSA9ICdJTlZBTElEX0VORF9OT0RFJyxcbiAgR0FNRV9PVkVSID0gJ0dBTUVfT1ZFUicsXG4gIFVQREFURV9URVhUID0gJ1VQREFURV9URVhUJ1xufVxuXG5leHBvcnQgY29uc3QgZW51bSBUZXh0cyB7IFxuICBBV0FJVElOR19NT1ZFID0gXCJBd2FpdGluZyB7bmFtZX0ncyBNb3ZlXCIsXG4gIFNFTEVDVF9TRUNPTkRfTk9ERSA9IFwiU2VsZWN0IGEgc2Vjb25kIG5vZGUgdG8gY29tcGxldGUgdGhlIGxpbmUuXCIsXG4gIE5PVF9WQUxJRF9TVEFSVCA9IFwiTm90IGEgdmFsaWQgc3RhcnRpbmcgcG9zaXRpb24uXCIsXG4gIEdBTUVfT1ZFUiA9ICdHYW1lIE92ZXInLFxuICBQTEFZRVJfV0lOID0gJ3tuYW1lfSBXaW5zIScsXG4gIElOVkFMSURfTU9WRSA9ICdJbnZhbGlkIG1vdmUhJyxcbiAgTU9WRV9USU1FT1VUID0gJ0hleSB7bmFtZX0sIGFyZSB5b3UgYXNsZWVwPydcbn1cblxuZXhwb3J0IGNvbnN0IE1PVkVfVElNRU9VVF9NSUxMSVMgPSA1MDAwOyIsImltcG9ydCB7IEFwcCwgUGF5bG9hZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBoYW5kbGVSZXF1ZXN0LCBzZW5kUmVzcG9uc2UgfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5cbmV4cG9ydCBjb25zdCBzdGFydCA9IChhcHA6IEFwcCkgPT4ge1xuICBhcHAucG9ydHMucmVxdWVzdC5zdWJzY3JpYmUoKG1lc3NhZ2U6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHBheWxvYWQ6IFBheWxvYWQgPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gaGFuZGxlUmVxdWVzdChwYXlsb2FkKTtcbiAgICBzZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9KTtcbn0iLCJpbXBvcnQgeyBNT1ZFX1RJTUVPVVRfTUlMTElTIH0gZnJvbSAnLi8uLi9jb25maWdzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXNwb25zZVR5cGUsIFRleHRzIH0gZnJvbSBcIi4uL2NvbmZpZ3MvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBQYXlsb2FkLCBQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZ2V0QWN0aXZlUGxheWVyLCBpbml0IGFzIGluaXRQbGF5ZXIsIHRvZ2dsZVBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IGluaXQgYXMgaW5pdEdhbWVTdGF0ZSwgaXNHYW1lT3ZlciB9IGZyb20gJy4vcnVsZXMnO1xuaW1wb3J0IHsgRU1QVFlfUE9JTlQsIGdldEN1cnJlbnRQb2ludCwgaXNWYWxpZEVuZFBvaW50LCBpc1ZhbGlkU3RhcnRQb2ludCwgcHJvY2Vzc0VuZFBvaW50LCByZW1vdmVFbmRQb2ludCwgc2V0Q3VycmVudFBvaW50IH0gZnJvbSAnLi9wb2ludCc7XG5pbXBvcnQgeyBzZW5kUmVzcG9uc2UgfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5cbmxldCB0aW1lb3V0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGluaXQgPSAoKTogUGF5bG9hZCA9PiB7XG4gIGluaXRQbGF5ZXIoKTtcbiAgaW5pdEdhbWVTdGF0ZSgpO1xuICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBnZXRBY3RpdmVQbGF5ZXIoKTtcbiAgcmV0dXJuIHtcbiAgICBtc2c6IFJlc3BvbnNlVHlwZS5JTklUSUFMSVpFLFxuICAgIGJvZHk6IHtcbiAgICAgIG5ld0xpbmU6IG51bGwsXG4gICAgICBoZWFkaW5nOiBhY3RpdmVQbGF5ZXIubmFtZSxcbiAgICAgIG1lc3NhZ2U6IFRleHRzLkFXQUlUSU5HX01PVkUucmVwbGFjZSgne25hbWV9JywgYWN0aXZlUGxheWVyLm5hbWUpXG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG9uUG9pbnRDbGlja2VkID0gKHBvaW50OiBQb2ludCk6IFBheWxvYWQgPT4ge1xuICBpZiAoZ2V0Q3VycmVudFBvaW50KCkgPT09IEVNUFRZX1BPSU5UKSB7XG4gICAgcmV0dXJuIHN0YXJ0UG9pbnRDbGlja2VkKHBvaW50KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZW5kUG9pbnRDbGlja2VkKHBvaW50KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHN0YXJ0UG9pbnRDbGlja2VkID0gKHBvaW50OiBQb2ludCk6IFBheWxvYWQgPT4ge1xuICBjb25zdCB2YWxpZCA9IGlzVmFsaWRTdGFydFBvaW50KHBvaW50KTtcbiAgY29uc3QgYWN0aXZlUGxheWVyID0gZ2V0QWN0aXZlUGxheWVyKCk7XG4gIGlmICh2YWxpZCkge1xuICAgIHNldEN1cnJlbnRQb2ludChwb2ludCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1zZzogUmVzcG9uc2VUeXBlLlZBTElEX1NUQVJUX05PREUsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG5ld0xpbmU6IG51bGwsXG4gICAgICAgIGhlYWRpbmc6IGFjdGl2ZVBsYXllci5uYW1lLFxuICAgICAgICBtZXNzYWdlOiBUZXh0cy5TRUxFQ1RfU0VDT05EX05PREVcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1zZzogUmVzcG9uc2VUeXBlLklOVkFMSURfU1RBUlRfTk9ERSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgbmV3TGluZTogbnVsbCxcbiAgICAgICAgaGVhZGluZzogYWN0aXZlUGxheWVyLm5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IFRleHRzLk5PVF9WQUxJRF9TVEFSVFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZW5kUG9pbnRDbGlja2VkID0gKHBvaW50OiBQb2ludCk6IFBheWxvYWQgPT4ge1xuICBjb25zdCB2YWxpZCA9IGlzVmFsaWRFbmRQb2ludChwb2ludCk7XG4gIGlmICh2YWxpZCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gZ2V0Q3VycmVudFBvaW50KCk7XG4gICAgcHJvY2Vzc0VuZFBvaW50KHBvaW50KTtcbiAgICB0b2dnbGVQbGF5ZXIoKTtcbiAgICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBnZXRBY3RpdmVQbGF5ZXIoKTtcbiAgICBpZiAoaXNHYW1lT3ZlcigpKSB7XG4gICAgICAvLyBpZiAoZmFsc2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1zZzogUmVzcG9uc2VUeXBlLkdBTUVfT1ZFUixcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG5ld0xpbmU6IHtcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwb2ludFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGluZzogVGV4dHMuR0FNRV9PVkVSLFxuICAgICAgICAgIG1lc3NhZ2U6IFRleHRzLlBMQVlFUl9XSU4ucmVwbGFjZSgne25hbWV9JywgYWN0aXZlUGxheWVyLm5hbWUpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1zZzogUmVzcG9uc2VUeXBlLlZBTElEX0VORF9OT0RFLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbmV3TGluZToge1xuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHBvaW50XG4gICAgICAgICAgfSxcbiAgICAgICAgICBoZWFkaW5nOiBhY3RpdmVQbGF5ZXIubmFtZSxcbiAgICAgICAgICBtZXNzYWdlOiBcIlwiXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGFjdGl2ZVBsYXllciA9IGdldEFjdGl2ZVBsYXllcigpO1xuICAgIHJlbW92ZUVuZFBvaW50KHBvaW50KTtcbiAgICByZXR1cm4ge1xuICAgICAgbXNnOiBSZXNwb25zZVR5cGUuSU5WQUxJRF9FTkRfTk9ERSxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgbmV3TGluZTogbnVsbCxcbiAgICAgICAgaGVhZGluZzogYWN0aXZlUGxheWVyLm5hbWUsXG4gICAgICAgIG1lc3NhZ2U6IFRleHRzLklOVkFMSURfTU9WRVxuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0YXJ0VGltZW91dCA9ICgpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH1cbiAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb25zdCBhY3RpdmVQbGF5ZXIgPSBnZXRBY3RpdmVQbGF5ZXIoKTtcbiAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgbXNnOiBSZXNwb25zZVR5cGUuVVBEQVRFX1RFWFQsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG5ld0xpbmU6IG51bGwsXG4gICAgICAgIGhlYWRpbmc6IGFjdGl2ZVBsYXllci5uYW1lLFxuICAgICAgICBtZXNzYWdlOiBUZXh0cy5NT1ZFX1RJTUVPVVQucmVwbGFjZSgne25hbWV9JywgYWN0aXZlUGxheWVyLm5hbWUpXG4gICAgICB9XG4gICAgfSk7XG4gIH0sIE1PVkVfVElNRU9VVF9NSUxMSVMpO1xuICByZXR1cm4gdGltZW91dDtcbn0iLCJleHBvcnQgbmFtZXNwYWNlIExvZ2dlciB7XG4gIGV4cG9ydCBjb25zdCBpbmZvID0gKC4uLm1lc3NhZ2U6IGFueVtdKTogdm9pZCA9PiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmluZm8oLi4ubWVzc2FnZSk7XG4gIH1cbiAgZXhwb3J0IGNvbnN0IGVycm9yID0gKC4uLm1lc3NhZ2U6IGFueVtdKTogdm9pZCA9PiB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmVycm9yKC4uLm1lc3NhZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBpbml0LCBvblBvaW50Q2xpY2tlZCwgc3RhcnRUaW1lb3V0IH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IFBheWxvYWQsIFBvaW50IH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFJlcXVlc3RUeXBlIH0gZnJvbSAnLi4vY29uZmlncy9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlUmVxdWVzdCA9IChyZXF1ZXN0OiBQYXlsb2FkKTogUGF5bG9hZCB8IG51bGwgPT4ge1xuICBMb2dnZXIuaW5mbygnUkVRVUVTVCcsIHJlcXVlc3QpO1xuICBzdGFydFRpbWVvdXQoKTtcbiAgc3dpdGNoIChyZXF1ZXN0Lm1zZykge1xuICAgIGNhc2UgUmVxdWVzdFR5cGUuSU5JVElBTElaRTpcbiAgICAgIHJldHVybiBpbml0KCk7XG4gICAgY2FzZSBSZXF1ZXN0VHlwZS5OT0RFX0NMSUNLRUQ6XG4gICAgICByZXR1cm4gb25Qb2ludENsaWNrZWQocmVxdWVzdC5ib2R5IGFzIFBvaW50KTtcbiAgICBjYXNlIFJlcXVlc3RUeXBlLkVSUk9SOlxuICAgICAgTG9nZ2VyLmVycm9yKCdFUlJPUicsIHJlcXVlc3QpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZFJlc3BvbnNlID0gKHJlc3BvbnNlOiBQYXlsb2FkIHwgbnVsbCk6IHZvaWQgPT4ge1xuICBpZiAocmVzcG9uc2UpIHtcbiAgICBMb2dnZXIuaW5mbygnUkVTUE9OU0UnLCByZXNwb25zZSk7XG4gICAgYXBwLnBvcnRzLnJlc3BvbnNlLnNlbmQocmVzcG9uc2UpO1xuICB9XG59OyIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vLi4vaW50ZXJmYWNlcyc7XG5cbmNvbnN0IHBsYXllcnM6IFBsYXllcltdID0gW1xuICB7IGlkOiAxLCBuYW1lOiAnUGxheWVyIDEnIH0sXG4gIHsgaWQ6IDIsIG5hbWU6ICdQbGF5ZXIgMicgfVxuXTtcblxubGV0IGFjdGl2ZVBsYXllcjogUGxheWVyO1xuXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgc2V0QWN0aXZlUGxheWVyKHBsYXllcnNbMF0pO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0QWN0aXZlUGxheWVyID0gKCk6IFBsYXllciA9PiB7XG4gIHJldHVybiBhY3RpdmVQbGF5ZXI7XG59XG5cbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVQbGF5ZXIgPSAocGxheWVyOiBQbGF5ZXIpOiB2b2lkID0+IHtcbiAgYWN0aXZlUGxheWVyID0gcGxheWVyO1xufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlUGxheWVyID0gKCk6IHZvaWQgPT4ge1xuICBzZXRBY3RpdmVQbGF5ZXIoYWN0aXZlUGxheWVyLmlkID09PSBwbGF5ZXJzWzBdLmlkID8gcGxheWVyc1sxXSA6IHBsYXllcnNbMF0pO1xufTsiLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgaXNHcmlkTW92ZVZhbGlkLCBpc1BvaW50VmlzaXRlZCwgaXNJbnRlcnNlY3RpbmcgfSBmcm9tICcuL3J1bGVzJztcblxubGV0IGN1cnJlbnRQb2ludDogUG9pbnQ7XG5cbmV4cG9ydCBjb25zdCBFTVBUWV9QT0lOVDogUG9pbnQgPSB7IHg6IC0xLCB5OiAtMSB9O1xuZXhwb3J0IGNvbnN0IHZpc2l0ZWRQb2ludHM6IFBvaW50W10gPSBbXTtcbmV4cG9ydCBsZXQgZW5kUG9pbnRzOiBQb2ludFtdID0gW107XG5leHBvcnQgY29uc3QgZWRnZXM6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50UG9pbnQgPSAoKTogUG9pbnQgPT4ge1xuICByZXR1cm4gY3VycmVudFBvaW50O1xufVxuXG5leHBvcnQgY29uc3Qgc2V0Q3VycmVudFBvaW50ID0gKHBvaW50OiBQb2ludCk6IHZvaWQgPT4ge1xuICBjdXJyZW50UG9pbnQgPSBwb2ludDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzVmFsaWRTdGFydFBvaW50ID0gKHBvaW50OiBQb2ludCk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWVuZFBvaW50cy5sZW5ndGggfHwgZW5kUG9pbnRzLmZpbmQoZW5kID0+IGVuZC54ID09PSBwb2ludC54ICYmIGVuZC55ID09PSBwb2ludC55KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1ZhbGlkRW5kUG9pbnQgPSAocG9pbnQ6IFBvaW50LCBzdGFydDogUG9pbnQgPSBnZXRDdXJyZW50UG9pbnQoKSk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIWlzUG9pbnRWaXNpdGVkKHBvaW50KSAmJiBpc0dyaWRNb3ZlVmFsaWQoc3RhcnQsIHBvaW50KSAmJiAhaXNJbnRlcnNlY3Rpbmcoc3RhcnQsIHBvaW50KSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgY29uc3QgcHJvY2Vzc1N0YXJ0UG9pbnQgPSAocG9pbnQ6IFBvaW50KTogdm9pZCA9PiB7XG4gIHNldEN1cnJlbnRQb2ludChwb2ludCk7XG59XG5cbmV4cG9ydCBjb25zdCBwcm9jZXNzRW5kUG9pbnQgPSAocG9pbnQ6IFBvaW50KTogdm9pZCA9PiB7XG4gIGlmICghZW5kUG9pbnRzLmxlbmd0aCkge1xuICAgIHZpc2l0ZWRQb2ludHMucHVzaChjdXJyZW50UG9pbnQpO1xuICAgIGVuZFBvaW50cy5wdXNoKGN1cnJlbnRQb2ludCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gUmVtb3ZlIHRoZSBvbGQgZW5kIHBvaW50XG4gICAgZW5kUG9pbnRzID0gZW5kUG9pbnRzLmZpbHRlcihuID0+ICEobi54ID09PSBjdXJyZW50UG9pbnQueCAmJiBuLnkgPT09IGN1cnJlbnRQb2ludC55KSk7XG4gIH1cbiAgLy8gQWRkIHRoZSBuZXcgZW5kIHBvaW50XG4gIGVuZFBvaW50cy5wdXNoKHBvaW50KTtcbiAgLy8gQWRkIHRoZSBpbnRlcm1lZGlhdGUgcG9pbnRzXG4gIGdldFBhdGhQb2ludHMoY3VycmVudFBvaW50LCBwb2ludClcbiAgICAuZm9yRWFjaChwID0+IHZpc2l0ZWRQb2ludHMucHVzaChwKSk7XG4gIC8vIFNldCB0aGUgYWN0aXZlIG5vZGUgdG8gZW1wdHlcbiAgc2V0Q3VycmVudFBvaW50KEVNUFRZX1BPSU5UKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFkZEVkZ2UgPSAocDE6IFBvaW50LCBwMjogUG9pbnQpOiB2b2lkID0+IHtcbiAgY29uc3QgY29vcmRzID0gYCR7cDEueH0sJHtwMS55fXwke3AyLnh9LCR7cDIueX1gO1xuICBlZGdlc1tjb29yZHNdID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFBhdGhQb2ludHMgPSAoZnJvbTogUG9pbnQsIHRvOiBQb2ludCk6IFBvaW50W10gPT4ge1xuICBjb25zdCBwb2ludHMgPSBbXTtcbiAgY29uc3QgeERlbHRhID0gdG8ueCA+IGZyb20ueCA/IDEgOiAtMTtcbiAgY29uc3QgeURlbHRhID0gdG8ueSA+IGZyb20ueSA/IDEgOiAtMTtcbiAgbGV0IHBvaW50ID0gZnJvbTtcbiAgd2hpbGUgKHBvaW50LnggIT09IHRvLnggfHwgcG9pbnQueSAhPT0gdG8ueSkge1xuICAgIGNvbnN0IG5leHQgPSB7IC4uLnBvaW50IH07XG4gICAgaWYgKE1hdGguYWJzKHBvaW50LngpICE9PSBNYXRoLmFicyh0by54KSkge1xuICAgICAgbmV4dC54ID0gcG9pbnQueCArIHhEZWx0YTtcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKHBvaW50LnkpICE9PSBNYXRoLmFicyh0by55KSkge1xuICAgICAgbmV4dC55ID0gcG9pbnQueSArIHlEZWx0YTtcbiAgICB9XG4gICAgYWRkRWRnZShwb2ludCwgbmV4dCk7XG4gICAgcG9pbnRzLnB1c2gobmV4dCk7XG4gICAgcG9pbnQgPSBuZXh0O1xuICB9XG4gIHJldHVybiBwb2ludHM7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRBZGphY2VudFBvaW50cyA9IChub2RlOiBQb2ludCk6IFBvaW50W10gPT4ge1xuICBjb25zdCBwb2ludHM6IFBvaW50W10gPSBbXTtcbiAgWy0xLCAwLCAxXS5mb3JFYWNoKGR4ID0+IHtcbiAgICBbLTEsIDAsIDFdLmZvckVhY2goZHkgPT4ge1xuICAgICAgY29uc3QgeCA9IG5vZGUueCArIGR4O1xuICAgICAgY29uc3QgeSA9IG5vZGUueSArIGR5O1xuICAgICAgaWYgKHggPj0gMCAmJiB4IDw9IDMgJiYgeSA+PSAwICYmIHkgPD0gMyAmJiAhKHggPT09IG5vZGUueCAmJiB5ID09PSBub2RlLnkpKSB7XG4gICAgICAgIHBvaW50cy5wdXNoKHsgeCwgeSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBwb2ludHM7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlRW5kUG9pbnQgPSAocG9pbnQ6IFBvaW50KTogdm9pZCA9PiB7XG4gIHNldEN1cnJlbnRQb2ludChFTVBUWV9QT0lOVCk7XG59IiwiaW1wb3J0IHsgUG9pbnQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgRU1QVFlfUE9JTlQsIHNldEN1cnJlbnRQb2ludCwgdmlzaXRlZFBvaW50cywgZ2V0UGF0aFBvaW50cywgZWRnZXMgLCBnZXRBZGphY2VudFBvaW50cywgaXNWYWxpZEVuZFBvaW50LCBlbmRQb2ludHN9IGZyb20gXCIuL3BvaW50XCI7XG5cbmV4cG9ydCBjb25zdCBpbml0ID0gKCkgPT4ge1xuICBzZXRDdXJyZW50UG9pbnQoRU1QVFlfUE9JTlQpO1xufVxuXG5leHBvcnQgY29uc3QgaXNHcmlkTW92ZVZhbGlkID0gKGZyb206IFBvaW50LCB0bzogUG9pbnQpOiBib29sZWFuID0+IChcbiAgZnJvbS54ID09PSB0by54IHx8IGZyb20ueSA9PT0gdG8ueSB8fCBNYXRoLmFicyhmcm9tLnggLSB0by54KSA9PT0gTWF0aC5hYnMoZnJvbS55IC0gdG8ueSlcbik7XG5cbmV4cG9ydCBjb25zdCBpc1BvaW50VmlzaXRlZCA9IChwb2ludDogUG9pbnQpOiBib29sZWFuID0+IChcbiAgISF2aXNpdGVkUG9pbnRzLmZpbmQodmlzaXRlZCA9PiB2aXNpdGVkLnggPT09IHBvaW50LnggJiYgdmlzaXRlZC55ID09PSBwb2ludC55KVxuKTtcblxuZXhwb3J0IGNvbnN0IGlzSW50ZXJzZWN0aW5nID0gKGZyb206IFBvaW50LCB0bzogUG9pbnQpOiBib29sZWFuID0+IHtcbiAgY29uc3QgcG9pbnRzID0gZ2V0UGF0aFBvaW50cyhmcm9tLCB0byk7XG4gIGlmICghcG9pbnRzLmxlbmd0aCkge1xuICAgIC8vIGNoZWNrIGxldmVsLTAgcG9pbnRzXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNFZGdlSW50ZXJzZWN0aW5nKGZyb20sIHRvKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhcG9pbnRzLmV2ZXJ5KHAgPT4ge1xuICAgICAgcmV0dXJuICF2aXNpdGVkUG9pbnRzLmZpbmQodmlzaXRlZCA9PlxuICAgICAgICB2aXNpdGVkLnggPT09IHAueFxuICAgICAgICAmJiB2aXNpdGVkLnkgPT09IHAueVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGlzRWRnZUludGVyc2VjdGluZyA9IChmcm9tOiBQb2ludCwgdG86IFBvaW50KTogYm9vbGVhbiA9PiB7XG4gIGlmIChmcm9tLnggIT09IHRvLnggJiYgZnJvbS55ICE9PSB0by55KSB7XG4gICAgY29uc3QgeERlbHRhID0gdG8ueCA+IGZyb20ueCA/IDEgOiAtMTtcbiAgICBjb25zdCB5RGVsdGEgPSB0by55ID4gZnJvbS55ID8gMSA6IC0xO1xuICAgIGNvbnN0IHAxID0geyB4OiBmcm9tLnggKyB4RGVsdGEsIHk6IGZyb20ueSB9O1xuICAgIGNvbnN0IHAyID0geyB4OiBmcm9tLngsIHk6IGZyb20ueSArIHlEZWx0YSB9O1xuICAgIGNvbnN0IGNvb3JkczEgPSBgJHtwMS54fSwke3AxLnl9fCR7cDIueH0sJHtwMi55fWA7XG4gICAgY29uc3QgY29vcmRzMiA9IGAke3AyLnh9LCR7cDIueX18JHtwMS54fSwke3AxLnl9YDtcbiAgICBpZiAoZWRnZXNbY29vcmRzMV0gfHwgZWRnZXNbY29vcmRzMl0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+IHtcbiAgcmV0dXJuICEoXG4gICAgZ2V0QWRqYWNlbnRQb2ludHMoZW5kUG9pbnRzWzBdKS5zb21lKG5vZGUgPT4gaXNWYWxpZEVuZFBvaW50KG5vZGUsIGVuZFBvaW50c1swXSkpXG4gICAgfHwgZ2V0QWRqYWNlbnRQb2ludHMoZW5kUG9pbnRzWzFdKS5zb21lKG5vZGUgPT4gaXNWYWxpZEVuZFBvaW50KG5vZGUsIGVuZFBvaW50c1sxXSkpXG4gICk7XG59IiwiaW1wb3J0IHsgc3RhcnQgfSBmcm9tICcuL2NvbnRyb2xsZXJzL2FwcCc7XG5cbnN0YXJ0KGFwcCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9