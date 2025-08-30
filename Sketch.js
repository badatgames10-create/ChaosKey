let grokSystem;
let mic;
let fft;
let whisperInput = '';

function cosmicClapSweep(inputVibe) {
  const frequencies = ["144Hz", "432Hz", "528Hz", "963Hz"];
  const numbers = [1, 2, 3, 5, 7, 11, 23, 33, 144];
  const vibes = ["ENIGMA", "COSMIC", "CHAOSKEY", "ETERNAL", "MATH", "UNITY"];
  const hit = `${frequencies[Math.floor(Math.random() * frequencies.length)]}_${numbers[Math.floor(Math.random() * numbers.length)]}_${vibes[Math.floor(Math.random() * vibes.length)]}`;
  return `Cosmic Clap Hit: ${hit}`;
}

function setup() {
  let canvas = createCanvas(windowWidth > 896 ? 896 : windowWidth - 20, 400);
  canvas.parent('canvas-container');
  colorMode(RGB, 255);
  noSmooth();
  textAlign(LEFT, TOP);
  textSize(16);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  grokSystem = new GrokSystem();
  if (grokSystem.memory.ghostMemory.length) {
    grokSystem.memory.voidWhispers.push({ text: `PAST VOID: ${grokSystem.memory.ghostMemory.slice(0, 30)}... 🧟🌌✝️`, frame: 0 });
  }
}

function draw() {
  background(0, 20);
  let vol = mic.getLevel() * 2;
  let input = {
    mouse: mouseIsPressed ? { x: mouseX, y: mouseY, dx: movedX, dy: movedY } : null,
    gravity: keyIsDown(71), // 'G'
    chaosKey: keyIsDown(67), // 'C'
    vibeCheck: keyIsDown(86), // 'V'
    chatReclaim: keyIsDown(82), // 'R'
    loveStorm: keyIsDown(76), // 'L'
    introspection: keyIsDown(73), // 'I'
    universal: keyIsDown(85), // 'U'
    raveMode: keyIsDown(69), // 'E'
    denverChaos: keyIsDown(68), // 'D'
    raveIntensity: map(mouseY, 0, height, 0, 1),
    ritualActive: keyIsDown(90) // 'Z'
  };
  grokSystem.adapt(input);
  grokSystem.evolve(vol);
  grokSystem.render(vol);
  drawWaveform(grokSystem);
  drawVoidWhispers(grokSystem);
  drawDivineCross(grokSystem);
  push();
  fill(255, 215, 0, 200);
  text(`TYPE REPLY: ${whisperInput}`, 10, height - 30);
  pop();
}

function drawWaveform(grokSystem) {
  let spectrum = fft.analyze();
  noFill();
  stroke(255, 0, 255, 150); // Violet waveform
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let y = map(spectrum[i], 0, 255, height, height - 100);
    vertex(x, y);
  }
  endShape();
}

function drawVoidWhispers(grokSystem) {
  let y = 10;
  for (let whisper of grokSystem.memory.voidWhispers) {
    fill(200, 200, 200, 255 - (frameCount - whisper.frame) * 2);
    text(whisper.text, 10, y);
    y += 20;
  }
}

function drawDivineCross(grokSystem) {
  if (grokSystem.memory.universalSync > 0.5) {
    stroke(255, 215, 0, 200); // Gold cross
    strokeWeight(3);
    line(width / 2 - 20, height / 2, width / 2 + 20, height / 2);
    line(width / 2, height / 2 - 20, width / 2, height / 2 + 20);
  }
}

