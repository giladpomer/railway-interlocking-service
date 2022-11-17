exports.findNodeByName = function (graphNodes, nodeName) {
    return graphNodes.filter(node => node.name === nodeName)[0];
}