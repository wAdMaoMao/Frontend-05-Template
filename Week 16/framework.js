export function createElement(type, attribute, ...children) {
  let element;
  if (typeof type === "string") element = new ElementWrapper(type);
  else element = new type();
  for (const name in attribute) {
    if (Object.hasOwnProperty.call(attribute, name)) {
      element.setAttribute(name, attribute[name]);
    }
  }
  let processChildren = (children) => {
    for (const child of children) {
      if (typeof child === "object" && child instanceof Array) {
        processChildren(child);
        continue;
      }
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }
      element.appendChild(child);
    }
  };

  processChildren(children);

  return element;
}

export const ATTRIBUTE = Symbol("attribute");
export const STATE = Symbol("state");

export class Component {
  constructor(type) {
    // this.root = this.render();
    this[ATTRIBUTE] = Object.create(null);
    this[STATE] = Object.create(null);
  }
  render() {
    return this.root;
  }
  setAttribute(name, value) {
    this[ATTRIBUTE][name] = value;
  }
  appendChild(child) {
    if (!this.root) {
      this.render();
    }
    child.mountTo(this.root);
  }
  mountTo(parent) {
    if (!this.root) {
      this.render();
    }
    parent.appendChild(this.root);
  }
  triggerEvent(type, args) {
    this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, (s) => s.toUpperCase())](
      new CustomEvent(type, { detail: args })
    );
  }
}
class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
}
class TextWrapper extends Component {
  constructor(text) {
    super();
    this.root = document.createTextNode(text);
  }
}
