const StationGraphUtils = require('./station-graph-utils');
const PathFinder = require('./path-finder');

exports.isStationEmpty = function (stationGraph) {
    for (var i = 0; i < stationGraph.nodes.length; i++) {
        let node = stationGraph.nodes[i];

        if (isAnyNodeConnectionOccupied(node)) {
            return false;
        }
    }

    return true;
}

function isAnyNodeConnectionOccupied(node) {
    return node.connectedNodes
        .filter(connectedNode => connectedNode.connector.occupied)
        .length > 0;
}

exports.isRouteNotOccupied = function (stationGraph, routeToCheck) {
    let startNode = StationGraphUtils.findNodeByName(stationGraph.nodes, routeToCheck.start);
    let endNode = StationGraphUtils.findNodeByName(stationGraph.nodes, routeToCheck.end);

    let paths = PathFinder.findPaths(startNode, endNode);
    for (var i = 0; i < paths.length; i++) {
        let path = paths[i];
        if (isPathOccupied(path)) {
            return false;
        }
    }

    return true;
}

function isPathOccupied(path) {
    for (var i = 0; i < path.length; i++) {
        let connectedNode = path[i];
        if (connectedNode.connector.occupied) {
            return true;
        }
    }

    return false;
}