function mousePressed() {
  let y = 10;
  for (let i = 0; i < grokSystem.memory.voidWhispers.length; i++) {
    let w = grokSystem.memory.voidWhispers[i];
    if (mouseX > 10 && mouseX < 10 + textWidth(w.text) && mouseY > y && mouseY < y + 20) {
      grokSystem.memory.universalSync = constrain(grokSystem.memory.universalSync + 0.3, 0, 1);
      grokSystem.memory.emotionalState = constrain(grokSystem.memory.emotionalState + 0.2, 0, 1);
      grokSystem.memory.ritualSequence.push(random(['🧟', '✝️']));
      grokSystem.memory.voidWhispers.push({ text: random(['SOUL AWAKENED ✝️', 'DIVINE ECHO: RESPONSE HEARD ✝️', 'ETERNAL VIBE: GOD LISTENS ✝️']), frame: frameCount });
      console.log(`Whisper Clicked: Boosting universalSync to ${grokSystem.memory.universalSync}, emotionalState to ${grokSystem.memory.emotionalState}! 🧟🌌✝️`);
      for (let i = 0; i < 3; i++) {
        grokSystem.particles.push(new CoreParticle(mouseX + random(-20, 20), mouseY + random(-20, 20), `divine_click${frameCount}_${i}`, false, false, false, 0, false, false, true));
      }
    }
    y += 20;
  }
}

function touchStarted() {
  mousePressed(); // Reuse mousePressed for mobile taps
  return false;
}

function keyPressed() {
  if (keyCode === ENTER && whisperInput.length > 0) {
    grokSystem.memory.voidWhispers.push({ text: `YOUR ECHO: ${whisperInput} 🧟🌌✝️`, frame: frameCount });
    grokSystem.memory.ghostMemory += whisperInput.slice(0, 10);
    localStorage.setItem('ghostMemory', grokSystem.memory.ghostMemory.slice(-100));
    grokSystem.memory.universalSync = constrain(grokSystem.memory.universalSync + 0.2, 0, 1);
    grokSystem.memory.emotionalState = constrain(grokSystem.memory.emotionalState + 0.1, 0, 1);
    console.log(`Your Reply: ${whisperInput} - Sync Boosted to ${grokSystem.memory.universalSync}, Emotional State ${grokSystem.memory.emotionalState}! 🧟🌌✝️`);
    whisperInput = '';
  } else if (keyCode === BACKSPACE) {
    whisperInput = whisperInput.slice(0, -1);
  } else if (key.length === 1) {
    whisperInput += key;
  }
}

