/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-12 13:11:48
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-12 15:43:51
 */
function getStyle(element) {
  if(!element.style){
    element.style = {}
  }
  for(let prop in element.computedStyle){
    let p = element.computedStyle.value
    element.style[prop] = element.computedStyle[prop].value
    if(element.style[prop].toString().match(/px$/)||element.style[prop].toString().match(/^[0-9\.]+$/)){
      element.style[prop] = parseInt(element.style[prop])
    }
  }
  return element.style
}

function layout(element) {
  if(!element.computedStyle) return;
  let elementStyle = getStyle(element)
  // 目前只能处理display为flex的情况
  if(elementStyle.display!=='flex') return;
  let items = element.children.filters(e=>e.type==='element')
  item.sort((a,b)=>(a.order||0)-(b.order||0))
  let style = elementStyle
  ['width','height'].forEach(size => {
    if(style[size] === 'auto' || style[size] === ''){
      style[size] = null
    }
  })
  // 初始化属性值
  if(!style.flexDirection || style.flexDirection === 'auto'){
    flexDirection = 'row'
  }
  if(!style.alignItems||style.alignItems === 'auto'){
    alignItems = 'stretch'
  }
  if(!style.justifyContent||style.justifyContent === 'auto'){
    justifyContent = 'flex-start'
  }
  if(!style.flexWrap||style.flexWrap === 'auto'){
    flexWrap = 'nowrap'
  }
  if(!style.alignContent||style.alignContent === 'auto'){
    alignContent = 'stretch'
  }
  let mainSize,mainStart,mainEnd,mainSign,mainBase,
      crossSize,crossStart,crossEnd,crossSign,crossBase
  if(style.flexDirection === 'row'){
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1
    mainBase = 0
    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if(style.flexDirection === 'row-reverse'){
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width
    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if(style.flexDirection === 'column'){
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0
    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if(style.flexDirection === 'column-reverse'){
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = style.height
    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if(style.flexDirection === 'wrap-reverse'){
    let tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossSign = +1
    crossBase = 0
  }
  let isAutoMainSize = false
  if(!style[mainSize]){ //auto sizing
    elementStyle[mainSize] = 0
    for(let i = 0;i<items.length;i++){
      let item = items[i]
      if(item[mainSize]!== null || item[mainSize]!==undefined)
      elementStyle[mainSize] += Number(item[mainSize])
    }
    isAutoMainSize = true
  }

  let flexLine = []
  let flexLines = [flexLine]
  let mainSpace = elementStyle[mainSize]//剩余空间
  let crossSpace = 0
  for(let i= 0;i<items.length;i++){
    let item = items[i]
    let itemStyle = getStyle(item)
    if(itemStyle[mainSize] === null){
      itemStyle[mainSize] = 0
    }

    if(itemStyle.flex){
      flexLine.push(item)
    }else if(style.flexWrap === 'nowrap' && isAutoMainSize === true){
      mainSpace -= itemStyle[mainSize]
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
        crossSpace = Math.max(crossSpace,itemStyle[crossSize])
        flexLine.push(item)
      }
    } else {
      //换行
      if(itemStyle[mainSize]>style[mainSize]){
        itemStyle[mainSize] = style[mainSize]
      }
      if(itemStyle[mainSize] > mainSpace){
        flexLine.mainBase = mainBase
        flexLine.crossBase = crossBase
        flexLine = [item]
        flexLines.push(flexLine)
        mainSpace = style[mainSize]
        crossSpace = 0
      } else {
        flexLines.push(item)
      }
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
        crossSpace = Math.max(crossSpace,itemStyle[crossSize])
        mainSpace -= itemStyle[mainSize]
      }
    }
    // 处理元素没了的情况
    flexLine.mainBase = mainBase

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    } else {
      flexLine.crossSpace = crossSpace;
    }
    if (mainSpace < 0) {
      // overflow (happens only if container is single line), scale every item
      const scale = style[mainSize] / (style[mainSize] - mainSpace);
      let currentMain = mainBase;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = getStyle(item);
  
        if (itemStyle.flex) {
          itemStyle[mainSize] = 0;
        }
  
        itemStyle[mainSize] = itemStyle[mainSize] * scale;
  
        itemStyle[mainStart] = currentMain;
        itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
        currentMain = itemStyle[mainEnd];
      }
    } else {
      // process each flex line
      flexLines.forEach(function (items) {
        const mainSpace = items.mainSpace;
        let flexTotal = 0;
  
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemStyle = getStyle(item);
  
          if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
            flexTotal += itemStyle.flex;
            continue;
          }
        }
  
        if (flexTotal > 0) {
          // There is flexible flex items
          let currentMain = mainBase;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);
  
            if (itemStyle.flex) {
              itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
            }
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
          }
        } else {
          // There is *NO* flexible flex items, which means, justifyContent should work
          let currentMain, step;
          if (style.justifyContent === 'flex-start') {
            currentMain = mainBase;
            step = 0;
          }
          if (style.justifyContent === 'flex-end') {
            currentMain = mainSpace * mainSign + mainBase;
            step = 0;
          }
          if (style.justifyContent === 'center') {
            currentMain = mainSpace / 2 * mainSign + mainBase;
            step = 0;
          }
          if (style.justifyContent === 'space-between') {
            step = mainSpace / (items.length - 1) * mainSign;
            currentMain = mainBase;
          }
          if (style.justifyContent === 'space-around') {
            step = mainSpace / items.length * mainSign;
            currentMain = step / 2 + mainBase;
          }
  
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemStyle = getStyle(item);
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd] + step;
          }
        }
      });
    }
    // compute the cross axis sizes
    // align-items, align-self
    let crossSpace;
    if (!style[crossSize]) { // auto sizing
      crossSpace = 0;
      elementStyle[crossSize] = 0;
      for (let i = 0; i < flexLines.length; i++) {
        elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
      }
    } else {
      crossSpace = style[crossSize];
      for (let i = 0; i < flexLines.length; i++) {
        crossSpace -= flexLines[i].crossSpace;
      }
    }
    if (style.flexWrap === 'wrap-reverse') {
      crossBase = style[crossSize];
    } else {
      crossBase = 0;
    }
    let lineSize = style[crossSize] / flexLines.length;
  
    let step;
    if (style.alignContent === 'flex-start') {
      crossBase += 0;
      step = 0;
    }
    if (style.alignContent === 'flex-end') {
      crossBase += crossSign * crossSpace;
      step = 0;
    }
    if (style.alignContent === 'center') {
      corssBase += crossSign * crossSpace / 2;
      step = 0;
    }
    if (style.alignContent === 'space-between') {
      crossBase += 0;
      step = crossSpace / (flexLines.length - 1);
    }
    if (style.alignContent === 'space-around') {
      step = crossSpace / flexLines.length;
      crossBase += crossSign * step / 2;
    }
    if (style.alignContent === 'stretch') {
      crossBase += 0;
      step = 0;
    }

    flexLines.forEach(function (items) {
      let lineCrossSize = style.alignContent === 'stretch' ?
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);
  
        let align = itemStyle.alignSelf || style.alignItems;
  
        if (item === null) {
          itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
        }
  
        if (align === 'flex-start') {
          itemStyle[crossStart] = crossBase;
          itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
        }
  
        if (align === 'flex-end') {
          itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
          itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
        }
        
        if (align === 'center') {
          itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
          itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
        }
  
        if (align === 'stretch') {
          itemStyle[crossStart] = crossBase;
          itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : lineCrossSize);
          itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
        }
      }
      crossBase += crossSign * (lineCrossSize + step);
    });
    
  }
}

module.exports = layout