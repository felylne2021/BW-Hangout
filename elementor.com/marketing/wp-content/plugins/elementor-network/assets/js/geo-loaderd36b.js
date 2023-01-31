(()=>{"use strict";var __webpack_exports__={};;function _defineProperty(obj,key,value){key=_toPropertyKey(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}
function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return typeof key==="symbol"?key:String(key);}
function _toPrimitive(input,hint){if(typeof input!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(typeof res!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}
class GeoTrace{constructor(){_defineProperty(this,"fetchError",false);}
async getLocationCode(){let storageGeoCode=GeoTrace.getFromStorage();if(storageGeoCode){return storageGeoCode;}
try{let response=await GeoTrace.fetchCloudflareCgiTrace();let text=await response.text();if(text){storageGeoCode=text.split('loc=')[1].split("\n")[0];GeoTrace.saveToStorage(storageGeoCode);}else{throw 'responseEmpty';}}catch(e){this.fetchError=true;}
return storageGeoCode;}
static async fetchCloudflareCgiTrace(){const controller=new AbortController();const timeoutId=setTimeout(()=>controller.abort(),GeoTrace.fetchTimeout);const response=await fetch(GeoTrace.traceEndpoint,{mode:"cors"});clearTimeout(timeoutId);return response;}
static saveToStorage(data){if(GeoTrace.isLocalStorageOn()){window.localStorage.setItem(GeoTrace.storageKey,JSON.stringify(data));}}
static getFromStorage(){return GeoTrace.isLocalStorageOn()?JSON.parse(window.localStorage.getItem(GeoTrace.storageKey)):false;}
static isLocalStorageOn(){return 'undefined'!==typeof window.localStorage;}}
_defineProperty(GeoTrace,"traceEndpoint",'https://elementor.com/cdn-cgi/trace');_defineProperty(GeoTrace,"fetchTimeout",3000);_defineProperty(GeoTrace,"storageKey",'elGeoLocationCode');;class Geo_Loader{async load(){await new GeoTrace().getLocationCode();}}
new Geo_Loader().load();})();