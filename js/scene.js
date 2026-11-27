'use strict';
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  let W = window.innerWidth, H = window.innerHeight;
  const scene  = new THREE.Scene();
  scene.fog    = new THREE.FogExp2(0x070709, 0.0011);

  // Portrait mobile camera tuning: wider FOV (65) and increased distance (440) for expansive horizon
  const camera = new THREE.PerspectiveCamera(isMobile ? 65 : 52, W / H, 1, 2000);
  camera.position.set(0, 0, isMobile ? 440 : 360);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  /* 3D Titanium Acoustic Wave Mesh — 48x30 on mobile for silky 60fps, 72x42 on desktop */
  const segX = isMobile ? 48 : 72;
  const segY = isMobile ? 30 : 42;
  const geometry = new THREE.PlaneGeometry(1600, 900, segX, segY);

  const posAttr = geometry.attributes.position;
  const vertexCount = posAttr.count;
  const basePos = new Float32Array(vertexCount * 3);
  basePos.set(posAttr.array);

  // Wireframe lattice in Titanium Silver (crisp 0.075 on mobile, 0.065 on desktop)
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xcbd5e1,
    wireframe: true,
    transparent: true,
    opacity: isMobile ? 0.075 : 0.065
  });
  const wireMesh = new THREE.Mesh(geometry, wireMat);

  // Point lattice vertices with Platinum (#F1F5F9) & Anodized Ice Mist (#BAE6FD) crest highlights
  const colors = new Float32Array(vertexCount * 3);
  for (let i = 0; i < vertexCount; i++) {
    const mix = (Math.sin(i * 0.37) * 0.5 + 0.5) * 0.42;
    colors[i * 3]     = 0.945 * (1 - mix) + 0.729 * mix;
    colors[i * 3 + 1] = 0.961 * (1 - mix) + 0.902 * mix;
    colors[i * 3 + 2] = 0.976 * (1 - mix) + 0.992 * mix;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pointsMat = new THREE.PointsMaterial({
    vertexColors: true,
    size: isMobile ? 2.2 : 2.4,
    transparent: true,
    opacity: isMobile ? 0.65 : 0.55,
    sizeAttenuation: true
  });
  const points = new THREE.Points(geometry, pointsMat);

  // Group container with perspective tilt
  const waveGroup = new THREE.Group();
  waveGroup.add(wireMesh);
  waveGroup.add(points);
  waveGroup.rotation.x = -Math.PI * 0.36;
  waveGroup.position.set(0, -90, -120);
  scene.add(waveGroup);

  /* Mouse parallax & scroll tracking */
  let mx = 0, my = 0, tx = 0, ty = 0;
  if (!isMobile && !isReducedMotion) {
    window.addEventListener('mousemove', e => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* Multi-harmonic acoustic wave update */
  function updateWave(time) {
    for (let i = 0; i < vertexCount; i++) {
      const x = basePos[i * 3];
      const y = basePos[i * 3 + 1];
      const u = x * 0.0032;
      const v = y * 0.0052;
      const z = Math.sin(u + time * 1.6) * 26 +
                Math.cos(v + time * 1.3) * 20 +
                Math.sin((u + v) * 1.4 + time * 2.0) * 12;
      posAttr.setZ(i, z);
    }
    posAttr.needsUpdate = true;
  }

  /* Resize -- debounced + responsive camera FOV / distance for mobile portrait */
  let resizeTimer, lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastW && window.innerWidth < 768) return;
    lastW = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      W = window.innerWidth;
      H = window.innerHeight;
      const mobileNow = W < 768;
      camera.fov = mobileNow ? 65 : 52;
      camera.position.z = mobileNow ? 440 : 360;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }, 200);
  });

  /* Initial state */
  updateWave(0);
  renderer.render(scene, camera);

  /* Animation loop (paused when prefers-reduced-motion is active) */
  if (!isReducedMotion) {
    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.008;
      updateWave(t);

      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      waveGroup.rotation.y = mx * 0.06;
      waveGroup.rotation.x = -Math.PI * 0.36 - my * 0.05 + Math.min(scrollY * 0.00015, 0.12);
      waveGroup.position.y = -90 + Math.min(scrollY * 0.04, 80);

      renderer.render(scene, camera);
    }
    animate();
  }
})();
