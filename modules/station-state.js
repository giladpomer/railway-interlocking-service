const StationGraphUtils = require('./station-graph-utils');
const PathFinder = require('./path-finder');

exports.setStationState = function (stationGraph, routesData) {
    let occupiedRoutes = getOccupiedRoutes(routesData);

    for (var i = 0; i < occupiedRoutes.length; i++) {
        let occupiedRouteData = occupiedRoutes[i];
        setOccupiedRouteStationState(stationGraph, occupiedRouteData);
    }
}

function getOccupiedRoutes(routesData) {
    return routesData.filter(route => route.occupied);
}

function setOccupiedRouteStationState(stationGraph, occupiedRouteData) {
    let startNode = StationGraphUtils.findNodeByName(stationGraph.nodes, occupiedRouteData.start);
    let endNode = StationGraphUtils.findNodeByName(stationGraph.nodes, occupiedRouteData.end);

    let paths = PathFinder.findPaths(startNode, endNode);
    for (var i = 0; i < paths.length; i++) {
        let path = paths[i];
        setOccupiedPathState(path);
    }
}

function setOccupiedPathState(path) {
    for (var i = 0; i < path.length; i++) {
        let connectedNode = path[i];
        connectedNode.connector.occupied = true;
    }
}