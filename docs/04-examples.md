---
id: 04-examples
sidebar_position: 4
title: "Practical Examples"
---

# Code That Actually Works (Copy, Paste, Learn)

Theory is cool. Running code is cooler.

This chapter has three complete examples you can run right now. No ROS installation required. Just Node.js.

## Learning Outcomes

When you finish here, you'll:

- **Build** a multi-sensor fusion system from scratch
- **Implement** voice-to-action command parsing (like Alexa for robots)
- **Create** a pathfinding algorithm that dodges obstacles

## Example 1: Sensor Fusion (The Robot's Reality Check)

Robots don't trust single sensors. Why? Because sensors lie.

A camera might see a wall that isn't there (reflection). LiDAR might miss a glass door. IMU might drift over time. The solution? Combine all of them.

```javascript
// sensor-fusion.js — Multi-sensor data fusion for robotics
class RobotPerception {
  constructor(robotName) {
    this.name = robotName;
    this.sensors = {};
    this.worldModel = { obstacles: [], floor: "unknown", stable: null };
    console.log(`🤖 ${robotName} perception system starting...`);
  }

  // Simulated LiDAR returns distance to nearest object in each direction
  processLidar(scan) {
    const nearby = scan.filter((reading) => reading.distance < 2.0);
    const clearPath = scan.filter((reading) => reading.distance > 3.0);

    this.sensors.lidar = {
      timestamp: Date.now(),
      nearestObstacle: Math.min(...scan.map((r) => r.distance)),
      threatCount: nearby.length,
      clearDirections: clearPath.map((r) => r.angle),
    };

    console.log(
      `📡 LiDAR: ${
        nearby.length
      } close objects, nearest at ${this.sensors.lidar.nearestObstacle.toFixed(
        2
      )}m`
    );
    return this;
  }

  // IMU tells us if we're upright
  processIMU(accel, gyro) {
    const expectedGravity = -9.81;
    const tilt = Math.abs(accel.y - expectedGravity);

    this.sensors.imu = {
      timestamp: Date.now(),
      tiltDeviation: tilt,
      isStable: tilt < 0.5,
      angularVelocity: Math.sqrt(gyro.x ** 2 + gyro.y ** 2 + gyro.z ** 2),
    };

    const status = this.sensors.imu.isStable ? "✅ Stable" : "⚠️ Tilting";
    console.log(`🎯 IMU: ${status}, deviation: ${tilt.toFixed(3)}°`);
    return this;
  }

  // Camera object detection (simulated)
  processVision(detectedObjects) {
    this.sensors.camera = {
      timestamp: Date.now(),
      objects: detectedObjects,
      personDetected: detectedObjects.some((o) => o.label === "person"),
      avgConfidence:
        detectedObjects.reduce((sum, o) => sum + o.confidence, 0) /
        detectedObjects.length,
    };

    console.log(
      `👁️ Camera: ${detectedObjects.length} objects (avg confidence: ${(
        this.sensors.camera.avgConfidence * 100
      ).toFixed(1)}%)`
    );
    return this;
  }

  // The magic: combine all sensor data into one coherent world model
  fuse() {
    const hasAllData =
      this.sensors.lidar && this.sensors.imu && this.sensors.camera;

    if (!hasAllData) {
      console.log("⏳ Waiting for all sensors...");
      return null;
    }

    // Calculate overall confidence based on sensor agreement
    const spatialConfidence =
      this.sensors.lidar.nearestObstacle > 1.0 ? 0.9 : 0.6;
    const stabilityConfidence = this.sensors.imu.isStable ? 1.0 : 0.3;
    const visionConfidence = this.sensors.camera.avgConfidence;

    this.worldModel = {
      timestamp: Date.now(),
      safeToMove:
        this.sensors.lidar.nearestObstacle > 0.5 && this.sensors.imu.isStable,
      obstacles: this.sensors.lidar.threatCount,
      nearestThreat: this.sensors.lidar.nearestObstacle,
      visibleObjects: this.sensors.camera.objects.map((o) => o.label),
      overallConfidence: (
        (spatialConfidence + stabilityConfidence + visionConfidence) /
        3
      ).toFixed(2),
      recommendation: this._getRecommendation(),
    };

    console.log("\n🧠 FUSED WORLD MODEL:");
    console.log(JSON.stringify(this.worldModel, null, 2));
    return this.worldModel;
  }

  _getRecommendation() {
    if (!this.sensors.imu.isStable) return "STOP: Stabilize first";
    if (this.sensors.lidar.nearestObstacle < 0.5)
      return "STOP: Obstacle too close";
    if (this.sensors.camera.personDetected) return "SLOW: Person nearby";
    return "CLEAR: Safe to proceed";
  }
}

// Demo
console.log("═══════════════════════════════════════════════");
console.log("      SENSOR FUSION DEMONSTRATION");
console.log("═══════════════════════════════════════════════\n");

const robot = new RobotPerception("Atlas-7");

robot
  .processLidar([
    { angle: 0, distance: 3.5 },
    { angle: 45, distance: 1.8 },
    { angle: 90, distance: 5.2 },
    { angle: 135, distance: 2.1 },
    { angle: 180, distance: 4.8 },
  ])
  .processIMU({ x: 0.05, y: -9.78, z: 0.02 }, { x: 0.001, y: -0.002, z: 0.001 })
  .processVision([
    { label: "chair", confidence: 0.92 },
    { label: "table", confidence: 0.88 },
    { label: "person", confidence: 0.95 },
  ])
  .fuse();
```

