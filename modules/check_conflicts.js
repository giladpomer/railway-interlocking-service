const GraphBuilder = require('./graph-builder');
const StationState = require('./station-state');
const RouteChecker = require('./route-checker');

function check_conflicts(data) {
    let stationGraph = GraphBuilder.buildGraph(data.station_graph);
    StationState.setStationState(stationGraph, data.routes);

    let success = RouteChecker.isStationEmpty(stationGraph)
        || RouteChecker.isRouteNotOccupied(stationGraph, data.check_route);

    return {
        success: success
    };
}

module.exports = check_conflicts;