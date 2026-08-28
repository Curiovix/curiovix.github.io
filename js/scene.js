'use strict';
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = window.innerWidth, H = window.innerHeight;
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 1500);
  camera.position.z = 380;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  /* Particles */
  const COUNT = 220;
  const pos   = new Float32Array(COUNT * 3);
  const col   = new Float32Array(COUNT * 3);
  const palette = [
    [0.13, 0.83, 0.93], // cyan
    [0.50, 0.51, 0.98], // indigo
    [0.60, 0.42, 0.98], // violet
    [0.38, 0.40, 0.95], // periwinkle
  ];
  for (let i = 0; i < COUNT; i++) {
    pos[i*3]   = (Math.random()-.5) * 1000;
    pos[i*3+1] = (Math.random()-.5) *  700;
    pos[i*3+2] = (Math.random()-.5) *  500;
    const c = palette[Math.floor(Math.random() * palette.length)];
    col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size:2.2, vertexColors:true, transparent:true, opacity:.65, sizeAttenuation:true });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  /* Connection lines */
  const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.12 });
  const lineGeo = new THREE.BufferGeometry();
  const linePositions = [];
  const threshold = 120;
  for (let i = 0; i < COUNT; i++) {
    for (let j = i+1; j < COUNT; j++) {
      const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < threshold) {
        linePositions.push(pos[i*3],pos[i*3+1],pos[i*3+2], pos[j*3],pos[j*3+1],pos[j*3+2]);
      }
    }
  }
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  scene.add(new THREE.LineSegments(lineGeo, lineMat));

  /* Mouse parallax */
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    tx = (e.clientX / innerWidth  - .5) * 2;
    ty = (e.clientY / innerHeight - .5) * 2;
  });

  /* Resize */
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  /* Loop */
  let t = 0;
  (function loop() {
    requestAnimationFrame(loop);
    t += 0.00035;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    pts.rotation.y = t + mx * 0.18;
    pts.rotation.x = t * 0.4 - my * 0.10;
    renderer.render(scene, camera);
  })();
})();
