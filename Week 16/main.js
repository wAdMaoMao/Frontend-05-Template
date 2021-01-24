// import { List } from "./List.js";
// import { Button } from "./Button.js";
import { createElement } from "./framework.js";
import Carousel from "./Carousel";

let d = [
  {
    img:
      "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    url: "https://time.geekbang.com",
    title: "geek time",
  },
  {
    img:
      "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    url: "https://tmall.com",
    title: "tmall",
  },
  {
    img:
      "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    url: "https://taobao.com",
    title: "taobao",
  },
  {
    img:
      "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    url: "https://baidu.com",
    title: "baidu",
  },
];

let a = (
  <Carousel
    src={d}
    onChange={(event) => console.log(event.detail.position)}
    onClick={(event) => (window.location.href = event.detail.data)}
  />
);
a.mountTo(document.body);

/*
 ** Button

let btn = <Button>btn</Button>;
btn.mountTo(document.body);
 */

/*
 ** List

let list = (
  <List data={d}>
    {(record) => (
      <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
      </div>
    )}
  </List>
);
list.mountTo(document.body);
 */
