---
id: 05-appendix
sidebar_position: 5
title: "Appendix & Resources"
---

# Resources: What to Buy, Where to Learn, What's Next

You've made it to the end. Let's talk about turning this knowledge into something real.

## Learning Outcomes

After this chapter, you'll:

- **Know** exactly what hardware to buy at each budget level
- **Understand** the cloud vs local tradeoff for robot development
- **Have** a clear path for continuing your Physical AI journey

## Hardware Reality Check

Let's cut through the marketing. Here's what you actually need:

### The Workstation (Your Digital Twin Factory)

| Component | Minimum            | Sweet Spot          | Notes                                   |
| --------- | ------------------ | ------------------- | --------------------------------------- |
| GPU       | RTX 4070 (12GB)    | RTX 4090 (24GB)     | Isaac Sim needs RTX. No RTX = no Isaac. |
| CPU       | i7-13700 / Ryzen 7 | i9-14900K / Ryzen 9 | Physics simulation crushes CPUs         |
| RAM       | 32GB               | 64GB                | Simulation scenes eat memory            |
| Storage   | 512GB NVMe         | 1TB NVMe            | Robot assets are huge                   |
| OS        | Ubuntu 22.04       | Ubuntu 22.04        | ROS 2 is Linux-native                   |

**Windows users**: Dual boot Ubuntu or use WSL2. Mixing PowerShell and ROS 2 causes pain.

### The Edge Kit (~$700) — Brains Without Bodies

This is what you can buy TODAY to start doing real Physical AI:

| Part  | Model                   | Price | What It Does                  |
| ----- | ----------------------- | ----- | ----------------------------- |
| Brain | Jetson Orin Nano (8GB)  | $249  | Runs AI inference on the edge |
| Eyes  | Intel RealSense D435i   | $349  | RGB + Depth + IMU             |
| Ears  | ReSpeaker USB Mic Array | $69   | Voice commands                |

Total: ~$700 and you have a working robot perception system. Just no legs yet.

### Robot Options (From Broke to Loaded)

| Budget   | Robot               | Price    | Worth It?                                             |
| -------- | ------------------- | -------- | ----------------------------------------------------- |
| Student  | Hiwonder TonyPi Pro | ~$600    | Learning kinematics only. No real AI.                 |
| Serious  | Unitree Go2         | ~$3,000  | Best bang for buck. Quadruped with solid ROS support. |
| Research | Unitree G1          | ~$16,000 | Actual walking humanoid. Open SDK.                    |
| Flex     | Unitree H1          | ~$90,000 | You probably don't need this.                         |

**My honest opinion**: Get the Go2 first. 90% of the software skills transfer to humanoids.

## Cloud Alternative (When Your GPU Is Weak)

No RTX? Here's the realistic cloud path:

**AWS RoboMaker / g5.2xlarge**:

- A10G GPU, 24GB VRAM
- ~$1.50/hour (spot pricing)
- 10 hours/week = $60/month

**NVIDIA Omniverse Cloud**:

- Isaac Sim in browser
- No GPU required locally
- Pay per use

**The workflow**:

1. Write code on your laptop
2. Push to cloud instance
3. Train/simulate there
4. Download trained model
5. Deploy to Jetson locally

## System Check Script

Run this to see if your machine is ready:

