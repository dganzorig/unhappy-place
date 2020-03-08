/*
    Initially events come in the form:
    [
        creation_date: <string>,
        place_id: <string>,
        auth0_uid: <string>,
        coords: {
            lat: float,
            lng: float
        }
    ],
    ...

    However, for the Anxiety Map, we want to actually reduce this list
    (which may contain duplicate places) into distinct places with counts
    associated with them --> so that we can render the circle size accordingly
    instead of overlapping duplicate circles

    Ex:

    [
        place_id: <string>,
        coords: {
            lat: float,
            lng: float
        }
        count: int
    ],
    ...
*/
export default function processEvents(events) {
    let counterDict = {}
    for (let i = 0; i < events.length; i++) {
        const place_id = events[i].place_id;
        if (place_id in counterDict) {
            counterDict[place_id].count += 1
        } else {
            counterDict[place_id] = {
                place_id: place_id,
                coords: events[i].coords,
                count: 1
            }
        }
    }
    return Object.values(counterDict);
}