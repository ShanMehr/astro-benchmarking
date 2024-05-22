import { type Node } from "@xyflow/svelte";

function gaussian() {
  // use the polar form of the Box-Muller transform
  // based on https://introcs.cs.princeton.edu/java/23recursion/StdRandom.java
  var r, x, y;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    r = x * x + y * y;
  } while (r >= 1 || r === 0);

  return x * Math.sqrt((-2 * Math.log(r)) / r);
}


export class Graph {
  nodes: Node[];
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.nodes = [];
    this.width = width;
    this.height = height;
  }

  getNode(nodeId: number) {
    return this.nodes[nodeId];
  }

  addNode(nodeId: number, label: string) {
    let node: Node = this.getNode(nodeId);
    if (node) {
      return node;
    }

    node = {
      id: nodeId.toString(),
      position: {
        x: gaussian() * this.width,
        y: gaussian() * this.height,
      },
      data: {
        label,
      },
    };
    return node as Node;
  }
}
