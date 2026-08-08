// 星轨拖尾特效 - 鼠标滑过留下彩色星光轨迹
// 来自开源项目,适配 Butterfly 主题
(function () {
  // 如果页面还没加载完,等一会再启动
  function init() {
    // 在 body 里创建一个画布
    var canvas = document.createElement('canvas');
    canvas.id = 'star-trail';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9998;pointer-events:none;';
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var W, H;
    var particles = [];
    var mouseX = -100, mouseY = -100;

    // 自适应窗口大小
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 粒子类
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.life = 1; // 透明度,逐渐消失
      this.decay = 0.02 + Math.random() * 0.02; // 消失速度
      this.size = 1 + Math.random() * 2.5; // 大小
      this.color = 'hsl(' + (Math.random() * 360) + ', 100%, 70%)'; // 随机彩色
      this.vx = (Math.random() - 0.5) * 0.6; // 轻微漂移
      this.vy = (Math.random() - 0.5) * 0.6;
    }

    // 记录鼠标位置
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // 每次移动产生 2 个新粒子
      for (var i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    });

    // 动画循环
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  // 等 DOM 就绪
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }
})();
