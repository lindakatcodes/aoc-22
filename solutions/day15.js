import * as h from '../utils/helpers.ts';

const data = await h.readData('./inputs/day15input.txt');
const positions = h.strInput(data);

// setup
const sensors = [];
const beacons = [];
const beaconNames = new Set();
const allx = [];
const ally = [];

for (let i = 0; i < positions.length; i++) {
  const row = positions[i].split(' ');
  const senX = +row[2].slice(2, -1);
  const senY = +row[3].slice(2, -1);
  const beaX = +row[8].slice(2, -1);
  const beaY = +row[9].slice(2);

  const sensor = {
    name: `${senX}, ${senY}`,
    position: [senX, senY],
    closestBeacon: [beaX, beaY],
    beaconDist: h.manhattanDistance([senX, senY], [beaX, beaY]),
    xrange: [],
    yrange: []
  }
  sensor.xrange = [sensor.position[0] - sensor.beaconDist, sensor.position[0] + sensor.beaconDist];
  sensor.yrange = [sensor.position[1] - sensor.beaconDist, sensor.position[1] + sensor.beaconDist];
  
  sensors.push(sensor);

  const beaconName = `${beaX}, ${beaY}`;
  beaconNames.add(beaconName);

  allx.push(senX, beaX);
  ally.push(senY, beaY);
}

beaconNames.forEach((val) => {
  const pos = val.split(', ').map((v) => +v);
  const beacon = {
    position: pos,
    sensorList: [],
  }

  const closeSensors = sensors.filter((sensor) => sensor.closestBeacon[0] === pos[0] && sensor.closestBeacon[1] === pos[1]);
  closeSensors.forEach((sensor) => beacon.sensorList.push(sensor.name));

  beacons.push(beacon);
})

allx.sort((a, b) => a - b);
ally.sort((a, b) => a - b);
const xmin = allx[0];
const xmax = allx[allx.length - 1];
const ymin = ally[0];
const ymax = ally[ally.length - 1];

// console.log(sensors);

// part 1
const rowToCheck = 2000000;
let noBeaconCount = 0;

for (let x = xmin; x <= xmax; x++) {
  let noBeacon = false;
  // if we're on a beacon, clearly this doesn't go in our sum
  const isBeacon = beacons.filter((beacon) => beacon.position[0] === x && beacon.position[1] === rowToCheck).length > 0;
  // if we're on a sensor, this this for sure is not a beacon
  const isSensor = sensors.filter((sensor) => sensor.position[0] === x && sensor.position[1] === rowToCheck).length > 0;

  if (isSensor) {
    noBeacon = true;
  } else if (!isBeacon && !isSensor) {
    const sensorsToCheck = sensors.filter((sensor) => sensor.yrange[0] <= rowToCheck && sensor.yrange[1] >= rowToCheck);
    if (sensorsToCheck.length > 0) {
      sensorsToCheck.forEach((sensor) => {
        const distFromCurrent = h.manhattanDistance([x, rowToCheck], sensor.position);
        if (distFromCurrent <= sensor.beaconDist) {
          noBeacon = true;
        }
      })
    }
  }

  if (noBeacon) {
    noBeaconCount++;
  }
}

console.log(noBeaconCount);

// part 1 first guess is 3818017, which AoC says is too low. so on the right track, but somewhere something's not being counted right. 