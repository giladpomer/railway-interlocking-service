const StationGraphUtils = require('./station-graph-utils');

exports.buildGraph = function (stationGraphData) {
    let graphNodes = createGraphNodes(stationGraphData);
    connectGraphNodes(graphNodes, stationGraphData);

    let stationEntryNode = findStationEntryNode(graphNodes);
    return {
        entry: stationEntryNode,
        nodes: graphNodes//for performance, when the station is empty, or for quick search by name (a dictionary would be even better in a later version)
    };
}

function createGraphNodes(stationGraphData) {
    let graphNodes = [];

    for (var i = 0; i < stationGraphData.length; i++) {
        let stationGraphEntryData = stationGraphData[i];

        addNodeIfDoesNotExist(graphNodes, stationGraphEntryData.start);
        addNodeIfDoesNotExist(graphNodes, stationGraphEntryData.end);
    }

    return graphNodes;
}

function addNodeIfDoesNotExist(graphNodes, nodeName) {
    if (graphNodes.map(node => node.name).indexOf(nodeName) === -1) {
        graphNodes.push({
            name: nodeName,
            connectedNodes: []
        });
    }
}

function connectGraphNodes(graphNodes, stationGraphData) {
    for (var i = 0; i < stationGraphData.length; i++) {
        let stationGraphEntryData = stationGraphData[i];

        let startNode = StationGraphUtils.findNodeByName(graphNodes, stationGraphEntryData.start);
        let endNode = StationGraphUtils.findNodeByName(graphNodes, stationGraphEntryData.end);

        let connector = createConnector();

        startNode.connectedNodes.push(createConnectedNode(endNode, connector));
        endNode.connectedNodes.push(createConnectedNode(startNode, connector));
    }
}

function createConnector() {
    return {
        occupied: false
    };
}

function createConnectedNode(node, connector) {
    return {
        node: node,
        connector: connector
    };
}

function findStationEntryNode(graphNodes) {
    return graphNodes.filter(node => node.connectedNodes.length === 1)[0];
}