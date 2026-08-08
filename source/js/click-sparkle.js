// 点击小星星特效 - 点击时绽放一圈彩色小星星,轻轻飘散
(function () {
  function init() {
    var canvas = document.createElement('canvas');
    canvas.id = 'click-sparkle';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9998;pointer-events:none;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var W, H;
    var stars = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 星星粒子
    function Star(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1;              // 透明度
      this.decay = 0.025 + Math.random() * 0.02;
      this.size = 2 + Math.random() * 4;
      this.angle = Math.random() * Math.PI * 2;       // 随机方向
      this.speed = 1.5 + Math.random() * 3;           // 飞散速度
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed - 1; // 轻微上飘
      this.hue = Math.random() * 360;
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.2;
      this.spin = Math.random() < 0.5; // 一半星星旋转
    }

    function drawStar(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      if (s.spin) ctx.rotate(s.rotation);
      ctx.globalAlpha = s.life;
      ctx.fillStyle = 'hsl(' + s.hue + ', 100%, 70%)';
      // 画五角星
      ctx.beginPath();
      var spikes = 5, outer = s.size, inner = s.size * 0.45;
      for (var i = 0; i < spikes * 2; i++) {
        var r = i % 2 === 0 ? outer : inner;
        var a = (i * Math.PI) / spikes;
        var px = Math.cos(a) * r;
        var py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    document.addEventListener('click', function (e) {
      // 每次点击绽放 8 颗小星星
      for (var i = 0; i < 8; i++) {
        stars.push(new Star(e.clientX, e.clientY));
      }
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = stars.length - 1; i >= 0; i--) {
        var s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // 重力,让星星自然下落
        s.rotation += s.rotSpeed;
        s.life -= s.decay;
        if (s.life <= 0) {
          stars.splice(i, 1);
          continue;
        }
        drawStar(s);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }
})();
