_N_E=(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)&&n.length){var a=o.apply(null,n);a&&e.push(a)}else if("object"===i)for(var u in n)r.call(n,u)&&n[u]&&e.push(u)}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},6086:function(e){"use strict";var t=Object.assign.bind(Object);e.exports=t,e.exports.default=e.exports},8277:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(7294),o=n(4184),i=n.n(o),a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;return Math.abs(e-t)<n},u=r.createElement,c=r.createContext({activeSection:0}),s=function(e){var t=e.children,n=e.startIndex,o=void 0===n?0:n,s=r.Children.count(t)-1;if(o>s)throw new Error("The start index cannot be higher than the amount of child sections");var l=(0,r.useState)(o),v=l[0],d=l[1],m=function(e){d((function(t){var n=Math.min(Math.max(0,t+e),s);return n!==t&&w(),n}))},p=(0,r.useState)(!1),h=p[0],E=p[1],w=function(){return E(!0)},g=function(){return E(!1)},b=function(e){if(e.preventDefault(),!h){var t=-e.deltaY||-e.detail,n=Math.max(-1,Math.min(1,t));m(n<0?1:-1)}};(0,r.useEffect)((function(){return document.addEventListener("wheel",b,{passive:!1}),function(){document.removeEventListener("wheel",b,!1)}}));var x=(0,r.useRef)({startY:0,previousY:0}),S=function(e){e.preventDefault(),x.current.startY=e.touches[0].pageY},N=function(e){e.preventDefault(),x.current.startY=e.pageY},Y=function(e,t){e.preventDefault();var n=x.current,r=n.startY,o=n.previousY;h||a(o,t)||(x.current.previousY=t,Math.abs(r-t)<window.innerHeight/20||m(r>t?1:-1))},T=function(e){return Y(e,e.touches[0].pageY)},_=function(e){return"mouse"!=e.pointerType&&Y(e,e.pageY)};return(0,r.useEffect)((function(){if(window.ontouchstart||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints)return document.addEventListener("touchstart",S,{passive:!1}),document.addEventListener("pointerdown",N,{passive:!1}),document.addEventListener("touchmove",T,{passive:!1}),document.addEventListener("pointermove",_,{passive:!1}),function(){document.removeEventListener("touchstart",S,!1),document.removeEventListener("pointerdown",N,!1),document.removeEventListener("touchmove",T,!1),document.removeEventListener("pointermove",_,!1)}})),u(c.Provider,{value:{activeSection:v}},u("div",{className:"h-full",onTransitionEnd:g},r.Children.map(t,(function(e,t){if(!r.isValidElement(e))throw new Error("Not a valid child element");return u(f,{index:t,onScrollEnd:g},r.cloneElement(e,{className:i()(e.props.className,"h-full")}))}))))};var f=function(e){var t=e.index,n=e.onScrollEnd,o=function(){var e=r.useContext(c);if(!e)throw new Error("ScrollSection compound components cannot be rendered outside the ScrollSectionContainer component");return e}().activeSection,s=(0,r.useMemo)((function(){return o===t}),[o]),f=(0,r.useRef)(null);return(0,r.useEffect)((function(){if(s){var e=f.current;if(e){var t;window.scrollTo({top:e.offsetTop,behavior:"smooth"});var r=setInterval((function(){a(window.pageYOffset,e.offsetTop,5)&&(clearTimeout(t),clearInterval(r),t=setTimeout((function(){n()}),150))}),50)}}}),[o]),u("div",{ref:f,className:i()("h-full transition-transform duration-300 opacity-50",{"opacity-100":s})},e.children)},l=function(){return u(s,null,u("div",{className:"bg-red-400"},"Some section"),u("div",{className:"bg-blue-400"},"Some section"),u("div",{className:"bg-green-400"},"Some section"),u("div",{className:"bg-yellow-400"},"Some section"))}},5301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8277)}])}},0,[[5301,272,774]]]);