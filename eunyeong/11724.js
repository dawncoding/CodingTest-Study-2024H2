// 연결 요소의 개수

const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
let linked = 0;

input.forEach((e) => {
  const [m, n] = e.split(" ").map(Number);

  graph[m].push(n);
  graph[n].push(m);
});

function dfs(v) {
  visited[v] = true;

  for (const cur of graph[v]) {
    if (!visited[cur]) {
      dfs(cur);
    }
  }
}

for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    dfs(i);
    linked++;
  }
}

console.log(linked);
