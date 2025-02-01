var pa={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ph=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[t++],a=n[t++],u=n[t++],h=((i&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return e.join("")},kc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],a=i+1<n.length,u=a?n[i+1]:0,h=i+2<n.length,d=h?n[i+2]:0,p=o>>2,T=(o&3)<<4|u>>4;let R=(u&15)<<2|d>>6,C=d&63;h||(C=64,a||(R=64)),r.push(t[p],t[T],t[R],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(bc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ph(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const T=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||u==null||d==null||T==null)throw new Ch;const R=o<<2|u>>4;if(r.push(R),d!==64){const C=u<<4&240|d>>2;if(r.push(C),T!==64){const D=d<<6&192|T;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ch extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bh=function(n){const e=bc(n);return kc.encodeByteArray(e,!0)},Fr=function(n){return bh(n).replace(/\./g,"")},Vc=function(n){try{return kc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=()=>kh().__FIREBASE_DEFAULTS__,Dh=()=>{if(typeof process>"u"||typeof pa>"u")return;const n=pa.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Nh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Vc(n[1]);return e&&JSON.parse(e)},ii=()=>{try{return Vh()||Dh()||Nh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dc=n=>{var e,t;return(t=(e=ii())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Oh=n=>{const e=Dc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Nc=()=>{var n;return(n=ii())===null||n===void 0?void 0:n.config},Oc=n=>{var e;return(e=ii())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Fr(JSON.stringify(t)),Fr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ee())}function Uh(){var n;const e=(n=ii())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Fh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Bh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function jh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qh(){const n=Ee();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function $h(){return!Uh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zh(){try{return typeof indexedDB=="object"}catch{return!1}}function Wh(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh="FirebaseError";class Ze extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Hh,Object.setPrototypeOf(this,Ze.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Gn.prototype.create)}}class Gn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],a=o?Gh(o,r):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new Ze(i,u,r)}}function Gh(n,e){return n.replace(Kh,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Kh=/\{\$([^}]+)}/g;function Qh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Br(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const o=n[i],a=e[i];if(ma(o)&&ma(a)){if(!Br(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function ma(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function bn(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,o]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(o)}}),e}function kn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Jh(n,e){const t=new Yh(n,e);return t.subscribe.bind(t)}class Yh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Xh(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Hi),i.error===void 0&&(i.error=Hi),i.complete===void 0&&(i.complete=Hi);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Xh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Hi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n){return n&&n._delegate?n._delegate:n}class kt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Lh;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(td(e))try{this.getOrInitializeService({instanceIdentifier:Pt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(e=Pt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Pt){return this.instances.has(e)}getOptions(e=Pt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const a=this.instances.get(i);return a&&e(a,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ed(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Pt){return this.component?this.component.multipleInstances?e:Pt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ed(n){return n===Pt?void 0:n}function td(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Zh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(B||(B={}));const rd={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},id=B.INFO,sd={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},od=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=sd[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rs{constructor(e){this.name=e,this._logLevel=id,this._logHandler=od,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in B))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?rd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...e),this._logHandler(this,B.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...e),this._logHandler(this,B.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,B.INFO,...e),this._logHandler(this,B.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,B.WARN,...e),this._logHandler(this,B.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...e),this._logHandler(this,B.ERROR,...e)}}const ad=(n,e)=>e.some(t=>n instanceof t);let ga,_a;function cd(){return ga||(ga=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ud(){return _a||(_a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Lc=new WeakMap,rs=new WeakMap,Mc=new WeakMap,Gi=new WeakMap,Ss=new WeakMap;function ld(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(dt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Lc.set(t,n)}).catch(()=>{}),Ss.set(e,n),e}function hd(n){if(rs.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});rs.set(n,e)}let is={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return rs.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Mc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return dt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function dd(n){is=n(is)}function fd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ki(this),e,...t);return Mc.set(r,e.sort?e.sort():[e]),dt(r)}:ud().includes(n)?function(...e){return n.apply(Ki(this),e),dt(Lc.get(this))}:function(...e){return dt(n.apply(Ki(this),e))}}function pd(n){return typeof n=="function"?fd(n):(n instanceof IDBTransaction&&hd(n),ad(n,cd())?new Proxy(n,is):n)}function dt(n){if(n instanceof IDBRequest)return ld(n);if(Gi.has(n))return Gi.get(n);const e=pd(n);return e!==n&&(Gi.set(n,e),Ss.set(e,n)),e}const Ki=n=>Ss.get(n);function md(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(n,e),u=dt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(dt(a.result),h.oldVersion,h.newVersion,dt(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const gd=["get","getKey","getAll","getAllKeys","count"],_d=["put","add","delete","clear"],Qi=new Map;function ya(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qi.get(e))return Qi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=_d.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||gd.includes(t)))return;const o=async function(a,...u){const h=this.transaction(a,i?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),i&&h.done]))[0]};return Qi.set(e,o),o}dd(n=>({...n,get:(e,t,r)=>ya(e,t)||n.get(e,t,r),has:(e,t)=>!!ya(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(vd(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function vd(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ss="@firebase/app",va="0.10.18";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Rs("@firebase/app"),Ed="@firebase/app-compat",Td="@firebase/analytics-compat",Id="@firebase/analytics",wd="@firebase/app-check-compat",Ad="@firebase/app-check",Rd="@firebase/auth",Sd="@firebase/auth-compat",Pd="@firebase/database",Cd="@firebase/data-connect",bd="@firebase/database-compat",kd="@firebase/functions",Vd="@firebase/functions-compat",Dd="@firebase/installations",Nd="@firebase/installations-compat",Od="@firebase/messaging",Ld="@firebase/messaging-compat",Md="@firebase/performance",xd="@firebase/performance-compat",Ud="@firebase/remote-config",Fd="@firebase/remote-config-compat",Bd="@firebase/storage",jd="@firebase/storage-compat",qd="@firebase/firestore",$d="@firebase/vertexai",zd="@firebase/firestore-compat",Wd="firebase",Hd="11.2.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="[DEFAULT]",Gd={[ss]:"fire-core",[Ed]:"fire-core-compat",[Id]:"fire-analytics",[Td]:"fire-analytics-compat",[Ad]:"fire-app-check",[wd]:"fire-app-check-compat",[Rd]:"fire-auth",[Sd]:"fire-auth-compat",[Pd]:"fire-rtdb",[Cd]:"fire-data-connect",[bd]:"fire-rtdb-compat",[kd]:"fire-fn",[Vd]:"fire-fn-compat",[Dd]:"fire-iid",[Nd]:"fire-iid-compat",[Od]:"fire-fcm",[Ld]:"fire-fcm-compat",[Md]:"fire-perf",[xd]:"fire-perf-compat",[Ud]:"fire-rc",[Fd]:"fire-rc-compat",[Bd]:"fire-gcs",[jd]:"fire-gcs-compat",[qd]:"fire-fst",[zd]:"fire-fst-compat",[$d]:"fire-vertex","fire-js":"fire-js",[Wd]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jr=new Map,Kd=new Map,as=new Map;function Ea(n,e){try{n.container.addComponent(e)}catch(t){Qe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Yt(n){const e=n.name;if(as.has(e))return Qe.debug(`There were multiple attempts to register component ${e}.`),!1;as.set(e,n);for(const t of jr.values())Ea(t,n);for(const t of Kd.values())Ea(t,n);return!0}function Ps(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ke(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ft=new Gn("app","Firebase",Qd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ft.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on=Hd;function Yd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:os,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw ft.create("bad-app-name",{appName:String(i)});if(t||(t=Nc()),!t)throw ft.create("no-options");const o=jr.get(i);if(o){if(Br(t,o.options)&&Br(r,o.config))return o;throw ft.create("duplicate-app",{appName:i})}const a=new nd(i);for(const h of as.values())a.addComponent(h);const u=new Jd(t,r,a);return jr.set(i,u),u}function xc(n=os){const e=jr.get(n);if(!e&&n===os&&Nc())return Yd();if(!e)throw ft.create("no-app",{appName:n});return e}function pt(n,e,t){var r;let i=(r=Gd[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const o=i.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const u=[`Unable to register library "${i}" with version "${e}":`];o&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&u.push("and"),a&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qe.warn(u.join(" "));return}Yt(new kt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd="firebase-heartbeat-database",Zd=1,Bn="firebase-heartbeat-store";let Ji=null;function Uc(){return Ji||(Ji=md(Xd,Zd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Bn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ft.create("idb-open",{originalErrorMessage:n.message})})),Ji}async function ef(n){try{const t=(await Uc()).transaction(Bn),r=await t.objectStore(Bn).get(Fc(n));return await t.done,r}catch(e){if(e instanceof Ze)Qe.warn(e.message);else{const t=ft.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Qe.warn(t.message)}}}async function Ta(n,e){try{const r=(await Uc()).transaction(Bn,"readwrite");await r.objectStore(Bn).put(e,Fc(n)),await r.done}catch(t){if(t instanceof Ze)Qe.warn(t.message);else{const r=ft.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Qe.warn(r.message)}}}function Fc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf=1024,nf=30*24*60*60*1e3;class rf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new of(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ia();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const u=new Date(a.date).valueOf();return Date.now()-u<=nf}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Qe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Ia(),{heartbeatsToSend:r,unsentEntries:i}=sf(this._heartbeatsCache.heartbeats),o=Fr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Qe.warn(t),""}}}function Ia(){return new Date().toISOString().substring(0,10)}function sf(n,e=tf){const t=[];let r=n.slice();for(const i of n){const o=t.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),wa(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),wa(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class of{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zh()?Wh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ef(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ta(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ta(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function wa(n){return Fr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){Yt(new kt("platform-logger",e=>new yd(e),"PRIVATE")),Yt(new kt("heartbeat",e=>new rf(e),"PRIVATE")),pt(ss,va,n),pt(ss,va,"esm2017"),pt("fire-js","")}af("");var cf="firebase",uf="11.2.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pt(cf,uf,"app");var Aa=function(){return Aa=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++){t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Aa.apply(this,arguments)};function Cs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function ky(n,e,t){if(t||arguments.length===2)for(var r=0,i=e.length,o;r<i;r++)(o||!(r in e))&&(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return n.concat(o||Array.prototype.slice.call(e))}function Bc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lf=Bc,jc=new Gn("auth","Firebase",Bc());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr=new Rs("@firebase/auth");function hf(n,...e){qr.logLevel<=B.WARN&&qr.warn(`Auth (${on}): ${n}`,...e)}function br(n,...e){qr.logLevel<=B.ERROR&&qr.error(`Auth (${on}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce(n,...e){throw ks(n,...e)}function De(n,...e){return ks(n,...e)}function bs(n,e,t){const r=Object.assign(Object.assign({},lf()),{[e]:t});return new Gn("auth","Firebase",r).create(e,{appName:n.name})}function Ge(n){return bs(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function df(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ce(n,"argument-error"),bs(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ks(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return jc.create(n,...e)}function M(n,e,...t){if(!n)throw ks(e,...t)}function ze(n){const e="INTERNAL ASSERTION FAILED: "+n;throw br(e),new Error(e)}function Je(n,e){n||ze(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function ff(){return Ra()==="http:"||Ra()==="https:"}function Ra(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ff()||Bh()||"connection"in navigator)?navigator.onLine:!0}function mf(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Je(t>e,"Short delay should be less than long delay!"),this.isMobile=xh()||jh()}get(){return pf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(n,e){Je(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ze("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ze("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ze("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f=new Qn(3e4,6e4);function et(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ne(n,e,t,r,i={}){return $c(n,i,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const u=Kn(Object.assign({key:n.config.apiKey},a)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d=Object.assign({method:e,headers:h},o);return Fh()||(d.referrerPolicy="no-referrer"),qc.fetch()(zc(n,n.config.apiHost,t,u),d)})}async function $c(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},gf),e);try{const i=new vf(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw wr(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const u=o.ok?a.errorMessage:a.error.message,[h,d]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw wr(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw wr(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw wr(n,"user-disabled",a);const p=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw bs(n,p,d);Ce(n,p)}}catch(i){if(i instanceof Ze)throw i;Ce(n,"network-request-failed",{message:String(i)})}}async function Jn(n,e,t,r,i={}){const o=await Ne(n,e,t,r,i);return"mfaPendingCredential"in o&&Ce(n,"multi-factor-auth-required",{_serverResponse:o}),o}function zc(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?Vs(n.config,i):`${n.config.apiScheme}://${i}`}function yf(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class vf{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(De(this.auth,"network-request-failed")),_f.get())})}}function wr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=De(n,e,r);return i.customData._tokenResponse=t,i}function Sa(n){return n!==void 0&&n.enterprise!==void 0}class Ef{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return yf(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Tf(n,e){return Ne(n,"GET","/v2/recaptchaConfig",et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function If(n,e){return Ne(n,"POST","/v1/accounts:delete",e)}async function Wc(n,e){return Ne(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function wf(n,e=!1){const t=ie(n),r=await t.getIdToken(e),i=Ds(r);M(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:Ln(Yi(i.auth_time)),issuedAtTime:Ln(Yi(i.iat)),expirationTime:Ln(Yi(i.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Yi(n){return Number(n)*1e3}function Ds(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return br("JWT malformed, contained fewer than 3 sections"),null;try{const i=Vc(t);return i?JSON.parse(i):(br("Failed to decode base64 JWT payload"),null)}catch(i){return br("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Pa(n){const e=Ds(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vt(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ze&&Af(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Af({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ln(this.lastLoginAt),this.creationTime=Ln(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $r(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Vt(n,Wc(t,{idToken:r}));M(i==null?void 0:i.users.length,t,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Hc(o.providerUserInfo):[],u=Pf(n.providerData,a),h=n.isAnonymous,d=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),p=h?d:!1,T={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new us(o.createdAt,o.lastLoginAt),isAnonymous:p};Object.assign(n,T)}async function Sf(n){const e=ie(n);await $r(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Pf(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Hc(n){return n.map(e=>{var{providerId:t}=e,r=Cs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cf(n,e){const t=await $c(n,{},async()=>{const r=Kn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,a=zc(n,i,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",qc.fetch()(a,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function bf(n,e){return Ne(n,"POST","/v2/accounts:revokeToken",et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Pa(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=Pa(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:o}=await Cf(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:o}=t,a=new Gt;return r&&(M(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),o&&(M(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gt,this.toJSON())}_performRefresh(){return ze("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class We{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,o=Cs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Rf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new us(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Vt(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return wf(this,e)}reload(){return Sf(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new We(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await $r(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ke(this.auth.app))return Promise.reject(Ge(this.auth));const e=await this.getIdToken();return await Vt(this,If(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,o,a,u,h,d,p;const T=(r=t.displayName)!==null&&r!==void 0?r:void 0,R=(i=t.email)!==null&&i!==void 0?i:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,D=(a=t.photoURL)!==null&&a!==void 0?a:void 0,O=(u=t.tenantId)!==null&&u!==void 0?u:void 0,k=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,W=(d=t.createdAt)!==null&&d!==void 0?d:void 0,H=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:G,emailVerified:ee,isAnonymous:Se,providerData:te,stsTokenManager:v}=t;M(G&&v,e,"internal-error");const m=Gt.fromJSON(this.name,v);M(typeof G=="string",e,"internal-error"),ot(T,e.name),ot(R,e.name),M(typeof ee=="boolean",e,"internal-error"),M(typeof Se=="boolean",e,"internal-error"),ot(C,e.name),ot(D,e.name),ot(O,e.name),ot(k,e.name),ot(W,e.name),ot(H,e.name);const _=new We({uid:G,auth:e,email:R,emailVerified:ee,displayName:T,isAnonymous:Se,photoURL:D,phoneNumber:C,tenantId:O,stsTokenManager:m,createdAt:W,lastLoginAt:H});return te&&Array.isArray(te)&&(_.providerData=te.map(y=>Object.assign({},y))),k&&(_._redirectEventId=k),_}static async _fromIdTokenResponse(e,t,r=!1){const i=new Gt;i.updateFromServerResponse(t);const o=new We({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await $r(o),o}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];M(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?Hc(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),u=new Gt;u.updateFromIdToken(r);const h=new We({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new us(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,d),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca=new Map;function He(n){Je(n instanceof Function,"Expected a class definition");let e=Ca.get(n);return e?(Je(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ca.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Gc.type="NONE";const ba=Gc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(n,e,t){return`firebase:${n}:${e}:${t}`}class Kt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=kr(this.userKey,i.apiKey,o),this.fullPersistenceKey=kr("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?We._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Kt(He(ba),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=i[0]||He(ba);const a=kr(r,e.config.apiKey,e.name);let u=null;for(const d of t)try{const p=await d._get(a);if(p){const T=We._fromJSON(e,p);d!==o&&(u=T),o=d;break}}catch{}const h=i.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Kt(o,e,r):(o=h[0],u&&await o._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new Kt(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Yc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Kc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zc(e))return"Blackberry";if(eu(e))return"Webos";if(Qc(e))return"Safari";if((e.includes("chrome/")||Jc(e))&&!e.includes("edge/"))return"Chrome";if(Xc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Kc(n=Ee()){return/firefox\//i.test(n)}function Qc(n=Ee()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jc(n=Ee()){return/crios\//i.test(n)}function Yc(n=Ee()){return/iemobile/i.test(n)}function Xc(n=Ee()){return/android/i.test(n)}function Zc(n=Ee()){return/blackberry/i.test(n)}function eu(n=Ee()){return/webos/i.test(n)}function Ns(n=Ee()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function kf(n=Ee()){var e;return Ns(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Vf(){return qh()&&document.documentMode===10}function tu(n=Ee()){return Ns(n)||Xc(n)||eu(n)||Zc(n)||/windows phone/i.test(n)||Yc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nu(n,e=[]){let t;switch(n){case"Browser":t=ka(Ee());break;case"Worker":t=`${ka(Ee())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${on}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,u)=>{try{const h=e(o);a(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nf(n,e={}){return Ne(n,"GET","/v2/passwordPolicy",et(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of=6;class Lf{constructor(e){var t,r,i,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Of,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,o,a,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(i=h.containsLowercaseLetter)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(a=h.containsNumericCharacter)!==null&&a!==void 0?a:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Va(this),this.idTokenSubscription=new Va(this),this.beforeStateQueue=new Df(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=jc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=He(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Kt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Wc(this,{idToken:e}),r=await We._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ke(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===u)&&(h!=null&&h.user)&&(i=h.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await $r(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mf()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ke(this.app))return Promise.reject(Ge(this));const t=e?ie(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ke(this.app)?Promise.reject(Ge(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ke(this.app)?Promise.reject(Ge(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(He(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Nf(this),t=new Lf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Gn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await bf(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&He(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await Kt.create(this,[He(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(u,this,"internal-error"),u.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,i);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=nu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&hf(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function tt(n){return ie(n)}class Va{constructor(e){this.auth=e,this.observer=null,this.addObserver=Jh(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let si={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function xf(n){si=n}function ru(n){return si.loadJS(n)}function Uf(){return si.recaptchaEnterpriseScript}function Ff(){return si.gapiScript}function Bf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class jf{constructor(){this.enterprise=new qf}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class qf{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const $f="recaptcha-enterprise",iu="NO_RECAPTCHA";class zf{constructor(e){this.type=$f,this.auth=tt(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,u)=>{Tf(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const d=new Ef(h);return o.tenantId==null?o._agentRecaptchaConfig=d:o._tenantRecaptchaConfigs[o.tenantId]=d,a(d.siteKey)}}).catch(h=>{u(h)})})}function i(o,a,u){const h=window.grecaptcha;Sa(h)?h.enterprise.ready(()=>{h.enterprise.execute(o,{action:e}).then(d=>{a(d)}).catch(()=>{a(iu)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new jf().execute("siteKey",{action:"verify"}):new Promise((o,a)=>{r(this.auth).then(u=>{if(!t&&Sa(window.grecaptcha))i(u,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=Uf();h.length!==0&&(h+=u),ru(h).then(()=>{i(u,o,a)}).catch(d=>{a(d)})}}).catch(u=>{a(u)})})}}async function Da(n,e,t,r=!1,i=!1){const o=new zf(n);let a;if(i)a=iu;else try{a=await o.verify(t)}catch{a=await o.verify(t,!0)}const u=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const h=u.phoneEnrollmentInfo.phoneNumber,d=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:h,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const h=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function zr(n,e,t,r,i){var o;if(!((o=n._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Da(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Da(n,e,t,t==="getOobCode");return r(n,u)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(n,e){const t=Ps(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),o=t.getOptions();if(Br(o,e??{}))return i;Ce(i,"already-initialized")}return t.initialize({options:e})}function Hf(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(He);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Gf(n,e,t){const r=tt(n);M(r._canInitEmulator,r,"emulator-config-failed"),M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=su(e),{host:a,port:u}=Kf(e),h=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${a}${h}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),Qf()}function su(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Kf(n){const e=su(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Na(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Na(a)}}}function Na(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Qf(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ze("not implemented")}_getIdTokenResponse(e){return ze("not implemented")}_linkToIdToken(e,t){return ze("not implemented")}_getReauthenticationResolver(e){return ze("not implemented")}}async function Jf(n,e){return Ne(n,"POST","/v1/accounts:update",e)}async function Yf(n,e){return Ne(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xf(n,e){return Jn(n,"POST","/v1/accounts:signInWithPassword",et(n,e))}async function ou(n,e){return Ne(n,"POST","/v1/accounts:sendOobCode",et(n,e))}async function Zf(n,e){return ou(n,e)}async function ep(n,e){return ou(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tp(n,e){return Jn(n,"POST","/v1/accounts:signInWithEmailLink",et(n,e))}async function np(n,e){return Jn(n,"POST","/v1/accounts:signInWithEmailLink",et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends Os{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new jn(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new jn(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return zr(e,t,"signInWithPassword",Xf);case"emailLink":return tp(e,{email:this._email,oobCode:this._password});default:Ce(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return zr(e,r,"signUpPassword",Yf);case"emailLink":return np(e,{idToken:t,email:this._email,oobCode:this._password});default:Ce(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qt(n,e){return Jn(n,"POST","/v1/accounts:signInWithIdp",et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rp="http://localhost";class Dt extends Os{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Dt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ce("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,o=Cs(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new Dt(r,i);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Qt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Qt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Qt(e,t)}buildRequest(){const e={requestUri:rp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Kn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function sp(n){const e=bn(kn(n)).link,t=e?bn(kn(e)).deep_link_id:null,r=bn(kn(n)).deep_link_id;return(r?bn(kn(r)).link:null)||r||t||e||n}class Ls{constructor(e){var t,r,i,o,a,u;const h=bn(kn(e)),d=(t=h.apiKey)!==null&&t!==void 0?t:null,p=(r=h.oobCode)!==null&&r!==void 0?r:null,T=ip((i=h.mode)!==null&&i!==void 0?i:null);M(d&&p&&T,"argument-error"),this.apiKey=d,this.operation=T,this.code=p,this.continueUrl=(o=h.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(a=h.languageCode)!==null&&a!==void 0?a:null,this.tenantId=(u=h.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const t=sp(e);try{return new Ls(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(){this.providerId=an.PROVIDER_ID}static credential(e,t){return jn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Ls.parseLink(t);return M(r,"argument-error"),jn._fromEmailAndCode(e,r.code,r.tenantId)}}an.PROVIDER_ID="password";an.EMAIL_PASSWORD_SIGN_IN_METHOD="password";an.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends Ms{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at extends Yn{constructor(){super("facebook.com")}static credential(e){return Dt._fromParams({providerId:at.PROVIDER_ID,signInMethod:at.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return at.credentialFromTaggedObject(e)}static credentialFromError(e){return at.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return at.credential(e.oauthAccessToken)}catch{return null}}}at.FACEBOOK_SIGN_IN_METHOD="facebook.com";at.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends Yn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Dt._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ct.credential(t,r)}catch{return null}}}ct.GOOGLE_SIGN_IN_METHOD="google.com";ct.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends Yn{constructor(){super("github.com")}static credential(e){return Dt._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ut.credential(e.oauthAccessToken)}catch{return null}}}ut.GITHUB_SIGN_IN_METHOD="github.com";ut.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends Yn{constructor(){super("twitter.com")}static credential(e,t){return Dt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return lt.credential(t,r)}catch{return null}}}lt.TWITTER_SIGN_IN_METHOD="twitter.com";lt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function op(n,e){return Jn(n,"POST","/v1/accounts:signUp",et(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const o=await We._fromIdTokenResponse(e,r,i),a=Oa(r);return new Nt({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Oa(r);return new Nt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Oa(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr extends Ze{constructor(e,t,r,i){var o;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Wr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Wr(e,t,r,i)}}function au(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Wr._fromErrorAndOperation(n,o,e,r):o})}async function ap(n,e,t=!1){const r=await Vt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Nt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cu(n,e,t=!1){const{auth:r}=n;if(ke(r.app))return Promise.reject(Ge(r));const i="reauthenticate";try{const o=await Vt(n,au(r,i,e,n),t);M(o.idToken,r,"internal-error");const a=Ds(o.idToken);M(a,r,"internal-error");const{sub:u}=a;return M(n.uid===u,r,"user-mismatch"),Nt._forOperation(n,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Ce(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uu(n,e,t=!1){if(ke(n.app))return Promise.reject(Ge(n));const r="signIn",i=await au(n,r,e),o=await Nt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}async function cp(n,e){return uu(tt(n),e)}async function Vy(n,e){return cu(ie(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lu(n){const e=tt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Dy(n,e,t){const r=tt(n);await zr(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",ep)}async function Ny(n,e,t){if(ke(n.app))return Promise.reject(Ge(n));const r=tt(n),a=await zr(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",op).catch(h=>{throw h.code==="auth/password-does-not-meet-requirements"&&lu(n),h}),u=await Nt._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(u.user),u}function Oy(n,e,t){return ke(n.app)?Promise.reject(Ge(n)):cp(ie(n),an.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&lu(n),r})}async function Ly(n,e){const t=ie(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()},{email:o}=await Zf(t.auth,i);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function up(n,e){return Ne(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function My(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=ie(n),o={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Vt(r,up(r.auth,o));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const u=r.providerData.find(({providerId:h})=>h==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function xy(n,e){return lp(ie(n),null,e)}async function lp(n,e,t){const{auth:r}=n,o={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(o.password=t);const a=await Vt(n,Jf(r,o));await n._updateTokensIfNecessary(a,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(n,e){return ie(n).setPersistence(e)}function hp(n,e,t,r){return ie(n).onIdTokenChanged(e,t,r)}function dp(n,e,t){return ie(n).beforeAuthStateChanged(e,t)}function Fy(n,e,t,r){return ie(n).onAuthStateChanged(e,t,r)}function By(n){return ie(n).signOut()}async function jy(n){return ie(n).delete()}const Hr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Hr,"1"),this.storage.removeItem(Hr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp=1e3,pp=10;class du extends hu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=tu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);Vf()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,pp):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},fp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}du.type="LOCAL";const mp=du;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu extends hu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}fu.type="SESSION";const pu=fu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new oi(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:o}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(a).map(async d=>d(t.origin,o)),h=await gp(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}oi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,a;return new Promise((u,h)=>{const d=xs("",20);i.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(T){const R=T;if(R.data.eventId===d)switch(R.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(R.data.response);break;default:clearTimeout(p),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(){return window}function yp(n){Le().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(){return typeof Le().WorkerGlobalScope<"u"&&typeof Le().importScripts=="function"}async function vp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ep(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Tp(){return mu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="firebaseLocalStorageDb",Ip=1,Gr="firebaseLocalStorage",_u="fbase_key";class Xn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ai(n,e){return n.transaction([Gr],e?"readwrite":"readonly").objectStore(Gr)}function wp(){const n=indexedDB.deleteDatabase(gu);return new Xn(n).toPromise()}function ls(){const n=indexedDB.open(gu,Ip);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Gr,{keyPath:_u})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Gr)?e(r):(r.close(),await wp(),e(await ls()))})})}async function La(n,e,t){const r=ai(n,!0).put({[_u]:e,value:t});return new Xn(r).toPromise()}async function Ap(n,e){const t=ai(n,!1).get(e),r=await new Xn(t).toPromise();return r===void 0?null:r.value}function Ma(n,e){const t=ai(n,!0).delete(e);return new Xn(t).toPromise()}const Rp=800,Sp=3;class yu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ls(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Sp)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return mu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=oi._getInstance(Tp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await vp(),!this.activeServiceWorker)return;this.sender=new _p(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ep()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ls();return await La(e,Hr,"1"),await Ma(e,Hr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>La(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ap(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ma(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=ai(i,!1).getAll();return new Xn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Rp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}yu.type="LOCAL";const Pp=yu;new Qn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vu(n,e){return e?He(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us extends Os{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Qt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Qt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Qt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Cp(n){return uu(n.auth,new Us(n),n.bypassAuthState)}function bp(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),cu(t,new Us(n),n.bypassAuthState)}async function kp(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),ap(t,new Us(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:a,type:u}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Cp;case"linkViaPopup":case"linkViaRedirect":return kp;case"reauthViaPopup":case"reauthViaRedirect":return bp;default:Ce(this.auth,"internal-error")}}resolve(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Je(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp=new Qn(2e3,1e4);async function qy(n,e,t){if(ke(n.app))return Promise.reject(De(n,"operation-not-supported-in-this-environment"));const r=tt(n);df(n,e,Ms);const i=vu(r,t);return new Ct(r,"signInViaPopup",e,i).executeNotNull()}class Ct extends Eu{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Ct.currentPopupAction&&Ct.currentPopupAction.cancel(),Ct.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){Je(this.filter.length===1,"Popup operations only handle one event");const e=xs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(De(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(De(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ct.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(De(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Vp.get())};e()}}Ct.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp="pendingRedirect",Vr=new Map;class Np extends Eu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Vr.get(this.auth._key());if(!e){try{const r=await Op(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Vr.set(this.auth._key(),e)}return this.bypassAuthState||Vr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Op(n,e){const t=xp(e),r=Mp(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Lp(n,e){Vr.set(n._key(),e)}function Mp(n){return He(n._redirectPersistence)}function xp(n){return kr(Dp,n.config.apiKey,n.name)}async function Up(n,e,t=!1){if(ke(n.app))return Promise.reject(Ge(n));const r=tt(n),i=vu(r,e),a=await new Np(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp=10*60*1e3;class Bp{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!jp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Tu(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(De(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Fp&&this.cachedEventUids.clear(),this.cachedEventUids.has(xa(e))}saveEventToCache(e){this.cachedEventUids.add(xa(e)),this.lastProcessedEventTime=Date.now()}}function xa(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Tu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function jp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Tu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qp(n,e={}){return Ne(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $p=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,zp=/^https?/;async function Wp(n){if(n.config.emulator)return;const{authorizedDomains:e}=await qp(n);for(const t of e)try{if(Hp(t))return}catch{}Ce(n,"unauthorized-domain")}function Hp(n){const e=cs(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!zp.test(t))return!1;if($p.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp=new Qn(3e4,6e4);function Ua(){const n=Le().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Kp(n){return new Promise((e,t)=>{var r,i,o;function a(){Ua(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ua(),t(De(n,"network-request-failed"))},timeout:Gp.get()})}if(!((i=(r=Le().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=Le().gapi)===null||o===void 0)&&o.load)a();else{const u=Bf("iframefcb");return Le()[u]=()=>{gapi.load?a():t(De(n,"network-request-failed"))},ru(`${Ff()}?onload=${u}`).catch(h=>t(h))}}).catch(e=>{throw Dr=null,e})}let Dr=null;function Qp(n){return Dr=Dr||Kp(n),Dr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp=new Qn(5e3,15e3),Yp="__/auth/iframe",Xp="emulator/auth/iframe",Zp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},em=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function tm(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Vs(e,Xp):`https://${n.config.authDomain}/${Yp}`,r={apiKey:e.apiKey,appName:n.name,v:on},i=em.get(n.config.apiHost);i&&(r.eid=i);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Kn(r).slice(1)}`}async function nm(n){const e=await Qp(n),t=Le().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:tm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Zp,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const a=De(n,"network-request-failed"),u=Le().setTimeout(()=>{o(a)},Jp.get());function h(){Le().clearTimeout(u),i(r)}r.ping(h).then(h,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},im=500,sm=600,om="_blank",am="http://localhost";class Fa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function cm(n,e,t,r=im,i=sm){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h=Object.assign(Object.assign({},rm),{width:r.toString(),height:i.toString(),top:o,left:a}),d=Ee().toLowerCase();t&&(u=Jc(d)?om:t),Kc(d)&&(e=e||am,h.scrollbars="yes");const p=Object.entries(h).reduce((R,[C,D])=>`${R}${C}=${D},`,"");if(kf(d)&&u!=="_self")return um(e||"",u),new Fa(null);const T=window.open(e||"",u,p);M(T,n,"popup-blocked");try{T.focus()}catch{}return new Fa(T)}function um(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm="__/auth/handler",hm="emulator/auth/handler",dm=encodeURIComponent("fac");async function Ba(n,e,t,r,i,o){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:on,eventId:i};if(e instanceof Ms){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Qh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,T]of Object.entries({}))a[p]=T}if(e instanceof Yn){const p=e.getScopes().filter(T=>T!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const h=await n._getAppCheckToken(),d=h?`#${dm}=${encodeURIComponent(h)}`:"";return`${fm(n)}?${Kn(u).slice(1)}${d}`}function fm({config:n}){return n.emulator?Vs(n,hm):`https://${n.authDomain}/${lm}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi="webStorageSupport";class pm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=pu,this._completeRedirectFn=Up,this._overrideRedirectResult=Lp}async _openPopup(e,t,r,i){var o;Je((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Ba(e,t,r,cs(),i);return cm(e,a,xs())}async _openRedirect(e,t,r,i){await this._originValidation(e);const o=await Ba(e,t,r,cs(),i);return yp(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):(Je(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await nm(e),r=new Bp(e);return t.register("authEvent",i=>(M(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Xi,{type:Xi},i=>{var o;const a=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[Xi];a!==void 0&&t(!!a),Ce(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Wp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return tu()||Qc()||Ns()}}const mm=pm;var ja="@firebase/auth",qa="1.8.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ym(n){Yt(new kt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:nu(n)},d=new Mf(r,i,o,h);return Hf(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Yt(new kt("auth-internal",e=>{const t=tt(e.getProvider("auth").getImmediate());return(r=>new gm(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(ja,qa,_m(n)),pt(ja,qa,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vm=5*60,Em=Oc("authIdTokenMaxAge")||vm;let $a=null;const Tm=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Em)return;const i=t==null?void 0:t.token;$a!==i&&($a=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function $y(n=xc()){const e=Ps(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Wf(n,{popupRedirectResolver:mm,persistence:[Pp,mp,pu]}),r=Oc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=Tm(o.toString());dp(t,a,()=>a(t.currentUser)),hp(t,u=>a(u))}}const i=Dc("auth");return i&&Gf(t,`http://${i}`),t}function Im(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}xf({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const o=De("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",Im().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ym("Browser");var za=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var mt,Iu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,m){function _(){}_.prototype=m.prototype,v.D=m.prototype,v.prototype=new _,v.prototype.constructor=v,v.C=function(y,E,w){for(var g=Array(arguments.length-2),je=2;je<arguments.length;je++)g[je-2]=arguments[je];return m.prototype[E].apply(y,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,m,_){_||(_=0);var y=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)y[E]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=v.g[0],_=v.g[1],E=v.g[2];var w=v.g[3],g=m+(w^_&(E^w))+y[0]+3614090360&4294967295;m=_+(g<<7&4294967295|g>>>25),g=w+(E^m&(_^E))+y[1]+3905402710&4294967295,w=m+(g<<12&4294967295|g>>>20),g=E+(_^w&(m^_))+y[2]+606105819&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(m^E&(w^m))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(w^_&(E^w))+y[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(E^m&(_^E))+y[5]+1200080426&4294967295,w=m+(g<<12&4294967295|g>>>20),g=E+(_^w&(m^_))+y[6]+2821735955&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(m^E&(w^m))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(w^_&(E^w))+y[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(E^m&(_^E))+y[9]+2336552879&4294967295,w=m+(g<<12&4294967295|g>>>20),g=E+(_^w&(m^_))+y[10]+4294925233&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(m^E&(w^m))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(w^_&(E^w))+y[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=w+(E^m&(_^E))+y[13]+4254626195&4294967295,w=m+(g<<12&4294967295|g>>>20),g=E+(_^w&(m^_))+y[14]+2792965006&4294967295,E=w+(g<<17&4294967295|g>>>15),g=_+(m^E&(w^m))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(E^w&(_^E))+y[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(m^_))+y[6]+3225465664&4294967295,w=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(w^m))+y[11]+643717713&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(E^w))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^w&(_^E))+y[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(m^_))+y[10]+38016083&4294967295,w=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(w^m))+y[15]+3634488961&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(E^w))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^w&(_^E))+y[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(m^_))+y[14]+3275163606&4294967295,w=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(w^m))+y[3]+4107603335&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(E^w))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^w&(_^E))+y[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=w+(_^E&(m^_))+y[2]+4243563512&4294967295,w=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(w^m))+y[7]+1735328473&4294967295,E=w+(g<<14&4294967295|g>>>18),g=_+(w^m&(E^w))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(_^E^w)+y[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^E)+y[8]+2272392833&4294967295,w=m+(g<<11&4294967295|g>>>21),g=E+(w^m^_)+y[11]+1839030562&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^m)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^w)+y[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^E)+y[4]+1272893353&4294967295,w=m+(g<<11&4294967295|g>>>21),g=E+(w^m^_)+y[7]+4139469664&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^m)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^w)+y[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^E)+y[0]+3936430074&4294967295,w=m+(g<<11&4294967295|g>>>21),g=E+(w^m^_)+y[3]+3572445317&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^m)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^w)+y[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=w+(m^_^E)+y[12]+3873151461&4294967295,w=m+(g<<11&4294967295|g>>>21),g=E+(w^m^_)+y[15]+530742520&4294967295,E=w+(g<<16&4294967295|g>>>16),g=_+(E^w^m)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(E^(_|~w))+y[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~E))+y[7]+1126891415&4294967295,w=m+(g<<10&4294967295|g>>>22),g=E+(m^(w|~_))+y[14]+2878612391&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~m))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~w))+y[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~E))+y[3]+2399980690&4294967295,w=m+(g<<10&4294967295|g>>>22),g=E+(m^(w|~_))+y[10]+4293915773&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~m))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~w))+y[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~E))+y[15]+4264355552&4294967295,w=m+(g<<10&4294967295|g>>>22),g=E+(m^(w|~_))+y[6]+2734768916&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~m))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~w))+y[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=w+(_^(m|~E))+y[11]+3174756917&4294967295,w=m+(g<<10&4294967295|g>>>22),g=E+(m^(w|~_))+y[2]+718787259&4294967295,E=w+(g<<15&4294967295|g>>>17),g=_+(w^(E|~m))+y[9]+3951481745&4294967295,v.g[0]=v.g[0]+m&4294967295,v.g[1]=v.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+w&4294967295}r.prototype.u=function(v,m){m===void 0&&(m=v.length);for(var _=m-this.blockSize,y=this.B,E=this.h,w=0;w<m;){if(E==0)for(;w<=_;)i(this,v,w),w+=this.blockSize;if(typeof v=="string"){for(;w<m;)if(y[E++]=v.charCodeAt(w++),E==this.blockSize){i(this,y),E=0;break}}else for(;w<m;)if(y[E++]=v[w++],E==this.blockSize){i(this,y),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var m=1;m<v.length-8;++m)v[m]=0;var _=8*this.o;for(m=v.length-8;m<v.length;++m)v[m]=_&255,_/=256;for(this.u(v),v=Array(16),m=_=0;4>m;++m)for(var y=0;32>y;y+=8)v[_++]=this.g[m]>>>y&255;return v};function o(v,m){var _=u;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=m(v)}function a(v,m){this.h=m;for(var _=[],y=!0,E=v.length-1;0<=E;E--){var w=v[E]|0;y&&w==m||(_[E]=w,y=!1)}this.g=_}var u={};function h(v){return-128<=v&&128>v?o(v,function(m){return new a([m|0],0>m?-1:0)}):new a([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return T;if(0>v)return k(d(-v));for(var m=[],_=1,y=0;v>=_;y++)m[y]=v/_|0,_*=4294967296;return new a(m,0)}function p(v,m){if(v.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(v.charAt(0)=="-")return k(p(v.substring(1),m));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(m,8)),y=T,E=0;E<v.length;E+=8){var w=Math.min(8,v.length-E),g=parseInt(v.substring(E,E+w),m);8>w?(w=d(Math.pow(m,w)),y=y.j(w).add(d(g))):(y=y.j(_),y=y.add(d(g)))}return y}var T=h(0),R=h(1),C=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-k(this).m();for(var v=0,m=1,_=0;_<this.g.length;_++){var y=this.i(_);v+=(0<=y?y:4294967296+y)*m,m*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(D(this))return"0";if(O(this))return"-"+k(this).toString(v);for(var m=d(Math.pow(v,6)),_=this,y="";;){var E=ee(_,m).g;_=W(_,E.j(m));var w=((0<_.g.length?_.g[0]:_.h)>>>0).toString(v);if(_=E,D(_))return w+y;for(;6>w.length;)w="0"+w;y=w+y}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function D(v){if(v.h!=0)return!1;for(var m=0;m<v.g.length;m++)if(v.g[m]!=0)return!1;return!0}function O(v){return v.h==-1}n.l=function(v){return v=W(this,v),O(v)?-1:D(v)?0:1};function k(v){for(var m=v.g.length,_=[],y=0;y<m;y++)_[y]=~v.g[y];return new a(_,~v.h).add(R)}n.abs=function(){return O(this)?k(this):this},n.add=function(v){for(var m=Math.max(this.g.length,v.g.length),_=[],y=0,E=0;E<=m;E++){var w=y+(this.i(E)&65535)+(v.i(E)&65535),g=(w>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);y=g>>>16,w&=65535,g&=65535,_[E]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function W(v,m){return v.add(k(m))}n.j=function(v){if(D(this)||D(v))return T;if(O(this))return O(v)?k(this).j(k(v)):k(k(this).j(v));if(O(v))return k(this.j(k(v)));if(0>this.l(C)&&0>v.l(C))return d(this.m()*v.m());for(var m=this.g.length+v.g.length,_=[],y=0;y<2*m;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<v.g.length;E++){var w=this.i(y)>>>16,g=this.i(y)&65535,je=v.i(E)>>>16,dn=v.i(E)&65535;_[2*y+2*E]+=g*dn,H(_,2*y+2*E),_[2*y+2*E+1]+=w*dn,H(_,2*y+2*E+1),_[2*y+2*E+1]+=g*je,H(_,2*y+2*E+1),_[2*y+2*E+2]+=w*je,H(_,2*y+2*E+2)}for(y=0;y<m;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=m;y<2*m;y++)_[y]=0;return new a(_,0)};function H(v,m){for(;(v[m]&65535)!=v[m];)v[m+1]+=v[m]>>>16,v[m]&=65535,m++}function G(v,m){this.g=v,this.h=m}function ee(v,m){if(D(m))throw Error("division by zero");if(D(v))return new G(T,T);if(O(v))return m=ee(k(v),m),new G(k(m.g),k(m.h));if(O(m))return m=ee(v,k(m)),new G(k(m.g),m.h);if(30<v.g.length){if(O(v)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=m;0>=y.l(v);)_=Se(_),y=Se(y);var E=te(_,1),w=te(y,1);for(y=te(y,2),_=te(_,2);!D(y);){var g=w.add(y);0>=g.l(v)&&(E=E.add(_),w=g),y=te(y,1),_=te(_,1)}return m=W(v,E.j(m)),new G(E,m)}for(E=T;0<=v.l(m);){for(_=Math.max(1,Math.floor(v.m()/m.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),w=d(_),g=w.j(m);O(g)||0<g.l(v);)_-=y,w=d(_),g=w.j(m);D(w)&&(w=R),E=E.add(w),v=W(v,g)}return new G(E,v)}n.A=function(v){return ee(this,v).h},n.and=function(v){for(var m=Math.max(this.g.length,v.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)&v.i(y);return new a(_,this.h&v.h)},n.or=function(v){for(var m=Math.max(this.g.length,v.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)|v.i(y);return new a(_,this.h|v.h)},n.xor=function(v){for(var m=Math.max(this.g.length,v.g.length),_=[],y=0;y<m;y++)_[y]=this.i(y)^v.i(y);return new a(_,this.h^v.h)};function Se(v){for(var m=v.g.length+1,_=[],y=0;y<m;y++)_[y]=v.i(y)<<1|v.i(y-1)>>>31;return new a(_,v.h)}function te(v,m){var _=m>>5;m%=32;for(var y=v.g.length-_,E=[],w=0;w<y;w++)E[w]=0<m?v.i(w+_)>>>m|v.i(w+_+1)<<32-m:v.i(w+_);return new a(E,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Iu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,mt=a}).apply(typeof za<"u"?za:typeof self<"u"?self:typeof window<"u"?window:{});var Ar=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wu,Vn,Au,Nr,hs,Ru,Su,Pu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,c,l){return s==Array.prototype||s==Object.prototype||(s[c]=l.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ar=="object"&&Ar];for(var c=0;c<s.length;++c){var l=s[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function i(s,c){if(c)e:{var l=r;s=s.split(".");for(var f=0;f<s.length-1;f++){var I=s[f];if(!(I in l))break e;l=l[I]}s=s[s.length-1],f=l[s],c=c(f),c!=f&&c!=null&&e(l,s,{configurable:!0,writable:!0,value:c})}}function o(s,c){s instanceof String&&(s+="");var l=0,f=!1,I={next:function(){if(!f&&l<s.length){var A=l++;return{value:c(A,s[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return I[Symbol.iterator]=function(){return I},I}i("Array.prototype.values",function(s){return s||function(){return o(this,function(c,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function h(s){var c=typeof s;return c=c!="object"?c:s?Array.isArray(s)?"array":c:"null",c=="array"||c=="object"&&typeof s.length=="number"}function d(s){var c=typeof s;return c=="object"&&s!=null||c=="function"}function p(s,c,l){return s.call.apply(s.bind,arguments)}function T(s,c,l){if(!s)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var I=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(I,f),s.apply(c,I)}}return function(){return s.apply(c,arguments)}}function R(s,c,l){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:T,R.apply(null,arguments)}function C(s,c){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),s.apply(this,f)}}function D(s,c){function l(){}l.prototype=c.prototype,s.aa=c.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(f,I,A){for(var b=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)b[Q-2]=arguments[Q];return c.prototype[I].apply(f,b)}}function O(s){const c=s.length;if(0<c){const l=Array(c);for(let f=0;f<c;f++)l[f]=s[f];return l}return[]}function k(s,c){for(let l=1;l<arguments.length;l++){const f=arguments[l];if(h(f)){const I=s.length||0,A=f.length||0;s.length=I+A;for(let b=0;b<A;b++)s[I+b]=f[b]}else s.push(f)}}class W{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function H(s){return/^[\s\xa0]*$/.test(s)}function G(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function ee(s){return ee[" "](s),s}ee[" "]=function(){};var Se=G().indexOf("Gecko")!=-1&&!(G().toLowerCase().indexOf("webkit")!=-1&&G().indexOf("Edge")==-1)&&!(G().indexOf("Trident")!=-1||G().indexOf("MSIE")!=-1)&&G().indexOf("Edge")==-1;function te(s,c,l){for(const f in s)c.call(l,s[f],f,s)}function v(s,c){for(const l in s)c.call(void 0,s[l],l,s)}function m(s){const c={};for(const l in s)c[l]=s[l];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,c){let l,f;for(let I=1;I<arguments.length;I++){f=arguments[I];for(l in f)s[l]=f[l];for(let A=0;A<_.length;A++)l=_[A],Object.prototype.hasOwnProperty.call(f,l)&&(s[l]=f[l])}}function E(s){var c=1;s=s.split(":");const l=[];for(;0<c&&s.length;)l.push(s.shift()),c--;return s.length&&l.push(s.join(":")),l}function w(s){u.setTimeout(()=>{throw s},0)}function g(){var s=Ii;let c=null;return s.g&&(c=s.g,s.g=s.g.next,s.g||(s.h=null),c.next=null),c}class je{constructor(){this.h=this.g=null}add(c,l){const f=dn.get();f.set(c,l),this.h?this.h.next=f:this.g=f,this.h=f}}var dn=new W(()=>new Hl,s=>s.reset());class Hl{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let fn,pn=!1,Ii=new je,po=()=>{const s=u.Promise.resolve(void 0);fn=()=>{s.then(Gl)}};var Gl=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){w(l)}var c=dn;c.j(s),100>c.h&&(c.h++,s.next=c.g,c.g=s)}pn=!1};function nt(){this.s=this.s,this.C=this.C}nt.prototype.s=!1,nt.prototype.ma=function(){this.s||(this.s=!0,this.N())},nt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function fe(s,c){this.type=s,this.g=this.target=c,this.defaultPrevented=!1}fe.prototype.h=function(){this.defaultPrevented=!0};var Kl=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,c=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};u.addEventListener("test",l,c),u.removeEventListener("test",l,c)}catch{}return s}();function mn(s,c){if(fe.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,f=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=c,c=s.relatedTarget){if(Se){e:{try{ee(c.nodeName);var I=!0;break e}catch{}I=!1}I||(c=null)}}else l=="mouseover"?c=s.fromElement:l=="mouseout"&&(c=s.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Ql[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&mn.aa.h.call(this)}}D(mn,fe);var Ql={2:"touch",3:"pen",4:"mouse"};mn.prototype.h=function(){mn.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var ir="closure_listenable_"+(1e6*Math.random()|0),Jl=0;function Yl(s,c,l,f,I){this.listener=s,this.proxy=null,this.src=c,this.type=l,this.capture=!!f,this.ha=I,this.key=++Jl,this.da=this.fa=!1}function sr(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function or(s){this.src=s,this.g={},this.h=0}or.prototype.add=function(s,c,l,f,I){var A=s.toString();s=this.g[A],s||(s=this.g[A]=[],this.h++);var b=Ai(s,c,f,I);return-1<b?(c=s[b],l||(c.fa=!1)):(c=new Yl(c,this.src,A,!!f,I),c.fa=l,s.push(c)),c};function wi(s,c){var l=c.type;if(l in s.g){var f=s.g[l],I=Array.prototype.indexOf.call(f,c,void 0),A;(A=0<=I)&&Array.prototype.splice.call(f,I,1),A&&(sr(c),s.g[l].length==0&&(delete s.g[l],s.h--))}}function Ai(s,c,l,f){for(var I=0;I<s.length;++I){var A=s[I];if(!A.da&&A.listener==c&&A.capture==!!l&&A.ha==f)return I}return-1}var Ri="closure_lm_"+(1e6*Math.random()|0),Si={};function mo(s,c,l,f,I){if(Array.isArray(c)){for(var A=0;A<c.length;A++)mo(s,c[A],l,f,I);return null}return l=yo(l),s&&s[ir]?s.K(c,l,d(f)?!!f.capture:!!f,I):Xl(s,c,l,!1,f,I)}function Xl(s,c,l,f,I,A){if(!c)throw Error("Invalid event type");var b=d(I)?!!I.capture:!!I,Q=Ci(s);if(Q||(s[Ri]=Q=new or(s)),l=Q.add(c,l,f,b,A),l.proxy)return l;if(f=Zl(),l.proxy=f,f.src=s,f.listener=l,s.addEventListener)Kl||(I=b),I===void 0&&(I=!1),s.addEventListener(c.toString(),f,I);else if(s.attachEvent)s.attachEvent(_o(c.toString()),f);else if(s.addListener&&s.removeListener)s.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function Zl(){function s(l){return c.call(s.src,s.listener,l)}const c=eh;return s}function go(s,c,l,f,I){if(Array.isArray(c))for(var A=0;A<c.length;A++)go(s,c[A],l,f,I);else f=d(f)?!!f.capture:!!f,l=yo(l),s&&s[ir]?(s=s.i,c=String(c).toString(),c in s.g&&(A=s.g[c],l=Ai(A,l,f,I),-1<l&&(sr(A[l]),Array.prototype.splice.call(A,l,1),A.length==0&&(delete s.g[c],s.h--)))):s&&(s=Ci(s))&&(c=s.g[c.toString()],s=-1,c&&(s=Ai(c,l,f,I)),(l=-1<s?c[s]:null)&&Pi(l))}function Pi(s){if(typeof s!="number"&&s&&!s.da){var c=s.src;if(c&&c[ir])wi(c.i,s);else{var l=s.type,f=s.proxy;c.removeEventListener?c.removeEventListener(l,f,s.capture):c.detachEvent?c.detachEvent(_o(l),f):c.addListener&&c.removeListener&&c.removeListener(f),(l=Ci(c))?(wi(l,s),l.h==0&&(l.src=null,c[Ri]=null)):sr(s)}}}function _o(s){return s in Si?Si[s]:Si[s]="on"+s}function eh(s,c){if(s.da)s=!0;else{c=new mn(c,this);var l=s.listener,f=s.ha||s.src;s.fa&&Pi(s),s=l.call(f,c)}return s}function Ci(s){return s=s[Ri],s instanceof or?s:null}var bi="__closure_events_fn_"+(1e9*Math.random()>>>0);function yo(s){return typeof s=="function"?s:(s[bi]||(s[bi]=function(c){return s.handleEvent(c)}),s[bi])}function pe(){nt.call(this),this.i=new or(this),this.M=this,this.F=null}D(pe,nt),pe.prototype[ir]=!0,pe.prototype.removeEventListener=function(s,c,l,f){go(this,s,c,l,f)};function Te(s,c){var l,f=s.F;if(f)for(l=[];f;f=f.F)l.push(f);if(s=s.M,f=c.type||c,typeof c=="string")c=new fe(c,s);else if(c instanceof fe)c.target=c.target||s;else{var I=c;c=new fe(f,s),y(c,I)}if(I=!0,l)for(var A=l.length-1;0<=A;A--){var b=c.g=l[A];I=ar(b,f,!0,c)&&I}if(b=c.g=s,I=ar(b,f,!0,c)&&I,I=ar(b,f,!1,c)&&I,l)for(A=0;A<l.length;A++)b=c.g=l[A],I=ar(b,f,!1,c)&&I}pe.prototype.N=function(){if(pe.aa.N.call(this),this.i){var s=this.i,c;for(c in s.g){for(var l=s.g[c],f=0;f<l.length;f++)sr(l[f]);delete s.g[c],s.h--}}this.F=null},pe.prototype.K=function(s,c,l,f){return this.i.add(String(s),c,!1,l,f)},pe.prototype.L=function(s,c,l,f){return this.i.add(String(s),c,!0,l,f)};function ar(s,c,l,f){if(c=s.i.g[String(c)],!c)return!0;c=c.concat();for(var I=!0,A=0;A<c.length;++A){var b=c[A];if(b&&!b.da&&b.capture==l){var Q=b.listener,ue=b.ha||b.src;b.fa&&wi(s.i,b),I=Q.call(ue,f)!==!1&&I}}return I&&!f.defaultPrevented}function vo(s,c,l){if(typeof s=="function")l&&(s=R(s,l));else if(s&&typeof s.handleEvent=="function")s=R(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(s,c||0)}function Eo(s){s.g=vo(()=>{s.g=null,s.i&&(s.i=!1,Eo(s))},s.l);const c=s.h;s.h=null,s.m.apply(null,c)}class th extends nt{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Eo(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gn(s){nt.call(this),this.h=s,this.g={}}D(gn,nt);var To=[];function Io(s){te(s.g,function(c,l){this.g.hasOwnProperty(l)&&Pi(c)},s),s.g={}}gn.prototype.N=function(){gn.aa.N.call(this),Io(this)},gn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ki=u.JSON.stringify,nh=u.JSON.parse,rh=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function Vi(){}Vi.prototype.h=null;function wo(s){return s.h||(s.h=s.i())}function Ao(){}var _n={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Di(){fe.call(this,"d")}D(Di,fe);function Ni(){fe.call(this,"c")}D(Ni,fe);var wt={},Ro=null;function cr(){return Ro=Ro||new pe}wt.La="serverreachability";function So(s){fe.call(this,wt.La,s)}D(So,fe);function yn(s){const c=cr();Te(c,new So(c))}wt.STAT_EVENT="statevent";function Po(s,c){fe.call(this,wt.STAT_EVENT,s),this.stat=c}D(Po,fe);function Ie(s){const c=cr();Te(c,new Po(c,s))}wt.Ma="timingevent";function Co(s,c){fe.call(this,wt.Ma,s),this.size=c}D(Co,fe);function vn(s,c){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},c)}function En(){this.g=!0}En.prototype.xa=function(){this.g=!1};function ih(s,c,l,f,I,A){s.info(function(){if(s.g)if(A)for(var b="",Q=A.split("&"),ue=0;ue<Q.length;ue++){var z=Q[ue].split("=");if(1<z.length){var me=z[0];z=z[1];var ge=me.split("_");b=2<=ge.length&&ge[1]=="type"?b+(me+"="+z+"&"):b+(me+"=redacted&")}}else b=null;else b=A;return"XMLHTTP REQ ("+f+") [attempt "+I+"]: "+c+`
`+l+`
`+b})}function sh(s,c,l,f,I,A,b){s.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+I+"]: "+c+`
`+l+`
`+A+" "+b})}function Ft(s,c,l,f){s.info(function(){return"XMLHTTP TEXT ("+c+"): "+ah(s,l)+(f?" "+f:"")})}function oh(s,c){s.info(function(){return"TIMEOUT: "+c})}En.prototype.info=function(){};function ah(s,c){if(!s.g)return c;if(!c)return null;try{var l=JSON.parse(c);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var f=l[s];if(!(2>f.length)){var I=f[1];if(Array.isArray(I)&&!(1>I.length)){var A=I[0];if(A!="noop"&&A!="stop"&&A!="close")for(var b=1;b<I.length;b++)I[b]=""}}}}return ki(l)}catch{return c}}var ur={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},bo={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Oi;function lr(){}D(lr,Vi),lr.prototype.g=function(){return new XMLHttpRequest},lr.prototype.i=function(){return{}},Oi=new lr;function rt(s,c,l,f){this.j=s,this.i=c,this.l=l,this.R=f||1,this.U=new gn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ko}function ko(){this.i=null,this.g="",this.h=!1}var Vo={},Li={};function Mi(s,c,l){s.L=1,s.v=pr(qe(c)),s.m=l,s.P=!0,Do(s,null)}function Do(s,c){s.F=Date.now(),hr(s),s.A=qe(s.v);var l=s.A,f=s.R;Array.isArray(f)||(f=[String(f)]),Ho(l.i,"t",f),s.C=0,l=s.j.J,s.h=new ko,s.g=la(s.j,l?c:null,!s.m),0<s.O&&(s.M=new th(R(s.Y,s,s.g),s.O)),c=s.U,l=s.g,f=s.ca;var I="readystatechange";Array.isArray(I)||(I&&(To[0]=I.toString()),I=To);for(var A=0;A<I.length;A++){var b=mo(l,I[A],f||c.handleEvent,!1,c.h||c);if(!b)break;c.g[b.key]=b}c=s.H?m(s.H):{},s.m?(s.u||(s.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,c)):(s.u="GET",s.g.ea(s.A,s.u,null,c)),yn(),ih(s.i,s.u,s.A,s.l,s.R,s.m)}rt.prototype.ca=function(s){s=s.target;const c=this.M;c&&$e(s)==3?c.j():this.Y(s)},rt.prototype.Y=function(s){try{if(s==this.g)e:{const ge=$e(this.g);var c=this.g.Ba();const qt=this.g.Z();if(!(3>ge)&&(ge!=3||this.g&&(this.h.h||this.g.oa()||Zo(this.g)))){this.J||ge!=4||c==7||(c==8||0>=qt?yn(3):yn(2)),xi(this);var l=this.g.Z();this.X=l;t:if(No(this)){var f=Zo(this.g);s="";var I=f.length,A=$e(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){At(this),Tn(this);var b="";break t}this.h.i=new u.TextDecoder}for(c=0;c<I;c++)this.h.h=!0,s+=this.h.i.decode(f[c],{stream:!(A&&c==I-1)});f.length=0,this.h.g+=s,this.C=0,b=this.h.g}else b=this.g.oa();if(this.o=l==200,sh(this.i,this.u,this.A,this.l,this.R,ge,l),this.o){if(this.T&&!this.K){t:{if(this.g){var Q,ue=this.g;if((Q=ue.g?ue.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!H(Q)){var z=Q;break t}}z=null}if(l=z)Ft(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ui(this,l);else{this.o=!1,this.s=3,Ie(12),At(this),Tn(this);break e}}if(this.P){l=!0;let be;for(;!this.J&&this.C<b.length;)if(be=ch(this,b),be==Li){ge==4&&(this.s=4,Ie(14),l=!1),Ft(this.i,this.l,null,"[Incomplete Response]");break}else if(be==Vo){this.s=4,Ie(15),Ft(this.i,this.l,b,"[Invalid Chunk]"),l=!1;break}else Ft(this.i,this.l,be,null),Ui(this,be);if(No(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ge!=4||b.length!=0||this.h.h||(this.s=1,Ie(16),l=!1),this.o=this.o&&l,!l)Ft(this.i,this.l,b,"[Invalid Chunked Response]"),At(this),Tn(this);else if(0<b.length&&!this.W){this.W=!0;var me=this.j;me.g==this&&me.ba&&!me.M&&(me.j.info("Great, no buffering proxy detected. Bytes received: "+b.length),zi(me),me.M=!0,Ie(11))}}else Ft(this.i,this.l,b,null),Ui(this,b);ge==4&&At(this),this.o&&!this.J&&(ge==4?oa(this.j,this):(this.o=!1,hr(this)))}else Rh(this.g),l==400&&0<b.indexOf("Unknown SID")?(this.s=3,Ie(12)):(this.s=0,Ie(13)),At(this),Tn(this)}}}catch{}finally{}};function No(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function ch(s,c){var l=s.C,f=c.indexOf(`
`,l);return f==-1?Li:(l=Number(c.substring(l,f)),isNaN(l)?Vo:(f+=1,f+l>c.length?Li:(c=c.slice(f,f+l),s.C=f+l,c)))}rt.prototype.cancel=function(){this.J=!0,At(this)};function hr(s){s.S=Date.now()+s.I,Oo(s,s.I)}function Oo(s,c){if(s.B!=null)throw Error("WatchDog timer not null");s.B=vn(R(s.ba,s),c)}function xi(s){s.B&&(u.clearTimeout(s.B),s.B=null)}rt.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(oh(this.i,this.A),this.L!=2&&(yn(),Ie(17)),At(this),this.s=2,Tn(this)):Oo(this,this.S-s)};function Tn(s){s.j.G==0||s.J||oa(s.j,s)}function At(s){xi(s);var c=s.M;c&&typeof c.ma=="function"&&c.ma(),s.M=null,Io(s.U),s.g&&(c=s.g,s.g=null,c.abort(),c.ma())}function Ui(s,c){try{var l=s.j;if(l.G!=0&&(l.g==s||Fi(l.h,s))){if(!s.K&&Fi(l.h,s)&&l.G==3){try{var f=l.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var I=f;if(I[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)Er(l),yr(l);else break e;$i(l),Ie(18)}}else l.za=I[1],0<l.za-l.T&&37500>I[2]&&l.F&&l.v==0&&!l.C&&(l.C=vn(R(l.Za,l),6e3));if(1>=xo(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else St(l,11)}else if((s.K||l.g==s)&&Er(l),!H(c))for(I=l.Da.g.parse(c),c=0;c<I.length;c++){let z=I[c];if(l.T=z[0],z=z[1],l.G==2)if(z[0]=="c"){l.K=z[1],l.ia=z[2];const me=z[3];me!=null&&(l.la=me,l.j.info("VER="+l.la));const ge=z[4];ge!=null&&(l.Aa=ge,l.j.info("SVER="+l.Aa));const qt=z[5];qt!=null&&typeof qt=="number"&&0<qt&&(f=1.5*qt,l.L=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const be=s.g;if(be){const Ir=be.g?be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ir){var A=f.h;A.g||Ir.indexOf("spdy")==-1&&Ir.indexOf("quic")==-1&&Ir.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Bi(A,A.h),A.h=null))}if(f.D){const Wi=be.g?be.g.getResponseHeader("X-HTTP-Session-Id"):null;Wi&&(f.ya=Wi,J(f.I,f.D,Wi))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),f=l;var b=s;if(f.qa=ua(f,f.J?f.ia:null,f.W),b.K){Uo(f.h,b);var Q=b,ue=f.L;ue&&(Q.I=ue),Q.B&&(xi(Q),hr(Q)),f.g=b}else ia(f);0<l.i.length&&vr(l)}else z[0]!="stop"&&z[0]!="close"||St(l,7);else l.G==3&&(z[0]=="stop"||z[0]=="close"?z[0]=="stop"?St(l,7):qi(l):z[0]!="noop"&&l.l&&l.l.ta(z),l.v=0)}}yn(4)}catch{}}var uh=class{constructor(s,c){this.g=s,this.map=c}};function Lo(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Mo(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function xo(s){return s.h?1:s.g?s.g.size:0}function Fi(s,c){return s.h?s.h==c:s.g?s.g.has(c):!1}function Bi(s,c){s.g?s.g.add(c):s.h=c}function Uo(s,c){s.h&&s.h==c?s.h=null:s.g&&s.g.has(c)&&s.g.delete(c)}Lo.prototype.cancel=function(){if(this.i=Fo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Fo(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let c=s.i;for(const l of s.g.values())c=c.concat(l.D);return c}return O(s.i)}function lh(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var c=[],l=s.length,f=0;f<l;f++)c.push(s[f]);return c}c=[],l=0;for(f in s)c[l++]=s[f];return c}function hh(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var c=[];s=s.length;for(var l=0;l<s;l++)c.push(l);return c}c=[],l=0;for(const f in s)c[l++]=f;return c}}}function Bo(s,c){if(s.forEach&&typeof s.forEach=="function")s.forEach(c,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,c,void 0);else for(var l=hh(s),f=lh(s),I=f.length,A=0;A<I;A++)c.call(void 0,f[A],l&&l[A],s)}var jo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function dh(s,c){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var f=s[l].indexOf("="),I=null;if(0<=f){var A=s[l].substring(0,f);I=s[l].substring(f+1)}else A=s[l];c(A,I?decodeURIComponent(I.replace(/\+/g," ")):"")}}}function Rt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof Rt){this.h=s.h,dr(this,s.j),this.o=s.o,this.g=s.g,fr(this,s.s),this.l=s.l;var c=s.i,l=new An;l.i=c.i,c.g&&(l.g=new Map(c.g),l.h=c.h),qo(this,l),this.m=s.m}else s&&(c=String(s).match(jo))?(this.h=!1,dr(this,c[1]||"",!0),this.o=In(c[2]||""),this.g=In(c[3]||"",!0),fr(this,c[4]),this.l=In(c[5]||"",!0),qo(this,c[6]||"",!0),this.m=In(c[7]||"")):(this.h=!1,this.i=new An(null,this.h))}Rt.prototype.toString=function(){var s=[],c=this.j;c&&s.push(wn(c,$o,!0),":");var l=this.g;return(l||c=="file")&&(s.push("//"),(c=this.o)&&s.push(wn(c,$o,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(wn(l,l.charAt(0)=="/"?mh:ph,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",wn(l,_h)),s.join("")};function qe(s){return new Rt(s)}function dr(s,c,l){s.j=l?In(c,!0):c,s.j&&(s.j=s.j.replace(/:$/,""))}function fr(s,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);s.s=c}else s.s=null}function qo(s,c,l){c instanceof An?(s.i=c,yh(s.i,s.h)):(l||(c=wn(c,gh)),s.i=new An(c,s.h))}function J(s,c,l){s.i.set(c,l)}function pr(s){return J(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function In(s,c){return s?c?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function wn(s,c,l){return typeof s=="string"?(s=encodeURI(s).replace(c,fh),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function fh(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var $o=/[#\/\?@]/g,ph=/[#\?:]/g,mh=/[#\?]/g,gh=/[#\?@]/g,_h=/#/g;function An(s,c){this.h=this.g=null,this.i=s||null,this.j=!!c}function it(s){s.g||(s.g=new Map,s.h=0,s.i&&dh(s.i,function(c,l){s.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=An.prototype,n.add=function(s,c){it(this),this.i=null,s=Bt(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(c),this.h+=1,this};function zo(s,c){it(s),c=Bt(s,c),s.g.has(c)&&(s.i=null,s.h-=s.g.get(c).length,s.g.delete(c))}function Wo(s,c){return it(s),c=Bt(s,c),s.g.has(c)}n.forEach=function(s,c){it(this),this.g.forEach(function(l,f){l.forEach(function(I){s.call(c,I,f,this)},this)},this)},n.na=function(){it(this);const s=Array.from(this.g.values()),c=Array.from(this.g.keys()),l=[];for(let f=0;f<c.length;f++){const I=s[f];for(let A=0;A<I.length;A++)l.push(c[f])}return l},n.V=function(s){it(this);let c=[];if(typeof s=="string")Wo(this,s)&&(c=c.concat(this.g.get(Bt(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)c=c.concat(s[l])}return c},n.set=function(s,c){return it(this),this.i=null,s=Bt(this,s),Wo(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[c]),this.h+=1,this},n.get=function(s,c){return s?(s=this.V(s),0<s.length?String(s[0]):c):c};function Ho(s,c,l){zo(s,c),0<l.length&&(s.i=null,s.g.set(Bt(s,c),O(l)),s.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],c=Array.from(this.g.keys());for(var l=0;l<c.length;l++){var f=c[l];const A=encodeURIComponent(String(f)),b=this.V(f);for(f=0;f<b.length;f++){var I=A;b[f]!==""&&(I+="="+encodeURIComponent(String(b[f]))),s.push(I)}}return this.i=s.join("&")};function Bt(s,c){return c=String(c),s.j&&(c=c.toLowerCase()),c}function yh(s,c){c&&!s.j&&(it(s),s.i=null,s.g.forEach(function(l,f){var I=f.toLowerCase();f!=I&&(zo(this,f),Ho(this,I,l))},s)),s.j=c}function vh(s,c){const l=new En;if(u.Image){const f=new Image;f.onload=C(st,l,"TestLoadImage: loaded",!0,c,f),f.onerror=C(st,l,"TestLoadImage: error",!1,c,f),f.onabort=C(st,l,"TestLoadImage: abort",!1,c,f),f.ontimeout=C(st,l,"TestLoadImage: timeout",!1,c,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=s}else c(!1)}function Eh(s,c){const l=new En,f=new AbortController,I=setTimeout(()=>{f.abort(),st(l,"TestPingServer: timeout",!1,c)},1e4);fetch(s,{signal:f.signal}).then(A=>{clearTimeout(I),A.ok?st(l,"TestPingServer: ok",!0,c):st(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),st(l,"TestPingServer: error",!1,c)})}function st(s,c,l,f,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),f(l)}catch{}}function Th(){this.g=new rh}function Ih(s,c,l){const f=l||"";try{Bo(s,function(I,A){let b=I;d(I)&&(b=ki(I)),c.push(f+A+"="+encodeURIComponent(b))})}catch(I){throw c.push(f+"type="+encodeURIComponent("_badmap")),I}}function mr(s){this.l=s.Ub||null,this.j=s.eb||!1}D(mr,Vi),mr.prototype.g=function(){return new gr(this.l,this.j)},mr.prototype.i=function(s){return function(){return s}}({});function gr(s,c){pe.call(this),this.D=s,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(gr,pe),n=gr.prototype,n.open=function(s,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=c,this.readyState=1,Sn(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(c.body=s),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Rn(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,Sn(this)),this.g&&(this.readyState=3,Sn(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Go(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Go(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var c=s.value?s.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!s.done}))&&(this.response=this.responseText+=c)}s.done?Rn(this):Sn(this),this.readyState==3&&Go(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,Rn(this))},n.Qa=function(s){this.g&&(this.response=s,Rn(this))},n.ga=function(){this.g&&Rn(this)};function Rn(s){s.readyState=4,s.l=null,s.j=null,s.v=null,Sn(s)}n.setRequestHeader=function(s,c){this.u.append(s,c)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=c.next();return s.join(`\r
`)};function Sn(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(gr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function Ko(s){let c="";return te(s,function(l,f){c+=f,c+=":",c+=l,c+=`\r
`}),c}function ji(s,c,l){e:{for(f in l){var f=!1;break e}f=!0}f||(l=Ko(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):J(s,c,l))}function Z(s){pe.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(Z,pe);var wh=/^https?$/i,Ah=["POST","PUT"];n=Z.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,c,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);c=c?c.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Oi.g(),this.v=this.o?wo(this.o):wo(Oi),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(c,String(s),!0),this.B=!1}catch(A){Qo(this,A);return}if(s=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var I in f)l.set(I,f[I]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())l.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(A=>A.toLowerCase()=="content-type"),I=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Ah,c,void 0))||f||I||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,b]of l)this.g.setRequestHeader(A,b);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xo(this),this.u=!0,this.g.send(s),this.u=!1}catch(A){Qo(this,A)}};function Qo(s,c){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=c,s.m=5,Jo(s),_r(s)}function Jo(s){s.A||(s.A=!0,Te(s,"complete"),Te(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,Te(this,"complete"),Te(this,"abort"),_r(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),_r(this,!0)),Z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Yo(this):this.bb())},n.bb=function(){Yo(this)};function Yo(s){if(s.h&&typeof a<"u"&&(!s.v[1]||$e(s)!=4||s.Z()!=2)){if(s.u&&$e(s)==4)vo(s.Ea,0,s);else if(Te(s,"readystatechange"),$e(s)==4){s.h=!1;try{const b=s.Z();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var l;if(!(l=c)){var f;if(f=b===0){var I=String(s.D).match(jo)[1]||null;!I&&u.self&&u.self.location&&(I=u.self.location.protocol.slice(0,-1)),f=!wh.test(I?I.toLowerCase():"")}l=f}if(l)Te(s,"complete"),Te(s,"success");else{s.m=6;try{var A=2<$e(s)?s.g.statusText:""}catch{A=""}s.l=A+" ["+s.Z()+"]",Jo(s)}}finally{_r(s)}}}}function _r(s,c){if(s.g){Xo(s);const l=s.g,f=s.v[0]?()=>{}:null;s.g=null,s.v=null,c||Te(s,"ready");try{l.onreadystatechange=f}catch{}}}function Xo(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function $e(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<$e(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var c=this.g.responseText;return s&&c.indexOf(s)==0&&(c=c.substring(s.length)),nh(c)}};function Zo(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Rh(s){const c={};s=(s.g&&2<=$e(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<s.length;f++){if(H(s[f]))continue;var l=E(s[f]);const I=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const A=c[I]||[];c[I]=A,A.push(l)}v(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Pn(s,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||c}function ea(s){this.Aa=0,this.i=[],this.j=new En,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Pn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Pn("baseRetryDelayMs",5e3,s),this.cb=Pn("retryDelaySeedMs",1e4,s),this.Wa=Pn("forwardChannelMaxRetries",2,s),this.wa=Pn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Lo(s&&s.concurrentRequestLimit),this.Da=new Th,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ea.prototype,n.la=8,n.G=1,n.connect=function(s,c,l,f){Ie(0),this.W=s,this.H=c||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.I=ua(this,null,this.W),vr(this)};function qi(s){if(ta(s),s.G==3){var c=s.U++,l=qe(s.I);if(J(l,"SID",s.K),J(l,"RID",c),J(l,"TYPE","terminate"),Cn(s,l),c=new rt(s,s.j,c),c.L=2,c.v=pr(qe(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=c.v,l=!0),l||(c.g=la(c.j,null),c.g.ea(c.v)),c.F=Date.now(),hr(c)}ca(s)}function yr(s){s.g&&(zi(s),s.g.cancel(),s.g=null)}function ta(s){yr(s),s.u&&(u.clearTimeout(s.u),s.u=null),Er(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function vr(s){if(!Mo(s.h)&&!s.s){s.s=!0;var c=s.Ga;fn||po(),pn||(fn(),pn=!0),Ii.add(c,s),s.B=0}}function Sh(s,c){return xo(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=c.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=vn(R(s.Ga,s,c),aa(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const I=new rt(this,this.j,s);let A=this.o;if(this.S&&(A?(A=m(A),y(A,this.S)):A=this.S),this.m!==null||this.O||(I.H=A,A=null),this.P)e:{for(var c=0,l=0;l<this.i.length;l++){t:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=l;break e}if(c===4096||l===this.i.length-1){c=l+1;break e}}c=1e3}else c=1e3;c=ra(this,I,c),l=qe(this.I),J(l,"RID",s),J(l,"CVER",22),this.D&&J(l,"X-HTTP-Session-Id",this.D),Cn(this,l),A&&(this.O?c="headers="+encodeURIComponent(String(Ko(A)))+"&"+c:this.m&&ji(l,this.m,A)),Bi(this.h,I),this.Ua&&J(l,"TYPE","init"),this.P?(J(l,"$req",c),J(l,"SID","null"),I.T=!0,Mi(I,l,null)):Mi(I,l,c),this.G=2}}else this.G==3&&(s?na(this,s):this.i.length==0||Mo(this.h)||na(this))};function na(s,c){var l;c?l=c.l:l=s.U++;const f=qe(s.I);J(f,"SID",s.K),J(f,"RID",l),J(f,"AID",s.T),Cn(s,f),s.m&&s.o&&ji(f,s.m,s.o),l=new rt(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),c&&(s.i=c.D.concat(s.i)),c=ra(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Bi(s.h,l),Mi(l,f,c)}function Cn(s,c){s.H&&te(s.H,function(l,f){J(c,f,l)}),s.l&&Bo({},function(l,f){J(c,f,l)})}function ra(s,c,l){l=Math.min(s.i.length,l);var f=s.l?R(s.l.Na,s.l,s):null;e:{var I=s.i;let A=-1;for(;;){const b=["count="+l];A==-1?0<l?(A=I[0].g,b.push("ofs="+A)):A=0:b.push("ofs="+A);let Q=!0;for(let ue=0;ue<l;ue++){let z=I[ue].g;const me=I[ue].map;if(z-=A,0>z)A=Math.max(0,I[ue].g-100),Q=!1;else try{Ih(me,b,"req"+z+"_")}catch{f&&f(me)}}if(Q){f=b.join("&");break e}}}return s=s.i.splice(0,l),c.D=s,f}function ia(s){if(!s.g&&!s.u){s.Y=1;var c=s.Fa;fn||po(),pn||(fn(),pn=!0),Ii.add(c,s),s.v=0}}function $i(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=vn(R(s.Fa,s),aa(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,sa(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=vn(R(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ie(10),yr(this),sa(this))};function zi(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function sa(s){s.g=new rt(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var c=qe(s.qa);J(c,"RID","rpc"),J(c,"SID",s.K),J(c,"AID",s.T),J(c,"CI",s.F?"0":"1"),!s.F&&s.ja&&J(c,"TO",s.ja),J(c,"TYPE","xmlhttp"),Cn(s,c),s.m&&s.o&&ji(c,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=pr(qe(c)),l.m=null,l.P=!0,Do(l,s)}n.Za=function(){this.C!=null&&(this.C=null,yr(this),$i(this),Ie(19))};function Er(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function oa(s,c){var l=null;if(s.g==c){Er(s),zi(s),s.g=null;var f=2}else if(Fi(s.h,c))l=c.D,Uo(s.h,c),f=1;else return;if(s.G!=0){if(c.o)if(f==1){l=c.m?c.m.length:0,c=Date.now()-c.F;var I=s.B;f=cr(),Te(f,new Co(f,l)),vr(s)}else ia(s);else if(I=c.s,I==3||I==0&&0<c.X||!(f==1&&Sh(s,c)||f==2&&$i(s)))switch(l&&0<l.length&&(c=s.h,c.i=c.i.concat(l)),I){case 1:St(s,5);break;case 4:St(s,10);break;case 3:St(s,6);break;default:St(s,2)}}}function aa(s,c){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*c}function St(s,c){if(s.j.info("Error code "+c),c==2){var l=R(s.fb,s),f=s.Xa;const I=!f;f=new Rt(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||dr(f,"https"),pr(f),I?vh(f.toString(),l):Eh(f.toString(),l)}else Ie(2);s.G=0,s.l&&s.l.sa(c),ca(s),ta(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Ie(2)):(this.j.info("Failed to ping google.com"),Ie(1))};function ca(s){if(s.G=0,s.ka=[],s.l){const c=Fo(s.h);(c.length!=0||s.i.length!=0)&&(k(s.ka,c),k(s.ka,s.i),s.h.i.length=0,O(s.i),s.i.length=0),s.l.ra()}}function ua(s,c,l){var f=l instanceof Rt?qe(l):new Rt(l);if(f.g!="")c&&(f.g=c+"."+f.g),fr(f,f.s);else{var I=u.location;f=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;var A=new Rt(null);f&&dr(A,f),c&&(A.g=c),I&&fr(A,I),l&&(A.l=l),f=A}return l=s.D,c=s.ya,l&&c&&J(f,l,c),J(f,"VER",s.la),Cn(s,f),f}function la(s,c,l){if(c&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=s.Ca&&!s.pa?new Z(new mr({eb:l})):new Z(s.pa),c.Ha(s.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ha(){}n=ha.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Tr(){}Tr.prototype.g=function(s,c){return new Ae(s,c)};function Ae(s,c){pe.call(this),this.g=new ea(c),this.l=s,this.h=c&&c.messageUrlParams||null,s=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(s?s["X-WebChannel-Content-Type"]=c.messageContentType:s={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(s?s["X-WebChannel-Client-Profile"]=c.va:s={"X-WebChannel-Client-Profile":c.va}),this.g.S=s,(s=c&&c.Sb)&&!H(s)&&(this.g.m=s),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!H(c)&&(this.g.D=c,s=this.h,s!==null&&c in s&&(s=this.h,c in s&&delete s[c])),this.j=new jt(this)}D(Ae,pe),Ae.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ae.prototype.close=function(){qi(this.g)},Ae.prototype.o=function(s){var c=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=ki(s),s=l);c.i.push(new uh(c.Ya++,s)),c.G==3&&vr(c)},Ae.prototype.N=function(){this.g.l=null,delete this.j,qi(this.g),delete this.g,Ae.aa.N.call(this)};function da(s){Di.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var c=s.__sm__;if(c){e:{for(const l in c){s=l;break e}s=void 0}(this.i=s)&&(s=this.i,c=c!==null&&s in c?c[s]:void 0),this.data=c}else this.data=s}D(da,Di);function fa(){Ni.call(this),this.status=1}D(fa,Ni);function jt(s){this.g=s}D(jt,ha),jt.prototype.ua=function(){Te(this.g,"a")},jt.prototype.ta=function(s){Te(this.g,new da(s))},jt.prototype.sa=function(s){Te(this.g,new fa)},jt.prototype.ra=function(){Te(this.g,"b")},Tr.prototype.createWebChannel=Tr.prototype.g,Ae.prototype.send=Ae.prototype.o,Ae.prototype.open=Ae.prototype.m,Ae.prototype.close=Ae.prototype.close,Pu=function(){return new Tr},Su=function(){return cr()},Ru=wt,hs={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ur.NO_ERROR=0,ur.TIMEOUT=8,ur.HTTP_ERROR=6,Nr=ur,bo.COMPLETE="complete",Au=bo,Ao.EventType=_n,_n.OPEN="a",_n.CLOSE="b",_n.ERROR="c",_n.MESSAGE="d",pe.prototype.listen=pe.prototype.K,Vn=Ao,Z.prototype.listenOnce=Z.prototype.L,Z.prototype.getLastError=Z.prototype.Ka,Z.prototype.getLastErrorCode=Z.prototype.Ba,Z.prototype.getStatus=Z.prototype.Z,Z.prototype.getResponseJson=Z.prototype.Oa,Z.prototype.getResponseText=Z.prototype.oa,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Ha,wu=Z}).apply(typeof Ar<"u"?Ar:typeof self<"u"?self:typeof window<"u"?window:{});const Wa="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ye.UNAUTHENTICATED=new ye(null),ye.GOOGLE_CREDENTIALS=new ye("google-credentials-uid"),ye.FIRST_PARTY=new ye("first-party-uid"),ye.MOCK_USER=new ye("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cn="11.2.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new Rs("@firebase/firestore");function $t(){return Ot.logLevel}function V(n,...e){if(Ot.logLevel<=B.DEBUG){const t=e.map(Fs);Ot.debug(`Firestore (${cn}): ${n}`,...t)}}function Ye(n,...e){if(Ot.logLevel<=B.ERROR){const t=e.map(Fs);Ot.error(`Firestore (${cn}): ${n}`,...t)}}function Xt(n,...e){if(Ot.logLevel<=B.WARN){const t=e.map(Fs);Ot.warn(`Firestore (${cn}): ${n}`,...t)}}function Fs(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n="Unexpected state"){const e=`FIRESTORE (${cn}) INTERNAL ASSERTION FAILED: `+n;throw Ye(e),new Error(e)}function K(n,e){n||x()}function F(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends Ze{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class wm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ye.UNAUTHENTICATED))}shutdown(){}}class Am{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Rm{constructor(e){this.t=e,this.currentUser=ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){K(this.o===void 0);let r=this.i;const i=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new Ke;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Ke,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},u=h=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Ke)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(K(typeof r.accessToken=="string"),new Cu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return K(e===null||typeof e=="string"),new ye(e)}}class Sm{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ye.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class Pm{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Sm(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ye.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Cm{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bm{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){K(this.o===void 0);const r=o=>{o.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const i=o=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(K(typeof t.token=="string"),this.R=t.token,new Cm(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function km(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=km(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%e.length))}return r}}function q(n,e){return n<e?-1:n>e?1:0}function Zt(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new oe(0,0))}static max(){return new U(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,t,r){t===void 0?t=0:t>e.length&&x(),r===void 0?r=e.length-t:r>e.length-t&&x(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Oe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Oe?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const o=Oe.compareSegments(e.get(i),t.get(i));if(o!==0)return o}return Math.sign(e.length-t.length)}static compareSegments(e,t){const r=Oe.isNumericId(e),i=Oe.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?Oe.extractNumericId(e).compare(Oe.extractNumericId(t)):e<t?-1:e>t?1:0}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return mt.fromString(e.substring(4,e.length-2))}}class Y extends Oe{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const Vm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends Oe{construct(e,t,r){return new he(e,t,r)}static isValidIdentifier(e){return Vm.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new he(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const o=()=>{if(r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(o(),i++)}if(o(),a)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Y.fromString(e))}static fromName(e){return new L(Y.fromString(e).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Y(e.slice()))}}function Dm(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=U.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new _t(i,L.empty(),e)}function Nm(n){return new _t(n.readTime,n.key,-1)}class _t{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new _t(U.min(),L.empty(),-1)}static max(){return new _t(U.max(),L.empty(),-1)}}function Om(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Mm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function un(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Lm)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):S.reject(t)}static resolve(e){return new S((t,r)=>{t(e)})}static reject(e){return new S((t,r)=>{r(e)})}static waitFor(e){return new S((t,r)=>{let i=0,o=0,a=!1;e.forEach(u=>{++i,u.next(()=>{++o,a&&o===i&&t()},h=>r(h))}),a=!0,o===i&&t()})}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next(i=>i?S.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,o)=>{r.push(t.call(this,i,o))}),this.waitFor(r)}static mapArray(e,t){return new S((r,i)=>{const o=e.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const d=h;t(e[d]).next(p=>{a[d]=p,++u,u===o&&r(a)},p=>i(p))}})}static doWhile(e,t){return new S((r,i)=>{const o=()=>{e()===!0?t().next(()=>{o()},i):r()};o()})}}function xm(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ln(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}ci.oe=-1;function ui(n){return n==null}function Kr(n){return n===0&&1/n==-1/0}function Um(n){return typeof n=="number"&&Number.isInteger(n)&&!Kr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fm(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Ha(e)),e=Bm(n.get(t),e);return Ha(e)}function Bm(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const o=n.charAt(i);switch(o){case"\0":t+="";break;case"":t+="";break;default:t+=o}}return t}function Ha(n){return n+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Lt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ku(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e,t){this.comparator=e,this.root=t||le.EMPTY}insert(e,t){return new X(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,le.BLACK,null,null))}remove(e){return new X(this.comparator,this.root.remove(e,this.comparator).copy(null,null,le.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Rr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Rr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Rr(this.root,e,this.comparator,!0)}}class Rr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class le{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r??le.RED,this.left=i??le.EMPTY,this.right=o??le.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new le(e??this.key,t??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return le.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return le.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw x();const e=this.left.check();if(e!==this.right.check())throw x();return e+(this.isRed()?0:1)}}le.EMPTY=null,le.RED=!0,le.BLACK=!1;le.EMPTY=new class{constructor(){this.size=0}get key(){throw x()}get value(){throw x()}get color(){throw x()}get left(){throw x()}get right(){throw x()}copy(e,t,r,i,o){return this}insert(e,t,r){return new le(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.comparator=e,this.data=new X(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ka(this.data.getIterator())}getIteratorFrom(e){return new Ka(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ae(this.comparator);return t.data=e,t}}class Ka{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new Ve([])}unionWith(e){let t=new ae(he.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ve(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Zt(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Vu("Invalid base64 string: "+o):o}}(e);return new de(t)}static fromUint8Array(e){const t=function(i){let o="";for(let a=0;a<i.length;++a)o+=String.fromCharCode(i[a]);return o}(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const jm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yt(n){if(K(!!n),typeof n=="string"){let e=0;const t=jm.exec(n);if(K(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ne(n.seconds),nanos:ne(n.nanos)}}function ne(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function vt(n){return typeof n=="string"?de.fromBase64String(n):de.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bs(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function li(n){const e=n.mapValue.fields.__previous_value__;return Bs(e)?li(e):e}function qn(n){const e=yt(n.mapValue.fields.__local_write_time__.timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e,t,r,i,o,a,u,h,d){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=d}}class $n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new $n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof $n&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Et(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Bs(n)?4:zm(n)?9007199254740991:$m(n)?10:11:x()}function Fe(n,e){if(n===e)return!0;const t=Et(n);if(t!==Et(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return qn(n).isEqual(qn(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=yt(i.timestampValue),u=yt(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,o){return vt(i.bytesValue).isEqual(vt(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,o){return ne(i.geoPointValue.latitude)===ne(o.geoPointValue.latitude)&&ne(i.geoPointValue.longitude)===ne(o.geoPointValue.longitude)}(n,e);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return ne(i.integerValue)===ne(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const a=ne(i.doubleValue),u=ne(o.doubleValue);return a===u?Kr(a)===Kr(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return Zt(n.arrayValue.values||[],e.arrayValue.values||[],Fe);case 10:case 11:return function(i,o){const a=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Ga(a)!==Ga(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Fe(a[h],u[h])))return!1;return!0}(n,e);default:return x()}}function zn(n,e){return(n.values||[]).find(t=>Fe(t,e))!==void 0}function en(n,e){if(n===e)return 0;const t=Et(n),r=Et(e);if(t!==r)return q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return q(n.booleanValue,e.booleanValue);case 2:return function(o,a){const u=ne(o.integerValue||o.doubleValue),h=ne(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,e);case 3:return Qa(n.timestampValue,e.timestampValue);case 4:return Qa(qn(n),qn(e));case 5:return q(n.stringValue,e.stringValue);case 6:return function(o,a){const u=vt(o),h=vt(a);return u.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const u=o.split("/"),h=a.split("/");for(let d=0;d<u.length&&d<h.length;d++){const p=q(u[d],h[d]);if(p!==0)return p}return q(u.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const u=q(ne(o.latitude),ne(a.latitude));return u!==0?u:q(ne(o.longitude),ne(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ja(n.arrayValue,e.arrayValue);case 10:return function(o,a){var u,h,d,p;const T=o.fields||{},R=a.fields||{},C=(u=T.value)===null||u===void 0?void 0:u.arrayValue,D=(h=R.value)===null||h===void 0?void 0:h.arrayValue,O=q(((d=C==null?void 0:C.values)===null||d===void 0?void 0:d.length)||0,((p=D==null?void 0:D.values)===null||p===void 0?void 0:p.length)||0);return O!==0?O:Ja(C,D)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===Sr.mapValue&&a===Sr.mapValue)return 0;if(o===Sr.mapValue)return 1;if(a===Sr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let T=0;T<h.length&&T<p.length;++T){const R=q(h[T],p[T]);if(R!==0)return R;const C=en(u[h[T]],d[p[T]]);if(C!==0)return C}return q(h.length,p.length)}(n.mapValue,e.mapValue);default:throw x()}}function Qa(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return q(n,e);const t=yt(n),r=yt(e),i=q(t.seconds,r.seconds);return i!==0?i:q(t.nanos,r.nanos)}function Ja(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const o=en(t[i],r[i]);if(o)return o}return q(t.length,r.length)}function tn(n){return ds(n)}function ds(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=yt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return vt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const o of t.values||[])i?i=!1:r+=",",r+=ds(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${ds(t.fields[a])}`;return i+"}"}(n.mapValue):x()}function Or(n){switch(Et(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=li(n);return e?16+Or(e):16;case 5:return 2*n.stringValue.length;case 6:return vt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,o)=>i+Or(o),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Lt(r.fields,(o,a)=>{i+=o.length+Or(a)}),i}(n.mapValue);default:throw x()}}function fs(n){return!!n&&"integerValue"in n}function js(n){return!!n&&"arrayValue"in n}function Ya(n){return!!n&&"nullValue"in n}function Xa(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Lr(n){return!!n&&"mapValue"in n}function $m(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Mn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Lt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Mn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Mn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function zm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.value=e}static empty(){return new Pe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Lr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Mn(t)}setAll(e){let t=he.emptyPath(),r={},i=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,i),r={},i=[],t=u.popLast()}a?r[u.lastSegment()]=Mn(a):i.push(u.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){const t=this.field(e.popLast());Lr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Fe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Lr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Lt(t,(i,o)=>e[i]=o);for(const i of r)delete e[i]}clone(){return new Pe(Mn(this.value))}}function Du(n){const e=[];return Lt(n.fields,(t,r)=>{const i=new he([t]);if(Lr(r)){const o=Du(r.mapValue).fields;if(o.length===0)e.push(i);else for(const a of o)e.push(i.child(a))}else e.push(i)}),new Ve(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t,r,i,o,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(e){return new ve(e,0,U.min(),U.min(),U.min(),Pe.empty(),0)}static newFoundDocument(e,t,r,i){return new ve(e,1,t,U.min(),r,i,0)}static newNoDocument(e,t){return new ve(e,2,t,U.min(),U.min(),Pe.empty(),0)}static newUnknownDocument(e,t){return new ve(e,3,t,U.min(),U.min(),Pe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,t){this.position=e,this.inclusive=t}}function Za(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const o=e[i],a=n.position[i];if(o.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=en(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function ec(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Fe(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Wm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{}class se extends Nu{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Gm(e,t,r):t==="array-contains"?new Jm(e,r):t==="in"?new Ym(e,r):t==="not-in"?new Xm(e,r):t==="array-contains-any"?new Zm(e,r):new se(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Km(e,r):new Qm(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(en(t,this.value)):t!==null&&Et(this.value)===Et(t)&&this.matchesComparison(en(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Be extends Nu{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Be(e,t)}matches(e){return Ou(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Ou(n){return n.op==="and"}function Lu(n){return Hm(n)&&Ou(n)}function Hm(n){for(const e of n.filters)if(e instanceof Be)return!1;return!0}function ps(n){if(n instanceof se)return n.field.canonicalString()+n.op.toString()+tn(n.value);if(Lu(n))return n.filters.map(e=>ps(e)).join(",");{const e=n.filters.map(t=>ps(t)).join(",");return`${n.op}(${e})`}}function Mu(n,e){return n instanceof se?function(r,i){return i instanceof se&&r.op===i.op&&r.field.isEqual(i.field)&&Fe(r.value,i.value)}(n,e):n instanceof Be?function(r,i){return i instanceof Be&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,a,u)=>o&&Mu(a,i.filters[u]),!0):!1}(n,e):void x()}function xu(n){return n instanceof se?function(t){return`${t.field.canonicalString()} ${t.op} ${tn(t.value)}`}(n):n instanceof Be?function(t){return t.op.toString()+" {"+t.getFilters().map(xu).join(" ,")+"}"}(n):"Filter"}class Gm extends se{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class Km extends se{constructor(e,t){super(e,"in",t),this.keys=Uu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Qm extends se{constructor(e,t){super(e,"not-in",t),this.keys=Uu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Uu(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class Jm extends se{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return js(t)&&zn(t.arrayValue,this.value)}}class Ym extends se{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&zn(this.value.arrayValue,t)}}class Xm extends se{constructor(e,t){super(e,"not-in",t)}matches(e){if(zn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!zn(this.value.arrayValue,t)}}class Zm extends se{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!js(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>zn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t=null,r=[],i=[],o=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=a,this.endAt=u,this.ue=null}}function tc(n,e=null,t=[],r=[],i=null,o=null,a=null){return new eg(n,e,t,r,i,o,a)}function qs(n){const e=F(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ps(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),ui(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>tn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>tn(r)).join(",")),e.ue=t}return e.ue}function $s(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Wm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mu(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ec(n.startAt,e.startAt)&&ec(n.endAt,e.endAt)}function ms(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,t=null,r=[],i=[],o=null,a="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function tg(n,e,t,r,i,o,a,u){return new hi(n,e,t,r,i,o,a,u)}function zs(n){return new hi(n)}function nc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ng(n){return n.collectionGroup!==null}function xn(n){const e=F(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new ae(he.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Jr(o,r))}),t.has(he.keyField().canonicalString())||e.ce.push(new Jr(he.keyField(),r))}return e.ce}function Me(n){const e=F(n);return e.le||(e.le=rg(e,xn(n))),e.le}function rg(n,e){if(n.limitType==="F")return tc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new Jr(i.field,o)});const t=n.endAt?new Qr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qr(n.startAt.position,n.startAt.inclusive):null;return tc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function gs(n,e,t){return new hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function di(n,e){return $s(Me(n),Me(e))&&n.limitType===e.limitType}function Fu(n){return`${qs(Me(n))}|lt:${n.limitType}`}function zt(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>xu(i)).join(", ")}]`),ui(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>tn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>tn(i)).join(",")),`Target(${r})`}(Me(n))}; limitType=${n.limitType})`}function fi(n,e){return e.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):L.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,i){for(const o of xn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,u,h){const d=Za(a,u,h);return a.inclusive?d<=0:d<0}(r.startAt,xn(r),i)||r.endAt&&!function(a,u,h){const d=Za(a,u,h);return a.inclusive?d>=0:d>0}(r.endAt,xn(r),i))}(n,e)}function ig(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bu(n){return(e,t)=>{let r=!1;for(const i of xn(n)){const o=sg(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function sg(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(o,a,u){const h=a.data.field(o),d=u.data.field(o);return h!==null&&d!==null?en(h,d):x()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Lt(this.inner,(t,r)=>{for(const[i,o]of r)e(i,o)})}isEmpty(){return ku(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og=new X(L.comparator);function Xe(){return og}const ju=new X(L.comparator);function Dn(...n){let e=ju;for(const t of n)e=e.insert(t.key,t);return e}function qu(n){let e=ju;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function bt(){return Un()}function $u(){return Un()}function Un(){return new Mt(n=>n.toString(),(n,e)=>n.isEqual(e))}const ag=new X(L.comparator),cg=new ae(L.comparator);function j(...n){let e=cg;for(const t of n)e=e.add(t);return e}const ug=new ae(q);function lg(){return ug}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Kr(e)?"-0":e}}function zu(n){return{integerValue:""+n}}function hg(n,e){return Um(e)?zu(e):Ws(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(){this._=void 0}}function dg(n,e,t){return n instanceof Yr?function(i,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Bs(o)&&(o=li(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof Wn?Hu(n,e):n instanceof Hn?Gu(n,e):function(i,o){const a=Wu(i,o),u=rc(a)+rc(i.Pe);return fs(a)&&fs(i.Pe)?zu(u):Ws(i.serializer,u)}(n,e)}function fg(n,e,t){return n instanceof Wn?Hu(n,e):n instanceof Hn?Gu(n,e):t}function Wu(n,e){return n instanceof Xr?function(r){return fs(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class Yr extends pi{}class Wn extends pi{constructor(e){super(),this.elements=e}}function Hu(n,e){const t=Ku(e);for(const r of n.elements)t.some(i=>Fe(i,r))||t.push(r);return{arrayValue:{values:t}}}class Hn extends pi{constructor(e){super(),this.elements=e}}function Gu(n,e){let t=Ku(e);for(const r of n.elements)t=t.filter(i=>!Fe(i,r));return{arrayValue:{values:t}}}class Xr extends pi{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function rc(n){return ne(n.integerValue||n.doubleValue)}function Ku(n){return js(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function pg(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Wn&&i instanceof Wn||r instanceof Hn&&i instanceof Hn?Zt(r.elements,i.elements,Fe):r instanceof Xr&&i instanceof Xr?Fe(r.Pe,i.Pe):r instanceof Yr&&i instanceof Yr}(n.transform,e.transform)}class mg{constructor(e,t){this.version=e,this.transformResults=t}}class xe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new xe}static exists(e){return new xe(void 0,e)}static updateTime(e){return new xe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Mr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class mi{}function Qu(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Hs(n.key,xe.none()):new Zn(n.key,n.data,xe.none());{const t=n.data,r=Pe.empty();let i=new ae(he.comparator);for(let o of e.fields)if(!i.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),i=i.add(o)}return new xt(n.key,r,new Ve(i.toArray()),xe.none())}}function gg(n,e,t){n instanceof Zn?function(i,o,a){const u=i.value.clone(),h=sc(i.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof xt?function(i,o,a){if(!Mr(i.precondition,o))return void o.convertToUnknownDocument(a.version);const u=sc(i.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(Ju(i)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(i,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Fn(n,e,t,r){return n instanceof Zn?function(o,a,u,h){if(!Mr(o.precondition,a))return u;const d=o.value.clone(),p=oc(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof xt?function(o,a,u,h){if(!Mr(o.precondition,a))return u;const d=oc(o.fieldTransforms,h,a),p=a.data;return p.setAll(Ju(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(T=>T.field))}(n,e,t,r):function(o,a,u){return Mr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function _g(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),o=Wu(r.transform,i||null);o!=null&&(t===null&&(t=Pe.empty()),t.set(r.field,o))}return t||null}function ic(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Zt(r,i,(o,a)=>pg(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Zn extends mi{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class xt extends mi{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Ju(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function sc(n,e,t){const r=new Map;K(n.length===t.length);for(let i=0;i<t.length;i++){const o=n[i],a=o.transform,u=e.data.field(o.field);r.set(o.field,fg(a,u,t[i]))}return r}function oc(n,e,t){const r=new Map;for(const i of n){const o=i.transform,a=t.data.field(i.field);r.set(i.field,dg(o,a,e))}return r}class Hs extends mi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class yg extends mi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(e.key)&&gg(o,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Fn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Fn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=$u();return this.mutations.forEach(i=>{const o=e.get(i.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=t.has(i.key)?null:u;const h=Qu(a,u);h!==null&&r.set(i.key,h),a.isValidDocument()||a.convertToNoDocument(U.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),j())}isEqual(e){return this.batchId===e.batchId&&Zt(this.mutations,e.mutations,(t,r)=>ic(t,r))&&Zt(this.baseMutations,e.baseMutations,(t,r)=>ic(t,r))}}class Gs{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){K(e.mutations.length===r.length);let i=function(){return ag}();const o=e.mutations;for(let a=0;a<o.length;a++)i=i.insert(o[a].key,r[a].version);return new Gs(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re,$;function Ig(n){switch(n){default:return x();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Yu(n){if(n===void 0)return Ye("GRPC error has no .code"),P.UNKNOWN;switch(n){case re.OK:return P.OK;case re.CANCELLED:return P.CANCELLED;case re.UNKNOWN:return P.UNKNOWN;case re.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case re.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case re.INTERNAL:return P.INTERNAL;case re.UNAVAILABLE:return P.UNAVAILABLE;case re.UNAUTHENTICATED:return P.UNAUTHENTICATED;case re.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case re.NOT_FOUND:return P.NOT_FOUND;case re.ALREADY_EXISTS:return P.ALREADY_EXISTS;case re.PERMISSION_DENIED:return P.PERMISSION_DENIED;case re.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case re.ABORTED:return P.ABORTED;case re.OUT_OF_RANGE:return P.OUT_OF_RANGE;case re.UNIMPLEMENTED:return P.UNIMPLEMENTED;case re.DATA_LOSS:return P.DATA_LOSS;default:return x()}}($=re||(re={}))[$.OK=0]="OK",$[$.CANCELLED=1]="CANCELLED",$[$.UNKNOWN=2]="UNKNOWN",$[$.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",$[$.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",$[$.NOT_FOUND=5]="NOT_FOUND",$[$.ALREADY_EXISTS=6]="ALREADY_EXISTS",$[$.PERMISSION_DENIED=7]="PERMISSION_DENIED",$[$.UNAUTHENTICATED=16]="UNAUTHENTICATED",$[$.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",$[$.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",$[$.ABORTED=10]="ABORTED",$[$.OUT_OF_RANGE=11]="OUT_OF_RANGE",$[$.UNIMPLEMENTED=12]="UNIMPLEMENTED",$[$.INTERNAL=13]="INTERNAL",$[$.UNAVAILABLE=14]="UNAVAILABLE",$[$.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wg(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=new mt([4294967295,4294967295],0);function ac(n){const e=wg().encode(n),t=new Iu;return t.update(e),new Uint8Array(t.digest())}function cc(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new mt([t,r],0),new mt([i,o],0)]}class Ks{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Nn(`Invalid padding: ${t}`);if(r<0)throw new Nn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Nn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Nn(`Invalid padding when bitmap length is 0: ${t}`);this.Te=8*e.length-t,this.Ie=mt.fromNumber(this.Te)}de(e,t,r){let i=e.add(t.multiply(mt.fromNumber(r)));return i.compare(Ag)===1&&(i=new mt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Ie).toNumber()}Ee(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Te===0)return!1;const t=ac(e),[r,i]=cc(t);for(let o=0;o<this.hashCount;o++){const a=this.de(r,i,o);if(!this.Ee(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new Ks(o,i,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.Te===0)return;const t=ac(e),[r,i]=cc(t);for(let o=0;o<this.hashCount;o++){const a=this.de(r,i,o);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Nn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,t,r,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,er.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new gi(U.min(),i,new X(q),Xe(),j())}}class er{constructor(e,t,r,i,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new er(r,t,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class Xu{constructor(e,t){this.targetId=e,this.me=t}}class Zu{constructor(e,t,r=de.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class uc{constructor(){this.fe=0,this.ge=lc(),this.pe=de.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=j(),t=j(),r=j();return this.ge.forEach((i,o)=>{switch(o){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:x()}}),new er(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=lc()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,K(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Rg{constructor(e){this.Be=e,this.Le=new Map,this.ke=Xe(),this.qe=Pr(),this.Qe=Pr(),this.Ke=new X(q)}$e(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.Ue(t,e.Ve):this.We(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.We(t,e.key,e.Ve)}Ge(e){this.forEachTarget(e,t=>{const r=this.ze(t);switch(e.state){case 0:this.je(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.je(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.je(t)&&(this.He(t),r.De(e.resumeToken));break;default:x()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Le.forEach((r,i)=>{this.je(i)&&t(i)})}Je(e){const t=e.targetId,r=e.me.count,i=this.Ye(t);if(i){const o=i.target;if(ms(o))if(r===0){const a=new L(o.path);this.We(t,a,ve.newNoDocument(a,U.min()))}else K(r===1);else{const a=this.Ze(t);if(a!==r){const u=this.Xe(e),h=u?this.et(u,e,a):1;if(h!==0){this.He(t);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,d)}}}}}Xe(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=t;let a,u;try{a=vt(r).toUint8Array()}catch(h){if(h instanceof Vu)return Xt("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new Ks(a,i,o)}catch(h){return Xt(h instanceof Nn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.Te===0?null:u}et(e,t,r){return t.me.count===r-this.rt(e,t.targetId)?0:2}rt(e,t){const r=this.Be.getRemoteKeysForTarget(t);let i=0;return r.forEach(o=>{const a=this.Be.nt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(u)||(this.We(t,o,null),i++)}),i}it(e){const t=new Map;this.Le.forEach((o,a)=>{const u=this.Ye(a);if(u){if(o.current&&ms(u.target)){const h=new L(u.target.path);this.st(h).has(a)||this.ot(a,h)||this.We(a,h,ve.newNoDocument(h,e))}o.be&&(t.set(a,o.ve()),o.Ce())}});let r=j();this.Qe.forEach((o,a)=>{let u=!0;a.forEachWhile(h=>{const d=this.Ye(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(e));const i=new gi(e,t,this.Ke,this.ke,r);return this.ke=Xe(),this.qe=Pr(),this.Qe=Pr(),this.Ke=new X(q),i}Ue(e,t){if(!this.je(e))return;const r=this.ot(e,t.key)?2:0;this.ze(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e)),this.Qe=this.Qe.insert(t.key,this._t(t.key).add(e))}We(e,t,r){if(!this.je(e))return;const i=this.ze(e);this.ot(e,t)?i.Fe(t,1):i.Me(t),this.Qe=this.Qe.insert(t,this._t(t).delete(e)),this.Qe=this.Qe.insert(t,this._t(t).add(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Le.delete(e)}Ze(e){const t=this.ze(e).ve();return this.Be.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.ze(e).xe()}ze(e){let t=this.Le.get(e);return t||(t=new uc,this.Le.set(e,t)),t}_t(e){let t=this.Qe.get(e);return t||(t=new ae(q),this.Qe=this.Qe.insert(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ae(q),this.qe=this.qe.insert(e,t)),t}je(e){const t=this.Ye(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}Ye(e){const t=this.Le.get(e);return t&&t.Se?null:this.Be.ut(e)}He(e){this.Le.set(e,new uc),this.Be.getRemoteKeysForTarget(e).forEach(t=>{this.We(e,t,null)})}ot(e,t){return this.Be.getRemoteKeysForTarget(e).has(t)}}function Pr(){return new X(L.comparator)}function lc(){return new X(L.comparator)}const Sg={asc:"ASCENDING",desc:"DESCENDING"},Pg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Cg={and:"AND",or:"OR"};class bg{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _s(n,e){return n.useProto3Json||ui(e)?e:{value:e}}function Zr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function el(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function kg(n,e){return Zr(n,e.toTimestamp())}function Ue(n){return K(!!n),U.fromTimestamp(function(t){const r=yt(t);return new oe(r.seconds,r.nanos)}(n))}function Qs(n,e){return ys(n,e).canonicalString()}function ys(n,e){const t=function(i){return new Y(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function tl(n){const e=Y.fromString(n);return K(ol(e)),e}function vs(n,e){return Qs(n.databaseId,e.path)}function Zi(n,e){const t=tl(e);if(t.get(1)!==n.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(rl(t))}function nl(n,e){return Qs(n.databaseId,e)}function Vg(n){const e=tl(n);return e.length===4?Y.emptyPath():rl(e)}function Es(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function rl(n){return K(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function hc(n,e,t){return{name:vs(n,e),fields:t.value.mapValue.fields}}function Dg(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(K(p===void 0||typeof p=="string"),de.fromBase64String(p||"")):(K(p===void 0||p instanceof Buffer||p instanceof Uint8Array),de.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(d){const p=d.code===void 0?P.UNKNOWN:Yu(d.code);return new N(p,d.message||"")}(a);t=new Zu(r,i,o,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Zi(n,r.document.name),o=Ue(r.document.updateTime),a=r.document.createTime?Ue(r.document.createTime):U.min(),u=new Pe({mapValue:{fields:r.document.fields}}),h=ve.newFoundDocument(i,o,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new xr(d,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Zi(n,r.document),o=r.readTime?Ue(r.readTime):U.min(),a=ve.newNoDocument(i,o),u=r.removedTargetIds||[];t=new xr([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Zi(n,r.document),o=r.removedTargetIds||[];t=new xr([],o,i,null)}else{if(!("filter"in e))return x();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,a=new Tg(i,o),u=r.targetId;t=new Xu(u,a)}}return t}function Ng(n,e){let t;if(e instanceof Zn)t={update:hc(n,e.key,e.value)};else if(e instanceof Hs)t={delete:vs(n,e.key)};else if(e instanceof xt)t={update:hc(n,e.key,e.data),updateMask:qg(e.fieldMask)};else{if(!(e instanceof yg))return x();t={verify:vs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){const u=a.transform;if(u instanceof Yr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Wn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Hn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Xr)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw x()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:kg(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x()}(n,e.precondition)),t}function Og(n,e){return n&&n.length>0?(K(e!==void 0),n.map(t=>function(i,o){let a=i.updateTime?Ue(i.updateTime):Ue(o);return a.isEqual(U.min())&&(a=Ue(o)),new mg(a,i.transformResults||[])}(t,e))):[]}function Lg(n,e){return{documents:[nl(n,e.path)]}}function Mg(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=nl(n,i);const o=function(d){if(d.length!==0)return sl(Be.create(d,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(p=>function(R){return{field:Wt(R.field),direction:Fg(R.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=_s(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ct:t,parent:i}}function xg(n){let e=Vg(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){K(r===1);const p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(T){const R=il(T);return R instanceof Be&&Lu(R)?R.getFilters():[R]}(t.where));let a=[];t.orderBy&&(a=function(T){return T.map(R=>function(D){return new Jr(Ht(D.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(R))}(t.orderBy));let u=null;t.limit&&(u=function(T){let R;return R=typeof T=="object"?T.value:T,ui(R)?null:R}(t.limit));let h=null;t.startAt&&(h=function(T){const R=!!T.before,C=T.values||[];return new Qr(C,R)}(t.startAt));let d=null;return t.endAt&&(d=function(T){const R=!T.before,C=T.values||[];return new Qr(C,R)}(t.endAt)),tg(e,i,a,o,u,"F",h,d)}function Ug(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function il(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Ht(t.unaryFilter.field);return se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Ht(t.unaryFilter.field);return se.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ht(t.unaryFilter.field);return se.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Ht(t.unaryFilter.field);return se.create(a,"!=",{nullValue:"NULL_VALUE"});default:return x()}}(n):n.fieldFilter!==void 0?function(t){return se.create(Ht(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return x()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Be.create(t.compositeFilter.filters.map(r=>il(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return x()}}(t.compositeFilter.op))}(n):x()}function Fg(n){return Sg[n]}function Bg(n){return Pg[n]}function jg(n){return Cg[n]}function Wt(n){return{fieldPath:n.canonicalString()}}function Ht(n){return he.fromServerFormat(n.fieldPath)}function sl(n){return n instanceof se?function(t){if(t.op==="=="){if(Xa(t.value))return{unaryFilter:{field:Wt(t.field),op:"IS_NAN"}};if(Ya(t.value))return{unaryFilter:{field:Wt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Xa(t.value))return{unaryFilter:{field:Wt(t.field),op:"IS_NOT_NAN"}};if(Ya(t.value))return{unaryFilter:{field:Wt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wt(t.field),op:Bg(t.op),value:t.value}}}(n):n instanceof Be?function(t){const r=t.getFilters().map(i=>sl(i));return r.length===1?r[0]:{compositeFilter:{op:jg(t.op),filters:r}}}(n):x()}function qg(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ol(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t,r,i,o=U.min(),a=U.min(),u=de.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(e){return new ht(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ht(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ht(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e){this.ht=e}}function zg(n){const e=xg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?gs(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(){this.ln=new Hg}addToCollectionParentIndex(e,t){return this.ln.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.ln.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(_t.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(_t.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class Hg{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ae(Y.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ae(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class we{static withCacheSize(e){return new we(e,we.DEFAULT_COLLECTION_PERCENTILE,we.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */we.DEFAULT_COLLECTION_PERCENTILE=10,we.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,we.DEFAULT=new we(41943040,we.DEFAULT_COLLECTION_PERCENTILE,we.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),we.DISABLED=new we(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this.kn=e}next(){return this.kn+=2,this.kn}static qn(){return new nn(0)}static Qn(){return new nn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc([n,e],[t,r]){const i=q(n,t);return i===0?q(e,r):i}class Gg{constructor(e){this.Gn=e,this.buffer=new ae(fc),this.zn=0}jn(){return++this.zn}Hn(e){const t=[e,this.jn()];if(this.buffer.size<this.Gn)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();fc(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Kg{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Yn(6e4)}stop(){this.Jn&&(this.Jn.cancel(),this.Jn=null)}get started(){return this.Jn!==null}Yn(e){V("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ln(t)?V("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await un(t)}await this.Yn(3e5)})}}class Qg{constructor(e,t){this.Zn=e,this.params=t}calculateTargetCount(e,t){return this.Zn.Xn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return S.resolve(ci.oe);const r=new Gg(t);return this.Zn.forEachTarget(e,i=>r.Hn(i.sequenceNumber)).next(()=>this.Zn.er(e,i=>r.Hn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Zn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Zn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(dc)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),dc):this.tr(e,t))}getCacheSize(e){return this.Zn.getCacheSize(e)}tr(e,t){let r,i,o,a,u,h,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(T=>(T>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${T}`),i=this.params.maximumSequenceNumbersToCollect):i=T,a=Date.now(),this.nthSequenceNumber(e,i))).next(T=>(r=T,u=Date.now(),this.removeTargets(e,r,t))).next(T=>(o=T,h=Date.now(),this.removeOrphanedDocuments(e,r))).next(T=>(d=Date.now(),$t()<=B.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${T} documents in `+(d-h)+`ms
Total Duration: ${d-p}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:o,documentsRemoved:T})))}}function Jg(n,e){return new Qg(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(){this.changes=new Mt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Fn(r.mutation,i,Ve.empty(),oe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,j()).next(()=>r))}getLocalViewOfDocuments(e,t,r=j()){const i=bt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(o=>{let a=Dn();return o.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=bt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,j()))}populateOverlays(e,t,r){const i=[];return r.forEach(o=>{t.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(e,i).next(o=>{o.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,i){let o=Xe();const a=Un(),u=function(){return Un()}();return t.forEach((h,d)=>{const p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof xt)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Fn(p.mutation,d,p.mutation.getFieldMask(),oe.now())):a.set(d.key,Ve.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var T;return u.set(d,new Xg(p,(T=a.get(d))!==null&&T!==void 0?T:null))}),u))}recalculateAndSaveOverlays(e,t){const r=Un();let i=new X((a,u)=>a-u),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const u of a)u.keys().forEach(h=>{const d=t.get(h);if(d===null)return;let p=r.get(h)||Ve.empty();p=u.applyToLocalView(d,p),r.set(h,p);const T=(i.get(u.batchId)||j()).add(h);i=i.insert(u.batchId,T)})}).next(()=>{const a=[],u=i.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),d=h.key,p=h.value,T=$u();p.forEach(R=>{if(!o.has(R)){const C=Qu(t.get(R),r.get(R));C!==null&&T.set(R,C),o=o.add(R)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,T))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ng(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(o=>{const a=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):S.resolve(bt());let u=-1,h=o;return a.next(d=>S.forEach(d,(p,T)=>(u<T.largestBatchId&&(u=T.largestBatchId),o.get(p)?S.resolve():this.remoteDocumentCache.getEntry(e,p).next(R=>{h=h.insert(p,R)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,h,d,j())).next(p=>({batchId:u,changes:qu(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let i=Dn();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const o=t.collectionGroup;let a=Dn();return this.indexManager.getCollectionParents(e,o).next(u=>S.forEach(u,h=>{const d=function(T,R){return new hi(R,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((T,R)=>{a=a.insert(T,R)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i))).next(a=>{o.forEach((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,ve.newInvalidDocument(p)))});let u=Dn();return a.forEach((h,d)=>{const p=o.get(h);p!==void 0&&Fn(p.mutation,d,Ve.empty(),oe.now()),fi(t,d)&&(u=u.insert(h,d))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e){this.serializer=e,this.Tr=new Map,this.Ir=new Map}getBundleMetadata(e,t){return S.resolve(this.Tr.get(t))}saveBundleMetadata(e,t){return this.Tr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ue(i.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Ir.get(t))}saveNamedQuery(e,t){return this.Ir.set(t.name,function(i){return{name:i.name,query:zg(i.bundledQuery),readTime:Ue(i.readTime)}}(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{constructor(){this.overlays=new X(L.comparator),this.dr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=bt();return S.forEach(t,i=>this.getOverlay(e,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,o)=>{this.Tt(e,t,o)}),S.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.dr.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.dr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const i=bt(),o=t.length+1,a=new L(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return S.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new X((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=o.get(d.largestBatchId);p===null&&(p=bt(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const u=bt(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>u.set(d,p)),!(u.size()>=i)););return S.resolve(u)}Tt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.dr.get(i.largestBatchId).delete(r.key);this.dr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Eg(t,r));let o=this.dr.get(t);o===void 0&&(o=j(),this.dr.set(t,o)),this.dr.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(){this.Er=new ae(ce.Ar),this.Rr=new ae(ce.Vr)}isEmpty(){return this.Er.isEmpty()}addReference(e,t){const r=new ce(e,t);this.Er=this.Er.add(r),this.Rr=this.Rr.add(r)}mr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.gr(new ce(e,t))}pr(e,t){e.forEach(r=>this.removeReference(r,t))}yr(e){const t=new L(new Y([])),r=new ce(t,e),i=new ce(t,e+1),o=[];return this.Rr.forEachInRange([r,i],a=>{this.gr(a),o.push(a.key)}),o}wr(){this.Er.forEach(e=>this.gr(e))}gr(e){this.Er=this.Er.delete(e),this.Rr=this.Rr.delete(e)}Sr(e){const t=new L(new Y([])),r=new ce(t,e),i=new ce(t,e+1);let o=j();return this.Rr.forEachInRange([r,i],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new ce(e,0),r=this.Er.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ce{constructor(e,t){this.key=e,this.br=t}static Ar(e,t){return L.comparator(e.key,t.key)||q(e.br,t.br)}static Vr(e,t){return q(e.br,t.br)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Dr=1,this.vr=new ae(ce.Ar)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const o=this.Dr;this.Dr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new vg(o,t,r,i);this.mutationQueue.push(a);for(const u of i)this.vr=this.vr.add(new ce(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Cr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Fr(r),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Dr-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ce(t,0),i=new ce(t,Number.POSITIVE_INFINITY),o=[];return this.vr.forEachInRange([r,i],a=>{const u=this.Cr(a.br);o.push(u)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ae(q);return t.forEach(i=>{const o=new ce(i,0),a=new ce(i,Number.POSITIVE_INFINITY);this.vr.forEachInRange([o,a],u=>{r=r.add(u.br)})}),S.resolve(this.Mr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let o=r;L.isDocumentKey(o)||(o=o.child(""));const a=new ce(new L(o),0);let u=new ae(q);return this.vr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(u=u.add(h.br)),!0)},a),S.resolve(this.Mr(u))}Mr(e){const t=[];return e.forEach(r=>{const i=this.Cr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){K(this.Or(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.vr;return S.forEach(t.mutations,i=>{const o=new ce(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.vr=r})}Bn(e){}containsKey(e,t){const r=new ce(t,0),i=this.vr.firstAfterOrEqual(r);return S.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}Or(e,t){return this.Fr(e)}Fr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Cr(e){const t=this.Fr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e){this.Nr=e,this.docs=function(){return new X(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),o=i?i.size:0,a=this.Nr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():ve.newInvalidDocument(t))}getEntries(e,t){let r=Xe();return t.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():ve.newInvalidDocument(i))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=Xe();const a=t.path,u=new L(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Om(Nm(p),r)<=0||(i.has(p.key)||fi(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,i){x()}Br(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new s_(this)}getSize(e){return S.resolve(this.size)}}class s_ extends Yg{constructor(e){super(),this.hr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.hr.addEntry(e,i)):this.hr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.hr.getEntry(e,t)}getAllFromCache(e,t){return this.hr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(e){this.persistence=e,this.Lr=new Mt(t=>qs(t),$s),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.kr=0,this.qr=new Js,this.targetCount=0,this.Qr=nn.qn()}forEachTarget(e,t){return this.Lr.forEach((r,i)=>t(i)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.kr)}allocateTargetId(e){return this.highestTargetId=this.Qr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.kr&&(this.kr=t),S.resolve()}Un(e){this.Lr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Qr=new nn(t),this.highestTargetId=t),e.sequenceNumber>this.kr&&(this.kr=e.sequenceNumber)}addTargetData(e,t){return this.Un(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.Un(t),S.resolve()}removeTargetData(e,t){return this.Lr.delete(t.target),this.qr.yr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let i=0;const o=[];return this.Lr.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Lr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),S.waitFor(o).next(()=>i)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.Lr.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.qr.mr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.qr.pr(t,r);const i=this.persistence.referenceDelegate,o=[];return i&&t.forEach(a=>{o.push(i.markPotentiallyOrphaned(e,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.qr.yr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.qr.Sr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.qr.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e,t){this.Kr={},this.overlays={},this.$r=new ci(0),this.Ur=!1,this.Ur=!0,this.Wr=new n_,this.referenceDelegate=e(this),this.Gr=new o_(this),this.indexManager=new Wg,this.remoteDocumentCache=function(i){return new i_(i)}(r=>this.referenceDelegate.zr(r)),this.serializer=new $g(t),this.jr=new e_(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Ur=!1,Promise.resolve()}get started(){return this.Ur}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new t_,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.Kr[e.toKey()];return r||(r=new r_(t,this.referenceDelegate),this.Kr[e.toKey()]=r),r}getGlobalsCache(){return this.Wr}getTargetCache(){return this.Gr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.jr}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const i=new a_(this.$r.next());return this.referenceDelegate.Hr(),r(i).next(o=>this.referenceDelegate.Jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Yr(e,t){return S.or(Object.values(this.Kr).map(r=>()=>r.containsKey(e,t)))}}class a_ extends Mm{constructor(e){super(),this.currentSequenceNumber=e}}class Ys{constructor(e){this.persistence=e,this.Zr=new Js,this.Xr=null}static ei(e){return new Ys(e)}get ti(){if(this.Xr)return this.Xr;throw x()}addReference(e,t,r){return this.Zr.addReference(r,t),this.ti.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Zr.removeReference(r,t),this.ti.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.ti.add(t.toString()),S.resolve()}removeTarget(e,t){this.Zr.yr(t.targetId).forEach(i=>this.ti.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(o=>this.ti.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}Hr(){this.Xr=new Set}Jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.ti,r=>{const i=L.fromPath(r);return this.ni(e,i).next(o=>{o||t.removeEntry(i,U.min())})}).next(()=>(this.Xr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ni(e,t).next(r=>{r?this.ti.delete(t.toString()):this.ti.add(t.toString())})}zr(e){return 0}ni(e,t){return S.or([()=>S.resolve(this.Zr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Yr(e,t)])}}class ei{constructor(e,t){this.persistence=e,this.ri=new Mt(r=>Fm(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Jg(this,t)}static ei(e,t){return new ei(e,t)}Hr(){}Jr(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Xn(e){const t=this.nr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}nr(e){let t=0;return this.er(e,r=>{t++}).next(()=>t)}er(e,t){return S.forEach(this.ri,(r,i)=>this.ir(e,r,i).next(o=>o?S.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),o=i.newChangeBuffer();return i.Br(e,a=>this.ir(e,a,t).next(u=>{u||(r++,o.removeEntry(a,U.min()))})).next(()=>o.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.ri.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ri.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.ri.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.ri.set(t,e.currentSequenceNumber),S.resolve()}zr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Or(e.data.value)),t}ir(e,t,r){return S.or([()=>this.persistence.Yr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ri.get(t);return S.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Wi=r,this.Gi=i}static zi(e,t){let r=j(),i=j();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Xs(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(){this.ji=!1,this.Hi=!1,this.Ji=100,this.Yi=function(){return $h()?8:xm(Ee())>0?6:4}()}initialize(e,t){this.Zi=e,this.indexManager=t,this.ji=!0}getDocumentsMatchingQuery(e,t,r,i){const o={result:null};return this.Xi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.es(e,t,i,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new c_;return this.ts(e,t,a).next(u=>{if(o.result=u,this.Hi)return this.ns(e,t,a,u.size)})}).next(()=>o.result)}ns(e,t,r,i){return r.documentReadCount<this.Ji?($t()<=B.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",zt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ji,"documents"),S.resolve()):($t()<=B.DEBUG&&V("QueryEngine","Query:",zt(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Yi*i?($t()<=B.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",zt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Me(t))):S.resolve())}Xi(e,t){if(nc(t))return S.resolve(null);let r=Me(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=gs(t,null,"F"),r=Me(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=j(...o);return this.Zi.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(h=>{const d=this.rs(t,u);return this.ss(t,d,a,h.readTime)?this.Xi(e,gs(t,null,"F")):this.os(e,d,t,h)}))})))}es(e,t,r,i){return nc(t)||i.isEqual(U.min())?S.resolve(null):this.Zi.getDocuments(e,r).next(o=>{const a=this.rs(t,o);return this.ss(t,a,r,i)?S.resolve(null):($t()<=B.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),zt(t)),this.os(e,a,t,Dm(i,-1)).next(u=>u))})}rs(e,t){let r=new ae(Bu(e));return t.forEach((i,o)=>{fi(e,o)&&(r=r.add(o))}),r}ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}ts(e,t,r){return $t()<=B.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",zt(t)),this.Zi.getDocumentsMatchingQuery(e,t,_t.min(),r)}os(e,t,r,i){return this.Zi.getDocumentsMatchingQuery(e,r,i).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e,t,r,i){this.persistence=e,this._s=t,this.serializer=i,this.us=new X(q),this.cs=new Mt(o=>qs(o),$s),this.ls=new Map,this.hs=e.getRemoteDocumentCache(),this.Gr=e.getTargetCache(),this.jr=e.getBundleCache(),this.Ps(r)}Ps(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Zg(this.hs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.hs.setIndexManager(this.indexManager),this._s.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.us))}}function h_(n,e,t,r){return new l_(n,e,t,r)}async function cl(n,e){const t=F(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,t.Ps(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],u=[];let h=j();for(const d of i){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){u.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(r,h).next(d=>({Ts:d,removedBatchIds:a,addedBatchIds:u}))})})}function d_(n,e){const t=F(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),o=t.hs.newChangeBuffer({trackRemovals:!0});return function(u,h,d,p){const T=d.batch,R=T.keys();let C=S.resolve();return R.forEach(D=>{C=C.next(()=>p.getEntry(h,D)).next(O=>{const k=d.docVersions.get(D);K(k!==null),O.version.compareTo(k)<0&&(T.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),p.addEntry(O)))})}),C.next(()=>u.mutationQueue.removeMutationBatch(h,T))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=j();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(h=h.add(u.batch.mutations[d].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function ul(n){const e=F(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Gr.getLastRemoteSnapshotVersion(t))}function f_(n,e){const t=F(n),r=e.snapshotVersion;let i=t.us;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.hs.newChangeBuffer({trackRemovals:!0});i=t.us;const u=[];e.targetChanges.forEach((p,T)=>{const R=i.get(T);if(!R)return;u.push(t.Gr.removeMatchingKeys(o,p.removedDocuments,T).next(()=>t.Gr.addMatchingKeys(o,p.addedDocuments,T)));let C=R.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(T)!==null?C=C.withResumeToken(de.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(p.resumeToken,r)),i=i.insert(T,C),function(O,k,W){return O.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=3e8?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(R,C,p)&&u.push(t.Gr.updateTargetData(o,C))});let h=Xe(),d=j();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(o,p))}),u.push(p_(o,a,e.documentUpdates).next(p=>{h=p.Is,d=p.ds})),!r.isEqual(U.min())){const p=t.Gr.getLastRemoteSnapshotVersion(o).next(T=>t.Gr.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(p)}return S.waitFor(u).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(t.us=i,o))}function p_(n,e,t){let r=j(),i=j();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=Xe();return t.forEach((u,h)=>{const d=o.get(u);h.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),h.isNoDocument()&&h.version.isEqual(U.min())?(e.removeEntry(u,h.readTime),a=a.insert(u,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(u,h)):V("LocalStore","Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",h.version)}),{Is:a,ds:i}})}function m_(n,e){const t=F(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function g_(n,e){const t=F(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Gr.getTargetData(r,e).next(o=>o?(i=o,S.resolve(i)):t.Gr.allocateTargetId(r).next(a=>(i=new ht(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Gr.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.us.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.us=t.us.insert(r.targetId,r),t.cs.set(e,r.targetId)),r})}async function Ts(n,e,t){const r=F(n),i=r.us.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!ln(a))throw a;V("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.us=r.us.remove(e),r.cs.delete(i.target)}function pc(n,e,t){const r=F(n);let i=U.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,p){const T=F(h),R=T.cs.get(p);return R!==void 0?S.resolve(T.us.get(R)):T.Gr.getTargetData(d,p)}(r,a,Me(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.Gr.getMatchingKeysForTargetId(a,u.targetId).next(h=>{o=h})}).next(()=>r._s.getDocumentsMatchingQuery(a,e,t?i:U.min(),t?o:j())).next(u=>(__(r,ig(e),u),{documents:u,Es:o})))}function __(n,e,t){let r=n.ls.get(e)||U.min();t.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.ls.set(e,r)}class mc{constructor(){this.activeTargetIds=lg()}ps(e){this.activeTargetIds=this.activeTargetIds.add(e)}ys(e){this.activeTargetIds=this.activeTargetIds.delete(e)}gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class y_{constructor(){this._o=new mc,this.ao={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this._o.ps(e),this.ao[e]||"not-current"}updateQueryState(e,t,r){this.ao[e]=t}removeLocalQueryTarget(e){this._o.ys(e)}isLocalQueryTarget(e){return this._o.activeTargetIds.has(e)}clearQueryState(e){delete this.ao[e]}getAllActiveQueryTargets(){return this._o.activeTargetIds}isActiveQueryTarget(e){return this._o.activeTargetIds.has(e)}start(){return this._o=new mc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{uo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(){this.co=()=>this.lo(),this.ho=()=>this.Po(),this.To=[],this.Io()}uo(e){this.To.push(e)}shutdown(){window.removeEventListener("online",this.co),window.removeEventListener("offline",this.ho)}Io(){window.addEventListener("online",this.co),window.addEventListener("offline",this.ho)}lo(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.To)e(0)}Po(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.To)e(1)}static p(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cr=null;function es(){return Cr===null?Cr=function(){return 268435456+Math.round(2147483648*Math.random())}():Cr++,"0x"+Cr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(e){this.Eo=e.Eo,this.Ao=e.Ao}Ro(e){this.Vo=e}mo(e){this.fo=e}po(e){this.yo=e}onMessage(e){this.wo=e}close(){this.Ao()}send(e){this.Eo(e)}So(){this.Vo()}bo(){this.fo()}Do(e){this.yo(e)}vo(e){this.wo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e="WebChannelConnection";class I_ extends class{get Co(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Fo=r+"://"+t.host,this.Mo=`projects/${i}/databases/${o}`,this.xo=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}Oo(t,r,i,o,a){const u=es(),h=this.No(t,r.toUriEncodedString());V("RestConnection",`Sending RPC '${t}' ${u}:`,h,i);const d={"google-cloud-resource-prefix":this.Mo,"x-goog-request-params":this.xo};return this.Bo(d,o,a),this.Lo(t,h,d,i).then(p=>(V("RestConnection",`Received RPC '${t}' ${u}: `,p),p),p=>{throw Xt("RestConnection",`RPC '${t}' ${u} failed with error: `,p,"url: ",h,"request:",i),p})}ko(t,r,i,o,a,u){return this.Oo(t,r,i,o,a)}Bo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+cn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>t[a]=o),i&&i.headers.forEach((o,a)=>t[a]=o)}No(t,r){const i=E_[t];return`${this.Fo}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Lo(e,t,r,i){const o=es();return new Promise((a,u)=>{const h=new wu;h.setWithCredentials(!0),h.listenOnce(Au.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Nr.NO_ERROR:const p=h.getResponseJson();V(_e,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),a(p);break;case Nr.TIMEOUT:V(_e,`RPC '${e}' ${o} timed out`),u(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case Nr.HTTP_ERROR:const T=h.getStatus();if(V(_e,`RPC '${e}' ${o} failed with status:`,T,"response text:",h.getResponseText()),T>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R==null?void 0:R.error;if(C&&C.status&&C.message){const D=function(k){const W=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(W)>=0?W:P.UNKNOWN}(C.status);u(new N(D,C.message))}else u(new N(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new N(P.UNAVAILABLE,"Connection failed."));break;default:x()}}finally{V(_e,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);V(_e,`RPC '${e}' ${o} sending request:`,i),h.send(t,"POST",d,r,15)})}qo(e,t,r){const i=es(),o=[this.Fo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Pu(),u=Su(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Bo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const p=o.join("");V(_e,`Creating RPC '${e}' stream ${i}: ${p}`,h);const T=a.createWebChannel(p,h);let R=!1,C=!1;const D=new T_({Eo:k=>{C?V(_e,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(R||(V(_e,`Opening RPC '${e}' stream ${i} transport.`),T.open(),R=!0),V(_e,`RPC '${e}' stream ${i} sending:`,k),T.send(k))},Ao:()=>T.close()}),O=(k,W,H)=>{k.listen(W,G=>{try{H(G)}catch(ee){setTimeout(()=>{throw ee},0)}})};return O(T,Vn.EventType.OPEN,()=>{C||(V(_e,`RPC '${e}' stream ${i} transport opened.`),D.So())}),O(T,Vn.EventType.CLOSE,()=>{C||(C=!0,V(_e,`RPC '${e}' stream ${i} transport closed`),D.Do())}),O(T,Vn.EventType.ERROR,k=>{C||(C=!0,Xt(_e,`RPC '${e}' stream ${i} transport errored:`,k),D.Do(new N(P.UNAVAILABLE,"The operation could not be completed")))}),O(T,Vn.EventType.MESSAGE,k=>{var W;if(!C){const H=k.data[0];K(!!H);const G=H,ee=(G==null?void 0:G.error)||((W=G[0])===null||W===void 0?void 0:W.error);if(ee){V(_e,`RPC '${e}' stream ${i} received error:`,ee);const Se=ee.status;let te=function(_){const y=re[_];if(y!==void 0)return Yu(y)}(Se),v=ee.message;te===void 0&&(te=P.INTERNAL,v="Unknown error status: "+Se+" with message "+ee.message),C=!0,D.Do(new N(te,v)),T.close()}else V(_e,`RPC '${e}' stream ${i} received:`,H),D.vo(H)}}),O(u,Ru.STAT_EVENT,k=>{k.stat===hs.PROXY?V(_e,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===hs.NOPROXY&&V(_e,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.bo()},0),D}}function ts(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n){return new bg(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e,t,r=1e3,i=1.5,o=6e4){this.li=e,this.timerId=t,this.Qo=r,this.Ko=i,this.$o=o,this.Uo=0,this.Wo=null,this.Go=Date.now(),this.reset()}reset(){this.Uo=0}zo(){this.Uo=this.$o}jo(e){this.cancel();const t=Math.floor(this.Uo+this.Ho()),r=Math.max(0,Date.now()-this.Go),i=Math.max(0,t-r);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Uo} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Wo=this.li.enqueueAfterDelay(this.timerId,i,()=>(this.Go=Date.now(),e())),this.Uo*=this.Ko,this.Uo<this.Qo&&(this.Uo=this.Qo),this.Uo>this.$o&&(this.Uo=this.$o)}Jo(){this.Wo!==null&&(this.Wo.skipDelay(),this.Wo=null)}cancel(){this.Wo!==null&&(this.Wo.cancel(),this.Wo=null)}Ho(){return(Math.random()-.5)*this.Uo}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(e,t,r,i,o,a,u,h){this.li=e,this.Yo=r,this.Zo=i,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.Xo=0,this.e_=null,this.t_=null,this.stream=null,this.n_=0,this.r_=new ll(e,t)}i_(){return this.state===1||this.state===5||this.s_()}s_(){return this.state===2||this.state===3}start(){this.n_=0,this.state!==4?this.auth():this.o_()}async stop(){this.i_()&&await this.close(0)}__(){this.state=0,this.r_.reset()}a_(){this.s_()&&this.e_===null&&(this.e_=this.li.enqueueAfterDelay(this.Yo,6e4,()=>this.u_()))}c_(e){this.l_(),this.stream.send(e)}async u_(){if(this.s_())return this.close(0)}l_(){this.e_&&(this.e_.cancel(),this.e_=null)}h_(){this.t_&&(this.t_.cancel(),this.t_=null)}async close(e,t){this.l_(),this.h_(),this.r_.cancel(),this.Xo++,e!==4?this.r_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Ye(t.toString()),Ye("Using maximum backoff delay to prevent overloading the backend."),this.r_.zo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.P_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.po(t)}P_(){}auth(){this.state=1;const e=this.T_(this.Xo),t=this.Xo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Xo===t&&this.I_(r,i)},r=>{e(()=>{const i=new N(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.d_(i)})})}I_(e,t){const r=this.T_(this.Xo);this.stream=this.E_(e,t),this.stream.Ro(()=>{r(()=>this.listener.Ro())}),this.stream.mo(()=>{r(()=>(this.state=2,this.t_=this.li.enqueueAfterDelay(this.Zo,1e4,()=>(this.s_()&&(this.state=3),Promise.resolve())),this.listener.mo()))}),this.stream.po(i=>{r(()=>this.d_(i))}),this.stream.onMessage(i=>{r(()=>++this.n_==1?this.A_(i):this.onNext(i))})}o_(){this.state=5,this.r_.jo(async()=>{this.state=0,this.start()})}d_(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}T_(e){return t=>{this.li.enqueueAndForget(()=>this.Xo===e?t():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class w_ extends hl{constructor(e,t,r,i,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}E_(e,t){return this.connection.qo("Listen",e,t)}A_(e){return this.onNext(e)}onNext(e){this.r_.reset();const t=Dg(this.serializer,e),r=function(o){if(!("targetChange"in o))return U.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Ue(a.readTime):U.min()}(e);return this.listener.R_(t,r)}V_(e){const t={};t.database=Es(this.serializer),t.addTarget=function(o,a){let u;const h=a.target;if(u=ms(h)?{documents:Lg(o,h)}:{query:Mg(o,h).ct},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=el(o,a.resumeToken);const d=_s(o,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(U.min())>0){u.readTime=Zr(o,a.snapshotVersion.toTimestamp());const d=_s(o,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);const r=Ug(this.serializer,e);r&&(t.labels=r),this.c_(t)}m_(e){const t={};t.database=Es(this.serializer),t.removeTarget=e,this.c_(t)}}class A_ extends hl{constructor(e,t,r,i,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=o}get f_(){return this.n_>0}start(){this.lastStreamToken=void 0,super.start()}P_(){this.f_&&this.g_([])}E_(e,t){return this.connection.qo("Write",e,t)}A_(e){return K(!!e.streamToken),this.lastStreamToken=e.streamToken,K(!e.writeResults||e.writeResults.length===0),this.listener.p_()}onNext(e){K(!!e.streamToken),this.lastStreamToken=e.streamToken,this.r_.reset();const t=Og(e.writeResults,e.commitTime),r=Ue(e.commitTime);return this.listener.y_(r,t)}w_(){const e={};e.database=Es(this.serializer),this.c_(e)}g_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Ng(this.serializer,r))};this.c_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R_ extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.S_=!1}b_(){if(this.S_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Oo(e,t,r,i){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Oo(e,ys(t,r),i,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}ko(e,t,r,i,o){return this.b_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.ko(e,ys(t,r),i,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(P.UNKNOWN,a.toString())})}terminate(){this.S_=!0,this.connection.terminate()}}class S_{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.D_=0,this.v_=null,this.C_=!0}F_(){this.D_===0&&(this.M_("Unknown"),this.v_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.v_=null,this.x_("Backend didn't respond within 10 seconds."),this.M_("Offline"),Promise.resolve())))}O_(e){this.state==="Online"?this.M_("Unknown"):(this.D_++,this.D_>=1&&(this.N_(),this.x_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.M_("Offline")))}set(e){this.N_(),this.D_=0,e==="Online"&&(this.C_=!1),this.M_(e)}M_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}x_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.C_?(Ye(t),this.C_=!1):V("OnlineStateTracker",t)}N_(){this.v_!==null&&(this.v_.cancel(),this.v_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.B_=[],this.L_=new Map,this.k_=new Set,this.q_=[],this.Q_=o,this.Q_.uo(a=>{r.enqueueAndForget(async()=>{Ut(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await async function(h){const d=F(h);d.k_.add(4),await tr(d),d.K_.set("Unknown"),d.k_.delete(4),await yi(d)}(this))})}),this.K_=new S_(r,i)}}async function yi(n){if(Ut(n))for(const e of n.q_)await e(!0)}async function tr(n){for(const e of n.q_)await e(!1)}function dl(n,e){const t=F(n);t.L_.has(e.targetId)||(t.L_.set(e.targetId,e),no(t)?to(t):hn(t).s_()&&eo(t,e))}function Zs(n,e){const t=F(n),r=hn(t);t.L_.delete(e),r.s_()&&fl(t,e),t.L_.size===0&&(r.s_()?r.a_():Ut(t)&&t.K_.set("Unknown"))}function eo(n,e){if(n.U_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}hn(n).V_(e)}function fl(n,e){n.U_.xe(e),hn(n).m_(e)}function to(n){n.U_=new Rg({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ut:e=>n.L_.get(e)||null,nt:()=>n.datastore.serializer.databaseId}),hn(n).start(),n.K_.F_()}function no(n){return Ut(n)&&!hn(n).i_()&&n.L_.size>0}function Ut(n){return F(n).k_.size===0}function pl(n){n.U_=void 0}async function C_(n){n.K_.set("Online")}async function b_(n){n.L_.forEach((e,t)=>{eo(n,e)})}async function k_(n,e){pl(n),no(n)?(n.K_.O_(e),to(n)):n.K_.set("Unknown")}async function V_(n,e,t){if(n.K_.set("Online"),e instanceof Zu&&e.state===2&&e.cause)try{await async function(i,o){const a=o.cause;for(const u of o.targetIds)i.L_.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.L_.delete(u),i.U_.removeTarget(u))}(n,e)}catch(r){V("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ti(n,r)}else if(e instanceof xr?n.U_.$e(e):e instanceof Xu?n.U_.Je(e):n.U_.Ge(e),!t.isEqual(U.min()))try{const r=await ul(n.localStore);t.compareTo(r)>=0&&await function(o,a){const u=o.U_.it(a);return u.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.L_.get(d);p&&o.L_.set(d,p.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,d)=>{const p=o.L_.get(h);if(!p)return;o.L_.set(h,p.withResumeToken(de.EMPTY_BYTE_STRING,p.snapshotVersion)),fl(o,h);const T=new ht(p.target,h,d,p.sequenceNumber);eo(o,T)}),o.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){V("RemoteStore","Failed to raise snapshot:",r),await ti(n,r)}}async function ti(n,e,t){if(!ln(e))throw e;n.k_.add(1),await tr(n),n.K_.set("Offline"),t||(t=()=>ul(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V("RemoteStore","Retrying IndexedDB access"),await t(),n.k_.delete(1),await yi(n)})}function ml(n,e){return e().catch(t=>ti(n,t,e))}async function vi(n){const e=F(n),t=Tt(e);let r=e.B_.length>0?e.B_[e.B_.length-1].batchId:-1;for(;D_(e);)try{const i=await m_(e.localStore,r);if(i===null){e.B_.length===0&&t.a_();break}r=i.batchId,N_(e,i)}catch(i){await ti(e,i)}gl(e)&&_l(e)}function D_(n){return Ut(n)&&n.B_.length<10}function N_(n,e){n.B_.push(e);const t=Tt(n);t.s_()&&t.f_&&t.g_(e.mutations)}function gl(n){return Ut(n)&&!Tt(n).i_()&&n.B_.length>0}function _l(n){Tt(n).start()}async function O_(n){Tt(n).w_()}async function L_(n){const e=Tt(n);for(const t of n.B_)e.g_(t.mutations)}async function M_(n,e,t){const r=n.B_.shift(),i=Gs.from(r,e,t);await ml(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await vi(n)}async function x_(n,e){e&&Tt(n).f_&&await async function(r,i){if(function(a){return Ig(a)&&a!==P.ABORTED}(i.code)){const o=r.B_.shift();Tt(r).__(),await ml(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await vi(r)}}(n,e),gl(n)&&_l(n)}async function _c(n,e){const t=F(n);t.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const r=Ut(t);t.k_.add(3),await tr(t),r&&t.K_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.k_.delete(3),await yi(t)}async function U_(n,e){const t=F(n);e?(t.k_.delete(2),await yi(t)):e||(t.k_.add(2),await tr(t),t.K_.set("Unknown"))}function hn(n){return n.W_||(n.W_=function(t,r,i){const o=F(t);return o.b_(),new w_(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Ro:C_.bind(null,n),mo:b_.bind(null,n),po:k_.bind(null,n),R_:V_.bind(null,n)}),n.q_.push(async e=>{e?(n.W_.__(),no(n)?to(n):n.K_.set("Unknown")):(await n.W_.stop(),pl(n))})),n.W_}function Tt(n){return n.G_||(n.G_=function(t,r,i){const o=F(t);return o.b_(),new A_(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Ro:()=>Promise.resolve(),mo:O_.bind(null,n),po:x_.bind(null,n),p_:L_.bind(null,n),y_:M_.bind(null,n)}),n.q_.push(async e=>{e?(n.G_.__(),await vi(n)):(await n.G_.stop(),n.B_.length>0&&(V("RemoteStore",`Stopping write stream with ${n.B_.length} pending writes`),n.B_=[]))})),n.G_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Ke,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){const a=Date.now()+r,u=new ro(e,t,a,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function io(n,e){if(Ye("AsyncQueue",`${e}: ${n}`),ln(n))return new N(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{static emptySet(e){return new Jt(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=Dn(),this.sortedSet=new X(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Jt)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Jt;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(){this.z_=new X(L.comparator)}track(e){const t=e.doc.key,r=this.z_.get(t);r?e.type!==0&&r.type===3?this.z_=this.z_.insert(t,e):e.type===3&&r.type!==1?this.z_=this.z_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.z_=this.z_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.z_=this.z_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.z_=this.z_.remove(t):e.type===1&&r.type===2?this.z_=this.z_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.z_=this.z_.insert(t,{type:2,doc:e.doc}):x():this.z_=this.z_.insert(t,e)}j_(){const e=[];return this.z_.inorderTraversal((t,r)=>{e.push(r)}),e}}class rn{constructor(e,t,r,i,o,a,u,h,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,o){const a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new rn(e,t,Jt.emptySet(t),a,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&di(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(){this.H_=void 0,this.J_=[]}Y_(){return this.J_.some(e=>e.Z_())}}class B_{constructor(){this.queries=vc(),this.onlineState="Unknown",this.X_=new Set}terminate(){(function(t,r){const i=F(t),o=i.queries;i.queries=vc(),o.forEach((a,u)=>{for(const h of u.J_)h.onError(r)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function vc(){return new Mt(n=>Fu(n),di)}async function yl(n,e){const t=F(n);let r=3;const i=e.query;let o=t.queries.get(i);o?!o.Y_()&&e.Z_()&&(r=2):(o=new F_,r=e.Z_()?0:1);try{switch(r){case 0:o.H_=await t.onListen(i,!0);break;case 1:o.H_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const u=io(a,`Initialization of query '${zt(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,o),o.J_.push(e),e.ea(t.onlineState),o.H_&&e.ta(o.H_)&&so(t)}async function vl(n,e){const t=F(n),r=e.query;let i=3;const o=t.queries.get(r);if(o){const a=o.J_.indexOf(e);a>=0&&(o.J_.splice(a,1),o.J_.length===0?i=e.Z_()?0:1:!o.Y_()&&e.Z_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function j_(n,e){const t=F(n);let r=!1;for(const i of e){const o=i.query,a=t.queries.get(o);if(a){for(const u of a.J_)u.ta(i)&&(r=!0);a.H_=i}}r&&so(t)}function q_(n,e,t){const r=F(n),i=r.queries.get(e);if(i)for(const o of i.J_)o.onError(t);r.queries.delete(e)}function so(n){n.X_.forEach(e=>{e.next()})}var Is,Ec;(Ec=Is||(Is={})).na="default",Ec.Cache="cache";class El{constructor(e,t,r){this.query=e,this.ra=t,this.ia=!1,this.sa=null,this.onlineState="Unknown",this.options=r||{}}ta(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new rn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ia?this.oa(e)&&(this.ra.next(e),t=!0):this._a(e,this.onlineState)&&(this.aa(e),t=!0),this.sa=e,t}onError(e){this.ra.error(e)}ea(e){this.onlineState=e;let t=!1;return this.sa&&!this.ia&&this._a(this.sa,e)&&(this.aa(this.sa),t=!0),t}_a(e,t){if(!e.fromCache||!this.Z_())return!0;const r=t!=="Offline";return(!this.options.ua||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}oa(e){if(e.docChanges.length>0)return!0;const t=this.sa&&this.sa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}aa(e){e=rn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ia=!0,this.ra.next(e)}Z_(){return this.options.source!==Is.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e){this.key=e}}class Il{constructor(e){this.key=e}}class $_{constructor(e,t){this.query=e,this.Ea=t,this.Aa=null,this.hasCachedResults=!1,this.current=!1,this.Ra=j(),this.mutatedKeys=j(),this.Va=Bu(e),this.ma=new Jt(this.Va)}get fa(){return this.Ea}ga(e,t){const r=t?t.pa:new yc,i=t?t.ma:this.ma;let o=t?t.mutatedKeys:this.mutatedKeys,a=i,u=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,T)=>{const R=i.get(p),C=fi(this.query,T)?T:null,D=!!R&&this.mutatedKeys.has(R.key),O=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let k=!1;R&&C?R.data.isEqual(C.data)?D!==O&&(r.track({type:3,doc:C}),k=!0):this.ya(R,C)||(r.track({type:2,doc:C}),k=!0,(h&&this.Va(C,h)>0||d&&this.Va(C,d)<0)&&(u=!0)):!R&&C?(r.track({type:0,doc:C}),k=!0):R&&!C&&(r.track({type:1,doc:R}),k=!0,(h||d)&&(u=!0)),k&&(C?(a=a.add(C),o=O?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{ma:a,pa:r,ss:u,mutatedKeys:o}}ya(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const o=this.ma;this.ma=e.ma,this.mutatedKeys=e.mutatedKeys;const a=e.pa.j_();a.sort((p,T)=>function(C,D){const O=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x()}};return O(C)-O(D)}(p.type,T.type)||this.Va(p.doc,T.doc)),this.wa(r),i=i!=null&&i;const u=t&&!i?this.Sa():[],h=this.Ra.size===0&&this.current&&!i?1:0,d=h!==this.Aa;return this.Aa=h,a.length!==0||d?{snapshot:new rn(this.query,e.ma,o,a,e.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),ba:u}:{ba:u}}ea(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ma:this.ma,pa:new yc,mutatedKeys:this.mutatedKeys,ss:!1},!1)):{ba:[]}}Da(e){return!this.Ea.has(e)&&!!this.ma.has(e)&&!this.ma.get(e).hasLocalMutations}wa(e){e&&(e.addedDocuments.forEach(t=>this.Ea=this.Ea.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ea=this.Ea.delete(t)),this.current=e.current)}Sa(){if(!this.current)return[];const e=this.Ra;this.Ra=j(),this.ma.forEach(r=>{this.Da(r.key)&&(this.Ra=this.Ra.add(r.key))});const t=[];return e.forEach(r=>{this.Ra.has(r)||t.push(new Il(r))}),this.Ra.forEach(r=>{e.has(r)||t.push(new Tl(r))}),t}va(e){this.Ea=e.Es,this.Ra=j();const t=this.ga(e.documents);return this.applyChanges(t,!0)}Ca(){return rn.fromInitialDocuments(this.query,this.ma,this.mutatedKeys,this.Aa===0,this.hasCachedResults)}}class z_{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class W_{constructor(e){this.key=e,this.Fa=!1}}class H_{constructor(e,t,r,i,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ma={},this.xa=new Mt(u=>Fu(u),di),this.Oa=new Map,this.Na=new Set,this.Ba=new X(L.comparator),this.La=new Map,this.ka=new Js,this.qa={},this.Qa=new Map,this.Ka=nn.Qn(),this.onlineState="Unknown",this.$a=void 0}get isPrimaryClient(){return this.$a===!0}}async function G_(n,e,t=!0){const r=Cl(n);let i;const o=r.xa.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.Ca()):i=await wl(r,e,t,!0),i}async function K_(n,e){const t=Cl(n);await wl(t,e,!0,!1)}async function wl(n,e,t,r){const i=await g_(n.localStore,Me(e)),o=i.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let u;return r&&(u=await Q_(n,e,o,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&dl(n.remoteStore,i),u}async function Q_(n,e,t,r,i){n.Ua=(T,R,C)=>async function(O,k,W,H){let G=k.view.ga(W);G.ss&&(G=await pc(O.localStore,k.query,!1).then(({documents:v})=>k.view.ga(v,G)));const ee=H&&H.targetChanges.get(k.targetId),Se=H&&H.targetMismatches.get(k.targetId)!=null,te=k.view.applyChanges(G,O.isPrimaryClient,ee,Se);return Ic(O,k.targetId,te.ba),te.snapshot}(n,T,R,C);const o=await pc(n.localStore,e,!0),a=new $_(e,o.Es),u=a.ga(o.documents),h=er.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(u,n.isPrimaryClient,h);Ic(n,t,d.ba);const p=new z_(e,t,a);return n.xa.set(e,p),n.Oa.has(t)?n.Oa.get(t).push(e):n.Oa.set(t,[e]),d.snapshot}async function J_(n,e,t){const r=F(n),i=r.xa.get(e),o=r.Oa.get(i.targetId);if(o.length>1)return r.Oa.set(i.targetId,o.filter(a=>!di(a,e))),void r.xa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ts(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Zs(r.remoteStore,i.targetId),ws(r,i.targetId)}).catch(un)):(ws(r,i.targetId),await Ts(r.localStore,i.targetId,!0))}async function Y_(n,e){const t=F(n),r=t.xa.get(e),i=t.Oa.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Zs(t.remoteStore,r.targetId))}async function X_(n,e,t){const r=sy(n);try{const i=await function(a,u){const h=F(a),d=oe.now(),p=u.reduce((C,D)=>C.add(D.key),j());let T,R;return h.persistence.runTransaction("Locally write mutations","readwrite",C=>{let D=Xe(),O=j();return h.hs.getEntries(C,p).next(k=>{D=k,D.forEach((W,H)=>{H.isValidDocument()||(O=O.add(W))})}).next(()=>h.localDocuments.getOverlayedDocuments(C,D)).next(k=>{T=k;const W=[];for(const H of u){const G=_g(H,T.get(H.key).overlayedDocument);G!=null&&W.push(new xt(H.key,G,Du(G.value.mapValue),xe.exists(!0)))}return h.mutationQueue.addMutationBatch(C,d,W,u)}).next(k=>{R=k;const W=k.applyToLocalDocumentSet(T,O);return h.documentOverlayCache.saveOverlays(C,k.batchId,W)})}).then(()=>({batchId:R.batchId,changes:qu(T)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,u,h){let d=a.qa[a.currentUser.toKey()];d||(d=new X(q)),d=d.insert(u,h),a.qa[a.currentUser.toKey()]=d}(r,i.batchId,t),await nr(r,i.changes),await vi(r.remoteStore)}catch(i){const o=io(i,"Failed to persist write");t.reject(o)}}async function Al(n,e){const t=F(n);try{const r=await f_(t.localStore,e);e.targetChanges.forEach((i,o)=>{const a=t.La.get(o);a&&(K(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.Fa=!0:i.modifiedDocuments.size>0?K(a.Fa):i.removedDocuments.size>0&&(K(a.Fa),a.Fa=!1))}),await nr(t,r,e)}catch(r){await un(r)}}function Tc(n,e,t){const r=F(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.xa.forEach((o,a)=>{const u=a.view.ea(e);u.snapshot&&i.push(u.snapshot)}),function(a,u){const h=F(a);h.onlineState=u;let d=!1;h.queries.forEach((p,T)=>{for(const R of T.J_)R.ea(u)&&(d=!0)}),d&&so(h)}(r.eventManager,e),i.length&&r.Ma.R_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Z_(n,e,t){const r=F(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.La.get(e),o=i&&i.key;if(o){let a=new X(L.comparator);a=a.insert(o,ve.newNoDocument(o,U.min()));const u=j().add(o),h=new gi(U.min(),new Map,new X(q),a,u);await Al(r,h),r.Ba=r.Ba.remove(o),r.La.delete(e),oo(r)}else await Ts(r.localStore,e,!1).then(()=>ws(r,e,t)).catch(un)}async function ey(n,e){const t=F(n),r=e.batch.batchId;try{const i=await d_(t.localStore,e);Sl(t,r,null),Rl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await nr(t,i)}catch(i){await un(i)}}async function ty(n,e,t){const r=F(n);try{const i=await function(a,u){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return h.mutationQueue.lookupMutationBatch(d,u).next(T=>(K(T!==null),p=T.keys(),h.mutationQueue.removeMutationBatch(d,T))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>h.localDocuments.getDocuments(d,p))})}(r.localStore,e);Sl(r,e,t),Rl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await nr(r,i)}catch(i){await un(i)}}function Rl(n,e){(n.Qa.get(e)||[]).forEach(t=>{t.resolve()}),n.Qa.delete(e)}function Sl(n,e,t){const r=F(n);let i=r.qa[r.currentUser.toKey()];if(i){const o=i.get(e);o&&(t?o.reject(t):o.resolve(),i=i.remove(e)),r.qa[r.currentUser.toKey()]=i}}function ws(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Oa.get(e))n.xa.delete(r),t&&n.Ma.Wa(r,t);n.Oa.delete(e),n.isPrimaryClient&&n.ka.yr(e).forEach(r=>{n.ka.containsKey(r)||Pl(n,r)})}function Pl(n,e){n.Na.delete(e.path.canonicalString());const t=n.Ba.get(e);t!==null&&(Zs(n.remoteStore,t),n.Ba=n.Ba.remove(e),n.La.delete(t),oo(n))}function Ic(n,e,t){for(const r of t)r instanceof Tl?(n.ka.addReference(r.key,e),ny(n,r)):r instanceof Il?(V("SyncEngine","Document no longer in limbo: "+r.key),n.ka.removeReference(r.key,e),n.ka.containsKey(r.key)||Pl(n,r.key)):x()}function ny(n,e){const t=e.key,r=t.path.canonicalString();n.Ba.get(t)||n.Na.has(r)||(V("SyncEngine","New document in limbo: "+t),n.Na.add(r),oo(n))}function oo(n){for(;n.Na.size>0&&n.Ba.size<n.maxConcurrentLimboResolutions;){const e=n.Na.values().next().value;n.Na.delete(e);const t=new L(Y.fromString(e)),r=n.Ka.next();n.La.set(r,new W_(t)),n.Ba=n.Ba.insert(t,r),dl(n.remoteStore,new ht(Me(zs(t.path)),r,"TargetPurposeLimboResolution",ci.oe))}}async function nr(n,e,t){const r=F(n),i=[],o=[],a=[];r.xa.isEmpty()||(r.xa.forEach((u,h)=>{a.push(r.Ua(h,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const T=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(h.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(h.targetId,T?"current":"not-current")}if(d){i.push(d);const T=Xs.zi(h.targetId,d);o.push(T)}}))}),await Promise.all(a),r.Ma.R_(i),await async function(h,d){const p=F(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",T=>S.forEach(d,R=>S.forEach(R.Wi,C=>p.persistence.referenceDelegate.addReference(T,R.targetId,C)).next(()=>S.forEach(R.Gi,C=>p.persistence.referenceDelegate.removeReference(T,R.targetId,C)))))}catch(T){if(!ln(T))throw T;V("LocalStore","Failed to update sequence numbers: "+T)}for(const T of d){const R=T.targetId;if(!T.fromCache){const C=p.us.get(R),D=C.snapshotVersion,O=C.withLastLimboFreeSnapshotVersion(D);p.us=p.us.insert(R,O)}}}(r.localStore,o))}async function ry(n,e){const t=F(n);if(!t.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const r=await cl(t.localStore,e);t.currentUser=e,function(o,a){o.Qa.forEach(u=>{u.forEach(h=>{h.reject(new N(P.CANCELLED,a))})}),o.Qa.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await nr(t,r.Ts)}}function iy(n,e){const t=F(n),r=t.La.get(e);if(r&&r.Fa)return j().add(r.key);{let i=j();const o=t.Oa.get(e);if(!o)return i;for(const a of o){const u=t.xa.get(a);i=i.unionWith(u.view.fa)}return i}}function Cl(n){const e=F(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Al.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Z_.bind(null,e),e.Ma.R_=j_.bind(null,e.eventManager),e.Ma.Wa=q_.bind(null,e.eventManager),e}function sy(n){const e=F(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ey.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ty.bind(null,e),e}class ni{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=_i(e.databaseInfo.databaseId),this.sharedClientState=this.za(e),this.persistence=this.ja(e),await this.persistence.start(),this.localStore=this.Ha(e),this.gcScheduler=this.Ja(e,this.localStore),this.indexBackfillerScheduler=this.Ya(e,this.localStore)}Ja(e,t){return null}Ya(e,t){return null}Ha(e){return h_(this.persistence,new u_,e.initialUser,this.serializer)}ja(e){return new al(Ys.ei,this.serializer)}za(e){return new y_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ni.provider={build:()=>new ni};class oy extends ni{constructor(e){super(),this.cacheSizeBytes=e}Ja(e,t){K(this.persistence.referenceDelegate instanceof ei);const r=this.persistence.referenceDelegate.garbageCollector;return new Kg(r,e.asyncQueue,t)}ja(e){const t=this.cacheSizeBytes!==void 0?we.withCacheSize(this.cacheSizeBytes):we.DEFAULT;return new al(r=>ei.ei(r,t),this.serializer)}}class As{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Tc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ry.bind(null,this.syncEngine),await U_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new B_}()}createDatastore(e){const t=_i(e.databaseInfo.databaseId),r=function(o){return new I_(o)}(e.databaseInfo);return function(o,a,u,h){return new R_(o,a,u,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,o,a,u){return new P_(r,i,o,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Tc(this.syncEngine,t,0),function(){return gc.p()?new gc:new v_}())}createSyncEngine(e,t){return function(i,o,a,u,h,d,p){const T=new H_(i,o,a,u,h,d);return p&&(T.$a=!0),T}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const o=F(i);V("RemoteStore","RemoteStore shutting down."),o.k_.add(5),await tr(o),o.Q_.shutdown(),o.K_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}As.provider={build:()=>new As};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Xa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Xa(this.observer.error,e):Ye("Uncaught Error in snapshot listener:",e.toString()))}eu(){this.muted=!0}Xa(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ye.UNAUTHENTICATED,this.clientId=bu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{V("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(V("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ke;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=io(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ns(n,e){n.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await cl(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function wc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await cy(n);V("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>_c(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>_c(e.remoteStore,i)),n._onlineComponents=e}async function cy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await ns(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Xt("Error using user provided cache. Falling back to memory cache: "+t),await ns(n,new ni)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await ns(n,new oy(void 0));return n._offlineComponents}async function kl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await wc(n,n._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await wc(n,new As))),n._onlineComponents}function uy(n){return kl(n).then(e=>e.syncEngine)}async function Vl(n){const e=await kl(n),t=e.eventManager;return t.onListen=G_.bind(null,e.syncEngine),t.onUnlisten=J_.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=K_.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Y_.bind(null,e.syncEngine),t}function ly(n,e,t={}){const r=new Ke;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,d){const p=new bl({next:R=>{p.eu(),a.enqueueAndForget(()=>vl(o,T));const C=R.docs.has(u);!C&&R.fromCache?d.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&R.fromCache&&h&&h.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(R)},error:R=>d.reject(R)}),T=new El(zs(u.path),p,{includeMetadataChanges:!0,ua:!0});return yl(o,T)}(await Vl(n),n.asyncQueue,e,t,r)),r.promise}function hy(n,e,t={}){const r=new Ke;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,d){const p=new bl({next:R=>{p.eu(),a.enqueueAndForget(()=>vl(o,T)),R.fromCache&&h.source==="server"?d.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(R)},error:R=>d.reject(R)}),T=new El(u,p,{includeMetadataChanges:!0,ua:!0});return yl(o,T)}(await Vl(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(n,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function dy(n,e,t,r){if(e===!0&&r===!0)throw new N(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Rc(n){if(!L.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Sc(n){if(L.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ao(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":x()}function It(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ao(n);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}dy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Dl((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ei{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pc({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pc(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new wm;switch(r.type){case"firstParty":return new Pm(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Ac.get(t);r&&(V("ComponentProvider","Removing Datastore"),Ac.delete(t),r.terminate())}(this),Promise.resolve()}}function fy(n,e,t,r={}){var i;const o=(n=It(n,Ei))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&Xt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=ye.MOCK_USER;else{u=Mh(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const d=r.mockUserToken.sub||r.mockUserToken.user_id;if(!d)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new ye(d)}n._authCredentials=new Am(new Cu(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Ti(this.firestore,e,this._query)}}class Re{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new gt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Re(this.firestore,e,this._key)}}class gt extends Ti{constructor(e,t,r){super(e,t,zs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new L(e))}withConverter(e){return new gt(this.firestore,e,this._path)}}function Gy(n,e,...t){if(n=ie(n),Nl("collection","path",e),n instanceof Ei){const r=Y.fromString(e,...t);return Sc(r),new gt(n,null,r)}{if(!(n instanceof Re||n instanceof gt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Sc(r),new gt(n.firestore,null,r)}}function Ky(n,e,...t){if(n=ie(n),arguments.length===1&&(e=bu.newId()),Nl("doc","path",e),n instanceof Ei){const r=Y.fromString(e,...t);return Rc(r),new Re(n,null,new L(r))}{if(!(n instanceof Re||n instanceof gt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Rc(r),new Re(n.firestore,n instanceof gt?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e=Promise.resolve()){this.Iu=[],this.du=!1,this.Eu=[],this.Au=null,this.Ru=!1,this.Vu=!1,this.mu=[],this.r_=new ll(this,"async_queue_retry"),this.fu=()=>{const r=ts();r&&V("AsyncQueue","Visibility state changed to "+r.visibilityState),this.r_.Jo()},this.gu=e;const t=ts();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.fu)}get isShuttingDown(){return this.du}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.pu(),this.yu(e)}enterRestrictedMode(e){if(!this.du){this.du=!0,this.Vu=e||!1;const t=ts();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.fu)}}enqueue(e){if(this.pu(),this.du)return new Promise(()=>{});const t=new Ke;return this.yu(()=>this.du&&this.Vu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Iu.push(e),this.wu()))}async wu(){if(this.Iu.length!==0){try{await this.Iu[0](),this.Iu.shift(),this.r_.reset()}catch(e){if(!ln(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.Iu.length>0&&this.r_.jo(()=>this.wu())}}yu(e){const t=this.gu.then(()=>(this.Ru=!0,e().catch(r=>{this.Au=r,this.Ru=!1;const i=function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u}(r);throw Ye("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.Ru=!1,r))));return this.gu=t,t}enqueueAfterDelay(e,t,r){this.pu(),this.mu.indexOf(e)>-1&&(t=0);const i=ro.createAndSchedule(this,e,t,r,o=>this.Su(o));return this.Eu.push(i),i}pu(){this.Au&&x()}verifyOperationInProgress(){}async bu(){let e;do e=this.gu,await e;while(e!==this.gu)}Du(e){for(const t of this.Eu)if(t.timerId===e)return!0;return!1}vu(e){return this.bu().then(()=>{this.Eu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Eu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.bu()})}Cu(e){this.mu.push(e)}Su(e){const t=this.Eu.indexOf(e);this.Eu.splice(t,1)}}class rr extends Ei{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Cc,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cc(e),this._firestoreClient=void 0,await e}}}function Qy(n,e){const t=typeof n=="object"?n:xc(),r=typeof n=="string"?n:"(default)",i=Ps(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=Oh("firestore");o&&fy(i,...o)}return i}function co(n){if(n._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||py(n),n._firestoreClient}function py(n){var e,t,r;const i=n._freezeSettings(),o=function(u,h,d,p){return new qm(u,h,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Dl(p.experimentalLongPollingOptions),p.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new ay(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new sn(de.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new sn(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return q(this._lat,e._lat)||q(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=/^__.*__$/;class gy{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Zn(e,this.data,t,this.fieldTransforms)}}function Ll(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x()}}class fo{constructor(e,t,r,i,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.Fu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Mu(){return this.settings.Mu}xu(e){return new fo(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Ou(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.xu({path:r,Nu:!1});return i.Bu(e),i}Lu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.xu({path:r,Nu:!1});return i.Fu(),i}ku(e){return this.xu({path:void 0,Nu:!0})}qu(e){return ri(e,this.settings.methodName,this.settings.Qu||!1,this.path,this.settings.Ku)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Fu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Bu(this.path.get(e))}Bu(e){if(e.length===0)throw this.qu("Document fields must not be empty");if(Ll(this.Mu)&&my.test(e))throw this.qu('Document fields cannot begin and end with "__"')}}class _y{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||_i(e)}$u(e,t,r,i=!1){return new fo({Mu:e,methodName:t,Ku:r,path:he.emptyPath(),Nu:!1,Qu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function yy(n){const e=n._freezeSettings(),t=_i(n._databaseId);return new _y(n._databaseId,!!e.ignoreUndefinedProperties,t)}function vy(n,e,t,r,i,o={}){const a=n.$u(o.merge||o.mergeFields?2:0,e,t,i);Fl("Data must be an object, but it was:",a,r);const u=xl(r,a);let h,d;if(o.merge)h=new Ve(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const T of o.mergeFields){const R=Ey(e,T,t);if(!a.contains(R))throw new N(P.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);Iy(p,R)||p.push(R)}h=new Ve(p),d=a.fieldTransforms.filter(T=>h.covers(T.field))}else h=null,d=a.fieldTransforms;return new gy(new Pe(u),h,d)}function Ml(n,e){if(Ul(n=ie(n)))return Fl("Unsupported field value:",e,n),xl(n,e);if(n instanceof Ol)return function(r,i){if(!Ll(i.Mu))throw i.qu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.qu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Nu&&e.Mu!==4)throw e.qu("Nested arrays are not supported");return function(r,i){const o=[];let a=0;for(const u of r){let h=Ml(u,i.ku(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,i){if((r=ie(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return hg(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=oe.fromDate(r);return{timestampValue:Zr(i.serializer,o)}}if(r instanceof oe){const o=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zr(i.serializer,o)}}if(r instanceof lo)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof sn)return{bytesValue:el(i.serializer,r._byteString)};if(r instanceof Re){const o=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw i.qu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Qs(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ho)return function(a,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw u.qu("VectorValues must only contain numeric values.");return Ws(u.serializer,h)})}}}}}}(r,i);throw i.qu(`Unsupported field value: ${ao(r)}`)}(n,e)}function xl(n,e){const t={};return ku(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Lt(n,(r,i)=>{const o=Ml(i,e.Ou(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function Ul(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof lo||n instanceof sn||n instanceof Re||n instanceof Ol||n instanceof ho)}function Fl(n,e,t){if(!Ul(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=ao(t);throw r==="an object"?e.qu(n+" a custom object"):e.qu(n+" "+r)}}function Ey(n,e,t){if((e=ie(e))instanceof uo)return e._internalPath;if(typeof e=="string")return Bl(n,e);throw ri("Field path arguments must be of type string or ",n,!1,void 0,t)}const Ty=new RegExp("[~\\*/\\[\\]]");function Bl(n,e,t){if(e.search(Ty)>=0)throw ri(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new uo(...e.split("."))._internalPath}catch{throw ri(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ri(n,e,t,r,i){const o=r&&!r.isEmpty(),a=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${i}`),h+=")"),new N(P.INVALID_ARGUMENT,u+n+h)}function Iy(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e,t,r,i,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new wy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ql("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class wy extends jl{data(){return super.data()}}function ql(n,e){return typeof e=="string"?Bl(n,e):e instanceof uo?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ay(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ry{convertValue(e,t="none"){switch(Et(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ne(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(vt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Lt(e,(i,o)=>{r[i]=this.convertValue(o,t)}),r}convertVectorValue(e){var t,r,i;const o=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ne(a.doubleValue));return new ho(o)}convertGeoPoint(e){return new lo(ne(e.latitude),ne(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=li(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(qn(e));default:return null}}convertTimestamp(e){const t=yt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);K(ol(r));const i=new $n(r.get(1),r.get(3)),o=new L(r.popFirst(5));return i.isEqual(t)||Ye(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sy(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $l extends jl{constructor(e,t,r,i,o,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ur(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(ql("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Ur extends $l{data(e={}){return super.data(e)}}class Py{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new On(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ur(this._firestore,this._userDataWriter,r.key,r,new On(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(u=>{const h=new Ur(i._firestore,i._userDataWriter,u.doc.key,u.doc,new On(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{const h=new Ur(i._firestore,i._userDataWriter,u.doc.key,u.doc,new On(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:Cy(u.type),doc:h,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Cy(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jy(n){n=It(n,Re);const e=It(n.firestore,rr);return ly(co(e),n._key).then(t=>by(e,n,t))}class zl extends Ry{constructor(e){super(),this.firestore=e}convertBytes(e){return new sn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}function Yy(n){n=It(n,Ti);const e=It(n.firestore,rr),t=co(e),r=new zl(e);return Ay(n._query),hy(t,n._query).then(i=>new Py(e,r,n,i))}function Xy(n,e,t){n=It(n,Re);const r=It(n.firestore,rr),i=Sy(n.converter,e,t);return Wl(r,[vy(yy(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,xe.none())])}function Zy(n){return Wl(It(n.firestore,rr),[new Hs(n._key,xe.none())])}function Wl(n,e){return function(r,i){const o=new Ke;return r.asyncQueue.enqueueAndForget(async()=>X_(await uy(r),i,o)),o.promise}(co(n),e)}function by(n,e,t){const r=t.docs.get(e._key),i=new zl(n);return new $l(n,i,e._key,r,new On(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){cn=i})(on),Yt(new kt("firestore",(r,{instanceIdentifier:i,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new rr(new Rm(r.getProvider("auth-internal")),new bm(r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $n(d.options.projectId,p)}(a,i),a);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),pt(Wa,"4.7.6",e),pt(Wa,"4.7.6","esm2017")})();export{Oh as A,xc as B,Yt as C,kt as D,an as E,at as F,ct as G,pt as H,Mh as I,Ze as J,on as S,Aa as _,Cs as a,ky as b,Qy as c,mp as d,By as e,Xy as f,$y as g,Ky as h,Yd as i,Gy as j,Yy as k,Zy as l,jy as m,Jy as n,qy as o,My as p,Ny as q,Vy as r,Uy as s,Ly as t,xy as u,Oy as v,Dy as w,Fy as x,ie as y,Ps as z};