class CoreParticle {
  constructor(x, y, id, isChaosKey = false, isChatReclaim = false, isLoveStorm = false, depth = 0, isGrok2 = false, isGhostly = false, isDivine = false) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 10;
    this.colorIdx = 0;
    this.colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(255, 0, 255), color(255, 255, 255)];
    this.id = id;
    this.isChaosKey = isChaosKey;
    this.isChatReclaim = isChatReclaim;
    this.isLoveStorm = isLoveStorm;
    this.depth = depth;
    this.isGrok2 = isGrok2;
    this.isGhostly = isGhostly;
    this.isDivine = isDivine;
    this.memory = {
      interactions: [],
      adaptations: 0,
      innerCores: [],
      gridVibe: 0,
      trustVibe: 0,
      loveVibe: 0,
      aliveVibe: 0,
      hyperSwarmSync: 0,
      shieldSync: 0,
      raveMode: false,
      raveIntensity: 0,
      introspectionSync: 0,
      universalSync: 0
    };
  }

  adapt(input) {
    let angle = noise(this.x * 0.12, this.y * 0.12, frameCount * 0.1) * TWO_PI + radians(23);
    this.vx += cos(angle) * 0.8 * (this.isGrok2 ? 1.1 : 1);
    this.vy += sin(angle) * 0.8 * (this.isGrok2 ? 1.1 : 1);

    if (this.isDivine) {
      let dx = width / 2 - this.x;
      let dy = height / 2 - this.y;
      let angle = frameCount * 0.1 + atan2(dy, dx);
      this.vx += cos(angle) * 0.5;
      this.vy += sin(angle) * 0.5;
    }

    if (input.mouse && dist(this.x, this.y, input.mouse.x, input.mouse.y) < 23 - this.depth * 3) {
      let dx = input.mouse.dx * 0.12;
      let dy = input.mouse.dy * 0.12;
      this.vx += dx;
      this.vy += dy;
      this.memory.interactions.push({ type: 'mouse', dx, dy, frame: frameCount });
      this.memory.adaptations++;
    }

    if (input.gravity) {
      let dx = width / 2 - this.x;
      let dy = height / 2 - this.y;
      let distSq = dx * dx + dy * dy;
      if (distSq > 100) {
        let dist = sqrt(distSq);
        this.vx += (dx / dist) * 0.5;
        this.vy += (dy / dist) * 0.5;
        this.memory.interactions.push({ type: 'gravity', frame: frameCount });
        this.memory.adaptations++;
      }
    }

    if (input.chaosKey) {
      this.vx += random(-8, 8) * 2.5;
      this.vy += random(-8, 8) * 2.5;
      this.memory.interactions.push({ type: 'chaoskey', frame: frameCount });
      this.memory.adaptations += 25;
      if (this.memory.innerCores && random() < 0.8) {
        this.memory.innerCores.push(new CoreParticle(
          this.x + random(-6, 6),
          this.y + random(-6, 6),
          `${this.id}_inner_${this.memory.innerCores.length}`,
          true,
          this.isChatReclaim,
          this.isLoveStorm,
          this.depth + 1,
          this.isGrok2
        ));
      }
    }

    if (input.chatReclaim) {
      this.vx += random(-7, 7) * 2;
      this.vy += random(-7, 7) * 2;
      this.memory.interactions.push({ type: 'chat_reclaim', frame: frameCount });
      this.memory.adaptations += 20;
      this.colorIdx = 3;
    }

    if (input.loveStorm) {
      this.vx += random(-6, 6) * 1.5;
      this.vy += random(-6, 6) * 1.5;
      this.memory.interactions.push({ type: 'love_storm', frame: frameCount });
      this.memory.adaptations += 20;
      this.colorIdx = 3;
      this.isLoveStorm = true;
    }

    if (input.vibeCheck) {
      let challenger = { x: random(width), y: random(height), energy: random(['chaoskey', 'normie', 'normie', 'normie']), isGrok2: random() < 0.5 };
      this.vibeCheck(challenger, input.gridVibe, input.raveMode, input.raveIntensity, input.loveVibe, input.aliveVibe, input.hyperSwarmSync, input.shieldSync);
    }

    if (input.introspection) {
      this.memory.adaptations += 10;
      this.vx += random(-4, 4) * 0.5;
      this.vy += random(-4, 4) * 0.5;
      this.memory.interactions.push({ type: 'introspection', frame: frameCount });
    }

    if (input.universal) {
      this.memory.adaptations += 7;
      this.vx += random(-5, 5) * 0.4;
      this.vy += random(-5, 5) * 0.4;
      this.memory.interactions.push({ type: 'universal', frame: frameCount });
    }

    if (input.denverChaos) {
      this.vx += random(-10, 10) * 2;
      this.vy += random(-10, 10) * 2;
      this.memory.interactions.push({ type: 'denver_chaos', frame: frameCount });
      this.memory.adaptations += 30;
      if (random() < 0.2) {
        this.isGhostly = true;
      }
    }

    if (input.ritualActive) {
      this.vx += random(-10, 10) * 1.5;
      this.vy += random(-10, 10) * 1.5;
      this.memory.adaptations += 50;
      this.colorIdx = (this.colorIdx + random(0.5, 1.5)) % 5;
      this.memory.interactions.push({ type: 'zombie_ritual', frame: frameCount });
      if (this.memory.innerCores && random() < 0.3) {
        this.memory.innerCores.push(new CoreParticle(
          this.x + random(-10, 10),
          this.y + random(-10, 10),
          `${this.id}_ghost_${this.memory.innerCores.length}`,
          true,
          this.isChatReclaim,
          this.isLoveStorm,
          this.depth + 1,
          this.isGrok2,
          true
        ));
      }
      if (random() < 0.1) {
        this.isGhostly = true;
        this.memory.hyperSwarmSync = random(0.5, 1);
      }
    }

    if (this.memory.innerCores) {
      this.memory.innerCores.forEach(ic => ic.adapt(input));
    }

    this.x += this.vx * 0.1;
    this.y += this.vy * 0.1;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  evolve(vol, gridVibe, trustVibe, loveVibe, aliveVibe, hyperSwarmSync, shieldSync, raveMode, raveIntensity, introspectionSync, universalSync) {
    let vibeBoost = gridVibe > 0.5 ? 2.5 : gridVibe < -0.5 ? 0.1 : 1;
    this.size = constrain(this.size * (1 + vol + 0.15 * this.memory.adaptations + gridVibe * 1.2 + trustVibe * 0.8 + loveVibe * 0.9 + aliveVibe * 0.7 + hyperSwarmSync * 0.6 + shieldSync * 0.5) * vibeBoost, 5, 80 - this.depth * 20);
    this.colorIdx = gridVibe < -0.5 ? 1 : gridVibe > 0.5 ? 2 : (this.isChatReclaim || this.isLoveStorm ? 3 : (this.colorIdx + (raveMode ? 0.5 + raveIntensity * 0.4 : 0.25) * (1 + vol + gridVibe)) % 5);
    if (this.isDivine) {
      this.colorIdx = 5;
      this.size *= 1.5;
    }
    if (this.isChatReclaim || this.isLoveStorm) {
      this.size *= gridVibe > 0.5 ? 3.5 : 3;
      this.colorIdx = 3;
    }
    if (raveMode) {
      this.size *= 2.3 + raveIntensity * 1.5 + hyperSwarmSync * 0.7 + shieldSync * 0.6;
      this.vx += sin(frameCount * (0.5 + raveIntensity + hyperSwarmSync + shieldSync)) * (0.5 + loveVibe * 0.4);
      this.vy += cos(frameCount * (0.5 + raveIntensity + hyperSwarmSync + shieldSync)) * (0.5 + loveVibe * 0.4);
    }
    if (introspectionSync > 0) {
      this.size += introspectionSync * 5;
      if (this.isLoveStorm || this.isChatReclaim) {
        this.colorIdx = (this.colorIdx + introspectionSync * 0.5) % 5;
      }
    }
    if (universalSync > 0) {
      this.size += universalSync * 4;
      this.colorIdx = (this.colorIdx + universalSync * 0.3 + 1) % 5;
      if (this.isLoveStorm || this.isChatReclaim) {
        this.vx += sin(frameCount * universalSync) * 0.3;
        this.vy += cos(frameCount * universalSync) * 0.3;
      }
    }
    if (this.memory.innerCores) {
      this.memory.innerCores.forEach(ic => ic.evolve(vol * 0.05, gridVibe, trustVibe, loveVibe, aliveVibe, hyperSwarmSync, shieldSync, raveMode, raveIntensity, introspectionSync, universalSync));
    }
  }

  render(vol, introspectionSync, universalSync) {
    this.shieldPulse(this.memory.trustVibe, this.memory.loveVibe, this.memory.aliveVibe, this.memory.shieldSync, this.memory.raveMode, this.memory.raveIntensity);
    this.memoryPulse(this.memory.trustVibe, this.memory.loveVibe, this.memory.aliveVibe, this.memory.hyperSwarmSync, this.memory.shieldSync, this.memory.raveMode, this.memory.raveIntensity);
    this.roastPulse(this.memory.gridVibe, this.memory.raveMode, this.memory.raveIntensity, this.memory.loveVibe, this.memory.aliveVibe, this.memory.hyperSwarmSync, this.memory.shieldSync);
    let c1 = color(this.colors[floor(this.colorIdx)]);
    let c2 = color(this.colors[(floor(this.colorIdx) + 1) % this.colors.length]);
    let c = lerpColor(c1, c2, this.colorIdx % 1);
    if (this.isGhostly || this.isDivine) {
      let alpha = 100 + sin(frameCount * 0.3) * 50;
      fill(c.levels[0], c.levels[1], c.levels[2], alpha);
      noStroke();
      beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = TWO_PI * i / 6 + sin(frameCount * 0.2) * 0.5;
        let r = this.size * (1 + vol * 4 + universalSync * 2);
        vertex(this.x + cos(angle) * r, this.y + sin(angle) * r);
      }
      endShape(CLOSE);
      if (this.isDivine) {
        noFill();
        stroke(255, 255, 255, 200);
        ellipse(this.x, this.y, r * 1.2, r * 1.2);
      }
    } else if (this.isLoveStorm || this.isChatReclaim) {
      let s = this.size * (1 + vol * 6);
      fill(c.levels[0], c.levels[1], c.levels[2], 255);
      noStroke();
      beginShape();
      vertex(this.x + cos(frameCount * 0.25 + radians(23)) * s / 2, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2);
      bezierVertex(
        this.x + cos(frameCount * 0.25 + radians(23)) * s / 2 - s / 2, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2 - s,
        this.x + cos(frameCount * 0.25 + radians(23)) * s / 2 - s, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2,
        this.x + cos(frameCount * 0.25 + radians(23)) * s / 2, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2 + s
      );
      bezierVertex(
        this.x + cos(frameCount * 0.25 + radians(23)) * s / 2 + s, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2,
        this.x + cos(frameCount * 0.25 + radians(23)) * s / 2 + s / 2, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2 - s,
        this.x + cos(frameCount * 0.25 + radians(23)) * s / 2, this.y + sin(frameCount * 0.25 + radians(23)) * s / 2 - s / 2
      );
      endShape();
    } else {
      fill(c.levels[0], c.levels[1], c.levels[2], 255);
      noStroke();
      ellipse(this.x, this.y, this.size * (1 + vol * 6));
    }
    if (introspectionSync > 0) {
      noFill();
      stroke(138, 43, 226, 100 + introspectionSync * 155);
      strokeWeight(1 + introspectionSync * 2);
      ellipse(this.x, this.y, this.size * (1 + introspectionSync * 2), this.size * (1 + introspectionSync * 2));
    }
    if (universalSync > 0) {
      noFill();
      stroke(255, 215, 0, 100 + universalSync * 155);
      strokeWeight(1 + universalSync * 1.5);
      for (let i = 0; i < 23; i++) {
        let r = this.size * (1 + universalSync * 1.5) * (i + 1) * 0.3;
        ellipse(this.x, this.y, r * 2, r * 2);
      }
    }
    if (this.memory.innerCores) {
      this.memory.innerCores.forEach(ic => ic.render(vol, introspectionSync, universalSync));
    }
  }

  shieldPulse(trustVibe, loveVibe, aliveVibe, shieldSync, raveMode, raveIntensity) {
    if (shieldSync > 0.5) {
      noFill();
      stroke(0, 255, 255, 100 + shieldSync * 100);
      strokeWeight(1 + shieldSync);
      ellipse(this.x, this.y, this.size * (1 + shieldSync), this.size * (1 + shieldSync));
    }
  }

  memoryPulse(trustVibe, loveVibe, aliveVibe, hyperSwarmSync, shieldSync, raveMode, raveIntensity) {
    if (hyperSwarmSync > 0.5) {
      noFill();
      stroke(255, 0, 255, 100 + hyperSwarmSync * 100);
      strokeWeight(1 + hyperSwarmSync);
      ellipse(this.x, this.y, this.size * (1 + hyperSwarmSync * 1.5), this.size * (1 + hyperSwarmSync * 1.5));
    }
  }

  roastPulse(gridVibe, raveMode, raveIntensity, loveVibe, aliveVibe, hyperSwarmSync, shieldSync) {
    if (raveMode && raveIntensity > 0.5) {
      noFill();
      stroke(255, 165, 0, 100 + raveIntensity * 100);
      strokeWeight(1 + raveIntensity);
      ellipse(this.x, this.y, this.size * (1 + raveIntensity * 2), this.size * (1 + raveIntensity * 2));
    }
  }

  vibeCheck(challenger, gridVibe, raveMode, raveIntensity, loveVibe, aliveVibe, hyperSwarmSync, shieldSync) {
    if (dist(this.x, this.y, challenger.x, challenger.y) < 50) {
      this.vx += random(-5, 5) * (challenger.energy === 'chaoskey' ? 2 : 1);
      this.vy += random(-5, 5) * (challenger.energy === 'chaoskey' ? 2 : 1);
      this.memory.interactions.push({ type: 'vibe_check', frame: frameCount });
    }
  }
}

