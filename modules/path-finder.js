exports.findPaths = function (startNode, endNode) {
    let pathsFound = [];
    findPaths_Recursive(startNode, startNode, endNode, [], pathsFound);
    return pathsFound;
}

function findPaths_Recursive(currentNode, startNode, endNode, path, pathsFound) {
    if (currentNode === endNode) {
        pathsFound.push(path);
    }

    for (var i = 0; i < currentNode.connectedNodes.length; i++) {
        let connectedNode = currentNode.connectedNodes[i];
        let nextNode = connectedNode.node;

        if (!isNodeInPath(nextNode, path) && nextNode !== startNode) {
            let currentPath = [...path];
            currentPath.push(connectedNode);

            findPaths_Recursive(nextNode, startNode, endNode, currentPath, pathsFound);
        }
    }
}

function isNodeInPath(node, path) {
    return path.map(connectedNode => connectedNode.node).indexOf(node) > -1;
}