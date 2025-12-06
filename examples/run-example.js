/**
 * ============================================
 * 🤖 PHYSICAL AI DEMO — The Complete Package
 * ============================================
 *
 * This isn't just a boring example. This is a mini robot simulation
 * that shows you how real Physical AI systems work.
 *
 * Run: node examples/run-example.js
 * Requires: Node.js 16+ (no npm packages needed!)
 */

// ============================================
// PART 1: THE SENSOR SUITE
// ============================================

class RobotSensors {
  constructor() {
    console.log("🔌 Initializing sensor suite...");
  }

  getLidar() {
    // 360-degree scan, random obstacles
    const readings = [];
    for (let angle = 0; angle < 360; angle += 15) {
      const hasObstacle = angle >= 30 && angle <= 75;
      readings.push({
        angle,
        distance: hasObstacle
          ? 0.8 + Math.random() * 0.5
          : 3 + Math.random() * 5,
      });
    }
    return readings;
  }

  getIMU() {
    return {
      accelerometer: {
        x: (Math.random() - 0.5) * 0.1,
        y: -9.81 + (Math.random() - 0.5) * 0.08, // Gravity with noise
        z: (Math.random() - 0.5) * 0.1,
      },
      gyroscope: {
        pitch: (Math.random() - 0.5) * 0.02,
        roll: (Math.random() - 0.5) * 0.02,
        yaw: (Math.random() - 0.5) * 0.01,
      },
    };
  }

  getCamera() {
    const objects = [
      "chair",
      "table",
      "person",
      "door",
      "cup",
      "phone",
      "plant",
    ];
    const detected = [];
    const count = 2 + Math.floor(Math.random() * 3);

    for (let i = 0; i < count; i++) {
      detected.push({
        label: objects[Math.floor(Math.random() * objects.length)],
        confidence: 0.7 + Math.random() * 0.29,
        distance: 1 + Math.random() * 4,
      });
    }
    return detected;
  }
}

// ============================================
// PART 2: THE BRAIN (Decision Making)
// ============================================

class RobotBrain {
  constructor(name) {
    this.name = name;
    this.state = {
      position: { x: 0, y: 0 },
      status: "idle",
      battery: 100,
      mood: "happy", // Yes, robots have moods now
    };
  }

  analyze(sensorData) {
    const { lidar, imu, camera } = sensorData;

    // Check stability
    const gravityDeviation = Math.abs(imu.accelerometer.y + 9.81);
    const isStable = gravityDeviation < 0.3;

    // Check surroundings
    const nearestObstacle = Math.min(...lidar.map((r) => r.distance));
    const isClear = nearestObstacle > 1.5;

    // Check for humans
    const personNearby = camera.some((obj) => obj.label === "person");

    return {
      stable: isStable,
      pathClear: isClear,
      nearestObstacle: nearestObstacle.toFixed(2),
      personDetected: personNearby,
      objectCount: camera.length,
      recommendation: this._getRecommendation(isStable, isClear, personNearby),
    };
  }

  _getRecommendation(stable, clear, person) {
    if (!stable) return "🔴 STOP — Stabilize first!";
    if (person) return "🟡 SLOW — Human nearby";
    if (!clear) return "🟡 CAUTION — Obstacle ahead";
    return "🟢 PROCEED — Path clear";
  }

  executeCommand(cmd) {
    const command = cmd.toLowerCase();

    if (command.includes("forward")) {
      this.state.position.x += 1;
      this.state.status = "moving";
      this.state.battery -= 0.5;
      return { action: "MOVE", success: true };
    }

    if (command.includes("left")) {
      this.state.position.y -= 1;
      return { action: "TURN_LEFT", success: true };
    }

    if (command.includes("right")) {
      this.state.position.y += 1;
      return { action: "TURN_RIGHT", success: true };
    }

    if (command.includes("stop")) {
      this.state.status = "stopped";
      return { action: "STOP", success: true };
    }

    if (command.includes("dance")) {
      this.state.mood = "excited";
      return { action: "DANCE", success: true, note: "🕺 Robot is vibing!" };
    }

    return { action: "UNKNOWN", success: false };
  }
}

// ============================================
// PART 3: THE DEMO
// ============================================

