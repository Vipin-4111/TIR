// Multi-Layered Generative Meditative Sound Architecture (Web Audio API)
class SoundscapeController {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentMode = 'theta'; // 'theta' | 'breath' | 'chimes'
    this.masterGain = null;
    this.userVolume = 0.7;

    // Mode 1: Binaural Theta 432Hz
    this.thetaOscs = [];
    this.thetaGain = null;

    // Mode 2: Pranayama Ocean Breath
    this.breathGain = null;
    this.breathFilter = null;
    this.breathNoiseNode = null;
    this.breathLfoTimer = null;

    // Mode 3: Koshi Temple Wind Chimes
    this.chimeInterval = null;
    this.chimeGain = null;

    // Dynamic Scroll Filter (Sonification)
    this.scrollFilter = null;

    // Tibetan Singing Bowl Drag Engine
    this.isBowlSinging = false;
    this.bowlGain = null;
    this.bowlFilter = null;
    this.bowlOscs = [];
    this.bowlBaseFreq = 432;
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.userVolume, this.ctx.currentTime);

      // Master scroll-sensitive dynamic filter
      this.scrollFilter = this.ctx.createBiquadFilter();
      this.scrollFilter.type = 'lowpass';
      this.scrollFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      this.masterGain.connect(this.scrollFilter);
      this.scrollFilter.connect(this.ctx.destination);
    }
  }

  setVolume(val) {
    this.userVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.userVolume, this.ctx.currentTime, 0.05);
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    if (this.isPlaying) {
      this.stopAllLayers();
      this.startCurrentMode();
    }
  }

  toggle() {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startCurrentMode();
  }

  stop() {
    if (!this.isPlaying) return;
    this.stopAllLayers();
    this.isPlaying = false;
  }

  startCurrentMode() {
    if (!this.ctx || !this.masterGain) return;
    if (this.currentMode === 'theta') {
      this.startThetaBinaural();
    } else if (this.currentMode === 'breath') {
      this.startPranayamaBreath();
    } else if (this.currentMode === 'chimes') {
      this.startKoshiChimes();
    }
  }

  stopAllLayers() {
    this.stopTheta();
    this.stopBreath();
    this.stopChimes();
  }

  // --- MODE 1: BINAURAL THETA 432Hz (4Hz Theta Entrainment) ---
  startThetaBinaural() {
    const now = this.ctx.currentTime;
    this.thetaGain = this.ctx.createGain();
    this.thetaGain.gain.setValueAtTime(0.001, now);
    this.thetaGain.gain.exponentialRampToValueAtTime(0.14, now + 2.5);

    // Left ear: 432 Hz, Right ear: 436 Hz -> 4Hz Theta beat
    // Sub-bass grounding: 108 Hz
    const freqs = [
      { f: 108, pan: 0 },
      { f: 216, pan: -0.3 },
      { f: 432, pan: -0.7 },
      { f: 436, pan: 0.7 },
      { f: 540, pan: 0 }
    ];

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, now);

    this.thetaOscs = freqs.map((item, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(item.f, now);

      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (panner) panner.pan.setValueAtTime(item.pan, now);

      const gain = this.ctx.createGain();
      gain.gain.value = 1 / (i + 1.8);

      osc.connect(gain);
      if (panner) {
        gain.connect(panner);
        panner.connect(filter);
      } else {
        gain.connect(filter);
      }
      osc.start(now);
      return osc;
    });

    filter.connect(this.thetaGain);
    this.thetaGain.connect(this.masterGain);
  }

  stopTheta() {
    if (!this.thetaGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.thetaGain.gain.cancelScheduledValues(now);
    this.thetaGain.gain.setValueAtTime(this.thetaGain.gain.value, now);
    this.thetaGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    setTimeout(() => {
      this.thetaOscs.forEach(o => { try { o.stop(); o.disconnect(); } catch(e){} });
      this.thetaOscs = [];
    }, 1300);
  }

  // --- MODE 2: PRANAYAMA OCEAN BREATHWORK (Filtered Noise 4s/4s) ---
  startPranayamaBreath() {
    const now = this.ctx.currentTime;
    // Generate pinkish noise buffer (3 seconds looping)
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    this.breathNoiseNode = this.ctx.createBufferSource();
    this.breathNoiseNode.buffer = buffer;
    this.breathNoiseNode.loop = true;

    this.breathFilter = this.ctx.createBiquadFilter();
    this.breathFilter.type = 'lowpass';
    this.breathFilter.Q.setValueAtTime(4.0, now);
    this.breathFilter.frequency.setValueAtTime(250, now);

    this.breathGain = this.ctx.createGain();
    this.breathGain.gain.setValueAtTime(0.001, now);
    this.breathGain.gain.exponentialRampToValueAtTime(0.18, now + 1.5);

    // Warm underlying drone anchor (108Hz)
    const drone = this.ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(108, now);
    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.08;
    drone.connect(droneGain);
    droneGain.connect(this.breathGain);
    drone.start(now);
    this.thetaOscs.push(drone);

    this.breathNoiseNode.connect(this.breathFilter);
    this.breathFilter.connect(this.breathGain);
    this.breathGain.connect(this.masterGain);
    this.breathNoiseNode.start(now);

    // 4-second Inhale (250Hz -> 650Hz), 4-second Exhale (650Hz -> 250Hz)
    let isInhaling = true;
    const breatheCycle = () => {
      if (!this.isPlaying || this.currentMode !== 'breath') return;
      const t = this.ctx.currentTime;
      if (isInhaling) {
        this.breathFilter.frequency.exponentialRampToValueAtTime(650, t + 4);
      } else {
        this.breathFilter.frequency.exponentialRampToValueAtTime(220, t + 4);
      }
      isInhaling = !isInhaling;
      this.breathLfoTimer = setTimeout(breatheCycle, 4000);
    };
    breatheCycle();
  }

  stopBreath() {
    if (this.breathLfoTimer) clearTimeout(this.breathLfoTimer);
    if (!this.breathGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.breathGain.gain.cancelScheduledValues(now);
    this.breathGain.gain.setValueAtTime(this.breathGain.gain.value, now);
    this.breathGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    setTimeout(() => {
      try { this.breathNoiseNode.stop(); this.breathNoiseNode.disconnect(); } catch(e){}
      this.thetaOscs.forEach(o => { try { o.stop(); o.disconnect(); } catch(e){} });
      this.thetaOscs = [];
    }, 1300);
  }

  // --- MODE 3: KOSHI TEMPLE WIND CHIMES (Generative Crystal Harmonics) ---
  startKoshiChimes() {
    const now = this.ctx.currentTime;
    this.chimeGain = this.ctx.createGain();
    this.chimeGain.gain.setValueAtTime(0.12, now);
    this.chimeGain.connect(this.masterGain);

    // Soft warm background pad (216 Hz)
    const pad = this.ctx.createOscillator();
    pad.type = 'triangle';
    pad.frequency.setValueAtTime(216, now);
    const padGain = this.ctx.createGain();
    padGain.gain.value = 0.05;
    pad.connect(padGain);
    padGain.connect(this.chimeGain);
    pad.start(now);
    this.thetaOscs.push(pad);

    const koshiPitches = [528, 660, 792, 924, 1056, 1188];

    const playRandomChime = () => {
      if (!this.isPlaying || this.currentMode !== 'chimes') return;
      const pitch = koshiPitches[Math.floor(Math.random() * koshiPitches.length)];
      this.playCrystalChime(pitch);
      const nextDelay = 1200 + Math.random() * 2600;
      this.chimeInterval = setTimeout(playRandomChime, nextDelay);
    };
    playRandomChime();
  }

  stopChimes() {
    if (this.chimeInterval) clearTimeout(this.chimeInterval);
    if (!this.chimeGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.chimeGain.gain.cancelScheduledValues(now);
    this.chimeGain.gain.setValueAtTime(this.chimeGain.gain.value, now);
    this.chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
    this.thetaOscs.forEach(o => { try { o.stop(); o.disconnect(); } catch(e){} });
    this.thetaOscs = [];
  }

  playCrystalChime(pitch = 528) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.985, now + 2.5);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 2.6);
    } catch(e) {}
  }

  // --- TIBETAN TINGSHA BELL STRIKE (High brass chime for clicks) ---
  playTingsha(pitch = 2400) {
    if (typeof window === 'undefined') return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Two slightly detuned oscillators produce the distinctive Tingsha shimmering ring
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(pitch, now);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(pitch + 6, now); // 6Hz shimmer beating

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.3);
      osc2.stop(now + 2.3);
    } catch(e) {}
  }

  playChime(pitch = 528) {
    this.playTingsha(pitch * 2.5);
  }

  // --- SCROLL VELOCITY SONIFICATION ---
  onScrollVelocity(velocity = 0) {
    if (!this.scrollFilter || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const speed = Math.min(2000, Math.abs(velocity));
      // Brighten filter frequency up to 2400Hz when scrolling fast
      const targetFreq = 1200 + speed * 0.6;
      this.scrollFilter.frequency.setTargetAtTime(targetFreq, now, 0.1);
    } catch(e) {}
  }

  // --- TIBETAN SINGING BOWL DRAG RESONAOR ---
  startSingingBowl(baseFreq = 432) {
    if (typeof window === 'undefined') return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      if (this.isBowlSinging) return;

      const now = this.ctx.currentTime;
      this.bowlBaseFreq = baseFreq;

      this.bowlFilter = this.ctx.createBiquadFilter();
      this.bowlFilter.type = 'bandpass';
      this.bowlFilter.Q.setValueAtTime(9.5, now);
      this.bowlFilter.frequency.setValueAtTime(baseFreq, now);

      this.bowlGain = this.ctx.createGain();
      this.bowlGain.gain.setValueAtTime(0.0001, now);
      this.bowlGain.gain.exponentialRampToValueAtTime(0.14, now + 0.15);

      const harmonics = [1, 1.2, 2.0, 2.76];
      this.bowlOscs = harmonics.map((h, idx) => {
        const osc = this.ctx.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        const subGain = this.ctx.createGain();
        subGain.gain.value = 1 / (idx + 1.2);
        osc.connect(subGain);
        subGain.connect(this.bowlFilter);
        osc.start(now);
        return osc;
      });

      this.bowlFilter.connect(this.bowlGain);
      this.bowlGain.connect(this.masterGain);
      this.isBowlSinging = true;
    } catch(e) {}
  }

  updateSingingBowl(velocity = 0, normalizedX = 0.5) {
    if (!this.isBowlSinging || !this.bowlFilter || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqShift = (normalizedX - 0.5) * 100;
      const targetFreq = Math.max(260, Math.min(920, this.bowlBaseFreq + freqShift));
      this.bowlFilter.frequency.setTargetAtTime(targetFreq, now, 0.08);

      const targetGain = Math.min(0.24, 0.07 + Math.abs(velocity) * 0.0012);
      this.bowlGain.gain.setTargetAtTime(targetGain, now, 0.05);
    } catch(e) {}
  }

  stopSingingBowl() {
    if (!this.isBowlSinging || !this.bowlGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.bowlGain.gain.cancelScheduledValues(now);
      this.bowlGain.gain.setValueAtTime(this.bowlGain.gain.value, now);
      this.bowlGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      const oscsToStop = [...this.bowlOscs];
      this.bowlOscs = [];
      this.isBowlSinging = false;

      setTimeout(() => {
        oscsToStop.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
      }, 1900);
    } catch(e) {
      this.isBowlSinging = false;
    }
  }
}

export const soundscape = new SoundscapeController();
