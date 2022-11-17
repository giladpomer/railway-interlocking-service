# Railway Interlocking Web Service
A [Node.js](https://nodejs.org/) web service implementing the central functionality of a railway interlocking.

The service checks for conflicts while assuming the worst case scenario:
+ It is possible to travel in all directions between track points.
+ Trains can travel in both directions, but only one track exists between the two points. so if a section is occupied, it's considered to be occupied in both directions.

## Try it now!
> Please note that the web service sleeps when it's not frequently called. Calling an endpoint will start the service (this can take around 40 seconds for the first call)

The web service is available at https://railway-interlocking-service.onrender.com/

### Calling the service
There is currently only one endpoint available `/check_conflicts`

Please call the service in the same structure described below:
```
curl -X POST https://railway-interlocking-service.onrender.com/check_conflicts \
 -H 'content-type: application/json' -d \
'
{
        "station_graph": [
            { "start": "Station West", "end": "Entry Signal West" },
            { "start": "Entry Signal West", "end": "Point 1" },
            { "start": "Point 1", "end": "Exit Signal West 1" },
            { "start": "Point 1", "end": "Exit Signal West 2" },
            { "start": "Exit Signal West 1", "end": "Exit Signal East 1" },
            { "start": "Exit Signal West 2", "end": "Exit Signal East 2" },
            { "start": "Exit Signal East 1", "end": "Point 2" },
            { "start": "Exit Signal East 2", "end": "Point 2" },
            { "start": "Point 2", "end": "Entry Signal East" },
            { "start": "Entry Signal East", "end": "Station East" }
        ],
        "routes": [
            { "start": "Entry Signal West", "end": "Exit Signal East 1", "occupied": false },
            { "start": "Entry Signal West", "end": "Exit Signal East 2", "occupied": false },
            { "start": "Exit Signal East 1", "end": "Station East", "occupied": false },
            { "start": "Exit Signal East 2", "end": "Station East", "occupied": false },
            { "start": "Entry Signal East", "end": "Exit Signal West 1", "occupied": false },
            { "start": "Entry Signal East", "end": "Exit Signal West 2", "occupied": false },
            { "start": "Exit Signal West 1", "end": "Station West", "occupied": true },
            { "start": "Exit Signal West 2", "end": "Station West", "occupied": false }
        ],
        "check_route": {
            "start": "Entry Signal West",
            "end": "Exit Signal East 2"
        }
}
'
```

## Continuous Integration (CI)
All [jest](https://jestjs.io/) unit tests will automatically run on every push to this GitHub repository before trying to deploy.

## Continuous Deployment (CD)
The repository is automatically deployed on every successful push (all tests passing) to this GitHub repository using [render](https://render.com/).

## External Packages
+ [Express.js](https://expressjs.com/)
+ [Jest](https://jestjs.io/)
