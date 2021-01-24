let contents = new Map();
let isListeningMouse = false;

export class Dispatch {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    for (const name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

export class Listener {
  constructor(element, Recoginizer) {
    /*
     ** mouse event
     */
    element.addEventListener("mousedown", (event) => {
      let content = Object.create(null);
      contents.set("mouse" + (1 << event.button), content);
      Recoginizer.start(event, content);

      let mousemove = (event) => {
        let button = 1;

        while (button <= event.buttons) {
          if (button & event.buttons) {
            // order of buttons & button property is not same
            let key = button;
            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            }
            let content = contents.get("mouse" + key);
            Recoginizer.move(event, content);
          }
          button = button << 1;
        }
      };

      let mouseup = (event) => {
        let content = contents.get("mouse" + (1 << event.button));
        Recoginizer.end(event, content);
        contents.delete("mouse" + (1 << event.button));
        if (event.buttons === 0) {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          isListeningMouse = false;
        }
      };
      if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
      }
    });

    /*
     ** touch event
     */
    element.addEventListener("touchstart", (event) => {
      for (const touch of event.changedTouches) {
        let content = Object.create(null);
        contents.set(touch.identifier, content);
        Recoginizer.start(touch, content);
      }
    });
    element.addEventListener("touchmove", (event) => {
      for (const touch of event.changedTouches) {
        let content = contents.get(touch.identifier);
        Recoginizer.move(touch, content);
      }
    });
    element.addEventListener("touchend", (event) => {
      for (const touch of event.changedTouches) {
        let content = contents.get(touch.identifier);
        Recoginizer.end(touch, content);
        contents.delete(touch, touch.identifier);
      }
    });
    element.addEventListener("touchcancel", (event) => {
      for (const touch of event.changedTouches) {
        let content = contents.get(touch.identifier);
        Recoginizer.cancel(touch, content);
        contents.delete(touch, touch.identifier);
      }
    });

    /*
     ** 触发 touchcancel
     */
    // setTimeout(() => {
    //   alert("something happen!");
    // }, 1000);
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  /*
   ** - 对 mouse event 和 touch event 做统一抽象
   ** - 区分手势
   */

  start(point, content) {
    content.isPress = false;
    content.isPan = false;
    content.isTap = true;

    (content.startX = point.clientX), (content.startY = point.clientY);
    this.dispatcher.dispatch("h-start", {
      clientX: point.clientX,
      clientY: point.clientY,
    });
    // flick
    content.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ];

    // 0.5s press
    content.handler = setTimeout(() => {
      this.dispatcher.dispatch("h-pressstart", {});
      content.isPress = true;
      content.isPan = false;
      content.isTap = false;
    }, 500);
  }

  move(point, content) {
    // 10px pan
    let dx = point.clientX - content.startX,
      dy = point.clientY - content.startY;
    content.isVertical = Math.abs(dx) < Math.abs(dy);
    if (!content.isPan && dx ** 2 + dy ** 2 > 100) {
      content.isPan = true;
      content.isPress = false;
      content.isTap = false;
      this.dispatcher.dispatch("h-panstart", {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
      });
      clearTimeout(content.handler);
    }
    if (content.isPan) {
      this.dispatcher.dispatch("h-pan", {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
      });
    }

    // 最新的速度段
    content.points = content.points.filter(
      (point) => Date.now() - point.t <= 500
    );
    content.points.push({ t: Date.now(), x: point.clientY, y: point.clientY });
  }

  end(point, content) {
    let v;
    if (!content.points.length) {
      v = 0;
    } else {
      v =
        Math.sqrt(
          (point.clientX - content.points[0].x) ** 2 +
            (point.clientY - content.points[0].y) ** 2
        ) /
        (Date.now() - content.points[0].t);
    }
    if (v >= 1.5) {
      content.isFlick = true;
      this.dispatcher.dispatch("h-flick", {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
        isFlick: content.isFlick,
        velocity: v,
      });
    } else content.isFlick = false;

    if (content.isTap) {
      this.dispatcher.dispatch("h-tap", {});
      clearTimeout(content.handler);
    }
    if (content.isPress) {
      this.dispatcher.dispatch("h-pressend", {});
    }
    if (content.isPan) {
      this.dispatcher.dispatch("h-panend", {
        startX: content.startX,
        startY: content.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: content.isVertical,
        isFlick: content.isFlick,
        velocity: v,
      });
    }
    this.dispatcher.dispatch("h-end", {
      startX: content.startX,
      startY: content.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      isVertical: content.isVertical,
      isFlick: content.isFlick,
      velocity: v,
    });
  }

  cancel(point, content) {
    clearTimeout(content.handler);
    this.dispatcher.dispatch("h-cancel", {});
  }
}

export function EnableGestrue(element) {
  return new Listener(element, new Recognizer(new Dispatch(element)));
}
