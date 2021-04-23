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

    ### METHODS FOR TRAVERSING
    -- depth-first search (DFS)
        helpful for detecting if a path exists between two vertices
        can use a stack or recursion to keep track of vertices
    -- breath-first search (BFS)
        helpful for finding the shortest path between two vertices
        uses a queue to keep track of vertices
    -- Dijkstra’s algorithm (pronounced die-k-stra)
        used for finding the shortest distance from a given point to every other point in a weighted graph
        use a min-heap to keep track of all the distances
        the runtime of is O((E+V)log V) (traversal plus maintaining the min-heap)
        does not work with negative edge weights

    ### RUNTIME OF TRAVERSAL
        O(vertices + edges);    
*/

const Queue = require('./queue');
const PriorityQueue = require('./priority-queue');

class Edge {
    // setting the default weight to 1 instead of null so we can still use
    // dijkstra's algo to find the shortest path for an unweighted graph
    // also make a change to the addEdge method
    constructor(start, end, weight = 1) {
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
        const edgeWeight = this.isWeighted ? weight : 1;

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

    getVertexByValue(value) {
        return this.vertices.find(vertex => vertex.data === value);
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

    
    dijkstras(startingVertex = this.vertices[0]) {
        // this is the set up, every vertex's data will be a key in the distances and previous objects
        // we want to initiate the value of all the keys in distance to Infinity (except the startingVertex)
        // and we want to initiate the value of all the keys in previous to null
        const distances = {};
        const previous = {};
        const queue = new PriorityQueue();

        queue.add({ vertex: startingVertex, priority: 0 });

        this.vertices.forEach((vertex) => {
            distances[vertex.data] = Infinity;
            previous[vertex.data] = null;
        })

        distances[startingVertex.data] = 0;

        // now we start to iterate through the queue as a breath first search
        while (!queue.isEmpty()) {
            const { vertex } = queue.popMin();

            vertex.edges.forEach((edge) => {
                const alternate = edge.weight + distances[vertex.data];
                const neighbourValue = edge.end.data;

                if (alternate < distances[neighbourValue]) {
                    distances[neighbourValue] = alternate;
                    previous[neighbourValue] = vertex;

                    queue.add({ vertex: edge.end, priority: distances[neighbourValue] });
                }
            })
        }
        return { distances, previous };
    }

    print() {
        this.vertices.forEach(vertex => vertex.print());
    }
}

const myGraph = new Graph(true);

const a = myGraph.addVertex('a');
const b = myGraph.addVertex('b');
const c = myGraph.addVertex('c');
const d = myGraph.addVertex('d');

myGraph.addEdge(a, b, 1);
myGraph.addEdge(a, d, 7);
myGraph.addEdge(b, c, 3);
myGraph.addEdge(c, d, 4);

// myGraph.print()

// // print the data as you traverse the graph
// myGraph.depthFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`));
// myGraph.breathFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`));

// // print the data as you traverse starting from vertex c
// myGraph.depthFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`), c);
// myGraph.breathFirstTraversal((vertex) => console.log(`The current value is ${vertex.data}`), c);

console.log(myGraph.dijkstras());