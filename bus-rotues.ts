function numBusesToDestination(routes: number[][], source: number, target: number): number {
    const node = toTree(routes)
    return 123;
};

function toTree(routes: number[][]) {
  const stopMap = new Map<number, TreeNodee>();
  for (let routeId = 0; routeId < routes.length; routeId++) {
    if (routes[routeId].length === 0) continue;
    const firstStop = routes[routeId].shift() as number;
    const prevNode = stopMap.get(firstStop) ?? new TreeNodee(firstStop)

    for (let stop of routes[routeId]) {
      const firstStop = routes[routeId].shift() as number;
      const node = stopMap.get(firstStop) ?? new TreeNodee(firstStop)
    }
  }
}

interface Connection {
    node: TreeNodee;
    route: number
}
class TreeNodee {
    label: number;
    connections: Connection[] = [];
    constructor(label:number) {
      this.label = label;
    }
    addConnection(connection: Connection): void {
      this.connections.push(connection)
    }
}
