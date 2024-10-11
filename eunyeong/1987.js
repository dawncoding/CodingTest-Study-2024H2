const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const alphabet = new Array(26).fill(false);
let dir = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
]; //상하좌우
const graph = [];
let answer = 0;

input.forEach((e) => graph.push(e.trim().split("")));
//세로 가로 graph[x][y]

function dfs(x, y, cnt) {
  alphabet[graph[x][y].charCodeAt() - 65] = true;
  answer = Math.max(answer, cnt);

  for (let n = 0; n < 4; n++) {
    const nx = x + dir[n][0];
    const ny = y + dir[n][1];

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;

    if (!alphabet[graph[nx][ny].charCodeAt() - 65]) {
      dfs(nx, ny, cnt + 1);
      alphabet[graph[nx][ny].charCodeAt() - 65] = false;
    }
  }
}

dfs(0, 0, 1);
console.log(answer);
