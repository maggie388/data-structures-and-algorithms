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

*/

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

    print() {
        this.vertices.forEach(vertex => vertex.print());
    }
}
