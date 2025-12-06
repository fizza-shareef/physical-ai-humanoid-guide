---
id: 03-howto
sidebar_position: 3
title: "How-To Guide"
---

# Setting Up Your Robot Dev Lab (Without Burning Money)

Look, I know what you're thinking: "I don't have a $90,000 humanoid robot in my room."

Good news: you don't need one. Everything in this chapter runs on a decent laptop (or cloud if yours is a potato).

## Learning Outcomes

By the end of this chapter, you'll:

- **Set up** a working Physical AI development environment
- **Install** the core tools without breaking your system
- **Run** your first simulation without buying any hardware

## The Honest Truth About Requirements

Let me save you some googling:

| What You Have       | What You Can Do                     |
| ------------------- | ----------------------------------- |
| MacBook             | ❌ Isaac Sim won't work. Use cloud. |
| Windows + GTX 1060  | 🟡 Basic Gazebo works. Isaac? Nope. |
| Windows + RTX 3070+ | ✅ Full stack possible with WSL2    |
| Ubuntu native + RTX | ✅ Best experience, zero friction   |

Don't have an RTX GPU? Skip to the cloud section at the end. Seriously.

## Step 1: Get WSL2 Running (Windows Users)

If you're on Windows, ROS 2 needs Linux. WSL2 gives you Ubuntu inside Windows.

Open PowerShell as Admin and run:

```powershell
wsl --install -d Ubuntu-22.04
```

Wait for it. Restart. Open Ubuntu from Start menu.

First things first in Ubuntu:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl git python3 python3-pip
```

**Pro tip**: Don't mix PowerShell and WSL in the same project. Pick one and stick with it. Seriously. Path issues are a nightmare.

## Step 2: Node.js via NVM (The Right Way)

Don't use `apt install nodejs`. It gives you ancient versions.

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

Verify:

```bash
node -v   # Should say v18.something
npm -v    # Should work
```

## Step 3: ROS 2 Humble (The Robot Stuff)

This is the long one. Copy each block separately:

```bash
# Add ROS 2 repo
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Humble Desktop
sudo apt update
sudo apt install ros-humble-desktop -y
```

Make it load automatically:

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

Test it:

```bash
ros2 run demo_nodes_cpp talker &
ros2 run demo_nodes_py listener
# You should see messages flying
```

## Step 4: Gazebo (The Simulator)

```bash
sudo apt install ros-humble-gazebo-ros-pkgs -y
```

Test:

```bash
gazebo --version
# Should output Gazebo version info
```

## Quick Sanity Check Script

Here's a Node.js script that checks if your setup is working. Run it periodically:

```javascript
// dev-environment-check.js — Run with: node dev-environment-check.js
const { execSync } = require("child_process");
const os = require("os");

console.log("╔═══════════════════════════════════════╗");
console.log("║  Physical AI Dev Environment Checker  ║");
console.log("╚═══════════════════════════════════════╝\n");

const checks = [
  {
    name: "OS Platform",
    cmd: null,
    getter: () => `${os.platform()} (${os.arch()})`,
  },
  {
    name: "RAM",
    cmd: null,
    getter: () => `${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB total`,
  },
  { name: "Node.js", cmd: "node --version" },
  { name: "npm", cmd: "npm --version" },
  { name: "Python3", cmd: "python3 --version" },
  { name: "Git", cmd: "git --version" },
];

function tryCmd(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", timeout: 5000 })
      .trim()
      .split("\n")[0];
  } catch {
    return "❌ Not found";
  }
}

let passed = 0;
let failed = 0;

checks.forEach((check) => {
  const result = check.getter ? check.getter() : tryCmd(check.cmd);
  const icon = result.includes("Not found") ? "✗" : "✓";
  const color = icon === "✓" ? "\x1b[32m" : "\x1b[31m";

  console.log(`${color}${icon}\x1b[0m ${check.name}: ${result}`);
  icon === "✓" ? passed++ : failed++;
});

console.log(`\n═══════════════════════════════════════`);
console.log(`Result: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log("🎉 Your environment is ready for Physical AI development!");
} else {
  console.log("⚠️  Some tools need installation. See above.");
}
```

## The Cloud Escape Hatch

No RTX GPU? Here's your plan B:

**AWS RoboMaker**:

- Instance: `g5.2xlarge` (A10G GPU)
- Cost: ~$1.50/hour
- 10 hours/week × 12 weeks = ~$180/quarter

**NVIDIA Omniverse Cloud**:

- Isaac Sim in browser
- No local GPU required
- Pay-per-use

Cloud trains the AI. Your laptop just edits code and connects.

## Common Issues I Wish Someone Warned Me About

| Problem                       | Solution                                       |
| ----------------------------- | ---------------------------------------------- |
| Path shows `/mnt/c/...`       | You're mixing WSL and Windows. Stay in WSL.    |
| `ros2: command not found`     | Run `source ~/.bashrc` or restart terminal     |
| Gazebo opens but black screen | GPU drivers missing. Check `nvidia-smi`        |
| npm packages not installing   | Delete `node_modules`, run `npm install` again |

## What's Working Now?

After this chapter, you should have:

- ✅ WSL2 with Ubuntu 22.04
- ✅ Node.js 18+
- ✅ Python 3.10+
- ✅ ROS 2 Humble (if on Linux)
- ✅ Gazebo installed

Next up: actual code examples you can run and modify.

## References

1. WSL Installation Guide — https://learn.microsoft.com/en-us/windows/wsl/install
2. ROS 2 Humble Setup — https://docs.ros.org/en/humble/Installation.html
3. Gazebo Installation — https://gazebosim.org/docs/latest/install
