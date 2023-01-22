function setup() {
  createCanvas(400, 400);
}

// 2次ベクトルクラス
class Vec2 {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  // 足し算
  add(b) {
    let a = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  //引き算
  sub(b) {
    let a = this;
    return new Vec2(a.x - b.x, a.y - b.y)
  }

  // s倍
  mul(s) {
    let a = this;
    return new Vec2(s * a.x, s * a.y);
  }

  // 大きさ
  mag() {
    let a = this;
    return sqrt(a.x ** 2 + a.y ** 2);
  }

  // 正規化ベクトル
  norm() {
    let a = this;
    return a.mul(1 / a.mag());
  }

  // 内積
  dot(b) {
    let a = this;
    return a.x * b.x + a.y * b.y;
  }
}

class Ball {
  constructor(_p, _v, _r) {
    this.p = _p;
    this.v = _v;
    this.r = _r;
  }
}

class Block {
  constructor(_p, _r) {
    this.p = _p;
    this.r = _r;
  }
}

let ball = new Ball(
  new Vec2(200, 300),
  new Vec2(240, -60),
  15
);

let block = new Block(new Vec2(200, 150), 50);

function draw() {
  // ボールの移動
  ball.p = ball.p.add(ball.v.mul(1 / 60));

  // ボールの左右端での反射
  if (ball.p.x > 385 || ball.p.x < 15) {
    ball.v.x = -ball.v.x;
  }

  // ボールの上端での反射
  if (ball.p.y < 15) {
    ball.v.y = -ball.v.y;
  }

  // ボールとブロックの衝突判定
  let d = block.p.sub(ball.p).mag();
  if (d < (ball.r + block.r)) {
    let v = ball.v;
    let w = ball.p.sub(block.p);
    let cos = v.mul(-1).dot(w) / (v.mul(-1).mag() * w.mag());
    let n = w.norm().mul(v.mag() * cos);
    let r = v.add(n.mul(2));
    ball.v = r;
  }

  // 画面塗りつぶし
  background(220);
  // ボールの描画
  circle(ball.p.x, ball.p.y, 2 * ball.r);
  // ブロックの描画
  circle(block.p.x, block.p.y, 2 * block.r)
}