function main() {
  console.log("");
  console.log(
    "╔══════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║     🤖 PHYSICAL AI & HUMANOID ROBOTICS — LIVE DEMO          ║"
  );
  console.log(
    "╚══════════════════════════════════════════════════════════════╝"
  );
  console.log("");

  // Initialize systems
  const sensors = new RobotSensors();
  const brain = new RobotBrain("Atlas-7");

  // Step 1: Sensor Readings
  console.log(
    "═══════════════════════════════════════════════════════════════"
  );
  console.log("   STEP 1: SENSOR DATA ACQUISITION");
  console.log(
    "═══════════════════════════════════════════════════════════════\n"
  );

  const sensorData = {
    lidar: sensors.getLidar(),
    imu: sensors.getIMU(),
    camera: sensors.getCamera(),
  };

  console.log(`📡 LiDAR: ${sensorData.lidar.length} readings captured`);
  console.log(
    `🎯 IMU: Gravity = ${sensorData.imu.accelerometer.y.toFixed(3)} m/s²`
  );
  console.log(`👁️  Camera: ${sensorData.camera.length} objects detected:`);
  sensorData.camera.forEach((obj) => {
    console.log(
      `     • ${obj.label} (${(obj.confidence * 100).toFixed(
        0
      )}% confidence, ${obj.distance.toFixed(1)}m away)`
    );
  });

  // Step 2: Analysis
  console.log(
    "\n═══════════════════════════════════════════════════════════════"
  );
  console.log("   STEP 2: BRAIN ANALYSIS");
  console.log(
    "═══════════════════════════════════════════════════════════════\n"
  );

  const analysis = brain.analyze(sensorData);
  console.log(`   Stability: ${analysis.stable ? "✅ Stable" : "❌ Unstable"}`);
  console.log(`   Path: ${analysis.pathClear ? "✅ Clear" : "⚠️ Blocked"}`);
  console.log(`   Nearest obstacle: ${analysis.nearestObstacle}m`);
  console.log(
    `   Human nearby: ${analysis.personDetected ? "👤 Yes" : "❌ No"}`
  );
  console.log(`\n   💡 Recommendation: ${analysis.recommendation}`);

  // Step 3: Command Execution
  console.log(
    "\n═══════════════════════════════════════════════════════════════"
  );
  console.log("   STEP 3: COMMAND PROCESSING");
  console.log(
    "═══════════════════════════════════════════════════════════════\n"
  );

  const commands = ["move forward", "turn left", "dance", "stop"];

  commands.forEach((cmd) => {
    const result = brain.executeCommand(cmd);
    console.log(
      `   🎤 "${cmd}" → ${result.action} ${result.success ? "✅" : "❌"} ${
        result.note || ""
      }`
    );
  });

  // Step 4: Final State
  console.log(
    "\n═══════════════════════════════════════════════════════════════"
  );
  console.log("   STEP 4: FINAL ROBOT STATE");
  console.log(
    "═══════════════════════════════════════════════════════════════\n"
  );

  console.log(`   🤖 ${brain.name}`);
  console.log(
    `   📍 Position: (${brain.state.position.x}, ${brain.state.position.y})`
  );
  console.log(`   📊 Status: ${brain.state.status}`);
  console.log(`   🔋 Battery: ${brain.state.battery}%`);
  console.log(`   😊 Mood: ${brain.state.mood}`);

  // Summary
  console.log(
    "\n╔══════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║                    ✅ DEMO COMPLETE                          ║"
  );
  console.log(
    "╠══════════════════════════════════════════════════════════════╣"
  );
  console.log(
    "║  This demo showed you:                                       ║"
  );
  console.log(
    "║    1. How robots collect sensor data (LiDAR, IMU, Camera)    ║"
  );
  console.log(
    "║    2. How the brain fuses data and makes decisions           ║"
  );
  console.log(
    "║    3. How voice commands become robot actions                ║"
  );
  console.log(
    "║                                                              ║"
  );
  console.log(
    "║  Now go build something awesome! 🚀                          ║"
  );
  console.log(
    "╚══════════════════════════════════════════════════════════════╝"
  );
  console.log("");
}

// Run the demo!
main();