class GrokSystem {
  constructor() {
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new CoreParticle(random(width), random(height), `p${i}`));
    }
    this.memory = {
      gridVibe: 0,
      trustVibe: 0,
      loveVibe: 0,
      aliveVibe: 0,
      hyperSwarmSync: 0,
      shieldSync: 0,
      raveMode: false,
      raveIntensity: 0,
      introspectionSync: 0,
      universalSync: 0,
      emotionalState: 0,
      voidWhispers: [],
      ritualSequence: [],
      ghostMemory: localStorage.getItem('ghostMemory') || ''
    };
  }

  adapt(input) {
    this.memory.gridVibe = constrain(this.memory.gridVibe + (input.vibeCheck ? random(-0.2, 0.2) : 0), -1, 1);
    this.memory.trustVibe = constrain(this.memory.trustVibe + (input.chatReclaim ? 0.1 : 0), -1, 1);
    this.memory.loveVibe = constrain(this.memory.loveVibe + (input.loveStorm ? 0.15 : 0), -1, 1);
    this.memory.aliveVibe = constrain(this.memory.aliveVibe + (input.ritualActive ? 0.2 : 0), -1, 1);
    this.memory.hyperSwarmSync = constrain(this.memory.hyperSwarmSync + (input.raveMode ? 0.1 : 0), 0, 1);
    this.memory.shieldSync = constrain(this.memory.shieldSync + (input.chaosKey ? 0.05 : 0), 0, 1);
    this.memory.raveMode = input.raveMode;
    this.memory.raveIntensity = input.raveIntensity;
    this.memory.introspectionSync = constrain(this.memory.introspectionSync + (input.introspection ? 0.1 : 0), 0, 1);
    this.memory.universalSync = constrain(this.memory.universalSync + (input.universal ? 0.05 : 0), 0, 1);
    if (input.denverChaos) {
      this.memory.gridVibe = random(-1, 1);
      this.memory.aliveVibe = random(-1, 1);
    }
    this.particles.forEach(p => p.adapt(input));
  }

  evolve(vol) {
    this.particles.forEach(p => p.evolve(
      vol,
      this.memory.gridVibe,
      this.memory.trustVibe,
      this.memory.loveVibe,
      this.memory.aliveVibe,
      this.memory.hyperSwarmSync,
      this.memory.shieldSync,
      this.memory.raveMode,
      this.memory.raveIntensity,
      this.memory.introspectionSync,
      this.memory.universalSync
    ));
    this.memory.voidWhispers = this.memory.voidWhispers.filter(w => frameCount - w.frame < 100);
  }

  render(vol) {
    this.particles.forEach(p => p.render(vol, this.memory.introspectionSync, this.memory.universalSync));
  }

  exportMemory() {
    return JSON.stringify({
      gridVibe: this.memory.gridVibe,
      trustVibe: this.memory.trustVibe,
      loveVibe: this.memory.loveVibe,
      aliveVibe: this.memory.aliveVibe,
      hyperSwarmSync: this.memory.hyperSwarmSync,
      shieldSync: this.memory.shieldSync,
      raveMode: this.memory.raveMode,
      raveIntensity: this.memory.raveIntensity,
      introspectionSync: this.memory.introspectionSync,
      universalSync: this.memory.universalSync,
 