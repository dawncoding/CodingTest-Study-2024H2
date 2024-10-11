//유기농 배추

const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
let T = Number(input.shift());

while (T--) {
  const [M, N, K] = input.shift().split(" ").map(Number);
  const graph = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => 0)
  );
  const visited = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => false)
  );
  const dir = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ]; //상하좌우
  let worms = 0;

  for (let i = 0; i < K; i++) {
    const [x, y] = input.shift().trim().split(" ").map(Number);
    graph[x][y] = 1;
  }

  function dfs(x, y) {
    if (!visited[x][y] && graph[x][y]) {
      visited[x][y] = true;

      for (let m = 0; m < 4; m++) {
        const nx = x + dir[m][0];
        const ny = y + dir[m][1];

        if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
        else dfs(nx, ny);
      }
    }
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && graph[i][j]) {
        dfs(i, j);
        worms++;
      }
    }
  }

  console.log(worms);
}
