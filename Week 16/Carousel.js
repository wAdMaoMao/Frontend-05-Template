import { Component, STATE, ATTRIBUTE } from "./framework";
import { EnableGestrue } from "./gesture";
import { Timeline, Animation } from "./animation";
import { ease } from "./ease";

export { STATE, ATTRIBUTE } from "./framework";

export default class Carousel extends Component {
  constructor() {
    super(); // 调用 父对象/父类 的构造函数
  }
  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (const record of this[ATTRIBUTE].src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record.img}')`;
      this.root.appendChild(child);
    }

    EnableGestrue(this.root);

    this[STATE].position = 0;
    let children = this.root.children;
    let timeline = new Timeline(); // 自动轮播时间线
    timeline.start();

    // 手动轮播

    // 当手动操作轮播时，暂停自动轮播
    let ax = 0; // animation 造成的偏移量
    let t = 0; // animation 开始的时间
    this.root.addEventListener("h-start", (event) => {
      timeline.pause();
      clearInterval(handler);

      if (Date.now() - t < 2400) {
        let progress = (Date.now() - t) / 800;
        // 因为 position = nextPosition，所以 - width
        ax = ease(progress) * 500 - 500;
      } else {
        ax = 0;
      }
    });

    this.root.addEventListener("h-tap", (event) => {
      this.triggerEvent("click", {
        data: this[ATTRIBUTE].src[this[STATE].position].url,
        position: this[STATE].position,
      });
    });

    this.root.addEventListener("h-pan", (event) => {
      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 500)) / 500;

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = ((pos % children.length) + children.length) % children.length;
        children[pos].style.transition = "none";
        children[pos].style.transform = `translateX(${
          -pos * 500 + (x % 500) + offset * 500
        }px)`;
      }
    });

    this.root.addEventListener("h-end", (event) => {
      timeline.reset();
      timeline.start();

      handler = setInterval(nextPicture, 3000);

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - (x - (x % 500)) / 500;
      let direction = Math.round((x % 500) / 500);

      if (event.isFlick) {
        console.log("isFlick!");
        if ((x % 500) / 500 > 0) {
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
      }

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = ((pos % children.length) + children.length) % children.length;
        timeline.add(
          new Animation(
            children[pos].style,
            "transform",
            -pos * 500 + (x % 500) + offset * 500,
            -pos * 500 + direction * 500 + offset * 500,
            800,
            ease,
            0,
            (v) => `translateX(${v}px)`
          )
        );
      }

      this[STATE].position =
        this[STATE].position - (x - (x % 500)) / 500 - direction;
      this[STATE].position =
        ((this[STATE].position % children.length) + children.length) %
        children.length;
      this.triggerEvent("change", {
        position: this[STATE].position,
      });
    });

    // 自动播放
    let handler;
    let nextPicture = () => {
      let current = children[this[STATE].position];
      let nextPosition = (this[STATE].position + 1) % children.length;
      let next = children[nextPosition];
      t = Date.now();
      timeline.add(
        new Animation(
          current.style,
          "transform",
          -this[STATE].position * 500,
          -500 - this[STATE].position * 500,
          800,
          ease,
          0,
          (v) => {
            return `translateX(${v}px)`;
          }
        )
      );
      timeline.add(
        new Animation(
          next.style,
          "transform",
          500 - nextPosition * 500,
          -nextPosition * 500,
          800,
          ease,
          0,
          (v) => {
            return `translateX(${v}px)`;
          }
        )
      );

      this[STATE].position = nextPosition;
      this.triggerEvent("change", {
        position: this[STATE].position,
      });

      // 浏览器刷新一帧的时间 16ms
    };
    // nextPicture();
    // handler = setInterval(nextPicture, 3000);

    return this.root;
  }
}
