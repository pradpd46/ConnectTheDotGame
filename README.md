# Connect the Dots

## Instructions to run
Go to the **/client** directory and open the **index.html** file in any browser.

Optionally, to build run the below commands in the terminal
```sh
cd ./server
npm install
npm run build
```
To run the **typescript-eslint** linter
```sh
npm run lint
```

## Used
- **Node JS** - runtime environment for JavaScript
- -c tslint.json 'src/**/*.ts' - transpiles TypeScript code into JavaScript code
- **Babel** - transpiles the ES6 code into ES5 code
- **Webpack** - bbundles the application into a single file to be included in index.html
- **typescript-eslint** - linter for the TypeScript and ES6 together.
- Nodemon - used for build process in development

## Implemented
- [x] The game is played on a 4x4 grid of 16 nodes.
- [x] Players take turns drawing octilinear lines connecting nodes.
- [x] Each line must begin at the start or end of the existing path, so that all
lines form a continuous path.
- [x] The first line may begin on any node.
- [x] A line may connect any number of nodes.
- [x] Lines may not intersect.
- [x] No node can be visited twice.
- [x] The game ends when no valid lines can be drawn.
- [x] The player who draws the last line is the loser.
- [x] If the user remains inactive for a certain period of time **(5 seconds)**, the game nags the user by displaying a message *"Are you asleep?"*.
- [x] All the ERROR messages reported by the Client are catched and logged by the Server on the browser console for debugging purposes.