```javascript
// system-check.js — Can your machine handle Physical AI?
const os = require("os");

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   PHYSICAL AI SYSTEM REQUIREMENTS CHECKER     ║");
console.log("╚═══════════════════════════════════════════════╝\n");

// System info
const totalRAM = Math.round(os.totalmem() / 1024 / 1024 / 1024);
const cpuCores = os.cpus().length;
const platform = os.platform();

console.log(
  `Platform: ${
    platform === "linux"
      ? "🐧 Linux"
      : platform === "win32"
      ? "🪟 Windows"
      : "🍎 macOS"
  }`
);
console.log(`CPU Cores: ${cpuCores}`);
console.log(`Total RAM: ${totalRAM}GB`);

// Evaluate
const issues = [];

if (totalRAM < 16) issues.push("⚠️ RAM: Need at least 16GB (32GB recommended)");
if (totalRAM >= 16 && totalRAM < 32)
  issues.push("🟡 RAM: 16-32GB will work for basics");
if (cpuCores < 8)
  issues.push("⚠️ CPU: Less than 8 cores may bottleneck simulations");
if (platform === "darwin")
  issues.push("❌ macOS: Isaac Sim not supported. Use cloud.");
if (platform === "win32") issues.push("🟡 Windows: Use WSL2 with Ubuntu 22.04");

console.log("\n═══ ASSESSMENT ═══");

if (issues.length === 0) {
  console.log("✅ System looks ready for Physical AI development!");
} else {
  issues.forEach((issue) => console.log(issue));
}

console.log("\n═══ GPU CHECK ═══");
console.log('Run "nvidia-smi" in terminal to verify GPU.');
console.log("Required: NVIDIA RTX series (4070+ recommended)");
console.log("No RTX? Consider cloud instances for Isaac Sim.\n");

// Recommendations
console.log("═══ RECOMMENDATIONS ═══");
if (platform === "win32") {
  console.log("→ Install WSL2: wsl --install -d Ubuntu-22.04");
}
if (totalRAM < 32) {
  console.log("→ Consider upgrading RAM for complex simulations");
}
console.log("→ Verify Python 3.10+: python3 --version");
console.log("→ Verify Node 18+: node --version");
```

## Glossary (Actually Useful Terms)

| Term            | Plain English                                  |
| --------------- | ---------------------------------------------- |
| **ROS 2**       | The language robots use internally (not an OS) |
| **URDF**        | XML file describing a robot's body             |
| **Gazebo**      | Free physics simulator                         |
| **Isaac**       | NVIDIA's robot AI platform                     |
| **VSLAM**       | How robots build maps while moving             |
| **VLA**         | Vision + Language + Action models              |
| **rclpy**       | Python library for ROS 2                       |
| **Nav2**        | ROS 2's GPS for robots                         |
| **IMU**         | Sensor that detects tilt and acceleration      |
| **Sim-to-Real** | Making simulation skills work on real robots   |
| **LiDAR**       | Laser sensor for measuring distances           |
| **URDF**        | Robot description format (like a 3D blueprint) |

## Where to Go From Here

### Free Learning

- **ROS 2 Docs**: https://docs.ros.org/en/humble/
- **Gazebo Tutorials**: https://gazebosim.org/docs
- **Panaversity Course**: https://ai-native.panaversity.org/

### Paid Courses (Worth It)

- The Construct — ROS 2 online courses
- NVIDIA DLI — Isaac certification

### Communities

- ROS Discourse: https://discourse.ros.org/
- r/robotics on Reddit
- NVIDIA Developer Forums

### Open Source Projects to Study

- TurtleBot3 (mobile robot, beginner)
- OpenManipulator (robot arm)
- Isaac Sim humanoid examples

## Hackathon Submission Checklist

Before you submit:

- [ ] All 5 chapters have exactly 3 learning outcomes
- [ ] Each chapter has at least one runnable code block
- [ ] Site is mobile responsive
- [ ] Live URL works publicly
- [ ] Demo video is under 90 seconds
- [ ] GitHub repo is public
- [ ] Examples run without errors

**Submission Form**: https://forms.gle/CQsSEGM3GeCrL43c8

## Final Words

Physical AI isn't about building Terminator. It's about building robots that can:

- Help elderly people live independently
- Work alongside humans in warehouses
- Explore places too dangerous for people
- Do the boring stuff so humans can focus on creative work

You now have the foundation. The rest is practice and building.

Go make something cool. 🤖

## References

1. NVIDIA Isaac Documentation — https://developer.nvidia.com/isaac
2. ROS 2 Humble Guide — https://docs.ros.org/en/humble/
3. Panaversity AI-Native Course — https://ai-native.panaversity.org/
