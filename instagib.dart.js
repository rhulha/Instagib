(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isf=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isi)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="f"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="q"){processStatics(init.statics[b1]=b2.q,b3)
delete b2.q}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dw"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dw"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dw(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.W=function(){}
var dart=[["","",,H,{"^":"",o9:{"^":"f;a"}}],["","",,J,{"^":"",
y:function(a){return void 0},
cF:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cC:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dA==null){H.mv()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.j(new P.dj("Return interceptor for "+H.m(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$d0()]
if(v!=null)return v
v=H.mD(a)
if(v!=null)return v
if(typeof a=="function")return C.z
y=Object.getPrototypeOf(a)
if(y==null)return C.l
if(y===Object.prototype)return C.l
if(typeof w=="function"){Object.defineProperty(w,$.$get$d0(),{value:C.f,enumerable:false,writable:true,configurable:true})
return C.f}return C.f},
i:{"^":"f;",
B:function(a,b){return a===b},
gG:function(a){return H.aS(a)},
l:["e1",function(a){return H.cj(a)}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|AudioParam|BarProp|Bluetooth|BluetoothAdvertisingData|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|CircularGeofencingRegion|Client|Clients|CompositorProxy|ConsoleBase|Coordinates|Credential|CredentialsContainer|Crypto|CryptoKey|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMParser|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTColorBufferFloat|EXTDisjointTimerQuery|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|Entry|EntrySync|FederatedCredential|FileEntry|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FormData|GamepadButton|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|ImageData|InjectedScriptHost|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|Iterator|KeyframeEffect|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaMetadata|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|MutationRecord|NFC|NavigatorStorageUtils|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvas|PagePopupController|PasswordCredential|PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceObserver|PerformanceObserverEntryList|PerformanceRenderTiming|PerformanceResourceTiming|PerformanceTiming|PeriodicWave|Permissions|PositionError|PositionSensorVRDevice|Presentation|PushManager|PushMessageData|PushSubscription|RTCCertificate|RTCIceCandidate|RTCSessionDescription|RTCStatsReport|RTCStatsResponse|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStreamReader|Request|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGUnitTypes|Screen|ScrollState|Selection|ServicePort|SharedArrayBuffer|SourceInfo|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageManager|StorageQuota|Stream|StyleMedia|StylePropertyMap|SubtleCrypto|SyncManager|TextMetrics|TrackDefault|TreeWalker|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRDevice|VREyeParameters|VRFieldOfView|VRPositionState|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WindowClient|WorkerConsole|Worklet|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
je:{"^":"i;",
l:function(a){return String(a)},
gG:function(a){return a?519018:218159},
$iscw:1},
jg:{"^":"i;",
B:function(a,b){return null==b},
l:function(a){return"null"},
gG:function(a){return 0}},
d1:{"^":"i;",
gG:function(a){return 0},
l:["e2",function(a){return String(a)}],
$isjh:1},
jI:{"^":"d1;"},
bV:{"^":"d1;"},
bO:{"^":"d1;",
l:function(a){var z=a[$.$get$e2()]
return z==null?this.e2(a):J.aZ(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bL:{"^":"i;$ti",
bu:function(a,b){if(!!a.immutable$list)throw H.j(new P.B(b))},
cO:function(a,b){if(!!a.fixed$length)throw H.j(new P.B(b))},
bZ:function(a,b,c){var z,y
this.bu(a,"setAll")
z=a.length
if(b>z)H.L(P.b3(b,0,z,"index",null))
for(z=J.bG(c);z.v();b=y){y=b+1
this.j(a,b,z.d)}},
H:function(a,b){var z,y
this.cO(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.aD)(b),++y)a.push(b[y])},
I:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.j(new P.a1(a))}},
af:function(a,b){return new H.cd(a,b,[H.aL(a,0),null])},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
gby:function(a){if(a.length>0)return a[0]
throw H.j(H.d_())},
c_:function(a,b,c,d,e){var z,y,x
this.bu(a,"setRange")
P.cm(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.L(P.b3(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.j(H.jc())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
fe:function(a,b,c,d){var z
this.bu(a,"fill range")
P.cm(b,c,a.length,null,null,null)
for(z=b;z<c;++z)a[z]=d},
br:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.j(new P.a1(a))}return!1},
au:function(a,b){var z
for(z=0;z<a.length;++z)if(J.w(a[z],b))return!0
return!1},
l:function(a){return P.bk(a,"[","]")},
gE:function(a){return new J.hx(a,a.length,0,null)},
gG:function(a){return H.aS(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cO(a,"set length")
if(b<0)throw H.j(P.b3(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.j(H.O(a,b))
if(b>=a.length||b<0)throw H.j(H.O(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.L(new P.B("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.j(H.O(a,b))
if(b>=a.length||b<0)throw H.j(H.O(a,b))
a[b]=c},
$isr:1,
$asr:I.W,
$isd:1,
$asd:null,
$isc:1,
$asc:null,
$isb:1,
$asb:null},
o8:{"^":"bL;$ti"},
hx:{"^":"f;a,b,c,d",
gw:function(){return this.d},
v:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.j(H.aD(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bM:{"^":"i;",
gfz:function(a){return isNaN(a)},
cB:function(a){return Math.abs(a)},
bI:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.j(new P.B(""+a+".round()"))},
i:function(a){return a},
l:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gG:function(a){return a&0x1FFFFFFF},
b3:function(a){return-a},
F:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a+b},
A:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a-b},
W:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a*b},
D:function(a,b){return(a|0)===a?a/b|0:this.eN(a,b)},
eN:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.j(new P.B("Result of truncating division is "+H.m(z)+": "+H.m(a)+" ~/ "+b))},
eM:function(a,b){return b>31?0:a<<b>>>0},
bo:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
P:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a<b},
S:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a>b},
aH:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a<=b},
b1:function(a,b){if(typeof b!=="number")throw H.j(H.a3(b))
return a>=b},
$isc_:1},
ej:{"^":"bM;",$isc_:1,$isq:1},
jf:{"^":"bM;",$isc_:1},
bN:{"^":"i;",
cS:function(a,b){if(b<0)throw H.j(H.O(a,b))
if(b>=a.length)H.L(H.O(a,b))
return a.charCodeAt(b)},
bd:function(a,b){if(b>=a.length)throw H.j(H.O(a,b))
return a.charCodeAt(b)},
F:function(a,b){if(typeof b!=="string")throw H.j(P.dT(b,null,null))
return a+b},
e0:function(a,b){var z=a.split(b)
return z},
aK:function(a,b,c){if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.L(H.a3(c))
if(b<0)throw H.j(P.cl(b,null,null))
if(typeof c!=="number")return H.n(c)
if(b>c)throw H.j(P.cl(b,null,null))
if(c>a.length)throw H.j(P.cl(c,null,null))
return a.substring(b,c)},
c3:function(a,b){return this.aK(a,b,null)},
h_:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.bd(z,0)===133){x=J.ji(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.cS(z,w)===133?J.jj(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
W:function(a,b){var z,y
if(typeof b!=="number")return H.n(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.j(C.n)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fs:function(a,b,c){var z
if(c>a.length)throw H.j(P.b3(c,0,a.length,null,null))
z=a.indexOf(b,c)
return z},
fq:function(a,b){return this.fs(a,b,0)},
l:function(a){return a},
gG:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.j(H.O(a,b))
if(b>=a.length||b<0)throw H.j(H.O(a,b))
return a[b]},
$isr:1,
$asr:I.W,
$isv:1,
q:{
ek:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
ji:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.bd(a,b)
if(y!==32&&y!==13&&!J.ek(y))break;++b}return b},
jj:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.cS(a,z)
if(y!==32&&y!==13&&!J.ek(y))break}return b}}}}],["","",,H,{"^":"",
d_:function(){return new P.bS("No element")},
jc:function(){return new P.bS("Too few elements")},
c:{"^":"b;$ti",$asc:null},
bP:{"^":"c;$ti",
gE:function(a){return new H.eo(this,this.gk(this),0,null)},
I:function(a,b){var z,y
z=this.gk(this)
for(y=0;y<z;++y){b.$1(this.u(0,y))
if(z!==this.gk(this))throw H.j(new P.a1(this))}},
af:function(a,b){return new H.cd(this,b,[H.Y(this,"bP",0),null])},
b_:function(a,b){var z,y,x
z=[H.Y(this,"bP",0)]
if(b){y=H.h([],z)
C.c.sk(y,this.gk(this))}else y=H.h(new Array(this.gk(this)),z)
for(x=0;x<this.gk(this);++x){z=this.u(0,x)
if(x>=y.length)return H.a(y,x)
y[x]=z}return y},
aZ:function(a){return this.b_(a,!0)}},
eo:{"^":"f;a,b,c,d",
gw:function(){return this.d},
v:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gk(z)
if(this.b!==x)throw H.j(new P.a1(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.u(z,w);++this.c
return!0}},
ep:{"^":"b;a,b,$ti",
gE:function(a){return new H.jy(null,J.bG(this.a),this.b,this.$ti)},
gk:function(a){return J.bH(this.a)},
$asb:function(a,b){return[b]},
q:{
cc:function(a,b,c,d){if(!!J.y(a).$isc)return new H.e5(a,b,[c,d])
return new H.ep(a,b,[c,d])}}},
e5:{"^":"ep;a,b,$ti",$isc:1,
$asc:function(a,b){return[b]},
$asb:function(a,b){return[b]}},
jy:{"^":"jd;a,b,c,$ti",
v:function(){var z=this.b
if(z.v()){this.a=this.c.$1(z.gw())
return!0}this.a=null
return!1},
gw:function(){return this.a}},
cd:{"^":"bP;a,b,$ti",
gk:function(a){return J.bH(this.a)},
u:function(a,b){return this.b.$1(J.h9(this.a,b))},
$asbP:function(a,b){return[b]},
$asc:function(a,b){return[b]},
$asb:function(a,b){return[b]}},
ef:{"^":"f;$ti"}}],["","",,H,{"^":"",
bY:function(a,b){var z=a.aw(b)
if(!init.globalState.d.cy)init.globalState.f.ai()
return z},
fP:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.y(y).$isd)throw H.j(P.bg("Arguments to main must be a List: "+H.m(y)))
init.globalState=new H.lq(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eh()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.kY(P.d5(null,H.bX),0)
x=P.q
y.z=new H.U(0,null,null,null,null,null,0,[x,H.dp])
y.ch=new H.U(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.lp()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.j5,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.lr)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.bm(null,null,null,x)
v=new H.cn(0,null,!1)
u=new H.dp(y,new H.U(0,null,null,null,null,null,0,[x,H.cn]),w,init.createNewIsolate(),v,new H.b_(H.cG()),new H.b_(H.cG()),!1,!1,[],P.bm(null,null,null,null),null,null,!1,!0,P.bm(null,null,null,null))
w.K(0,0)
u.c5(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.bb(a,{func:1,args:[,]}))u.aw(new H.n9(z,a))
else if(H.bb(a,{func:1,args:[,,]}))u.aw(new H.na(z,a))
else u.aw(a)
init.globalState.f.ai()},
j9:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.ja()
return},
ja:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.j(new P.B("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.j(new P.B('Cannot extract URI from "'+z+'"'))},
j5:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cs(!0,[]).aa(b.data)
y=J.A(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cs(!0,[]).aa(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cs(!0,[]).aa(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.q
p=P.bm(null,null,null,q)
o=new H.cn(0,null,!1)
n=new H.dp(y,new H.U(0,null,null,null,null,null,0,[q,H.cn]),p,init.createNewIsolate(),o,new H.b_(H.cG()),new H.b_(H.cG()),!1,!1,[],P.bm(null,null,null,null),null,null,!1,!0,P.bm(null,null,null,null))
p.K(0,0)
n.c5(0,o)
init.globalState.f.a.a1(0,new H.bX(n,new H.j6(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ai()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.bf(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.ai()
break
case"close":init.globalState.ch.aA(0,$.$get$ei().h(0,a))
a.terminate()
init.globalState.f.ai()
break
case"log":H.j4(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.bl(["command","print","msg",z])
q=new H.b7(!0,P.bt(null,P.q)).X(q)
y.toString
self.postMessage(q)}else P.aa(y.h(z,"msg"))
break
case"error":throw H.j(y.h(z,"msg"))}},
j4:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.bl(["command","log","msg",a])
x=new H.b7(!0,P.bt(null,P.q)).X(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.a0(w)
z=H.a_(w)
y=P.bK(z)
throw H.j(y)}},
j7:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eJ=$.eJ+("_"+y)
$.eK=$.eK+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.bf(f,["spawned",new H.cu(y,x),w,z.r])
x=new H.j8(a,b,c,d,z)
if(e===!0){z.cE(w,w)
init.globalState.f.a.a1(0,new H.bX(z,x,"start isolate"))}else x.$0()},
lK:function(a){return new H.cs(!0,[]).aa(new H.b7(!1,P.bt(null,P.q)).X(a))},
n9:{"^":"l:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
na:{"^":"l:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
lq:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
lr:function(a){var z=P.bl(["command","print","msg",a])
return new H.b7(!0,P.bt(null,P.q)).X(z)}}},
dp:{"^":"f;a,b,c,fA:d<,eY:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cE:function(a,b){if(!this.f.B(0,a))return
if(this.Q.K(0,b)&&!this.y)this.y=!0
this.bp()},
fR:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.aA(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.cf();++y.d}this.y=!1}this.bp()},
eR:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.y(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
fQ:function(a){var z,y,x
if(this.ch==null)return
for(z=J.y(a),y=0;x=this.ch,y<x.length;y+=2)if(z.B(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.L(new P.B("removeRange"))
P.cm(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dZ:function(a,b){if(!this.r.B(0,a))return
this.db=b},
fk:function(a,b,c){var z=J.y(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){J.bf(a,c)
return}z=this.cx
if(z==null){z=P.d5(null,null)
this.cx=z}z.a1(0,new H.li(a,c))},
fj:function(a,b){var z
if(!this.r.B(0,a))return
z=J.y(b)
if(!z.B(b,0))z=z.B(b,1)&&!this.cy
else z=!0
if(z){this.bz()
return}z=this.cx
if(z==null){z=P.d5(null,null)
this.cx=z}z.a1(0,this.gfC())},
fl:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.aa(a)
if(b!=null)P.aa(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aZ(a)
y[1]=b==null?null:J.aZ(b)
for(x=new P.dq(z,z.r,null,null),x.c=z.e;x.v();)J.bf(x.d,y)},
aw:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.a0(u)
v=H.a_(u)
this.fl(w,v)
if(this.db===!0){this.bz()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfA()
if(this.cx!=null)for(;t=this.cx,!t.ga5(t);)this.cx.dq().$0()}return y},
df:function(a){return this.b.h(0,a)},
c5:function(a,b){var z=this.b
if(z.am(0,a))throw H.j(P.bK("Registry: ports must be registered only once."))
z.j(0,a,b)},
bp:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.j(0,this.a,this)
else this.bz()},
bz:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.a3(0)
for(z=this.b,y=z.gar(z),y=y.gE(y);y.v();)y.gw().eu()
z.a3(0)
this.c.a3(0)
init.globalState.z.aA(0,this.a)
this.dx.a3(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.bf(w,z[v])}this.ch=null}},"$0","gfC",0,0,2]},
li:{"^":"l:2;a,b",
$0:function(){J.bf(this.a,this.b)}},
kY:{"^":"f;a,b",
f5:function(){var z=this.a
if(z.b===z.c)return
return z.dq()},
du:function(){var z,y,x
z=this.f5()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.am(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga5(y)}else y=!1
else y=!1
else y=!1
if(y)H.L(P.bK("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga5(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.bl(["command","close"])
x=new H.b7(!0,new P.fj(0,null,null,null,null,null,0,[null,P.q])).X(x)
y.toString
self.postMessage(x)}return!1}z.fO()
return!0},
cs:function(){if(self.window!=null)new H.kZ(this).$0()
else for(;this.du(););},
ai:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cs()
else try{this.cs()}catch(x){z=H.a0(x)
y=H.a_(x)
w=init.globalState.Q
v=P.bl(["command","error","msg",H.m(z)+"\n"+H.m(y)])
v=new H.b7(!0,P.bt(null,P.q)).X(v)
w.toString
self.postMessage(v)}}},
kZ:{"^":"l:2;a",
$0:function(){if(!this.a.du())return
P.kt(C.h,this)}},
bX:{"^":"f;a,b,c",
fO:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aw(this.b)}},
lp:{"^":"f;"},
j6:{"^":"l:1;a,b,c,d,e,f",
$0:function(){H.j7(this.a,this.b,this.c,this.d,this.e,this.f)}},
j8:{"^":"l:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.bb(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.bb(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.bp()}},
fc:{"^":"f;"},
cu:{"^":"fc;b,a",
a7:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcj())return
x=H.lK(b)
if(z.geY()===y){y=J.A(x)
switch(y.h(x,0)){case"pause":z.cE(y.h(x,1),y.h(x,2))
break
case"resume":z.fR(y.h(x,1))
break
case"add-ondone":z.eR(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fQ(y.h(x,1))
break
case"set-errors-fatal":z.dZ(y.h(x,1),y.h(x,2))
break
case"ping":z.fk(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fj(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.K(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aA(0,y)
break}return}init.globalState.f.a.a1(0,new H.bX(z,new H.lt(this,x),"receive"))},
B:function(a,b){if(b==null)return!1
return b instanceof H.cu&&J.w(this.b,b.b)},
gG:function(a){return this.b.gbi()}},
lt:{"^":"l:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcj())z.ep(0,this.b)}},
dr:{"^":"fc;b,c,a",
a7:function(a,b){var z,y,x
z=P.bl(["command","message","port",this,"msg",b])
y=new H.b7(!0,P.bt(null,P.q)).X(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
B:function(a,b){if(b==null)return!1
return b instanceof H.dr&&J.w(this.b,b.b)&&J.w(this.a,b.a)&&J.w(this.c,b.c)},
gG:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.e_()
y=this.a
if(typeof y!=="number")return y.e_()
x=this.c
if(typeof x!=="number")return H.n(x)
return(z<<16^y<<8^x)>>>0}},
cn:{"^":"f;bi:a<,b,cj:c<",
eu:function(){this.c=!0
this.b=null},
ep:function(a,b){if(this.c)return
this.b.$1(b)},
$isjX:1},
kp:{"^":"f;a,b,c",
eh:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a1(0,new H.bX(y,new H.kr(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.a7(new H.ks(this,b),0),a)}else throw H.j(new P.B("Timer greater than 0."))},
q:{
kq:function(a,b){var z=new H.kp(!0,!1,null)
z.eh(a,b)
return z}}},
kr:{"^":"l:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
ks:{"^":"l:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
b_:{"^":"f;bi:a<",
gG:function(a){var z=this.a
if(typeof z!=="number")return z.h5()
z=C.a.bo(z,0)^C.a.D(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
B:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.b_){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b7:{"^":"f;a,b",
X:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.j(0,a,z.gk(z))
z=J.y(a)
if(!!z.$iseB)return["buffer",a]
if(!!z.$iscf)return["typed",a]
if(!!z.$isr)return this.dV(a)
if(!!z.$isj3){x=this.gdS()
w=z.gaq(a)
w=H.cc(w,x,H.Y(w,"b",0),null)
w=P.d6(w,!0,H.Y(w,"b",0))
z=z.gar(a)
z=H.cc(z,x,H.Y(z,"b",0),null)
return["map",w,P.d6(z,!0,H.Y(z,"b",0))]}if(!!z.$isjh)return this.dW(a)
if(!!z.$isi)this.dF(a)
if(!!z.$isjX)this.aG(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscu)return this.dX(a)
if(!!z.$isdr)return this.dY(a)
if(!!z.$isl){v=a.$static_name
if(v==null)this.aG(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isb_)return["capability",a.a]
if(!(a instanceof P.f))this.dF(a)
return["dart",init.classIdExtractor(a),this.dU(init.classFieldsExtractor(a))]},"$1","gdS",2,0,0],
aG:function(a,b){throw H.j(new P.B((b==null?"Can't transmit:":b)+" "+H.m(a)))},
dF:function(a){return this.aG(a,null)},
dV:function(a){var z=this.dT(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aG(a,"Can't serialize indexable: ")},
dT:function(a){var z,y,x
z=[]
C.c.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.X(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
dU:function(a){var z
for(z=0;z<a.length;++z)C.c.j(a,z,this.X(a[z]))
return a},
dW:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aG(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.X(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
dY:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dX:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbi()]
return["raw sendport",a]}},
cs:{"^":"f;a,b",
aa:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.j(P.bg("Bad serialized message: "+H.m(a)))
switch(C.c.gby(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.h(this.av(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.h(this.av(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.av(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.h(this.av(x),[null])
y.fixed$length=Array
return y
case"map":return this.f8(a)
case"sendport":return this.f9(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.f7(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.b_(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.av(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.j("couldn't deserialize: "+H.m(a))}},"$1","gf6",2,0,0],
av:function(a){var z,y,x
z=J.A(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.n(x)
if(!(y<x))break
z.j(a,y,this.aa(z.h(a,y)));++y}return a},
f8:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.d4()
this.b.push(w)
y=J.hn(y,this.gf6()).aZ(0)
for(z=J.A(y),v=J.A(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.a(y,u)
w.j(0,y[u],this.aa(v.h(x,u)))}return w},
f9:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.w(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.df(w)
if(u==null)return
t=new H.cu(u,x)}else t=new H.dr(y,w,x)
this.b.push(t)
return t},
f7:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.A(y)
v=J.A(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.n(t)
if(!(u<t))break
w[z.h(y,u)]=this.aa(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
mp:function(a){return init.types[a]},
fE:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.y(a).$ist},
m:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aZ(a)
if(typeof z!=="string")throw H.j(H.a3(a))
return z},
aS:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
eI:function(a,b){throw H.j(new P.cX(a,null,null))},
eL:function(a,b,c){var z,y
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.eI(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.eI(a,c)},
eH:function(a,b){if(b==null)throw H.j(new P.cX("Invalid double",a,null))
return b.$1(a)},
ck:function(a,b){var z,y
H.m4(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.eH(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.hq(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.eH(a,b)}return z},
dd:function(a){var z,y,x,w,v,u,t,s
z=J.y(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.r||!!J.y(a).$isbV){v=C.k(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.e.bd(w,0)===36)w=C.e.c3(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.fF(H.cD(a),0,null),init.mangledGlobalNames)},
cj:function(a){return"Instance of '"+H.dd(a)+"'"},
jR:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
a2:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
jQ:function(a){return a.b?H.a2(a).getUTCFullYear()+0:H.a2(a).getFullYear()+0},
jO:function(a){return a.b?H.a2(a).getUTCMonth()+1:H.a2(a).getMonth()+1},
jK:function(a){return a.b?H.a2(a).getUTCDate()+0:H.a2(a).getDate()+0},
jL:function(a){return a.b?H.a2(a).getUTCHours()+0:H.a2(a).getHours()+0},
jN:function(a){return a.b?H.a2(a).getUTCMinutes()+0:H.a2(a).getMinutes()+0},
jP:function(a){return a.b?H.a2(a).getUTCSeconds()+0:H.a2(a).getSeconds()+0},
jM:function(a){return a.b?H.a2(a).getUTCMilliseconds()+0:H.a2(a).getMilliseconds()+0},
dc:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.j(H.a3(a))
return a[b]},
eM:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.j(H.a3(a))
a[b]=c},
n:function(a){throw H.j(H.a3(a))},
a:function(a,b){if(a==null)J.bH(a)
throw H.j(H.O(a,b))},
O:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aP(!0,b,"index",null)
z=J.bH(a)
if(!(b<0)){if(typeof z!=="number")return H.n(z)
y=b>=z}else y=!0
if(y)return P.G(b,a,"index",null,z)
return P.cl(b,"index",null)},
a3:function(a){return new P.aP(!0,a,null,null)},
fw:function(a){if(typeof a!=="number")throw H.j(H.a3(a))
return a},
m4:function(a){if(typeof a!=="string")throw H.j(H.a3(a))
return a},
j:function(a){var z
if(a==null)a=new P.ch()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.fR})
z.name=""}else z.toString=H.fR
return z},
fR:function(){return J.aZ(this.dartException)},
L:function(a){throw H.j(a)},
aD:function(a){throw H.j(new P.a1(a))},
a0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.nf(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.bo(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d2(H.m(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.m(y)+" (Error "+w+")"
return z.$1(new H.eG(v,null))}}if(a instanceof TypeError){u=$.$get$eY()
t=$.$get$eZ()
s=$.$get$f_()
r=$.$get$f0()
q=$.$get$f4()
p=$.$get$f5()
o=$.$get$f2()
$.$get$f1()
n=$.$get$f7()
m=$.$get$f6()
l=u.Z(y)
if(l!=null)return z.$1(H.d2(y,l))
else{l=t.Z(y)
if(l!=null){l.method="call"
return z.$1(H.d2(y,l))}else{l=s.Z(y)
if(l==null){l=r.Z(y)
if(l==null){l=q.Z(y)
if(l==null){l=p.Z(y)
if(l==null){l=o.Z(y)
if(l==null){l=r.Z(y)
if(l==null){l=n.Z(y)
if(l==null){l=m.Z(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eG(y,l==null?null:l.method))}}return z.$1(new H.kC(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.eS()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aP(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.eS()
return a},
a_:function(a){var z
if(a==null)return new H.fk(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fk(a,null)},
mL:function(a){if(a==null||typeof a!='object')return J.ac(a)
else return H.aS(a)},
mn:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
mx:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bY(b,new H.my(a))
case 1:return H.bY(b,new H.mz(a,d))
case 2:return H.bY(b,new H.mA(a,d,e))
case 3:return H.bY(b,new H.mB(a,d,e,f))
case 4:return H.bY(b,new H.mC(a,d,e,f,g))}throw H.j(P.bK("Unsupported number of arguments for wrapped closure"))},
a7:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.mx)
a.$identity=z
return z},
hZ:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.y(c).$isd){z.$reflectionInfo=c
x=H.k_(z).r}else x=c
w=d?Object.create(new H.k9().constructor.prototype):Object.create(new H.cS(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ay
$.ay=J.F(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.e0(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.mp,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.dX:H.cT
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.j("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.e0(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
hW:function(a,b,c,d){var z=H.cT
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
e0:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hY(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hW(y,!w,z,b)
if(y===0){w=$.ay
$.ay=J.F(w,1)
u="self"+H.m(w)
w="return function(){var "+u+" = this."
v=$.bh
if(v==null){v=H.c6("self")
$.bh=v}return new Function(w+H.m(v)+";return "+u+"."+H.m(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ay
$.ay=J.F(w,1)
t+=H.m(w)
w="return function("+t+"){return this."
v=$.bh
if(v==null){v=H.c6("self")
$.bh=v}return new Function(w+H.m(v)+"."+H.m(z)+"("+t+");}")()},
hX:function(a,b,c,d){var z,y
z=H.cT
y=H.dX
switch(b?-1:a){case 0:throw H.j(new H.k0("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hY:function(a,b){var z,y,x,w,v,u,t,s
z=H.hJ()
y=$.dW
if(y==null){y=H.c6("receiver")
$.dW=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hX(w,!u,x,b)
if(w===1){y="return function(){return this."+H.m(z)+"."+H.m(x)+"(this."+H.m(y)+");"
u=$.ay
$.ay=J.F(u,1)
return new Function(y+H.m(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.m(z)+"."+H.m(x)+"(this."+H.m(y)+", "+s+");"
u=$.ay
$.ay=J.F(u,1)
return new Function(y+H.m(u)+"}")()},
dw:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.y(c).$isd){c.fixed$length=Array
z=c}else z=c
return H.hZ(a,b,z,!!d,e,f)},
mR:function(a,b){var z=J.A(b)
throw H.j(H.hO(H.dd(a),z.aK(b,3,z.gk(b))))},
bE:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.y(a)[b]
else z=!0
if(z)return a
H.mR(a,b)},
ml:function(a){var z=J.y(a)
return"$S" in z?z.$S():null},
bb:function(a,b){var z
if(a==null)return!1
z=H.ml(a)
return z==null?!1:H.fD(z,b)},
nd:function(a){throw H.j(new P.i3(a))},
cG:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
fA:function(a){return init.getIsolateTag(a)},
h:function(a,b){a.$ti=b
return a},
cD:function(a){if(a==null)return
return a.$ti},
fB:function(a,b){return H.dF(a["$as"+H.m(b)],H.cD(a))},
Y:function(a,b,c){var z=H.fB(a,b)
return z==null?null:z[c]},
aL:function(a,b){var z=H.cD(a)
return z==null?null:z[b]},
bc:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.fF(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.m(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.bc(z,b)
return H.lN(a,b)}return"unknown-reified-type"},
lN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.bc(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.bc(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.bc(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.mm(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.bc(r[p],b)+(" "+H.m(p))}w+="}"}return"("+w+") => "+z},
fF:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.dg("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.J=v+", "
u=a[y]
if(u!=null)w=!1
v=z.J+=H.bc(u,c)}return w?"":"<"+z.l(0)+">"},
dF:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
cx:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cD(a)
y=J.y(a)
if(y[b]==null)return!1
return H.fu(H.dF(y[d],z),c)},
fu:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.a9(a[y],b[y]))return!1
return!0},
cy:function(a,b,c){return a.apply(b,H.fB(b,c))},
a9:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="cg")return!0
if('func' in b)return H.fD(a,b)
if('func' in a)return b.builtin$cls==="o2"||b.builtin$cls==="f"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.bc(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.fu(H.dF(u,z),x)},
ft:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.a9(z,v)||H.a9(v,z)))return!1}return!0},
lW:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.a9(v,u)||H.a9(u,v)))return!1}return!0},
fD:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.a9(z,y)||H.a9(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.ft(x,w,!1))return!1
if(!H.ft(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.a9(o,n)||H.a9(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.a9(o,n)||H.a9(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.a9(o,n)||H.a9(n,o)))return!1}}return H.lW(a.named,b.named)},
pJ:function(a){var z=$.dz
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
pH:function(a){return H.aS(a)},
pG:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
mD:function(a){var z,y,x,w,v,u
z=$.dz.$1(a)
y=$.cA[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cE[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.fs.$2(a,z)
if(z!=null){y=$.cA[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cE[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.dC(x)
$.cA[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cE[z]=x
return x}if(v==="-"){u=H.dC(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.fI(a,x)
if(v==="*")throw H.j(new P.dj(z))
if(init.leafTags[z]===true){u=H.dC(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.fI(a,x)},
fI:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cF(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
dC:function(a){return J.cF(a,!1,null,!!a.$ist)},
mH:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.cF(z,!1,null,!!z.$ist)
else return J.cF(z,c,null,null)},
mv:function(){if(!0===$.dA)return
$.dA=!0
H.mw()},
mw:function(){var z,y,x,w,v,u,t,s
$.cA=Object.create(null)
$.cE=Object.create(null)
H.mr()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.fJ.$1(v)
if(u!=null){t=H.mH(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
mr:function(){var z,y,x,w,v,u,t
z=C.t()
z=H.ba(C.u,H.ba(C.v,H.ba(C.j,H.ba(C.j,H.ba(C.x,H.ba(C.w,H.ba(C.y(C.k),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dz=new H.ms(v)
$.fs=new H.mt(u)
$.fJ=new H.mu(t)},
ba:function(a,b){return a(b)||b},
dE:function(a,b,c){var z,y,x
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
jZ:{"^":"f;a,b,c,d,e,f,r,x",q:{
k_:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.jZ(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
ky:{"^":"f;a,b,c,d,e,f",
Z:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
q:{
aB:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ky(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cp:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
f3:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eG:{"^":"T;a,b",
l:function(a){var z=this.b
if(z==null)return"NullError: "+H.m(this.a)
return"NullError: method not found: '"+H.m(z)+"' on null"}},
jl:{"^":"T;a,b,c",
l:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.m(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.m(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.m(this.a)+")"},
q:{
d2:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.jl(a,y,z?null:b.receiver)}}},
kC:{"^":"T;a",
l:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
nf:{"^":"l:0;a",
$1:function(a){if(!!J.y(a).$isT)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fk:{"^":"f;a,b",
l:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
my:{"^":"l:1;a",
$0:function(){return this.a.$0()}},
mz:{"^":"l:1;a,b",
$0:function(){return this.a.$1(this.b)}},
mA:{"^":"l:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
mB:{"^":"l:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
mC:{"^":"l:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
l:{"^":"f;",
l:function(a){return"Closure '"+H.dd(this).trim()+"'"},
gdJ:function(){return this},
gdJ:function(){return this}},
eW:{"^":"l;"},
k9:{"^":"eW;",
l:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cS:{"^":"eW;a,b,c,d",
B:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cS))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gG:function(a){var z,y
z=this.c
if(z==null)y=H.aS(this.a)
else y=typeof z!=="object"?J.ac(z):H.aS(z)
z=H.aS(this.b)
if(typeof y!=="number")return y.h6()
return(y^z)>>>0},
l:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.m(this.d)+"' of "+H.cj(z)},
q:{
cT:function(a){return a.a},
dX:function(a){return a.c},
hJ:function(){var z=$.bh
if(z==null){z=H.c6("self")
$.bh=z}return z},
c6:function(a){var z,y,x,w,v
z=new H.cS("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
hN:{"^":"T;a",
l:function(a){return this.a},
q:{
hO:function(a,b){return new H.hN("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
k0:{"^":"T;a",
l:function(a){return"RuntimeError: "+H.m(this.a)}},
U:{"^":"f;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
ga5:function(a){return this.a===0},
gaq:function(a){return new H.ju(this,[H.aL(this,0)])},
gar:function(a){return H.cc(this.gaq(this),new H.jk(this),H.aL(this,0),H.aL(this,1))},
am:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.cc(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.cc(y,b)}else return this.ft(b)},
ft:function(a){var z=this.d
if(z==null)return!1
return this.ay(this.aO(z,this.ax(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.at(z,b)
return y==null?null:y.gac()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.at(x,b)
return y==null?null:y.gac()}else return this.fu(b)},
fu:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aO(z,this.ax(a))
x=this.ay(y,a)
if(x<0)return
return y[x].gac()},
j:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bk()
this.b=z}this.c4(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bk()
this.c=y}this.c4(y,b,c)}else{x=this.d
if(x==null){x=this.bk()
this.d=x}w=this.ax(b)
v=this.aO(x,w)
if(v==null)this.bn(x,w,[this.bl(b,c)])
else{u=this.ay(v,b)
if(u>=0)v[u].sac(c)
else v.push(this.bl(b,c))}}},
aA:function(a,b){if(typeof b==="string")return this.cr(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cr(this.c,b)
else return this.fv(b)},
fv:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aO(z,this.ax(a))
x=this.ay(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cz(w)
return w.gac()},
a3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
I:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.j(new P.a1(this))
z=z.c}},
c4:function(a,b,c){var z=this.at(a,b)
if(z==null)this.bn(a,b,this.bl(b,c))
else z.sac(c)},
cr:function(a,b){var z
if(a==null)return
z=this.at(a,b)
if(z==null)return
this.cz(z)
this.cd(a,b)
return z.gac()},
bl:function(a,b){var z,y
z=new H.jt(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cz:function(a){var z,y
z=a.geG()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
ax:function(a){return J.ac(a)&0x3ffffff},
ay:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.w(a[y].gd9(),b))return y
return-1},
l:function(a){return P.eq(this)},
at:function(a,b){return a[b]},
aO:function(a,b){return a[b]},
bn:function(a,b,c){a[b]=c},
cd:function(a,b){delete a[b]},
cc:function(a,b){return this.at(a,b)!=null},
bk:function(){var z=Object.create(null)
this.bn(z,"<non-identifier-key>",z)
this.cd(z,"<non-identifier-key>")
return z},
$isj3:1,
q:{
ca:function(a,b){return new H.U(0,null,null,null,null,null,0,[a,b])}}},
jk:{"^":"l:0;a",
$1:function(a){return this.a.h(0,a)}},
jt:{"^":"f;d9:a<,ac:b@,c,eG:d<"},
ju:{"^":"c;a,$ti",
gk:function(a){return this.a.a},
gE:function(a){var z,y
z=this.a
y=new H.jv(z,z.r,null,null)
y.c=z.e
return y},
I:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.j(new P.a1(z))
y=y.c}}},
jv:{"^":"f;a,b,c,d",
gw:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.j(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ms:{"^":"l:0;a",
$1:function(a){return this.a(a)}},
mt:{"^":"l:11;a",
$2:function(a,b){return this.a(a,b)}},
mu:{"^":"l:12;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
mm:function(a){var z=H.h(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
aN:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
M:function(a){return a},
bZ:function(a,b,c){},
aU:function(a){var z,y,x
if(!!J.y(a).$isr)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
jE:function(a,b,c){H.bZ(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
eB:{"^":"i;",
eU:function(a,b,c){var z
H.bZ(a,b,c)
z=new Int32Array(a,b,c)
return z},
eT:function(a,b,c){var z
H.bZ(a,b,c)
z=new DataView(a,b,c)
return z},
$iseB:1,
$isc7:1,
"%":"ArrayBuffer"},
cf:{"^":"i;",$iscf:1,$isat:1,"%":";ArrayBufferView;d9|eC|eE|da|eD|eF|aR"},
ok:{"^":"cf;",$isat:1,"%":"DataView"},
d9:{"^":"cf;",
gk:function(a){return a.length},
$ist:1,
$ast:I.W,
$isr:1,
$asr:I.W},
da:{"^":"eE;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
a[b]=c}},
eC:{"^":"d9+H;",$ast:I.W,$asr:I.W,
$asd:function(){return[P.u]},
$asc:function(){return[P.u]},
$asb:function(){return[P.u]},
$isd:1,
$isc:1,
$isb:1},
eE:{"^":"eC+ef;",$ast:I.W,$asr:I.W,
$asd:function(){return[P.u]},
$asc:function(){return[P.u]},
$asb:function(){return[P.u]}},
aR:{"^":"eF;",
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
a[b]=c},
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]}},
eD:{"^":"d9+H;",$ast:I.W,$asr:I.W,
$asd:function(){return[P.q]},
$asc:function(){return[P.q]},
$asb:function(){return[P.q]},
$isd:1,
$isc:1,
$isb:1},
eF:{"^":"eD+ef;",$ast:I.W,$asr:I.W,
$asd:function(){return[P.q]},
$asc:function(){return[P.q]},
$asb:function(){return[P.q]}},
ol:{"^":"da;",$isc9:1,$isat:1,$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]},
$isb:1,
$asb:function(){return[P.u]},
"%":"Float32Array"},
om:{"^":"da;",$isat:1,$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]},
$isb:1,
$asb:function(){return[P.u]},
"%":"Float64Array"},
on:{"^":"aR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Int16Array"},
oo:{"^":"aR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Int32Array"},
op:{"^":"aR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Int8Array"},
oq:{"^":"aR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$iskz:1,
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Uint16Array"},
or:{"^":"aR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$iskA:1,
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Uint32Array"},
os:{"^":"aR;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
ot:{"^":"aR;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.L(H.O(a,b))
return a[b]},
$isat:1,
$isd:1,
$asd:function(){return[P.q]},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
kN:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.lX()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a7(new P.kP(z),1)).observe(y,{childList:true})
return new P.kO(z,y,x)}else if(self.setImmediate!=null)return P.lY()
return P.lZ()},
pi:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.a7(new P.kQ(a),0))},"$1","lX",2,0,5],
pj:[function(a){++init.globalState.f.b
self.setImmediate(H.a7(new P.kR(a),0))},"$1","lY",2,0,5],
pk:[function(a){P.dh(C.h,a)},"$1","lZ",2,0,5],
fm:function(a,b){if(H.bb(a,{func:1,args:[P.cg,P.cg]})){b.toString
return a}else{b.toString
return a}},
ie:function(a,b,c){var z
if(a==null)a=new P.ch()
z=$.x
if(z!==C.d)z.toString
z=new P.V(0,z,null,[c])
z.c7(a,b)
return z},
ig:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=new P.V(0,$.x,null,[P.d])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.ii(z,!1,b,y)
try{for(s=a.length,r=0;r<a.length;a.length===s||(0,H.aD)(a),++r){w=a[r]
v=z.b
w.bM(new P.ih(z,!1,b,y,v),x);++z.b}s=z.b
if(s===0){s=new P.V(0,$.x,null,[null])
s.c6(C.C)
return s}q=new Array(s)
q.fixed$length=Array
z.a=q}catch(p){u=H.a0(p)
t=H.a_(p)
if(z.b===0||!1)return P.ie(u,t,null)
else{z.c=u
z.d=t}}return y},
lM:function(a,b,c){$.x.toString
a.T(b,c)},
lP:function(){var z,y
for(;z=$.b8,z!=null;){$.bv=null
y=z.b
$.b8=y
if(y==null)$.bu=null
z.a.$0()}},
pF:[function(){$.ds=!0
try{P.lP()}finally{$.bv=null
$.ds=!1
if($.b8!=null)$.$get$dm().$1(P.fv())}},"$0","fv",0,0,2],
fq:function(a){var z=new P.fb(a,null)
if($.b8==null){$.bu=z
$.b8=z
if(!$.ds)$.$get$dm().$1(P.fv())}else{$.bu.b=z
$.bu=z}},
lU:function(a){var z,y,x
z=$.b8
if(z==null){P.fq(a)
$.bv=$.bu
return}y=new P.fb(a,null)
x=$.bv
if(x==null){y.b=z
$.bv=y
$.b8=y}else{y.b=x.b
x.b=y
$.bv=y
if(y.b==null)$.bu=y}},
fM:function(a){var z=$.x
if(C.d===z){P.b9(null,null,C.d,a)
return}z.toString
P.b9(null,null,z,z.bs(a,!0))},
pD:[function(a){},"$1","m_",2,0,24],
lQ:[function(a,b){var z=$.x
z.toString
P.bw(null,null,z,a,b)},function(a){return P.lQ(a,null)},"$2","$1","m1",2,2,6,0],
pE:[function(){},"$0","m0",0,0,2],
lT:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.a0(u)
y=H.a_(u)
$.x.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.be(x)
w=t
v=x.ga0()
c.$2(w,v)}}},
lE:function(a,b,c,d){var z=a.aT(0)
if(!!J.y(z).$isad&&z!==$.$get$bj())z.b0(new P.lH(b,c,d))
else b.T(c,d)},
lF:function(a,b){return new P.lG(a,b)},
lI:function(a,b,c){var z=a.aT(0)
if(!!J.y(z).$isad&&z!==$.$get$bj())z.b0(new P.lJ(b,c))
else b.ak(c)},
lD:function(a,b,c){$.x.toString
a.b7(b,c)},
kt:function(a,b){var z=$.x
if(z===C.d){z.toString
return P.dh(a,b)}return P.dh(a,z.bs(b,!0))},
dh:function(a,b){var z=C.b.D(a.a,1000)
return H.kq(z<0?0:z,b)},
bw:function(a,b,c,d,e){var z={}
z.a=d
P.lU(new P.lS(z,e))},
fn:function(a,b,c,d){var z,y
y=$.x
if(y===c)return d.$0()
$.x=c
z=y
try{y=d.$0()
return y}finally{$.x=z}},
fp:function(a,b,c,d,e){var z,y
y=$.x
if(y===c)return d.$1(e)
$.x=c
z=y
try{y=d.$1(e)
return y}finally{$.x=z}},
fo:function(a,b,c,d,e,f){var z,y
y=$.x
if(y===c)return d.$2(e,f)
$.x=c
z=y
try{y=d.$2(e,f)
return y}finally{$.x=z}},
b9:function(a,b,c,d){var z=C.d!==c
if(z)d=c.bs(d,!(!z||!1))
P.fq(d)},
kP:{"^":"l:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
kO:{"^":"l:13;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
kQ:{"^":"l:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
kR:{"^":"l:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ad:{"^":"f;$ti"},
ii:{"^":"l:4;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.T(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.T(z.c,z.d)}},
ih:{"^":"l;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.cb(x)}else if(z.b===0&&!this.b)this.d.T(z.c,z.d)},
$S:function(){return{func:1,args:[,]}}},
kU:{"^":"f;$ti",
eX:function(a,b){if(a==null)a=new P.ch()
if(this.a.a!==0)throw H.j(new P.bS("Future already completed"))
$.x.toString
this.T(a,b)},
bw:function(a){return this.eX(a,null)}},
dl:{"^":"kU;a,$ti",
bv:function(a,b){var z=this.a
if(z.a!==0)throw H.j(new P.bS("Future already completed"))
z.c6(b)},
T:function(a,b){this.a.c7(a,b)}},
ff:{"^":"f;bm:a<,b,c,d,e",
geP:function(){return this.b.b},
gd8:function(){return(this.c&1)!==0},
gfo:function(){return(this.c&2)!==0},
gd7:function(){return this.c===8},
fm:function(a){return this.b.b.bJ(this.d,a)},
fH:function(a){if(this.c!==6)return!0
return this.b.b.bJ(this.d,J.be(a))},
fi:function(a){var z,y,x
z=this.e
y=J.p(a)
x=this.b.b
if(H.bb(z,{func:1,args:[,,]}))return x.fU(z,y.gV(a),a.ga0())
else return x.bJ(z,y.gV(a))},
fn:function(){return this.b.b.aY(this.d)}},
V:{"^":"f;aR:a<,b,eL:c<,$ti",
geE:function(){return this.a===2},
gbj:function(){return this.a>=4},
bM:function(a,b){var z,y
z=$.x
if(z!==C.d){z.toString
if(b!=null)b=P.fm(b,z)}y=new P.V(0,z,null,[null])
this.b8(new P.ff(null,y,b==null?1:3,a,b))
return y},
aC:function(a){return this.bM(a,null)},
b0:function(a){var z,y
z=$.x
y=new P.V(0,z,null,this.$ti)
if(z!==C.d)z.toString
this.b8(new P.ff(null,y,8,a,null))
return y},
b8:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbj()){y.b8(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.b9(null,null,z,new P.l5(this,a))}},
cq:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbm()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbj()){v.cq(a)
return}this.a=v.a
this.c=v.c}z.a=this.aQ(a)
y=this.b
y.toString
P.b9(null,null,y,new P.lc(z,this))}},
aP:function(){var z=this.c
this.c=null
return this.aQ(z)},
aQ:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbm()
z.a=y}return y},
ak:function(a){var z,y
z=this.$ti
if(H.cx(a,"$isad",z,"$asad"))if(H.cx(a,"$isV",z,null))P.ct(a,this)
else P.fg(a,this)
else{y=this.aP()
this.a=4
this.c=a
P.b6(this,y)}},
cb:function(a){var z=this.aP()
this.a=4
this.c=a
P.b6(this,z)},
T:[function(a,b){var z=this.aP()
this.a=8
this.c=new P.c5(a,b)
P.b6(this,z)},function(a){return this.T(a,null)},"h7","$2","$1","gaL",2,2,6,0],
c6:function(a){var z
if(H.cx(a,"$isad",this.$ti,"$asad")){this.es(a)
return}this.a=1
z=this.b
z.toString
P.b9(null,null,z,new P.l7(this,a))},
es:function(a){var z
if(H.cx(a,"$isV",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.b9(null,null,z,new P.lb(this,a))}else P.ct(a,this)
return}P.fg(a,this)},
c7:function(a,b){var z
this.a=1
z=this.b
z.toString
P.b9(null,null,z,new P.l6(this,a,b))},
$isad:1,
q:{
l4:function(a,b){var z=new P.V(0,$.x,null,[b])
z.a=4
z.c=a
return z},
fg:function(a,b){var z,y,x
b.a=1
try{a.bM(new P.l8(b),new P.l9(b))}catch(x){z=H.a0(x)
y=H.a_(x)
P.fM(new P.la(b,z,y))}},
ct:function(a,b){var z,y,x
for(;a.geE();)a=a.c
z=a.gbj()
y=b.c
if(z){b.c=null
x=b.aQ(y)
b.a=a.a
b.c=a.c
P.b6(b,x)}else{b.a=2
b.c=a
a.cq(y)}},
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.be(v)
t=v.ga0()
y.toString
P.bw(null,null,y,u,t)}return}for(;b.gbm()!=null;b=s){s=b.a
b.a=null
P.b6(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gd8()||b.gd7()){q=b.geP()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=J.be(v)
t=v.ga0()
y.toString
P.bw(null,null,y,u,t)
return}p=$.x
if(p==null?q!=null:p!==q)$.x=q
else p=null
if(b.gd7())new P.lf(z,x,w,b).$0()
else if(y){if(b.gd8())new P.le(x,b,r).$0()}else if(b.gfo())new P.ld(z,x,b).$0()
if(p!=null)$.x=p
y=x.b
if(!!J.y(y).$isad){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.aQ(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.ct(y,o)
return}}o=b.b
b=o.aP()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
l5:{"^":"l:1;a,b",
$0:function(){P.b6(this.a,this.b)}},
lc:{"^":"l:1;a,b",
$0:function(){P.b6(this.b,this.a.a)}},
l8:{"^":"l:0;a",
$1:function(a){var z=this.a
z.a=0
z.ak(a)}},
l9:{"^":"l:14;a",
$2:function(a,b){this.a.T(a,b)},
$1:function(a){return this.$2(a,null)}},
la:{"^":"l:1;a,b,c",
$0:function(){this.a.T(this.b,this.c)}},
l7:{"^":"l:1;a,b",
$0:function(){this.a.cb(this.b)}},
lb:{"^":"l:1;a,b",
$0:function(){P.ct(this.b,this.a)}},
l6:{"^":"l:1;a,b,c",
$0:function(){this.a.T(this.b,this.c)}},
lf:{"^":"l:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.fn()}catch(w){y=H.a0(w)
x=H.a_(w)
if(this.c){v=J.be(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.c5(y,x)
u.a=!0
return}if(!!J.y(z).$isad){if(z instanceof P.V&&z.gaR()>=4){if(z.gaR()===8){v=this.b
v.b=z.geL()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.aC(new P.lg(t))
v.a=!1}}},
lg:{"^":"l:0;a",
$1:function(a){return this.a}},
le:{"^":"l:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.fm(this.c)}catch(x){z=H.a0(x)
y=H.a_(x)
w=this.a
w.b=new P.c5(z,y)
w.a=!0}}},
ld:{"^":"l:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.fH(z)===!0&&w.e!=null){v=this.b
v.b=w.fi(z)
v.a=!1}}catch(u){y=H.a0(u)
x=H.a_(u)
w=this.a
v=J.be(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.c5(y,x)
s.a=!0}}},
fb:{"^":"f;a,b"},
aI:{"^":"f;$ti",
af:function(a,b){return new P.ls(b,this,[H.Y(this,"aI",0),null])},
I:function(a,b){var z,y
z={}
y=new P.V(0,$.x,null,[null])
z.a=null
z.a=this.ae(new P.kf(z,this,b,y),!0,new P.kg(y),y.gaL())
return y},
gk:function(a){var z,y
z={}
y=new P.V(0,$.x,null,[P.q])
z.a=0
this.ae(new P.kh(z),!0,new P.ki(z,y),y.gaL())
return y},
aZ:function(a){var z,y,x
z=H.Y(this,"aI",0)
y=H.h([],[z])
x=new P.V(0,$.x,null,[[P.d,z]])
this.ae(new P.kj(this,y),!0,new P.kk(y,x),x.gaL())
return x},
gby:function(a){var z,y
z={}
y=new P.V(0,$.x,null,[H.Y(this,"aI",0)])
z.a=null
z.a=this.ae(new P.kb(z,this,y),!0,new P.kc(y),y.gaL())
return y}},
kf:{"^":"l;a,b,c,d",
$1:function(a){P.lT(new P.kd(this.c,a),new P.ke(),P.lF(this.a.a,this.d))},
$S:function(){return H.cy(function(a){return{func:1,args:[a]}},this.b,"aI")}},
kd:{"^":"l:1;a,b",
$0:function(){return this.a.$1(this.b)}},
ke:{"^":"l:0;",
$1:function(a){}},
kg:{"^":"l:1;a",
$0:function(){this.a.ak(null)}},
kh:{"^":"l:0;a",
$1:function(a){++this.a.a}},
ki:{"^":"l:1;a,b",
$0:function(){this.b.ak(this.a.a)}},
kj:{"^":"l;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.cy(function(a){return{func:1,args:[a]}},this.a,"aI")}},
kk:{"^":"l:1;a,b",
$0:function(){this.b.ak(this.a)}},
kb:{"^":"l;a,b,c",
$1:function(a){P.lI(this.a.a,this.c,a)},
$S:function(){return H.cy(function(a){return{func:1,args:[a]}},this.b,"aI")}},
kc:{"^":"l:1;a",
$0:function(){var z,y,x,w
try{x=H.d_()
throw H.j(x)}catch(w){z=H.a0(w)
y=H.a_(w)
P.lM(this.a,z,y)}}},
ka:{"^":"f;"},
cr:{"^":"f;aR:e<,$ti",
bA:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cL()
if((z&4)===0&&(this.e&32)===0)this.cg(this.gcm())},
dk:function(a){return this.bA(a,null)},
ds:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga5(z)}else z=!1
if(z)this.r.b4(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cg(this.gco())}}}},
aT:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.bb()
z=this.f
return z==null?$.$get$bj():z},
bb:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cL()
if((this.e&32)===0)this.r=null
this.f=this.cl()},
ba:["e3",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ct(b)
else this.b9(new P.kV(b,null,[H.Y(this,"cr",0)]))}],
b7:["e4",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cv(a,b)
else this.b9(new P.kX(a,b,null))}],
er:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cu()
else this.b9(C.o)},
cn:[function(){},"$0","gcm",0,0,2],
cp:[function(){},"$0","gco",0,0,2],
cl:function(){return},
b9:function(a){var z,y
z=this.r
if(z==null){z=new P.lB(null,null,0,[H.Y(this,"cr",0)])
this.r=z}z.K(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.b4(this)}},
ct:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.bK(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bc((z&4)!==0)},
cv:function(a,b){var z,y
z=this.e
y=new P.kT(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bb()
z=this.f
if(!!J.y(z).$isad&&z!==$.$get$bj())z.b0(y)
else y.$0()}else{y.$0()
this.bc((z&4)!==0)}},
cu:function(){var z,y
z=new P.kS(this)
this.bb()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.y(y).$isad&&y!==$.$get$bj())y.b0(z)
else z.$0()},
cg:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bc((z&4)!==0)},
bc:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga5(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga5(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cn()
else this.cp()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.b4(this)},
em:function(a,b,c,d,e){var z,y
z=a==null?P.m_():a
y=this.d
y.toString
this.a=z
this.b=P.fm(b==null?P.m1():b,y)
this.c=c==null?P.m0():c}},
kT:{"^":"l:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bb(y,{func:1,args:[P.f,P.b4]})
w=z.d
v=this.b
u=z.b
if(x)w.fV(u,v,this.c)
else w.bK(u,v)
z.e=(z.e&4294967263)>>>0}},
kS:{"^":"l:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dt(z.c)
z.e=(z.e&4294967263)>>>0}},
fd:{"^":"f;aX:a*"},
kV:{"^":"fd;b,a,$ti",
bB:function(a){a.ct(this.b)}},
kX:{"^":"fd;V:b>,a0:c<,a",
bB:function(a){a.cv(this.b,this.c)}},
kW:{"^":"f;",
bB:function(a){a.cu()},
gaX:function(a){return},
saX:function(a,b){throw H.j(new P.bS("No events after a done."))}},
lu:{"^":"f;aR:a<",
b4:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.fM(new P.lv(this,a))
this.a=1},
cL:function(){if(this.a===1)this.a=3}},
lv:{"^":"l:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaX(x)
z.b=w
if(w==null)z.c=null
x.bB(this.b)}},
lB:{"^":"lu;b,c,a,$ti",
ga5:function(a){return this.c==null},
K:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saX(0,b)
this.c=b}}},
lH:{"^":"l:1;a,b,c",
$0:function(){return this.a.T(this.b,this.c)}},
lG:{"^":"l:15;a,b",
$2:function(a,b){P.lE(this.a,this.b,a,b)}},
lJ:{"^":"l:1;a,b",
$0:function(){return this.a.ak(this.b)}},
dn:{"^":"aI;$ti",
ae:function(a,b,c,d){return this.ex(a,d,c,!0===b)},
de:function(a,b,c){return this.ae(a,null,b,c)},
ex:function(a,b,c,d){return P.l3(this,a,b,c,d,H.Y(this,"dn",0),H.Y(this,"dn",1))},
ci:function(a,b){b.ba(0,a)},
eD:function(a,b,c){c.b7(a,b)},
$asaI:function(a,b){return[b]}},
fe:{"^":"cr;x,y,a,b,c,d,e,f,r,$ti",
ba:function(a,b){if((this.e&2)!==0)return
this.e3(0,b)},
b7:function(a,b){if((this.e&2)!==0)return
this.e4(a,b)},
cn:[function(){var z=this.y
if(z==null)return
z.dk(0)},"$0","gcm",0,0,2],
cp:[function(){var z=this.y
if(z==null)return
z.ds(0)},"$0","gco",0,0,2],
cl:function(){var z=this.y
if(z!=null){this.y=null
return z.aT(0)}return},
h8:[function(a){this.x.ci(a,this)},"$1","geA",2,0,function(){return H.cy(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fe")}],
ha:[function(a,b){this.x.eD(a,b,this)},"$2","geC",4,0,16],
h9:[function(){this.er()},"$0","geB",0,0,2],
eo:function(a,b,c,d,e,f,g){this.y=this.x.a.de(this.geA(),this.geB(),this.geC())},
$ascr:function(a,b){return[b]},
q:{
l3:function(a,b,c,d,e,f,g){var z,y
z=$.x
y=e?1:0
y=new P.fe(a,null,null,null,null,z,y,null,null,[f,g])
y.em(b,c,d,e,g)
y.eo(a,b,c,d,e,f,g)
return y}}},
ls:{"^":"dn;b,a,$ti",
ci:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.a0(w)
x=H.a_(w)
P.lD(b,y,x)
return}b.ba(0,z)}},
c5:{"^":"f;V:a>,a0:b<",
l:function(a){return H.m(this.a)},
$isT:1},
lC:{"^":"f;"},
lS:{"^":"l:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.ch()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.j(z)
x=H.j(z)
x.stack=J.aZ(y)
throw x}},
lx:{"^":"lC;",
dt:function(a){var z,y,x,w
try{if(C.d===$.x){x=a.$0()
return x}x=P.fn(null,null,this,a)
return x}catch(w){z=H.a0(w)
y=H.a_(w)
x=P.bw(null,null,this,z,y)
return x}},
bK:function(a,b){var z,y,x,w
try{if(C.d===$.x){x=a.$1(b)
return x}x=P.fp(null,null,this,a,b)
return x}catch(w){z=H.a0(w)
y=H.a_(w)
x=P.bw(null,null,this,z,y)
return x}},
fV:function(a,b,c){var z,y,x,w
try{if(C.d===$.x){x=a.$2(b,c)
return x}x=P.fo(null,null,this,a,b,c)
return x}catch(w){z=H.a0(w)
y=H.a_(w)
x=P.bw(null,null,this,z,y)
return x}},
bs:function(a,b){if(b)return new P.ly(this,a)
else return new P.lz(this,a)},
eV:function(a,b){return new P.lA(this,a)},
h:function(a,b){return},
aY:function(a){if($.x===C.d)return a.$0()
return P.fn(null,null,this,a)},
bJ:function(a,b){if($.x===C.d)return a.$1(b)
return P.fp(null,null,this,a,b)},
fU:function(a,b,c){if($.x===C.d)return a.$2(b,c)
return P.fo(null,null,this,a,b,c)}},
ly:{"^":"l:1;a,b",
$0:function(){return this.a.dt(this.b)}},
lz:{"^":"l:1;a,b",
$0:function(){return this.a.aY(this.b)}},
lA:{"^":"l:0;a,b",
$1:function(a){return this.a.bK(this.b,a)}}}],["","",,P,{"^":"",
jw:function(a,b){return new H.U(0,null,null,null,null,null,0,[a,b])},
d4:function(){return new H.U(0,null,null,null,null,null,0,[null,null])},
bl:function(a){return H.mn(a,new H.U(0,null,null,null,null,null,0,[null,null]))},
jb:function(a,b,c){var z,y
if(P.dt(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bx()
y.push(a)
try{P.lO(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.eT(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bk:function(a,b,c){var z,y,x
if(P.dt(a))return b+"..."+c
z=new P.dg(b)
y=$.$get$bx()
y.push(a)
try{x=z
x.J=P.eT(x.gJ(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.J=y.gJ()+c
y=z.gJ()
return y.charCodeAt(0)==0?y:y},
dt:function(a){var z,y
for(z=0;y=$.$get$bx(),z<y.length;++z)if(a===y[z])return!0
return!1},
lO:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gE(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.v())return
w=H.m(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.v()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gw();++x
if(!z.v()){if(x<=4){b.push(H.m(t))
return}v=H.m(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.v();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.m(t)
v=H.m(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
bm:function(a,b,c,d){return new P.ll(0,null,null,null,null,null,0,[d])},
eq:function(a){var z,y,x
z={}
if(P.dt(a))return"{...}"
y=new P.dg("")
try{$.$get$bx().push(a)
x=y
x.J=x.gJ()+"{"
z.a=!0
a.I(0,new P.jz(z,y))
z=y
z.J=z.gJ()+"}"}finally{z=$.$get$bx()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gJ()
return z.charCodeAt(0)==0?z:z},
fj:{"^":"U;a,b,c,d,e,f,r,$ti",
ax:function(a){return H.mL(a)&0x3ffffff},
ay:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gd9()
if(x==null?b==null:x===b)return y}return-1},
q:{
bt:function(a,b){return new P.fj(0,null,null,null,null,null,0,[a,b])}}},
ll:{"^":"lh;a,b,c,d,e,f,r,$ti",
gE:function(a){var z=new P.dq(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
au:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ew(b)},
ew:function(a){var z=this.d
if(z==null)return!1
return this.aN(z[this.aM(a)],a)>=0},
df:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.au(0,a)?a:null
else return this.eF(a)},
eF:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aM(a)]
x=this.aN(y,a)
if(x<0)return
return J.e(y,x).gce()},
I:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.j(new P.a1(this))
z=z.b}},
K:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.c8(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.c8(x,b)}else return this.a1(0,b)},
a1:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.ln()
this.d=z}y=this.aM(b)
x=z[y]
if(x==null)z[y]=[this.be(b)]
else{if(this.aN(x,b)>=0)return!1
x.push(this.be(b))}return!0},
aA:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.c9(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.c9(this.c,b)
else return this.eI(0,b)},
eI:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aM(b)]
x=this.aN(y,b)
if(x<0)return!1
this.ca(y.splice(x,1)[0])
return!0},
a3:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
c8:function(a,b){if(a[b]!=null)return!1
a[b]=this.be(b)
return!0},
c9:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ca(z)
delete a[b]
return!0},
be:function(a){var z,y
z=new P.lm(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ca:function(a){var z,y
z=a.gev()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aM:function(a){return J.ac(a)&0x3ffffff},
aN:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.w(a[y].gce(),b))return y
return-1},
$isc:1,
$asc:null,
$isb:1,
$asb:null,
q:{
ln:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
lm:{"^":"f;ce:a<,b,ev:c<"},
dq:{"^":"f;a,b,c,d",
gw:function(){return this.d},
v:function(){var z=this.a
if(this.b!==z.r)throw H.j(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
lh:{"^":"k1;$ti"},
H:{"^":"f;$ti",
gE:function(a){return new H.eo(a,this.gk(a),0,null)},
u:function(a,b){return this.h(a,b)},
I:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gk(a))throw H.j(new P.a1(a))}},
af:function(a,b){return new H.cd(a,b,[H.Y(a,"H",0),null])},
l:function(a){return P.bk(a,"[","]")},
$isd:1,
$asd:null,
$isc:1,
$asc:null,
$isb:1,
$asb:null},
jz:{"^":"l:4;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.J+=", "
z.a=!1
z=this.b
y=z.J+=H.m(a)
z.J=y+": "
z.J+=H.m(b)}},
jx:{"^":"bP;a,b,c,d,$ti",
gE:function(a){return new P.lo(this,this.c,this.d,this.b,null)},
I:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.L(new P.a1(this))}},
ga5:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
u:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.n(b)
if(0>b||b>=z)H.L(P.G(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
a3:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
l:function(a){return P.bk(this,"{","}")},
dq:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.j(H.d_());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a1:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cf();++this.d},
cf:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.h(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.c_(y,0,w,z,x)
C.c.c_(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ea:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.h(z,[b])},
$asc:null,
$asb:null,
q:{
d5:function(a,b){var z=new P.jx(null,0,0,0,[b])
z.ea(a,b)
return z}}},
lo:{"^":"f;a,b,c,d,e",
gw:function(){return this.e},
v:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.L(new P.a1(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
k2:{"^":"f;$ti",
af:function(a,b){return new H.e5(this,b,[H.aL(this,0),null])},
l:function(a){return P.bk(this,"{","}")},
I:function(a,b){var z
for(z=new P.dq(this,this.r,null,null),z.c=this.e;z.v();)b.$1(z.d)},
$isc:1,
$asc:null,
$isb:1,
$asb:null},
k1:{"^":"k2;$ti"}}],["","",,P,{"^":"",
cv:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.lk(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cv(a[z])
return a},
lR:function(a,b){var z,y,x,w
z=null
try{z=JSON.parse(a)}catch(x){y=H.a0(x)
w=String(y)
throw H.j(new P.cX(w,null,null))}w=P.cv(z)
return w},
lk:{"^":"f;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.eH(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.bf().length
return z},
j:function(a,b,c){var z,y
if(this.b==null)this.c.j(0,b,c)
else if(this.am(0,b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.eO().j(0,b,c)},
am:function(a,b){if(this.b==null)return this.c.am(0,b)
if(typeof b!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,b)},
I:function(a,b){var z,y,x,w
if(this.b==null)return this.c.I(0,b)
z=this.bf()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cv(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.j(new P.a1(this))}},
l:function(a){return P.eq(this)},
bf:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
eO:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.jw(P.v,null)
y=this.bf()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.j(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.c.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
eH:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cv(this.a[a])
return this.b[a]=z}},
i_:{"^":"f;"},
e1:{"^":"f;$ti"},
jm:{"^":"i_;a,b",
f2:function(a,b){var z=P.lR(a,this.gf4().a)
return z},
f1:function(a){return this.f2(a,null)},
gf4:function(){return C.B}},
jn:{"^":"e1;a",
$ase1:function(){return[P.v,P.f]}}}],["","",,P,{"^":"",
mk:[function(a,b){return H.ck(a,b)},function(a){return P.mk(a,null)},"$2","$1","mh",2,2,25,0],
e7:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aZ(a)
if(typeof a==="string")return JSON.stringify(a)
return P.ib(a)},
ib:function(a){var z=J.y(a)
if(!!z.$isl)return z.l(a)
return H.cj(a)},
bK:function(a){return new P.l2(a)},
d6:function(a,b,c){var z,y
z=H.h([],[c])
for(y=J.bG(a);y.v();)z.push(y.gw())
if(b)return z
z.fixed$length=Array
return z},
a6:function(a,b,c,d){var z,y,x
z=H.h([],[d])
C.c.sk(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
aa:function(a){H.aN(H.m(a))},
eU:function(a,b,c){var z=H.jR(a,b,P.cm(b,c,a.length,null,null,null))
return z},
cw:{"^":"f;"},
"+bool":0,
e3:{"^":"f;a,b",
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.e3))return!1
return this.a===b.a&&this.b===b.b},
gG:function(a){var z=this.a
return(z^C.b.bo(z,30))&1073741823},
l:function(a){var z,y,x,w,v,u,t
z=P.i4(H.jQ(this))
y=P.bJ(H.jO(this))
x=P.bJ(H.jK(this))
w=P.bJ(H.jL(this))
v=P.bJ(H.jN(this))
u=P.bJ(H.jP(this))
t=P.i5(H.jM(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
gfI:function(){return this.a},
e9:function(a,b){var z
if(!(Math.abs(this.a)>864e13))z=!1
else z=!0
if(z)throw H.j(P.bg(this.gfI()))},
q:{
i4:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.m(z)
if(z>=10)return y+"00"+H.m(z)
return y+"000"+H.m(z)},
i5:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bJ:function(a){if(a>=10)return""+a
return"0"+a}}},
u:{"^":"c_;"},
"+double":0,
aQ:{"^":"f;al:a<",
F:function(a,b){return new P.aQ(this.a+b.gal())},
A:function(a,b){return new P.aQ(this.a-b.gal())},
W:function(a,b){if(typeof b!=="number")return H.n(b)
return new P.aQ(C.a.bI(this.a*b))},
P:function(a,b){return this.a<b.gal()},
S:function(a,b){return this.a>b.gal()},
aH:function(a,b){return C.b.aH(this.a,b.gal())},
b1:function(a,b){return C.b.b1(this.a,b.gal())},
B:function(a,b){if(b==null)return!1
if(!(b instanceof P.aQ))return!1
return this.a===b.a},
gG:function(a){return this.a&0x1FFFFFFF},
l:function(a){var z,y,x,w,v
z=new P.i9()
y=this.a
if(y<0)return"-"+new P.aQ(0-y).l(0)
x=z.$1(C.b.D(y,6e7)%60)
w=z.$1(C.b.D(y,1e6)%60)
v=new P.i8().$1(y%1e6)
return""+C.b.D(y,36e8)+":"+H.m(x)+":"+H.m(w)+"."+H.m(v)},
cB:function(a){return new P.aQ(Math.abs(this.a))},
b3:function(a){return new P.aQ(0-this.a)}},
i8:{"^":"l:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
i9:{"^":"l:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
T:{"^":"f;",
ga0:function(){return H.a_(this.$thrownJsError)}},
ch:{"^":"T;",
l:function(a){return"Throw of null."}},
aP:{"^":"T;a,b,c,d",
gbh:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbg:function(){return""},
l:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.m(z)
w=this.gbh()+y+x
if(!this.a)return w
v=this.gbg()
u=P.e7(this.b)
return w+v+": "+H.m(u)},
q:{
bg:function(a){return new P.aP(!1,null,null,a)},
dT:function(a,b,c){return new P.aP(!0,a,b,c)},
hw:function(a){return new P.aP(!1,null,a,"Must not be null")}}},
de:{"^":"aP;e,f,a,b,c,d",
gbh:function(){return"RangeError"},
gbg:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.m(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.m(z)
else if(x>z)y=": Not in range "+H.m(z)+".."+H.m(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.m(z)}return y},
q:{
jW:function(a){return new P.de(null,null,!1,null,null,a)},
cl:function(a,b,c){return new P.de(null,null,!0,a,b,"Value not in range")},
b3:function(a,b,c,d,e){return new P.de(b,c,!0,a,d,"Invalid value")},
cm:function(a,b,c,d,e,f){if(0>a||a>c)throw H.j(P.b3(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.j(P.b3(b,a,c,"end",f))
return b}return c}}},
io:{"^":"aP;e,k:f>,a,b,c,d",
gbh:function(){return"RangeError"},
gbg:function(){if(J.S(this.b,0))return": index must not be negative"
var z=this.f
if(J.w(z,0))return": no indices are valid"
return": index should be less than "+H.m(z)},
q:{
G:function(a,b,c,d,e){var z=e!=null?e:J.bH(b)
return new P.io(b,z,!0,a,c,"Index out of range")}}},
B:{"^":"T;a",
l:function(a){return"Unsupported operation: "+this.a}},
dj:{"^":"T;a",
l:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.m(z):"UnimplementedError"}},
bS:{"^":"T;a",
l:function(a){return"Bad state: "+this.a}},
a1:{"^":"T;a",
l:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.m(P.e7(z))+"."}},
jF:{"^":"f;",
l:function(a){return"Out of Memory"},
ga0:function(){return},
$isT:1},
eS:{"^":"f;",
l:function(a){return"Stack Overflow"},
ga0:function(){return},
$isT:1},
i3:{"^":"T;a",
l:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.m(z)+"' during its initialization"}},
l2:{"^":"f;a",
l:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.m(z)}},
cX:{"^":"f;a,b,c",
l:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.e.aK(x,0,75)+"..."
return y+"\n"+x}},
ic:{"^":"f;a,ck",
l:function(a){return"Expando:"+H.m(this.a)},
h:function(a,b){var z,y
z=this.ck
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.L(P.dT(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dc(b,"expando$values")
return y==null?null:H.dc(y,z)},
j:function(a,b,c){var z,y
z=this.ck
if(typeof z!=="string")z.set(b,c)
else{y=H.dc(b,"expando$values")
if(y==null){y=new P.f()
H.eM(b,"expando$values",y)}H.eM(y,z,c)}}},
q:{"^":"c_;"},
"+int":0,
b:{"^":"f;$ti",
af:function(a,b){return H.cc(this,b,H.Y(this,"b",0),null)},
I:function(a,b){var z
for(z=this.gE(this);z.v();)b.$1(z.gw())},
b_:function(a,b){return P.d6(this,!0,H.Y(this,"b",0))},
aZ:function(a){return this.b_(a,!0)},
gk:function(a){var z,y
z=this.gE(this)
for(y=0;z.v();)++y
return y},
u:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.j(P.hw("index"))
if(b<0)H.L(P.b3(b,0,null,"index",null))
for(z=this.gE(this),y=0;z.v();){x=z.gw()
if(b===y)return x;++y}throw H.j(P.G(b,this,"index",null,y))},
l:function(a){return P.jb(this,"(",")")},
$asb:null},
jd:{"^":"f;"},
d:{"^":"f;$ti",$asd:null,$isc:1,$asc:null,$isb:1,$asb:null},
"+List":0,
aj:{"^":"f;$ti"},
cg:{"^":"f;",
gG:function(a){return P.f.prototype.gG.call(this,this)},
l:function(a){return"null"}},
"+Null":0,
c_:{"^":"f;"},
"+num":0,
f:{"^":";",
B:function(a,b){return this===b},
gG:function(a){return H.aS(this)},
l:function(a){return H.cj(this)},
toString:function(){return this.l(this)}},
b4:{"^":"f;"},
v:{"^":"f;"},
"+String":0,
dg:{"^":"f;J<",
gk:function(a){return this.J.length},
l:function(a){var z=this.J
return z.charCodeAt(0)==0?z:z},
q:{
eT:function(a,b,c){var z=J.bG(b)
if(!z.v())return a
if(c.length===0){do a+=H.m(z.gw())
while(z.v())}else{a+=H.m(z.gw())
for(;z.v();)a=a+c+H.m(z.gw())}return a}}}}],["","",,W,{"^":"",
eg:function(a,b,c){var z=document.createElement("img")
return z},
aT:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fh:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
fl:function(a){var z
if(!!J.y(a).$ise4)return a
z=new P.kL([],[],!1)
z.c=!0
return z.bO(a)},
fr:function(a){var z=$.x
if(z===C.d)return a
return z.eV(a,!0)},
a5:{"^":"e6;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
nj:{"^":"a5;",
l:function(a){return String(a)},
$isi:1,
"%":"HTMLAnchorElement"},
nl:{"^":"a5;",
l:function(a){return String(a)},
$isi:1,
"%":"HTMLAreaElement"},
af:{"^":"i;aU:enabled=",$isf:1,"%":"AudioTrack"},
nn:{"^":"eb;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.af]},
$isc:1,
$asc:function(){return[W.af]},
$isb:1,
$asb:function(){return[W.af]},
$ist:1,
$ast:function(){return[W.af]},
$isr:1,
$asr:function(){return[W.af]},
"%":"AudioTrackList"},
e8:{"^":"E+H;",
$asd:function(){return[W.af]},
$asc:function(){return[W.af]},
$asb:function(){return[W.af]},
$isd:1,
$isc:1,
$isb:1},
eb:{"^":"e8+K;",
$asd:function(){return[W.af]},
$asc:function(){return[W.af]},
$asb:function(){return[W.af]},
$isd:1,
$isc:1,
$isb:1},
hI:{"^":"i;","%":";Blob"},
no:{"^":"a5;",$isi:1,"%":"HTMLBodyElement"},
c8:{"^":"a5;M:height},N:width}",
dL:function(a,b,c){return a.getContext(b)},
bQ:function(a,b){return this.dL(a,b,null)},
$isc8:1,
"%":"HTMLCanvasElement"},
np:{"^":"i;ff:fillStyle}","%":"CanvasRenderingContext2D"},
nq:{"^":"z;k:length=",$isi:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
nr:{"^":"E;",$isi:1,"%":"CompositorWorker"},
ag:{"^":"i;",$isf:1,"%":"CSSCharsetRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
ns:{"^":"ip;k:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
ip:{"^":"i+i2;"},
i2:{"^":"f;"},
nt:{"^":"i;k:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
nu:{"^":"i;n:x=,p:y=","%":"DeviceAcceleration"},
e4:{"^":"z;",$ise4:1,"%":"Document|HTMLDocument|XMLDocument"},
nv:{"^":"z;",$isi:1,"%":"DocumentFragment|ShadowRoot"},
nw:{"^":"i;",
l:function(a){return String(a)},
"%":"DOMException"},
nx:{"^":"i;",
h3:function(a,b,c,d){return a.scale(b,c,d)},
C:function(a,b){return a.scale(b)},
"%":"DOMMatrix|DOMMatrixReadOnly"},
ny:{"^":"i6;",
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":"DOMPoint"},
i6:{"^":"i;",
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":";DOMPointReadOnly"},
i7:{"^":"i;",
l:function(a){return"Rectangle ("+H.m(a.left)+", "+H.m(a.top)+") "+H.m(this.gN(a))+" x "+H.m(this.gM(a))},
B:function(a,b){var z
if(b==null)return!1
z=J.y(b)
if(!z.$isN)return!1
return a.left===z.gaz(b)&&a.top===z.gaD(b)&&this.gN(a)===z.gN(b)&&this.gM(a)===z.gM(b)},
gG:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gN(a)
w=this.gM(a)
return W.fh(W.aT(W.aT(W.aT(W.aT(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gbt:function(a){return a.bottom},
gM:function(a){return a.height},
gaz:function(a){return a.left},
gbE:function(a){return a.right},
gaD:function(a){return a.top},
gN:function(a){return a.width},
gn:function(a){return a.x},
gp:function(a){return a.y},
$isN:1,
$asN:I.W,
"%":";DOMRectReadOnly"},
nz:{"^":"iK;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[P.v]},
$isc:1,
$asc:function(){return[P.v]},
$isb:1,
$asb:function(){return[P.v]},
$ist:1,
$ast:function(){return[P.v]},
$isr:1,
$asr:function(){return[P.v]},
"%":"DOMStringList"},
iq:{"^":"i+H;",
$asd:function(){return[P.v]},
$asc:function(){return[P.v]},
$asb:function(){return[P.v]},
$isd:1,
$isc:1,
$isb:1},
iK:{"^":"iq+K;",
$asd:function(){return[P.v]},
$asc:function(){return[P.v]},
$asb:function(){return[P.v]},
$isd:1,
$isc:1,
$isb:1},
nA:{"^":"i;k:length=","%":"DOMTokenList"},
e6:{"^":"z;",
ga4:function(a){return P.jY(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
bq:function(a,b,c){var z,y,x
z=J.y(b)
y=!!z.$isb
if(!y||!z.hb(b,new W.ia()))throw H.j(P.bg("The frames parameter should be a List of Maps with frame information"))
x=y?z.af(b,P.mq()).aZ(0):b
z=a.animate(x)
return z},
a2:function(a,b){return this.bq(a,b,null)},
l:function(a){return a.localName},
gdg:function(a){return new W.bW(a,"contextmenu",!1,[W.aA])},
gdh:function(a){return new W.bW(a,"dragstart",!1,[W.aA])},
$isi:1,
"%":";Element"},
ia:{"^":"l:0;",
$1:function(a){return!0}},
nB:{"^":"a5;M:height},N:width}","%":"HTMLEmbedElement"},
nC:{"^":"bi;V:error=","%":"ErrorEvent"},
bi:{"^":"i;bN:type=",
dn:function(a){return a.preventDefault()},
$isf:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
E:{"^":"i;",
eq:function(a,b,c,d){return a.addEventListener(b,H.a7(c,1),!1)},
eJ:function(a,b,c,d){return a.removeEventListener(b,H.a7(c,1),!1)},
"%":"AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioSourceNode|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|CrossOriginServiceWorkerClient|DOMApplicationCache|DelayNode|DynamicsCompressorNode|EventSource|GainNode|IDBDatabase|IIRFilterNode|JavaScriptAudioNode|MIDIAccess|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MessagePort|NetworkInformation|Notification|OfflineResourceList|Oscillator|OscillatorNode|PannerNode|Performance|PermissionStatus|PresentationAvailability|PresentationReceiver|PresentationRequest|RTCDTMFSender|RTCPeerConnection|RealtimeAnalyserNode|ScreenOrientation|ScriptProcessorNode|ServicePortCollection|ServiceWorkerContainer|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|WaveShaperNode|WorkerPerformance|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;e8|eb|e9|ec|ea|ed"},
ah:{"^":"hI;",$isf:1,"%":"File"},
nV:{"^":"iL;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.ah]},
$isr:1,
$asr:function(){return[W.ah]},
$isd:1,
$asd:function(){return[W.ah]},
$isc:1,
$asc:function(){return[W.ah]},
$isb:1,
$asb:function(){return[W.ah]},
"%":"FileList"},
ir:{"^":"i+H;",
$asd:function(){return[W.ah]},
$asc:function(){return[W.ah]},
$asb:function(){return[W.ah]},
$isd:1,
$isc:1,
$isb:1},
iL:{"^":"ir+K;",
$asd:function(){return[W.ah]},
$asc:function(){return[W.ah]},
$asb:function(){return[W.ah]},
$isd:1,
$isc:1,
$isb:1},
nW:{"^":"E;V:error=","%":"FileReader"},
nX:{"^":"E;V:error=,k:length=","%":"FileWriter"},
nZ:{"^":"i;aW:loaded=","%":"FontFace"},
o_:{"^":"E;",
hc:function(a,b,c){return a.forEach(H.a7(b,3),c)},
I:function(a,b){b=H.a7(b,3)
return a.forEach(b)},
"%":"FontFaceSet"},
o1:{"^":"a5;k:length=","%":"HTMLFormElement"},
ai:{"^":"i;",$isf:1,"%":"Gamepad"},
o3:{"^":"i;k:length=","%":"History"},
o4:{"^":"iM;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.z]},
$isc:1,
$asc:function(){return[W.z]},
$isb:1,
$asb:function(){return[W.z]},
$ist:1,
$ast:function(){return[W.z]},
$isr:1,
$asr:function(){return[W.z]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
is:{"^":"i+H;",
$asd:function(){return[W.z]},
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isd:1,
$isc:1,
$isb:1},
iM:{"^":"is+K;",
$asd:function(){return[W.z]},
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isd:1,
$isc:1,
$isb:1},
il:{"^":"im;",
he:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
di:function(a,b,c){return a.open(b,c)},
a7:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
im:{"^":"E;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
o5:{"^":"a5;M:height},N:width}","%":"HTMLIFrameElement"},
cY:{"^":"a5;M:height},N:width}",$iscY:1,"%":"HTMLImageElement"},
o7:{"^":"a5;M:height},N:width}",$isi:1,"%":"HTMLInputElement"},
cb:{"^":"f8;fB:keyCode=",$iscb:1,$isf:1,"%":"KeyboardEvent"},
ob:{"^":"i;",
l:function(a){return String(a)},
"%":"Location"},
jA:{"^":"a5;V:error=","%":"HTMLAudioElement;HTMLMediaElement"},
of:{"^":"i;k:length=","%":"MediaList"},
og:{"^":"E;aS:active=","%":"MediaStream"},
oh:{"^":"E;aU:enabled=","%":"CanvasCaptureMediaStreamTrack|MediaStreamTrack"},
oi:{"^":"jC;",
h4:function(a,b,c){return a.send(b,c)},
a7:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
jC:{"^":"E;","%":"MIDIInput;MIDIPort"},
ak:{"^":"i;",$isf:1,"%":"MimeType"},
oj:{"^":"iW;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.ak]},
$isr:1,
$asr:function(){return[W.ak]},
$isd:1,
$asd:function(){return[W.ak]},
$isc:1,
$asc:function(){return[W.ak]},
$isb:1,
$asb:function(){return[W.ak]},
"%":"MimeTypeArray"},
iC:{"^":"i+H;",
$asd:function(){return[W.ak]},
$asc:function(){return[W.ak]},
$asb:function(){return[W.ak]},
$isd:1,
$isc:1,
$isb:1},
iW:{"^":"iC+K;",
$asd:function(){return[W.ak]},
$asc:function(){return[W.ak]},
$asb:function(){return[W.ak]},
$isd:1,
$isc:1,
$isb:1},
aA:{"^":"f8;cK:button=",
ga4:function(a){return new P.b2(a.clientX,a.clientY,[null])},
gfK:function(a){return new P.b2(a.movementX,a.movementY,[null])},
$isaA:1,
$isf:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
ou:{"^":"i;",$isi:1,"%":"Navigator"},
z:{"^":"E;",
l:function(a){var z=a.nodeValue
return z==null?this.e1(a):z},
$isf:1,
"%":"Attr;Node"},
ov:{"^":"iX;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.z]},
$isc:1,
$asc:function(){return[W.z]},
$isb:1,
$asb:function(){return[W.z]},
$ist:1,
$ast:function(){return[W.z]},
$isr:1,
$asr:function(){return[W.z]},
"%":"NodeList|RadioNodeList"},
iD:{"^":"i+H;",
$asd:function(){return[W.z]},
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isd:1,
$isc:1,
$isb:1},
iX:{"^":"iD+K;",
$asd:function(){return[W.z]},
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isd:1,
$isc:1,
$isb:1},
ox:{"^":"a5;M:height},N:width}","%":"HTMLObjectElement"},
oy:{"^":"i;",$isi:1,"%":"Path2D"},
oA:{"^":"di;k:length=","%":"Perspective"},
al:{"^":"i;k:length=",$isf:1,"%":"Plugin"},
oB:{"^":"iY;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.al]},
$isc:1,
$asc:function(){return[W.al]},
$isb:1,
$asb:function(){return[W.al]},
$ist:1,
$ast:function(){return[W.al]},
$isr:1,
$asr:function(){return[W.al]},
"%":"PluginArray"},
iE:{"^":"i+H;",
$asd:function(){return[W.al]},
$asc:function(){return[W.al]},
$asb:function(){return[W.al]},
$isd:1,
$isc:1,
$isb:1},
iY:{"^":"iE+K;",
$asd:function(){return[W.al]},
$asc:function(){return[W.al]},
$asb:function(){return[W.al]},
$isd:1,
$isc:1,
$isb:1},
oE:{"^":"kl;n:x=,p:y=","%":"PositionValue"},
oF:{"^":"E;",
a7:function(a,b){return a.send(b)},
"%":"PresentationConnection"},
eN:{"^":"bi;aW:loaded=","%":"ProgressEvent|ResourceProgressEvent"},
oL:{"^":"di;n:x=,p:y=","%":"Rotation"},
oM:{"^":"E;",
a7:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
oO:{"^":"a5;k:length=","%":"HTMLSelectElement"},
oP:{"^":"E;aS:active=","%":"ServiceWorkerRegistration"},
oQ:{"^":"E;",$isi:1,"%":"SharedWorker"},
am:{"^":"E;",$isf:1,"%":"SourceBuffer"},
oR:{"^":"ec;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.am]},
$isc:1,
$asc:function(){return[W.am]},
$isb:1,
$asb:function(){return[W.am]},
$ist:1,
$ast:function(){return[W.am]},
$isr:1,
$asr:function(){return[W.am]},
"%":"SourceBufferList"},
e9:{"^":"E+H;",
$asd:function(){return[W.am]},
$asc:function(){return[W.am]},
$asb:function(){return[W.am]},
$isd:1,
$isc:1,
$isb:1},
ec:{"^":"e9+K;",
$asd:function(){return[W.am]},
$asc:function(){return[W.am]},
$asb:function(){return[W.am]},
$isd:1,
$isc:1,
$isb:1},
an:{"^":"i;",$isf:1,"%":"SpeechGrammar"},
oS:{"^":"iZ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.an]},
$isc:1,
$asc:function(){return[W.an]},
$isb:1,
$asb:function(){return[W.an]},
$ist:1,
$ast:function(){return[W.an]},
$isr:1,
$asr:function(){return[W.an]},
"%":"SpeechGrammarList"},
iF:{"^":"i+H;",
$asd:function(){return[W.an]},
$asc:function(){return[W.an]},
$asb:function(){return[W.an]},
$isd:1,
$isc:1,
$isb:1},
iZ:{"^":"iF+K;",
$asd:function(){return[W.an]},
$asc:function(){return[W.an]},
$asb:function(){return[W.an]},
$isd:1,
$isc:1,
$isb:1},
oT:{"^":"bi;V:error=","%":"SpeechRecognitionError"},
ao:{"^":"i;k:length=",$isf:1,"%":"SpeechRecognitionResult"},
oV:{"^":"i;",
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
I:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gk:function(a){return a.length},
"%":"Storage"},
ap:{"^":"i;",$isf:1,"%":"CSSStyleSheet|StyleSheet"},
kl:{"^":"i;","%":"CalcLength|KeywordValue|LengthValue|NumberValue|SimpleLength|TransformValue;StyleValue"},
aq:{"^":"E;",$isf:1,"%":"TextTrack"},
ar:{"^":"E;",$isf:1,"%":"TextTrackCue|VTTCue"},
p0:{"^":"j_;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.ar]},
$isr:1,
$asr:function(){return[W.ar]},
$isd:1,
$asd:function(){return[W.ar]},
$isc:1,
$asc:function(){return[W.ar]},
$isb:1,
$asb:function(){return[W.ar]},
"%":"TextTrackCueList"},
iG:{"^":"i+H;",
$asd:function(){return[W.ar]},
$asc:function(){return[W.ar]},
$asb:function(){return[W.ar]},
$isd:1,
$isc:1,
$isb:1},
j_:{"^":"iG+K;",
$asd:function(){return[W.ar]},
$asc:function(){return[W.ar]},
$asb:function(){return[W.ar]},
$isd:1,
$isc:1,
$isb:1},
p1:{"^":"ed;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.aq]},
$isr:1,
$asr:function(){return[W.aq]},
$isd:1,
$asd:function(){return[W.aq]},
$isc:1,
$asc:function(){return[W.aq]},
$isb:1,
$asb:function(){return[W.aq]},
"%":"TextTrackList"},
ea:{"^":"E+H;",
$asd:function(){return[W.aq]},
$asc:function(){return[W.aq]},
$asb:function(){return[W.aq]},
$isd:1,
$isc:1,
$isb:1},
ed:{"^":"ea+K;",
$asd:function(){return[W.aq]},
$asc:function(){return[W.aq]},
$asb:function(){return[W.aq]},
$isd:1,
$isc:1,
$isb:1},
p2:{"^":"i;k:length=","%":"TimeRanges"},
as:{"^":"i;",
ga4:function(a){return new P.b2(C.a.bI(a.clientX),C.a.bI(a.clientY),[null])},
$isf:1,
"%":"Touch"},
p3:{"^":"j0;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.as]},
$isc:1,
$asc:function(){return[W.as]},
$isb:1,
$asb:function(){return[W.as]},
$ist:1,
$ast:function(){return[W.as]},
$isr:1,
$asr:function(){return[W.as]},
"%":"TouchList"},
iH:{"^":"i+H;",
$asd:function(){return[W.as]},
$asc:function(){return[W.as]},
$asb:function(){return[W.as]},
$isd:1,
$isc:1,
$isb:1},
j0:{"^":"iH+K;",
$asd:function(){return[W.as]},
$asc:function(){return[W.as]},
$asb:function(){return[W.as]},
$isd:1,
$isc:1,
$isb:1},
p4:{"^":"i;k:length=","%":"TrackDefaultList"},
di:{"^":"i;","%":"Matrix|Skew;TransformComponent"},
p7:{"^":"di;n:x=,p:y=","%":"Translation"},
f8:{"^":"bi;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
p8:{"^":"i;",
l:function(a){return String(a)},
$isi:1,
"%":"URL"},
pa:{"^":"jA;M:height},N:width}","%":"HTMLVideoElement"},
pb:{"^":"E;k:length=","%":"VideoTrackList"},
pe:{"^":"i;k:length=","%":"VTTRegionList"},
pf:{"^":"E;",
a7:function(a,b){return a.send(b)},
"%":"WebSocket"},
kH:{"^":"E;",
eK:function(a,b){return a.requestAnimationFrame(H.a7(b,1))},
ez:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isi:1,
"%":"DOMWindow|Window"},
pg:{"^":"E;",$isi:1,"%":"Worker"},
ph:{"^":"E;",$isi:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
pl:{"^":"i;bt:bottom=,M:height=,az:left=,bE:right=,aD:top=,N:width=",
l:function(a){return"Rectangle ("+H.m(a.left)+", "+H.m(a.top)+") "+H.m(a.width)+" x "+H.m(a.height)},
B:function(a,b){var z,y,x
if(b==null)return!1
z=J.y(b)
if(!z.$isN)return!1
y=a.left
x=z.gaz(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaD(b)
if(y==null?x==null:y===x){y=a.width
x=z.gN(b)
if(y==null?x==null:y===x){y=a.height
z=z.gM(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gG:function(a){var z,y,x,w
z=J.ac(a.left)
y=J.ac(a.top)
x=J.ac(a.width)
w=J.ac(a.height)
return W.fh(W.aT(W.aT(W.aT(W.aT(0,z),y),x),w))},
$isN:1,
$asN:I.W,
"%":"ClientRect"},
pm:{"^":"j1;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[P.N]},
$isr:1,
$asr:function(){return[P.N]},
$isd:1,
$asd:function(){return[P.N]},
$isc:1,
$asc:function(){return[P.N]},
$isb:1,
$asb:function(){return[P.N]},
"%":"ClientRectList|DOMRectList"},
iI:{"^":"i+H;",
$asd:function(){return[P.N]},
$asc:function(){return[P.N]},
$asb:function(){return[P.N]},
$isd:1,
$isc:1,
$isb:1},
j1:{"^":"iI+K;",
$asd:function(){return[P.N]},
$asc:function(){return[P.N]},
$asb:function(){return[P.N]},
$isd:1,
$isc:1,
$isb:1},
pn:{"^":"j2;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.ag]},
$isc:1,
$asc:function(){return[W.ag]},
$isb:1,
$asb:function(){return[W.ag]},
$ist:1,
$ast:function(){return[W.ag]},
$isr:1,
$asr:function(){return[W.ag]},
"%":"CSSRuleList"},
iJ:{"^":"i+H;",
$asd:function(){return[W.ag]},
$asc:function(){return[W.ag]},
$asb:function(){return[W.ag]},
$isd:1,
$isc:1,
$isb:1},
j2:{"^":"iJ+K;",
$asd:function(){return[W.ag]},
$asc:function(){return[W.ag]},
$asb:function(){return[W.ag]},
$isd:1,
$isc:1,
$isb:1},
po:{"^":"z;",$isi:1,"%":"DocumentType"},
pp:{"^":"i7;",
gM:function(a){return a.height},
gN:function(a){return a.width},
gn:function(a){return a.x},
gp:function(a){return a.y},
"%":"DOMRect"},
pq:{"^":"iN;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.ai]},
$isr:1,
$asr:function(){return[W.ai]},
$isd:1,
$asd:function(){return[W.ai]},
$isc:1,
$asc:function(){return[W.ai]},
$isb:1,
$asb:function(){return[W.ai]},
"%":"GamepadList"},
it:{"^":"i+H;",
$asd:function(){return[W.ai]},
$asc:function(){return[W.ai]},
$asb:function(){return[W.ai]},
$isd:1,
$isc:1,
$isb:1},
iN:{"^":"it+K;",
$asd:function(){return[W.ai]},
$asc:function(){return[W.ai]},
$asb:function(){return[W.ai]},
$isd:1,
$isc:1,
$isb:1},
ps:{"^":"a5;",$isi:1,"%":"HTMLFrameSetElement"},
pt:{"^":"iO;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.z]},
$isc:1,
$asc:function(){return[W.z]},
$isb:1,
$asb:function(){return[W.z]},
$ist:1,
$ast:function(){return[W.z]},
$isr:1,
$asr:function(){return[W.z]},
"%":"MozNamedAttrMap|NamedNodeMap"},
iu:{"^":"i+H;",
$asd:function(){return[W.z]},
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isd:1,
$isc:1,
$isb:1},
iO:{"^":"iu+K;",
$asd:function(){return[W.z]},
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isd:1,
$isc:1,
$isb:1},
px:{"^":"E;",$isi:1,"%":"ServiceWorker"},
py:{"^":"iP;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isd:1,
$asd:function(){return[W.ao]},
$isc:1,
$asc:function(){return[W.ao]},
$isb:1,
$asb:function(){return[W.ao]},
$ist:1,
$ast:function(){return[W.ao]},
$isr:1,
$asr:function(){return[W.ao]},
"%":"SpeechRecognitionResultList"},
iv:{"^":"i+H;",
$asd:function(){return[W.ao]},
$asc:function(){return[W.ao]},
$asb:function(){return[W.ao]},
$isd:1,
$isc:1,
$isb:1},
iP:{"^":"iv+K;",
$asd:function(){return[W.ao]},
$asc:function(){return[W.ao]},
$asb:function(){return[W.ao]},
$isd:1,
$isc:1,
$isb:1},
pz:{"^":"iQ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.ap]},
$isr:1,
$asr:function(){return[W.ap]},
$isd:1,
$asd:function(){return[W.ap]},
$isc:1,
$asc:function(){return[W.ap]},
$isb:1,
$asb:function(){return[W.ap]},
"%":"StyleSheetList"},
iw:{"^":"i+H;",
$asd:function(){return[W.ap]},
$asc:function(){return[W.ap]},
$asb:function(){return[W.ap]},
$isd:1,
$isc:1,
$isb:1},
iQ:{"^":"iw+K;",
$asd:function(){return[W.ap]},
$asc:function(){return[W.ap]},
$asb:function(){return[W.ap]},
$isd:1,
$isc:1,
$isb:1},
pB:{"^":"i;",$isi:1,"%":"WorkerLocation"},
pC:{"^":"i;",$isi:1,"%":"WorkerNavigator"},
l_:{"^":"aI;a,b,c,$ti",
ae:function(a,b,c,d){return W.ae(this.a,this.b,a,!1,H.aL(this,0))},
de:function(a,b,c){return this.ae(a,null,b,c)}},
bW:{"^":"l_;a,b,c,$ti"},
l0:{"^":"ka;a,b,c,d,e,$ti",
aT:function(a){if(this.b==null)return
this.cA()
this.b=null
this.d=null
return},
bA:function(a,b){if(this.b==null)return;++this.a
this.cA()},
dk:function(a){return this.bA(a,null)},
ds:function(a){if(this.b==null||this.a<=0)return;--this.a
this.cw()},
cw:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.fV(x,this.c,z,!1)}},
cA:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.fW(x,this.c,z,!1)}},
en:function(a,b,c,d,e){this.cw()},
q:{
ae:function(a,b,c,d,e){var z=c==null?null:W.fr(new W.l1(c))
z=new W.l0(0,a,b,z,!1,[e])
z.en(a,b,c,!1,e)
return z}}},
l1:{"^":"l:0;a",
$1:function(a){return this.a.$1(a)}},
K:{"^":"f;$ti",
gE:function(a){return new W.id(a,this.gk(a),-1,null)},
$isd:1,
$asd:null,
$isc:1,
$asc:null,
$isb:1,
$asb:null},
id:{"^":"f;a,b,c,d",
v:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.e(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}}}],["","",,P,{"^":"",
mg:function(a){var z,y,x,w,v
if(a==null)return
z=P.d4()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.aD)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
mb:[function(a,b){var z
if(a==null)return
z={}
if(b!=null)b.$1(z)
J.hb(a,new P.mc(z))
return z},function(a){return P.mb(a,null)},"$2","$1","mq",2,2,26,0],
md:function(a){var z,y
z=new P.V(0,$.x,null,[null])
y=new P.dl(z,[null])
a.then(H.a7(new P.me(y),1))["catch"](H.a7(new P.mf(y),1))
return z},
kK:{"^":"f;",
d6:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
bO:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.e3(y,!0)
x.e9(y,!0)
return x}if(a instanceof RegExp)throw H.j(new P.dj("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.md(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.d6(a)
x=this.b
u=x.length
if(v>=u)return H.a(x,v)
t=x[v]
z.a=t
if(t!=null)return t
t=P.d4()
z.a=t
if(v>=u)return H.a(x,v)
x[v]=t
this.fg(a,new P.kM(z,this))
return z.a}if(a instanceof Array){v=this.d6(a)
x=this.b
if(v>=x.length)return H.a(x,v)
t=x[v]
if(t!=null)return t
u=J.A(a)
s=u.gk(a)
t=this.c?new Array(s):a
if(v>=x.length)return H.a(x,v)
x[v]=t
if(typeof s!=="number")return H.n(s)
x=J.a4(t)
r=0
for(;r<s;++r)x.j(t,r,this.bO(u.h(a,r)))
return t}return a}},
kM:{"^":"l:4;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.bO(b)
J.P(z,a,y)
return y}},
mc:{"^":"l:17;a",
$2:function(a,b){this.a[a]=b}},
kL:{"^":"kK;a,b,c",
fg:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.aD)(z),++x){w=z[x]
b.$2(w,a[w])}}},
me:{"^":"l:0;a",
$1:function(a){return this.a.bv(0,a)}},
mf:{"^":"l:0;a",
$1:function(a){return this.a.bw(a)}}}],["","",,P,{"^":"",oK:{"^":"E;V:error=","%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},p5:{"^":"E;V:error=","%":"IDBTransaction"}}],["","",,P,{"^":"",
bs:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fi:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
lj:{"^":"f;",
fM:function(a){if(a<=0||a>4294967296)throw H.j(P.jW("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
b2:{"^":"f;n:a>,p:b>,$ti",
l:function(a){return"Point("+H.m(this.a)+", "+H.m(this.b)+")"},
B:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.b2))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gG:function(a){var z,y
z=J.ac(this.a)
y=J.ac(this.b)
return P.fi(P.bs(P.bs(0,z),y))},
F:function(a,b){var z,y,x,w
z=this.a
y=J.p(b)
x=y.gn(b)
if(typeof z!=="number")return z.F()
if(typeof x!=="number")return H.n(x)
w=this.b
y=y.gp(b)
if(typeof w!=="number")return w.F()
if(typeof y!=="number")return H.n(y)
return new P.b2(z+x,w+y,this.$ti)},
A:function(a,b){var z,y,x,w
z=this.a
y=J.p(b)
x=y.gn(b)
if(typeof z!=="number")return z.A()
if(typeof x!=="number")return H.n(x)
w=this.b
y=y.gp(b)
if(typeof w!=="number")return w.A()
if(typeof y!=="number")return H.n(y)
return new P.b2(z-x,w-y,this.$ti)},
W:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.W()
if(typeof b!=="number")return H.n(b)
y=this.b
if(typeof y!=="number")return y.W()
return new P.b2(z*b,y*b,this.$ti)}},
lw:{"^":"f;$ti",
gbE:function(a){var z=this.a
if(typeof z!=="number")return z.F()
return z+this.c},
gbt:function(a){var z=this.b
if(typeof z!=="number")return z.F()
return z+this.d},
l:function(a){return"Rectangle ("+H.m(this.a)+", "+H.m(this.b)+") "+this.c+" x "+this.d},
B:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.y(b)
if(!z.$isN)return!1
y=this.a
x=z.gaz(b)
if(y==null?x==null:y===x){x=this.b
w=z.gaD(b)
if(x==null?w==null:x===w){if(typeof y!=="number")return y.F()
if(y+this.c===z.gbE(b)){if(typeof x!=="number")return x.F()
z=x+this.d===z.gbt(b)}else z=!1}else z=!1}else z=!1
return z},
gG:function(a){var z,y,x,w
z=this.a
y=J.ac(z)
x=this.b
w=J.ac(x)
if(typeof z!=="number")return z.F()
if(typeof x!=="number")return x.F()
return P.fi(P.bs(P.bs(P.bs(P.bs(0,y),w),z+this.c&0x1FFFFFFF),x+this.d&0x1FFFFFFF))}},
N:{"^":"lw;az:a>,aD:b>,N:c>,M:d>,$ti",$asN:null,q:{
jY:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.P()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.P()
if(d<0)y=-d*0
else y=d
return new P.N(a,b,z,y,[e])}}}}],["","",,P,{"^":"",ni:{"^":"b0;",$isi:1,"%":"SVGAElement"},nk:{"^":"C;",$isi:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},nD:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEBlendElement"},nE:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEColorMatrixElement"},nF:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEComponentTransferElement"},nG:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFECompositeElement"},nH:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEConvolveMatrixElement"},nI:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEDiffuseLightingElement"},nJ:{"^":"C;n:x=,p:y=",
C:function(a,b){return a.scale.$1(b)},
$isi:1,
"%":"SVGFEDisplacementMapElement"},nK:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEFloodElement"},nL:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEGaussianBlurElement"},nM:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEImageElement"},nN:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEMergeElement"},nO:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEMorphologyElement"},nP:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFEOffsetElement"},nQ:{"^":"C;n:x=,p:y=","%":"SVGFEPointLightElement"},nR:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFESpecularLightingElement"},nS:{"^":"C;n:x=,p:y=","%":"SVGFESpotLightElement"},nT:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFETileElement"},nU:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFETurbulenceElement"},nY:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGFilterElement"},o0:{"^":"b0;n:x=,p:y=","%":"SVGForeignObjectElement"},ij:{"^":"b0;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},b0:{"^":"C;",$isi:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},o6:{"^":"b0;n:x=,p:y=",$isi:1,"%":"SVGImageElement"},aG:{"^":"i;",$isf:1,"%":"SVGLength"},oa:{"^":"iR;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.aG]},
$isc:1,
$asc:function(){return[P.aG]},
$isb:1,
$asb:function(){return[P.aG]},
"%":"SVGLengthList"},ix:{"^":"i+H;",
$asd:function(){return[P.aG]},
$asc:function(){return[P.aG]},
$asb:function(){return[P.aG]},
$isd:1,
$isc:1,
$isb:1},iR:{"^":"ix+K;",
$asd:function(){return[P.aG]},
$asc:function(){return[P.aG]},
$asb:function(){return[P.aG]},
$isd:1,
$isc:1,
$isb:1},oc:{"^":"C;",$isi:1,"%":"SVGMarkerElement"},od:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGMaskElement"},oe:{"^":"i;",
C:function(a,b){return a.scale(b)},
"%":"SVGMatrix"},aH:{"^":"i;",$isf:1,"%":"SVGNumber"},ow:{"^":"iS;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.aH]},
$isc:1,
$asc:function(){return[P.aH]},
$isb:1,
$asb:function(){return[P.aH]},
"%":"SVGNumberList"},iy:{"^":"i+H;",
$asd:function(){return[P.aH]},
$asc:function(){return[P.aH]},
$asb:function(){return[P.aH]},
$isd:1,
$isc:1,
$isb:1},iS:{"^":"iy+K;",
$asd:function(){return[P.aH]},
$asc:function(){return[P.aH]},
$asb:function(){return[P.aH]},
$isd:1,
$isc:1,
$isb:1},oz:{"^":"C;n:x=,p:y=",$isi:1,"%":"SVGPatternElement"},oC:{"^":"i;n:x=,p:y=","%":"SVGPoint"},oD:{"^":"i;k:length=","%":"SVGPointList"},oG:{"^":"i;n:x=,p:y=","%":"SVGRect"},oH:{"^":"ij;n:x=,p:y=","%":"SVGRectElement"},oN:{"^":"C;",$isi:1,"%":"SVGScriptElement"},oW:{"^":"iT;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.v]},
$isc:1,
$asc:function(){return[P.v]},
$isb:1,
$asb:function(){return[P.v]},
"%":"SVGStringList"},iz:{"^":"i+H;",
$asd:function(){return[P.v]},
$asc:function(){return[P.v]},
$asb:function(){return[P.v]},
$isd:1,
$isc:1,
$isb:1},iT:{"^":"iz+K;",
$asd:function(){return[P.v]},
$asc:function(){return[P.v]},
$asb:function(){return[P.v]},
$isd:1,
$isc:1,
$isb:1},C:{"^":"e6;",
gdg:function(a){return new W.bW(a,"contextmenu",!1,[W.aA])},
gdh:function(a){return new W.bW(a,"dragstart",!1,[W.aA])},
$isi:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},oX:{"^":"b0;n:x=,p:y=",$isi:1,"%":"SVGSVGElement"},oY:{"^":"C;",$isi:1,"%":"SVGSymbolElement"},eX:{"^":"b0;","%":";SVGTextContentElement"},oZ:{"^":"eX;",$isi:1,"%":"SVGTextPathElement"},p_:{"^":"eX;n:x=,p:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},aJ:{"^":"i;",$isf:1,"%":"SVGTransform"},p6:{"^":"iU;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.aJ]},
$isc:1,
$asc:function(){return[P.aJ]},
$isb:1,
$asb:function(){return[P.aJ]},
"%":"SVGTransformList"},iA:{"^":"i+H;",
$asd:function(){return[P.aJ]},
$asc:function(){return[P.aJ]},
$asb:function(){return[P.aJ]},
$isd:1,
$isc:1,
$isb:1},iU:{"^":"iA+K;",
$asd:function(){return[P.aJ]},
$asc:function(){return[P.aJ]},
$asb:function(){return[P.aJ]},
$isd:1,
$isc:1,
$isb:1},p9:{"^":"b0;n:x=,p:y=",$isi:1,"%":"SVGUseElement"},pc:{"^":"C;",$isi:1,"%":"SVGViewElement"},pd:{"^":"i;",$isi:1,"%":"SVGViewSpec"},pr:{"^":"C;",$isi:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},pu:{"^":"C;",$isi:1,"%":"SVGCursorElement"},pv:{"^":"C;",$isi:1,"%":"SVGFEDropShadowElement"},pw:{"^":"C;",$isi:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",c7:{"^":"f;"}}],["","",,P,{"^":"",bI:{"^":"i;k:length=",$isbI:1,$isf:1,"%":"AudioBuffer"},nm:{"^":"E;",
eZ:function(a){if(a.createGain!==undefined)return a.createGain()
else return a.createGainNode()},
ey:function(a,b,c,d){return a.decodeAudioData(b,H.a7(c,1),H.a7(d,1))},
f3:function(a,b){var z,y,x
z=P.bI
y=new P.V(0,$.x,null,[z])
x=new P.dl(y,[z])
this.ey(a,b,new P.hy(x),new P.hz(x))
return y},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},hy:{"^":"l:0;a",
$1:function(a){this.a.bv(0,a)}},hz:{"^":"l:0;a",
$1:function(a){var z=this.a
if(a==null)z.bw("")
else z.bw(a)}}}],["","",,P,{"^":"",oI:{"^":"i;",
cD:function(a,b){return a.activeTexture(b)},
cG:function(a,b,c){return a.attachShader(b,c)},
cH:function(a,b,c){return a.bindBuffer(b,c)},
cI:function(a,b,c){return a.bindFramebuffer(b,c)},
cJ:function(a,b,c){return a.bindTexture(b,c)},
cN:function(a,b){return a.checkFramebufferStatus(b)},
cQ:function(a,b){return a.clear(b)},
cR:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cT:function(a,b){return a.compileShader(b)},
cU:function(a){return a.createBuffer()},
cV:function(a){return a.createProgram()},
cX:function(a,b){return a.createShader(b)},
cY:function(a){return a.createTexture()},
cZ:function(a,b){return a.disableVertexAttribArray(b)},
d0:function(a,b,c,d){return a.drawArrays(b,c,d)},
d1:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
d3:function(a,b){return a.enable(b)},
d4:function(a,b){return a.enableVertexAttribArray(b)},
bP:function(a,b,c){return a.getAttribLocation(b,c)},
bS:function(a,b){return a.getProgramInfoLog(b)},
bT:function(a,b,c){return a.getProgramParameter(b,c)},
bV:function(a,b){return a.getShaderInfoLog(b)},
bW:function(a,b,c){return a.getShaderParameter(b,c)},
bX:function(a,b,c){return a.getUniformLocation(b,c)},
dd:function(a,b){return a.linkProgram(b)},
dl:function(a,b,c){return a.pixelStorei(b,c)},
c0:function(a,b,c){return a.shaderSource(b,c)},
bL:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=i==null
if(!z&&h!=null&&typeof g==="number"&&Math.floor(g)===g){a.texImage2D(b,c,d,e,f,g,h,i,j)
return}y=J.y(g)
if(!!y.$iscY&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}if(!!y.$isc8&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}throw H.j(P.bg("Incorrect number or type of arguments"))},
dv:function(a,b,c,d,e,f,g){return this.bL(a,b,c,d,e,f,g,null,null,null)},
dw:function(a,b,c,d){return a.texParameteri(b,c,d)},
dA:function(a,b,c){return a.uniform1f(b,c)},
dB:function(a,b,c){return a.uniform1i(b,c)},
dC:function(a,b,c,d){return a.uniform2f(b,c,d)},
dD:function(a,b,c){return a.uniform3fv(b,c)},
dE:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
dG:function(a,b){return a.useProgram(b)},
dH:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
dI:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
eW:function(a,b,c,d){a.bufferData(b,c,d)},
"%":"WebGLRenderingContext"},oJ:{"^":"i;",
cD:function(a,b){return a.activeTexture(b)},
cG:function(a,b,c){return a.attachShader(b,c)},
cH:function(a,b,c){return a.bindBuffer(b,c)},
cI:function(a,b,c){return a.bindFramebuffer(b,c)},
cJ:function(a,b,c){return a.bindTexture(b,c)},
cN:function(a,b){return a.checkFramebufferStatus(b)},
cQ:function(a,b){return a.clear(b)},
cR:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cT:function(a,b){return a.compileShader(b)},
cU:function(a){return a.createBuffer()},
cV:function(a){return a.createProgram()},
cX:function(a,b){return a.createShader(b)},
cY:function(a){return a.createTexture()},
cZ:function(a,b){return a.disableVertexAttribArray(b)},
d0:function(a,b,c,d){return a.drawArrays(b,c,d)},
d1:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
d3:function(a,b){return a.enable(b)},
d4:function(a,b){return a.enableVertexAttribArray(b)},
bP:function(a,b,c){return a.getAttribLocation(b,c)},
bS:function(a,b){return a.getProgramInfoLog(b)},
bT:function(a,b,c){return a.getProgramParameter(b,c)},
bV:function(a,b){return a.getShaderInfoLog(b)},
bW:function(a,b,c){return a.getShaderParameter(b,c)},
bX:function(a,b,c){return a.getUniformLocation(b,c)},
dd:function(a,b){return a.linkProgram(b)},
dl:function(a,b,c){return a.pixelStorei(b,c)},
c0:function(a,b,c){return a.shaderSource(b,c)},
bL:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=J.y(g)
if(!!z.$iscY)y=!0
else y=!1
if(y){a.texImage2D(b,c,d,e,f,g)
return}if(!!z.$isc8)z=!0
else z=!1
if(z){a.texImage2D(b,c,d,e,f,g)
return}throw H.j(P.bg("Incorrect number or type of arguments"))},
dv:function(a,b,c,d,e,f,g){return this.bL(a,b,c,d,e,f,g,null,null,null)},
dw:function(a,b,c,d){return a.texParameteri(b,c,d)},
dA:function(a,b,c){return a.uniform1f(b,c)},
dB:function(a,b,c){return a.uniform1i(b,c)},
dC:function(a,b,c,d){return a.uniform2f(b,c,d)},
dD:function(a,b,c){return a.uniform3fv(b,c)},
dE:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
dG:function(a,b){return a.useProgram(b)},
dH:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
dI:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
$isi:1,
"%":"WebGL2RenderingContext"},pA:{"^":"i;",$isi:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",oU:{"^":"iV;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.j(P.G(b,a,null,null,null))
return P.mg(a.item(b))},
j:function(a,b,c){throw H.j(new P.B("Cannot assign element of immutable List."))},
u:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.aj]},
$isc:1,
$asc:function(){return[P.aj]},
$isb:1,
$asb:function(){return[P.aj]},
"%":"SQLResultSetRowList"},iB:{"^":"i+H;",
$asd:function(){return[P.aj]},
$asc:function(){return[P.aj]},
$asb:function(){return[P.aj]},
$isd:1,
$isc:1,
$isb:1},iV:{"^":"iB+K;",
$asd:function(){return[P.aj]},
$asc:function(){return[P.aj]},
$asb:function(){return[P.aj]},
$isd:1,
$isc:1,
$isb:1}}],["","",,B,{"^":"",
cI:function(a){return P.a6(a,new B.nh(),!0,Q.o)},
Z:function(a,b){var z,y,x,w,v,u
if(0>=a.length)return H.a(a,0)
z=a[0]
y=J.e(b,0)
if(typeof z!=="number")return z.W()
if(typeof y!=="number")return H.n(y)
x=a.length
if(1>=x)return H.a(a,1)
w=a[1]
v=b.length
if(1>=v)return H.a(b,1)
u=b[1]
if(typeof w!=="number")return w.W()
if(typeof u!=="number")return H.n(u)
if(2>=x)return H.a(a,2)
x=a[2]
if(2>=v)return H.a(b,2)
v=b[2]
if(typeof x!=="number")return x.W()
if(typeof v!=="number")return H.n(v)
return z*y+w*u+x*v},
au:function(a,b){var z,y,x,w
for(z=J.A(b),y=J.A(a),x=0;x<z.gk(b);++x){w=y.h(a,x)
if(x>=b.length)return H.a(b,x)
b[x]=w}},
b5:function(a,b,c,d){var z,y,x,w
z=J.A(a)
y=J.F(z.h(a,0),J.ab(J.e(c,0),b))
x=d.a
if(0>=x.length)return H.a(x,0)
x[0]=y
y=z.h(a,1)
x=c.length
if(1>=x)return H.a(c,1)
y=J.F(y,J.ab(c[1],b))
w=d.a
if(1>=w.length)return H.a(w,1)
w[1]=y
z=z.h(a,2)
if(2>=x)return H.a(c,2)
z=J.F(z,J.ab(c[2],b))
x=d.a
if(2>=x.length)return H.a(x,2)
x[2]=z},
f9:function(a){var z,y,x,w
if(0>=a.length)return H.a(a,0)
z=a[0]
z=J.ab(z,z)
if(1>=a.length)return H.a(a,1)
y=a[1]
y=J.F(z,J.ab(y,y))
if(2>=a.length)return H.a(a,2)
z=a[2]
x=Math.sqrt(H.fw(J.F(y,J.ab(z,z))))
if(x!==0){w=1/x
if(0>=a.length)return H.a(a,0)
z=J.ab(a[0],w)
y=a.length
if(0>=y)return H.a(a,0)
a[0]=z
if(1>=y)return H.a(a,1)
y=J.ab(a[1],w)
z=a.length
if(1>=z)return H.a(a,1)
a[1]=y
if(2>=z)return H.a(a,2)
z=J.ab(a[2],w)
if(2>=a.length)return H.a(a,2)
a[2]=z}return x},
n8:function(a){var z,y,x,w
for(z=a.a,y=z.length,x=0;x<3;++x){if(x>=y)return H.a(z,x)
w=z[x]
if(Math.abs(w-1)<0.0001){if(0>=y)return H.a(z,0)
z[0]=z[0]*0
if(1>=y)return H.a(z,1)
z[1]=z[1]*0
if(2>=y)return H.a(z,2)
z[2]=z[2]*0
z[x]=1
break}if(Math.abs(w- -1)<0.0001){if(0>=y)return H.a(z,0)
z[0]=z[0]*0
if(1>=y)return H.a(z,1)
z[1]=z[1]*0
if(2>=y)return H.a(z,2)
z[2]=z[2]*0
z[x]=-1
break}}},
c0:function(a,b,c){if(J.S(J.aE(J.J(J.e(a.gt(),0),b[0])),0.0001)&&J.S(J.aE(J.J(J.e(a.gt(),1),b[1])),0.0001)&&J.S(J.aE(J.J(J.e(a.gt(),2),b[2])),0.0001)&&J.S(J.aE(J.J(J.e(a.gt(),3),b[3])),0.02)){c.a=!1
return!0}$.$get$aM()[0]=J.I(b[0])
$.$get$aM()[1]=J.I(b[1])
$.$get$aM()[2]=J.I(b[2])
$.$get$aM()[3]=J.I(b[3])
if(J.S(J.aE(J.J(J.e(a.gt(),0),$.$get$aM()[0])),0.0001)&&J.S(J.aE(J.J(J.e(a.gt(),1),$.$get$aM()[1])),0.0001)&&J.S(J.aE(J.J(J.e(a.gt(),2),$.$get$aM()[2])),0.0001)&&J.S(J.aE(J.J(J.e(a.gt(),3),$.$get$aM()[3])),0.02)){c.a=!0
return!0}return!1},
c2:function(a){var z,y
for(z=0,y=0;y<3;++y){if(y>=a.length)return H.a(a,y)
if(J.S(a[y],0))z=(z|C.b.eM(1,y))>>>0}return z},
mP:function(a,b,c,d){var z,y,x,w
$.$get$dx().m(0,c).Y(0,b)
$.$get$bz().m(0,d).Y(0,b)
z=$.$get$bz()
z.ao(z,$.$get$dx())
y=Math.sqrt($.$get$bz().ad())
if(y===0)return!1
$.$get$bz().C(0,1/y)
z=$.$get$bz()
x=z.a
w=x.length
if(0>=w)return H.a(x,0)
a[0]=x[0]
if(1>=w)return H.a(x,1)
a[1]=x[1]
if(2>=w)return H.a(x,2)
a[2]=x[2]
a[3]=b.L(z)
return!0},
mo:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.a6(129,new B.m7(),!0,[P.d,Q.o])
y=new B.ik(null,null,null,null,z)
y.a=a
y.b=b
y.c=!1
y.d=!1
for(x=0;x<a;++x)for(w=0;w<b;++w){if(x>=z.length)return H.a(z,x)
v=J.e(z[x],w)
u=w*a+x
if(u>=c.length)return H.a(c,u)
J.Q(v,c[u])}B.fN(y)
B.fQ(y)
B.fL(y)
B.ne(y)
B.fN(y)
B.fQ(y)
B.fL(y)
v=P.a6(2,new B.m8(),!0,Q.o)
t=new B.jH(v,null,H.h([],[B.bQ]),null,H.h([],[B.cW]))
u=v.length
if(0>=u)return H.a(v,0)
s=v[0]
if(1>=u)return H.a(v,1)
u=v[1]
r=J.a4(s)
r.j(s,2,99999.9)
r.j(s,1,99999.9)
r.j(s,0,99999.9)
s=J.a4(u)
s.j(u,2,-99999.9)
s.j(u,1,-99999.9)
s.j(u,0,-99999.9)
x=0
while(!0){u=y.a
if(typeof u!=="number")return H.n(u)
if(!(x<u))break
w=0
while(!0){u=y.b
if(typeof u!=="number")return H.n(u)
if(!(w<u))break
if(x>=z.length)return H.a(z,x)
u=J.e(z[x],w)
s=v.length
if(0>=s)return H.a(v,0)
r=v[0]
if(1>=s)return H.a(v,1)
s=v[1]
q=J.A(u)
p=J.A(r)
if(J.S(q.h(u,0),p.h(r,0)))p.j(r,0,q.h(u,0))
o=J.A(s)
if(J.aw(q.h(u,0),o.h(s,0)))o.j(s,0,q.h(u,0))
if(J.S(q.h(u,1),p.h(r,1)))p.j(r,1,q.h(u,1))
if(J.aw(q.h(u,1),o.h(s,1)))o.j(s,1,q.h(u,1))
if(J.S(q.h(u,2),p.h(r,2)))p.j(r,2,q.h(u,2))
if(J.aw(q.h(u,2),o.h(s,2)))o.j(s,2,q.h(u,2));++w}++x}z=$.fS
s=y.b
if(typeof s!=="number")return s.A()
$.fS=z+(u-1)*(s-1)
B.mM(y,t)
if(0>=v.length)return H.a(v,0)
s=v[0]
u=J.A(s)
u.j(s,0,J.J(u.h(s,0),1))
if(0>=v.length)return H.a(v,0)
s=v[0]
u=J.A(s)
u.j(s,1,J.J(u.h(s,1),1))
if(0>=v.length)return H.a(v,0)
s=v[0]
u=J.A(s)
u.j(s,2,J.J(u.h(s,2),1))
if(1>=v.length)return H.a(v,1)
s=v[1]
u=J.A(s)
u.j(s,0,J.F(u.h(s,0),1))
if(1>=v.length)return H.a(v,1)
s=v[1]
u=J.A(s)
u.j(s,1,J.F(u.h(s,1),1))
if(1>=v.length)return H.a(v,1)
v=v[1]
s=J.A(v)
s.j(v,2,J.F(s.h(v,2),1))
return t},
mM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=P.a6(129,new B.mO(),!0,[P.d,[P.d,P.q]])
y=[P.q]
x=H.h(new Array(4),y)
w=[P.cw]
v=H.h(new Array(4),w)
$.av=0
u=a.e
t=0
s=null
r=null
q=null
while(!0){p=a.a
if(typeof p!=="number")return p.A()
if(!(t<p-1))break
o=t+1
n=0
while(!0){p=a.b
if(typeof p!=="number")return p.A()
if(!(n<p-1))break
if(t>=u.length)return H.a(u,t)
s=J.e(u[t],n)
if(o>=u.length)return H.a(u,o)
r=J.e(u[o],n)
if(o>=u.length)return H.a(u,o)
m=n+1
q=J.e(u[o],m)
if(t>=z.length)return H.a(z,t)
J.P(J.e(z[t],n),0,B.aW(s,r,q))
if(o>=u.length)return H.a(u,o)
s=J.e(u[o],m)
if(t>=u.length)return H.a(u,t)
r=J.e(u[t],m)
if(t>=u.length)return H.a(u,t)
q=J.e(u[t],n)
if(t>=z.length)return H.a(z,t)
J.P(J.e(z[t],n),1,B.aW(s,r,q))
n=m}t=o}u=b.e
t=0
l=null
while(!0){p=a.a
if(typeof p!=="number")return p.A()
if(!(t<p-1))break
p=t>0
k=t-1
o=t+1
n=0
while(!0){j=a.b
if(typeof j!=="number")return j.A()
if(!(n<j-1))break
c$1:{x[0]=-1
if(n>0){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],n-1),1)
x[0]=j}else if(a.d===!0){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],j-2),1)
x[0]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[0]=J.w(j,J.e(J.e(z[t],n),0))
if(J.w(x[0],-1)||v[0]===!0)x[0]=B.bA(a,z,t,n,0)
x[2]=-1
j=a.b
if(typeof j!=="number")return j.A()
if(n<j-2){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],n+1),0)
x[2]=j}else if(a.d===!0){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],0),0)
x[2]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[2]=J.w(j,J.e(J.e(z[t],n),1))
if(J.w(x[2],-1)||v[2]===!0)x[2]=B.bA(a,z,t,n,2)
x[3]=-1
if(p){if(k<0||k>=z.length)return H.a(z,k)
j=J.e(J.e(z[k],n),0)
x[3]=j}else if(a.c===!0){j=a.a
if(typeof j!=="number")return j.A()
j-=2
if(j<0||j>=z.length)return H.a(z,j)
j=J.e(J.e(z[j],n),0)
x[3]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[3]=J.w(j,J.e(J.e(z[t],n),1))
if(J.w(x[3],-1)||v[3]===!0)x[3]=B.bA(a,z,t,n,3)
x[1]=-1
j=a.a
if(typeof j!=="number")return j.A()
if(t<j-2){if(o>=z.length)return H.a(z,o)
j=J.e(J.e(z[o],n),1)
x[1]=j}else if(a.c===!0){if(0>=z.length)return H.a(z,0)
j=J.e(J.e(z[0],n),1)
x[1]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[1]=J.w(j,J.e(J.e(z[t],n),0))
if(J.w(x[1],-1)||v[1]===!0)x[1]=B.bA(a,z,t,n,1)
j=new Array(26)
j.fixed$length=Array
j=H.h(j,y)
i=H.h(new Array(26),w)
h=H.h(new Array(26),w)
l=new B.cW(null,null,j,i,h)
u.push(l)
if(t>=z.length)return H.a(z,t)
i=J.e(J.e(z[t],n),0)
if(t>=z.length)return H.a(z,t)
if(J.w(i,J.e(J.e(z[t],n),1))){if(t>=z.length)return H.a(z,t)
if(J.w(J.e(J.e(z[t],n),0),-1))break c$1
if(t>=z.length)return H.a(z,t)
l.a=J.e(J.e(z[t],n),0)
l.b=4
i=x[0]
g=j.length
if(0>=g)return H.a(j,0)
j[0]=i
i=v[0]
f=h.length
if(0>=f)return H.a(h,0)
h[0]=i
i=x[1]
if(1>=g)return H.a(j,1)
j[1]=i
i=v[1]
if(1>=f)return H.a(h,1)
h[1]=i
i=x[2]
if(2>=g)return H.a(j,2)
j[2]=i
i=v[2]
if(2>=f)return H.a(h,2)
h[2]=i
i=x[3]
if(3>=g)return H.a(j,3)
j[3]=i
i=v[3]
if(3>=f)return H.a(h,3)
h[3]=i
B.dD(l,a,z,t,n,-1)
if(B.dG(l))B.du(l)
else{if(0>=u.length)return H.a(u,-1)
u.pop()}}else{if(t>=z.length)return H.a(z,t)
l.a=J.e(J.e(z[t],n),0)
l.b=3
i=x[0]
g=j.length
if(0>=g)return H.a(j,0)
j[0]=i
i=v[0]
f=h.length
if(0>=f)return H.a(h,0)
h[0]=i
i=x[1]
if(1>=g)return H.a(j,1)
j[1]=i
i=v[1]
if(1>=f)return H.a(h,1)
h[1]=i
if(t>=z.length)return H.a(z,t)
i=J.e(J.e(z[t],n),1)
if(2>=g)return H.a(j,2)
j[2]=i
if(J.w(i,-1)){i=x[2]
j[2]=i
if(J.w(i,-1))j[2]=B.bA(a,z,t,n,4)}B.dD(l,a,z,t,n,0)
if(B.dG(l))B.du(l)
else{if(0>=u.length)return H.a(u,-1)
u.pop()}j=new Array(26)
j.fixed$length=Array
j=H.h(j,y)
i=H.h(new Array(26),w)
h=H.h(new Array(26),w)
l=new B.cW(null,null,j,i,h)
u.push(l)
if(t>=z.length)return H.a(z,t)
l.a=J.e(J.e(z[t],n),1)
l.b=3
i=x[2]
g=j.length
if(0>=g)return H.a(j,0)
j[0]=i
i=v[2]
f=h.length
if(0>=f)return H.a(h,0)
h[0]=i
i=x[3]
if(1>=g)return H.a(j,1)
j[1]=i
i=v[3]
if(1>=f)return H.a(h,1)
h[1]=i
if(t>=z.length)return H.a(z,t)
i=J.e(J.e(z[t],n),0)
if(2>=g)return H.a(j,2)
j[2]=i
if(J.w(i,-1)){i=x[0]
j[2]=i
if(J.w(i,-1))j[2]=B.bA(a,z,t,n,5)}B.dD(l,a,z,t,n,1)
if(B.dG(l))B.du(l)
else{if(0>=u.length)return H.a(u,-1)
u.pop()}}}++n}t=o}y=$.av
b.b=y
b.d=u.length
if(typeof y!=="number")return H.n(y)
b.c=H.h(new Array(y),[B.bQ])
y=[P.u]
e=0
while(!0){w=$.av
if(typeof w!=="number")return H.n(w)
if(!(e<w))break
w=b.c
u=new Array(4)
u.fixed$length=Array
u=H.h(u,y)
if(e>=w.length)return H.a(w,e)
w[e]=new B.bQ(u,null)
u=b.c
if(e>=u.length)return H.a(u,e)
u=u[e].a
w=$.$get$D()
if(e>=w.length)return H.a(w,e)
C.c.bZ(u,0,w[e].gt())
w=b.c
if(e>=w.length)return H.a(w,e)
w=w[e]
u=$.$get$D()
if(e>=u.length)return H.a(u,e)
w.b=u[e].gaJ();++e}},
du:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=new B.kJ(!1)
y=new Array(4)
y.fixed$length=Array
x=[P.u]
w=H.h(y,x)
v=H.h(new Array(4),x)
u=new Q.o(null,null,H.h(new Array(4),x))
y=new Float32Array(3)
u.a=y
y[0]=C.b.i(0)
y[1]=C.b.i(0)
y[2]=C.b.i(0)
t=new Q.o(null,null,H.h(new Array(4),x))
y=new Float32Array(3)
t.a=y
y[0]=C.b.i(0)
y[1]=C.b.i(0)
y[2]=C.b.i(0)
s=new Q.o(null,null,H.h(new Array(4),x))
y=new Float32Array(3)
s.a=y
y[0]=C.b.i(0)
y[1]=C.b.i(0)
y[2]=C.b.i(0)
r=new Q.o(null,null,H.h(new Array(4),x))
y=new Float32Array(3)
r.a=y
y[0]=C.b.i(0)
y[1]=C.b.i(0)
y[2]=C.b.i(0)
y=$.$get$D()
x=a4.a
if(x>>>0!==x||x>=y.length)return H.a(y,x)
B.au(y[x].gt(),w)
q=B.dV(w,w[3])
y=a4.d
x=y.length
p=a4.c
o=p.length
n=0
while(!0){m=a4.b
if(typeof m!=="number")return H.n(m)
if(!(n<m))break
c$0:{if(n>=o)return H.a(p,n)
if(J.w(p[n],a4.a))break c$0
m=$.$get$D()
l=p[n]
if(l>>>0!==l||l>=m.length)return H.a(m,l)
B.au(m[l].gt(),w)
if(n>=x)return H.a(y,n)
if(y[n]!==!0){w[0]=J.I(w[0])
w[1]=J.I(w[1])
w[2]=J.I(w[2])
w[3]=J.I(w[3])}q=B.cU(q,w,w[3],0.1)}++n}if(q==null)return
B.fa(q,u,t)
for(m=a4.e,l=m.length,k=null,j=0,i=null,h=0;j<3;++j)for(i=-1;i<=1;i+=2,++h){C.c.fe(w,0,3,0)
w[j]=i
if(i===1){g=t.a
if(j>=g.length)return H.a(g,j)
w[3]=g[j]}else{g=u.a
if(j>=g.length)return H.a(g,j)
w[3]=-g[j]}g=$.$get$D()
f=a4.a
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.c0(g[f],w,z))continue
k=0
while(!0){g=a4.b
if(typeof g!=="number")return H.n(g)
if(!(k<g))break
g=$.$get$D()
if(k>=o)return H.a(p,k)
f=p[k]
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.c0(g[f],w,z))break;++k}g=a4.b
if(k===g){if(typeof g!=="number")return g.S()
if(g>26)H.aN("ERROR: too many bevels\n")
g=a4.b
f=B.fx(w,z)
if(g>>>0!==g||g>=o)return H.a(p,g)
p[g]=f
f=a4.b
if(f>>>0!==f||f>=l)return H.a(m,f)
m[f]=!1
g=z.a
if(f>=x)return H.a(y,f)
y[f]=g
a4.b=f+1}}for(n=0,e=null,d=null,c=null;g=q.a,n<g;n=b){b=n+1
a=b%g
g=q.b
if(n>=g.length)return H.a(g,n)
g=s.m(0,g[n])
f=q.b
if(a>=f.length)return H.a(f,a)
f=f[a]
a0=g.a
if(0>=a0.length)return H.a(a0,0)
a1=a0[0]
a2=J.A(f)
a3=a2.h(f,0)
if(typeof a3!=="number")return H.n(a3)
a0[0]=a1-a3
a3=g.a
if(1>=a3.length)return H.a(a3,1)
a1=a3[1]
a0=a2.h(f,1)
if(typeof a0!=="number")return H.n(a0)
a3[1]=a1-a0
g=g.a
if(2>=g.length)return H.a(g,2)
a0=g[2]
f=a2.h(f,2)
if(typeof f!=="number")return H.n(f)
g[2]=a0-f
if(B.f9(s.a)<0.5)continue
B.n8(s)
for(g=s.a,f=g.length,a=0;a0=a<3,a0;++a){if(a>=f)return H.a(g,a)
a1=g[a]
if(a1===-1||a1===1)break}if(a0)continue
for(j=0;j<3;++j)for(i=-1;i<=1;i+=2){g=r.a
f=g.length
if(0>=f)return H.a(g,0)
g[0]=g[0]*0
if(1>=f)return H.a(g,1)
g[1]=g[1]*0
if(2>=f)return H.a(g,2)
g[2]=g[2]*0
if(j>=f)return H.a(g,j)
g[j]=i
f=s.a
a0=f.length
if(1>=a0)return H.a(f,1)
a1=f[1]
a2=g[2]
if(2>=a0)return H.a(f,2)
a0=f[2]
a3=g[1]
w[0]=a1*a2-a0*a3
g=g[0]
f=f[0]
w[1]=a0*g-f*a2
w[2]=f*a3-a1*g
if(B.f9(w)<0.5)continue
g=q.b
if(n>=g.length)return H.a(g,n)
w[3]=B.Z(g[n].gR(),w)
for(e=0;e<q.a;++e){g=q.b
if(e>=g.length)return H.a(g,e)
g=B.Z(g[e].gR(),w)
f=w[3]
if(typeof f!=="number")return H.n(f)
d=g-f
if(d>0.1)break}if(e<q.a)continue
g=$.$get$D()
f=a4.a
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.c0(g[f],w,z))continue
k=0
while(!0){g=a4.b
if(typeof g!=="number")return H.n(g)
if(!(k<g))break
g=$.$get$D()
if(k>=o)return H.a(p,k)
f=p[k]
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.c0(g[f],w,z))break;++k}g=a4.b
if(k===g){if(typeof g!=="number")return g.S()
if(g>26)H.aN("ERROR: too many bevels\n")
g=a4.b
f=B.fx(w,z)
if(g>>>0!==g||g>=o)return H.a(p,g)
p[g]=f
a=0
while(!0){g=a4.b
if(typeof g!=="number")return H.n(g)
if(!(a<g))break
if(g>=o)return H.a(p,g)
g=p[g]
if(a>=o)return H.a(p,a)
if(J.w(g,p[a]))H.aN("WARNING: bevel plane already used\n");++a}if(g>=l)return H.a(m,g)
m[g]=!1
f=z.a
if(g>=x)return H.a(y,g)
y[g]=f
c=B.i0(q)
f=$.$get$D()
g=a4.b
if(g>>>0!==g||g>=o)return H.a(p,g)
g=p[g]
if(g>>>0!==g||g>=f.length)return H.a(f,g)
B.au(f[g].gt(),v)
g=a4.b
if(g>>>0!==g||g>=x)return H.a(y,g)
if(y[g]!==!0){v[0]=J.I(v[0])
v[1]=J.I(v[1])
v[2]=J.I(v[2])
v[3]=J.I(v[3])}B.cU(c,v,v[3],0.1)
g=a4.b
if(typeof g!=="number")return g.F()
a4.b=g+1}}}g=a4.b
f=a4.a
if(g>>>0!==g||g>=o)return H.a(p,g)
p[g]=f
if(g>=l)return H.a(m,g)
m[g]=!1
if(g>=x)return H.a(y,g)
y[g]=!0
a4.b=g+1},
i0:function(a){var z=B.dk(4)
z.a=a.a
z.b=P.a6(a.a,new B.i1(a),!0,Q.o)
return z},
fx:function(a,b){var z,y,x
z=0
while(!0){y=$.av
if(typeof y!=="number")return H.n(y)
if(!(z<y))break
y=$.$get$D()
if(z>=y.length)return H.a(y,z)
if(B.c0(y[z],a,b))return z;++z}x=$.$get$D()
if(y>=x.length)return H.a(x,y)
B.au(a,x[y].gt())
y=$.$get$D()
x=$.av
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x].saJ(B.c2(a))
x=$.av
if(typeof x!=="number")return x.F();++x
$.av=x
b.a=!1
return x-1},
dG:function(a){var z,y,x,w,v,u,t,s,r,q
z=H.h(new Array(4),[P.u])
y=P.a6(2,new B.ng(),!0,Q.o)
if(J.w(a.a,-1))return!1
x=$.$get$D()
w=a.a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
B.au(x[w].gt(),z)
v=B.dV(z,z[3])
x=a.d
w=x.length
u=a.c
t=u.length
s=0
while(!0){r=a.b
if(typeof r!=="number")return H.n(r)
if(!(s<r))break
if(s>=t)return H.a(u,s)
if(J.w(u[s],-1))return!1
r=$.$get$D()
q=u[s]
if(q>>>0!==q||q>=r.length)return H.a(r,q)
B.au(r[q].gt(),z)
if(s>=w)return H.a(x,s)
if(x[s]!==!0){z[0]=J.I(z[0])
z[1]=J.I(z[1])
z[2]=J.I(z[2])
z[3]=J.I(z[3])}v=B.cU(v,z,z[3],0.1);++s}if(v==null)return!1
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
B.fa(v,w,y[1])
for(s=0;s<3;++s){if(1>=y.length)return H.a(y,1)
x=J.e(y[1],s)
if(0>=y.length)return H.a(y,0)
if(J.aw(J.J(x,J.e(y[0],s)),65535))return!1
if(0>=y.length)return H.a(y,0)
if(J.fT(J.e(y[0],s),65535))return!1
if(1>=y.length)return H.a(y,1)
if(J.fU(J.e(y[1],s),-65535))return!1}return!0},
fa:function(a,b,c){var z,y,x,w,v,u
z=J.a4(b)
z.j(b,2,65535)
z.j(b,1,65535)
z.j(b,0,65535)
y=J.a4(c)
y.j(c,2,-65535)
y.j(c,1,-65535)
y.j(c,0,-65535)
for(x=0;x<a.a;++x)for(w=0;w<3;++w){v=a.b
if(x>=v.length)return H.a(v,x)
u=J.e(v[x],w)
v=J.X(u)
if(v.P(u,z.h(b,w)))z.j(b,w,u)
if(v.S(u,y.h(c,w)))y.j(c,w,u)}},
cU:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=[P.u]
y=H.h(new Array(68),z)
x=[P.q]
w=H.h(new Array(68),x)
v=H.h(new Array(3),x)
u=new Q.o(null,null,H.h(new Array(4),z))
z=new Float32Array(3)
u.a=z
z[0]=C.b.i(0)
z[1]=C.b.i(0)
z[2]=C.b.i(0)
v[2]=0
v[1]=0
v[0]=0
for(z=w.length,x=-d,t=y.length,s=null,r=0;q=a.a,r<q;++r){q=a.b
if(r>=q.length)return H.a(q,r)
s=B.Z(q[r].gR(),b)
if(typeof c!=="number")return H.n(c)
s-=c
if(r>=t)return H.a(y,r)
y[r]=s
if(s>d){if(r>=z)return H.a(w,r)
w[r]=0
q=0}else if(s<x){if(r>=z)return H.a(w,r)
w[r]=1
q=1}else{if(r>=z)return H.a(w,r)
w[r]=2
q=2}if(r>=z)return H.a(w,r)
p=v[q]
if(typeof p!=="number")return p.F()
v[q]=p+1}if(0>=z)return H.a(w,0)
x=w[0]
if(r>=z)return H.a(w,r)
w[r]=x
if(0>=t)return H.a(y,0)
x=y[0]
if(r>=t)return H.a(y,r)
y[r]=x
if(v[0]===0)return
if(v[1]===0)return a
o=B.dk(q+4)
for(x=J.X(c),r=0,n=null,m=null;r<a.a;++r){q=a.b
if(r>=q.length)return H.a(q,r)
l=q[r]
if(r>=z)return H.a(w,r)
q=w[r]
if(q===2){q=o.b
p=o.a
if(p>=q.length)return H.a(q,p)
J.Q(q[p],l);++o.a
continue}if(q===0){q=o.b
p=o.a
if(p>=q.length)return H.a(q,p)
J.Q(q[p],l);++o.a}q=r+1
if(q>=z)return H.a(w,q)
p=w[q]
if(p!==2){k=w[r]
k=p==null?k==null:p===k
p=k}else p=!0
if(p)continue
p=a.b
k=q%a.a
if(k>=p.length)return H.a(p,k)
m=p[k]
if(r>=t)return H.a(y,r)
k=y[r]
if(q>=t)return H.a(y,q)
q=y[q]
if(typeof k!=="number")return k.A()
if(typeof q!=="number")return H.n(q)
s=k/(k-q)
for(q=J.A(l),p=J.A(m),n=0;n<3;++n)if(J.w(b[n],1)){k=u.a
if(n>=k.length)return H.a(k,n)
k[n]=c}else if(J.w(b[n],-1)){k=x.b3(c)
j=u.a
if(n>=j.length)return H.a(j,n)
j[n]=k}else{k=q.h(l,n)
j=J.J(p.h(m,n),q.h(l,n))
if(typeof j!=="number")return H.n(j)
j=J.F(k,s*j)
k=u.a
if(n>=k.length)return H.a(k,n)
k[n]=j}q=o.b
p=o.a
if(p>=q.length)return H.a(q,p)
J.Q(q[p],u);++o.a}return o},
dV:function(a,b){var z,y,x,w,v,u,t,s,r
z=Q.k(0,0,0)
for(y=0,x=-1,w=-65535;y<3;++y){v=J.aE(a[y])
if(J.aw(v,w)){w=v
x=y}}switch(x){case 0:case 1:u=z.a
if(2>=u.length)return H.a(u,2)
u[2]=1
break
case 2:u=z.a
if(0>=u.length)return H.a(u,0)
u[0]=1
break}B.b5(z,-B.Z(z.a,a),a,z)
z.ag(0)
t=Q.bq(a)
s=Q.k(0,0,0).ao(z,t)
t.C(0,b)
z.C(0,65535)
s.C(0,65535)
r=B.dk(4)
u=r.b
if(0>=u.length)return H.a(u,0)
J.Q(u[0],t).Y(0,s).K(0,z)
u=r.b
if(1>=u.length)return H.a(u,1)
J.Q(u[1],t).K(0,s).K(0,z)
u=r.b
if(2>=u.length)return H.a(u,2)
J.Q(u[2],t).K(0,s).Y(0,z)
u=r.b
if(3>=u.length)return H.a(u,3)
J.Q(u[3],t).Y(0,s).Y(0,z)
r.a=4
return r},
dD:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.a6(4,new B.n0(),!0,Q.o)
switch(f){case-1:y=b.e
if(d>=y.length)return H.a(y,d)
x=J.e(y[d],e)
if(0>=z.length)return H.a(z,0)
z[0]=x
x=d+1
if(x>=y.length)return H.a(y,x)
w=J.e(y[x],e)
if(1>=z.length)return H.a(z,1)
z[1]=w
if(x>=y.length)return H.a(y,x)
w=e+1
x=J.e(y[x],w)
if(2>=z.length)return H.a(z,2)
z[2]=x
if(d>=y.length)return H.a(y,d)
w=J.e(y[d],w)
if(3>=z.length)return H.a(z,3)
z[3]=w
v=4
break
case 0:y=b.e
if(d>=y.length)return H.a(y,d)
x=J.e(y[d],e)
if(0>=z.length)return H.a(z,0)
z[0]=x
x=d+1
if(x>=y.length)return H.a(y,x)
w=J.e(y[x],e)
if(1>=z.length)return H.a(z,1)
z[1]=w
if(x>=y.length)return H.a(y,x)
x=J.e(y[x],e+1)
if(2>=z.length)return H.a(z,2)
z[2]=x
v=3
break
case 1:y=b.e
x=d+1
if(x>=y.length)return H.a(y,x)
w=e+1
x=J.e(y[x],w)
if(0>=z.length)return H.a(z,0)
z[0]=x
if(d>=y.length)return H.a(y,d)
w=J.e(y[d],w)
if(1>=z.length)return H.a(z,1)
z[1]=w
if(d>=y.length)return H.a(y,d)
y=J.e(y[d],e)
if(2>=z.length)return H.a(z,2)
z[2]=y
v=3
break
default:H.aN("setBorderInward: bad parameter")
v=0
break}y=a.d
x=y.length
w=a.c
u=w.length
t=0
while(!0){s=a.b
if(typeof s!=="number")return H.n(s)
if(!(t<s))break
for(r=0,q=0,p=0;p<v;++p){if(p>=z.length)return H.a(z,p)
s=z[p]
if(t>=u)return H.a(w,t)
o=B.mQ(s,w[t])
if(o===0)++r
if(o===1)++q}if(r>0&&q===0){if(t>=x)return H.a(y,t)
y[t]=!0}else if(q>0&&r===0){if(t>=x)return H.a(y,t)
y[t]=!1}else if(r===0&&q===0){if(t>=u)return H.a(w,t)
w[t]=-1}else{H.aN("WARNING: CM_SetBorderInward: mixed plane sides\n")
if(t>=x)return H.a(y,t)
y[t]=!1}++t}},
mQ:function(a,b){var z,y,x,w
if(J.w(b,-1))return 2
z=$.$get$D()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
y=z[b].gt()
z=B.Z(a.gR(),y)
x=J.e(y,3)
if(typeof x!=="number")return H.n(x)
w=z-x
if(w>0.1)return 0
if(w<-0.1)return 1
return 2},
bA:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=new Q.o(null,null,H.h(new Array(4),[P.u]))
y=new Float32Array(3)
z.a=y
y[0]=C.b.i(0)
y[1]=C.b.i(0)
y[2]=C.b.i(0)
switch(e){case 0:y=a.e
if(c>=y.length)return H.a(y,c)
x=J.e(y[c],d)
w=c+1
if(w>=y.length)return H.a(y,w)
v=J.e(y[w],d)
u=B.bC(b,c,d,0)
w=$.$get$D()
if(u>>>0!==u||u>=w.length)return H.a(w,u)
B.b5(x,4,w[u].gt(),z)
return B.aW(x,v,z)
case 2:y=a.e
if(c>=y.length)return H.a(y,c)
w=d+1
x=J.e(y[c],w)
t=c+1
if(t>=y.length)return H.a(y,t)
v=J.e(y[t],w)
u=B.bC(b,c,d,1)
w=$.$get$D()
if(u>>>0!==u||u>=w.length)return H.a(w,u)
B.b5(x,4,w[u].gt(),z)
return B.aW(v,x,z)
case 3:y=a.e
if(c>=y.length)return H.a(y,c)
x=J.e(y[c],d)
if(c>=y.length)return H.a(y,c)
v=J.e(y[c],d+1)
u=B.bC(b,c,d,1)
y=$.$get$D()
if(u>>>0!==u||u>=y.length)return H.a(y,u)
B.b5(x,4,y[u].gt(),z)
return B.aW(v,x,z)
case 1:y=a.e
w=c+1
if(w>=y.length)return H.a(y,w)
x=J.e(y[w],d)
if(w>=y.length)return H.a(y,w)
v=J.e(y[w],d+1)
u=B.bC(b,c,d,0)
w=$.$get$D()
if(u>>>0!==u||u>=w.length)return H.a(w,u)
B.b5(x,4,w[u].gt(),z)
return B.aW(x,v,z)
case 4:y=a.e
w=c+1
if(w>=y.length)return H.a(y,w)
x=J.e(y[w],d+1)
if(c>=y.length)return H.a(y,c)
v=J.e(y[c],d)
u=B.bC(b,c,d,0)
y=$.$get$D()
if(u>>>0!==u||u>=y.length)return H.a(y,u)
B.b5(x,4,y[u].gt(),z)
return B.aW(x,v,z)
case 5:y=a.e
if(c>=y.length)return H.a(y,c)
x=J.e(y[c],d)
w=c+1
if(w>=y.length)return H.a(y,w)
v=J.e(y[w],d+1)
u=B.bC(b,c,d,1)
w=$.$get$D()
if(u>>>0!==u||u>=w.length)return H.a(w,u)
B.b5(x,4,w[u].gt(),z)
return B.aW(x,v,z)}H.aN("edgePlaneNum: bad k")
return-1},
bC:function(a,b,c,d){var z,y
if(b>=a.length)return H.a(a,b)
z=J.e(J.e(a[b],c),d)
if(!J.w(z,-1))return z
if(b>=a.length)return H.a(a,b)
y=J.e(a[b],c)
z=J.e(y,d>0?0:1)
if(!J.w(z,-1))return z
P.aa("WARNING: CM_GridPlane unresolvable\n")
return-1},
aW:function(a,b,c){var z,y,x,w,v
z=H.h(new Array(4),[P.u])
if(!B.mP(z,a,b,c))return-1
y=0
x=null
while(!0){w=$.av
if(typeof w!=="number")return H.n(w)
if(!(y<w))break
c$0:{w=$.$get$D()
if(y>=w.length)return H.a(w,y)
if(B.Z(z,w[y].gt())<0)break c$0
w=a.gR()
v=$.$get$D()
if(y>=v.length)return H.a(v,y)
v=B.Z(w,v[y].gt())
w=$.$get$D()
if(y>=w.length)return H.a(w,y)
w=J.e(w[y].gt(),3)
if(typeof w!=="number")return H.n(w)
x=v-w
if(x<-0.1||x>0.1)break c$0
w=b.gR()
v=$.$get$D()
if(y>=v.length)return H.a(v,y)
v=B.Z(w,v[y].gt())
w=$.$get$D()
if(y>=w.length)return H.a(w,y)
w=J.e(w[y].gt(),3)
if(typeof w!=="number")return H.n(w)
x=v-w
if(x<-0.1||x>0.1)break c$0
w=c.gR()
v=$.$get$D()
if(y>=v.length)return H.a(v,y)
v=B.Z(w,v[y].gt())
w=$.$get$D()
if(y>=w.length)return H.a(w,y)
w=J.e(w[y].gt(),3)
if(typeof w!=="number")return H.n(w)
x=v-w
if(x<-0.1||x>0.1)break c$0
return y}++y}v=$.$get$D()
if(w>=v.length)return H.a(v,w)
B.au(z,v[w].gt())
w=$.$get$D()
v=$.av
if(v>>>0!==v||v>=w.length)return H.a(w,v)
w[v].saJ(B.c2(z))
v=$.av
if(typeof v!=="number")return v.F();++v
$.av=v
return v-1},
ne:function(a){var z,y,x,w,v,u,t,s
z=Q.k(0,0,0)
y=a.a
x=a.b
if(typeof y!=="number")return y.S()
if(typeof x!=="number")return H.n(x)
if(y>x){x=a.e
w=0
while(!0){v=a.b
if(typeof v!=="number")return H.n(v)
if(!(w<v))break
u=w+1
t=u
while(!0){y=a.a
if(typeof y!=="number")return H.n(y)
if(!(t<y))break
y=a.b
if(typeof y!=="number")return H.n(y)
v=x.length
if(t<y){if(w>=v)return H.a(x,w)
z.m(0,J.e(x[w],t))
if(w>=x.length)return H.a(x,w)
y=J.e(x[w],t)
if(t>=x.length)return H.a(x,t)
J.Q(y,J.e(x[t],w))
if(t>=x.length)return H.a(x,t)
J.Q(J.e(x[t],w),z)}else{if(w>=v)return H.a(x,w)
y=J.e(x[w],t)
if(t>=x.length)return H.a(x,t)
J.Q(y,J.e(x[t],w))}++t}w=u}x=v}else{y=a.e
w=0
while(!0){v=a.a
if(typeof v!=="number")return H.n(v)
if(!(w<v))break
u=w+1
t=u
while(!0){x=a.b
if(typeof x!=="number")return H.n(x)
if(!(t<x))break
x=a.a
if(typeof x!=="number")return H.n(x)
v=y.length
if(t<x){if(t>=v)return H.a(y,t)
z.m(0,J.e(y[t],w))
if(t>=y.length)return H.a(y,t)
x=J.e(y[t],w)
if(w>=y.length)return H.a(y,w)
J.Q(x,J.e(y[w],t))
if(w>=y.length)return H.a(y,w)
J.Q(J.e(y[w],t),z)}else{if(t>=v)return H.a(y,t)
x=J.e(y[t],w)
if(w>=y.length)return H.a(y,w)
J.Q(x,J.e(y[w],t))}++t}w=u}y=v}a.a=x
a.b=y
s=a.c
a.c=a.d
a.d=s},
ma:function(a,b){var z,y,x,w
z=J.A(a)
y=J.A(b)
x=J.J(z.h(a,0),y.h(b,0))
w=J.X(x)
if(w.P(x,-0.1)||w.S(x,0.1))return!1
x=J.J(z.h(a,1),y.h(b,1))
w=J.X(x)
if(w.P(x,-0.1)||w.S(x,0.1))return!1
x=J.J(z.h(a,2),y.h(b,2))
z=J.X(x)
if(z.P(x,-0.1)||z.S(x,0.1))return!1
return!0},
fL:function(a){var z,y,x,w,v,u,t
z=a.e
y=0
x=null
while(!0){w=a.a
if(typeof w!=="number")return w.A()
if(!(y<w-1))break
c$0:{w=y+1
v=0
while(!0){u=a.b
if(typeof u!=="number")return H.n(u)
if(!(v<u))break
if(y<0||y>=z.length)return H.a(z,y)
u=J.e(z[y],v)
if(w<0||w>=z.length)return H.a(z,w)
if(!B.ma(u,J.e(z[w],v)))break;++v}if(v!==a.b)break c$0
t=y+2
v=0
while(!0){w=a.b
if(typeof w!=="number")return H.n(w)
if(!(v<w))break
x=t
while(!0){w=a.a
if(typeof w!=="number")return H.n(w)
if(!(x<w))break
w=x-1
if(w<0||w>=z.length)return H.a(z,w)
w=J.e(z[w],v)
if(x<0||x>=z.length)return H.a(z,x)
J.Q(w,J.e(z[x],v));++x}++v}w=a.a
if(typeof w!=="number")return w.A()
a.a=w-1;--y}++y}},
mK:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
z=[P.u]
y=new Q.o(null,null,H.h(new Array(4),z))
x=new Float32Array(3)
y.a=x
x[0]=C.b.i(0)
x[1]=C.b.i(0)
x[2]=C.b.i(0)
w=new Q.o(null,null,H.h(new Array(4),z))
x=new Float32Array(3)
w.a=x
x[0]=C.b.i(0)
x[1]=C.b.i(0)
x[2]=C.b.i(0)
v=new Q.o(null,null,H.h(new Array(4),z))
z=new Float32Array(3)
v.a=z
z[0]=C.b.i(0)
z[1]=C.b.i(0)
z[2]=C.b.i(0)
for(z=J.A(a),x=J.A(c),u=J.A(b),t=0;t<3;++t){s=J.F(z.h(a,t),x.h(c,t))
if(typeof s!=="number")return H.n(s)
r=w.a
if(t>=r.length)return H.a(r,t)
r[t]=0.5*s
s=J.F(z.h(a,t),u.h(b,t))
if(typeof s!=="number")return H.n(s)
r=J.F(u.h(b,t),x.h(c,t))
if(typeof r!=="number")return H.n(r)
q=y.a
if(t>=q.length)return H.a(q,t)
q[t]=0.5*(0.5*s+0.5*r)}z=v.m(0,y)
x=z.a
if(0>=x.length)return H.a(x,0)
x[0]=x[0]-w.h(0,0)
x=z.a
if(1>=x.length)return H.a(x,1)
x[1]=x[1]-w.h(0,1)
z=z.a
if(2>=z.length)return H.a(z,2)
z[2]=z[2]-w.h(0,2)
return Math.sqrt(v.ad())>=16},
fQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.e
y=0
x=null
while(!0){w=a.a
if(typeof w!=="number")return w.A()
if(!(y<w-2))break
c$0:{v=y+1
u=y+2
t=0
while(!0){w=a.b
if(typeof w!=="number")return H.n(w)
if(!(t<w))break
if(y>=z.length)return H.a(z,y)
w=J.e(z[y],t)
if(v>=z.length)return H.a(z,v)
s=J.e(z[v],t)
if(u>=z.length)return H.a(z,u)
if(B.mK(w,s,J.e(z[u],t)))break;++t}if(t===a.b){t=0
while(!0){w=a.b
if(typeof w!=="number")return H.n(w)
if(!(t<w))break
x=u
while(!0){w=a.a
if(typeof w!=="number")return H.n(w)
if(!(x<w))break
w=x-1
if(w>=z.length)return H.a(z,w)
w=J.e(z[w],t)
if(x>=z.length)return H.a(z,x)
J.Q(w,J.e(z[x],t));++x}++t}w=a.a
if(typeof w!=="number")return w.A()
a.a=w-1
y=v
break c$0}w=y+3
t=0
while(!0){s=a.b
if(typeof s!=="number")return H.n(s)
if(!(t<s))break
if(y>=z.length)return H.a(z,y)
r=Q.br(J.e(z[y],t))
if(v>=z.length)return H.a(z,v)
q=Q.br(J.e(z[v],t))
if(u>=z.length)return H.a(z,u)
p=Q.br(J.e(z[u],t))
s=a.a
if(typeof s!=="number")return s.A()
x=s-1
for(;x>v;--x){s=x+2
if(s>=z.length)return H.a(z,s)
s=J.e(z[s],t)
if(x>=z.length)return H.a(z,x)
J.Q(s,J.e(z[x],t))}if(v>=z.length)return H.a(z,v)
s=J.e(z[v],t)
if(u>=z.length)return H.a(z,u)
o=J.e(z[u],t)
if(w>=z.length)return H.a(z,w)
B.nb(r,q,p,s,o,J.e(z[w],t));++t}w=a.a
if(typeof w!=="number")return w.F()
a.a=w+2}}},
nb:function(a,b,c,d,e,f){var z,y,x,w,v,u
for(z=J.a4(d),y=J.a4(f),x=J.a4(e),w=0;w<3;++w){v=a.a
if(w>=v.length)return H.a(v,w)
v=v[w]
u=b.a
if(w>=u.length)return H.a(u,w)
z.j(d,w,0.5*(v+u[w]))
u=b.a
if(w>=u.length)return H.a(u,w)
u=u[w]
v=c.a
if(w>=v.length)return H.a(v,w)
y.j(f,w,0.5*(u+v[w]))
v=J.F(z.h(d,w),y.h(f,w))
if(typeof v!=="number")return H.n(v)
x.j(e,w,0.5*v)}},
fN:function(a){var z,y,x,w,v,u
z=a.e
y=0
x=null
while(!0){w=a.b
if(typeof w!=="number")return H.n(w)
if(!(y<w))break
for(v=0;v<3;++v){if(0>=z.length)return H.a(z,0)
w=J.e(J.e(z[0],y),v)
u=a.a
if(typeof u!=="number")return u.A();--u
if(u<0||u>=z.length)return H.a(z,u)
x=J.J(w,J.e(J.e(z[u],y),v))
w=J.X(x)
if(w.P(x,-0.1)||w.S(x,0.1))break}if(v!==3)break;++y}a.c=y===a.b},
R:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=1-d
y=Q.bq(a.a)
x=Q.bq(b.a)
w=Q.bq(c.a)
v=z*z
u=y.a
t=u.length
if(0>=t)return H.a(u,0)
u[0]=u[0]*v
if(1>=t)return H.a(u,1)
u[1]=u[1]*v
if(2>=t)return H.a(u,2)
u[2]=u[2]*v
v=2*z*d
t=x.a
s=t.length
if(0>=s)return H.a(t,0)
t[0]=t[0]*v
if(1>=s)return H.a(t,1)
t[1]=t[1]*v
if(2>=s)return H.a(t,2)
t[2]=t[2]*v
u[0]=u[0]+t[0]
u[1]=u[1]+t[1]
u[2]=u[2]+t[2]
t=d*d
v=w.a
s=v.length
if(0>=s)return H.a(v,0)
v[0]=v[0]*t
if(1>=s)return H.a(v,1)
v[1]=v[1]*t
if(2>=s)return H.a(v,2)
v[2]=v[2]*t
u[0]=u[0]+v[0]
u[1]=u[1]+v[1]
u[2]=u[2]+v[2]
return y},
cB:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
z=z[1]
y=[P.u]
w=new Q.o(null,null,H.h(new Array(4),y))
v=new Float32Array(3)
w.a=v
v[0]=C.a.i(x)
v[1]=C.a.i(z)
v[2]=C.b.i(0)
v=b.a
z=v.length
if(0>=z)return H.a(v,0)
x=v[0]
if(1>=z)return H.a(v,1)
v=v[1]
u=new Q.o(null,null,H.h(new Array(4),y))
z=new Float32Array(3)
u.a=z
z[0]=C.a.i(x)
z[1]=C.a.i(v)
z[2]=C.b.i(0)
z=c.a
v=z.length
if(0>=v)return H.a(z,0)
x=z[0]
if(1>=v)return H.a(z,1)
z=z[1]
t=new Q.o(null,null,H.h(new Array(4),y))
y=new Float32Array(3)
t.a=y
y[0]=C.a.i(x)
y[1]=C.a.i(z)
y[2]=C.b.i(0)
return B.R(w,u,t,d)},
nc:function(c3,c4,c5,c6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
z=c3.d
y=c6+1
c3.d=c4.length
c3.f=c5.length
c3.e=0
c3.r=0
x=c6*c6*6
w=[P.u]
v=y*y
u=0
while(!0){t=c3.cx
if(1>=t.length)return H.a(t,1)
if(!(u<t[1]-2))break
s=0
while(!0){t=c3.cx
if(0>=t.length)return H.a(t,0)
t=t[0]
if(!(s<t-2))break
r=u*t
q=z+r+s
p=c4.length
if(q>=p)return H.a(c4,q)
o=c4[q]
n=q+1
if(n>=p)return H.a(c4,n)
m=c4[n]
q+=2
if(q>=p)return H.a(c4,q)
l=c4[q]
r+=t
q=z+r+s
if(q>=p)return H.a(c4,q)
k=c4[q]
n=q+1
if(n>=p)return H.a(c4,n)
j=c4[n]
q+=2
if(q>=p)return H.a(c4,q)
i=c4[q]
t=z+(r+t)+s
if(t>=p)return H.a(c4,t)
h=c4[t]
q=t+1
if(q>=p)return H.a(c4,q)
g=c4[q]
t+=2
if(t>=p)return H.a(c4,t)
f=c4[t]
e=c3.e
c3.e=e+v
for(d=0;d<y;++d){c=d/c6
b=B.R(new Q.o(o.a,null,H.h(new Array(4),w)),new Q.o(k.a,null,H.h(new Array(4),w)),new Q.o(h.a,null,H.h(new Array(4),w)),c)
t=o.c
q=t.length
if(0>=q)return H.a(t,0)
p=t[0]
if(1>=q)return H.a(t,1)
t=t[1]
q=new Q.o(null,null,H.h(new Array(4),w))
n=new Float32Array(3)
q.a=n
n[0]=C.a.i(p)
n[1]=C.a.i(t)
n[2]=C.b.i(0)
n=k.c
t=n.length
if(0>=t)return H.a(n,0)
p=n[0]
if(1>=t)return H.a(n,1)
n=n[1]
t=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
t.a=a
a[0]=C.a.i(p)
a[1]=C.a.i(n)
a[2]=C.b.i(0)
a=h.c
n=a.length
if(0>=n)return H.a(a,0)
p=a[0]
if(1>=n)return H.a(a,1)
a=a[1]
n=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
n.a=a0
a0[0]=C.a.i(p)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
a1=B.cB(q,t,n,c)
n=o.b
t=n.length
if(0>=t)return H.a(n,0)
q=n[0]
if(1>=t)return H.a(n,1)
n=n[1]
t=new Q.o(null,null,H.h(new Array(4),w))
p=new Float32Array(3)
t.a=p
p[0]=C.a.i(q)
p[1]=C.a.i(n)
p[2]=C.b.i(0)
p=k.b
n=p.length
if(0>=n)return H.a(p,0)
q=p[0]
if(1>=n)return H.a(p,1)
p=p[1]
n=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
n.a=a
a[0]=C.a.i(q)
a[1]=C.a.i(p)
a[2]=C.b.i(0)
a=h.b
p=a.length
if(0>=p)return H.a(a,0)
q=a[0]
if(1>=p)return H.a(a,1)
a=a[1]
p=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
p.a=a0
a0[0]=C.a.i(q)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
a2=B.cB(t,n,p,c)
p=o.e
n=p.length
if(0>=n)return H.a(p,0)
t=p[0]
if(1>=n)return H.a(p,1)
a0=p[1]
if(2>=n)return H.a(p,2)
p=p[2]
n=new Q.o(null,null,H.h(new Array(4),w))
q=new Float32Array(3)
n.a=q
q[0]=C.a.i(t)
q[1]=C.a.i(a0)
q[2]=C.a.i(p)
p=k.e
q=p.length
if(0>=q)return H.a(p,0)
a0=p[0]
if(1>=q)return H.a(p,1)
t=p[1]
if(2>=q)return H.a(p,2)
p=p[2]
q=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
q.a=a
a[0]=C.a.i(a0)
a[1]=C.a.i(t)
a[2]=C.a.i(p)
p=h.e
a=p.length
if(0>=a)return H.a(p,0)
t=p[0]
if(1>=a)return H.a(p,1)
a0=p[1]
if(2>=a)return H.a(p,2)
p=p[2]
a=new Q.o(null,null,H.h(new Array(4),w))
a3=new Float32Array(3)
a.a=a3
a3[0]=C.a.i(t)
a3[1]=C.a.i(a0)
a3[2]=C.a.i(p)
a4=B.R(n,q,a,c)
H.h(new Array(4),w)
t=new Float32Array(3)
t[0]=C.b.i(0)
t[1]=C.b.i(0)
t[2]=C.b.i(1)
a5=new B.cq(null,null,null,null,null)
a5.a=b.a
a5.b=a2.a
a5.c=a1.a
a5.d=t
a5.e=a4.a
c4.push(a5)}for(d=1;d<y;++d){c=d/c6
a6=B.R(new Q.o(o.a,null,H.h(new Array(4),w)),new Q.o(m.a,null,H.h(new Array(4),w)),new Q.o(l.a,null,H.h(new Array(4),w)),c)
a7=B.R(new Q.o(k.a,null,H.h(new Array(4),w)),new Q.o(j.a,null,H.h(new Array(4),w)),new Q.o(i.a,null,H.h(new Array(4),w)),c)
a8=B.R(new Q.o(h.a,null,H.h(new Array(4),w)),new Q.o(g.a,null,H.h(new Array(4),w)),new Q.o(f.a,null,H.h(new Array(4),w)),c)
t=o.b
q=t.length
if(0>=q)return H.a(t,0)
p=t[0]
if(1>=q)return H.a(t,1)
t=t[1]
q=new Q.o(null,null,H.h(new Array(4),w))
n=new Float32Array(3)
q.a=n
n[0]=C.a.i(p)
n[1]=C.a.i(t)
n[2]=C.b.i(0)
n=m.b
t=n.length
if(0>=t)return H.a(n,0)
p=n[0]
if(1>=t)return H.a(n,1)
n=n[1]
t=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
t.a=a
a[0]=C.a.i(p)
a[1]=C.a.i(n)
a[2]=C.b.i(0)
a=l.b
n=a.length
if(0>=n)return H.a(a,0)
p=a[0]
if(1>=n)return H.a(a,1)
a=a[1]
n=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
n.a=a0
a0[0]=C.a.i(p)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
a9=B.R(q,t,n,c)
n=k.b
t=n.length
if(0>=t)return H.a(n,0)
q=n[0]
if(1>=t)return H.a(n,1)
n=n[1]
t=new Q.o(null,null,H.h(new Array(4),w))
p=new Float32Array(3)
t.a=p
p[0]=C.a.i(q)
p[1]=C.a.i(n)
p[2]=C.b.i(0)
p=j.b
n=p.length
if(0>=n)return H.a(p,0)
q=p[0]
if(1>=n)return H.a(p,1)
p=p[1]
n=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
n.a=a
a[0]=C.a.i(q)
a[1]=C.a.i(p)
a[2]=C.b.i(0)
a=i.b
p=a.length
if(0>=p)return H.a(a,0)
q=a[0]
if(1>=p)return H.a(a,1)
a=a[1]
p=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
p.a=a0
a0[0]=C.a.i(q)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
b0=B.R(t,n,p,c)
p=h.b
n=p.length
if(0>=n)return H.a(p,0)
t=p[0]
if(1>=n)return H.a(p,1)
p=p[1]
n=new Q.o(null,null,H.h(new Array(4),w))
q=new Float32Array(3)
n.a=q
q[0]=C.a.i(t)
q[1]=C.a.i(p)
q[2]=C.b.i(0)
q=g.b
p=q.length
if(0>=p)return H.a(q,0)
t=q[0]
if(1>=p)return H.a(q,1)
q=q[1]
p=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
p.a=a
a[0]=C.a.i(t)
a[1]=C.a.i(q)
a[2]=C.b.i(0)
a=f.b
q=a.length
if(0>=q)return H.a(a,0)
t=a[0]
if(1>=q)return H.a(a,1)
a=a[1]
q=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
q.a=a0
a0[0]=C.a.i(t)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
b1=B.R(n,p,q,c)
q=o.c
p=q.length
if(0>=p)return H.a(q,0)
n=q[0]
if(1>=p)return H.a(q,1)
q=q[1]
p=new Q.o(null,null,H.h(new Array(4),w))
t=new Float32Array(3)
p.a=t
t[0]=C.a.i(n)
t[1]=C.a.i(q)
t[2]=C.b.i(0)
t=m.c
q=t.length
if(0>=q)return H.a(t,0)
n=t[0]
if(1>=q)return H.a(t,1)
t=t[1]
q=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
q.a=a
a[0]=C.a.i(n)
a[1]=C.a.i(t)
a[2]=C.b.i(0)
a=l.c
t=a.length
if(0>=t)return H.a(a,0)
n=a[0]
if(1>=t)return H.a(a,1)
a=a[1]
t=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
t.a=a0
a0[0]=C.a.i(n)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
b2=B.R(p,q,t,c)
t=k.c
q=t.length
if(0>=q)return H.a(t,0)
p=t[0]
if(1>=q)return H.a(t,1)
t=t[1]
q=new Q.o(null,null,H.h(new Array(4),w))
n=new Float32Array(3)
q.a=n
n[0]=C.a.i(p)
n[1]=C.a.i(t)
n[2]=C.b.i(0)
n=j.c
t=n.length
if(0>=t)return H.a(n,0)
p=n[0]
if(1>=t)return H.a(n,1)
n=n[1]
t=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
t.a=a
a[0]=C.a.i(p)
a[1]=C.a.i(n)
a[2]=C.b.i(0)
a=i.c
n=a.length
if(0>=n)return H.a(a,0)
p=a[0]
if(1>=n)return H.a(a,1)
a=a[1]
n=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
n.a=a0
a0[0]=C.a.i(p)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
b3=B.R(q,t,n,c)
n=h.c
t=n.length
if(0>=t)return H.a(n,0)
q=n[0]
if(1>=t)return H.a(n,1)
n=n[1]
t=new Q.o(null,null,H.h(new Array(4),w))
p=new Float32Array(3)
t.a=p
p[0]=C.a.i(q)
p[1]=C.a.i(n)
p[2]=C.b.i(0)
p=g.c
n=p.length
if(0>=n)return H.a(p,0)
q=p[0]
if(1>=n)return H.a(p,1)
p=p[1]
n=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
n.a=a
a[0]=C.a.i(q)
a[1]=C.a.i(p)
a[2]=C.b.i(0)
a=f.c
p=a.length
if(0>=p)return H.a(a,0)
q=a[0]
if(1>=p)return H.a(a,1)
a=a[1]
p=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
p.a=a0
a0[0]=C.a.i(q)
a0[1]=C.a.i(a)
a0[2]=C.b.i(0)
b4=B.R(t,n,p,c)
p=o.e
n=p.length
if(0>=n)return H.a(p,0)
t=p[0]
if(1>=n)return H.a(p,1)
a0=p[1]
if(2>=n)return H.a(p,2)
p=p[2]
n=new Q.o(null,null,H.h(new Array(4),w))
q=new Float32Array(3)
n.a=q
q[0]=C.a.i(t)
q[1]=C.a.i(a0)
q[2]=C.a.i(p)
p=m.e
q=p.length
if(0>=q)return H.a(p,0)
a0=p[0]
if(1>=q)return H.a(p,1)
t=p[1]
if(2>=q)return H.a(p,2)
p=p[2]
q=new Q.o(null,null,H.h(new Array(4),w))
a=new Float32Array(3)
q.a=a
a[0]=C.a.i(a0)
a[1]=C.a.i(t)
a[2]=C.a.i(p)
p=l.e
a=p.length
if(0>=a)return H.a(p,0)
t=p[0]
if(1>=a)return H.a(p,1)
a0=p[1]
if(2>=a)return H.a(p,2)
p=p[2]
a=new Q.o(null,null,H.h(new Array(4),w))
a3=new Float32Array(3)
a.a=a3
a3[0]=C.a.i(t)
a3[1]=C.a.i(a0)
a3[2]=C.a.i(p)
b5=B.R(n,q,a,c)
a=k.e
q=a.length
if(0>=q)return H.a(a,0)
n=a[0]
if(1>=q)return H.a(a,1)
p=a[1]
if(2>=q)return H.a(a,2)
a=a[2]
q=new Q.o(null,null,H.h(new Array(4),w))
t=new Float32Array(3)
q.a=t
t[0]=C.a.i(n)
t[1]=C.a.i(p)
t[2]=C.a.i(a)
a=j.e
t=a.length
if(0>=t)return H.a(a,0)
p=a[0]
if(1>=t)return H.a(a,1)
n=a[1]
if(2>=t)return H.a(a,2)
a=a[2]
t=new Q.o(null,null,H.h(new Array(4),w))
a0=new Float32Array(3)
t.a=a0
a0[0]=C.a.i(p)
a0[1]=C.a.i(n)
a0[2]=C.a.i(a)
a=i.e
a0=a.length
if(0>=a0)return H.a(a,0)
n=a[0]
if(1>=a0)return H.a(a,1)
p=a[1]
if(2>=a0)return H.a(a,2)
a=a[2]
a0=new Q.o(null,null,H.h(new Array(4),w))
a3=new Float32Array(3)
a0.a=a3
a3[0]=C.a.i(n)
a3[1]=C.a.i(p)
a3[2]=C.a.i(a)
b6=B.R(q,t,a0,c)
a0=h.e
t=a0.length
if(0>=t)return H.a(a0,0)
q=a0[0]
if(1>=t)return H.a(a0,1)
a=a0[1]
if(2>=t)return H.a(a0,2)
a0=a0[2]
t=new Q.o(null,null,H.h(new Array(4),w))
p=new Float32Array(3)
t.a=p
p[0]=C.a.i(q)
p[1]=C.a.i(a)
p[2]=C.a.i(a0)
a0=g.e
p=a0.length
if(0>=p)return H.a(a0,0)
a=a0[0]
if(1>=p)return H.a(a0,1)
q=a0[1]
if(2>=p)return H.a(a0,2)
a0=a0[2]
p=new Q.o(null,null,H.h(new Array(4),w))
n=new Float32Array(3)
p.a=n
n[0]=C.a.i(a)
n[1]=C.a.i(q)
n[2]=C.a.i(a0)
a0=f.e
n=a0.length
if(0>=n)return H.a(a0,0)
q=a0[0]
if(1>=n)return H.a(a0,1)
a=a0[1]
if(2>=n)return H.a(a0,2)
a0=a0[2]
n=new Q.o(null,null,H.h(new Array(4),w))
a3=new Float32Array(3)
n.a=a3
a3[0]=C.a.i(q)
a3[1]=C.a.i(a)
a3[2]=C.a.i(a0)
b7=B.R(t,p,n,c)
for(b8=0;b8<y;++b8){b9=b8/c6
b=B.R(a6,a7,a8,b9)
a2=B.cB(a9,b0,b1,b9)
a1=B.cB(b2,b3,b4,b9)
a4=B.R(b5,b6,b7,c)
H.h(new Array(4),w)
t=new Float32Array(3)
t[0]=C.b.i(0)
t[1]=C.b.i(0)
t[2]=C.b.i(1)
a5=new B.cq(null,null,null,null,null)
a5.a=b.a
a5.b=a2.a
a5.c=a1.a
a5.d=t
a5.e=a4.a
c4.push(a5)}}c3.r+=x
for(c0=0;c0<c6;c0=c1)for(c1=c0+1,t=e+c1*y,q=e+c0*y,c2=0;c2<c6;){p=t+c2
c5.push(p)
c5.push(q+c2);++c2
n=q+c2
c5.push(n)
c5.push(p)
c5.push(n)
c5.push(t+c2)}s+=2}u+=2}},
hB:{"^":"f;a,b,c",
O:function(a){var z,y,x,w,v
z=this.a
y=2+a*2
x=z.length
if(y>=x)return H.a(z,y)
w=z[y];++y
if(y>=x)return H.a(z,y)
v=z[y]
P.aa("getLump: "+a+" "+w+" "+v)
y=new B.hG(w,v,null,0)
y.c=J.fZ(this.b,w,v)
return y},
dP:function(){var z,y,x,w,v,u
z=this.O(13)
y=H.h(new Array(C.b.D(z.b,104)),[B.co])
x=y.length
P.aa("surfaces.length "+C.b.l(x))
for(w=0;w<x;++w){v=new B.co(null,null,null,null,null,null,null,null,null,null,null,null,null,null)
u=z.d+=4
v.a=z.c.getUint32(u-4,!0)
u=z.d+=4
v.b=z.c.getUint32(u-4,!0)
u=z.d+=4
v.c=z.c.getUint32(u-4,!0)
u=z.d+=4
v.d=z.c.getUint32(u-4,!0)
u=z.d+=4
v.e=z.c.getUint32(u-4,!0)
u=z.d+=4
v.f=z.c.getUint32(u-4,!0)
u=z.d+=4
v.r=z.c.getUint32(u-4,!0)
u=z.d+=4
v.x=z.c.getUint32(u-4,!0)
v.y=z.bD(2)
v.z=z.bD(2)
v.Q=z.a_(3)
v.ch=z.a_(9)
v.cx=z.bD(2)
y[w]=v}return y},
dN:function(){var z,y,x,w,v,u,t,s,r,q
z=this.O(10)
y=C.b.D(z.b,44)
x=H.h([],[B.cq])
for(w=0;w<y;++w){v=new B.cq(null,null,null,null,null)
v.a=z.a_(3)
v.b=z.a_(2)
v.c=z.a_(2)
v.d=z.a_(3)
u=new Float32Array(3)
v.e=u
t=z.c
s=t.buffer
t=t.byteOffset
r=z.d
if(typeof t!=="number")return t.F()
r=t+r
s.toString
H.bZ(s,r,4)
q=new Uint8Array(s,r,4)
z.d+=4
t=q.length
if(0>=t)return H.a(q,0)
s=q[0]
if(0>=3)return H.a(u,0)
u[0]=s/255
if(1>=t)return H.a(q,1)
s=q[1]
if(1>=3)return H.a(u,1)
u[1]=s/255
if(2>=t)return H.a(q,2)
t=q[2]
if(2>=3)return H.a(u,2)
u[2]=t/255
x.push(v)}return x},
dM:function(){var z,y,x,w,v
z=this.O(11)
y=C.b.D(z.b,4)
x=H.h([],[P.q])
for(w=0;w<y;++w){v=z.d+=4
x.push(z.c.getUint32(v-4,!0))}return x},
dO:function(){var z,y,x,w,v,u,t,s,r
z=this.O(1)
y=z.b
x=H.h(new Array(C.b.D(y,72)),[B.eP])
w=x.length
P.aa("shaders.length "+C.b.l(w))
P.aa(y)
P.aa(72)
for(v=0;v<w;++v){y=z.c
u=y.buffer
y=y.byteOffset
t=z.d
if(typeof y!=="number")return y.F()
t=y+t
u.toString
H.bZ(u,t,64)
s=new Uint8Array(u,t,64)
z.d+=64
r=P.eU(s,0,null)
y=C.e.fq(r,"\x00")
if(y>=0)r=C.e.aK(r,0,y)
y=z.d+=4
y=z.c.getUint32(y-4,!0)
u=z.d+=4
x[v]=new B.eP(r,y,z.c.getUint32(u-4,!0))}return x},
dK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=P.v
y=[z,z]
z=H.h([],[z])
x=new B.hV(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,new H.U(0,null,null,null,null,null,0,y),new H.U(0,null,null,null,null,null,0,y),z,new H.U(0,null,null,null,null,null,0,y),0)
x.b=this.dO()
z=this.dP()
x.cy=z
x.db=P.a6(z.length,new B.hC(x),!0,B.co)
x.Q=this.dN()
x.ch=this.dM()
for(z=x.cy,y=z.length,w=0;w<y;++w){v=z[w]
if(v.c===$.eV)B.nc(v,x.Q,x.ch,20)}x.d=B.hA(this.O(3))
x.c=B.jJ(this.O(2))
x.e=B.js(this.O(4))
z=this.O(5)
x.f=z.ah(C.b.D(z.b,4))
z=this.O(6)
x.r=z.ah(C.b.D(z.b,4))
z=B.hK(this.O(8))
x.y=z
for(y=z.length,w=0;w<y;++w){u=z[w]
t=x.b
s=u.c
if(s<0||s>=t.length)return H.a(t,s)
u.e=t[s].c}z=B.hL(this.O(9))
x.z=z
for(y=z.length,w=0;w<y;++w){r=z[w]
t=x.b
s=r.b
if(s<0||s>=t.length)return H.a(t,s)
r.c=t[s].b}for(z=x.y,y=z.length,w=0;w<y;++w){u=z[w]
t=u.d
if(0>=t.length)return H.a(t,0)
s=t[0]
q=x.c
p=x.z
o=u.a
if(o<0||o>=p.length)return H.a(p,o)
o=p[o].a
if(o<0||o>=q.length)return H.a(q,o)
J.P(s,0,J.I(q[o].b))
if(1>=t.length)return H.a(t,1)
o=t[1]
q=x.c
s=x.z
p=u.a+1
if(p<0||p>=s.length)return H.a(s,p)
p=s[p].a
if(p<0||p>=q.length)return H.a(q,p)
J.P(o,0,q[p].b)
if(0>=t.length)return H.a(t,0)
p=t[0]
q=x.c
o=x.z
s=u.a+2
if(s<0||s>=o.length)return H.a(o,s)
s=o[s].a
if(s<0||s>=q.length)return H.a(q,s)
J.P(p,1,J.I(q[s].b))
if(1>=t.length)return H.a(t,1)
s=t[1]
q=x.c
p=x.z
o=u.a+3
if(o<0||o>=p.length)return H.a(p,o)
o=p[o].a
if(o<0||o>=q.length)return H.a(q,o)
J.P(s,1,q[o].b)
if(0>=t.length)return H.a(t,0)
o=t[0]
q=x.c
s=x.z
p=u.a+4
if(p<0||p>=s.length)return H.a(s,p)
p=s[p].a
if(p<0||p>=q.length)return H.a(q,p)
J.P(o,2,J.I(q[p].b))
if(1>=t.length)return H.a(t,1)
t=t[1]
p=x.c
q=x.z
o=u.a+5
if(o<0||o>=q.length)return H.a(q,o)
o=q[o].a
if(o<0||o>=p.length)return H.a(p,o)
J.P(t,2,p[o].b)}n=this.O(0)
for(z=J.bG(C.A.f1("["+H.dE(H.dE(H.dE(P.eU(n.fP(n.b-1),0,null),"}\n{","},\n{"),'" "','": "'),'"\n"','",\n"')+"]")),y=x.id,t=x.go,s=x.fy,q=x.fx;z.v();){m=z.gw()
p=J.A(m)
if(J.w(p.h(m,"classname"),"trigger_push"))q.j(0,p.h(m,"model"),p.h(m,"target"))
else if(J.w(p.h(m,"classname"),"target_position"))s.j(0,p.h(m,"targetname"),p.h(m,"origin"))
else if(J.w(p.h(m,"classname"),"info_player_deathmatch"))t.push(J.F(J.F(p.h(m,"origin")," "),p.h(m,"angle")))
else if(J.w(p.h(m,"classname"),"trigger_hurt"))y.j(0,p.h(m,"model"),p.h(m,"dmg"))}x.x=B.jD(this.O(7))
return x}},
hC:{"^":"l:8;a",
$1:function(a){var z,y
z=this.a.cy
if(a>=z.length)return H.a(z,a)
z=z[a]
y=new B.co(null,null,null,null,null,null,null,null,null,null,null,null,null,null)
y.a=z.a
y.b=z.b
y.c=z.c
y.d=z.d
y.e=z.e
y.f=z.f
y.r=z.r
y.x=z.x
y.y=z.y
y.z=z.z
y.Q=z.Q
y.ch=z.ch
y.cx=z.cx
return y}},
hG:{"^":"f;a,k:b>,c,d",
a_:function(a){var z,y,x,w
z=H.M(a)
y=new Float32Array(z)
for(x=0;x<z;++x){w=this.d+=4
y[x]=this.c.getFloat32(w-4,!0)}return y},
fP:function(a){var z,y,x,w
z=this.c
y=z.buffer
z=z.byteOffset
x=this.d
if(typeof z!=="number")return z.F()
y.toString
w=H.jE(y,z+x,a)
this.d+=a
return w},
bD:function(a){var z,y,x,w
z=H.M(a)
y=new Uint32Array(z)
for(x=0;x<z;++x){w=this.d+=4
y[x]=this.c.getUint32(w-4,!0)}return y},
ah:function(a){var z,y,x,w
z=H.M(a)
y=new Int32Array(z)
for(x=0;x<z;++x){w=this.d+=4
y[x]=this.c.getInt32(w-4,!0)}return y}},
dY:{"^":"f;a,b,c,d,e,f",q:{
hK:function(a){var z,y,x,w,v
z=H.h(new Array(C.b.D(a.b,12)),[B.dY])
for(y=z.length,x=0;x<y;++x){w=new B.dY(null,null,null,B.cI(2),null,0)
v=a.d+=4
w.a=a.c.getInt32(v-4,!0)
v=a.d+=4
w.b=a.c.getInt32(v-4,!0)
v=a.d+=4
w.c=a.c.getInt32(v-4,!0)
z[x]=w}return z}}},
dZ:{"^":"f;a,b,c",q:{
hL:function(a){var z,y,x,w,v,u
z=C.b.D(a.b,8)
y=H.h(new Array(z),[B.dZ])
for(x=y.length,w=0;w<z;++w){v=new B.dZ(null,null,null)
u=a.d+=4
v.a=a.c.getInt32(u-4,!0)
u=a.d+=4
v.b=a.c.getInt32(u-4,!0)
if(w>=x)return H.a(y,w)
y[w]=v}return y}}},
dU:{"^":"f;a,b,c,d",q:{
hA:function(a){var z,y,x,w,v,u
z=C.b.D(a.b,36)
y=H.h(new Array(z),[B.dU])
for(x=y.length,w=0;w<z;++w){v=new B.dU(null,null,null,null)
u=a.d+=4
v.a=a.c.getInt32(u-4,!0)
v.b=a.ah(2)
v.c=a.ah(3)
v.d=a.ah(3)
if(w>=x)return H.a(y,w)
y[w]=v}return y}}},
hV:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1"},
kJ:{"^":"f;a"},
nh:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
d3:{"^":"f;a,b,c,d,e,f,r,x",q:{
js:function(a){var z,y,x,w,v,u
z=C.b.D(a.b,48)
y=H.h(new Array(z),[B.d3])
for(x=y.length,w=0;w<z;++w){v=new B.d3(null,null,null,null,null,null,null,null)
u=a.d+=4
v.a=a.c.getInt32(u-4,!0)
u=a.d+=4
v.b=a.c.getInt32(u-4,!0)
v.c=a.ah(3)
v.d=a.ah(3)
u=a.d+=4
v.e=a.c.getInt32(u-4,!0)
u=a.d+=4
v.f=a.c.getInt32(u-4,!0)
u=a.d+=4
v.r=a.c.getInt32(u-4,!0)
u=a.d+=4
v.x=a.c.getInt32(u-4,!0)
if(w>=x)return H.a(y,w)
y[w]=v}return y}}},
eA:{"^":"f;a,b,c,d,e,f",q:{
jD:function(a){var z,y,x,w,v,u,t
z=H.h(new Array(C.b.D(a.b,40)),[B.eA])
for(y=z.length,x=[P.u],w=0;w<y;++w){v=new B.eA(null,null,null,null,null,null)
u=a.a_(3)
v.a=new Q.o(u,null,H.h(new Array(4),x))
t=u.length
if(0>=t)return H.a(u,0)
u[0]=u[0]-1
if(1>=t)return H.a(u,1)
u[1]=u[1]-1
if(2>=t)return H.a(u,2)
u[2]=u[2]-1
u=a.a_(3)
v.b=new Q.o(u,null,H.h(new Array(4),x))
t=u.length
if(0>=t)return H.a(u,0)
u[0]=u[0]+1
if(1>=t)return H.a(u,1)
u[1]=u[1]+1
if(2>=t)return H.a(u,2)
u[2]=u[2]+1
u=a.d+=4
v.c=a.c.getInt32(u-4,!0)
u=a.d+=4
v.d=a.c.getInt32(u-4,!0)
u=a.d+=4
v.e=a.c.getInt32(u-4,!0)
u=a.d+=4
v.f=a.c.getInt32(u-4,!0)
z[w]=v}return z}}},
m9:{"^":"l:0;",
$1:function(a){var z=new Array(4)
z.fixed$length=Array
return new B.bQ(H.h(z,[P.u]),null)}},
ik:{"^":"f;a,b,c,d,e",
l:function(a){var z,y,x,w,v
z="width: "+H.m(this.a)+", height: "+H.m(this.b)+", "+H.m(this.c)+", "+H.m(this.d)+"\n"
y=this.e
x=0
while(!0){w=this.a
if(typeof w!=="number")return H.n(w)
if(!(x<w))break
v=0
while(!0){w=this.b
if(typeof w!=="number")return H.n(w)
if(!(v<w))break
if(x>=y.length)return H.a(y,x)
z=z+H.m(J.e(y[x],v))+",";++v}z+="\n";++x}return z.charCodeAt(0)==0?z:z}},
m7:{"^":"l:0;",
$1:function(a){return P.a6(129,new B.lL(),!0,Q.o)}},
lL:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
kF:{"^":"f;a,b",
el:function(a){this.b=P.a6(a,new B.kG(),!0,Q.o)},
q:{
dk:function(a){var z=new B.kF(0,null)
z.el(a)
return z}}},
kG:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
bQ:{"^":"f;t:a<,aJ:b@"},
cW:{"^":"f;a,b,c,d,e"},
jH:{"^":"f;a,b,c,d,e"},
m8:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
jG:{"^":"f;a,b,c,d"},
mO:{"^":"l:0;",
$1:function(a){return P.a6(129,new B.mN(),!0,[P.d,P.q])}},
mN:{"^":"l:0;",
$1:function(a){var z=new Array(2)
z.fixed$length=Array
return H.h(z,[P.q])}},
i1:{"^":"l:8;a",
$1:function(a){var z=this.a.b
if(a>=z.length)return H.a(z,a)
return Q.br(z[a])}},
ng:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
n0:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
ci:{"^":"f;a,b,c,aJ:d@",
b5:function(){var z,y
z=this.a.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]===1)y=0
else{if(1>=y)return H.a(z,1)
if(z[1]===1)y=1
else{if(2>=y)return H.a(z,2)
y=z[2]===1?2:3}}this.c=y
this.d=B.c2(z)},
ec:function(a,b){if(this.a==null)this.a=Q.k(0,0,0)
if(this.b==null)this.b=0
this.b5()},
q:{
bR:function(a,b){var z=new B.ci(a,b,null,null)
z.ec(a,b)
return z},
jJ:function(a){var z,y,x,w,v,u,t,s
z=C.b.D(a.b,16)
y=H.h(new Array(z),[B.ci])
for(x=y.length,w=[P.u],v=0;v<z;++v){u=new B.ci(null,null,null,null)
t=new Q.o(a.a_(3),null,H.h(new Array(4),w))
u.a=t
s=a.d+=4
u.b=a.c.getFloat32(s-4,!0)
t=t.a
s=t.length
if(0>=s)return H.a(t,0)
if(t[0]===1)s=0
else{if(1>=s)return H.a(t,1)
if(t[1]===1)s=1
else{if(2>=s)return H.a(t,2)
s=t[2]===1?2:3}}u.c=s
u.d=B.c2(t)
if(v>=x)return H.a(y,v)
y[v]=u}return y}}},
eP:{"^":"f;a,b,c"},
co:{"^":"f;a,b,e5:c<,d,e,f,r,x,y,z,Q,ch,cx,fN:cy<"},
cq:{"^":"f;a,b,c,d,e"}}],["","",,E,{"^":"",hP:{"^":"f;a,b,c,d",
aV:function(a,b){var z=new XMLHttpRequest()
z.responseType="arraybuffer"
C.i.di(z,"GET",a)
W.ae(z,"loadend",new E.hR(this,b,z),!1,W.eN)
z.send("")},
bC:function(a,b){var z,y,x
if(b){z=Date.now()
y=this.d
if(y.am(0,a))if(J.aw(J.F(y.h(0,a),2000),z))return
y.j(0,a,z)}z=this.c
if(z.h(0,a)==null)return
x=this.a.createBufferSource()
x.buffer=z.h(0,a)
x.connect(this.b,0,0)
if(!!x.start)x.start(0)
else x.noteOn(0)},
dm:function(a){return this.bC(a,!1)},
e7:function(a){var z=new (window.AudioContext||window.webkitAudioContext)()
this.a=z
z=J.h3(z)
this.b=z
z.gain.value=a
z.connect(this.a.destination,0,0)}},hR:{"^":"l:0;a,b,c",
$1:function(a){var z,y
z=H.bE(W.fl(this.c.response),"$isc7")
y=this.a
J.h6(y.a,z).aC(new E.hQ(y,this.b))}},hQ:{"^":"l:18;a,b",
$1:function(a){this.a.c.j(0,this.b,a)}}}],["","",,B,{"^":"",
n1:function(a){var z,y,x
z=document
y=W.cb
W.ae(z,"keydown",new B.n2(),!1,y)
W.ae(z,"keyup",new B.n3(),!1,y)
if(!$.fO)W.ae(z,"mousemove",new B.n4(),!1,W.aA)
y=W.aA
W.ae(z,"mousedown",new B.n5(),!1,y)
x=J.hf(a)
W.ae(x.a,x.b,new B.n6(),!1,H.aL(x,0))
W.ae(z,"mouseup",new B.n7(),!1,y)},
m3:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=d.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=a.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(x<u){t=c.a
if(0>=t.length)return H.a(t,0)
t=t[0]<u}else t=!1
if(t)return-1
t=b.a
s=t.length
if(0>=s)return H.a(t,0)
r=t[0]
if(x>r){q=c.a
if(0>=q.length)return H.a(q,0)
q=q[0]>r}else q=!1
if(q)return-2
if(1>=y)return H.a(z,1)
q=z[1]
if(1>=v)return H.a(w,1)
p=w[1]
if(q<p){o=c.a
if(1>=o.length)return H.a(o,1)
o=o[1]<p}else o=!1
if(o)return-3
if(1>=s)return H.a(t,1)
o=t[1]
if(q>o){q=c.a
if(1>=q.length)return H.a(q,1)
q=q[1]>o}else q=!1
if(q)return-4
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
w=w[2]
if(z<w){y=c.a
if(2>=y.length)return H.a(y,2)
y=y[2]<w}else y=!1
if(y)return-5
if(2>=s)return H.a(t,2)
y=t[2]
if(z>y){z=c.a
if(2>=z.length)return H.a(z,2)
z=z[2]>y}else z=!1
if(z)return-6
z=c.a
v=z.length
if(0>=v)return H.a(z,0)
t=z[0]
if(t>u)if(t<r){if(1>=v)return H.a(z,1)
s=z[1]
if(s>p)if(s<o){if(2>=v)return H.a(z,2)
z=z[2]
z=z>w&&z<y}else z=!1
else z=!1}else z=!1
else z=!1
if(z){e.m(0,c)
H.aN("this sucks")
return 1}$.a8=1e5
$.aK=0
if(B.bB(t-u,x-u,c,d,e)&&B.bD(e,a,b,1)){n=c.ab(e)
if(n<$.a8){$.a8=n
$.aK=1
$.$get$aV().m(0,e)}}z=c.a
if(1>=z.length)return H.a(z,1)
z=z[1]
y=a.a
if(1>=y.length)return H.a(y,1)
y=y[1]
x=d.a
if(1>=x.length)return H.a(x,1)
if(B.bB(z-y,x[1]-y,c,d,e)&&B.bD(e,a,b,2)){n=c.ab(e)
if(n<$.a8){$.a8=n
$.aK=2
$.$get$aV().m(0,e)}}z=c.a
if(2>=z.length)return H.a(z,2)
z=z[2]
y=a.a
if(2>=y.length)return H.a(y,2)
y=y[2]
x=d.a
if(2>=x.length)return H.a(x,2)
if(B.bB(z-y,x[2]-y,c,d,e)&&B.bD(e,a,b,3)){n=c.ab(e)
if(n<$.a8){$.a8=n
$.aK=3
$.$get$aV().m(0,e)}}z=c.a
if(0>=z.length)return H.a(z,0)
z=z[0]
y=b.a
if(0>=y.length)return H.a(y,0)
y=y[0]
x=d.a
if(0>=x.length)return H.a(x,0)
if(B.bB(z-y,x[0]-y,c,d,e)&&B.bD(e,a,b,1)){n=c.ab(e)
if(n<$.a8){$.a8=n
$.aK=4
$.$get$aV().m(0,e)}}z=c.a
if(1>=z.length)return H.a(z,1)
z=z[1]
y=b.a
if(1>=y.length)return H.a(y,1)
y=y[1]
x=d.a
if(1>=x.length)return H.a(x,1)
if(B.bB(z-y,x[1]-y,c,d,e)&&B.bD(e,a,b,2)){n=c.ab(e)
if(n<$.a8){$.a8=n
$.aK=5
$.$get$aV().m(0,e)}}z=c.a
if(2>=z.length)return H.a(z,2)
z=z[2]
y=b.a
if(2>=y.length)return H.a(y,2)
y=y[2]
x=d.a
if(2>=x.length)return H.a(x,2)
if(B.bB(z-y,x[2]-y,c,d,e)&&B.bD(e,a,b,3)){n=c.ab(e)
if(n<$.a8){$.a8=n
$.aK=6
$.$get$aV().m(0,e)}}if($.aK>0)e.m(0,$.$get$aV())
return $.aK},
bB:function(a,b,c,d,e){if(a*b>=0)return!1
if(a===b)return!1
$.$get$c3().m(0,d)
$.$get$c3().Y(0,c)
$.$get$c3().C(0,-a/(b-a))
e.m(0,$.$get$c3())
e.K(0,c)
return!0},
bD:function(a,b,c,d){var z,y,x,w,v,u,t
if(d===1){z=a.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=b.a
if(2>=x.length)return H.a(x,2)
if(y>x[2]){w=c.a
if(2>=w.length)return H.a(w,2)
if(y<w[2]){z=z[1]
z=z>x[1]&&z<w[1]}else z=!1}else z=!1}else z=!1
if(z)return!0
if(d===2){z=a.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=b.a
if(2>=x.length)return H.a(x,2)
if(y>x[2]){w=c.a
if(2>=w.length)return H.a(w,2)
if(y<w[2]){z=z[0]
z=z>x[0]&&z<w[0]}else z=!1}else z=!1}else z=!1
if(z)return!0
if(d===3){z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
if(x>w[0]){u=c.a
t=u.length
if(0>=t)return H.a(u,0)
if(x<u[0]){if(1>=y)return H.a(z,1)
z=z[1]
if(1>=v)return H.a(w,1)
if(z>w[1]){if(1>=t)return H.a(u,1)
z=z<u[1]}else z=!1}else z=!1}else z=!1}else z=!1
if(z)return!0
return!1},
mj:function(){var z=new B.df("Textured",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"","","","")
z.d="aVertexPosition"
z.f="aTextureCoord"
z.dx="uColor"
z.z="uMVMatrix"
z.ch="uPMatrix"
z.cx="uSampler"
z.k2="uniform vec3 uColor;"
z.k3="gl_FragColor = texture2D(uSampler, vaTextureCoord) + vec4( uColor, 0.0 );"
return B.fy(z)},
fy:function(a){var z,y,x
z="    precision mediump float;\r\n\r\n    attribute vec3 "+H.m(a.d)+";\r\n    \r\n    uniform mat4 "+H.m(a.z)+";\r\n    uniform mat4 "+H.m(a.ch)+";\r\n    "
y=a.f
if(y!=null)z+="        attribute vec2 "+y+";\r\n        varying vec2 v"+H.m(a.f)+";\r\n        "
y=a.e
if(y!=null)z+="        attribute vec3 "+y+";\r\n        varying vec3 v"+H.m(a.e)+";\r\n        "
z=z+(a.id+"\n")+"void main(void) {\n"+("gl_Position = "+H.m(a.ch)+" * "+H.m(a.z)+" * vec4("+H.m(a.d)+", 1.0);\n")
y=a.f
if(y!=null)z+="v"+y+" = "+H.m(a.f)+";\n"
y=a.e
if(y!=null)z+="v"+y+" = "+H.m(a.e)+";\n"
a.b=z+a.k1+"}\n"
y=a.f
x=y!=null?"precision mediump float;\n"+("varying vec2 v"+y+";\n"):"precision mediump float;\n"
y=a.e
if(y!=null)x+="varying vec3 v"+y+";\n"
y=a.cx
if(y!=null)x+="uniform sampler2D "+y+";\n"
a.c=x+(a.k2+"\n")+"void main(void) {\n"+a.k3+"\n}\n"
return a},
mi:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b/2
y=[P.u]
x=H.h([],y)
w=H.h([],y)
v=H.h([],[P.q])
C.c.H(x,[0,z,0])
C.c.H(w,[0,0])
y=-z
C.c.H(x,[0,y,0])
C.c.H(w,[1,1])
for(u=0;u<c;++u){t=u/c
s=t*3.141592653589793*2
r=a*Math.sin(s)
q=a*Math.cos(s)
C.c.H(x,[r,z,q])
C.c.H(w,[t,t])
C.c.H(x,[r,y,q])
C.c.H(w,[1,t])
if(u>0){p=u*2+2
s=p-2
C.c.H(v,[0,s,p])
o=p-1
n=p+1
C.c.H(v,[1,o,n])
C.c.H(v,[s,p,n])
C.c.H(v,[o,n,s])}}p=c*2+2
y=p-2
C.c.H(v,[0,y,2])
s=p-1
C.c.H(v,[1,s,3])
C.c.H(v,[y,2,3])
C.c.H(v,[s,3,y])
return new B.d8(x,null,null,null,w,v,!1,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))},
dS:{"^":"f;aS:a>"},
hS:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1",
f_:function(a,b,c){var z,y
z=b.a
y=B.k3(this,b,z)
this.c.j(0,z,y)
return y},
cW:function(a,b){return this.f_(a,b,!0)},
bq:function(a,b,c){var z,y,x
for(z=this.d,z=z.gar(z),z=z.gE(z);z.v();){y=z.gw()
x=J.p(y)
if(x.gaS(y)===!0)x.a2(y,c)}for(z=this.e,z=z.gar(z),z=z.gE(z);z.v();)z.gw().$2(c,b)
for(z=this.c,z=z.gar(z),z=z.gE(z);z.v();)J.fY(z.gw(),c)
z=this.cx
if(z!=null)z.a2(0,c)},
fa:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.Q
if(z!=null)J.dI(this.b,36160,z.d)
z=this.go
y=this.r
x=y.clientWidth
if(z==null?x==null:z===x){z=this.id
w=y.clientHeight
w=z==null?w!=null:z!==w
z=w}else z=!0
if(z){J.dN(y,x)
z=this.r
J.dM(z,z.clientHeight)
z=this.b
y=this.r
J.hv(z,0,0,y.clientWidth,y.clientHeight)
y=this.db
z=this.r
x=z.clientWidth
z=z.clientHeight
if(typeof x!=="number")return x.h2()
if(typeof z!=="number")return H.n(z)
w=this.fr
v=this.fx
u=w*Math.tan(0.4363323129985824)
t=u*(x/z)
z=-t
x=-u
s=t-z
r=u-x
q=v-w
y.a3(0)
y=y.a
p=w*2
y[0]=p/s
y[5]=p/r
y[8]=(t+z)/s
y[9]=(u+x)/r
y[10]=-(v+w)/q
y[11]=-1
y[14]=-(v*w*2)/q
w=this.r
this.go=w.clientWidth
this.id=w.clientHeight}J.dJ(this.b,16640)
for(z=this.c,z=z.gar(z),z=z.gE(z),y=this.db;z.v();)z.gw().fb(y)
z=this.Q
if(z!=null){o=J.h0(z.a,36160)===36053
if(!o)P.aa("FRAMEBUFFER_INCOMPLETE")
z=o}else z=!1
if(z){J.dI(this.b,36160,null)
J.dJ(this.b,16640)
z=this.cy
this.cx.ap(z,z)}},
aY:[function(a){var z,y
if(a==null)a=0
if(J.w(this.k1,0))this.k1=a
z=J.J(a,this.k1)
this.k1=a
if(J.hd(z)){P.aa("isNaN(elapsed)")
z=0}this.bq(0,a,z)
this.fa()
y=window
C.m.ez(y)
C.m.eK(y,W.fr(this.gfT()))},function(){return this.aY(null)},"ai","$1","$0","gfT",0,2,19,0],
e8:function(a,b,c,d,e,f){var z=document.querySelector(a)
this.r=z
z=J.hg(z)
W.ae(z.a,z.b,new B.hU(),!1,H.aL(z,0))
z=this.r
J.dN(z,z.clientWidth)
z=this.r
J.dM(z,z.clientHeight)
z=J.hh(this.r,"experimental-webgl")
this.b=z
if(z==null)throw H.j(P.bK('calling canvas.getContext("experimental-webgl") failed, make sure you run on a computer that supports WebGL, test here: http://get.webgl.org/'))
$.e_=z
J.h1(z,0,0,0,1)
J.ha(this.b,2929)
this.f=this.cW(0,B.mj())
z=new B.km(new H.U(0,null,null,null,null,null,0,[P.v,B.bT]),this,null,!0,!1,9729,9729)
z.c=this.b
this.x=z
z=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
z.U()
this.y=new B.hM(null,z,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
z=new B.kD(this,null,null)
z.b=this.b
z.c=this.x
this.z=z
B.n1(this.r)},
q:{
hT:function(a,b,c,d,e,f){var z,y,x
z=P.v
y=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
y.U()
x=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
x.U()
x=new B.hS(null,null,new H.U(0,null,null,null,null,null,0,[z,B.eQ]),new H.U(0,null,null,null,null,null,0,[z,B.dS]),new H.U(0,null,null,null,null,null,0,[z,{func:1,v:true,args:[P.u,P.u]}]),null,null,null,null,null,null,null,null,y,x,new B.k8(),new B.hH(1,770,771,32774,769,768,774),d,b,Q.k(0,0,0),0,0,0)
x.e8(a,b,c,d,!1,!1)
return x}}},
hU:{"^":"l:3;",
$1:function(a){J.cO(a)}},
hH:{"^":"f;a,b,c,d,e,f,r"},
hM:{"^":"eR;f,a,b,c,d,e",
bR:function(a,b){var z,y,x,w
z=a.a
y=this.a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
z[4]=y[4]
z[5]=y[5]
z[6]=y[6]
z[7]=y[7]
z[8]=y[8]
z[9]=y[9]
z[10]=y[10]
z[11]=y[11]
z[12]=0
z[13]=0
z[14]=0
z[15]=1
if(b){x=-y[12]
w=-y[13]
y=-y[14]
z[12]=z[0]*x+z[4]*w+z[8]*y+z[12]
z[13]=z[1]*x+z[5]*w+z[9]*y+z[13]
z[14]=z[2]*x+z[6]*w+z[10]*y+z[14]
z[15]=z[3]*x+z[7]*w+z[11]*y+z[15]}}},
n2:{"^":"l:9;",
$1:function(a){$.$get$cz().j(0,J.dK(a),!0)}},
n3:{"^":"l:9;",
$1:function(a){$.$get$cz().j(0,J.dK(a),null)}},
n4:{"^":"l:3;",
$1:function(a){var z,y,x
z=J.p(a)
y=z.ga4(a)
$.m5=y.gn(y)
y=window.innerHeight
x=z.ga4(a)
x=x.gp(x)
if(typeof y!=="number")return y.A()
if(typeof x!=="number")return H.n(x)
$.m6=y-x
x=z.ga4(a)
x=x.gn(x)
y=window.innerWidth
if(typeof y!=="number")return y.b6()
y=C.b.D(y,2)
if(typeof x!=="number")return x.A()
$.fG=x-y
z=z.ga4(a)
z=z.gp(z)
y=window.innerHeight
if(typeof y!=="number")return y.b6()
y=C.b.D(y,2)
if(typeof z!=="number")return z.A()
$.fH=-(z-y)}},
n5:{"^":"l:3;",
$1:function(a){var z,y,x
z=J.p(a)
y=z.ga4(a)
y=y.gn(y)
x=window.innerWidth
if(typeof x!=="number")return x.b6()
x=C.b.D(x,2)
if(typeof y!=="number")return y.A()
$.mI=y-x
x=z.ga4(a)
x=x.gp(x)
y=window.innerHeight
if(typeof y!=="number")return y.b6()
y=C.b.D(y,2)
if(typeof x!=="number")return x.A()
$.mJ=-(x-y)
if(z.gcK(a)===2)$.$get$by().j(0,"right",!0)
else $.$get$by().j(0,"left",!0)}},
n6:{"^":"l:3;",
$1:function(a){J.cO(a)}},
n7:{"^":"l:3;",
$1:function(a){if(J.hc(a)===2)$.$get$by().j(0,"right",null)
else $.$get$by().j(0,"left",null)}},
cZ:{"^":"f;"},
jB:{"^":"b1;fr,fx,fy,go,id,k1,k2,k3,k4,a6:r1<,r2,rx,ry,x1,x2,y1,y2,fd,d5,bx,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d,e",
d_:function(a){var z,y,x
J.ax(this.fr,34962,this.x1)
J.cR(this.fr,a.f,3,5126,!1,0,0)
z=a.b
if(z.e!=null){J.ax(this.fr,34962,this.x2)
J.cR(this.fr,a.r,3,5126,!1,0,0)}if(z.f!=null){J.ax(this.fr,34962,this.y1)
J.cR(this.fr,a.x,2,5126,!1,0,0)}if(z.cx!=null){J.fX(this.fr,33984)
J.bF(this.fr,3553,this.r1)
J.hr(this.fr,a.db,0)}if(z.dx!=null){y=a.fr
x=this.ry
J.ht(y.b,y.a,x.a)}z.y
J.dR(this.fr,a.ch,!1,this.Q.a)
z=this.d5
y=this.fr
if(z==null)J.h7(y,4,0,this.bx)
else{J.ax(y,34963,z)
z=this.fr
y=this.bx
J.h8(z,4,y,$.cV?5125:5123,0)}},
eb:function(a,b,c,d,e){var z,y,x
if(!a.r)a.dj()
z=$.e_
this.fr=z
z=J.bd(z)
this.x1=z
J.ax(this.fr,34962,z)
J.aX(this.fr,34962,H.bE(a.a,"$isc9"),35044)
if(a.b!=null){z=J.bd(this.fr)
this.x2=z
J.ax(this.fr,34962,z)
J.aX(this.fr,34962,a.b,35044)}if(a.e!=null){z=J.bd(this.fr)
this.y1=z
J.ax(this.fr,34962,z)
J.aX(this.fr,34962,H.bE(a.e,"$isc9"),35044)}if(a.c!=null){z=J.bd(this.fr)
this.y2=z
J.ax(this.fr,34962,z)
J.aX(this.fr,34962,a.c,35044)}if(a.d!=null){z=J.bd(this.fr)
this.fd=z
J.ax(this.fr,34962,z)
J.aX(this.fr,34962,a.d,35044)}this.bx=a.f.length
z=J.bd(this.fr)
this.d5=z
J.ax(this.fr,34963,z)
z=$.cV
y=this.fr
x=a.f
if(z)J.aX(y,34963,H.bE(x,"$iskA"),35044)
else J.aX(y,34963,H.bE(x,"$iskz"),35044)},
q:{
d7:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=Q.k(0,0,0)
y=H.h([],[B.b1])
x=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
x.U()
w=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
w.U()
v=new Float32Array(H.M(9))
u=new Float32Array(H.M(9))
t=Q.k(0,0,0)
s=Q.k(0,0,0)
r=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
r.U()
r=new B.jB(null,!1,!0,!0,!1,770,771,32774,!1,c,d,e,z,null,null,null,null,null,null,null,"","",!0,!1,y,x,w,null,new Q.ce(v),new Q.ce(u),t,s,r,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
r.eb(a,!1,c,d,e)
return r}}},
d8:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch",
dj:function(){var z=this.a
if(!J.y(z).$isc9)this.a=new Float32Array(H.aU(z))
z=this.b
z=this.e
if(z!=null&&!J.y(z).$isc9)this.e=new Float32Array(H.aU(z))
z=this.c
z=this.d
z=this.f
if(!J.y(z).$isat)this.f=$.cV?new Uint32Array(H.aU(z)):new Uint16Array(H.aU(z))
this.r=!0}},
b1:{"^":"eR;aU:x>",
a2:function(a,b){},
d_:function(a){},
ap:function(a,b){var z,y,x,w,v
z=this.Q
z.aI(b)
y=this.ch
x=this.a
y.aI(x)
if(this.y){y.fw()
w=y.a
x=x.a
w[12]=x[12]
w[13]=x[13]
w[14]=x[14]}z.fL(y)
this.d_(a)
for(y=this.z,x=y.length,v=0;v<y.length;y.length===x||(0,H.aD)(y),++v)y[v].ap(a,z)}},
df:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3"},
eQ:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,aS:k3>,k4,r1,r2,rx,ry",
a2:function(a,b){var z,y,x,w
this.ry+=b
for(z=this.r2,y=z.length,x=0;x<z.length;z.length===y||(0,H.aD)(z),++x){w=z[x]
if(w.x)w.a2(0,b)}},
fp:function(){if(C.c.br(this.r2,new B.k4()))return!0
if(C.c.br(this.r1,new B.k5()))return!0
if(C.c.br(this.rx,new B.k6()))return!0
return!1},
ap:function(a,b){var z,y,x,w,v,u
if(!this.fp())return
J.hu(this.d,this.e)
J.cL(this.d,this.f)
z=this.b
if(z.e!=null)J.cL(this.d,this.r)
if(z.f!=null)J.cL(this.d,this.x)
if(z.ch!=null)J.dR(this.d,this.cy,!1,a.gR())
z.go
y=this.a
x=y.y
w=this.k4
x.bR(w,!1)
if(z.dy!=null)J.dQ(this.d,this.fx,y.fr)
if(z.fr!=null)J.dQ(this.d,this.fy,y.fx)
if(z.fx!=null){v=this.d
u=this.go
y=y.r
J.hs(v,u,y.clientWidth,y.clientHeight)}this.d2(this.r1)
x.bR(w,!0)
z.Q
if(b!=null)w.aI(b)
this.d2(this.r2)
this.fc()
J.cK(this.d,this.f)
if(z.e!=null)J.cK(this.d,this.r)
if(z.f!=null)J.cK(this.d,this.x)
z.x},
fb:function(a){return this.ap(a,null)},
fc:function(){var z,y,x,w
for(z=this.rx,y=this.k4,x=0;!1;++x){if(x>=0)return H.a(z,x)
w=z[x]
if(w.gaU(w))w.ap(this,y)}},
d2:function(a){var z,y,x,w
for(z=a.length,y=this.k4,x=0;x<a.length;a.length===z||(0,H.aD)(a),++x){w=a[x]
if(w.x)w.ap(this,y)}},
ee:function(a,b,c){var z,y,x,w,v,u
z=this.a.b
this.d=z
y=new B.k7(z)
x=this.b
w=x.b
v=x.c
u=J.h4(z)
J.dH(z,u,y.bU(35633,w))
J.dH(y.a,u,y.bU(35632,v))
J.hm(y.a,u)
if(J.hj(y.a,u,35714)!==!0)H.L(J.hi(y.a,u))
this.e=u
this.f=J.cN(this.d,u,x.d)
z=x.e
if(z!=null)this.r=J.cN(this.d,this.e,z)
z=x.f
if(z!=null)this.x=J.cN(this.d,this.e,z)
z=x.ch
this.cy=J.aY(this.d,this.e,z)
z=x.z
this.ch=J.aY(this.d,this.e,z)
z=x.cx
if(z!=null)this.db=J.aY(this.d,this.e,z)
z=x.dx
if(z!=null)this.fr=new B.kB(J.aY(this.d,this.e,z),this.d)
z=x.dy
if(z!=null)this.fx=J.aY(this.d,this.e,z)
z=x.fr
if(z!=null)this.fy=J.aY(this.d,this.e,z)
z=x.fx
if(z!=null)this.go=J.aY(this.d,this.e,z)
x.go},
q:{
k3:function(a,b,c){var z,y
z=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
z.U()
y=[B.b1]
y=new B.eQ(a,b,c,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,z,H.h([],y),H.h([],y),H.h([],[B.cZ]),0)
y.ee(a,b,c)
return y}}},
k4:{"^":"l:10;",
$1:function(a){return J.cM(a)}},
k5:{"^":"l:10;",
$1:function(a){return J.cM(a)}},
k6:{"^":"l:20;",
$1:function(a){return J.cM(a)}},
kB:{"^":"f;a,b"},
k7:{"^":"f;a",
bU:function(a,b){var z,y
z=J.h5(this.a,a)
J.hp(this.a,z,b)
J.h2(this.a,z)
y=J.hl(this.a,z,35713)
if(y!=null&&J.w(y,!1))throw H.j(J.hk(this.a,z))
return z}},
k8:{"^":"f;"},
eR:{"^":"f;",
aj:function(){var z,y,x,w,v
z=this.b
y=$.bn
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.bo
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.bp
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
b2:function(){var z,y,x,w,v
z=this.c
y=$.er
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.es
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.et
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
dQ:function(){var z,y,x,w,v
z=this.d
y=$.ex
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.ey
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.ez
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
as:function(){var z,y,x,w,v
z=this.e
y=$.eu
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.ev
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.ew
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
a8:function(a,b,c){var z,y,x,w
z=this.a
y=$.bn
x=z.a
w=C.b.i(a)
if(y>=16)return H.a(x,y)
x[y]=w
w=$.bo
y=z.a
x=C.b.i(b)
if(w>=16)return H.a(y,w)
y[w]=x
x=$.bp
z=z.a
w=C.b.i(c)
if(x>=16)return H.a(z,x)
z[x]=w},
fJ:function(a){var z,y,x,w,v
z=this.a
y=$.bn
x=z.a
if(y>=16)return H.a(x,y)
w=x[y]
v=$.er
if(v>=16)return H.a(x,v)
x[y]=C.a.i(w+x[v]*a)
v=$.bo
x=z.a
if(v>=16)return H.a(x,v)
w=x[v]
y=$.es
if(y>=16)return H.a(x,y)
x[v]=C.a.i(w+x[y]*a)
y=$.bp
z=z.a
if(y>=16)return H.a(z,y)
x=z[y]
w=$.et
if(w>=16)return H.a(z,w)
z[y]=C.a.i(x+z[w]*a)}},
km:{"^":"f;a,b,c,d,e,f,r",
eQ:function(a,b,c){var z,y,x
z=this.a
y=this.c
x=new B.bT(null,W.eg(null,null,null),!1,!1,!1,3553,H.h([],[B.bT]))
x.a=J.cJ(y)
z.j(0,b,x)
return x},
K:function(a,b){return this.eQ(a,b,!1)},
fE:function(a){this.fD().aC(new B.kn(a))},
fD:function(){var z,y,x,w,v,u
z=H.h([],[[P.ad,W.bi]])
for(y=this.a,y=y.gaq(y),y=y.gE(y),x=[W.bi];y.v();){w=y.gw()
v=this.a.h(0,w)
if(J.he(v)===!0)continue
u=new W.bW(v.gda(),"load",!1,x)
z.push(u.gby(u))
v.b.src=w}return P.ig(z,null,!1).aC(new B.ko(this))}},
kn:{"^":"l:0;a",
$1:function(a){this.a.$0()}},
ko:{"^":"l:21;a",
$1:function(a){var z,y,x,w,v,u,t,s,r
for(z=this.a,y=z.a,y=y.gaq(y),y=y.gE(y),x=z.r,w=z.f;y.v();){v=y.gw()
u=z.a.h(0,v)
t=J.p(u)
if(t.gaW(u)===!0&&t.gbN(u)!==34067)continue
u.gf0()
J.bF(z.c,u.f,u.a)
J.dL(z.c,37440,1)
J.c4(z.c,u.f,10240,x)
J.c4(z.c,u.f,10241,w)
t=u.f
if(t===34067)for(t=u.r,s=0;!1;++s){if(s>=0)return H.a(t,s)
r=t[s]
J.cQ(z.c,r.gbN(r),0,6408,6408,5121,r.gda())}else J.cQ(z.c,t,0,6408,6408,5121,u.b)
J.bF(z.c,3553,null)
u.c=!0
H.aN("loaded: "+H.m(v))}}},
bT:{"^":"f;a6:a<,da:b<,aW:c>,d,f0:e<,bN:f>,r",
l:function(a){return H.m(this.b.src)+" - loaded: "+this.c+", clamp: false, cubemap: false, type: "+this.f}},
kD:{"^":"f;a,b,c",
an:function(a,b){var z=-1*b
return B.d7(new B.d8([z,z,0,b,z,0,b,b,0,z,b,0],null,null,null,[0,0,1,0,1,1,0,1],[0,1,2,0,2,3],!1,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0)),!1,a,null,null)},
fF:function(a,b){var z,y
z=new P.V(0,$.x,null,[null])
y=new XMLHttpRequest()
C.i.di(y,"GET",a)
y.responseType="arraybuffer"
W.ae(y,"loadend",new B.kE(new P.dl(z,[null]),y),!1,W.eN)
y.send()
return z}},
kE:{"^":"l:0;a,b",
$1:function(a){this.a.bv(0,W.fl(this.b.response))}}}],["","",,Q,{"^":"",ce:{"^":"f;R:a<"},az:{"^":"f;R:a<,b,c,d",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z,y
z=this.a
y=J.aF(c)
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=y},
a3:function(a){var z,y
for(z=this.a,y=0;y<16;++y)z[y]=0},
U:function(){var z,y
for(z=this.a,y=0;y<16;++y)z[y]=y%5===0?1:0
return this},
fw:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[8]
p=z[9]
o=z[10]
n=z[11]
m=z[12]
l=z[13]
k=z[14]
j=z[15]
i=y*t-x*u
h=y*s-w*u
g=y*r-v*u
f=x*s-w*t
e=x*r-v*t
d=w*r-v*s
c=q*l-p*m
b=q*k-o*m
a=q*j-n*m
a0=p*k-o*l
a1=p*j-n*l
a2=o*j-n*k
a3=i*a2-h*a1+g*a0+f*a-e*b+d*c
if(a3===0)return!1
a4=1/a3
z[0]=(t*a2-s*a1+r*a0)*a4
z[1]=(-x*a2+w*a1-v*a0)*a4
z[2]=(l*d-k*e+j*f)*a4
z[3]=(-p*d+o*e-n*f)*a4
a5=-u
z[4]=(a5*a2+s*a-r*b)*a4
z[5]=(y*a2-w*a+v*b)*a4
a6=-m
z[6]=(a6*d+k*g-j*h)*a4
z[7]=(q*d-o*g+n*h)*a4
z[8]=(u*a1-t*a+r*c)*a4
z[9]=(-y*a1+x*a-v*c)*a4
z[10]=(m*e-l*g+j*i)*a4
z[11]=(-q*e+p*g-n*i)*a4
z[12]=(a5*a0+t*b-s*c)*a4
z[13]=(y*a0-x*b+w*c)*a4
z[14]=(a6*f+l*h-k*i)*a4
z[15]=(q*f-p*h+o*i)*a4
return!0},
aB:function(a5,a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=a7.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
u=Math.sqrt(x*x+w*w+v*v)
if(u===0)return
if(u!==1){u=1/u
x*=u
w*=u
v*=u}t=Math.sin(a6)
s=Math.cos(a6)
r=1-s
z=this.a
q=z[0]
p=z[1]
o=z[2]
n=z[3]
m=z[4]
l=z[5]
k=z[6]
j=z[7]
i=z[8]
h=z[9]
g=z[10]
f=z[11]
e=x*x*r+s
y=v*t
d=w*x*r+y
c=w*t
b=v*x*r-c
a=x*w*r-y
a0=w*w*r+s
y=x*t
a1=v*w*r+y
a2=x*v*r+c
a3=w*v*r-y
a4=v*v*r+s
z[0]=q*e+m*d+i*b
z[1]=p*e+l*d+h*b
z[2]=o*e+k*d+g*b
z[3]=n*e+j*d+f*b
z[4]=q*a+m*a0+i*a1
z[5]=p*a+l*a0+h*a1
z[6]=o*a+k*a0+g*a1
z[7]=n*a+j*a0+f*a1
z[8]=q*a2+m*a3+i*a4
z[9]=p*a2+l*a3+h*a4
z[10]=o*a2+k*a3+g*a4
z[11]=n*a2+j*a3+f*a4},
bF:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.sin(a)
y=Math.cos(a)
x=this.a
w=x[4]
v=x[5]
u=x[6]
t=x[7]
s=x[8]
r=x[9]
q=x[10]
p=x[11]
x[4]=w*y+s*z
x[5]=v*y+r*z
x[6]=u*y+q*z
x[7]=t*y+p*z
o=-z
x[8]=w*o+s*y
x[9]=v*o+r*y
x[10]=u*o+q*y
x[11]=t*o+p*y},
bG:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.sin(a)
y=Math.cos(a)
x=this.a
w=x[0]
v=x[1]
u=x[2]
t=x[3]
s=x[8]
r=x[9]
q=x[10]
p=x[11]
o=-z
x[0]=w*y+s*o
x[1]=v*y+r*o
x[2]=u*y+q*o
x[3]=t*y+p*o
x[8]=w*z+s*y
x[9]=v*z+r*y
x[10]=u*z+q*y
x[11]=t*z+p*y},
bH:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Math.sin(a)
y=Math.cos(a)
x=this.a
w=x[0]
v=x[1]
u=x[2]
t=x[3]
s=x[4]
r=x[5]
q=x[6]
p=x[7]
x[0]=w*y+s*z
x[1]=v*y+r*z
x[2]=u*y+q*z
x[3]=t*y+p*z
o=-z
x[4]=w*o+s*y
x[5]=v*o+r*y
x[6]=u*o+q*y
x[7]=t*o+p*y},
aI:function(a){var z,y,x
for(z=this.a,y=a.a,x=0;x<16;++x)z[x]=y[x]},
fL:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[8]
p=z[9]
o=z[10]
n=z[11]
m=z[12]
l=z[13]
k=z[14]
j=z[15]
i=a.a
h=i[0]
g=i[1]
f=i[2]
e=i[3]
z[0]=h*y+g*u+f*q+e*m
z[1]=h*x+g*t+f*p+e*l
z[2]=h*w+g*s+f*o+e*k
z[3]=h*v+g*r+f*n+e*j
h=i[4]
g=i[5]
f=i[6]
e=i[7]
z[4]=h*y+g*u+f*q+e*m
z[5]=h*x+g*t+f*p+e*l
z[6]=h*w+g*s+f*o+e*k
z[7]=h*v+g*r+f*n+e*j
h=i[8]
g=i[9]
f=i[10]
e=i[11]
z[8]=h*y+g*u+f*q+e*m
z[9]=h*x+g*t+f*p+e*l
z[10]=h*w+g*s+f*o+e*k
z[11]=h*v+g*r+f*n+e*j
h=i[12]
g=i[13]
f=i[14]
e=i[15]
z[12]=h*y+g*u+f*q+e*m
z[13]=h*x+g*t+f*p+e*l
z[14]=h*w+g*s+f*o+e*k
z[15]=h*v+g*r+f*n+e*j},
fG:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=this.b
y=a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=b.a
u=v.length
if(0>=u)return H.a(v,0)
t=w-v[0]
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=u)return H.a(v,1)
s=w-v[1]
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=u)return H.a(v,2)
r=y-v[2]
q=Math.sqrt(t*t+s*s+r*r)
y=z.a
x=y.length
if(q===0){if(0>=x)return H.a(y,0)
y[0]=0
if(1>=x)return H.a(y,1)
y[1]=0
if(2>=x)return H.a(y,2)
y[2]=0}else{q=1/q
if(0>=x)return H.a(y,0)
y[0]=t*q
if(1>=x)return H.a(y,1)
y[1]=s*q
if(2>=x)return H.a(y,2)
y[2]=r*q}y=this.d
y.ao(c,z)
y.ag(0)
x=this.c
x.ao(z,y)
w=this.a
y=y.a
v=y.length
if(0>=v)return H.a(y,0)
w[0]=y[0]
x=x.a
u=x.length
if(0>=u)return H.a(x,0)
w[1]=x[0]
z=z.a
p=z.length
if(0>=p)return H.a(z,0)
w[2]=z[0]
w[3]=0
if(1>=v)return H.a(y,1)
w[4]=y[1]
if(1>=u)return H.a(x,1)
w[5]=x[1]
if(1>=p)return H.a(z,1)
w[6]=z[1]
w[7]=0
if(2>=v)return H.a(y,2)
w[8]=y[2]
if(2>=u)return H.a(x,2)
w[9]=x[2]
if(2>=p)return H.a(z,2)
w[10]=z[2]
w[11]=0
w[15]=1},
l:function(a){return P.bk(this.a,"[","]")}},o:{"^":"f;R:a<,b,c",
gn:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
gp:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
bY:function(a,b,c,d){var z,y,x,w,v
z=J.y(b)
y=this.a
x=y.length
if(!!z.$iso){z=b.a
w=z.length
if(0>=w)return H.a(z,0)
v=z[0]
if(0>=x)return H.a(y,0)
y[0]=v
if(1>=w)return H.a(z,1)
v=z[1]
if(1>=x)return H.a(y,1)
y[1]=v
if(2>=w)return H.a(z,2)
z=z[2]
if(2>=x)return H.a(y,2)
y[2]=z}else{z=z.i(b)
if(0>=x)return H.a(y,0)
y[0]=z
z=this.a
y=J.aF(c)
if(1>=z.length)return H.a(z,1)
z[1]=y
y=this.a
z=J.aF(d)
if(2>=y.length)return H.a(y,2)
y[2]=z}return this},
m:function(a,b){return this.bY(a,b,null,null)},
K:function(a,b){var z,y,x,w,v
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
z[0]=x+w[0]
if(1>=y)return H.a(z,1)
x=z[1]
if(1>=v)return H.a(w,1)
z[1]=x+w[1]
if(2>=y)return H.a(z,2)
y=z[2]
if(2>=v)return H.a(w,2)
z[2]=y+w[2]
return this},
Y:function(a,b){var z,y,x,w
z=this.a
if(0>=z.length)return H.a(z,0)
y=z[0]
x=J.A(b)
w=x.h(b,0)
if(typeof w!=="number")return H.n(w)
z[0]=y-w
w=this.a
if(1>=w.length)return H.a(w,1)
y=w[1]
z=x.h(b,1)
if(typeof z!=="number")return H.n(z)
w[1]=y-z
z=this.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=x.h(b,2)
if(typeof x!=="number")return H.n(x)
z[2]=y-x
return this},
C:function(a,b){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.n(b)
z[0]=x*b
if(1>=y)return H.a(z,1)
z[1]=z[1]*b
if(2>=y)return H.a(z,2)
z[2]=z[2]*b
return this},
cF:function(a,b){var z,y,x,w,v
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=a.a
v=w.length
if(0>=v)return H.a(w,0)
z[0]=x+w[0]*b
if(1>=y)return H.a(z,1)
x=z[1]
if(1>=v)return H.a(w,1)
z[1]=x+w[1]*b
if(2>=y)return H.a(z,2)
y=z[2]
if(2>=v)return H.a(w,2)
z[2]=y+w[2]*b
return this},
ag:function(a){var z,y,x,w,v,u
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
u=Math.sqrt(x*x+w*w+v*v)
if(u===0){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=0
if(1>=y)return H.a(z,1)
z[1]=0
if(2>=y)return H.a(z,2)
z[2]=0}else{z=this.a
y=z.length
if(u===1){if(0>=y)return H.a(z,0)
z[0]=x
if(1>=y)return H.a(z,1)
z[1]=w
if(2>=y)return H.a(z,2)
z[2]=v}else{u=1/u
if(0>=y)return H.a(z,0)
z[0]=x*u
if(1>=y)return H.a(z,1)
z[1]=w*u
if(2>=y)return H.a(z,2)
z[2]=v*u}}return this},
ao:function(a,b){var z,y,x,w,v,u,t,s
z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
z=b.a
y=z.length
if(0>=y)return H.a(z,0)
u=z[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(2>=y)return H.a(z,2)
s=z[2]
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=w*s-v*t
if(1>=y)return H.a(z,1)
z[1]=v*u-x*s
if(2>=y)return H.a(z,2)
z[2]=x*t-w*u
return this},
L:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=a.a
v=w.length
if(0>=v)return H.a(w,0)
u=w[0]
if(1>=y)return H.a(z,1)
t=z[1]
if(1>=v)return H.a(w,1)
s=w[1]
if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
return x*u+t*s+z*w[2]},
ab:function(a){var z,y,x,w,v,u
z=J.A(a)
y=z.h(a,0)
x=this.a
if(0>=x.length)return H.a(x,0)
w=J.J(y,x[0])
x=z.h(a,1)
y=this.a
if(1>=y.length)return H.a(y,1)
v=J.J(x,y[1])
z=z.h(a,2)
y=this.a
if(2>=y.length)return H.a(y,2)
u=J.J(z,y[2])
return Math.sqrt(H.fw(J.F(J.F(J.ab(w,w),J.ab(v,v)),J.ab(u,u))))},
ad:function(){var z,y,x,w,v
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
return x*x+w*w+v*v},
hd:[function(a){return Math.sqrt(this.ad())},"$0","gk",0,0,22],
l:function(a){return P.bk(this.a,"[","]")},
ek:function(a){var z,y,x,w
z=H.M(3)
y=new Float32Array(z)
this.a=y
x=J.A(a)
w=x.h(a,0)
if(0>=z)return H.a(y,0)
y[0]=w
w=this.a
y=x.h(a,1)
if(1>=w.length)return H.a(w,1)
w[1]=y
y=this.a
x=x.h(a,2)
if(2>=y.length)return H.a(y,2)
y[2]=x},
ej:function(a){var z,y,x,w
z=H.M(3)
y=new Float32Array(z)
this.a=y
x=a.length
if(0>=x)return H.a(a,0)
w=a[0]
if(0>=z)return H.a(y,0)
y[0]=w
if(1>=x)return H.a(a,1)
w=a[1]
if(1>=z)return H.a(y,1)
y[1]=w
if(2>=x)return H.a(a,2)
x=a[2]
if(2>=z)return H.a(y,2)
y[2]=x},
ei:function(a,b,c){var z,y,x
z=H.M(3)
y=new Float32Array(z)
this.a=y
x=J.aF(a)
if(0>=z)return H.a(y,0)
y[0]=x
x=this.a
y=J.aF(b)
if(1>=x.length)return H.a(x,1)
x[1]=y
y=this.a
x=J.aF(c)
if(2>=y.length)return H.a(y,2)
y[2]=x},
q:{
bq:function(a){var z=new Q.o(null,null,H.h(new Array(4),[P.u]))
z.ej(a)
return z},
br:function(a){var z=new Q.o(null,null,H.h(new Array(4),[P.u]))
z.ek(a)
return z},
k:function(a,b,c){var z=new Q.o(null,null,H.h(new Array(4),[P.u]))
z.ei(a,b,c)
return z}}}}],["","",,X,{"^":"",
pI:[function(){var z,y,x,w,v,u,t,s,r,q,p
$.fO=!0
z=new B.df("Sobel",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"","","","")
z.b="  precision mediump float;\r\n  attribute vec3 aVertexPosition;\r\n  attribute vec2 aTextureCoord;\r\n  \r\n  uniform mat4 uMVMatrix;\r\n  uniform mat4 uPMatrix;\r\n  \r\n  varying vec2 vTextureCoord;\r\n  \r\n  void main(void) {\r\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\r\n    vTextureCoord = aTextureCoord;\r\n  }\r\n  "
z.c="  precision mediump float;\r\n  \r\n  varying vec2 vTextureCoord;\r\n  uniform sampler2D colorSampler;\r\n  \r\n  uniform float cameraNear;\r\n  uniform float cameraFar;\r\n  uniform vec2 size;\r\n\r\n  float lum(vec4 c) {\r\n    return dot(c.xyz, vec3(0.3, 0.59, 0.11));\r\n  }\r\n\r\n  float sobel() {\r\n      vec2 imageIncrement = vec2(1.0/size.x,1.0/size.y);\r\n      float t00 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2(-1, -1)));\r\n      float t10 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 0, -1)));\r\n      float t20 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 1, -1)));\r\n      float t01 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2(-1,  0)));\r\n      float t21 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 1,  0)));\r\n      float t02 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2(-1,  1)));\r\n      float t12 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 0,  1)));\r\n      float t22 = lum(texture2D(colorSampler, vTextureCoord + imageIncrement * vec2( 1,  1)));\r\n      vec2 grad;\r\n      grad.x = t00 + 2.0 * t01 + t02 - t20 - 2.0 * t21 - t22;\r\n      grad.y = t00 + 2.0 * t10 + t20 - t02 - 2.0 * t12 - t22;\r\n      return length(grad);\r\n  } \r\n\r\n  void main(void) {\r\n      float len = sobel();\r\n      gl_FragColor = vec4(len, len, len, 1.0); // \r\n  }\r\n  "
z.d="aVertexPosition"
z.f="aTextureCoord"
z.z="uMVMatrix"
z.ch="uPMatrix"
z.cx="colorSampler"
z.dy="cameraNear"
z.fr="cameraFar"
z.fx="size"
$.aC=B.hT("#webgl-canvas",2520,z,0.1,!1,!1)
z=new B.df("Color",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"","","","")
z.d="aVertexPosition"
z.e="aColor"
z.z="uMVMatrix"
z.ch="uPMatrix"
z.k3="gl_FragColor = vec4( vaColor, 1.0 );"
z=B.fy(z)
y=$.aC.cW(0,z)
x=$.aC.y
$.dv=x
x.a8(0,0,6)
x=$.dv
w=Q.k(1,0,6)
v=Q.k(0,0,1)
x.a.fG(x.aj(),w,v)
u=X.jT($.dv)
$.aC.d.j(0,"fpscam",u)
v=$.aC
t=v.z
v=v.x
$.cH=v
w=v.c
s=new B.bT(null,W.eg(null,null,null),!1,!1,!1,3553,H.h([],[B.bT]))
s.a=J.cJ(w)
s.c=!0
w=v.b.z
w.toString
r=document.createElement("canvas")
r.width=2
r.height=2
q=C.q.bQ(r,"2d")
J.ho(q,"rgba(255,0,0,255)")
q.fillRect(0,0,r.width,r.height)
p=J.cJ(w.b)
J.bF(w.b,3553,p)
J.dL(w.b,37440,1)
J.cQ(w.b,3553,0,6408,6408,5121,r)
J.c4(w.b,3553,10241,9729)
J.c4(w.b,3553,10240,9729)
J.bF(w.b,3553,null)
s.a=p
v.a.j(0,"red",s)
C.c.I(["nx","px","nz","pz","ny","py"],new X.mF())
$.$get$aO().aV("data/jump1.wav","jump")
$.$get$aO().aV("data/jumppad.wav","jumppad")
$.$get$aO().aV("data/railgf1a.wav","rail")
$.$get$aO().aV("data/gibsplt1.wav","gibsplt")
$.cH.fE(new X.mG(y,u,t))},"$0","fC",0,0,2],
lV:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=$.aC.f.r2
w=z.length
v=0
while(!0){if(!(v<w)){y=null
x=!1
break}u=z[v]
if("laser"===u.r&&!u.x){H.bE(u,"$isen")
y=u
x=!0
break}++v}if(x){y.x=!0
y.a.U()}else{t=B.d7(B.mi(0.1,30,20),!1,$.cH.a.h(0,"red").ga6(),null,null)
t.a.aB(0,1.5707963267948966,t.as())
w=Q.k(0,0,0)
u=Q.k(0,0,0)
s=Q.k(0,0,0)
r=Q.k(0,0,0)
q=Q.k(0,0,0)
p=H.h([],[B.b1])
o=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
o.U()
n=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
n.U()
m=new Float32Array(H.M(9))
l=new Float32Array(H.M(9))
k=Q.k(0,0,0)
j=Q.k(0,0,0)
i=new Q.az(new Float32Array(H.M(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
i.U()
y=new X.en(0,w,u,s,r,q,"","",!0,!1,p,o,n,null,new Q.ce(m),new Q.ce(l),k,j,i,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
p.push(t)
y.r="laser"
y.y=!0}y.fr=1e4
w=y.a
w.aI(a.a)
u=-b
s=$.bn
r=w.a
if(s>=16)return H.a(r,s)
q=r[s]
p=$.eu
if(p>=16)return H.a(r,p)
r[s]=C.a.i(q+r[p]*u)
p=$.bo
r=w.a
if(p>=16)return H.a(r,p)
q=r[p]
s=$.ev
if(s>=16)return H.a(r,s)
r[p]=C.a.i(q+r[s]*u)
s=$.bp
r=w.a
if(s>=16)return H.a(r,s)
q=r[s]
p=$.ew
if(p>=16)return H.a(r,p)
r[s]=C.a.i(q+r[p]*u)
u=$.bn
p=w.a
if(u>=16)return H.a(p,u)
r=p[u]
q=$.ex
if(q>=16)return H.a(p,q)
p[u]=C.a.i(r+p[q]*c)
q=$.bo
p=w.a
if(q>=16)return H.a(p,q)
r=p[q]
u=$.ey
if(u>=16)return H.a(p,u)
p[q]=C.a.i(r+p[u]*c)
u=$.bp
p=w.a
if(u>=16)return H.a(p,u)
r=p[u]
q=$.ez
if(q>=16)return H.a(p,q)
p[u]=C.a.i(r+p[q]*c)
w.aB(0,-($.fH*0.0012),y.as())
w.aB(0,-(-$.fG*0.0009),y.dQ())
if(!x)$.aC.f.r2.push(y)},
n_:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.h([],[P.v])
z.push("flareShader")
z.push("textures/skies/blacksky")
z.push("textures/sfx/beam")
z.push("models/mapobjects/spotlamp/beam")
z.push("models/mapobjects/lamps/flare03")
z.push("models/mapobjects/teleporter/energy")
z.push("models/mapobjects/spotlamp/spotlamp")
z.push("models/mapobjects/spotlamp/spotlamp_l")
z.push("models/mapobjects/lamps/bot_lamp")
z.push("models/mapobjects/lamps/bot_lamp2")
z.push("models/mapobjects/lamps/bot_flare")
z.push("models/mapobjects/lamps/bot_flare2")
z.push("models/mapobjects/lamps/bot_wing")
y=H.h([],[P.q])
for(x=a.length,w=0;w<x;++w){v=a[w]
u=v.a
if(u>=b.length)return H.a(b,u)
if(C.c.au(z,b[u].a))continue
for(t=0;t<v.r;++t){u=v.d
s=v.f+t
if(s>=c.length)return H.a(c,s)
y.push(u+c[s])}}return y},
m2:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=[P.v]
y=H.h([],z)
y.push("textures/base_wall/c_met5_2")
y.push("textures/base_trim/border11b")
y.push("textures/base_trim/border11light")
y.push("textures/base_light/lt2_2000")
y.push("textures/base_light/lt2_8000")
y.push("textures/base_light/baslt4_1_4k")
y.push("textures/base_wall/metaltech12final")
y.push("textures/base_light/light5_5k")
y.push("textures/base_wall/main_q3abanner")
y.push("textures/base_support/cable")
y.push("models/mapobjects/kmlamp1")
y.push("models/mapobjects/kmlamp_white")
y.push("models/mapobjects/teleporter/teleporter")
y.push("textures/base_trim/pewter_shiney")
x=H.h([],z)
for(z=a.length,w=0;w<z;++w){v=a[w]
u=v.a
t=c.length
if(u>=t)return H.a(c,u)
if(C.c.au(y,c[u].a))for(u=v.r,t=v.d,s=v.f,r=0;r<u;++r){q=s+r
if(q>=b.length)return H.a(b,q)
p=t+b[q]
if(p>=d.length)return H.a(d,p)
q=d[p].e
if(2>=q.length)return H.a(q,2)
q[2]=1}else{u=v.a
if(u>=t)return H.a(c,u)
if(C.c.au(x,c[u].a))for(u=v.r,t=v.d,s=v.f,r=0;r<u;++r){q=s+r
if(q>=b.length)return H.a(b,q)
p=t+b[q]
if(p>=d.length)return H.a(d,p)
q=d[p].e
if(0>=q.length)return H.a(q,0)
q[0]=1}else{u=v.a
if(u>=t)return H.a(c,u)
if(c[u].a==="textures/base_floor/diamond2c")for(u=v.r,t=v.d,s=v.f,r=0;r<u;++r){q=s+r
if(q>=b.length)return H.a(b,q)
p=t+b[q]
if(p>=d.length)return H.a(d,p)
q=d[p]
o=q.a
if(2>=o.length)return H.a(o,2)
n=o[2]
if(n>=95&&n<=108){q=q.e
if(0>=q.length)return H.a(q,0)
q[0]=0.25
q=d[p].e
if(1>=q.length)return H.a(q,1)
q[1]=0.25
q=d[p].e
if(2>=q.length)return H.a(q,2)
q[2]=1}}else for(u=v.r,t=v.d,s=v.f,r=0;r<u;++r){q=s+r
if(q>=b.length)return H.a(b,q)
p=t+b[q]
if(p>=d.length)return H.a(d,p)
q=d[p].e
if(0>=q.length)return H.a(q,0)
q[0]=q[0]*0.5
q=d[p].e
if(1>=q.length)return H.a(q,1)
q[1]=q[1]*0.5
q=d[p].e
if(2>=q.length)return H.a(q,2)
q[2]=q[2]*0.5}}}}},
jS:{"^":"dS;b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,a",
dr:function(){var z,y,x,w,v
z=this.Q.a.go
y=this.dy.fM(z.length)
if(y<0||y>=z.length)return H.a(z,y)
y=J.dO(z[y]," ")
x=new H.cd(y,P.mh(),[H.aL(y,0),null]).b_(0,!1)
y=x.length
if(0>=y)return H.a(x,0)
w=x[0]
if(1>=y)return H.a(x,1)
v=x[1]
if(2>=y)return H.a(x,2)
this.e.bY(0,w,v,x[2])
v=this.b.a
v.U()
v.bF(-1.5707963267948966)
if(3>=x.length)return H.a(x,3)
w=J.F(J.I(x[3]),90)
if(typeof w!=="number")return H.n(w)
v.bH(3.141592653589793*w/180)
w=this.d.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=w[0]*0
if(1>=v)return H.a(w,1)
w[1]=w[1]*0
if(2>=v)return H.a(w,2)
w[2]=w[2]*0},
cP:function(a){var z,y,x,w,v,u,t,s
z=this.db
y=this.e
x=z.m(0,y)
w=this.fx
x=x.a
v=x.length
if(0>=v)return H.a(x,0)
u=x[0]
w=w.a
t=w.length
if(0>=t)return H.a(w,0)
x[0]=u+w[0]
if(1>=v)return H.a(x,1)
u=x[1]
if(1>=t)return H.a(w,1)
x[1]=u+w[1]
if(2>=v)return H.a(x,2)
v=x[2]
if(2>=t)return H.a(w,2)
x[2]=v+w[2]
w=this.dx
y=w.m(0,y)
v=this.fy
y=y.a
x=y.length
if(0>=x)return H.a(y,0)
t=y[0]
v=v.a
u=v.length
if(0>=u)return H.a(v,0)
y[0]=t+v[0]
if(1>=x)return H.a(y,1)
t=y[1]
if(1>=u)return H.a(v,1)
y[1]=t+v[1]
if(2>=x)return H.a(y,2)
x=y[2]
if(2>=u)return H.a(v,2)
y[2]=x+v[2]
v=[P.u]
x=new Q.o(null,null,H.h(new Array(4),v))
y=new Float32Array(3)
x.a=y
y[0]=C.b.i(0)
y[1]=C.b.i(0)
y[2]=C.b.i(0)
y=new B.ci(null,null,null,null)
v=new Q.o(null,null,H.h(new Array(4),v))
u=new Float32Array(3)
v.a=u
u[0]=C.b.i(0)
u[1]=C.b.i(0)
u[2]=C.b.i(0)
y.a=v
y.b=0
v=v.a
u=v.length
if(0>=u)return H.a(v,0)
if(v[0]===1)u=0
else{if(1>=u)return H.a(v,1)
if(v[1]===1)u=1
else{if(2>=u)return H.a(v,2)
u=v[2]===1?2:3}}y.c=u
y.d=B.c2(v)
s=new X.bU(!1,!1,1,x,y,null,null,null)
y=this.Q
x=$.$get$db()
y.fW(s,x,x,z,w,a,x,-1)
return s.b},
a2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=$.$get$cz()
$.$get$by()
y=this.c
y.C(0,0)
if(z.h(0,$.jr)!=null)y.Y(0,this.b.b2())
if(z.h(0,$.jo)!=null)y.Y(0,this.b.as())
if(z.h(0,$.jq)!=null)y.K(0,this.b.b2())
if(z.h(0,$.jp)!=null)y.K(0,this.b.as())
x=y.a
if(2>=x.length)return H.a(x,2)
x[2]=0
x=this.e
w=this.b
x.m(0,w.aj()).C(0,100)
if(z.h(0,$.el)!=null){this.dr()
z.j(0,$.el,null)}if(z.h(0,$.em)!=null){this.dc(!1)
z.j(0,$.em,null)}for(v=this.Q.a.fx,v=v.gaq(v),v=v.gE(v),u=this.d,t=[P.u];v.v();){s=v.gw()
r=H.eL(J.dP(s,1),null,null)
if(this.cP(r)){this.dc(!0)
q=this.Q.a.fx.h(0,s)
p=J.dO(this.Q.a.fy.h(0,q)," ")
o=this.Q.a.x
if(r>>>0!==r||r>=o.length)return H.a(o,r)
n=o[r]
if(0>=p.length)return H.a(p,0)
o=H.ck(p[0],null)
if(1>=p.length)return H.a(p,1)
m=H.ck(p[1],null)
if(2>=p.length)return H.a(p,2)
l=H.ck(p[2],null)
k=new Q.o(null,null,H.h(new Array(4),t))
j=new Float32Array(3)
k.a=j
j[0]=J.aF(o)
j[1]=J.aF(m)
j[2]=J.aF(l)
i=Q.br(n.a)
l=n.b
m=i.a
o=m.length
if(0>=o)return H.a(m,0)
h=m[0]
l=l.a
g=l.length
if(0>=g)return H.a(l,0)
m[0]=h+l[0]
if(1>=o)return H.a(m,1)
h=m[1]
if(1>=g)return H.a(l,1)
m[1]=h+l[1]
if(2>=o)return H.a(m,2)
o=m[2]
if(2>=g)return H.a(l,2)
m[2]=o+l[2]
m[0]=m[0]*0.5
m[1]=m[1]*0.5
m[2]=m[2]*0.5
f=Math.sqrt((j[2]-m[2])/400)
e=Q.br(k)
m=e.a
if(0>=m.length)return H.a(m,0)
m[0]=m[0]-i.h(0,0)
m=e.a
if(1>=m.length)return H.a(m,1)
m[1]=m[1]-i.h(0,1)
m=e.a
if(2>=m.length)return H.a(m,2)
m[2]=m[2]-i.h(0,2)
m=e.a
if(2>=m.length)return H.a(m,2)
m[2]=0
d=Math.sqrt(e.ad())
e.ag(0)
c=d/f
m=e.a
j=m.length
if(0>=j)return H.a(m,0)
m[0]=m[0]*c
if(1>=j)return H.a(m,1)
m[1]=m[1]*c
if(2>=j)return H.a(m,2)
m[2]=m[2]*c
m[2]=f*800
m[0]=m[0]*0.161
m[1]=m[1]*0.161
m[2]=m[2]*0.161
u.m(0,e)
$.$get$aO().bC("jumppad",!0)}}for(v=this.Q.a.id,v=v.gaq(v),v=v.gE(v);v.v();)if(this.cP(H.eL(J.dP(v.gw(),1),null,null))){$.$get$aO().bC("gibsplt",!0)
this.dr()}$.c1=0.125
this.dR()
y.ag(0)
if(this.f)this.h0(y)
else{this.cC(y,Math.sqrt(y.ad())*$.fK,$.mT)
this.c2(!0)}y=x.C(0,0.01)
x=w.a
v=$.bn
u=y.a
if(0>=u.length)return H.a(u,0)
u=u[0]
t=x.a
u=C.a.i(u)
if(v>=16)return H.a(t,v)
t[v]=u
u=$.bo
v=y.a
if(1>=v.length)return H.a(v,1)
v=v[1]
t=x.a
v=C.a.i(v)
if(u>=16)return H.a(t,u)
t[u]=v
v=$.bp
y=y.a
if(2>=y.length)return H.a(y,2)
y=y[2]
u=x.a
y=C.a.i(y)
if(v>=16)return H.a(u,v)
u[v]=y
y=this.cy
if(y!==0)x.aB(0,y*0.006,w.as())
y=this.cx
if(y!==0)x.aB(0,y*0.006,this.ch)
this.cx=0
this.cy=0},
fh:function(){var z,y,x
if(!this.f)return
z=this.d
y=Math.sqrt(z.ad())
x=y-Math.max(y,$.mZ)*$.mU*$.c1
if(x<0)x=0
if(y!==0)z.C(0,x/y)
else z.C(0,0)},
dR:function(){var z,y,x,w,v,u,t
z=this.go
y=this.e
x=y.a
w=x.length
if(0>=w)return H.a(x,0)
v=x[0]
u=z.a
t=u.length
if(0>=t)return H.a(u,0)
u[0]=v
if(1>=w)return H.a(x,1)
v=x[1]
if(1>=t)return H.a(u,1)
u[1]=v
if(2>=w)return H.a(x,2)
x=x[2]
if(2>=t)return H.a(u,2)
u[2]=x-0.25
x=this.r
this.Q.aE(x,y,z,this.fx,this.fy)
if(x.c===1){this.f=!1
return}z=this.d
y=z.a
if(2>=y.length)return H.a(y,2)
if(y[2]>0&&z.L(x.e.a)>10){this.f=!1
return}z=x.e.a.a
if(2>=z.length)return H.a(z,2)
if(z[2]<0.7){this.f=!1
return}this.f=!0},
a9:function(a,b,c){var z,y,x,w,v
z=a.L(b)
y=$.mX
z=z<0?z*y:z/y
y=c.m(0,a)
x=this.id.m(0,b)
w=x.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=w[0]*z
if(1>=v)return H.a(w,1)
w[1]=w[1]*z
if(2>=v)return H.a(w,2)
w[2]=w[2]*z
w=y.a
if(0>=w.length)return H.a(w,0)
w[0]=w[0]-x.h(0,0)
w=y.a
if(1>=w.length)return H.a(w,1)
w[1]=w[1]-x.h(0,1)
w=y.a
if(2>=w.length)return H.a(w,2)
w[2]=w[2]-x.h(0,2)
return y},
cC:function(a,b,c){var z,y,x
z=this.d
y=b-z.L(a)
if(y<=0)return
x=c*$.c1*b
z.cF(a,x>y?y:x)},
dc:function(a){var z,y,x,w,v,u
if(!this.f)return!1
this.f=!1
z=$.mW
y=this.d.a
if(2>=y.length)return H.a(y,2)
y[2]=z
z=this.e
y=this.r
x=z.L(y.e.a)
y=y.e
w=y.b
if(typeof w!=="number")return H.n(w)
v=$.mY
u=this.k1
u.m(0,y.a)
v=x-w-v+5
u=u.a
w=u.length
if(0>=w)return H.a(u,0)
u[0]=u[0]*v
if(1>=w)return H.a(u,1)
u[1]=u[1]*v
if(2>=w)return H.a(u,2)
u[2]=u[2]*v
z=z.a
v=z.length
if(0>=v)return H.a(z,0)
z[0]=z[0]+u[0]
if(1>=v)return H.a(z,1)
z[1]=z[1]+u[1]
if(2>=v)return H.a(z,2)
z[2]=z[2]+u[2]
if(!a)$.$get$aO().dm("jump")
return!0},
h0:function(a){var z,y
this.fh()
this.cC(a,Math.sqrt(a.ad())*$.fK,$.mS)
z=this.d
this.a9(z,this.r.e.a,z)
z=z.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]===0){if(1>=y)return H.a(z,1)
z=z[1]===0}else z=!1
if(z)return
this.c2(!1)},
c1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=H.h([],[Q.o])
if(a){y=this.k2
x=this.d
y.m(0,x)
y=y.a
if(2>=y.length)return H.a(y,2)
y[2]=y[2]-$.mV*$.c1
w=x.a
if(2>=w.length)return H.a(w,2)
w[2]=(w[2]+y[2])*0.5
y=this.r.e
if(y!=null)this.a9(x,y.a,x)}y=this.r.e
if(y!=null)z.push(y.a)
y=this.d
z.push(Q.bq(y.a).ag(0))
v=$.c1
u=Q.k(0,0,0)
for(x=this.x,w=[P.u],t=this.e,s=x.d,r=this.k3,q=this.k2,p=this.k4,o=0;o<4;++o){u.m(0,t)
u.cF(y,v)
this.Q.aE(x,t,u,this.fx,this.fy)
if(x.a){x=y.a
if(2>=x.length)return H.a(x,2)
x[2]=0
return!0}n=x.c
if(typeof n!=="number")return n.S()
if(n>0)t.m(0,s)
n=x.c
if(n===1)break
if(typeof n!=="number")return H.n(n)
v-=v*n
n=new Q.o(null,null,H.h(new Array(4),w))
m=new Float32Array(3)
n.a=m
m[0]=C.b.i(0)
m[1]=C.b.i(0)
m[2]=C.b.i(0)
z.push(n.m(0,x.e.a))
for(l=0;l<z.length;++l){if(y.L(z[l])>=0.1)continue
if(l>=z.length)return H.a(z,l)
this.a9(y,z[l],r)
if(l>=z.length)return H.a(z,l)
this.a9(q,z[l],p)
for(k=0;k<z.length;++k){if(k===l)continue
if(r.L(z[k])>=0.1)continue
if(k>=z.length)return H.a(z,k)
this.a9(r,z[k],r)
if(k>=z.length)return H.a(z,k)
this.a9(p,z[k],p)
if(l>=z.length)return H.a(z,l)
if(r.L(z[l])>=0)continue
j=new Q.o(null,null,H.h(new Array(4),w))
n=new Float32Array(3)
j.a=n
n[0]=C.b.i(0)
n[1]=C.b.i(0)
n[2]=C.b.i(0)
n=z.length
if(l>=n)return H.a(z,l)
m=z[l]
if(k>=n)return H.a(z,k)
j.ao(m,z[k])
j.ag(0)
i=j.L(y)
r.m(0,j)
m=r.a
n=m.length
if(0>=n)return H.a(m,0)
m[0]=m[0]*i
if(1>=n)return H.a(m,1)
m[1]=m[1]*i
if(2>=n)return H.a(m,2)
m[2]=m[2]*i
m=z.length
if(l>=m)return H.a(z,l)
n=z[l]
if(k>=m)return H.a(z,k)
j.ao(n,z[k])
j.ag(0)
i=j.L(q)
p.m(0,j)
n=p.a
m=n.length
if(0>=m)return H.a(n,0)
n[0]=n[0]*i
if(1>=m)return H.a(n,1)
n[1]=n[1]*i
if(2>=m)return H.a(n,2)
n[2]=n[2]*i
for(h=0;h<z.length;++h){if(h===l||h===k)continue
if(r.L(z[h])>=0.1)continue
x=y.a
w=x.length
if(0>=w)return H.a(x,0)
x[0]=x[0]*0
if(1>=w)return H.a(x,1)
x[1]=x[1]*0
if(2>=w)return H.a(x,2)
x[2]=x[2]*0
return!0}}y.m(0,r)
q.m(0,p)
break}}if(a)y.m(0,q)
return o!==0},
c2:function(a){var z,y,x,w,v,u,t,s
z=this.r1
y=this.e
z.m(0,y)
x=this.r2
w=this.d
x.m(0,w)
if(!this.c1(a))return
v=this.x2
v.m(0,z)
u=v.a
if(2>=u.length)return H.a(u,2)
u[2]=u[2]-$.eO
u=this.y
this.Q.aE(u,z,v,this.fx,this.fy)
t=this.x1
t.m(0,this.ch)
s=w.a
if(2>=s.length)return H.a(s,2)
if(s[2]>0)s=u.c===1||u.e.a.L(t)<0.7
else s=!1
if(s)return
this.rx.m(0,y)
this.ry.m(0,w)
t.m(0,z)
s=t.a
if(2>=s.length)return H.a(s,2)
s[2]=s[2]+$.eO
this.Q.aE(u,z,t,this.fx,this.fy)
if(u.a)return
t=u.d
s=t.a
if(2>=s.length)return H.a(s,2)
s=s[2]
z=z.a
if(2>=z.length)return H.a(z,2)
z=z[2]
y.m(0,t)
w.m(0,x)
this.c1(a)
v.m(0,y)
x=v.a
if(2>=x.length)return H.a(x,2)
x[2]=x[2]-(s-z)
this.Q.aE(u,y,v,this.fx,this.fy)
if(!u.a)y.m(0,t)
z=u.c
if(typeof z!=="number")return z.P()
if(z<1)this.a9(w,u.e.a,w)},
ed:function(a){var z,y
z=document.body
z.toString
y=W.aA
W.ae(z,"mousedown",new X.jU(this,z),!1,y)
W.ae(z,"mousemove",new X.jV(this),!1,y)},
q:{
jT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=Q.k(0,0,0)
y=Q.k(0,0,0)
x=Q.k(0,0,0)
w=Q.k(0,0,0)
v=B.bR(null,null)
u=Q.k(0,0,0)
t=B.bR(null,null)
s=Q.k(0,0,0)
r=B.bR(null,null)
q=Q.k(0,0,0)
p=Q.k(0,0,1)
o=Q.k(0,0,0)
n=Q.k(0,0,0)
z=new X.jS(a,z,y,x,!1,new X.bU(!1,!1,1,w,v,null,null,null),new X.bU(!1,!1,1,u,t,null,null,null),new X.bU(!1,!1,1,s,r,null,null,null),q,null,p,0,0,o,n,C.p,null,Q.k(-15,-15,-24),Q.k(15,15,32),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,1),Q.k(0,0,0),!0)
z.ed(a)
return z}}},
jU:{"^":"l:3;a,b",
$1:function(a){var z
J.cO(a)
z=this.b
if(document.pointerLockElement!==z){z.requestPointerLock()
z.requestFullscreen()}else{$.$get$aO().dm("rail")
X.lV(this.a.b,0,-0.2)}}},
jV:{"^":"l:3;a",
$1:function(a){var z,y,x
z=J.p(a)
z.dn(a)
y=this.a
x=y.cx
z=z.gfK(a).a
if(typeof z!=="number")return H.n(z)
y.cx=x+z
z=y.cy
x=a.movementY
if(typeof x!=="number")return H.n(x)
y.cy=z+x}},
mF:{"^":"l:0;",
$1:function(a){return $.cH.K(0,"textures/skybox_"+H.m(a)+".png")}},
mG:{"^":"l:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c
y=z.c.a.h(0,"textures/skybox_nx.png").ga6()
x=z.c.a.h(0,"textures/skybox_px.png").ga6()
w=z.c.a.h(0,"textures/skybox_nz.png").ga6()
v=z.c.a.h(0,"textures/skybox_pz.png").ga6()
u=z.c.a.h(0,"textures/skybox_ny.png").ga6()
t=z.c.a.h(0,"textures/skybox_py.png").ga6()
s=z.an(y,1004)
s.a8(-2,2,-1000)
r=z.a
r.f.r1.push(s)
q=z.an(x,1004)
q.a8(-2,2,1000)
q.a.bG(3.141592653589793)
r.f.r1.push(q)
p=z.an(w,1004)
p.a8(-1000,2,-2)
p.a.bG(1.5707963267948966)
r.f.r1.push(p)
o=z.an(v,1004)
o.a8(1000,2,-2)
o.a.bG(4.71238898038469)
r.f.r1.push(o)
n=z.an(u,1004)
n.a8(-2,-1000,-2)
m=n.a
m.bF(4.71238898038469)
m.bH(4.71238898038469)
r.f.r1.push(n)
l=z.an(t,1004)
l.a8(-2,1000,-2)
z=l.a
z.bF(1.5707963267948966)
z.bH(1.5707963267948966)
r.f.r1.push(l)
$.aC.z.fF("data/q3dm17.bsp",!0).aC(new X.mE(this.a,this.b))}},
mE:{"^":"l:23;a,b",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=new B.hB(null,null,null)
z.a=J.h_(a,0,36)
z.b=a
y=z.dK()
X.m2(y.cy,y.ch,y.b,y.Q)
x=[P.u]
w=H.h([],x)
v=H.h([],x)
u=H.h([],x)
t=H.h([],x)
s=H.h([],x)
for(x=y.Q,r=x.length,q=0;q<x.length;x.length===r||(0,H.aD)(x),++q){p=x[q]
C.c.H(w,p.a)
C.c.H(v,p.d)
o=p.b
if(0>=o.length)return H.a(o,0)
u.push(o[0])
o=p.b
if(1>=o.length)return H.a(o,1)
u.push(o[1])
o=p.c
if(0>=o.length)return H.a(o,0)
t.push(o[0])
o=p.c
if(1>=o.length)return H.a(o,1)
t.push(o[1])
C.c.H(s,p.e)}n=new Uint16Array(H.aU(X.n_(y.cy,y.b,y.ch)))
m=new Float32Array(H.aU(w))
l=new Float32Array(H.aU(v))
k=new Float32Array(H.aU(s))
this.b.Q=X.hE(y)
for(x=m.length,j=0;j<x;++j)m[j]=m[j]/100
x=new B.d8(m,k,l,null,null,n,!1,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
x.dj()
this.a.r2.push(B.d7(x,!1,null,null,null))
$.aC.ai()}},
en:{"^":"b1;fr,fx,fy,go,id,k1,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d,e",
a2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.fr-=b
if(z<0){this.x=!1
return}this.fJ(-(b/2))
z=this.go
z.m(0,this.aj())
y=this.id
y.m(0,this.aj())
x=this.b2()
x.C(0,15)
z.K(0,x)
y.Y(0,x)
w=$.aC.f.r2
for(v=this.fx,u=this.fy,t=this.k1,s=!1,r=1000,q=null,p=0;p<w.length;++p){o=w[p]
if("block"===o.r&&o.x){v.m(0,o.aj())
u.m(0,o.aj())
n=v.a
m=n.length
if(0>=m)return H.a(n,0)
n[0]=n[0]-1
if(1>=m)return H.a(n,1)
n[1]=n[1]-1
if(2>=m)return H.a(n,2)
n[2]=n[2]-1
n=u.a
m=n.length
if(0>=m)return H.a(n,0)
n[0]=n[0]+1
if(1>=m)return H.a(n,1)
n[1]=n[1]+1
if(2>=m)return H.a(n,2)
n[2]=n[2]+1
if(B.m3(v,u,z,y,t)>0){l=z.ab(t)
if(l<r){q=o
r=l}s=!0}}}if(s){q.x=!1
this.fr=0}}},
bU:{"^":"f;eS:a<,b,c,d,t:e<,f,r,x",
m:function(a,b){var z
this.a=b.geS()
this.b=b.b
this.c=b.c
this.d.m(0,b.d)
if(b.e!=null){z=this.e
if(z==null){z=B.bR(null,null)
this.e=z}z.a.m(0,b.e.a)
z=this.e
z.b=b.e.b
z.b5()}else this.e=null
this.f=b.f
this.r=b.r
this.x=b.x}},
ku:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q",
fS:function(a){var z,y
this.a.C(0,0)
this.b.C(0,0)
C.c.I(this.c,new X.kv())
C.c.I(this.d,new X.kw())
this.e=0
this.f.C(0,0)
C.c.I(this.r,new X.kx())
this.x.C(0,0)
this.y=0
this.z=!1
z=this.Q
z.a=!1
z.b=!1
z.c=1
z.d.C(0,0)
y=z.e
y.a.C(0,0)
y.b=0
y.b5()
z.f=0
z.r=0
z.x=0}},
kv:{"^":"l:0;",
$1:function(a){return J.cP(a,0)}},
kw:{"^":"l:0;",
$1:function(a){return J.cP(a,0)}},
kx:{"^":"l:0;",
$1:function(a){return J.cP(a,0)}},
kI:{"^":"f;a,b,c"},
hD:{"^":"f;a,b,t:c<,d,e,f,r",
dz:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.M(3)
y=new Float32Array(z)
x=this.a;++x.k1
w=this.b
w.fS(0)
if(g==null)g=$.$get$db()
w.x.m(0,g)
w.y=h
for(v=w.a,u=w.b,t=0;t<3;++t){s=d.a
if(t>=s.length)return H.a(s,t)
r=s[t]
q=e.a
if(t>=q.length)return H.a(q,t)
q=q[t]
if(t>=z)return H.a(y,t)
y[t]=(r+q)*0.5
q=w.c
if(0>=q.length)return H.a(q,0)
J.P(q[0],t,s[t]-y[t])
s=w.c
if(1>=s.length)return H.a(s,1)
s=s[1]
q=e.a
if(t>=q.length)return H.a(q,t)
J.P(s,t,q[t]-y[t])
q=b.a
if(t>=q.length)return H.a(q,t)
q=q[t]
s=y[t]
r=v.a
if(t>=r.length)return H.a(r,t)
r[t]=q+s
s=c.a
if(t>=s.length)return H.a(s,t)
s=s[t]
q=y[t]
r=u.a
if(t>=r.length)return H.a(r,t)
r[t]=s+q}z=w.c
if(1>=z.length)return H.a(z,1)
z=J.e(z[1],0)
s=w.c
if(1>=s.length)return H.a(s,1)
s=J.F(z,J.e(s[1],1))
z=w.c
if(1>=z.length)return H.a(z,1)
w.e=J.F(s,J.e(z[1],2))
for(z=w.d,t=0;t<8;++t){if(t>=z.length)return H.a(z,t)
s=z[t]
r=w.c
q=(t&1)>0?1:0
if(q>=r.length)return H.a(r,q)
J.P(s,0,J.e(r[q],0))
if(t>=z.length)return H.a(z,t)
q=z[t]
r=w.c
s=(t&2)>0?1:0
if(s>=r.length)return H.a(r,s)
J.P(q,1,J.e(r[s],1))
if(t>=z.length)return H.a(z,t)
s=z[t]
r=w.c
q=(t&4)>0?1:0
if(q>=r.length)return H.a(r,q)
J.P(s,2,J.e(r[q],2))}for(z=w.r,t=0;t<3;++t){s=v.a
if(t>=s.length)return H.a(s,t)
s=s[t]
r=u.a
if(t>=r.length)return H.a(r,t)
r=r[t]
q=z.length
p=w.c
o=p.length
if(s<r){if(0>=q)return H.a(z,0)
r=z[0]
if(0>=o)return H.a(p,0)
p=J.e(p[0],t)
if(typeof p!=="number")return H.n(p)
J.P(r,t,s+p)
if(1>=z.length)return H.a(z,1)
p=z[1]
s=u.a
if(t>=s.length)return H.a(s,t)
s=s[t]
r=w.c
if(1>=r.length)return H.a(r,1)
r=J.e(r[1],t)
if(typeof r!=="number")return H.n(r)
J.P(p,t,s+r)}else{if(0>=q)return H.a(z,0)
s=z[0]
if(0>=o)return H.a(p,0)
p=J.e(p[0],t)
if(typeof p!=="number")return H.n(p)
J.P(s,t,r+p)
if(1>=z.length)return H.a(z,1)
p=z[1]
r=v.a
if(t>=r.length)return H.a(r,t)
r=r[t]
s=w.c
if(1>=s.length)return H.a(s,1)
s=J.e(s[1],t)
if(typeof s!=="number")return H.n(s)
J.P(p,t,r+s)}}z=b.a
v=z.length
if(0>=v)return H.a(z,0)
u=z[0]
s=c.a
r=s.length
if(0>=r)return H.a(s,0)
if(u===s[0]){if(1>=v)return H.a(z,1)
u=z[1]
if(1>=r)return H.a(s,1)
if(u===s[1]){if(2>=v)return H.a(z,2)
z=z[2]
if(2>=r)return H.a(s,2)
s=z===s[2]
z=s}else z=!1}else z=!1
if(z){z=J.X(f)
if(z.S(f,0))if(z.B(f,254))P.aa("Unimplemented: modelClipHandle == 254")
else{z=x.x
if(f>>>0!==f||f>=z.length)return H.a(z,f)
n=z[f]
this.eg(w,new B.d3(0,0,null,null,n.c,n.d,n.e,n.f))}else P.aa("Unimplemented: modelClipHandle == null")}else{z=w.c
if(0>=z.length)return H.a(z,0)
if(J.w(J.e(z[0],0),0)){z=w.c
if(0>=z.length)return H.a(z,0)
if(J.w(J.e(z[0],1),0)){z=w.c
if(0>=z.length)return H.a(z,0)
z=J.w(J.e(z[0],2),0)}else z=!1}else z=!1
x=w.f
if(z){w.z=!0
x.C(0,0)}else{w.z=!1
z=w.c
if(1>=z.length)return H.a(z,1)
z=J.e(z[1],0)
v=x.a
if(0>=v.length)return H.a(v,0)
v[0]=z
z=w.c
if(1>=z.length)return H.a(z,1)
z=J.e(z[1],1)
v=x.a
if(1>=v.length)return H.a(v,1)
v[1]=z
z=w.c
if(1>=z.length)return H.a(z,1)
z=J.e(z[1],2)
x=x.a
if(2>=x.length)return H.a(x,2)
x[2]=z}if(!J.aw(f,0))this.aF(w,0,0,1,b,c)}z=w.Q
x=z.d
if(z.c===1)x.m(0,c)
else{x=x.m(0,b)
w=z.c
x=x.a
v=x.length
if(0>=v)return H.a(x,0)
u=x[0]
s=c.a
r=s.length
if(0>=r)return H.a(s,0)
q=s[0]
if(typeof w!=="number")return w.W()
x[0]=u+w*(q-u)
if(1>=v)return H.a(x,1)
u=x[1]
if(1>=r)return H.a(s,1)
x[1]=u+w*(s[1]-u)
if(2>=v)return H.a(x,2)
v=x[2]
if(2>=r)return H.a(s,2)
x[2]=v+w*(s[2]-v)}a.m(0,z)},
aE:function(a,b,c,d,e){return this.dz(a,b,c,d,e,0,null,0,!1)},
fW:function(a,b,c,d,e,f,g,h){return this.dz(a,b,c,d,e,f,g,h,!1)},
eg:function(a,b){var z,y,x,w,v,u
for(z=a.Q,y=this.a,x=0;x<b.x;++x){w=y.y
v=b.r+x
if(v<0||v>=w.length)return H.a(w,v)
u=w[v]
w=u.f
v=y.k1
if(w===v)continue
u.f=v
w=u.e
v=a.y
if(typeof w!=="number")return w.h1()
if(typeof v!=="number")return H.n(v)
if((w&v)>>>0===0)continue
this.ef(a,u)
if(z.a)return}},
ef:function(a,b){var z,y,x,w,v,u,t,s,r
if(b.b===0)return
z=a.r
if(0>=z.length)return H.a(z,0)
y=J.e(z[0],0)
x=b.d
if(1>=x.length)return H.a(x,1)
if(!J.aw(y,J.e(x[1],0))){if(0>=z.length)return H.a(z,0)
y=J.e(z[0],1)
if(1>=x.length)return H.a(x,1)
if(!J.aw(y,J.e(x[1],1))){if(0>=z.length)return H.a(z,0)
y=J.e(z[0],2)
if(1>=x.length)return H.a(x,1)
if(!J.aw(y,J.e(x[1],2))){if(1>=z.length)return H.a(z,1)
y=J.e(z[1],0)
if(0>=x.length)return H.a(x,0)
if(!J.S(y,J.e(x[0],0))){if(1>=z.length)return H.a(z,1)
y=J.e(z[1],1)
if(0>=x.length)return H.a(x,0)
if(!J.S(y,J.e(x[0],1))){if(1>=z.length)return H.a(z,1)
z=J.e(z[1],2)
if(0>=x.length)return H.a(x,0)
x=J.S(z,J.e(x[0],2))
z=x}else z=!0}else z=!0}else z=!0}else z=!0}else z=!0
if(z)return
for(z=this.a,y=a.d,x=a.a,w=6;w<b.b;++w){v=z.z
u=b.a+w
if(u<0||u>=v.length)return H.a(v,u)
t=v[u]
u=z.c
v=t.a
if(v<0||v>=u.length)return H.a(u,v)
s=u[v]
v=s.b
u=s.d
if(u>>>0!==u||u>=y.length)return H.a(y,u)
r=J.J(v,B.Z(y[u].gR(),s.a.a))
u=B.Z(x.a,s.a.a)
if(typeof r!=="number")return H.n(r)
if(u-r>0)return}z=a.Q
z.a=!0
z.b=!0
z.c=0
z.r=b.e},
fY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
for(z=this.a,y=0;y<b.x;++y){x=z.y
w=z.r
v=b.r+y
if(v<0||v>=w.length)return H.a(w,v)
v=w[v]
if(v<0||v>=x.length)return H.a(x,v)
u=x[v]
v=z.b
x=u.c
if(x<0||x>=v.length)return H.a(v,x)
t=v[x]
if(u.b>0&&(t.c&1)===1)this.fX(a,u)}for(x=a.Q,s=0;s<b.f;++s){w=z.db
v=z.f
r=b.e+s
if(r<0||r>=v.length)return H.a(v,r)
r=v[r]
if(r<0||r>=w.length)return H.a(w,r)
q=w[r].gfN()
if(q==null)continue
p=x.c
this.fZ(a,q.d)
w=x.c
if(typeof w!=="number")return w.P()
if(typeof p!=="number")return H.n(p)
if(w<p){x.f=q.b
x.r=q.c}}},
fZ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.r
y=this.e
x=this.f
w=a.d
v=a.a
u=a.b
t=this.d
s=a.Q
r=null
q=0
while(!0){p=b.d
if(typeof p!=="number")return H.n(p)
if(!(q<p))break
c$0:{p=b.e
if(q>=p.length)return H.a(p,q)
o=p[q]
z.b=-1
z.c=1
p=b.c
n=o.a
if(n>>>0!==n||n>=p.length)return H.a(p,n)
m=p[n]
B.au(m.a,this.c)
n=m.b
if(n>>>0!==n||n>=w.length)return H.a(w,n)
l=B.Z(w[n].gR(),this.c)
n=this.c
n[3]=J.J(n[3],l)
y.m(0,v)
x.m(0,u)
if(!this.cM(this.c,y,x,z))break c$0
if(z.a!==0)C.c.bZ(t,0,this.c)
p=o.d
n=p.length
k=o.c
j=k.length
r=0
i=-1
while(!0){h=o.b
if(typeof h!=="number")return H.n(h)
if(!(r<h))break
h=b.c
if(r>=j)return H.a(k,r)
g=k[r]
if(g>>>0!==g||g>=h.length)return H.a(h,g)
m=h[g]
if(r>=n)return H.a(p,r)
h=p[r]
g=this.c
if(h===!0){g[0]=J.I(m.a[0])
this.c[1]=J.I(m.a[1])
this.c[2]=J.I(m.a[2])
this.c[3]=J.I(m.a[3])}else B.au(m.a,g)
h=m.b
if(h>>>0!==h||h>=w.length)return H.a(w,h)
l=B.Z(w[h].gR(),this.c)
h=this.c
h[3]=J.F(h[3],Math.abs(l))
y.m(0,v)
x.m(0,u)
if(!this.cM(this.c,y,x,z))break
if(z.a!==0){B.au(this.c,t)
i=r}++r}p=o.b
if(typeof p!=="number")return H.n(p)
if(r<p)break c$0
if(i===p-1)break c$0
p=z.b
n=z.c
if(typeof p!=="number")return p.P()
if(typeof n!=="number")return H.n(n)
if(p<n&&p>=0){n=s.c
if(typeof n!=="number")return H.n(n)
if(p<n){if(p<0){z.b=0
p=0}s.c=p
B.au(t,s.e.a.a)
s.e.b=t[3]}}}++q}},
cM:function(a,b,c,d){var z,y,x,w,v
d.a=0
z=B.Z(b.a,a)
y=a[3]
if(typeof y!=="number")return H.n(y)
x=z-y
y=B.Z(c.a,a)
z=a[3]
if(typeof z!=="number")return H.n(z)
w=y-z
if(x>0)z=w>=0.125||w>=x
else z=!1
if(z)return!1
if(x<=0&&w<=0)return!0
z=x-w
if(x>w){v=(x-0.125)/z
if(v<0)v=0
z=d.b
if(typeof z!=="number")return H.n(z)
if(v>z){d.b=v
d.a=1}}else{v=(x+0.125)/z
if(v>1)v=1
z=d.c
if(typeof z!=="number")return H.n(z)
if(v<z)d.c=v}return!0},
aF:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=Q.k(0,0,0)
y=a.Q.c
if(typeof y!=="number")return y.aH()
if(y<=c)return
if(b<0){y=this.a.e
x=-1-b
if(x>=y.length)return H.a(y,x)
this.fY(a,y[x])
return}y=this.a
x=y.d
if(b>=x.length)return H.a(x,b)
w=x[b]
y=y.c
x=w.a
if(x<0||x>=y.length)return H.a(y,x)
v=y[x]
y=v.c
if(typeof y!=="number")return y.P()
if(y<3){x=e.a
if(y>=x.length)return H.a(x,y)
x=x[y]
u=v.b
if(typeof u!=="number")return H.n(u)
t=x-u
x=f.a
if(y>=x.length)return H.a(x,y)
x=x[y]-u
u=a.f.a
if(y>=u.length)return H.a(u,y)
s=u[y]
y=t}else{y=v.a.L(e)
x=v.b
if(typeof x!=="number")return H.n(x)
y-=x
x=v.a.L(f)
u=v.b
if(typeof u!=="number")return H.n(u)
x-=u
s=a.z===!0?0:2048}u=s+1
if(y>=u&&x>=u){y=w.b
if(0>=y.length)return H.a(y,0)
this.aF(a,y[0],c,d,e,f)
return}else{u=-s-1
if(y<u&&x<u){y=w.b
if(1>=y.length)return H.a(y,1)
this.aF(a,y[1],c,d,e,f)
return}}if(y<x){r=1/(y-x)
q=(y+s+0.125)*r
p=(y-s+0.125)*r
o=1}else{if(y>x){r=1/(y-x)
q=(y-s-0.125)*r
p=(y+s+0.125)*r}else{p=1
q=0}o=0}if(p<0)p=0
else if(p>1)p=1
y=d-c
for(x=e.a,u=x.length,n=f.a,m=n.length,l=z.a,k=l.length,j=0;j<3;++j){if(j>=u)return H.a(x,j)
i=x[j]
if(j>=m)return H.a(n,j)
h=n[j]
if(j>=k)return H.a(l,j)
l[j]=i+p*(h-i)}x=w.b
if(o>=x.length)return H.a(x,o)
this.aF(a,x[o],c,c+y*p,e,z)
if(q<0)q=0
else if(q>1)q=1
for(x=e.a,u=x.length,n=f.a,m=n.length,l=z.a,k=l.length,j=0;j<3;++j){if(j>=u)return H.a(x,j)
i=x[j]
if(j>=m)return H.a(n,j)
h=n[j]
if(j>=k)return H.a(l,j)
l[j]=i+q*(h-i)}x=w.b
u=o===0?1:0
if(u>=x.length)return H.a(x,u)
this.aF(a,x[u],c+y*q,d,z,f)},
fX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
for(z=this.a,y=a.d,x=a.a,w=a.b,v=null,u=-1,t=1,s=!1,r=!1,q=null,p=null,o=0;o<b.b;++o){n=z.z
m=b.a+o
if(m<0||m>=n.length)return H.a(n,m)
l=n[m]
m=z.c
n=l.a
if(n<0||n>=m.length)return H.a(m,n)
k=m[n]
n=k.b
m=k.d
if(m>>>0!==m||m>=y.length)return H.a(y,m)
j=J.J(n,y[m].L(k.a))
m=x.L(k.a)
if(typeof j!=="number")return H.n(j)
i=m-j
h=w.L(k.a)-j
if(h>0)r=!0
n=i>0
if(n)s=!0
if(n)n=h>=0.125||h>=i
else n=!1
if(n)return
if(i<=0&&h<=0)continue
n=i-h
if(i>h){g=(i-0.125)/n
if(g<0)g=0
if(g>u){p=l
u=g
v=k}}else{q=(i+0.125)/n
if(q>1)q=1
if(q<t)t=q}}if(!s){y=a.Q
y.b=!0
if(!r){y.a=!0
y.c=0
z=z.b
x=b.c
if(x<0||x>=z.length)return H.a(z,x)
y.r=z[x].c}return}if(u<t){if(u>-1){y=a.Q.c
if(typeof y!=="number")return H.n(y)
y=u<y}else y=!1
if(y){if(u<0)u=0
y=a.Q
y.c=u
x=y.e
x.a.m(0,v.a)
x.b=v.b
x.c=v.c
x.d=v.d
z=z.b
x=p.b
w=z.length
if(x<0||x>=w)return H.a(z,x)
y.f=z[x].b
x=b.c
if(x<0||x>=w)return H.a(z,x)
y.r=z[x].c}}},
e6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=this.a,y=z.db,x=y.length,w=Q.o,v=0;v<y.length;y.length===x||(0,H.aD)(y),++v){u=y[v]
if(u.ge5()!==$.eV)continue
t=u.cx
s=t.length
if(0>=s)return H.a(t,0)
r=t[0]
if(1>=s)return H.a(t,1)
q=t[1]
p=P.a6(r*q,new X.hF(this,u),!0,w)
t=z.b
s=u.a
if(s>=t.length)return H.a(t,s)
s=t[s]
o=new B.jG(null,null,null,null)
o.c=s.c
o.b=s.b
o.d=B.mo(r,q,p)
u.cy=o}},
q:{
hE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Q.k(0,0,0)
y=Q.k(0,0,0)
x=B.cI(2)
w=B.cI(8)
v=Q.k(0,0,0)
u=B.cI(2)
t=Q.k(0,0,0)
s=Q.k(0,0,0)
r=B.bR(null,null)
q=new Array(4)
q.fixed$length=Array
p=[P.u]
q=H.h(q,p)
o=new Array(4)
o.fixed$length=Array
p=new X.hD(a,new X.ku(z,y,x,w,null,v,u,t,null,null,new X.bU(!1,!1,1,s,r,null,null,null)),q,H.h(o,p),Q.k(0,0,0),Q.k(0,0,0),new X.kI(null,null,null))
p.e6(a)
return p}}},
hF:{"^":"l:0;a,b",
$1:function(a){var z,y
z=this.a.a.Q
y=this.b.d+a
if(y>=z.length)return H.a(z,y)
return Q.bq(z[y].a)}}},1]]
setupProgram(dart,0)
J.y=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ej.prototype
return J.jf.prototype}if(typeof a=="string")return J.bN.prototype
if(a==null)return J.jg.prototype
if(typeof a=="boolean")return J.je.prototype
if(a.constructor==Array)return J.bL.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.f)return a
return J.cC(a)}
J.A=function(a){if(typeof a=="string")return J.bN.prototype
if(a==null)return a
if(a.constructor==Array)return J.bL.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.f)return a
return J.cC(a)}
J.a4=function(a){if(a==null)return a
if(a.constructor==Array)return J.bL.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.f)return a
return J.cC(a)}
J.X=function(a){if(typeof a=="number")return J.bM.prototype
if(a==null)return a
if(!(a instanceof P.f))return J.bV.prototype
return a}
J.fz=function(a){if(typeof a=="number")return J.bM.prototype
if(typeof a=="string")return J.bN.prototype
if(a==null)return a
if(!(a instanceof P.f))return J.bV.prototype
return a}
J.dy=function(a){if(typeof a=="string")return J.bN.prototype
if(a==null)return a
if(!(a instanceof P.f))return J.bV.prototype
return a}
J.p=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bO.prototype
return a}if(a instanceof P.f)return a
return J.cC(a)}
J.F=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.fz(a).F(a,b)}
J.w=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.y(a).B(a,b)}
J.fT=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.X(a).b1(a,b)}
J.aw=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.X(a).S(a,b)}
J.fU=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.X(a).aH(a,b)}
J.S=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.X(a).P(a,b)}
J.ab=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.fz(a).W(a,b)}
J.I=function(a){if(typeof a=="number")return-a
return J.X(a).b3(a)}
J.J=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.X(a).A(a,b)}
J.e=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.fE(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).h(a,b)}
J.P=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.fE(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.a4(a).j(a,b,c)}
J.fV=function(a,b,c,d){return J.p(a).eq(a,b,c,d)}
J.fW=function(a,b,c,d){return J.p(a).eJ(a,b,c,d)}
J.aE=function(a){return J.X(a).cB(a)}
J.fX=function(a,b){return J.p(a).cD(a,b)}
J.fY=function(a,b){return J.p(a).a2(a,b)}
J.fZ=function(a,b,c){return J.p(a).eT(a,b,c)}
J.h_=function(a,b,c){return J.p(a).eU(a,b,c)}
J.dH=function(a,b,c){return J.p(a).cG(a,b,c)}
J.ax=function(a,b,c){return J.p(a).cH(a,b,c)}
J.dI=function(a,b,c){return J.p(a).cI(a,b,c)}
J.bF=function(a,b,c){return J.p(a).cJ(a,b,c)}
J.aX=function(a,b,c,d){return J.p(a).eW(a,b,c,d)}
J.h0=function(a,b){return J.p(a).cN(a,b)}
J.dJ=function(a,b){return J.a4(a).cQ(a,b)}
J.h1=function(a,b,c,d,e){return J.p(a).cR(a,b,c,d,e)}
J.h2=function(a,b){return J.p(a).cT(a,b)}
J.bd=function(a){return J.p(a).cU(a)}
J.h3=function(a){return J.p(a).eZ(a)}
J.h4=function(a){return J.p(a).cV(a)}
J.h5=function(a,b){return J.p(a).cX(a,b)}
J.cJ=function(a){return J.p(a).cY(a)}
J.h6=function(a,b){return J.p(a).f3(a,b)}
J.cK=function(a,b){return J.p(a).cZ(a,b)}
J.h7=function(a,b,c,d){return J.p(a).d0(a,b,c,d)}
J.h8=function(a,b,c,d,e){return J.p(a).d1(a,b,c,d,e)}
J.h9=function(a,b){return J.a4(a).u(a,b)}
J.ha=function(a,b){return J.p(a).d3(a,b)}
J.cL=function(a,b){return J.p(a).d4(a,b)}
J.hb=function(a,b){return J.a4(a).I(a,b)}
J.hc=function(a){return J.p(a).gcK(a)}
J.cM=function(a){return J.p(a).gaU(a)}
J.be=function(a){return J.p(a).gV(a)}
J.ac=function(a){return J.y(a).gG(a)}
J.hd=function(a){return J.X(a).gfz(a)}
J.bG=function(a){return J.a4(a).gE(a)}
J.dK=function(a){return J.p(a).gfB(a)}
J.bH=function(a){return J.A(a).gk(a)}
J.he=function(a){return J.p(a).gaW(a)}
J.hf=function(a){return J.p(a).gdg(a)}
J.hg=function(a){return J.p(a).gdh(a)}
J.cN=function(a,b,c){return J.p(a).bP(a,b,c)}
J.hh=function(a,b){return J.p(a).bQ(a,b)}
J.hi=function(a,b){return J.p(a).bS(a,b)}
J.hj=function(a,b,c){return J.p(a).bT(a,b,c)}
J.hk=function(a,b){return J.p(a).bV(a,b)}
J.hl=function(a,b,c){return J.p(a).bW(a,b,c)}
J.aY=function(a,b,c){return J.p(a).bX(a,b,c)}
J.hm=function(a,b){return J.p(a).dd(a,b)}
J.hn=function(a,b){return J.a4(a).af(a,b)}
J.dL=function(a,b,c){return J.p(a).dl(a,b,c)}
J.cO=function(a){return J.p(a).dn(a)}
J.cP=function(a,b){return J.p(a).C(a,b)}
J.bf=function(a,b){return J.p(a).a7(a,b)}
J.ho=function(a,b){return J.p(a).sff(a,b)}
J.dM=function(a,b){return J.p(a).sM(a,b)}
J.dN=function(a,b){return J.p(a).sN(a,b)}
J.Q=function(a,b){return J.p(a).m(a,b)}
J.hp=function(a,b,c){return J.p(a).c0(a,b,c)}
J.dO=function(a,b){return J.dy(a).e0(a,b)}
J.dP=function(a,b){return J.dy(a).c3(a,b)}
J.cQ=function(a,b,c,d,e,f,g){return J.p(a).dv(a,b,c,d,e,f,g)}
J.c4=function(a,b,c,d){return J.p(a).dw(a,b,c,d)}
J.aF=function(a){return J.X(a).i(a)}
J.aZ=function(a){return J.y(a).l(a)}
J.hq=function(a){return J.dy(a).h_(a)}
J.dQ=function(a,b,c){return J.p(a).dA(a,b,c)}
J.hr=function(a,b,c){return J.p(a).dB(a,b,c)}
J.hs=function(a,b,c,d){return J.p(a).dC(a,b,c,d)}
J.ht=function(a,b,c){return J.p(a).dD(a,b,c)}
J.dR=function(a,b,c,d){return J.p(a).dE(a,b,c,d)}
J.hu=function(a,b){return J.p(a).dG(a,b)}
J.cR=function(a,b,c,d,e,f,g){return J.p(a).dH(a,b,c,d,e,f,g)}
J.hv=function(a,b,c,d,e){return J.p(a).dI(a,b,c,d,e)}
I.dB=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.q=W.c8.prototype
C.i=W.il.prototype
C.r=J.i.prototype
C.c=J.bL.prototype
C.b=J.ej.prototype
C.a=J.bM.prototype
C.e=J.bN.prototype
C.z=J.bO.prototype
C.l=J.jI.prototype
C.f=J.bV.prototype
C.m=W.kH.prototype
C.n=new P.jF()
C.o=new P.kW()
C.p=new P.lj()
C.d=new P.lx()
C.h=new P.aQ(0)
C.t=function() {  var toStringFunction = Object.prototype.toString;  function getTag(o) {    var s = toStringFunction.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = toStringFunction.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: getTag,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.j=function(hooks) { return hooks; }
C.u=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.v=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.w=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.k=function getTagFallback(o) {  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.x=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.y=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.A=new P.jm(null,null)
C.B=new P.jn(null)
C.C=I.dB([])
$.eJ="$cachedFunction"
$.eK="$cachedInvocation"
$.ay=0
$.bh=null
$.dW=null
$.dz=null
$.fs=null
$.fJ=null
$.cA=null
$.cE=null
$.dA=null
$.b8=null
$.bu=null
$.bv=null
$.ds=!1
$.x=C.d
$.ee=0
$.fS=0
$.av=null
$.eV=2
$.e_=null
$.cV=!1
$.m5=0
$.m6=0
$.fG=0
$.fH=0
$.mI=0
$.mJ=0
$.fO=!1
$.em=32
$.jo=65
$.jp=68
$.el=75
$.jq=83
$.jr=87
$.a8=0
$.aK=0
$.eu=0
$.ev=4
$.ew=8
$.ex=1
$.ey=5
$.ez=9
$.er=2
$.es=6
$.et=10
$.bn=12
$.bo=13
$.bp=14
$.mZ=100
$.mW=50
$.mS=10
$.mT=0.1
$.mU=6
$.c1=0.3
$.mX=0.501
$.eO=18
$.mV=20
$.mY=10
$.fK=50
$.aC=null
$.dv=null
$.cH=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["e2","$get$e2",function(){return H.fA("_$dart_dartClosure")},"d0","$get$d0",function(){return H.fA("_$dart_js")},"eh","$get$eh",function(){return H.j9()},"ei","$get$ei",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ee
$.ee=z+1
z="expando$key$"+z}return new P.ic(null,z)},"eY","$get$eY",function(){return H.aB(H.cp({
toString:function(){return"$receiver$"}}))},"eZ","$get$eZ",function(){return H.aB(H.cp({$method$:null,
toString:function(){return"$receiver$"}}))},"f_","$get$f_",function(){return H.aB(H.cp(null))},"f0","$get$f0",function(){return H.aB(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"f4","$get$f4",function(){return H.aB(H.cp(void 0))},"f5","$get$f5",function(){return H.aB(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"f2","$get$f2",function(){return H.aB(H.f3(null))},"f1","$get$f1",function(){return H.aB(function(){try{null.$method$}catch(z){return z.message}}())},"f7","$get$f7",function(){return H.aB(H.f3(void 0))},"f6","$get$f6",function(){return H.aB(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dm","$get$dm",function(){return P.kN()},"bj","$get$bj",function(){return P.l4(null,P.cg)},"bx","$get$bx",function(){return[]},"aM","$get$aM",function(){return H.h(new Array(4),[P.u])},"dx","$get$dx",function(){return Q.k(0,0,0)},"bz","$get$bz",function(){return Q.k(0,0,0)},"D","$get$D",function(){return P.a6(2048,new B.m9(),!0,B.bQ)},"cz","$get$cz",function(){return H.ca(P.q,P.cw)},"by","$get$by",function(){return H.ca(P.v,P.cw)},"aV","$get$aV",function(){return Q.k(0,0,0)},"c3","$get$c3",function(){return Q.k(0,0,0)},"aO","$get$aO",function(){var z=P.v
z=new E.hP(null,null,H.ca(z,P.bI),H.ca(z,P.q))
z.e7(0.25)
return z},"db","$get$db",function(){return Q.k(0,0,0)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[W.aA]},{func:1,args:[,,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.f],opt:[P.b4]},{func:1,ret:P.v,args:[P.q]},{func:1,args:[P.q]},{func:1,args:[W.cb]},{func:1,args:[B.b1]},{func:1,args:[,P.v]},{func:1,args:[P.v]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,],opt:[,]},{func:1,args:[,P.b4]},{func:1,v:true,args:[,P.b4]},{func:1,args:[P.v,,]},{func:1,args:[P.bI]},{func:1,v:true,opt:[P.u]},{func:1,args:[B.cZ]},{func:1,args:[P.d]},{func:1,ret:P.u},{func:1,args:[P.c7]},{func:1,v:true,args:[P.f]},{func:1,ret:P.u,args:[P.v],opt:[{func:1,ret:P.u,args:[P.v]}]},{func:1,args:[P.aj],opt:[{func:1,v:true,args:[,]}]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.nd(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.dB=a.dB
Isolate.W=a.W
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.fP(X.fC(),b)},[])
else (function(b){H.fP(X.fC(),b)})([])})})()