/*
    ### KEY TERMS
    -- vertex: A node in a graph.
    -- edge: A connection between two vertices.
    -- adjacent: When an edge exists between vertices.
    -- path: A sequence of one or more edges between vertices.
    -- disconnected: Graph where at least two vertices have no path connecting them.
    -- weighted: Graph where edges have an associated cost.
    -- directed: Graph where travel between vertices can be restricted to a single direction.
    -- cycle: A path which begins and ends at the same vertex (opposite is acyclic).
    -- adjacency matrix: Graph representation where vertices are both the rows and the columns. Each cell represents a possible edge.
    -- adjacency list: Graph representation where each vertex has a list of all the vertices it shares an edge with.

    ### METHODS FOR TRAVERSING A GRAPH
    -- depth-first search (DFS)
        helpful for detecting if a path exists between two vertices
        can use a stack or recursion to keep track of vertices
    -- breath-first search (BFS)
        helpful for finding the shortest path between two vertices
        uses a queue to keep track of vertices
    -- Dijkstra’s algorithm 
        used for finding the shortest distance from a given point to every other point in a weighted graph

    ### RUNTIME
        O(vertices + edges);    
*/

const Queue = require('./queue');

class Edge {
    constructor(start, end, weight = null) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }

    addEdge(vertex, weight) {
        if (vertex instanceof Vertex) {
            this.edges.push(new Edge(this, vertex, weight));
        } else {
            throw new Error('Edge start and end must both be Vertex');
        }
    }

    removeEdge(vertex) {
        this.edges = this.edges.filter(edge => edge.end !== vertex);
    }

    print() {
        const edgeList = this.edges.map(edge =>
            edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data);

        const output = `${this.data} --> ${edgeList.join(', ')}`;
        console.log(output);
    }
}

class Graph {
    constructor(isWeighted = false, isDirected = false) {
        this.vertices = [];
        this.isWeighted = isWeighted;
        this.isDirected = isDirected;
    }

    addVertex(data) {
        const newVertex = new Vertex(data);
        this.vertices.push(newVertex);

        return newVertex;
    }

    removeVertex(vertex) {
        this.vertices = this.vertices.filter(v => v !== vertex);
    }

    addEdge(vertexOne, vertexTwo, weight) {
        const edgeWeight = this.isWeighted ? weight : null;

        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.addEdge(vertexTwo, edgeWeight);

            if (!this.isDirected) {
                vertexTwo.addEdge(vertexOne, edgeWeight);
            }
        } else {
            throw new Error('Expected Vertex arguments.');
        }
    }

    removeEdge(vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
            vertexOne.removeEdge(vertexTwo);

            if (!this.isDirected) {
                vertexTwo.removeEdge(vertexOne);
            }
        } else {
            throw new Error('Expected Vertex arguments.');
        }
    }

    // implementation with recurions instead of a stack - ** try a stack implementation **
    // the recursion acts as a stack, popping off the last vertex when it reaches the end of a path
    // this methid only traverses, the callback is for adding some other functionality
    depthFirstTraversal(callback, start = this.vertices[0], visitedVertices = [start]) {
        callback(start);
        start.edges.forEach((edge) => {
            const neighbour = edge.end;
            if (!visitedVertices.includes(neighbour)) {
                // the visitedVertices list ensures we don't enter an infinate loop 
                // when the traversal encounters a cycle or it's neighbour has already been visited
                visitedVertices.push(neighbour);
                this.depthFirstTraversal(callback, neighbour, visitedVertices);
            }
        });
    }


    // implementation with a queue
    breathFirstTraversal(callback, start = this.vertices[0]) {
        const visitedVertices = [start];
        const visitQueue = new Queue();
        visitQueue.enqueue(start);
        while (!visitQueue.isEmpty()) {
            const current = visitQueue.dequeue();
            callback(current);
            current.edges.forEach((edge) => {
                const neighbour = edge.end;
                if (!visitedVertices.includes(neighbour)) {
                    visitedVertices.push(neighbour);
                    visitQueue.enqueue(neighbour);
                }
            })
        }
    }

    print() {
        this.vertices.forEach(vertex => vertex.print());
    }
}

const myGraph = new Graph();

const a = myGraph.addVertex('a');
const b = myGraph.addVertex('b');
const c = myGraph.addVertex('c');
const d = myGraph.addVertex('d');

myGraph.addEdge(a, b);
myGraph.addEdge(a, c);
myGraph.addEdge(a, d);
myGraph.addEdge(b, c);
myGraph.addEdge(b, d);
myGraph.addEdge(c, d);

// myGraph.print()

// // print the data as you traverse the graph
// myGraph.depthFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`));
// myGraph.breathFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`));

// // print the data as you traverse starting from vertex c
// myGraph.depthFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`), c);
// myGraph.breathFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`), c);

