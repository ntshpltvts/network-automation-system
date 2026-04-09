/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},s={},o={},r=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${r}--\x3e`,l=new RegExp(`${r}|${a}`);class d{constructor(e,t){this.parts=[],this.element=t;const n=[],i=[],s=document.createTreeWalker(t.content,133,null,!1);let o=0,a=-1,d=0;const{strings:c,values:{length:m}}=e;for(;d<m;){const e=s.nextNode();if(null!==e){if(a++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let i=0;for(let e=0;e<n;e++)h(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=c[d],n=p.exec(t)[2],i=n.toLowerCase()+"$lit$",s=e.getAttribute(i);e.removeAttribute(i);const o=s.split(l);this.parts.push({type:"attribute",index:a,name:n,strings:o}),d+=o.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),s.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const i=e.parentNode,s=t.split(l),o=s.length-1;for(let t=0;t<o;t++){let n,o=s[t];if(""===o)n=u();else{const e=p.exec(o);null!==e&&h(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),n=document.createTextNode(o)}i.insertBefore(n,e),this.parts.push({type:"node",index:++a})}""===s[o]?(i.insertBefore(u(),e),n.push(e)):e.data=s[o],d+=o}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&a!==o||(a++,t.insertBefore(u(),e)),o=a,this.parts.push({type:"node",index:a}),null===e.nextSibling?e.data="":(n.push(e),a--),d++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),d++}}else s.currentNode=i.pop()}for(const e of n)e.parentNode.removeChild(e)}}const h=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},c=e=>-1!==e.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class m{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let o,r=0,a=0,l=s.nextNode();for(;r<i.length;)if(o=i[r],c(o)){for(;a<o.index;)a++,"TEMPLATE"===l.nodeName&&(t.push(l),s.currentNode=l.content),null===(l=s.nextNode())&&(s.currentNode=t.pop(),l=s.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(l.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return n&&(document.adoptNode(e),customElements.upgrade(e)),e
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */}}const f=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),g=` ${r} `;class v{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let i=0;i<e;i++){const e=this.strings[i],s=e.lastIndexOf("\x3c!--");n=(s>-1||n)&&-1===e.indexOf("--\x3e",s+1);const o=p.exec(e);t+=null===o?e+(n?g:a):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==f&&(t=f.createHTML(t)),e.innerHTML=t,e
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */}}const _=e=>null===e||!("object"==typeof e||"function"==typeof e),y=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class S{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!y(e))return e}let i="";for(let s=0;s<t;s++){i+=e[s];const t=n[s];if(void 0!==t){const e=t.value;if(_(e)||!y(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===s||_(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=s,e(this)}this.value!==s&&this.committer.commit()}}class x{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(u()),this.endNode=e.appendChild(u())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=u()),e.__insert(this.endNode=u())}insertAfterPart(e){e.__insert(this.startNode=u()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}const e=this.__pendingValue;e!==s&&(_(e)?e!==this.value&&this.__commitText(e):e instanceof v?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):y(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const n=new m(t,e.processor,this.options),i=n._clone();n.update(e.values),this.__commitNode(i),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,i=0;for(const s of e)n=t[i],void 0===n&&(n=new x(this.options),t.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(t[i-1])),n.setValue(s),n.commit(),i++;i<t.length&&(t.length=i,this.clear(n&&n.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class b{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=s}}class N extends S{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends w{}let E=!1;(()=>{try{const e={get capture(){return E=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class C{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=s,e(this)}if(this.__pendingValue===s)return;const e=this.__pendingValue,n=this.value,i=null==e||null!=n&&(e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive),o=null!=e&&(null==n||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=V(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=s}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const V=e=>e&&(E?{capture:e.capture,passive:e.passive,once:e.once}:e.capture
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */),M=new class{handleAttributeExpressions(e,t,n,i){const s=t[0];return"."===s?new N(e,t.slice(1),n).parts:"@"===s?[new C(e,t.slice(1),i.eventContext)]:"?"===s?[new b(e,t.slice(1),n)]:new S(e,t,n).parts}handleTextExpression(e){return new x(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function A(e){let t=F.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},F.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const i=e.strings.join(r);return n=t.keyString.get(i),void 0===n&&(n=new d(e,e.getTemplateElement()),t.keyString.set(i,n)),t.stringsArray.set(e.strings,n),n}const F=new Map,L=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(e,...t)=>new v(e,t,"html",M)
/**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */,k=(e,t)=>{const n=e.startNode.parentNode,i=void 0===t?e.endNode:t.startNode,s=n.insertBefore(u(),i);n.insertBefore(u(),i);const o=new x(e.options);return o.insertAfterNode(s),o},H=(e,t)=>(e.setValue(t),e.commit(),e),R=(e,t,n)=>{const i=e.startNode.parentNode,s=n?n.startNode:e.endNode,o=t.endNode.nextSibling;o!==s&&((e,t,n=null,i=null)=>{for(;t!==n;){const n=t.nextSibling;e.insertBefore(t,i),t=n}})(i,t.startNode,o,s)},$=e=>{i(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},O=(e,t,n)=>{const i=new Map;for(let s=t;s<=n;s++)i.set(e[s],s);return i},W=new WeakMap,P=new WeakMap,D=(B=(e,t,n)=>{let i;return void 0===n?n=t:void 0!==t&&(i=t),t=>{if(!(t instanceof x))throw new Error("repeat can only be used in text bindings");const s=W.get(t)||[],o=P.get(t)||[],r=[],a=[],l=[];let d,h,c=0;for(const t of e)l[c]=i?i(t,c):c,a[c]=n(t,c),c++;let u=0,p=s.length-1,m=0,f=a.length-1;for(;u<=p&&m<=f;)if(null===s[u])u++;else if(null===s[p])p--;else if(o[u]===l[m])r[m]=H(s[u],a[m]),u++,m++;else if(o[p]===l[f])r[f]=H(s[p],a[f]),p--,f--;else if(o[u]===l[f])r[f]=H(s[u],a[f]),R(t,s[u],r[f+1]),u++,f--;else if(o[p]===l[m])r[m]=H(s[p],a[m]),R(t,s[p],s[u]),p--,m++;else if(void 0===d&&(d=O(l,m,f),h=O(o,u,p)),d.has(o[u]))if(d.has(o[p])){const e=h.get(l[m]),n=void 0!==e?s[e]:null;if(null===n){const e=k(t,s[u]);H(e,a[m]),r[m]=e}else r[m]=H(n,a[m]),R(t,n,s[u]),s[e]=null;m++}else $(s[p]),p--;else $(s[u]),u++;for(;m<=f;){const e=k(t,r[f+1]);H(e,a[m]),r[m++]=e}for(;u<=p;){const e=s[u++];null!==e&&$(e)}W.set(t,r),P.set(t,l)}},(...t)=>{const n=B(...t);return e.set(n,!0),n});var B,j=":host{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;min-height:1.5rem;font-family:LidlFontCondPro,Trebuchet MS,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:1rem;line-height:1.4;color:#353b42}:host .slot{display:flex;flex-direction:row;font-size:1.75rem;font-weight:700;line-height:1.2;line-height:.8;padding:0 .25rem}@media (min-width:1280px){:host .slot{font-size:1.875rem}}:host .slot__slot-digits{display:flex}:host .slot__slot-digit{width:1rem;margin:0 auto}:host .slot__slot-division{font-size:.75rem;font-weight:700;margin-top:auto}@media (min-width:1280px){:host .slot__slot-division{font-size:.875rem}}:host .slot:not(:last-child){border-right:1px solid #e3e4e5}:host .slot:first-child{padding-left:0}:host .slot:last-child{padding-right:0}";!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css","top"===n&&i.firstChild?i.insertBefore(s,i.firstChild):i.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}}(j),function(){if(!("adoptedStyleSheets"in document)){var e="ShadyCSS"in window&&!window.ShadyCSS.nativeShadow,t=[],n=[],i=new WeakMap,s=new WeakMap,o=new WeakMap,r=new WeakMap,a=new WeakMap,l={loaded:!1},d={body:null,CSSStyleSheet:null},h=CSSStyleSheet,c=/@import\surl(.*?);/gi,u=["addImport","addPageRule","addRule","deleteRule","insertRule","removeImport","removeRule"],p=["replace","replaceSync"],m=function(){function e(){var e=document.createElement("style");l.loaded?d.body.appendChild(e):(document.head.appendChild(e),e.disabled=!0,t.push(e));var n=e.sheet;return s.set(n,{adopters:new Map,actions:[],basicStyleElement:e}),n}var n=e.prototype;return n.replace=function(e){var t=this,n=_(e);return new Promise(function(e,i){if(s.has(t)){var o=s.get(t).basicStyleElement;o.innerHTML=n,e(o.sheet),S(t)}else i(new Error("Can't call replace on non-constructed CSSStyleSheets."))})},n.replaceSync=function(e){var t=_(e);if(s.has(this)){var n=s.get(this).basicStyleElement;return n.innerHTML=t,S(this),n.sheet}throw new Error("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")},e}();Object.defineProperty(m,Symbol.hasInstance,{configurable:!0,value:f}),y(h.prototype),window.CSSStyleSheet=m,function(){var t={configurable:!0,get:function(){return i.get(this)||[]},set:function(e){var t=i.get(this)||[];!function(e,t){var n=t===document?"Document":"ShadowRoot";if(!Array.isArray(e))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Iterator getter is not callable.");if(!e.every(f))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+n+": Failed to convert value to 'CSSStyleSheet'");var s=e.filter(function(t,n){return e.indexOf(t)===n});i.set(t,s)}(e,this);var n=this===document?g()?this.head:this.body:this,o="isConnected"in n?n.isConnected:document.body.contains(n);window.requestAnimationFrame(function(){o&&(w(n),function(e,t){for(var n=v(e),i=0,o=t.length;i<o;i++)if(!(n.indexOf(t[i])>-1)){var a=s.get(t[i]).adopters,l=r.get(e),d=a.get(e);d||(d=a.get(document.head)),l.disconnect(),d.parentNode.removeChild(d),l.observe()}}(n,t))})}};if(Object.defineProperty(Document.prototype,"adoptedStyleSheets",t),"undefined"!=typeof ShadowRoot){var n=Element.prototype.attachShadow;Element.prototype.attachShadow=function(){var t=e?this:n.apply(this,arguments);return b(t),t},Object.defineProperty(ShadowRoot.prototype,"adoptedStyleSheets",t)}}(),g()?document.addEventListener("DOMContentLoaded",N):N()}function f(e){return e instanceof h||e instanceof d.CSSStyleSheet}function g(){return"loading"===document.readyState}function v(e){return i.get(e.parentNode===document.documentElement?document:e)}function _(e){var t=e.match(c,"")||[],n=e;return t.length&&(console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),t.forEach(function(e){n=n.replace(e,"")})),n}function y(e){p.forEach(function(t){e[t]=function(){return m.prototype[t].apply(this,arguments)}}),u.forEach(function(t){var n=e[t];e[t]=function(){var e=arguments,i=n.apply(this,e);if(s.has(this)){var o=s.get(this),r=o.adopters,a=o.actions;r.forEach(function(n){n.sheet&&n.sheet[t].apply(n.sheet,e)}),a.push([t,e])}return i}})}function S(e){var t=s.get(e),n=t.adopters,i=t.basicStyleElement;n.forEach(function(e){e.innerHTML=i.innerHTML})}function w(e){for(var t=document.createDocumentFragment(),i=v(e),l=r.get(e),d=0,h=i.length;d<h;d++){var c=s.get(i[d]),u=c.adopters,p=c.basicStyleElement,m=u.get(e);m?(l.disconnect(),t.appendChild(m),(!m.innerHTML||m.sheet&&!m.sheet.cssText)&&(m.innerHTML=p.innerHTML),l.observe()):((m=document.createElement("style")).innerHTML=p.innerHTML,o.set(m,e),a.set(m,0),u.set(e,m),t.appendChild(m)),e===document.head&&n.push(m)}e.insertBefore(t,e.firstChild);for(var f=0,g=i.length;f<g;f++){var _=s.get(i[f]),y=_.adopters,S=_.actions,w=y.get(e),x=a.get(w);if(S.length>0){for(var b=x,N=S.length;b<N;b++){var T=S[b],E=T[0],C=T[1];w.sheet[E].apply(w.sheet,C)}a.set(w,S.length-1)}}}function x(t){for(var n=0,i=t.length;n<i;n++){for(var s=t[n],r=s.addedNodes,a=s.removedNodes,l=0,d=a.length;l<d;l++){var h=o.get(a[l]);h&&w(h)}if(!e)for(var c=0,u=r.length;c<u;c++)for(var p=document.createNodeIterator(r[c],NodeFilter.SHOW_ELEMENT,function(e){return e.shadowRoot&&e.shadowRoot.adoptedStyleSheets.length>0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),m=void 0;m=p.nextNode();)w(m.shadowRoot)}}function b(e){var t=new MutationObserver(x),n={observe:function(){t.observe(e,{childList:!0,subtree:!0})},disconnect:function(){t.disconnect()}};r.set(e,n),n.observe()}function N(){var e=document.createElement("iframe");e.hidden=!0,document.body.appendChild(e),d.body=e.contentWindow.document.body,d.CSSStyleSheet=e.contentWindow.CSSStyleSheet,y(e.contentWindow.CSSStyleSheet.prototype),b(document.body),l.loaded=!0;for(var i=document.createDocumentFragment(),s=0,o=t.length;s<o;s++)t[s].disabled=!1,i.appendChild(t[s]);d.body.appendChild(i);for(var r=0,a=n.length;r<a;r++)i.appendChild(n[r]);document.body.insertBefore(i,document.body.firstChild),t.length=0,n.length=0}}();class z extends HTMLElement{constructor(){super();const e=new CSSStyleSheet;e.replaceSync(j),this._nextTime=0,this._startOfDay={hours:["0","0"],minutes:["0","0"],seconds:["0","0"]},this._endTime=0,this._animationFrameId=0,this._translations={seconds:"Sec.",minutes:"Min.",hours:"Hrs."},this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[e]}get endTime(){return this.getAttribute("endTime")}get translations(){const e=this.getAttribute("translations");return e?JSON.parse(e):this._translations}connectedCallback(){this._endTime=parseInt(this.endTime,10),this._translations=this.translations,this._animationFrameId=window.requestAnimationFrame(this._nextAnimationFrame),document.addEventListener("visibilitychange",this._handleDocumentVisibilityChange),this._update(this._startOfDay)}disconnectedCallback(){document.removeEventListener("visibilitychange",this._handleDocumentVisibilityChange),this._animationFrameId&&window.cancelAnimationFrame(this._animationFrameId)}_timerTpl=e=>I`
            ${D(this._log(e),(e,t)=>t,e=>I`
                    <div class="slot">
                        <div class="slot__slot-digits">
                            ${D(e.value,(e,t)=>t,e=>I`<div class="slot__slot-digit">${e}</div>`)}
                        </div>
                        <div class="slot__slot-division">${this._translations[e.key]}</div>
                    </div>`)}
    `;_timer=()=>{const e=(new Date).getTime(),t=this._endTime-e;t>0?this._update(this._getTimeRemaining(t)):(window.cancelAnimationFrame(this._animationFrameId),document.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this._update(this._startOfDay)),this.loading=!1};_getTimeRemaining=e=>{const t=Math.floor(e/1e3%60).toString().split(""),n=Math.floor(e/1e3/60%60).toString().split("");return{hours:Math.floor(e/36e5).toString().split(""),minutes:n,seconds:t}};_nextAnimationFrame=e=>{e-(this._nextTime||0)>1e3&&(this._timer(),this._nextTime=e),window.requestAnimationFrame(this._nextAnimationFrame)};_handleDocumentVisibilityChange=()=>{"hidden"===document.visibilityState&&this._animationFrameId?window.cancelAnimationFrame(this._animationFrameId):"visible"===document.visibilityState&&(this._animationFrameId=window.requestAnimationFrame(this._nextAnimationFrame))};_log=e=>{const t=[];return Object.keys(e).forEach(n=>{t.push({key:n,value:this._formatTimer(e[n])})}),t};_formatTimer=e=>(1===e.length&&e.unshift("0"),e);_update(e){((e,t)=>{let n=L.get(t);void 0===n&&(i(t,t.firstChild),L.set(t,n=new x(Object.assign({templateFactory:A},void 0))),n.appendInto(t)),n.setValue(e),n.commit()})(this._timerTpl(e),this.shadowRoot)}}window.customElements.define("dod-countdown",z);export{z as DodCountdown};