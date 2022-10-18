const ReactDOM = {
  render,
};
function render(vnode, container) {
   console.log('vnode', vnode);
   if(typeof vnode === undefined) return;
   if(typeof vnode === 'string'){
      let textNode = document.createTextNode(vnode);
      return container.appendChild(textNode)
   }
   const { tag, attrs, childrens } = vnode;
   console.log(123, JSON.stringify(vnode));
   const dom = document.createElement(tag);
   // 属性
   if(attrs){
      Object.keys(attrs).forEach(key => {
         const value =  attrs[key];
         setAttribute(dom, key, value)
      })
   }
   // 子节点
   if(Array.isArray(childrens) && childrens.length > 0){
      childrens.forEach(child => render(child, dom))
   }
   return container.appendChild(dom)
}
function setAttribute(dom, key, value) {
   if(key === 'className'){
      key = 'class'
   }
   if(/on\w+/.test(key)){
      key = key.toLowerCase();
      dom[key] = value || ''
   }else if(key === 'style'){
      if(!value || typeof value === 'string'){
         dom.style.cssText = value || ''
      }else if(value && typeof value === 'object'){
         for( let k in value){
            if(typeof value[k] === 'number' ) {
               dom.style[k] = value[k] + 'px'
            }else{
               dom.style[k] = value[k]
            }
         }
      }
   }else {
      if(key in dom) {
         dom[key] = value || ''
      }
      if(value) {
         dom.setAttribute(key, value)
      }else{
         dom.removeAttribute(key)
      }
      dom.setAttribute(key,value)
   }
}
export default ReactDOM;