## Example 2: Voice-to-Action (Talk to Your Robot)

This is how robots understand commands like "go to the kitchen" or "pick up that cup."

```javascript
// voice-to-action.js — Natural language command processor
const ROBOT_ACTIONS = {
  MOVE: { params: ["direction", "speed"], category: "locomotion" },
  TURN: { params: ["angle", "direction"], category: "locomotion" },
  STOP: { params: [], category: "locomotion" },
  GRAB: { params: ["target"], category: "manipulation" },
  RELEASE: { params: [], category: "manipulation" },
  NAVIGATE: { params: ["destination"], category: "navigation" },
  SCAN: { params: ["area"], category: "perception" },
};

class VoiceCommandProcessor {
  constructor() {
    this.vocabulary = {
      movement: ["go", "move", "walk", "run", "step", "advance"],
      stopping: ["stop", "halt", "freeze", "wait", "pause"],
      turning: ["turn", "rotate", "spin", "face"],
      grabbing: ["grab", "pick", "take", "get", "hold", "grasp"],
      releasing: ["put", "place", "drop", "release", "set"],
      navigation: ["go to", "navigate", "find", "locate", "head to"],
    };

    this.locations = [
      "kitchen",
      "bedroom",
      "bathroom",
      "living room",
      "garage",
      "office",
      "entrance",
    ];
    this.directions = {
      forward: [1, 0],
      backward: [-1, 0],
      left: [0, -1],
      right: [0, 1],
    };
  }

  process(voiceInput) {
    const input = voiceInput.toLowerCase().trim();
    console.log(`\n🎤 Voice Input: "${voiceInput}"`);

    let action = this._parseCommand(input);

    console.log(`🎯 Parsed Action: ${action.type}`);
    console.log(`   Parameters: ${JSON.stringify(action.params)}`);
    console.log(`   Confidence: ${(action.confidence * 100).toFixed(0)}%`);

    return action;
  }

  _parseCommand(input) {
    // Check for navigation commands first (multi-word)
    for (const loc of this.locations) {
      if (input.includes(loc)) {
        return {
          type: "NAVIGATE",
          params: { destination: loc, mode: "autonomous" },
          confidence: 0.9,
          original: input,
        };
      }
    }

    // Movement
    if (this.vocabulary.movement.some((w) => input.includes(w))) {
      const dir =
        Object.keys(this.directions).find((d) => input.includes(d)) ||
        "forward";
      const fast =
        input.includes("fast") ||
        input.includes("quick") ||
        input.includes("run");
      return {
        type: "MOVE",
        params: {
          direction: dir,
          speed: fast ? 2.0 : 1.0,
          vector: this.directions[dir],
        },
        confidence: 0.85,
        original: input,
      };
    }

    // Stopping
    if (this.vocabulary.stopping.some((w) => input.includes(w))) {
      return {
        type: "STOP",
        params: {
          immediate: input.includes("now") || input.includes("immediately"),
        },
        confidence: 0.95,
        original: input,
      };
    }

    // Grabbing
    if (this.vocabulary.grabbing.some((w) => input.includes(w))) {
      const words = input.split(" ");
      const actionWord = this.vocabulary.grabbing.find((w) =>
        input.includes(w)
      );
      const targetStart = input.indexOf(actionWord) + actionWord.length;
      const target = input.slice(targetStart).trim() || "unknown object";

      return {
        type: "GRAB",
        params: { target: target, gripStrength: "adaptive" },
        confidence: 0.8,
        original: input,
      };
    }

    // Unknown command
    return {
      type: "UNKNOWN",
      params: {
        suggestion:
          'Try: "go forward", "pick up the cup", or "navigate to kitchen"',
      },
      confidence: 0.0,
      original: input,
    };
  }
}

// Demo
console.log("═══════════════════════════════════════════════");
console.log("      VOICE-TO-ACTION DEMONSTRATION");
console.log("═══════════════════════════════════════════════");

const commander = new VoiceCommandProcessor();

const testCommands = [
  "Move forward quickly",
  "Stop right now",
  "Go to the kitchen",
  "Pick up the coffee mug",
  "Turn left",
  "Do a backflip", // Should fail gracefully
];

testCommands.forEach((cmd) => commander.process(cmd));
```

## Example 3: A\* Pathfinding (How Robots Navigate)

This is the actual algorithm that navigation systems use. It's simpler than you think:

```javascript
// pathfinder.js — A* algorithm for robot navigation
class GridWorld {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(0));
    this.path = [];
  }

  addObstacle(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = 1;
    }
    return this;
  }

  findPath(start, goal) {
    const openSet = [
      { ...start, g: 0, h: this._heuristic(start, goal), parent: null },
    ];
    const closedSet = new Set();

    while (openSet.length > 0) {
      // Get node with lowest f = g + h
      openSet.sort((a, b) => a.g + a.h - (b.g + b.h));
      const current = openSet.shift();

      // Goal reached?
      if (current.x === goal.x && current.y === goal.y) {
        this.path = this._reconstructPath(current);
        return this.path;
      }

      closedSet.add(`${current.x},${current.y}`);

      // Check neighbors
      for (const neighbor of this._getNeighbors(current)) {
        const key = `${neighbor.x},${neighbor.y}`;

        if (closedSet.has(key)) continue;
        if (this.grid[neighbor.y]?.[neighbor.x] === 1) continue;

        const g = current.g + 1;
        const existing = openSet.find(
          (n) => n.x === neighbor.x && n.y === neighbor.y
        );

        if (!existing || g < existing.g) {
          const node = {
            ...neighbor,
            g,
            h: this._heuristic(neighbor, goal),
            parent: current,
          };

          if (!existing) openSet.push(node);
          else Object.assign(existing, node);
        }
      }
    }

    return null; // No path found
  }

  _heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  _getNeighbors(node) {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    return dirs
      .map(([dx, dy]) => ({ x: node.x + dx, y: node.y + dy }))
      .filter(
        (n) => n.x >= 0 && n.x < this.width && n.y >= 0 && n.y < this.height
      );
  }

  _reconstructPath(node) {
    const path = [];
    while (node) {
      path.unshift({ x: node.x, y: node.y });
      node = node.parent;
    }
    return path;
  }

  visualize() {
    console.log("\n📍 Grid Visualization:");
    console.log("   " + [...Array(this.width)].map((_, i) => i).join(" "));

    for (let y = 0; y < this.height; y++) {
      let row = `${y}  `;
      for (let x = 0; x < this.width; x++) {
        const isPath = this.path.some((p) => p.x === x && p.y === y);
        const isStart = this.path[0]?.x === x && this.path[0]?.y === y;
        const isGoal =
          this.path[this.path.length - 1]?.x === x &&
          this.path[this.path.length - 1]?.y === y;

        if (isStart) row += "🚀";
        else if (isGoal) row += "🎯";
        else if (isPath) row += "→ ";
        else if (this.grid[y][x] === 1) row += "██";
        else row += "· ";
      }
      console.log(row);
    }
  }
}

// Demo
console.log("═══════════════════════════════════════════════");
console.log("      A* PATHFINDING DEMONSTRATION");
console.log("═══════════════════════════════════════════════");

const world = new GridWorld(10, 8);

// Add a wall
world
  .addObstacle(4, 2)
  .addObstacle(4, 3)
  .addObstacle(4, 4)
  .addObstacle(4, 5)
  .addObstacle(5, 5);

const start = { x: 1, y: 3 };
const goal = { x: 8, y: 3 };

console.log(`\n🚀 Start: (${start.x}, ${start.y})`);
console.log(`🎯 Goal: (${goal.x}, ${goal.y})`);

const path = world.findPath(start, goal);

if (path) {
  console.log(`✅ Path found! ${path.length} steps`);
  world.visualize();
  console.log(
    `\n📍 Waypoints: ${path.map((p) => `(${p.x},${p.y})`).join(" → ")}`
  );
} else {
  console.log("❌ No path exists!");
}
```

Run each of these. Modify them. Break them. That's how you learn robotics.

## References

1. Sensor Fusion Overview — https://www.mathworks.com/help/fusion/
2. A\* Pathfinding — https://www.redblobgames.com/pathfinding/a-star/
3. Voice Interfaces in Robotics — https://arxiv.org/abs/2204.06674
