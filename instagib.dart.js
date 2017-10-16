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
b5.$isd=b4
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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="v"){processStatics(init.statics[b1]=b2.v,b3)
delete b2.v}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
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
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
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
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=b7[g],e
if(typeof f=="string")e=b7[++g]
else{e=f
f=b8}var d=[b6[b8]=b6[f]=e]
e.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){e=b7[g]
if(typeof e!="function")break
if(!b9)e.$stubName=b7[++g]
d.push(e)
if(e.$stubName){b6[e.$stubName]=e
c0.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b7[g]
var a0=b7[g]
b7=b7.slice(++g)
var a1=b7[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b7[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b7[2]
if(typeof b0=="number")b7[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b7,b9,b8,a9)
b6[b8].$getter=e
e.$getterStub=true
if(b9){init.globalFunctions[b8]=e
c0.push(a0)}b6[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}var b2=b7.length>b1
if(b2){d[0].$reflectable=1
d[0].$reflectionInfo=b7
for(var c=1;c<d.length;c++){d[c].$reflectable=2
d[c].$reflectionInfo=b7}var b3=b9?init.mangledGlobalNames:init.mangledNames
var b4=b7[b1]
var b5=b4
if(a0)b3[a0]=b5
if(a4)b5+="="
else if(!a5)b5+=":"+(a2+a7)
b3[b8]=b5
d[0].$reflectionName=b5
d[0].$metadataIndex=b1+1
if(a7)b6[b4+"*"]=d[0]}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dN"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dN"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dN(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.U=function(){}
var dart=[["","",,H,{"^":"",oW:{"^":"d;a"}}],["","",,J,{"^":"",
p:function(a){return void 0},
cN:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cK:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dU==null){H.n8()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.h(new P.dy("Return interceptor for "+H.j(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$dc()]
if(v!=null)return v
v=H.ni(a)
if(v!=null)return v
if(typeof a=="function")return C.B
y=Object.getPrototypeOf(a)
if(y==null)return C.o
if(y===Object.prototype)return C.o
if(typeof w=="function"){Object.defineProperty(w,$.$get$dc(),{value:C.h,enumerable:false,writable:true,configurable:true})
return C.h}return C.h},
f:{"^":"d;",
D:function(a,b){return a===b},
gJ:function(a){return H.aJ(a)},
l:["e8",function(a){return H.cs(a)}],
bU:["e7",function(a,b){throw H.h(P.eU(a,b.gdh(),b.gds(),b.gdj(),null))},null,"ghq",2,0,null,8],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|AudioParam|BarProp|Bluetooth|BluetoothDevice|BluetoothGATTCharacteristic|BluetoothGATTRemoteServer|BluetoothGATTService|BluetoothUUID|Body|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|CircularGeofencingRegion|Client|Clients|CompositorProxy|ConsoleBase|Coordinates|CredentialsContainer|Crypto|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMParser|DOMStringMap|DataTransfer|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|Entry|EntrySync|FileEntry|FileEntrySync|FileError|FileReaderSync|FileWriterSync|FormData|GamepadButton|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBObjectStore|ImageBitmap|InjectedScriptHost|InputDevice|Iterator|KeyframeEffect|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|NavigatorStorageUtils|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|PagePopupController|PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceRenderTiming|PerformanceResourceTiming|PerformanceTiming|PeriodicSyncManager|PeriodicSyncRegistration|PeriodicWave|Permissions|PositionError|PositionSensorVRDevice|PushManager|PushMessageData|PushSubscription|RTCIceCandidate|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStream|ReadableStreamReader|Request|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGUnitTypes|Screen|ScrollState|ServicePort|SharedArrayBuffer|SourceInfo|SpeechRecognitionAlternative|SpeechSynthesisVoice|StorageInfo|StorageQuota|SubtleCrypto|SyncManager|SyncRegistration|TextMetrics|TreeWalker|VRDevice|VREyeParameters|VRFieldOfView|VRPositionState|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLBuffer|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTransformFeedback|WebGLUniformLocation|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WindowClient|WorkerConsole|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
jX:{"^":"f;",
l:function(a){return String(a)},
gJ:function(a){return a?519018:218159},
$iscG:1},
ex:{"^":"f;",
D:function(a,b){return null==b},
l:function(a){return"null"},
gJ:function(a){return 0},
bU:[function(a,b){return this.e7(a,b)},null,"ghq",2,0,null,8]},
dd:{"^":"f;",
gJ:function(a){return 0},
l:["e9",function(a){return String(a)}],
$isk_:1},
kv:{"^":"dd;"},
c5:{"^":"dd;"},
bX:{"^":"dd;",
l:function(a){var z=a[$.$get$ch()]
return z==null?this.e9(a):J.aY(z)},
$iscj:1,
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
bU:{"^":"f;$ti",
bK:function(a,b){if(!!a.immutable$list)throw H.h(new P.y(b))},
bJ:function(a,b){if(!!a.fixed$length)throw H.h(new P.y(b))},
L:function(a,b){this.bJ(a,"add")
a.push(b)},
cd:function(a,b,c){var z,y
this.bK(a,"setAll")
z=a.length
if(b>z)H.H(P.ay(b,0,z,"index",null))
for(z=J.be(c);z.B();b=y){y=b+1
this.j(a,b,z.d)}},
G:function(a,b){var z
this.bJ(a,"addAll")
for(z=J.be(b);z.B();)a.push(z.gC())},
U:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.h(new P.av(a))}},
aB:function(a,b){return new H.cn(a,b,[null,null])},
he:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.j(a[x])
if(x>=z)return H.a(y,x)
y[x]=w}return y.join(b)},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
gbP:function(a){if(a.length>0)return a[0]
throw H.h(H.db())},
ce:function(a,b,c,d,e){var z,y,x
this.bK(a,"set range")
P.cu(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.H(P.ay(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.h(H.jV())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
fR:function(a,b,c,d){var z
this.bK(a,"fill range")
P.cu(b,c,a.length,null,null,null)
for(z=b;z<c;++z)a[z]=d},
bF:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.h(new P.av(a))}return!1},
aI:function(a,b){var z
for(z=0;z<a.length;++z)if(J.t(a[z],b))return!0
return!1},
l:function(a){return P.bi(a,"[","]")},
gM:function(a){return new J.i4(a,a.length,0,null)},
gJ:function(a){return H.aJ(a)},
gk:function(a){return a.length},
sk:function(a,b){this.bJ(a,"set length")
if(b<0)throw H.h(P.ay(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.Q(a,b))
if(b>=a.length||b<0)throw H.h(H.Q(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.H(new P.y("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.Q(a,b))
if(b>=a.length||b<0)throw H.h(H.Q(a,b))
a[b]=c},
$isr:1,
$asr:I.U,
$isc:1,
$asc:null,
$isb:1,
$asb:null},
oV:{"^":"bU;$ti"},
i4:{"^":"d;a,b,c,d",
gC:function(){return this.d},
B:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.h(H.at(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bV:{"^":"f;",
bL:function(a,b){var z
if(typeof b!=="number")throw H.h(H.O(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbb(b)
if(this.gbb(a)===z)return 0
if(this.gbb(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbb:function(a){return a===0?1/a<0:a<0},
ghc:function(a){return isNaN(a)},
c0:function(a,b){return a%b},
cU:function(a){return Math.abs(a)},
dC:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.h(new P.y(""+a+".toInt()"))},
c3:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.h(new P.y(""+a+".round()"))},
i_:[function(a,b,c){if(b.bL(0,c).O(0,0))throw H.h(H.O(b))
if(this.bL(a,b)<0)return b
if(this.bL(a,c)>0)return c
return a},"$2","gd0",4,0,12],
i:function(a){return a},
l:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gJ:function(a){return a&0x1FFFFFFF},
bj:function(a){return-a},
H:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a+b},
E:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a-b},
X:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a*b},
bi:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ag:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cR(a,b)},
I:function(a,b){return(a|0)===a?a/b|0:this.cR(a,b)},
cR:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.h(new P.y("Result of truncating division is "+H.j(z)+": "+H.j(a)+" ~/ "+b))},
e3:function(a,b){if(b<0)throw H.h(H.O(b))
return b>31?0:a<<b>>>0},
f0:function(a,b){return b>31?0:a<<b>>>0},
e4:function(a,b){var z
if(b<0)throw H.h(H.O(b))
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
cQ:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
eg:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return(a^b)>>>0},
P:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a<b},
O:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a>b},
aX:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a<=b},
bg:function(a,b){if(typeof b!=="number")throw H.h(H.O(b))
return a>=b},
$isbb:1},
ew:{"^":"bV;",$isx:1,$isbb:1,$isq:1},
jY:{"^":"bV;",$isx:1,$isbb:1},
bW:{"^":"f;",
aH:function(a,b){if(b<0)throw H.h(H.Q(a,b))
if(b>=a.length)throw H.h(H.Q(a,b))
return a.charCodeAt(b)},
H:function(a,b){if(typeof b!=="string")throw H.h(P.e8(b,null,null))
return a+b},
e5:function(a,b){return a.split(b)},
b_:function(a,b,c){var z
if(typeof b!=="number"||Math.floor(b)!==b)H.H(H.O(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.H(H.O(c))
z=J.P(b)
if(z.P(b,0))throw H.h(P.ct(b,null,null))
if(z.O(b,c))throw H.h(P.ct(b,null,null))
if(J.af(c,a.length))throw H.h(P.ct(c,null,null))
return a.substring(b,c)},
ci:function(a,b){return this.b_(a,b,null)},
hI:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aH(z,0)===133){x=J.k0(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.aH(z,w)===133?J.k1(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
X:function(a,b){var z,y
if(typeof b!=="number")return H.m(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.h(C.r)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
h6:function(a,b,c){if(c>a.length)throw H.h(P.ay(c,0,a.length,null,null))
return a.indexOf(b,c)},
dd:function(a,b){return this.h6(a,b,0)},
l:function(a){return a},
gJ:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.Q(a,b))
if(b>=a.length||b<0)throw H.h(H.Q(a,b))
return a[b]},
$isr:1,
$asr:I.U,
$isD:1,
v:{
ey:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 6158:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
k0:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.aH(a,b)
if(y!==32&&y!==13&&!J.ey(y))break;++b}return b},
k1:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.aH(a,z)
if(y!==32&&y!==13&&!J.ey(y))break}return b}}}}],["","",,H,{"^":"",
db:function(){return new P.br("No element")},
jV:function(){return new P.br("Too few elements")},
b:{"^":"an;$ti",$asb:null},
bZ:{"^":"b;$ti",
gM:function(a){return new H.eC(this,this.gk(this),0,null)},
aB:function(a,b){return new H.cn(this,b,[H.a3(this,"bZ",0),null])},
c8:function(a,b){var z,y,x
z=H.i([],[H.a3(this,"bZ",0)])
C.c.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y){x=this.A(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
c7:function(a){return this.c8(a,!0)}},
eC:{"^":"d;a,b,c,d",
gC:function(){return this.d},
B:function(){var z,y,x,w
z=this.a
y=J.v(z)
x=y.gk(z)
if(this.b!==x)throw H.h(new P.av(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.A(z,w);++this.c
return!0}},
eD:{"^":"an;a,b,$ti",
gM:function(a){return new H.kj(null,J.be(this.a),this.b,this.$ti)},
gk:function(a){return J.bM(this.a)},
$asan:function(a,b){return[b]},
v:{
cm:function(a,b,c,d){if(!!J.p(a).$isb)return new H.el(a,b,[c,d])
return new H.eD(a,b,[c,d])}}},
el:{"^":"eD;a,b,$ti",$isb:1,
$asb:function(a,b){return[b]}},
kj:{"^":"jW;a,b,c,$ti",
B:function(){var z=this.b
if(z.B()){this.a=this.c.$1(z.gC())
return!0}this.a=null
return!1},
gC:function(){return this.a}},
cn:{"^":"bZ;a,b,$ti",
gk:function(a){return J.bM(this.a)},
A:function(a,b){return this.b.$1(J.hD(this.a,b))},
$asbZ:function(a,b){return[b]},
$asb:function(a,b){return[b]},
$asan:function(a,b){return[b]}},
er:{"^":"d;$ti"},
dw:{"^":"d;eQ:a<",
D:function(a,b){if(b==null)return!1
return b instanceof H.dw&&J.t(this.a,b.a)},
gJ:function(a){var z,y
z=this._hashCode
if(z!=null)return z
y=J.a4(this.a)
if(typeof y!=="number")return H.m(y)
z=536870911&664597*y
this._hashCode=z
return z},
l:function(a){return'Symbol("'+H.j(this.a)+'")'}}}],["","",,H,{"^":"",
c8:function(a,b){var z=a.aK(b)
if(!init.globalState.d.cy)init.globalState.f.ar()
return z},
he:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isc)throw H.h(P.aC("Arguments to main must be a List: "+H.j(y)))
init.globalState=new H.m6(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$eu()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.lG(P.di(null,H.c7),0)
x=P.q
y.z=new H.Z(0,null,null,null,null,null,0,[x,H.dD])
y.ch=new H.Z(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.m5()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.jO,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.m7)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.Z(0,null,null,null,null,null,0,[x,H.cv])
x=P.bl(null,null,null,x)
v=new H.cv(0,null,!1)
u=new H.dD(y,w,x,init.createNewIsolate(),v,new H.aZ(H.cO()),new H.aZ(H.cO()),!1,!1,[],P.bl(null,null,null,null),null,null,!1,!0,P.bl(null,null,null,null))
x.L(0,0)
u.cl(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bE()
if(H.aS(y,[y]).a9(a))u.aK(new H.nQ(z,a))
else if(H.aS(y,[y,y]).a9(a))u.aK(new H.nR(z,a))
else u.aK(a)
init.globalState.f.ar()},
jS:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.jT()
return},
jT:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.h(new P.y("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.h(new P.y('Cannot extract URI from "'+H.j(z)+'"'))},
jO:[function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.cC(!0,[]).al(b.data)
y=J.v(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.cC(!0,[]).al(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.cC(!0,[]).al(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.q
p=new H.Z(0,null,null,null,null,null,0,[q,H.cv])
q=P.bl(null,null,null,q)
o=new H.cv(0,null,!1)
n=new H.dD(y,p,q,init.createNewIsolate(),o,new H.aZ(H.cO()),new H.aZ(H.cO()),!1,!1,[],P.bl(null,null,null,null),null,null,!1,!0,P.bl(null,null,null,null))
q.L(0,0)
n.cl(0,o)
init.globalState.f.a.a8(0,new H.c7(n,new H.jP(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ar()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.bf(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.ar()
break
case"close":init.globalState.ch.aQ(0,$.$get$ev().h(0,a))
a.terminate()
init.globalState.f.ar()
break
case"log":H.jN(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.bk(["command","print","msg",z])
q=new H.b7(!0,P.bw(null,P.q)).Y(q)
y.toString
self.postMessage(q)}else P.ab(y.h(z,"msg"))
break
case"error":throw H.h(y.h(z,"msg"))}},null,null,4,0,null,27,0],
jN:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.bk(["command","log","msg",a])
x=new H.b7(!0,P.bw(null,P.q)).Y(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.W(w)
z=H.a1(w)
throw H.h(P.bS(z))}},
jQ:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.eZ=$.eZ+("_"+y)
$.f_=$.f_+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.bf(f,["spawned",new H.cE(y,x),w,z.r])
x=new H.jR(a,b,c,d,z)
if(e===!0){z.cW(w,w)
init.globalState.f.a.a8(0,new H.c7(z,x,"start isolate"))}else x.$0()},
mn:function(a){return new H.cC(!0,[]).al(new H.b7(!1,P.bw(null,P.q)).Y(a))},
nQ:{"^":"l:1;a,b",
$0:function(){this.b.$1(this.a.a)}},
nR:{"^":"l:1;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
m6:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
m7:[function(a){var z=P.bk(["command","print","msg",a])
return new H.b7(!0,P.bw(null,P.q)).Y(z)},null,null,2,0,null,13]}},
dD:{"^":"d;a,b,c,hd:d<,fk:e<,f,r,h7:x?,bR:y<,fA:z<,Q,ch,cx,cy,db,dx",
cW:function(a,b){if(!this.f.D(0,a))return
if(this.Q.L(0,b)&&!this.y)this.y=!0
this.bD()},
hw:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.aQ(0,a)
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
if(w===y.c)y.cz();++y.d}this.y=!1}this.bD()},
f4:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.D(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
hv:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.D(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.H(new P.y("removeRange"))
P.cu(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
e1:function(a,b){if(!this.r.D(0,a))return
this.db=b},
h_:function(a,b,c){var z=J.p(b)
if(!z.D(b,0))z=z.D(b,1)&&!this.cy
else z=!0
if(z){J.bf(a,c)
return}z=this.cx
if(z==null){z=P.di(null,null)
this.cx=z}z.a8(0,new H.m_(a,c))},
fZ:function(a,b){var z
if(!this.r.D(0,a))return
z=J.p(b)
if(!z.D(b,0))z=z.D(b,1)&&!this.cy
else z=!0
if(z){this.bS()
return}z=this.cx
if(z==null){z=P.di(null,null)
this.cx=z}z.a8(0,this.ghg())},
h0:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.ab(a)
if(b!=null)P.ab(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aY(a)
y[1]=b==null?null:J.aY(b)
for(x=new P.fD(z,z.r,null,null),x.c=z.e;x.B();)J.bf(x.d,y)},
aK:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.W(u)
w=t
v=H.a1(u)
this.h0(w,v)
if(this.db===!0){this.bS()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghd()
if(this.cx!=null)for(;t=this.cx,!t.ga1(t);)this.cx.du().$0()}return y},
fX:function(a){var z=J.v(a)
switch(z.h(a,0)){case"pause":this.cW(z.h(a,1),z.h(a,2))
break
case"resume":this.hw(z.h(a,1))
break
case"add-ondone":this.f4(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.hv(z.h(a,1))
break
case"set-errors-fatal":this.e1(z.h(a,1),z.h(a,2))
break
case"ping":this.h_(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.fZ(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.L(0,z.h(a,1))
break
case"stopErrors":this.dx.aQ(0,z.h(a,1))
break}},
dg:function(a){return this.b.h(0,a)},
cl:function(a,b){var z=this.b
if(z.ak(0,a))throw H.h(P.bS("Registry: ports must be registered only once."))
z.j(0,a,b)},
bD:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.j(0,this.a,this)
else this.bS()},
bS:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.ac(0)
for(z=this.b,y=z.gaC(z),y=y.gM(y);y.B();)y.gC().eA()
z.ac(0)
this.c.ac(0)
init.globalState.z.aQ(0,this.a)
this.dx.ac(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.bf(w,z[v])}this.ch=null}},"$0","ghg",0,0,2]},
m_:{"^":"l:2;a,b",
$0:[function(){J.bf(this.a,this.b)},null,null,0,0,null,"call"]},
lG:{"^":"d;a,b",
fB:function(){var z=this.a
if(z.b===z.c)return
return z.du()},
dB:function(){var z,y,x
z=this.fB()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.ak(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga1(y)}else y=!1
else y=!1
else y=!1
if(y)H.H(P.bS("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga1(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.bk(["command","close"])
x=new H.b7(!0,new P.fE(0,null,null,null,null,null,0,[null,P.q])).Y(x)
y.toString
self.postMessage(x)}return!1}z.ht()
return!0},
cM:function(){if(self.window!=null)new H.lH(this).$0()
else for(;this.dB(););},
ar:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cM()
else try{this.cM()}catch(x){w=H.W(x)
z=w
y=H.a1(x)
w=init.globalState.Q
v=P.bk(["command","error","msg",H.j(z)+"\n"+H.j(y)])
v=new H.b7(!0,P.bw(null,P.q)).Y(v)
w.toString
self.postMessage(v)}}},
lH:{"^":"l:2;a",
$0:function(){if(!this.a.dB())return
P.lc(C.i,this)}},
c7:{"^":"d;a,b,c",
ht:function(){var z=this.a
if(z.gbR()){z.gfA().push(this)
return}z.aK(this.b)}},
m5:{"^":"d;"},
jP:{"^":"l:1;a,b,c,d,e,f",
$0:function(){H.jQ(this.a,this.b,this.c,this.d,this.e,this.f)}},
jR:{"^":"l:2;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.sh7(!0)
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bE()
if(H.aS(x,[x,x]).a9(y))y.$2(this.b,this.c)
else if(H.aS(x,[x]).a9(y))y.$1(this.b)
else y.$0()}z.bD()}},
fx:{"^":"d;"},
cE:{"^":"fx;b,a",
ad:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gcD())return
x=H.mn(b)
if(z.gfk()===y){z.fX(x)
return}init.globalState.f.a.a8(0,new H.c7(z,new H.m9(this,x),"receive"))},
D:function(a,b){if(b==null)return!1
return b instanceof H.cE&&J.t(this.b,b.b)},
gJ:function(a){return this.b.gby()}},
m9:{"^":"l:1;a,b",
$0:function(){var z=this.a.b
if(!z.gcD())J.hm(z,this.b)}},
dE:{"^":"fx;b,c,a",
ad:function(a,b){var z,y,x
z=P.bk(["command","message","port",this,"msg",b])
y=new H.b7(!0,P.bw(null,P.q)).Y(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
D:function(a,b){if(b==null)return!1
return b instanceof H.dE&&J.t(this.b,b.b)&&J.t(this.a,b.a)&&J.t(this.c,b.c)},
gJ:function(a){var z,y,x
z=J.dZ(this.b,16)
y=J.dZ(this.a,8)
x=this.c
if(typeof x!=="number")return H.m(x)
return(z^y^x)>>>0}},
cv:{"^":"d;by:a<,b,cD:c<",
eA:function(){this.c=!0
this.b=null},
ez:function(a,b){if(this.c)return
this.b.$1(b)},
$iskI:1},
l8:{"^":"d;a,b,c",
er:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.a8(0,new H.c7(y,new H.la(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ai(new H.lb(this,b),0),a)}else throw H.h(new P.y("Timer greater than 0."))},
v:{
l9:function(a,b){var z=new H.l8(!0,!1,null)
z.er(a,b)
return z}}},
la:{"^":"l:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
lb:{"^":"l:2;a,b",
$0:[function(){this.a.c=null;--init.globalState.f.b
this.b.$0()},null,null,0,0,null,"call"]},
aZ:{"^":"d;by:a<",
gJ:function(a){var z,y,x
z=this.a
y=J.P(z)
x=y.e4(z,0)
y=y.ag(z,4294967296)
if(typeof y!=="number")return H.m(y)
z=x^y
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
D:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aZ){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
b7:{"^":"d;a,b",
Y:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.j(0,a,z.gk(z))
z=J.p(a)
if(!!z.$iseO)return["buffer",a]
if(!!z.$iscp)return["typed",a]
if(!!z.$isr)return this.dX(a)
if(!!z.$isjM){x=this.gdU()
w=z.gaN(a)
w=H.cm(w,x,H.a3(w,"an",0),null)
w=P.b1(w,!0,H.a3(w,"an",0))
z=z.gaC(a)
z=H.cm(z,x,H.a3(z,"an",0),null)
return["map",w,P.b1(z,!0,H.a3(z,"an",0))]}if(!!z.$isk_)return this.dY(a)
if(!!z.$isf)this.dE(a)
if(!!z.$iskI)this.aW(a,"RawReceivePorts can't be transmitted:")
if(!!z.$iscE)return this.dZ(a)
if(!!z.$isdE)return this.e_(a)
if(!!z.$isl){v=a.$static_name
if(v==null)this.aW(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaZ)return["capability",a.a]
if(!(a instanceof P.d))this.dE(a)
return["dart",init.classIdExtractor(a),this.dW(init.classFieldsExtractor(a))]},"$1","gdU",2,0,0,7],
aW:function(a,b){throw H.h(new P.y(H.j(b==null?"Can't transmit:":b)+" "+H.j(a)))},
dE:function(a){return this.aW(a,null)},
dX:function(a){var z=this.dV(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aW(a,"Can't serialize indexable: ")},
dV:function(a){var z,y,x
z=[]
C.c.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.Y(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
dW:function(a){var z
for(z=0;z<a.length;++z)C.c.j(a,z,this.Y(a[z]))
return a},
dY:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.aW(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.Y(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
e_:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dZ:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gby()]
return["raw sendport",a]}},
cC:{"^":"d;a,b",
al:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.h(P.aC("Bad serialized message: "+H.j(a)))
switch(C.c.gbP(a)){case"ref":if(1>=a.length)return H.a(a,1)
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
y=H.i(this.aJ(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.i(this.aJ(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.aJ(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.i(this.aJ(x),[null])
y.fixed$length=Array
return y
case"map":return this.fE(a)
case"sendport":return this.fF(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fD(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.aZ(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aJ(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.h("couldn't deserialize: "+H.j(a))}},"$1","gfC",2,0,0,7],
aJ:function(a){var z,y,x
z=J.v(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.m(x)
if(!(y<x))break
z.j(a,y,this.al(z.h(a,y)));++y}return a},
fE:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.cl()
this.b.push(w)
y=J.e3(y,this.gfC()).c7(0)
for(z=J.v(y),v=J.v(x),u=0;u<z.gk(y);++u)w.j(0,z.h(y,u),this.al(v.h(x,u)))
return w},
fF:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.t(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dg(w)
if(u==null)return
t=new H.cE(u,x)}else t=new H.dE(y,w,x)
this.b.push(t)
return t},
fD:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.v(y)
v=J.v(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.m(t)
if(!(u<t))break
w[z.h(y,u)]=this.al(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
iC:function(){throw H.h(new P.y("Cannot modify unmodifiable Map"))},
h3:function(a){return init.getTypeFromName(a)},
n3:function(a){return init.types[a]},
h1:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.p(a).$isw},
j:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aY(a)
if(typeof z!=="string")throw H.h(H.O(a))
return z},
aJ:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
eX:function(a,b){throw H.h(new P.d8(a,null,null))},
kA:function(a,b,c){var z,y
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.eX(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.eX(a,c)},
eW:function(a,b){throw H.h(new P.d8("Invalid double",a,null))},
dt:function(a,b){var z,y
H.mO(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.eW(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.hY(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.eW(a,b)}return z},
ds:function(a){var z,y,x,w,v,u,t,s
z=J.p(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.u||!!J.p(a).$isc5){v=C.m(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.e.aH(w,0)===36)w=C.e.ci(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.h2(H.dS(a),0,null),init.mangledGlobalNames)},
cs:function(a){return"Instance of '"+H.ds(a)+"'"},
kB:function(a,b,c){var z,y,x,w
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(z=b,y="";z<c;z=x){x=z+500
w=x<c?x:c
y+=String.fromCharCode.apply(null,a.subarray(z,w))}return y},
a_:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
dr:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.h(H.O(a))
return a[b]},
f0:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.h(H.O(a))
a[b]=c},
eY:function(a,b,c){var z,y,x
z={}
z.a=0
y=[]
x=[]
z.a=b.length
C.c.G(y,b)
z.b=""
if(c!=null&&!c.ga1(c))c.U(0,new H.kz(z,y,x))
return J.hS(a,new H.jZ(C.F,""+"$"+z.a+z.b,0,y,x,null))},
ky:function(a,b){var z,y
z=b instanceof Array?b:P.b1(b,!0,null)
y=z.length
if(y===0){if(!!a.$0)return a.$0()}else if(y===1){if(!!a.$1)return a.$1(z[0])}else if(y===2){if(!!a.$2)return a.$2(z[0],z[1])}else if(y===3){if(!!a.$3)return a.$3(z[0],z[1],z[2])}else if(y===4){if(!!a.$4)return a.$4(z[0],z[1],z[2],z[3])}else if(y===5)if(!!a.$5)return a.$5(z[0],z[1],z[2],z[3],z[4])
return H.kx(a,z)},
kx:function(a,b){var z,y,x,w,v,u
z=b.length
y=a[""+"$"+z]
if(y==null){y=J.p(a)["call*"]
if(y==null)return H.eY(a,b,null)
x=H.f3(y)
w=x.d
v=w+x.e
if(x.f||w>z||v<z)return H.eY(a,b,null)
b=P.b1(b,!0,null)
for(u=z;u<v;++u)C.c.L(b,init.metadata[x.fz(0,u)])}return y.apply(a,b)},
m:function(a){throw H.h(H.O(a))},
a:function(a,b){if(a==null)J.bM(a)
throw H.h(H.Q(a,b))},
Q:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aB(!0,b,"index",null)
z=J.bM(a)
if(!(b<0)){if(typeof z!=="number")return H.m(z)
y=b>=z}else y=!0
if(y)return P.F(b,a,"index",null,z)
return P.ct(b,"index",null)},
O:function(a){return new P.aB(!0,a,null,null)},
mN:function(a){if(typeof a!=="number")throw H.h(H.O(a))
return a},
mO:function(a){if(typeof a!=="string")throw H.h(H.O(a))
return a},
h:function(a){var z
if(a==null)a=new P.cq()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.hh})
z.name=""}else z.toString=H.hh
return z},
hh:[function(){return J.aY(this.dartException)},null,null,0,0,null],
H:function(a){throw H.h(a)},
at:function(a){throw H.h(new P.av(a))},
W:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.nW(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.cQ(x,16)&8191)===10)switch(w){case 438:return z.$1(H.df(H.j(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.j(y)+" (Error "+w+")"
return z.$1(new H.eV(v,null))}}if(a instanceof TypeError){u=$.$get$ff()
t=$.$get$fg()
s=$.$get$fh()
r=$.$get$fi()
q=$.$get$fm()
p=$.$get$fn()
o=$.$get$fk()
$.$get$fj()
n=$.$get$fp()
m=$.$get$fo()
l=u.a2(y)
if(l!=null)return z.$1(H.df(y,l))
else{l=t.a2(y)
if(l!=null){l.method="call"
return z.$1(H.df(y,l))}else{l=s.a2(y)
if(l==null){l=r.a2(y)
if(l==null){l=q.a2(y)
if(l==null){l=p.a2(y)
if(l==null){l=o.a2(y)
if(l==null){l=r.a2(y)
if(l==null){l=n.a2(y)
if(l==null){l=m.a2(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eV(y,l==null?null:l.method))}}return z.$1(new H.ll(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.f9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aB(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.f9()
return a},
a1:function(a){var z
if(a==null)return new H.fF(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fF(a,null)},
nr:function(a){if(a==null||typeof a!='object')return J.a4(a)
else return H.aJ(a)},
n1:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
na:[function(a,b,c,d,e,f,g){switch(c){case 0:return H.c8(b,new H.nb(a))
case 1:return H.c8(b,new H.nc(a,d))
case 2:return H.c8(b,new H.nd(a,d,e))
case 3:return H.c8(b,new H.ne(a,d,e,f))
case 4:return H.c8(b,new H.nf(a,d,e,f,g))}throw H.h(P.bS("Unsupported number of arguments for wrapped closure"))},null,null,14,0,null,16,14,15,17,20,22,11],
ai:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.na)
a.$identity=z
return z},
iy:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isc){z.$reflectionInfo=c
x=H.f3(z).r}else x=c
w=d?Object.create(new H.kY().constructor.prototype):Object.create(new H.d3(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.am
$.am=J.K(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.ei(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.n3,x)
else if(u&&typeof x=="function"){q=t?H.ed:H.d4
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.h("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.ei(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
iv:function(a,b,c,d){var z=H.d4
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
ei:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ix(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.iv(y,!w,z,b)
if(y===0){w=$.am
$.am=J.K(w,1)
u="self"+H.j(w)
w="return function(){var "+u+" = this."
v=$.bh
if(v==null){v=H.cg("self")
$.bh=v}return new Function(w+H.j(v)+";return "+u+"."+H.j(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.am
$.am=J.K(w,1)
t+=H.j(w)
w="return function("+t+"){return this."
v=$.bh
if(v==null){v=H.cg("self")
$.bh=v}return new Function(w+H.j(v)+"."+H.j(z)+"("+t+");}")()},
iw:function(a,b,c,d){var z,y
z=H.d4
y=H.ed
switch(b?-1:a){case 0:throw H.h(new H.kL("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ix:function(a,b){var z,y,x,w,v,u,t,s
z=H.ih()
y=$.ec
if(y==null){y=H.cg("receiver")
$.ec=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.iw(w,!u,x,b)
if(w===1){y="return function(){return this."+H.j(z)+"."+H.j(x)+"(this."+H.j(y)+");"
u=$.am
$.am=J.K(u,1)
return new Function(y+H.j(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.j(z)+"."+H.j(x)+"(this."+H.j(y)+", "+s+");"
u=$.am
$.am=J.K(u,1)
return new Function(y+H.j(u)+"}")()},
dN:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isc){c.fixed$length=Array
z=c}else z=c
return H.iy(a,b,z,!!d,e,f)},
nx:function(a,b){var z=J.v(b)
throw H.h(H.im(H.ds(a),z.b_(b,3,z.gk(b))))},
bJ:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.p(a)[b]
else z=!0
if(z)return a
H.nx(a,b)},
nU:function(a){throw H.h(new P.iI("Cyclic initialization for static "+H.j(a)))},
aS:function(a,b,c){return new H.kM(a,b,c,null)},
fU:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.kO(z)
return new H.kN(z,b,null)},
bE:function(){return C.q},
cO:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
dR:function(a){return init.getIsolateTag(a)},
i:function(a,b){a.$ti=b
return a},
dS:function(a){if(a==null)return
return a.$ti},
fZ:function(a,b){return H.hg(a["$as"+H.j(b)],H.dS(a))},
a3:function(a,b,c){var z=H.fZ(a,b)
return z==null?null:z[c]},
bG:function(a,b){var z=H.dS(a)
return z==null?null:z[b]},
ha:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.h2(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.a.l(a)
else return},
h2:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cx("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.j(H.ha(u,c))}return w?"":"<"+z.l(0)+">"},
hg:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
mE:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aa(a[y],b[y]))return!1
return!0},
dO:function(a,b,c){return a.apply(b,H.fZ(b,c))},
aa:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.h0(a,b)
if('func' in a)return b.builtin$cls==="cj"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.ha(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+H.j(v)]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.mE(H.hg(u,z),x)},
fS:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.aa(z,v)||H.aa(v,z)))return!1}return!0},
mD:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.aa(v,u)||H.aa(u,v)))return!1}return!0},
h0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.aa(z,y)||H.aa(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fS(x,w,!1))return!1
if(!H.fS(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}}return H.mD(a.named,b.named)},
r7:function(a){var z=$.dT
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
r5:function(a){return H.aJ(a)},
r4:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
ni:function(a){var z,y,x,w,v,u
z=$.dT.$1(a)
y=$.cI[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cL[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.fR.$2(a,z)
if(z!=null){y=$.cI[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cL[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.dV(x)
$.cI[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cL[z]=x
return x}if(v==="-"){u=H.dV(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.h6(a,x)
if(v==="*")throw H.h(new P.dy(z))
if(init.leafTags[z]===true){u=H.dV(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.h6(a,x)},
h6:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cN(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
dV:function(a){return J.cN(a,!1,null,!!a.$isw)},
nm:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.cN(z,!1,null,!!z.$isw)
else return J.cN(z,c,null,null)},
n8:function(){if(!0===$.dU)return
$.dU=!0
H.n9()},
n9:function(){var z,y,x,w,v,u,t,s
$.cI=Object.create(null)
$.cL=Object.create(null)
H.n4()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.h7.$1(v)
if(u!=null){t=H.nm(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
n4:function(){var z,y,x,w,v,u,t
z=C.v()
z=H.ba(C.w,H.ba(C.x,H.ba(C.l,H.ba(C.l,H.ba(C.z,H.ba(C.y,H.ba(C.A(C.m),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dT=new H.n5(v)
$.fR=new H.n6(u)
$.h7=new H.n7(t)},
ba:function(a,b){return a(b)||b},
dX:function(a,b,c){var z,y,x
if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))},
iB:{"^":"fr;a,$ti",$asfr:I.U},
iA:{"^":"d;",
l:function(a){return P.dj(this)},
j:function(a,b,c){return H.iC()}},
iD:{"^":"iA;a,b,c,$ti",
gk:function(a){return this.a},
ak:function(a,b){if(typeof b!=="string")return!1
if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
h:function(a,b){if(!this.ak(0,b))return
return this.cw(b)},
cw:function(a){return this.b[a]},
U:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.cw(w))}}},
jZ:{"^":"d;a,b,c,d,e,f",
gdh:function(){return this.a},
gds:function(){var z,y,x,w
if(this.c===1)return C.f
z=this.d
y=z.length-this.e.length
if(y===0)return C.f
x=[]
for(w=0;w<y;++w){if(w>=z.length)return H.a(z,w)
x.push(z[w])}x.fixed$length=Array
x.immutable$list=Array
return x},
gdj:function(){var z,y,x,w,v,u,t,s,r
if(this.c!==0)return C.n
z=this.e
y=z.length
x=this.d
w=x.length-y
if(y===0)return C.n
v=P.c2
u=new H.Z(0,null,null,null,null,null,0,[v,null])
for(t=0;t<y;++t){if(t>=z.length)return H.a(z,t)
s=z[t]
r=w+t
if(r<0||r>=x.length)return H.a(x,r)
u.j(0,new H.dw(s),x[r])}return new H.iB(u,[v,null])}},
kK:{"^":"d;a,b,c,d,e,f,r,x",
fz:function(a,b){var z=this.d
if(typeof b!=="number")return b.P()
if(b<z)return
return this.b[3+b-z]},
v:{
f3:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.kK(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
kz:{"^":"l:13;a,b,c",
$2:function(a,b){var z=this.a
z.b=z.b+"$"+H.j(a)
this.c.push(a)
this.b.push(b);++z.a}},
lh:{"^":"d;a,b,c,d,e,f",
a2:function(a){var z,y,x
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
v:{
ar:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.lh(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cz:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fl:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eV:{"^":"T;a,b",
l:function(a){var z=this.b
if(z==null)return"NullError: "+H.j(this.a)
return"NullError: method not found: '"+H.j(z)+"' on null"}},
k5:{"^":"T;a,b,c",
l:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.j(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.j(z)+"' ("+H.j(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.j(z)+"' on '"+H.j(y)+"' ("+H.j(this.a)+")"},
v:{
df:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.k5(a,y,z?null:b.receiver)}}},
ll:{"^":"T;a",
l:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
nW:{"^":"l:0;a",
$1:function(a){if(!!J.p(a).$isT)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
fF:{"^":"d;a,b",
l:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
nb:{"^":"l:1;a",
$0:function(){return this.a.$0()}},
nc:{"^":"l:1;a,b",
$0:function(){return this.a.$1(this.b)}},
nd:{"^":"l:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ne:{"^":"l:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
nf:{"^":"l:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
l:{"^":"d;",
l:function(a){return"Closure '"+H.ds(this)+"'"},
gdF:function(){return this},
$iscj:1,
gdF:function(){return this}},
fd:{"^":"l;"},
kY:{"^":"fd;",
l:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
d3:{"^":"fd;a,b,c,d",
D:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.d3))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gJ:function(a){var z,y
z=this.c
if(z==null)y=H.aJ(this.a)
else y=typeof z!=="object"?J.a4(z):H.aJ(z)
return J.hl(y,H.aJ(this.b))},
l:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.j(this.d)+"' of "+H.cs(z)},
v:{
d4:function(a){return a.a},
ed:function(a){return a.c},
ih:function(){var z=$.bh
if(z==null){z=H.cg("self")
$.bh=z}return z},
cg:function(a){var z,y,x,w,v
z=new H.d3("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
il:{"^":"T;a",
l:function(a){return this.a},
v:{
im:function(a,b){return new H.il("CastError: Casting value of type "+H.j(a)+" to incompatible type "+H.j(b))}}},
kL:{"^":"T;a",
l:function(a){return"RuntimeError: "+H.j(this.a)}},
cw:{"^":"d;"},
kM:{"^":"cw;a,b,c,d",
a9:function(a){var z=this.eJ(a)
return z==null?!1:H.h0(z,this.a7())},
eJ:function(a){var z=J.p(a)
return"$signature" in z?z.$signature():null},
a7:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.p(y)
if(!!x.$isqB)z.v=true
else if(!x.$isek)z.ret=y.a7()
y=this.b
if(y!=null&&y.length!==0)z.args=H.f4(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.f4(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.fV(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].a7()}z.named=w}return z},
l:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.j(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.j(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.fV(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.j(z[s].a7())+" "+s}x+="}"}}return x+(") -> "+H.j(this.a))},
v:{
f4:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].a7())
return z}}},
ek:{"^":"cw;",
l:function(a){return"dynamic"},
a7:function(){return}},
kO:{"^":"cw;a",
a7:function(){var z,y
z=this.a
y=H.h3(z)
if(y==null)throw H.h("no type for '"+z+"'")
return y},
l:function(a){return this.a}},
kN:{"^":"cw;a,b,c",
a7:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.h3(z)]
if(0>=y.length)return H.a(y,0)
if(y[0]==null)throw H.h("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.at)(z),++w)y.push(z[w].a7())
this.c=y
return y},
l:function(a){var z=this.b
return this.a+"<"+(z&&C.c).he(z,", ")+">"}},
Z:{"^":"d;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
ga1:function(a){return this.a===0},
gaN:function(a){return new H.kf(this,[H.bG(this,0)])},
gaC:function(a){return H.cm(this.gaN(this),new H.k4(this),H.bG(this,0),H.bG(this,1))},
ak:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.cu(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.cu(y,b)}else return this.h8(b)},
h8:function(a){var z=this.d
if(z==null)return!1
return this.aM(this.b4(z,this.aL(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aG(z,b)
return y==null?null:y.gan()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aG(x,b)
return y==null?null:y.gan()}else return this.h9(b)},
h9:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.b4(z,this.aL(a))
x=this.aM(y,a)
if(x<0)return
return y[x].gan()},
j:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bA()
this.b=z}this.ck(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bA()
this.c=y}this.ck(y,b,c)}else{x=this.d
if(x==null){x=this.bA()
this.d=x}w=this.aL(b)
v=this.b4(x,w)
if(v==null)this.bC(x,w,[this.bB(b,c)])
else{u=this.aM(v,b)
if(u>=0)v[u].san(c)
else v.push(this.bB(b,c))}}},
aQ:function(a,b){if(typeof b==="string")return this.cK(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cK(this.c,b)
else return this.ha(b)},
ha:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.b4(z,this.aL(a))
x=this.aM(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cS(w)
return w.gan()},
ac:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
U:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.h(new P.av(this))
z=z.c}},
ck:function(a,b,c){var z=this.aG(a,b)
if(z==null)this.bC(a,b,this.bB(b,c))
else z.san(c)},
cK:function(a,b){var z
if(a==null)return
z=this.aG(a,b)
if(z==null)return
this.cS(z)
this.cv(a,b)
return z.gan()},
bB:function(a,b){var z,y
z=new H.ke(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cS:function(a){var z,y
z=a.geS()
y=a.geR()
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aL:function(a){return J.a4(a)&0x3ffffff},
aM:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.t(a[y].gdc(),b))return y
return-1},
l:function(a){return P.dj(this)},
aG:function(a,b){return a[b]},
b4:function(a,b){return a[b]},
bC:function(a,b,c){a[b]=c},
cv:function(a,b){delete a[b]},
cu:function(a,b){return this.aG(a,b)!=null},
bA:function(){var z=Object.create(null)
this.bC(z,"<non-identifier-key>",z)
this.cv(z,"<non-identifier-key>")
return z},
$isjM:1,
v:{
de:function(a,b){return new H.Z(0,null,null,null,null,null,0,[a,b])}}},
k4:{"^":"l:0;a",
$1:[function(a){return this.a.h(0,a)},null,null,2,0,null,12,"call"]},
ke:{"^":"d;dc:a<,an:b@,eR:c<,eS:d<"},
kf:{"^":"b;a,$ti",
gk:function(a){return this.a.a},
gM:function(a){var z,y
z=this.a
y=new H.kg(z,z.r,null,null)
y.c=z.e
return y}},
kg:{"^":"d;a,b,c,d",
gC:function(){return this.d},
B:function(){var z=this.a
if(this.b!==z.r)throw H.h(new P.av(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
n5:{"^":"l:0;a",
$1:function(a){return this.a(a)}},
n6:{"^":"l:14;a",
$2:function(a,b){return this.a(a,b)}},
n7:{"^":"l:15;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
fV:function(a){var z=H.i(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
ak:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
N:function(a){return a},
c9:function(a,b,c){c!=null},
ah:function(a){var z,y,x
if(!!J.p(a).$isr)return a
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<z;++x)y[x]=a[x]
return y},
eT:function(a,b,c){H.c9(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
eO:{"^":"f;",
f7:function(a,b,c){H.c9(a,b,c)
return new Int32Array(a,b,c)},
f6:function(a,b,c){H.c9(a,b,c)
return new DataView(a,b,c)},
$iseO:1,
$isbO:1,
"%":"ArrayBuffer"},
cp:{"^":"f;",$iscp:1,$isa6:1,"%":";ArrayBufferView;dn|eP|eR|dp|eQ|eS|aH"},
pa:{"^":"cp;",$isa6:1,"%":"DataView"},
dn:{"^":"cp;",
gk:function(a){return a.length},
$isw:1,
$asw:I.U,
$isr:1,
$asr:I.U},
dp:{"^":"eR;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
a[b]=c}},
eP:{"^":"dn+G;",$asw:I.U,$asr:I.U,
$asc:function(){return[P.x]},
$asb:function(){return[P.x]},
$isc:1,
$isb:1},
eR:{"^":"eP+er;",$asw:I.U,$asr:I.U,
$asc:function(){return[P.x]},
$asb:function(){return[P.x]}},
aH:{"^":"eS;",
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
a[b]=c},
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]}},
eQ:{"^":"dn+G;",$asw:I.U,$asr:I.U,
$asc:function(){return[P.q]},
$asb:function(){return[P.q]},
$isc:1,
$isb:1},
eS:{"^":"eQ+er;",$asw:I.U,$asr:I.U,
$asc:function(){return[P.q]},
$asb:function(){return[P.q]}},
pb:{"^":"dp;",$isb_:1,$isa6:1,$isc:1,
$asc:function(){return[P.x]},
$isb:1,
$asb:function(){return[P.x]},
"%":"Float32Array"},
pc:{"^":"dp;",$isa6:1,$isc:1,
$asc:function(){return[P.x]},
$isb:1,
$asb:function(){return[P.x]},
"%":"Float64Array"},
pd:{"^":"aH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Int16Array"},
pe:{"^":"aH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Int32Array"},
pf:{"^":"aH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Int8Array"},
pg:{"^":"aH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$isli:1,
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Uint16Array"},
ph:{"^":"aH;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$islj:1,
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"Uint32Array"},
pi:{"^":"aH;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
pj:{"^":"aH;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.H(H.Q(a,b))
return a[b]},
$isa6:1,
$isc:1,
$asc:function(){return[P.q]},
$isb:1,
$asb:function(){return[P.q]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
lu:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.mF()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ai(new P.lw(z),1)).observe(y,{childList:true})
return new P.lv(z,y,x)}else if(self.setImmediate!=null)return P.mG()
return P.mH()},
qG:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ai(new P.lx(a),0))},"$1","mF",2,0,4],
qH:[function(a){++init.globalState.f.b
self.setImmediate(H.ai(new P.ly(a),0))},"$1","mG",2,0,4],
qI:[function(a){P.dx(C.i,a)},"$1","mH",2,0,4],
ms:function(a,b,c){var z=H.bE()
if(H.aS(z,[z,z]).a9(a))return a.$2(b,c)
else return a.$1(b)},
fL:function(a,b){var z=H.bE()
if(H.aS(z,[z,z]).a9(a)){b.toString
return a}else{b.toString
return a}},
iV:function(a,b){var z=new P.a2(0,$.u,null,[b])
z.bq(a)
return z},
iU:function(a,b,c){var z
a=a!=null?a:new P.cq()
z=$.u
if(z!==C.d)z.toString
z=new P.a2(0,z,null,[c])
z.cm(a,b)
return z},
iW:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z={}
y=new P.a2(0,$.u,null,[P.c])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.iY(z,!1,b,y)
try{for(s=a.length,r=0;r<a.length;a.length===s||(0,H.at)(a),++r){w=a[r]
v=z.b
w.c6(new P.iX(z,!1,b,y,v),x);++z.b}s=z.b
if(s===0){s=new P.a2(0,$.u,null,[null])
s.bq(C.f)
return s}q=new Array(s)
q.fixed$length=Array
z.a=q}catch(p){s=H.W(p)
u=s
t=H.a1(p)
if(z.b===0||!1)return P.iU(u,t,null)
else{z.c=u
z.d=t}}return y},
mp:function(a,b,c){$.u.toString
a.a_(b,c)},
mu:function(){var z,y
for(;z=$.b8,z!=null;){$.by=null
y=z.b
$.b8=y
if(y==null)$.bx=null
z.a.$0()}},
r3:[function(){$.dJ=!0
try{P.mu()}finally{$.by=null
$.dJ=!1
if($.b8!=null)$.$get$dB().$1(P.fT())}},"$0","fT",0,0,2],
fP:function(a){var z=new P.fw(a,null)
if($.b8==null){$.bx=z
$.b8=z
if(!$.dJ)$.$get$dB().$1(P.fT())}else{$.bx.b=z
$.bx=z}},
my:function(a){var z,y,x
z=$.b8
if(z==null){P.fP(a)
$.by=$.bx
return}y=new P.fw(a,null)
x=$.by
if(x==null){y.b=z
$.by=y
$.b8=y}else{y.b=x.b
x.b=y
$.by=y
if(y.b==null)$.bx=y}},
hb:function(a){var z=$.u
if(C.d===z){P.b9(null,null,C.d,a)
return}z.toString
P.b9(null,null,z,z.bG(a,!0))},
r1:[function(a){},"$1","mI",2,0,29,3],
mv:[function(a,b){var z=$.u
z.toString
P.bz(null,null,z,a,b)},function(a){return P.mv(a,null)},"$2","$1","mK",2,2,5,4,1,2],
r2:[function(){},"$0","mJ",0,0,2],
ml:function(a,b,c){var z=a.bI(0)
if(!!J.p(z).$isax&&z!==$.$get$bT())z.c9(new P.mm(b,c))
else b.aF(c)},
fG:function(a,b,c){$.u.toString
a.aE(b,c)},
lc:function(a,b){var z=$.u
if(z===C.d){z.toString
return P.dx(a,b)}return P.dx(a,z.bG(b,!0))},
dx:function(a,b){var z=C.a.I(a.a,1000)
return H.l9(z<0?0:z,b)},
bz:function(a,b,c,d,e){var z={}
z.a=d
P.my(new P.mx(z,e))},
fM:function(a,b,c,d){var z,y
y=$.u
if(y===c)return d.$0()
$.u=c
z=y
try{y=d.$0()
return y}finally{$.u=z}},
fO:function(a,b,c,d,e){var z,y
y=$.u
if(y===c)return d.$1(e)
$.u=c
z=y
try{y=d.$1(e)
return y}finally{$.u=z}},
fN:function(a,b,c,d,e,f){var z,y
y=$.u
if(y===c)return d.$2(e,f)
$.u=c
z=y
try{y=d.$2(e,f)
return y}finally{$.u=z}},
b9:function(a,b,c,d){var z=C.d!==c
if(z)d=c.bG(d,!(!z||!1))
P.fP(d)},
lw:{"^":"l:0;a",
$1:[function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()},null,null,2,0,null,5,"call"]},
lv:{"^":"l:16;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
lx:{"^":"l:1;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
ly:{"^":"l:1;a",
$0:[function(){--init.globalState.f.b
this.a.$0()},null,null,0,0,null,"call"]},
ax:{"^":"d;$ti"},
iY:{"^":"l:17;a,b,c,d",
$2:[function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.a_(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.a_(z.c,z.d)},null,null,4,0,null,18,19,"call"]},
iX:{"^":"l:18;a,b,c,d,e",
$1:[function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.a(x,z)
x[z]=a
if(y===0)this.d.ct(x)}else if(z.b===0&&!this.b)this.d.a_(z.c,z.d)},null,null,2,0,null,3,"call"]},
lC:{"^":"d;$ti",
fj:[function(a,b){a=a!=null?a:new P.cq()
if(this.a.a!==0)throw H.h(new P.br("Future already completed"))
$.u.toString
this.a_(a,b)},function(a){return this.fj(a,null)},"bN",null,null,"gi0",2,2,null,4,1,2]},
dA:{"^":"lC;a,$ti",
bM:function(a,b){var z=this.a
if(z.a!==0)throw H.h(new P.br("Future already completed"))
z.bq(b)},
a_:function(a,b){this.a.cm(a,b)}},
fA:{"^":"d;aa:a@,K:b>,c,d,e",
gaw:function(){return this.b.b},
gda:function(){return(this.c&1)!==0},
gh3:function(){return(this.c&2)!==0},
gd9:function(){return this.c===8},
gh5:function(){return this.e!=null},
h1:function(a){return this.b.b.c4(this.d,a)},
hm:function(a){if(this.c!==6)return!0
return this.b.b.c4(this.d,J.bL(a))},
d8:function(a){var z,y,x,w
z=this.e
y=H.bE()
x=J.o(a)
w=this.b.b
if(H.aS(y,[y,y]).a9(z))return w.hz(z,x.gV(a),a.gaf())
else return w.c4(z,x.gV(a))},
h2:function(){return this.b.b.be(this.d)}},
a2:{"^":"d;ai:a<,aw:b<,av:c<,$ti",
geO:function(){return this.a===2},
gbz:function(){return this.a>=4},
geN:function(){return this.a===8},
eX:function(a){this.a=2
this.c=a},
c6:function(a,b){var z,y
z=$.u
if(z!==C.d){z.toString
if(b!=null)b=P.fL(b,z)}y=new P.a2(0,$.u,null,[null])
this.bn(new P.fA(null,y,b==null?1:3,a,b))
return y},
aS:function(a){return this.c6(a,null)},
c9:function(a){var z,y
z=$.u
y=new P.a2(0,z,null,this.$ti)
if(z!==C.d)z.toString
this.bn(new P.fA(null,y,8,a,null))
return y},
eZ:function(){this.a=1},
eD:function(){this.a=0},
gah:function(){return this.c},
geC:function(){return this.c},
f_:function(a){this.a=4
this.c=a},
eY:function(a){this.a=8
this.c=a},
cn:function(a){this.a=a.gai()
this.c=a.gav()},
bn:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbz()){y.bn(a)
return}this.a=y.gai()
this.c=y.gav()}z=this.b
z.toString
P.b9(null,null,z,new P.lL(this,a))}},
cJ:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gaa()!=null;)w=w.gaa()
w.saa(x)}}else{if(y===2){v=this.c
if(!v.gbz()){v.cJ(a)
return}this.a=v.gai()
this.c=v.gav()}z.a=this.cL(a)
y=this.b
y.toString
P.b9(null,null,y,new P.lT(z,this))}},
au:function(){var z=this.c
this.c=null
return this.cL(z)},
cL:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gaa()
z.saa(y)}return y},
aF:function(a){var z
if(!!J.p(a).$isax)P.cD(a,this)
else{z=this.au()
this.a=4
this.c=a
P.b6(this,z)}},
ct:function(a){var z=this.au()
this.a=4
this.c=a
P.b6(this,z)},
a_:[function(a,b){var z=this.au()
this.a=8
this.c=new P.ce(a,b)
P.b6(this,z)},function(a){return this.a_(a,null)},"hW","$2","$1","gbu",2,2,5,4,1,2],
bq:function(a){var z
if(!!J.p(a).$isax){if(a.a===8){this.a=1
z=this.b
z.toString
P.b9(null,null,z,new P.lN(this,a))}else P.cD(a,this)
return}this.a=1
z=this.b
z.toString
P.b9(null,null,z,new P.lO(this,a))},
cm:function(a,b){var z
this.a=1
z=this.b
z.toString
P.b9(null,null,z,new P.lM(this,a,b))},
$isax:1,
v:{
lP:function(a,b){var z,y,x,w
b.eZ()
try{a.c6(new P.lQ(b),new P.lR(b))}catch(x){w=H.W(x)
z=w
y=H.a1(x)
P.hb(new P.lS(b,z,y))}},
cD:function(a,b){var z
for(;a.geO();)a=a.geC()
if(a.gbz()){z=b.au()
b.cn(a)
P.b6(b,z)}else{z=b.gav()
b.eX(a)
a.cJ(z)}},
b6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z={}
z.a=a
for(y=a;!0;){x={}
w=y.geN()
if(b==null){if(w){v=z.a.gah()
y=z.a.gaw()
x=J.bL(v)
u=v.gaf()
y.toString
P.bz(null,null,y,x,u)}return}for(;b.gaa()!=null;b=t){t=b.gaa()
b.saa(null)
P.b6(z.a,b)}s=z.a.gav()
x.a=w
x.b=s
y=!w
if(!y||b.gda()||b.gd9()){r=b.gaw()
if(w){u=z.a.gaw()
u.toString
u=u==null?r==null:u===r
if(!u)r.toString
else u=!0
u=!u}else u=!1
if(u){v=z.a.gah()
y=z.a.gaw()
x=J.bL(v)
u=v.gaf()
y.toString
P.bz(null,null,y,x,u)
return}q=$.u
if(q==null?r!=null:q!==r)$.u=r
else q=null
if(b.gd9())new P.lW(z,x,w,b).$0()
else if(y){if(b.gda())new P.lV(x,b,s).$0()}else if(b.gh3())new P.lU(z,x,b).$0()
if(q!=null)$.u=q
y=x.b
u=J.p(y)
if(!!u.$isax){p=J.e2(b)
if(!!u.$isa2)if(y.a>=4){b=p.au()
p.cn(y)
z.a=y
continue}else P.cD(y,p)
else P.lP(y,p)
return}}p=J.e2(b)
b=p.au()
y=x.a
x=x.b
if(!y)p.f_(x)
else p.eY(x)
z.a=p
y=p}}}},
lL:{"^":"l:1;a,b",
$0:function(){P.b6(this.a,this.b)}},
lT:{"^":"l:1;a,b",
$0:function(){P.b6(this.b,this.a.a)}},
lQ:{"^":"l:0;a",
$1:[function(a){var z=this.a
z.eD()
z.aF(a)},null,null,2,0,null,3,"call"]},
lR:{"^":"l:19;a",
$2:[function(a,b){this.a.a_(a,b)},function(a){return this.$2(a,null)},"$1",null,null,null,2,2,null,4,1,2,"call"]},
lS:{"^":"l:1;a,b,c",
$0:[function(){this.a.a_(this.b,this.c)},null,null,0,0,null,"call"]},
lN:{"^":"l:1;a,b",
$0:function(){P.cD(this.b,this.a)}},
lO:{"^":"l:1;a,b",
$0:function(){this.a.ct(this.b)}},
lM:{"^":"l:1;a,b,c",
$0:function(){this.a.a_(this.b,this.c)}},
lW:{"^":"l:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.h2()}catch(w){v=H.W(w)
y=v
x=H.a1(w)
if(this.c){v=J.bL(this.a.a.gah())
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.gah()
else u.b=new P.ce(y,x)
u.a=!0
return}if(!!J.p(z).$isax){if(z instanceof P.a2&&z.gai()>=4){if(z.gai()===8){v=this.b
v.b=z.gav()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.aS(new P.lX(t))
v.a=!1}}},
lX:{"^":"l:0;a",
$1:[function(a){return this.a},null,null,2,0,null,5,"call"]},
lV:{"^":"l:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.h1(this.c)}catch(x){w=H.W(x)
z=w
y=H.a1(x)
w=this.a
w.b=new P.ce(z,y)
w.a=!0}}},
lU:{"^":"l:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.gah()
w=this.c
if(w.hm(z)===!0&&w.gh5()){v=this.b
v.b=w.d8(z)
v.a=!1}}catch(u){w=H.W(u)
y=w
x=H.a1(u)
w=this.a
v=J.bL(w.a.gah())
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.gah()
else s.b=new P.ce(y,x)
s.a=!0}}},
fw:{"^":"d;a,b"},
aq:{"^":"d;$ti",
aB:function(a,b){return new P.m8(b,this,[H.a3(this,"aq",0),null])},
fY:function(a,b){return new P.lY(a,b,this,[H.a3(this,"aq",0)])},
d8:function(a){return this.fY(a,null)},
gk:function(a){var z,y
z={}
y=new P.a2(0,$.u,null,[P.q])
z.a=0
this.aA(new P.l1(z),!0,new P.l2(z,y),y.gbu())
return y},
c7:function(a){var z,y,x
z=H.a3(this,"aq",0)
y=H.i([],[z])
x=new P.a2(0,$.u,null,[[P.c,z]])
this.aA(new P.l3(this,y),!0,new P.l4(y,x),x.gbu())
return x},
gbP:function(a){var z,y
z={}
y=new P.a2(0,$.u,null,[H.a3(this,"aq",0)])
z.a=null
z.a=this.aA(new P.l_(z,this,y),!0,new P.l0(y),y.gbu())
return y}},
l1:{"^":"l:0;a",
$1:[function(a){++this.a.a},null,null,2,0,null,5,"call"]},
l2:{"^":"l:1;a,b",
$0:[function(){this.b.aF(this.a.a)},null,null,0,0,null,"call"]},
l3:{"^":"l;a,b",
$1:[function(a){this.b.push(a)},null,null,2,0,null,9,"call"],
$signature:function(){return H.dO(function(a){return{func:1,args:[a]}},this.a,"aq")}},
l4:{"^":"l:1;a,b",
$0:[function(){this.b.aF(this.a)},null,null,0,0,null,"call"]},
l_:{"^":"l;a,b,c",
$1:[function(a){P.ml(this.a.a,this.c,a)},null,null,2,0,null,3,"call"],
$signature:function(){return H.dO(function(a){return{func:1,args:[a]}},this.b,"aq")}},
l0:{"^":"l:1;a",
$0:[function(){var z,y,x,w
try{x=H.db()
throw H.h(x)}catch(w){x=H.W(w)
z=x
y=H.a1(w)
P.mp(this.a,z,y)}},null,null,0,0,null,"call"]},
kZ:{"^":"d;"},
qd:{"^":"d;"},
qO:{"^":"d;"},
lz:{"^":"d;aw:d<,ai:e<",
bX:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.cZ()
if((z&4)===0&&(this.e&32)===0)this.cA(this.gcF())},
dr:function(a){return this.bX(a,null)},
dv:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga1(z)}else z=!1
if(z)this.r.bk(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cA(this.gcH())}}}},
bI:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.br()
z=this.f
return z==null?$.$get$bT():z},
gbR:function(){return this.e>=128},
br:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.cZ()
if((this.e&32)===0)this.r=null
this.f=this.cE()},
bp:["ed",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cN(b)
else this.bo(new P.lD(b,null,[null]))}],
aE:["ee",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cP(a,b)
else this.bo(new P.lF(a,b,null))}],
eE:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cO()
else this.bo(C.t)},
cG:[function(){},"$0","gcF",0,0,2],
cI:[function(){},"$0","gcH",0,0,2],
cE:function(){return},
bo:function(a){var z,y
z=this.r
if(z==null){z=new P.mh(null,null,0,[null])
this.r=z}z.L(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bk(this)}},
cN:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.c5(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bs((z&4)!==0)},
cP:function(a,b){var z,y,x
z=this.e
y=new P.lB(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.br()
z=this.f
if(!!J.p(z).$isax){x=$.$get$bT()
x=z==null?x!=null:z!==x}else x=!1
if(x)z.c9(y)
else y.$0()}else{y.$0()
this.bs((z&4)!==0)}},
cO:function(){var z,y,x
z=new P.lA(this)
this.br()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.p(y).$isax){x=$.$get$bT()
x=y==null?x!=null:y!==x}else x=!1
if(x)y.c9(z)
else z.$0()},
cA:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bs((z&4)!==0)},
bs:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga1(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga1(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cG()
else this.cI()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bk(this)},
ex:function(a,b,c,d){var z,y
z=a==null?P.mI():a
y=this.d
y.toString
this.a=z
this.b=P.fL(b==null?P.mK():b,y)
this.c=c==null?P.mJ():c}},
lB:{"^":"l:2;a,b,c",
$0:[function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aS(H.bE(),[H.fU(P.d),H.fU(P.c1)]).a9(y)
w=z.d
v=this.b
u=z.b
if(x)w.hA(u,v,this.c)
else w.c5(u,v)
z.e=(z.e&4294967263)>>>0},null,null,0,0,null,"call"]},
lA:{"^":"l:2;a",
$0:[function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dA(z.c)
z.e=(z.e&4294967263)>>>0},null,null,0,0,null,"call"]},
fy:{"^":"d;bc:a*"},
lD:{"^":"fy;b,a,$ti",
bY:function(a){a.cN(this.b)}},
lF:{"^":"fy;V:b>,af:c<,a",
bY:function(a){a.cP(this.b,this.c)}},
lE:{"^":"d;",
bY:function(a){a.cO()},
gbc:function(a){return},
sbc:function(a,b){throw H.h(new P.br("No events after a done."))}},
ma:{"^":"d;ai:a<",
bk:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.hb(new P.mb(this,a))
this.a=1},
cZ:function(){if(this.a===1)this.a=3}},
mb:{"^":"l:1;a,b",
$0:[function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gbc(x)
z.b=w
if(w==null)z.c=null
x.bY(this.b)},null,null,0,0,null,"call"]},
mh:{"^":"ma;b,c,a,$ti",
ga1:function(a){return this.c==null},
L:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sbc(0,b)
this.c=b}}},
mm:{"^":"l:1;a,b",
$0:[function(){return this.a.aF(this.b)},null,null,0,0,null,"call"]},
c6:{"^":"aq;$ti",
aA:function(a,b,c,d){return this.eG(a,d,c,!0===b)},
df:function(a,b,c){return this.aA(a,null,b,c)},
eG:function(a,b,c,d){return P.lK(this,a,b,c,d,H.a3(this,"c6",0),H.a3(this,"c6",1))},
cB:function(a,b){b.bp(0,a)},
cC:function(a,b,c){c.aE(a,b)},
$asaq:function(a,b){return[b]}},
fz:{"^":"lz;x,y,a,b,c,d,e,f,r,$ti",
bp:function(a,b){if((this.e&2)!==0)return
this.ed(0,b)},
aE:function(a,b){if((this.e&2)!==0)return
this.ee(a,b)},
cG:[function(){var z=this.y
if(z==null)return
z.dr(0)},"$0","gcF",0,0,2],
cI:[function(){var z=this.y
if(z==null)return
z.dv(0)},"$0","gcH",0,0,2],
cE:function(){var z=this.y
if(z!=null){this.y=null
return z.bI(0)}return},
hX:[function(a){this.x.cB(a,this)},"$1","geK",2,0,function(){return H.dO(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fz")},9],
hZ:[function(a,b){this.x.cC(a,b,this)},"$2","geM",4,0,20,1,2],
hY:[function(){this.eE()},"$0","geL",0,0,2],
ey:function(a,b,c,d,e,f,g){this.y=this.x.a.df(this.geK(),this.geL(),this.geM())},
v:{
lK:function(a,b,c,d,e,f,g){var z,y
z=$.u
y=e?1:0
y=new P.fz(a,null,null,null,null,z,y,null,null,[f,g])
y.ex(b,c,d,e)
y.ey(a,b,c,d,e,f,g)
return y}}},
m8:{"^":"c6;b,a,$ti",
cB:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.W(w)
y=v
x=H.a1(w)
P.fG(b,y,x)
return}b.bp(0,z)}},
lY:{"^":"c6;b,c,a,$ti",
cC:function(a,b,c){var z,y,x,w,v
z=!0
if(z===!0)try{P.ms(this.b,a,b)}catch(w){v=H.W(w)
y=v
x=H.a1(w)
v=y
if(v==null?a==null:v===a)c.aE(a,b)
else P.fG(c,y,x)
return}else c.aE(a,b)},
$asc6:function(a){return[a,a]},
$asaq:null},
ce:{"^":"d;V:a>,af:b<",
l:function(a){return H.j(this.a)},
$isT:1},
mj:{"^":"d;"},
mx:{"^":"l:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cq()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.h(z)
x=H.h(z)
x.stack=J.aY(y)
throw x}},
md:{"^":"mj;",
dA:function(a){var z,y,x,w
try{if(C.d===$.u){x=a.$0()
return x}x=P.fM(null,null,this,a)
return x}catch(w){x=H.W(w)
z=x
y=H.a1(w)
return P.bz(null,null,this,z,y)}},
c5:function(a,b){var z,y,x,w
try{if(C.d===$.u){x=a.$1(b)
return x}x=P.fO(null,null,this,a,b)
return x}catch(w){x=H.W(w)
z=x
y=H.a1(w)
return P.bz(null,null,this,z,y)}},
hA:function(a,b,c){var z,y,x,w
try{if(C.d===$.u){x=a.$2(b,c)
return x}x=P.fN(null,null,this,a,b,c)
return x}catch(w){x=H.W(w)
z=x
y=H.a1(w)
return P.bz(null,null,this,z,y)}},
bG:function(a,b){if(b)return new P.me(this,a)
else return new P.mf(this,a)},
fc:function(a,b){return new P.mg(this,a)},
h:function(a,b){return},
be:function(a){if($.u===C.d)return a.$0()
return P.fM(null,null,this,a)},
c4:function(a,b){if($.u===C.d)return a.$1(b)
return P.fO(null,null,this,a,b)},
hz:function(a,b,c){if($.u===C.d)return a.$2(b,c)
return P.fN(null,null,this,a,b,c)}},
me:{"^":"l:1;a,b",
$0:function(){return this.a.dA(this.b)}},
mf:{"^":"l:1;a,b",
$0:function(){return this.a.be(this.b)}},
mg:{"^":"l:0;a,b",
$1:[function(a){return this.a.c5(this.b,a)},null,null,2,0,null,33,"call"]}}],["","",,P,{"^":"",
cl:function(){return new H.Z(0,null,null,null,null,null,0,[null,null])},
bk:function(a){return H.n1(a,new H.Z(0,null,null,null,null,null,0,[null,null]))},
jU:function(a,b,c){var z,y
if(P.dK(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bA()
y.push(a)
try{P.mt(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.fa(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bi:function(a,b,c){var z,y,x
if(P.dK(a))return b+"..."+c
z=new P.cx(b)
y=$.$get$bA()
y.push(a)
try{x=z
x.sa0(P.fa(x.ga0(),a,", "))}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.sa0(y.ga0()+c)
y=z.ga0()
return y.charCodeAt(0)==0?y:y},
dK:function(a){var z,y
for(z=0;y=$.$get$bA(),z<y.length;++z)if(a===y[z])return!0
return!1},
mt:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gM(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.B())return
w=H.j(z.gC())
b.push(w)
y+=w.length+2;++x}if(!z.B()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gC();++x
if(!z.B()){if(x<=4){b.push(H.j(t))
return}v=H.j(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gC();++x
for(;z.B();t=s,s=r){r=z.gC();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.j(t)
v=H.j(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
bl:function(a,b,c,d){return new P.m1(0,null,null,null,null,null,0,[d])},
dj:function(a){var z,y,x
z={}
if(P.dK(a))return"{...}"
y=new P.cx("")
try{$.$get$bA().push(a)
x=y
x.sa0(x.ga0()+"{")
z.a=!0
a.U(0,new P.kk(z,y))
z=y
z.sa0(z.ga0()+"}")}finally{z=$.$get$bA()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.ga0()
return z.charCodeAt(0)==0?z:z},
fE:{"^":"Z;a,b,c,d,e,f,r,$ti",
aL:function(a){return H.nr(a)&0x3ffffff},
aM:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdc()
if(x==null?b==null:x===b)return y}return-1},
v:{
bw:function(a,b){return new P.fE(0,null,null,null,null,null,0,[a,b])}}},
m1:{"^":"lZ;a,b,c,d,e,f,r,$ti",
gM:function(a){var z=new P.fD(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
aI:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eF(b)},
eF:function(a){var z=this.d
if(z==null)return!1
return this.b3(z[this.b1(a)],a)>=0},
dg:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.aI(0,a)?a:null
else return this.eP(a)},
eP:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.b1(a)]
x=this.b3(y,a)
if(x<0)return
return J.e(y,x).gbv()},
L:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.co(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.co(x,b)}else return this.a8(0,b)},
a8:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.m3()
this.d=z}y=this.b1(b)
x=z[y]
if(x==null)z[y]=[this.bt(b)]
else{if(this.b3(x,b)>=0)return!1
x.push(this.bt(b))}return!0},
aQ:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cr(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cr(this.c,b)
else return this.eU(0,b)},
eU:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.b1(b)]
x=this.b3(y,b)
if(x<0)return!1
this.cs(y.splice(x,1)[0])
return!0},
ac:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
co:function(a,b){if(a[b]!=null)return!1
a[b]=this.bt(b)
return!0},
cr:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cs(z)
delete a[b]
return!0},
bt:function(a){var z,y
z=new P.m2(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cs:function(a){var z,y
z=a.gcq()
y=a.gcp()
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.scq(z);--this.a
this.r=this.r+1&67108863},
b1:function(a){return J.a4(a)&0x3ffffff},
b3:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.t(a[y].gbv(),b))return y
return-1},
$isb:1,
$asb:null,
v:{
m3:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
m2:{"^":"d;bv:a<,cp:b<,cq:c@"},
fD:{"^":"d;a,b,c,d",
gC:function(){return this.d},
B:function(){var z=this.a
if(this.b!==z.r)throw H.h(new P.av(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.gbv()
this.c=this.c.gcp()
return!0}}}},
lZ:{"^":"kP;$ti"},
G:{"^":"d;$ti",
gM:function(a){return new H.eC(a,this.gk(a),0,null)},
A:function(a,b){return this.h(a,b)},
aB:function(a,b){return new H.cn(a,b,[null,null])},
l:function(a){return P.bi(a,"[","]")},
$isc:1,
$asc:null,
$isb:1,
$asb:null},
mi:{"^":"d;",
j:function(a,b,c){throw H.h(new P.y("Cannot modify unmodifiable map"))}},
ki:{"^":"d;",
h:function(a,b){return this.a.h(0,b)},
j:function(a,b,c){this.a.j(0,b,c)},
U:function(a,b){this.a.U(0,b)},
gk:function(a){var z=this.a
return z.gk(z)},
l:function(a){return this.a.l(0)}},
fr:{"^":"ki+mi;$ti"},
kk:{"^":"l:6;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.j(a)
z.a=y+": "
z.a+=H.j(b)}},
kh:{"^":"bZ;a,b,c,d,$ti",
gM:function(a){return new P.m4(this,this.c,this.d,this.b,null)},
ga1:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
A:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.m(b)
if(0>b||b>=z)H.H(P.F(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
ac:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
l:function(a){return P.bi(this,"{","}")},
du:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.h(H.db());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
a8:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cz();++this.d},
cz:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.i(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.ce(y,0,w,z,x)
C.c.ce(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ek:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.i(z,[b])},
$asb:null,
v:{
di:function(a,b){var z=new P.kh(null,0,0,0,[b])
z.ek(a,b)
return z}}},
m4:{"^":"d;a,b,c,d,e",
gC:function(){return this.e},
B:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.H(new P.av(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
kQ:{"^":"d;$ti",
aB:function(a,b){return new H.el(this,b,[H.bG(this,0),null])},
l:function(a){return P.bi(this,"{","}")},
$isb:1,
$asb:null},
kP:{"^":"kQ;$ti"}}],["","",,P,{"^":"",
cF:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.m0(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.cF(a[z])
return a},
mw:function(a,b){var z,y,x,w
z=null
try{z=JSON.parse(a)}catch(x){w=H.W(x)
y=w
throw H.h(new P.d8(String(y),null,null))}return P.cF(z)},
m0:{"^":"d;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.eT(b):y}},
gk:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.b2().length
return z},
ga1:function(a){var z
if(this.b==null){z=this.c
z=z.gk(z)}else z=this.b2().length
return z===0},
j:function(a,b,c){var z,y
if(this.b==null)this.c.j(0,b,c)
else if(this.ak(0,b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.f1().j(0,b,c)},
ak:function(a,b){if(this.b==null)return this.c.ak(0,b)
if(typeof b!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,b)},
U:function(a,b){var z,y,x,w
if(this.b==null)return this.c.U(0,b)
z=this.b2()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.cF(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.h(new P.av(this))}},
l:function(a){return P.dj(this)},
b2:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
f1:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.cl()
y=this.b2()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.j(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.c.sk(y,0)
this.b=null
this.a=null
this.c=z
return z},
eT:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.cF(this.a[a])
return this.b[a]=z}},
iz:{"^":"d;"},
iE:{"^":"d;"},
k7:{"^":"iz;a,b",
fu:function(a,b){return P.mw(a,this.gfw().a)},
ft:function(a){return this.fu(a,null)},
gfw:function(){return C.D}},
k8:{"^":"iE;a"}}],["","",,P,{"^":"",
bR:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aY(a)
if(typeof a==="string")return JSON.stringify(a)
return P.iQ(a)},
iQ:function(a){var z=J.p(a)
if(!!z.$isl)return z.l(a)
return H.cs(a)},
bS:function(a){return new P.lJ(a)},
b1:function(a,b,c){var z,y
z=H.i([],[c])
for(y=J.be(a);y.B();)z.push(y.gC())
if(b)return z
z.fixed$length=Array
return z},
a5:function(a,b,c,d){var z,y,x
z=H.i([],[d])
C.c.sk(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
ab:function(a){var z=H.j(a)
H.ak(z)},
fb:function(a,b,c){return H.kB(a,b,P.cu(b,c,a.length,null,null,null))},
kr:{"^":"l:21;a,b",
$2:function(a,b){var z,y,x
z=this.b
y=this.a
z.a+=y.a
x=z.a+=H.j(a.geQ())
z.a=x+": "
z.a+=H.j(P.bR(b))
y.a=", "}},
cG:{"^":"d;"},
"+bool":0,
ci:{"^":"d;a,b",
D:function(a,b){if(b==null)return!1
if(!(b instanceof P.ci))return!1
return this.a===b.a&&this.b===b.b},
gJ:function(a){var z=this.a
return(z^C.b.cQ(z,30))&1073741823},
l:function(a){var z,y,x,w,v,u,t,s
z=this.b
y=P.iK(z?H.a_(this).getUTCFullYear()+0:H.a_(this).getFullYear()+0)
x=P.bP(z?H.a_(this).getUTCMonth()+1:H.a_(this).getMonth()+1)
w=P.bP(z?H.a_(this).getUTCDate()+0:H.a_(this).getDate()+0)
v=P.bP(z?H.a_(this).getUTCHours()+0:H.a_(this).getHours()+0)
u=P.bP(z?H.a_(this).getUTCMinutes()+0:H.a_(this).getMinutes()+0)
t=P.bP(z?H.a_(this).getUTCSeconds()+0:H.a_(this).getSeconds()+0)
s=P.iL(z?H.a_(this).getUTCMilliseconds()+0:H.a_(this).getMilliseconds()+0)
if(z)return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s+"Z"
else return y+"-"+x+"-"+w+" "+v+":"+u+":"+t+"."+s},
ghn:function(){return this.a},
cj:function(a,b){var z=Math.abs(this.a)
if(!(z>864e13)){z===864e13
z=!1}else z=!0
if(z)throw H.h(P.aC(this.ghn()))},
v:{
iK:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.j(z)
if(z>=10)return y+"00"+H.j(z)
return y+"000"+H.j(z)},
iL:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bP:function(a){if(a>=10)return""+a
return"0"+a}}},
x:{"^":"bb;"},
"+double":0,
aw:{"^":"d;at:a<",
H:function(a,b){return new P.aw(this.a+b.gat())},
E:function(a,b){return new P.aw(this.a-b.gat())},
X:function(a,b){if(typeof b!=="number")return H.m(b)
return new P.aw(C.b.c3(this.a*b))},
ag:function(a,b){if(b===0)throw H.h(new P.j4())
return new P.aw(C.a.ag(this.a,b))},
P:function(a,b){return this.a<b.gat()},
O:function(a,b){return this.a>b.gat()},
aX:function(a,b){return C.a.aX(this.a,b.gat())},
bg:function(a,b){return C.a.bg(this.a,b.gat())},
D:function(a,b){if(b==null)return!1
if(!(b instanceof P.aw))return!1
return this.a===b.a},
gJ:function(a){return this.a&0x1FFFFFFF},
l:function(a){var z,y,x,w,v
z=new P.iP()
y=this.a
if(y<0)return"-"+new P.aw(-y).l(0)
x=z.$1(C.a.c0(C.a.I(y,6e7),60))
w=z.$1(C.a.c0(C.a.I(y,1e6),60))
v=new P.iO().$1(C.a.c0(y,1e6))
return""+C.a.I(y,36e8)+":"+H.j(x)+":"+H.j(w)+"."+H.j(v)},
cU:function(a){return new P.aw(Math.abs(this.a))},
bj:function(a){return new P.aw(-this.a)}},
iO:{"^":"l:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
iP:{"^":"l:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
T:{"^":"d;",
gaf:function(){return H.a1(this.$thrownJsError)}},
cq:{"^":"T;",
l:function(a){return"Throw of null."}},
aB:{"^":"T;a,b,c,d",
gbx:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbw:function(){return""},
l:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.j(z)+")":""
z=this.d
x=z==null?"":": "+H.j(z)
w=this.gbx()+y+x
if(!this.a)return w
v=this.gbw()
u=P.bR(this.b)
return w+v+": "+H.j(u)},
v:{
aC:function(a){return new P.aB(!1,null,null,a)},
e8:function(a,b,c){return new P.aB(!0,a,b,c)},
i3:function(a){return new P.aB(!1,null,a,"Must not be null")}}},
f2:{"^":"aB;e,f,a,b,c,d",
gbx:function(){return"RangeError"},
gbw:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.j(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.j(z)
else{if(typeof x!=="number")return x.O()
if(typeof z!=="number")return H.m(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
v:{
ct:function(a,b,c){return new P.f2(null,null,!0,a,b,"Value not in range")},
ay:function(a,b,c,d,e){return new P.f2(b,c,!0,a,d,"Invalid value")},
cu:function(a,b,c,d,e,f){if(0>a||a>c)throw H.h(P.ay(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.h(P.ay(b,a,c,"end",f))
return b}return c}}},
j3:{"^":"aB;e,k:f>,a,b,c,d",
gbx:function(){return"RangeError"},
gbw:function(){if(J.X(this.b,0))return": index must not be negative"
var z=this.f
if(J.t(z,0))return": no indices are valid"
return": index should be less than "+H.j(z)},
v:{
F:function(a,b,c,d,e){var z=e!=null?e:J.bM(b)
return new P.j3(b,z,!0,a,c,"Index out of range")}}},
kq:{"^":"T;a,b,c,d,e",
l:function(a){var z,y,x,w,v,u,t,s
z={}
y=new P.cx("")
z.a=""
for(x=this.c,w=x.length,v=0;v<w;++v){u=x[v]
y.a+=z.a
y.a+=H.j(P.bR(u))
z.a=", "}this.d.U(0,new P.kr(z,y))
t=P.bR(this.a)
s=y.l(0)
return"NoSuchMethodError: method not found: '"+H.j(this.b.a)+"'\nReceiver: "+H.j(t)+"\nArguments: ["+s+"]"},
v:{
eU:function(a,b,c,d,e){return new P.kq(a,b,c,d,e)}}},
y:{"^":"T;a",
l:function(a){return"Unsupported operation: "+this.a}},
dy:{"^":"T;a",
l:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.j(z):"UnimplementedError"}},
br:{"^":"T;a",
l:function(a){return"Bad state: "+this.a}},
av:{"^":"T;a",
l:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.j(P.bR(z))+"."}},
ks:{"^":"d;",
l:function(a){return"Out of Memory"},
gaf:function(){return},
$isT:1},
f9:{"^":"d;",
l:function(a){return"Stack Overflow"},
gaf:function(){return},
$isT:1},
iI:{"^":"T;a",
l:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
lJ:{"^":"d;a",
l:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.j(z)}},
d8:{"^":"d;a,b,c",
l:function(a){var z,y,x
z=""!==this.a?"FormatException: "+this.a:"FormatException"
y=this.b
if(typeof y!=="string")return z
x=J.v(y)
if(J.af(x.gk(y),78))y=x.b_(y,0,75)+"..."
return z+"\n"+H.j(y)}},
j4:{"^":"d;",
l:function(a){return"IntegerDivisionByZeroException"}},
iR:{"^":"d;a,b",
l:function(a){return"Expando:"+H.j(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.H(P.e8(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.dr(b,"expando$values")
return y==null?null:H.dr(y,z)},
j:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.dr(b,"expando$values")
if(y==null){y=new P.d()
H.f0(b,"expando$values",y)}H.f0(y,z,c)}}},
cj:{"^":"d;"},
q:{"^":"bb;"},
"+int":0,
an:{"^":"d;$ti",
aB:function(a,b){return H.cm(this,b,H.a3(this,"an",0),null)},
c8:function(a,b){return P.b1(this,!0,H.a3(this,"an",0))},
c7:function(a){return this.c8(a,!0)},
gk:function(a){var z,y
z=this.gM(this)
for(y=0;z.B();)++y
return y},
A:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(P.i3("index"))
if(b<0)H.H(P.ay(b,0,null,"index",null))
for(z=this.gM(this),y=0;z.B();){x=z.gC()
if(b===y)return x;++y}throw H.h(P.F(b,this,"index",null,y))},
l:function(a){return P.jU(this,"(",")")}},
jW:{"^":"d;"},
c:{"^":"d;$ti",$asc:null,$isb:1,$asb:null},
"+List":0,
bm:{"^":"d;$ti"},
pn:{"^":"d;",
l:function(a){return"null"}},
"+Null":0,
bb:{"^":"d;"},
"+num":0,
d:{"^":";",
D:function(a,b){return this===b},
gJ:function(a){return H.aJ(this)},
l:["ec",function(a){return H.cs(this)}],
bU:function(a,b){throw H.h(P.eU(this,b.gdh(),b.gds(),b.gdj(),null))},
toString:function(){return this.l(this)}},
c1:{"^":"d;"},
D:{"^":"d;"},
"+String":0,
cx:{"^":"d;a0:a@",
gk:function(a){return this.a.length},
l:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
v:{
fa:function(a,b,c){var z=J.be(b)
if(!z.B())return a
if(c.length===0){do a+=H.j(z.gC())
while(z.B())}else{a+=H.j(z.gC())
for(;z.B();)a=a+c+H.j(z.gC())}return a}}},
c2:{"^":"d;"}}],["","",,W,{"^":"",
et:function(a,b,c){var z,y
z=document
y=z.createElement("img")
return y},
aR:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fB:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
fH:function(a){var z
if(!!J.p(a).$isej)return a
z=new P.fv([],[],!1)
z.c=!0
return z.bf(a)},
a7:function(a){var z=$.u
if(z===C.d)return a
if(a==null)return
return z.fc(a,!0)},
E:{"^":"bQ;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLMapElement|HTMLMarqueeElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOptGroupElement|HTMLOptionElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
o0:{"^":"E;n:type=",
l:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
o2:{"^":"E;",
l:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
o4:{"^":"f;b8:enabled=","%":"AudioTrack"},
o5:{"^":"B;k:length=","%":"AudioTrackList"},
cf:{"^":"f;n:type=",$iscf:1,"%":";Blob"},
o7:{"^":"E;",
gbW:function(a){return new W.b5(a,"load",!1,[W.ad])},
$isf:1,
"%":"HTMLBodyElement"},
o8:{"^":"E;n:type=","%":"HTMLButtonElement"},
eg:{"^":"E;t:height%,u:width%",
dI:function(a,b,c){return a.getContext(b)},
ca:function(a,b){return this.dI(a,b,null)},
$iseg:1,
"%":"HTMLCanvasElement"},
o9:{"^":"f;fS:fillStyle}","%":"CanvasRenderingContext2D"},
oa:{"^":"z;k:length=",$isf:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
ob:{"^":"B;",$isf:1,"%":"CompositorWorker"},
oc:{"^":"f;n:type=","%":"Credential|FederatedCredential|PasswordCredential"},
od:{"^":"ad;a4:client=","%":"CrossOriginConnectEvent"},
oe:{"^":"f;n:type=","%":"CryptoKey"},
aD:{"^":"f;n:type=",$isd:1,"%":"CSSCharsetRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
of:{"^":"j5;k:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
j5:{"^":"f+iH;"},
iH:{"^":"d;"},
iJ:{"^":"f;n:type=",$isiJ:1,$isd:1,"%":"DataTransferItem"},
og:{"^":"f;k:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
oh:{"^":"f;p:x=,q:y=","%":"DeviceAcceleration"},
ej:{"^":"z;",$isej:1,"%":"Document|HTMLDocument|XMLDocument"},
oi:{"^":"z;",$isf:1,"%":"DocumentFragment|ShadowRoot"},
oj:{"^":"f;",
l:function(a){return String(a)},
"%":"DOMException"},
ok:{"^":"f;",
hU:function(a,b,c,d){return a.scale(b,c,d)},
F:function(a,b){return a.scale(b)},
"%":"DOMMatrix|DOMMatrixReadOnly"},
ol:{"^":"iM;",
gp:function(a){return a.x},
gq:function(a){return a.y},
"%":"DOMPoint"},
iM:{"^":"f;",
gp:function(a){return a.x},
gq:function(a){return a.y},
"%":";DOMPointReadOnly"},
iN:{"^":"f;",
l:function(a){return"Rectangle ("+H.j(a.left)+", "+H.j(a.top)+") "+H.j(this.gu(a))+" x "+H.j(this.gt(a))},
D:function(a,b){var z
if(b==null)return!1
z=J.p(b)
if(!z.$isa0)return!1
return a.left===z.gaO(b)&&a.top===z.gaT(b)&&this.gu(a)===z.gu(b)&&this.gt(a)===z.gt(b)},
gJ:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gu(a)
w=this.gt(a)
return W.fB(W.aR(W.aR(W.aR(W.aR(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gbH:function(a){return a.bottom},
gt:function(a){return a.height},
gaO:function(a){return a.left},
gc1:function(a){return a.right},
gaT:function(a){return a.top},
gu:function(a){return a.width},
gp:function(a){return a.x},
gq:function(a){return a.y},
$isa0:1,
$asa0:I.U,
"%":";DOMRectReadOnly"},
om:{"^":"jr;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.item(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.D]},
$isb:1,
$asb:function(){return[P.D]},
"%":"DOMStringList"},
j6:{"^":"f+G;",
$asc:function(){return[P.D]},
$asb:function(){return[P.D]},
$isc:1,
$isb:1},
jr:{"^":"j6+M;",
$asc:function(){return[P.D]},
$asb:function(){return[P.D]},
$isc:1,
$isb:1},
on:{"^":"f;k:length=","%":"DOMSettableTokenList|DOMTokenList"},
bQ:{"^":"z;",
ga4:function(a){return P.kJ(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
bE:function(a,b,c){throw H.h(P.aC("The frames parameter should be a List of Maps with frame information"))},
ab:function(a,b){return this.bE(a,b,null)},
l:function(a){return a.localName},
gdk:function(a){return new W.b5(a,"contextmenu",!1,[W.ap])},
gdl:function(a){return new W.b5(a,"dragstart",!1,[W.ap])},
gbW:function(a){return new W.b5(a,"load",!1,[W.ad])},
$isbQ:1,
$isz:1,
$isd:1,
$isf:1,
"%":";Element"},
oo:{"^":"E;t:height%,a3:src%,n:type=,u:width%","%":"HTMLEmbedElement"},
op:{"^":"ad;V:error=","%":"ErrorEvent"},
ad:{"^":"f;n:type=",
dt:function(a){return a.preventDefault()},
$isad:1,
$isd:1,
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
B:{"^":"f;",
eB:function(a,b,c,d){return a.addEventListener(b,H.ai(c,1),!1)},
eV:function(a,b,c,d){return a.removeEventListener(b,H.ai(c,1),!1)},
"%":"Animation|ApplicationCache|BatteryManager|CrossOriginServiceWorkerClient|DOMApplicationCache|EventSource|FontFaceSet|IDBDatabase|MIDIAccess|MediaController|MediaKeySession|MediaQueryList|MediaSource|Notification|OfflineResourceList|Performance|PermissionStatus|Presentation|PresentationAvailability|RTCDTMFSender|RTCPeerConnection|ServicePortCollection|ServiceWorkerContainer|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StashedPortCollection|WorkerPerformance|mozRTCPeerConnection|webkitRTCPeerConnection;EventTarget;em|eo|en|ep"},
oI:{"^":"E;n:type=","%":"HTMLFieldSetElement"},
aE:{"^":"cf;",$isd:1,"%":"File"},
oJ:{"^":"js;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aE]},
$isr:1,
$asr:function(){return[W.aE]},
$isc:1,
$asc:function(){return[W.aE]},
$isb:1,
$asb:function(){return[W.aE]},
"%":"FileList"},
j7:{"^":"f+G;",
$asc:function(){return[W.aE]},
$asb:function(){return[W.aE]},
$isc:1,
$isb:1},
js:{"^":"j7+M;",
$asc:function(){return[W.aE]},
$asb:function(){return[W.aE]},
$isc:1,
$isb:1},
oK:{"^":"B;V:error=",
gK:function(a){var z=a.result
if(!!J.p(z).$isbO)return H.eT(z,0,null)
return z},
"%":"FileReader"},
oL:{"^":"f;n:type=","%":"Stream"},
oM:{"^":"B;V:error=,k:length=","%":"FileWriter"},
iT:{"^":"f;aP:loaded=",$isiT:1,$isd:1,"%":"FontFace"},
oP:{"^":"E;k:length=","%":"HTMLFormElement"},
aF:{"^":"f;",$isd:1,"%":"Gamepad"},
oQ:{"^":"f;k:length=","%":"History"},
oR:{"^":"jt;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.z]},
$isb:1,
$asb:function(){return[W.z]},
$isw:1,
$asw:function(){return[W.z]},
$isr:1,
$asr:function(){return[W.z]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
j8:{"^":"f+G;",
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isc:1,
$isb:1},
jt:{"^":"j8+M;",
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isc:1,
$isb:1},
j0:{"^":"j1;",
i2:function(a,b,c,d,e,f){return a.open(b,c,d,f,e)},
dm:function(a,b,c){return a.open(b,c)},
ad:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
j1:{"^":"B;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
oS:{"^":"E;t:height%,a3:src%,u:width%","%":"HTMLIFrameElement"},
d9:{"^":"f;",$isd9:1,"%":"ImageData"},
es:{"^":"E;t:height%,a3:src%,u:width%",$ises:1,"%":"HTMLImageElement"},
oU:{"^":"E;t:height%,a3:src%,n:type=,u:width%",$isf:1,$isz:1,"%":"HTMLInputElement"},
ck:{"^":"fq;",
ghf:function(a){return a.keyCode},
$isck:1,
$isd:1,
"%":"KeyboardEvent"},
oX:{"^":"E;n:type=","%":"HTMLKeygenElement"},
oZ:{"^":"E;n:type=","%":"HTMLLinkElement"},
p_:{"^":"f;",
l:function(a){return String(a)},
"%":"Location"},
km:{"^":"E;V:error=,a3:src%","%":"HTMLAudioElement;HTMLMediaElement"},
p2:{"^":"f;k:length=","%":"MediaList"},
p3:{"^":"B;b5:active=","%":"MediaStream"},
p4:{"^":"B;b8:enabled=","%":"MediaStreamTrack"},
p5:{"^":"E;n:type=","%":"HTMLMenuElement"},
p6:{"^":"E;n:type=","%":"HTMLMenuItemElement"},
dm:{"^":"B;",$isdm:1,$isd:1,"%":";MessagePort"},
p7:{"^":"ko;",
hV:function(a,b,c){return a.send(b,c)},
ad:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
ko:{"^":"B;n:type=","%":"MIDIInput;MIDIPort"},
aG:{"^":"f;n:type=",$isd:1,"%":"MimeType"},
p8:{"^":"jE;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aG]},
$isr:1,
$asr:function(){return[W.aG]},
$isc:1,
$asc:function(){return[W.aG]},
$isb:1,
$asb:function(){return[W.aG]},
"%":"MimeTypeArray"},
jj:{"^":"f+G;",
$asc:function(){return[W.aG]},
$asb:function(){return[W.aG]},
$isc:1,
$isb:1},
jE:{"^":"jj+M;",
$asc:function(){return[W.aG]},
$asb:function(){return[W.aG]},
$isc:1,
$isb:1},
ap:{"^":"fq;cY:button=",
ga4:function(a){return new P.b3(a.clientX,a.clientY,[null])},
gdi:function(a){return new P.b3(a.movementX,a.movementY,[null])},
$isap:1,
$isd:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
p9:{"^":"f;n:type=","%":"MutationRecord"},
pk:{"^":"f;",$isf:1,"%":"Navigator"},
pl:{"^":"B;n:type=","%":"NetworkInformation"},
z:{"^":"B;",
l:function(a){var z=a.nodeValue
return z==null?this.e8(a):z},
$isz:1,
$isd:1,
"%":"Attr;Node"},
pm:{"^":"jF;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.z]},
$isb:1,
$asb:function(){return[W.z]},
$isw:1,
$asw:function(){return[W.z]},
$isr:1,
$asr:function(){return[W.z]},
"%":"NodeList|RadioNodeList"},
jk:{"^":"f+G;",
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isc:1,
$isb:1},
jF:{"^":"jk+M;",
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isc:1,
$isb:1},
pp:{"^":"E;n:type=","%":"HTMLOListElement"},
pq:{"^":"E;t:height%,n:type=,u:width%","%":"HTMLObjectElement"},
ps:{"^":"E;n:type=","%":"HTMLOutputElement"},
pt:{"^":"f;",$isf:1,"%":"Path2D"},
pO:{"^":"f;n:type=","%":"PerformanceNavigation"},
aI:{"^":"f;k:length=",$isd:1,"%":"Plugin"},
pP:{"^":"jG;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.aI]},
$isb:1,
$asb:function(){return[W.aI]},
$isw:1,
$asw:function(){return[W.aI]},
$isr:1,
$asr:function(){return[W.aI]},
"%":"PluginArray"},
jl:{"^":"f+G;",
$asc:function(){return[W.aI]},
$asb:function(){return[W.aI]},
$isc:1,
$isb:1},
jG:{"^":"jl+M;",
$asc:function(){return[W.aI]},
$asb:function(){return[W.aI]},
$isc:1,
$isb:1},
pS:{"^":"B;",
ad:function(a,b){return a.send(b)},
"%":"PresentationSession"},
f1:{"^":"ad;aP:loaded=","%":"ProgressEvent|ResourceProgressEvent|XMLHttpRequestProgressEvent"},
pY:{"^":"B;",
ad:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
pZ:{"^":"f;n:type=","%":"RTCSessionDescription|mozRTCSessionDescription"},
du:{"^":"f;n:type=",$isdu:1,$isd:1,"%":"RTCStatsReport"},
q_:{"^":"f;",
i3:[function(a){return a.result()},"$0","gK",0,0,22],
"%":"RTCStatsResponse"},
q0:{"^":"B;n:type=","%":"ScreenOrientation"},
q1:{"^":"E;a3:src%,n:type=","%":"HTMLScriptElement"},
q3:{"^":"E;k:length=,n:type=","%":"HTMLSelectElement"},
q4:{"^":"f;n:type=","%":"Selection"},
q5:{"^":"B;b5:active=","%":"ServiceWorkerRegistration"},
q6:{"^":"B;",$isf:1,"%":"SharedWorker"},
aK:{"^":"B;",$isd:1,"%":"SourceBuffer"},
q7:{"^":"eo;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.aK]},
$isb:1,
$asb:function(){return[W.aK]},
$isw:1,
$asw:function(){return[W.aK]},
$isr:1,
$asr:function(){return[W.aK]},
"%":"SourceBufferList"},
em:{"^":"B+G;",
$asc:function(){return[W.aK]},
$asb:function(){return[W.aK]},
$isc:1,
$isb:1},
eo:{"^":"em+M;",
$asc:function(){return[W.aK]},
$asb:function(){return[W.aK]},
$isc:1,
$isb:1},
q8:{"^":"E;a3:src%,n:type=","%":"HTMLSourceElement"},
aL:{"^":"f;",$isd:1,"%":"SpeechGrammar"},
q9:{"^":"jH;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.aL]},
$isb:1,
$asb:function(){return[W.aL]},
$isw:1,
$asw:function(){return[W.aL]},
$isr:1,
$asr:function(){return[W.aL]},
"%":"SpeechGrammarList"},
jm:{"^":"f+G;",
$asc:function(){return[W.aL]},
$asb:function(){return[W.aL]},
$isc:1,
$isb:1},
jH:{"^":"jm+M;",
$asc:function(){return[W.aL]},
$asb:function(){return[W.aL]},
$isc:1,
$isb:1},
qa:{"^":"ad;V:error=","%":"SpeechRecognitionError"},
aM:{"^":"f;k:length=",$isd:1,"%":"SpeechRecognitionResult"},
kX:{"^":"dm;",$iskX:1,$isdm:1,$isd:1,"%":"StashedMessagePort"},
qc:{"^":"f;",
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
gk:function(a){return a.length},
"%":"Storage"},
qf:{"^":"E;n:type=","%":"HTMLStyleElement"},
qh:{"^":"f;n:type=","%":"StyleMedia"},
aN:{"^":"f;n:type=",$isd:1,"%":"CSSStyleSheet|StyleSheet"},
qk:{"^":"E;n:type=","%":"HTMLTextAreaElement"},
aO:{"^":"B;",$isd:1,"%":"TextTrack"},
aP:{"^":"B;",$isd:1,"%":"TextTrackCue|VTTCue"},
qn:{"^":"jI;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aP]},
$isr:1,
$asr:function(){return[W.aP]},
$isc:1,
$asc:function(){return[W.aP]},
$isb:1,
$asb:function(){return[W.aP]},
"%":"TextTrackCueList"},
jn:{"^":"f+G;",
$asc:function(){return[W.aP]},
$asb:function(){return[W.aP]},
$isc:1,
$isb:1},
jI:{"^":"jn+M;",
$asc:function(){return[W.aP]},
$asb:function(){return[W.aP]},
$isc:1,
$isb:1},
qo:{"^":"ep;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aO]},
$isr:1,
$asr:function(){return[W.aO]},
$isc:1,
$asc:function(){return[W.aO]},
$isb:1,
$asb:function(){return[W.aO]},
"%":"TextTrackList"},
en:{"^":"B+G;",
$asc:function(){return[W.aO]},
$asb:function(){return[W.aO]},
$isc:1,
$isb:1},
ep:{"^":"en+M;",
$asc:function(){return[W.aO]},
$asb:function(){return[W.aO]},
$isc:1,
$isb:1},
qp:{"^":"f;k:length=","%":"TimeRanges"},
aQ:{"^":"f;",
ga4:function(a){return new P.b3(C.b.c3(a.clientX),C.b.c3(a.clientY),[null])},
$isd:1,
"%":"Touch"},
qq:{"^":"jJ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.aQ]},
$isb:1,
$asb:function(){return[W.aQ]},
$isw:1,
$asw:function(){return[W.aQ]},
$isr:1,
$asr:function(){return[W.aQ]},
"%":"TouchList"},
jo:{"^":"f+G;",
$asc:function(){return[W.aQ]},
$asb:function(){return[W.aQ]},
$isc:1,
$isb:1},
jJ:{"^":"jo+M;",
$asc:function(){return[W.aQ]},
$asb:function(){return[W.aQ]},
$isc:1,
$isb:1},
qr:{"^":"f;n:type=","%":"TrackDefault"},
qs:{"^":"f;k:length=","%":"TrackDefaultList"},
qt:{"^":"E;a3:src%","%":"HTMLTrackElement"},
fq:{"^":"ad;","%":"CompositionEvent|FocusEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
qw:{"^":"f;",
l:function(a){return String(a)},
$isf:1,
"%":"URL"},
ft:{"^":"km;t:height%,u:width%",$isft:1,"%":"HTMLVideoElement"},
qy:{"^":"B;k:length=","%":"VideoTrackList"},
qC:{"^":"f;k:length=","%":"VTTRegionList"},
qD:{"^":"B;",
ad:function(a,b){return a.send(b)},
"%":"WebSocket"},
cB:{"^":"B;",
eW:function(a,b){return a.requestAnimationFrame(H.ai(b,1))},
eI:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$iscB:1,
$isf:1,
"%":"DOMWindow|Window"},
qE:{"^":"B;",$isf:1,"%":"Worker"},
qF:{"^":"B;",$isf:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope|SharedWorkerGlobalScope|WorkerGlobalScope"},
qJ:{"^":"f;bH:bottom=,t:height=,aO:left=,c1:right=,aT:top=,u:width=",
l:function(a){return"Rectangle ("+H.j(a.left)+", "+H.j(a.top)+") "+H.j(a.width)+" x "+H.j(a.height)},
D:function(a,b){var z,y,x
if(b==null)return!1
z=J.p(b)
if(!z.$isa0)return!1
y=a.left
x=z.gaO(b)
if(y==null?x==null:y===x){y=a.top
x=z.gaT(b)
if(y==null?x==null:y===x){y=a.width
x=z.gu(b)
if(y==null?x==null:y===x){y=a.height
z=z.gt(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gJ:function(a){var z,y,x,w
z=J.a4(a.left)
y=J.a4(a.top)
x=J.a4(a.width)
w=J.a4(a.height)
return W.fB(W.aR(W.aR(W.aR(W.aR(0,z),y),x),w))},
$isa0:1,
$asa0:I.U,
"%":"ClientRect"},
qK:{"^":"jK;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.item(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.a0]},
$isb:1,
$asb:function(){return[P.a0]},
"%":"ClientRectList|DOMRectList"},
jp:{"^":"f+G;",
$asc:function(){return[P.a0]},
$asb:function(){return[P.a0]},
$isc:1,
$isb:1},
jK:{"^":"jp+M;",
$asc:function(){return[P.a0]},
$asb:function(){return[P.a0]},
$isc:1,
$isb:1},
qL:{"^":"jL;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.aD]},
$isb:1,
$asb:function(){return[W.aD]},
$isw:1,
$asw:function(){return[W.aD]},
$isr:1,
$asr:function(){return[W.aD]},
"%":"CSSRuleList"},
jq:{"^":"f+G;",
$asc:function(){return[W.aD]},
$asb:function(){return[W.aD]},
$isc:1,
$isb:1},
jL:{"^":"jq+M;",
$asc:function(){return[W.aD]},
$asb:function(){return[W.aD]},
$isc:1,
$isb:1},
qM:{"^":"z;",$isf:1,"%":"DocumentType"},
qN:{"^":"iN;",
gt:function(a){return a.height},
gu:function(a){return a.width},
gp:function(a){return a.x},
gq:function(a){return a.y},
"%":"DOMRect"},
qP:{"^":"ju;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aF]},
$isr:1,
$asr:function(){return[W.aF]},
$isc:1,
$asc:function(){return[W.aF]},
$isb:1,
$asb:function(){return[W.aF]},
"%":"GamepadList"},
j9:{"^":"f+G;",
$asc:function(){return[W.aF]},
$asb:function(){return[W.aF]},
$isc:1,
$isb:1},
ju:{"^":"j9+M;",
$asc:function(){return[W.aF]},
$asb:function(){return[W.aF]},
$isc:1,
$isb:1},
qR:{"^":"E;",$isf:1,"%":"HTMLFrameSetElement"},
qS:{"^":"jv;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.z]},
$isb:1,
$asb:function(){return[W.z]},
$isw:1,
$asw:function(){return[W.z]},
$isr:1,
$asr:function(){return[W.z]},
"%":"MozNamedAttrMap|NamedNodeMap"},
ja:{"^":"f+G;",
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isc:1,
$isb:1},
jv:{"^":"ja+M;",
$asc:function(){return[W.z]},
$asb:function(){return[W.z]},
$isc:1,
$isb:1},
qW:{"^":"B;",$isf:1,"%":"ServiceWorker"},
qX:{"^":"jw;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isc:1,
$asc:function(){return[W.aM]},
$isb:1,
$asb:function(){return[W.aM]},
$isw:1,
$asw:function(){return[W.aM]},
$isr:1,
$asr:function(){return[W.aM]},
"%":"SpeechRecognitionResultList"},
jb:{"^":"f+G;",
$asc:function(){return[W.aM]},
$asb:function(){return[W.aM]},
$isc:1,
$isb:1},
jw:{"^":"jb+M;",
$asc:function(){return[W.aM]},
$asb:function(){return[W.aM]},
$isc:1,
$isb:1},
qY:{"^":"jx;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isw:1,
$asw:function(){return[W.aN]},
$isr:1,
$asr:function(){return[W.aN]},
$isc:1,
$asc:function(){return[W.aN]},
$isb:1,
$asb:function(){return[W.aN]},
"%":"StyleSheetList"},
jc:{"^":"f+G;",
$asc:function(){return[W.aN]},
$asb:function(){return[W.aN]},
$isc:1,
$isb:1},
jx:{"^":"jc+M;",
$asc:function(){return[W.aN]},
$asb:function(){return[W.aN]},
$isc:1,
$isb:1},
r_:{"^":"f;",$isf:1,"%":"WorkerLocation"},
r0:{"^":"f;",$isf:1,"%":"WorkerNavigator"},
lI:{"^":"aq;a,b,c,$ti",
aA:function(a,b,c,d){var z=new W.ae(0,this.a,this.b,W.a7(a),!1,this.$ti)
z.S()
return z},
df:function(a,b,c){return this.aA(a,null,b,c)}},
b5:{"^":"lI;a,b,c,$ti"},
ae:{"^":"kZ;a,b,c,d,e,$ti",
bI:function(a){if(this.b==null)return
this.cT()
this.b=null
this.d=null
return},
bX:function(a,b){if(this.b==null)return;++this.a
this.cT()},
dr:function(a){return this.bX(a,null)},
gbR:function(){return this.a>0},
dv:function(a){if(this.b==null||this.a<=0)return;--this.a
this.S()},
S:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.hn(x,this.c,z,!1)}},
cT:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.ho(x,this.c,z,!1)}}},
M:{"^":"d;$ti",
gM:function(a){return new W.iS(a,this.gk(a),-1,null)},
$isc:1,
$asc:null,
$isb:1,
$asb:null},
iS:{"^":"d;a,b,c,d",
B:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.e(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gC:function(){return this.d}}}],["","",,P,{"^":"",
mV:function(a){return a},
mZ:function(a){var z,y,x,w,v
if(a==null)return
z=P.cl()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.at)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
mW:function(a){var z,y
z=new P.a2(0,$.u,null,[null])
y=new P.dA(z,[null])
a.then(H.ai(new P.mX(y),1))["catch"](H.ai(new P.mY(y),1))
return z},
ls:{"^":"d;",
d7:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
bf:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
z=new P.ci(y,!0)
z.cj(y,!0)
return z}if(a instanceof RegExp)throw H.h(new P.dy("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.mW(a)
x=Object.getPrototypeOf(a)
if(x===Object.prototype||x===null){w=this.d7(a)
v=this.b
u=v.length
if(w>=u)return H.a(v,w)
t=v[w]
z.a=t
if(t!=null)return t
t=P.cl()
z.a=t
if(w>=u)return H.a(v,w)
v[w]=t
this.fU(a,new P.lt(z,this))
return z.a}if(a instanceof Array){w=this.d7(a)
z=this.b
if(w>=z.length)return H.a(z,w)
t=z[w]
if(t!=null)return t
v=J.v(a)
s=v.gk(a)
t=this.c?new Array(s):a
if(w>=z.length)return H.a(z,w)
z[w]=t
if(typeof s!=="number")return H.m(s)
z=J.a9(t)
r=0
for(;r<s;++r)z.j(t,r,this.bf(v.h(a,r)))
return t}return a}},
lt:{"^":"l:6;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.bf(b)
J.R(z,a,y)
return y}},
fv:{"^":"ls;a,b,c",
fU:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.at)(z),++x){w=z[x]
b.$2(w,a[w])}}},
mX:{"^":"l:0;a",
$1:[function(a){return this.a.bM(0,a)},null,null,2,0,null,10,"call"]},
mY:{"^":"l:0;a",
$1:[function(a){return this.a.bN(a)},null,null,2,0,null,10,"call"]}}],["","",,P,{"^":"",j2:{"^":"f;",$isj2:1,$isd:1,"%":"IDBIndex"},dg:{"^":"f;",$isdg:1,"%":"IDBKeyRange"},pX:{"^":"B;V:error=",
gK:function(a){var z,y
z=a.result
y=new P.fv([],[],!1)
y.c=!1
return y.bf(z)},
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},qu:{"^":"B;V:error=","%":"IDBTransaction"}}],["","",,P,{"^":"",
mk:[function(a,b,c,d){var z,y
if(b===!0){z=[c]
C.c.G(z,d)
d=z}y=P.b1(J.e3(d,P.ng()),!0,null)
return P.dF(H.ky(a,y))},null,null,8,0,null,23,24,25,26],
dH:function(a,b,c){var z
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(z){H.W(z)}return!1},
fK:function(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return},
dF:[function(a){var z
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=J.p(a)
if(!!z.$isbY)return a.a
if(!!z.$iscf||!!z.$isad||!!z.$isdg||!!z.$isd9||!!z.$isz||!!z.$isa6||!!z.$iscB)return a
if(!!z.$isci)return H.a_(a)
if(!!z.$iscj)return P.fJ(a,"$dart_jsFunction",new P.mq())
return P.fJ(a,"_$dart_jsObject",new P.mr($.$get$dG()))},"$1","nh",2,0,0,6],
fJ:function(a,b,c){var z=P.fK(a,b)
if(z==null){z=c.$1(a)
P.dH(a,b,z)}return z},
fI:[function(a){var z,y
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else{if(a instanceof Object){z=J.p(a)
z=!!z.$iscf||!!z.$isad||!!z.$isdg||!!z.$isd9||!!z.$isz||!!z.$isa6||!!z.$iscB}else z=!1
if(z)return a
else if(a instanceof Date){y=a.getTime()
z=new P.ci(y,!1)
z.cj(y,!1)
return z}else if(a.constructor===$.$get$dG())return a.o
else return P.fQ(a)}},"$1","ng",2,0,30,6],
fQ:function(a){if(typeof a=="function")return P.dI(a,$.$get$ch(),new P.mz())
if(a instanceof Array)return P.dI(a,$.$get$dC(),new P.mA())
return P.dI(a,$.$get$dC(),new P.mB())},
dI:function(a,b,c){var z=P.fK(a,b)
if(z==null||!(a instanceof Object)){z=c.$1(a)
P.dH(a,b,z)}return z},
bY:{"^":"d;a",
h:["ea",function(a,b){if(typeof b!=="string"&&typeof b!=="number")throw H.h(P.aC("property is not a String or num"))
return P.fI(this.a[b])}],
j:["eb",function(a,b,c){if(typeof b!=="string"&&typeof b!=="number")throw H.h(P.aC("property is not a String or num"))
this.a[b]=P.dF(c)}],
gJ:function(a){return 0},
D:function(a,b){if(b==null)return!1
return b instanceof P.bY&&this.a===b.a},
b9:function(a){return a in this.a},
l:function(a){var z,y
try{z=String(this.a)
return z}catch(y){H.W(y)
return this.ec(this)}},
fe:function(a,b){var z,y
z=this.a
y=b==null?null:P.b1(new H.cn(b,P.nh(),[null,null]),!0,null)
return P.fI(z[a].apply(z,y))},
b6:function(a){return this.fe(a,null)},
v:{
ez:function(a){if(a==null)throw H.h(P.aC("object cannot be a num, string, bool, or null"))
return P.fQ(P.dF(a))}}},
k3:{"^":"bY;a"},
k2:{"^":"k6;a,$ti",
h:function(a,b){var z
if(typeof b==="number"&&b===C.b.dC(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gk(this)
else z=!1
if(z)H.H(P.ay(b,0,this.gk(this),null,null))}return this.ea(0,b)},
j:function(a,b,c){var z
if(typeof b==="number"&&b===C.b.dC(b)){if(typeof b==="number"&&Math.floor(b)===b)z=b<0||b>=this.gk(this)
else z=!1
if(z)H.H(P.ay(b,0,this.gk(this),null,null))}this.eb(0,b,c)},
gk:function(a){var z=this.a.length
if(typeof z==="number"&&z>>>0===z)return z
throw H.h(new P.br("Bad JsArray length"))}},
k6:{"^":"bY+G;",$asc:null,$asb:null,$isc:1,$isb:1},
mq:{"^":"l:0;",
$1:function(a){var z=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(P.mk,a,!1)
P.dH(z,$.$get$ch(),a)
return z}},
mr:{"^":"l:0;a",
$1:function(a){return new this.a(a)}},
mz:{"^":"l:0;",
$1:function(a){return new P.k3(a)}},
mA:{"^":"l:0;",
$1:function(a){return new P.k2(a,[null])}},
mB:{"^":"l:0;",
$1:function(a){return new P.bY(a)}}}],["","",,P,{"^":"",
bv:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fC:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
nn:function(a,b){if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0&&C.b.gbb(a))return b
return a},
b3:{"^":"d;p:a>,q:b>,$ti",
l:function(a){return"Point("+H.j(this.a)+", "+H.j(this.b)+")"},
D:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.b3))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gJ:function(a){var z,y
z=J.a4(this.a)
y=J.a4(this.b)
return P.fC(P.bv(P.bv(0,z),y))},
H:function(a,b){var z,y,x,w
z=this.a
y=J.o(b)
x=y.gp(b)
if(typeof z!=="number")return z.H()
if(typeof x!=="number")return H.m(x)
w=this.b
y=y.gq(b)
if(typeof w!=="number")return w.H()
if(typeof y!=="number")return H.m(y)
return new P.b3(z+x,w+y,this.$ti)},
E:function(a,b){var z,y,x,w
z=this.a
y=J.o(b)
x=y.gp(b)
if(typeof z!=="number")return z.E()
if(typeof x!=="number")return H.m(x)
w=this.b
y=y.gq(b)
if(typeof w!=="number")return w.E()
if(typeof y!=="number")return H.m(y)
return new P.b3(z-x,w-y,this.$ti)},
X:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.X()
if(typeof b!=="number")return H.m(b)
y=this.b
if(typeof y!=="number")return y.X()
return new P.b3(z*b,y*b,this.$ti)}},
mc:{"^":"d;$ti",
gc1:function(a){var z,y
z=this.a
y=this.c
if(typeof z!=="number")return z.H()
if(typeof y!=="number")return H.m(y)
return z+y},
gbH:function(a){var z,y
z=this.b
y=this.d
if(typeof z!=="number")return z.H()
if(typeof y!=="number")return H.m(y)
return z+y},
l:function(a){return"Rectangle ("+H.j(this.a)+", "+H.j(this.b)+") "+H.j(this.c)+" x "+H.j(this.d)},
D:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.p(b)
if(!z.$isa0)return!1
y=this.a
x=z.gaO(b)
if(y==null?x==null:y===x){x=this.b
w=z.gaT(b)
if(x==null?w==null:x===w){w=this.c
if(typeof y!=="number")return y.H()
if(typeof w!=="number")return H.m(w)
if(y+w===z.gc1(b)){y=this.d
if(typeof x!=="number")return x.H()
if(typeof y!=="number")return H.m(y)
z=x+y===z.gbH(b)}else z=!1}else z=!1}else z=!1
return z},
gJ:function(a){var z,y,x,w,v,u
z=this.a
y=J.a4(z)
x=this.b
w=J.a4(x)
v=this.c
if(typeof z!=="number")return z.H()
if(typeof v!=="number")return H.m(v)
u=this.d
if(typeof x!=="number")return x.H()
if(typeof u!=="number")return H.m(u)
return P.fC(P.bv(P.bv(P.bv(P.bv(0,y),w),z+v&0x1FFFFFFF),x+u&0x1FFFFFFF))}},
a0:{"^":"mc;aO:a>,aT:b>,u:c>,t:d>,$ti",$asa0:null,v:{
kJ:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.P()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.P()
if(d<0)y=-d*0
else y=d
return new P.a0(a,b,z,y,[e])}}}}],["","",,P,{"^":"",nZ:{"^":"b0;",$isf:1,"%":"SVGAElement"},o1:{"^":"A;",$isf:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},oq:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEBlendElement"},or:{"^":"A;n:type=,t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEColorMatrixElement"},os:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEComponentTransferElement"},ot:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFECompositeElement"},ou:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEConvolveMatrixElement"},ov:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEDiffuseLightingElement"},ow:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",
F:function(a,b){return a.scale.$1(b)},
$isf:1,
"%":"SVGFEDisplacementMapElement"},ox:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEFloodElement"},oy:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEGaussianBlurElement"},oz:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEImageElement"},oA:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEMergeElement"},oB:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEMorphologyElement"},oC:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFEOffsetElement"},oD:{"^":"A;p:x=,q:y=","%":"SVGFEPointLightElement"},oE:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFESpecularLightingElement"},oF:{"^":"A;p:x=,q:y=","%":"SVGFESpotLightElement"},oG:{"^":"A;t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFETileElement"},oH:{"^":"A;n:type=,t:height=,K:result=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFETurbulenceElement"},oN:{"^":"A;t:height=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGFilterElement"},oO:{"^":"b0;t:height=,u:width=,p:x=,q:y=","%":"SVGForeignObjectElement"},iZ:{"^":"b0;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},b0:{"^":"A;",$isf:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},oT:{"^":"b0;t:height=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGImageElement"},bj:{"^":"f;",$isd:1,"%":"SVGLength"},oY:{"^":"jy;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.bj]},
$isb:1,
$asb:function(){return[P.bj]},
"%":"SVGLengthList"},jd:{"^":"f+G;",
$asc:function(){return[P.bj]},
$asb:function(){return[P.bj]},
$isc:1,
$isb:1},jy:{"^":"jd+M;",
$asc:function(){return[P.bj]},
$asb:function(){return[P.bj]},
$isc:1,
$isb:1},p0:{"^":"A;",$isf:1,"%":"SVGMarkerElement"},p1:{"^":"A;t:height=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGMaskElement"},kl:{"^":"f;",
F:function(a,b){return a.scale(b)},
$iskl:1,
$isd:1,
"%":"SVGMatrix"},bq:{"^":"f;",$isd:1,"%":"SVGNumber"},po:{"^":"jz;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.bq]},
$isb:1,
$asb:function(){return[P.bq]},
"%":"SVGNumberList"},je:{"^":"f+G;",
$asc:function(){return[P.bq]},
$asb:function(){return[P.bq]},
$isc:1,
$isb:1},jz:{"^":"je+M;",
$asc:function(){return[P.bq]},
$asb:function(){return[P.bq]},
$isc:1,
$isb:1},J:{"^":"f;",$isd:1,"%":"SVGPathSegClosePath;SVGPathSeg"},pu:{"^":"J;p:x=,q:y=","%":"SVGPathSegArcAbs"},pv:{"^":"J;p:x=,q:y=","%":"SVGPathSegArcRel"},pw:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoCubicAbs"},px:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoCubicRel"},py:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoCubicSmoothAbs"},pz:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoCubicSmoothRel"},pA:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoQuadraticAbs"},pB:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoQuadraticRel"},pC:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoQuadraticSmoothAbs"},pD:{"^":"J;p:x=,q:y=","%":"SVGPathSegCurvetoQuadraticSmoothRel"},pE:{"^":"J;p:x=,q:y=","%":"SVGPathSegLinetoAbs"},pF:{"^":"J;p:x=","%":"SVGPathSegLinetoHorizontalAbs"},pG:{"^":"J;p:x=","%":"SVGPathSegLinetoHorizontalRel"},pH:{"^":"J;p:x=,q:y=","%":"SVGPathSegLinetoRel"},pI:{"^":"J;q:y=","%":"SVGPathSegLinetoVerticalAbs"},pJ:{"^":"J;q:y=","%":"SVGPathSegLinetoVerticalRel"},pK:{"^":"jA;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.J]},
$isb:1,
$asb:function(){return[P.J]},
"%":"SVGPathSegList"},jf:{"^":"f+G;",
$asc:function(){return[P.J]},
$asb:function(){return[P.J]},
$isc:1,
$isb:1},jA:{"^":"jf+M;",
$asc:function(){return[P.J]},
$asb:function(){return[P.J]},
$isc:1,
$isb:1},pL:{"^":"J;p:x=,q:y=","%":"SVGPathSegMovetoAbs"},pM:{"^":"J;p:x=,q:y=","%":"SVGPathSegMovetoRel"},pN:{"^":"A;t:height=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGPatternElement"},pQ:{"^":"f;p:x=,q:y=","%":"SVGPoint"},pR:{"^":"f;k:length=","%":"SVGPointList"},pT:{"^":"f;p:x=,q:y=","%":"SVGRect"},pU:{"^":"iZ;t:height=,u:width=,p:x=,q:y=","%":"SVGRectElement"},q2:{"^":"A;n:type=",$isf:1,"%":"SVGScriptElement"},qe:{"^":"jB;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.D]},
$isb:1,
$asb:function(){return[P.D]},
"%":"SVGStringList"},jg:{"^":"f+G;",
$asc:function(){return[P.D]},
$asb:function(){return[P.D]},
$isc:1,
$isb:1},jB:{"^":"jg+M;",
$asc:function(){return[P.D]},
$asb:function(){return[P.D]},
$isc:1,
$isb:1},qg:{"^":"A;n:type=","%":"SVGStyleElement"},A:{"^":"bQ;",
gdk:function(a){return new W.b5(a,"contextmenu",!1,[W.ap])},
gdl:function(a){return new W.b5(a,"dragstart",!1,[W.ap])},
gbW:function(a){return new W.b5(a,"load",!1,[W.ad])},
$isf:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},qi:{"^":"b0;t:height=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGSVGElement"},qj:{"^":"A;",$isf:1,"%":"SVGSymbolElement"},fe:{"^":"b0;","%":";SVGTextContentElement"},ql:{"^":"fe;",$isf:1,"%":"SVGTextPathElement"},qm:{"^":"fe;p:x=,q:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},bs:{"^":"f;n:type=",$isd:1,"%":"SVGTransform"},qv:{"^":"jC;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.bs]},
$isb:1,
$asb:function(){return[P.bs]},
"%":"SVGTransformList"},jh:{"^":"f+G;",
$asc:function(){return[P.bs]},
$asb:function(){return[P.bs]},
$isc:1,
$isb:1},jC:{"^":"jh+M;",
$asc:function(){return[P.bs]},
$asb:function(){return[P.bs]},
$isc:1,
$isb:1},qx:{"^":"b0;t:height=,u:width=,p:x=,q:y=",$isf:1,"%":"SVGUseElement"},qz:{"^":"A;",$isf:1,"%":"SVGViewElement"},qA:{"^":"f;",$isf:1,"%":"SVGViewSpec"},qQ:{"^":"A;",$isf:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},qT:{"^":"A;",$isf:1,"%":"SVGCursorElement"},qU:{"^":"A;",$isf:1,"%":"SVGFEDropShadowElement"},qV:{"^":"A;",$isf:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",bO:{"^":"d;"}}],["","",,P,{"^":"",bN:{"^":"f;k:length=",$isbN:1,$isd:1,"%":"AudioBuffer"},o3:{"^":"B;",
eH:function(a,b,c,d){return a.decodeAudioData(b,H.ai(c,1),H.ai(d,1))},
fm:function(a){if(a.createGain!==undefined)return a.createGain()
else return a.createGainNode()},
fv:function(a,b){var z,y,x
z=P.bN
y=new P.a2(0,$.u,null,[z])
x=new P.dA(y,[z])
this.eH(a,b,new P.i5(x),new P.i6(x))
return y},
"%":"AudioContext|OfflineAudioContext|webkitAudioContext"},i5:{"^":"l:0;a",
$1:[function(a){this.a.bM(0,a)},null,null,2,0,null,3,"call"]},i6:{"^":"l:0;a",
$1:[function(a){var z=this.a
if(a==null)z.bN("")
else z.bN(a)},null,null,2,0,null,1,"call"]},e9:{"^":"B;","%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|JavaScriptAudioNode|MediaStreamAudioDestinationNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|StereoPannerNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},i7:{"^":"e9;","%":"AudioBufferSourceNode|MediaElementAudioSourceNode|MediaStreamAudioSourceNode;AudioSourceNode"},o6:{"^":"e9;n:type=","%":"BiquadFilterNode"},pr:{"^":"i7;n:type=","%":"Oscillator|OscillatorNode"}}],["","",,P,{"^":"",o_:{"^":"f;n:type=","%":"WebGLActiveInfo"},pV:{"^":"f;",
f2:function(a,b){return a.activeTexture(b)},
f8:function(a,b,c){return a.attachShader(b,c)},
f9:function(a,b,c){return a.bindBuffer(b,c)},
fa:function(a,b,c){return a.bindFramebuffer(b,c)},
fb:function(a,b,c){return a.bindTexture(b,c)},
ff:function(a,b){return a.checkFramebufferStatus(b)},
fg:function(a,b){return a.clear(b)},
fh:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fi:function(a,b){return a.compileShader(b)},
fl:function(a){return a.createBuffer()},
fn:function(a){return a.createProgram()},
fp:function(a,b){return a.createShader(b)},
fq:function(a){return a.createTexture()},
fG:function(a,b){return a.disableVertexAttribArray(b)},
fJ:function(a,b,c,d){return a.drawArrays(b,c,d)},
fK:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
fM:function(a,b){return a.enable(b)},
fN:function(a,b){return a.enableVertexAttribArray(b)},
dG:function(a,b,c){return a.getAttribLocation(b,c)},
dL:function(a,b){return a.getProgramInfoLog(b)},
dM:function(a,b,c){return a.getProgramParameter(b,c)},
dN:function(a,b){return a.getShaderInfoLog(b)},
dO:function(a,b,c){return a.getShaderParameter(b,c)},
dR:function(a,b,c){return a.getUniformLocation(b,c)},
hh:function(a,b){return a.linkProgram(b)},
hs:function(a,b,c){return a.pixelStorei(b,c)},
e2:function(a,b,c){return a.shaderSource(b,c)},
hC:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=i==null
if(!z&&h!=null&&typeof g==="number"&&Math.floor(g)===g){a.texImage2D(b,c,d,e,f,g,h,i,j)
return}if(g==null&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,P.mV(g))
return}y=J.p(g)
if(!!y.$ises&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}if(!!y.$iseg&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}if(!!y.$isft&&h==null&&z&&!0){a.texImage2D(b,c,d,e,f,g)
return}throw H.h(P.aC("Incorrect number or type of arguments"))},
hB:function(a,b,c,d,e,f,g){return this.hC(a,b,c,d,e,f,g,null,null,null)},
hD:function(a,b,c,d){return a.texParameteri(b,c,d)},
hJ:function(a,b,c){return a.uniform1f(b,c)},
hK:function(a,b,c){return a.uniform1i(b,c)},
hL:function(a,b,c,d){return a.uniform2f(b,c,d)},
hM:function(a,b,c){return a.uniform3fv(b,c)},
hN:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
hO:function(a,b){return a.useProgram(b)},
hP:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
hQ:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
fd:function(a,b,c,d){a.bufferData(b,c,d)},
"%":"WebGLRenderingContext"},pW:{"^":"f;",$isf:1,"%":"WebGL2RenderingContext"},qZ:{"^":"f;",$isf:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",qb:{"^":"jD;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.F(b,a,null,null,null))
return P.mZ(a.item(b))},
j:function(a,b,c){throw H.h(new P.y("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$isc:1,
$asc:function(){return[P.bm]},
$isb:1,
$asb:function(){return[P.bm]},
"%":"SQLResultSetRowList"},ji:{"^":"f+G;",
$asc:function(){return[P.bm]},
$asb:function(){return[P.bm]},
$isc:1,
$isb:1},jD:{"^":"ji+M;",
$asc:function(){return[P.bm]},
$asb:function(){return[P.bm]},
$isc:1,
$isb:1}}],["","",,B,{"^":"",
cQ:function(a){return P.a5(a,new B.nY(),!0,Q.n)},
Y:function(a,b){var z,y,x,w,v,u
if(0>=a.length)return H.a(a,0)
z=a[0]
y=J.v(b)
x=y.h(b,0)
if(typeof z!=="number")return z.X()
if(typeof x!=="number")return H.m(x)
if(1>=a.length)return H.a(a,1)
w=a[1]
v=y.h(b,1)
if(typeof w!=="number")return w.X()
if(typeof v!=="number")return H.m(v)
if(2>=a.length)return H.a(a,2)
u=a[2]
y=y.h(b,2)
if(typeof u!=="number")return u.X()
if(typeof y!=="number")return H.m(y)
return z*x+w*v+u*y},
ag:function(a,b){var z,y,x
for(z=J.v(b),y=J.v(a),x=0;x<z.gk(b);++x)z.j(b,x,y.h(a,x))},
b4:function(a,b,c,d){var z,y,x,w
z=J.v(a)
y=J.v(c)
x=J.K(z.h(a,0),J.ac(y.h(c,0),b))
w=d.a
if(0>=w.length)return H.a(w,0)
w[0]=x
x=J.K(z.h(a,1),J.ac(y.h(c,1),b))
w=d.a
if(1>=w.length)return H.a(w,1)
w[1]=x
y=J.K(z.h(a,2),J.ac(y.h(c,2),b))
z=d.a
if(2>=z.length)return H.a(z,2)
z[2]=y},
fs:function(a){var z,y,x,w
if(0>=a.length)return H.a(a,0)
z=a[0]
z=J.ac(z,z)
if(1>=a.length)return H.a(a,1)
y=a[1]
y=J.K(z,J.ac(y,y))
if(2>=a.length)return H.a(a,2)
z=a[2]
z=J.K(y,J.ac(z,z))
if(typeof z!=="number")H.H(H.O(z))
x=Math.sqrt(z)
if(x!==0){w=1/x
if(0>=a.length)return H.a(a,0)
z=J.ac(a[0],w)
y=a.length
if(0>=y)return H.a(a,0)
a[0]=z
if(1>=y)return H.a(a,1)
y=J.ac(a[1],w)
z=a.length
if(1>=z)return H.a(a,1)
a[1]=y
if(2>=z)return H.a(a,2)
z=J.ac(a[2],w)
if(2>=a.length)return H.a(a,2)
a[2]=z}return x},
nP:function(a){var z,y,x,w
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
ca:function(a,b,c){if(J.X(J.au(J.I(J.e(a.gw(),0),b[0])),0.0001)&&J.X(J.au(J.I(J.e(a.gw(),1),b[1])),0.0001)&&J.X(J.au(J.I(J.e(a.gw(),2),b[2])),0.0001)&&J.X(J.au(J.I(J.e(a.gw(),3),b[3])),0.02)){c.a=!1
return!0}$.$get$aA()[0]=J.L(b[0])
$.$get$aA()[1]=J.L(b[1])
$.$get$aA()[2]=J.L(b[2])
$.$get$aA()[3]=J.L(b[3])
if(J.X(J.au(J.I(J.e(a.gw(),0),$.$get$aA()[0])),0.0001)&&J.X(J.au(J.I(J.e(a.gw(),1),$.$get$aA()[1])),0.0001)&&J.X(J.au(J.I(J.e(a.gw(),2),$.$get$aA()[2])),0.0001)&&J.X(J.au(J.I(J.e(a.gw(),3),$.$get$aA()[3])),0.02)){c.a=!0
return!0}return!1},
cc:function(a){var z,y
for(z=0,y=0;y<3;++y){if(y>=a.length)return H.a(a,y)
if(J.X(a[y],0))z=(z|C.a.f0(1,y))>>>0}return z},
nv:function(a,b,c,d){var z,y,x,w,v,u,t
$.$get$dP().m(0,c).Z(b)
$.$get$bC().m(0,d).Z(b)
z=$.$get$bC()
z.ay(z,$.$get$dP())
z=$.$get$bC().a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
u=Math.sqrt(x*x+w*w+v*v)
if(u===0)return!1
$.$get$bC().F(0,1/u)
z=$.$get$bC()
y=z.a
t=y.length
if(0>=t)return H.a(y,0)
a[0]=y[0]
if(1>=t)return H.a(y,1)
a[1]=y[1]
if(2>=t)return H.a(y,2)
a[2]=y[2]
a[3]=b.N(z)
return!0},
n2:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.a5(129,new B.mR(),!0,[P.c,Q.n])
y=new B.j_(null,null,null,null,z)
y.a=a
y.b=b
y.c=!1
y.d=!1
for(x=0;x<a;++x)for(w=0;w<b;++w){if(x>=z.length)return H.a(z,x)
v=J.e(z[x],w)
u=w*a+x
if(u>=c.length)return H.a(c,u)
J.S(v,c[u])}B.hc(y)
B.hf(y)
B.h9(y)
B.nV(y)
B.hc(y)
B.hf(y)
B.h9(y)
v=P.a5(2,new B.mS(),!0,Q.n)
t=new B.ku(v,null,H.i([],[B.c_]),null,H.i([],[B.d7]))
u=v.length
if(0>=u)return H.a(v,0)
s=v[0]
if(1>=u)return H.a(v,1)
u=v[1]
r=J.a9(s)
r.j(s,2,99999.9)
r.j(s,1,99999.9)
r.j(s,0,99999.9)
s=J.a9(u)
s.j(u,2,-99999.9)
s.j(u,1,-99999.9)
s.j(u,0,-99999.9)
x=0
while(!0){u=y.a
if(typeof u!=="number")return H.m(u)
if(!(x<u))break
w=0
while(!0){u=y.b
if(typeof u!=="number")return H.m(u)
if(!(w<u))break
if(x>=z.length)return H.a(z,x)
u=J.e(z[x],w)
s=v.length
if(0>=s)return H.a(v,0)
r=v[0]
if(1>=s)return H.a(v,1)
s=v[1]
q=J.v(u)
p=J.v(r)
if(J.X(q.h(u,0),p.h(r,0)))p.j(r,0,q.h(u,0))
o=J.v(s)
if(J.af(q.h(u,0),o.h(s,0)))o.j(s,0,q.h(u,0))
if(J.X(q.h(u,1),p.h(r,1)))p.j(r,1,q.h(u,1))
if(J.af(q.h(u,1),o.h(s,1)))o.j(s,1,q.h(u,1))
if(J.X(q.h(u,2),p.h(r,2)))p.j(r,2,q.h(u,2))
if(J.af(q.h(u,2),o.h(s,2)))o.j(s,2,q.h(u,2));++w}++x}z=$.hi
s=y.b
if(typeof s!=="number")return s.E()
$.hi=z+(u-1)*(s-1)
B.ns(y,t)
if(0>=v.length)return H.a(v,0)
s=v[0]
u=J.v(s)
u.j(s,0,J.I(u.h(s,0),1))
if(0>=v.length)return H.a(v,0)
s=v[0]
u=J.v(s)
u.j(s,1,J.I(u.h(s,1),1))
if(0>=v.length)return H.a(v,0)
s=v[0]
u=J.v(s)
u.j(s,2,J.I(u.h(s,2),1))
if(1>=v.length)return H.a(v,1)
s=v[1]
u=J.v(s)
u.j(s,0,J.K(u.h(s,0),1))
if(1>=v.length)return H.a(v,1)
s=v[1]
u=J.v(s)
u.j(s,1,J.K(u.h(s,1),1))
if(1>=v.length)return H.a(v,1)
v=v[1]
s=J.v(v)
s.j(v,2,J.K(s.h(v,2),1))
return t},
ns:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=P.a5(129,new B.nu(),!0,[P.c,[P.c,P.q]])
y=[P.q]
x=H.i(new Array(4),y)
w=[P.cG]
v=H.i(new Array(4),w)
$.aj=0
u=a.e
t=0
s=null
r=null
q=null
while(!0){p=a.a
if(typeof p!=="number")return p.E()
if(!(t<p-1))break
o=t+1
n=0
while(!0){p=a.b
if(typeof p!=="number")return p.E()
if(!(n<p-1))break
if(t>=u.length)return H.a(u,t)
s=J.e(u[t],n)
if(o>=u.length)return H.a(u,o)
r=J.e(u[o],n)
if(o>=u.length)return H.a(u,o)
m=n+1
q=J.e(u[o],m)
if(t>=z.length)return H.a(z,t)
J.R(J.e(z[t],n),0,B.aU(s,r,q))
if(o>=u.length)return H.a(u,o)
s=J.e(u[o],m)
if(t>=u.length)return H.a(u,t)
r=J.e(u[t],m)
if(t>=u.length)return H.a(u,t)
q=J.e(u[t],n)
if(t>=z.length)return H.a(z,t)
J.R(J.e(z[t],n),1,B.aU(s,r,q))
n=m}t=o}u=b.e
t=0
l=null
while(!0){p=a.a
if(typeof p!=="number")return p.E()
if(!(t<p-1))break
p=t>0
k=t-1
o=t+1
n=0
while(!0){j=a.b
if(typeof j!=="number")return j.E()
if(!(n<j-1))break
c$1:{x[0]=-1
if(n>0){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],n-1),1)
x[0]=j}else if(a.d===!0){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],j-2),1)
x[0]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[0]=J.t(j,J.e(J.e(z[t],n),0))
if(J.t(x[0],-1)||v[0]===!0)x[0]=B.bD(a,z,t,n,0)
x[2]=-1
j=a.b
if(typeof j!=="number")return j.E()
if(n<j-2){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],n+1),0)
x[2]=j}else if(a.d===!0){if(t>=z.length)return H.a(z,t)
j=J.e(J.e(z[t],0),0)
x[2]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[2]=J.t(j,J.e(J.e(z[t],n),1))
if(J.t(x[2],-1)||v[2]===!0)x[2]=B.bD(a,z,t,n,2)
x[3]=-1
if(p){if(k<0||k>=z.length)return H.a(z,k)
j=J.e(J.e(z[k],n),0)
x[3]=j}else if(a.c===!0){j=a.a
if(typeof j!=="number")return j.E()
j-=2
if(j<0||j>=z.length)return H.a(z,j)
j=J.e(J.e(z[j],n),0)
x[3]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[3]=J.t(j,J.e(J.e(z[t],n),1))
if(J.t(x[3],-1)||v[3]===!0)x[3]=B.bD(a,z,t,n,3)
x[1]=-1
j=a.a
if(typeof j!=="number")return j.E()
if(t<j-2){if(o>=z.length)return H.a(z,o)
j=J.e(J.e(z[o],n),1)
x[1]=j}else if(a.c===!0){if(0>=z.length)return H.a(z,0)
j=J.e(J.e(z[0],n),1)
x[1]=j}else j=-1
if(t>=z.length)return H.a(z,t)
v[1]=J.t(j,J.e(J.e(z[t],n),0))
if(J.t(x[1],-1)||v[1]===!0)x[1]=B.bD(a,z,t,n,1)
j=new Array(26)
j.fixed$length=Array
j=H.i(j,y)
i=H.i(new Array(26),w)
h=H.i(new Array(26),w)
l=new B.d7(null,null,j,i,h)
u.push(l)
if(t>=z.length)return H.a(z,t)
i=J.e(J.e(z[t],n),0)
if(t>=z.length)return H.a(z,t)
if(J.t(i,J.e(J.e(z[t],n),1))){if(t>=z.length)return H.a(z,t)
if(J.t(J.e(J.e(z[t],n),0),-1))break c$1
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
B.dW(l,a,z,t,n,-1)
if(B.dY(l))B.dL(l)
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
if(J.t(i,-1)){i=x[2]
j[2]=i
if(J.t(i,-1))j[2]=B.bD(a,z,t,n,4)}B.dW(l,a,z,t,n,0)
if(B.dY(l))B.dL(l)
else{if(0>=u.length)return H.a(u,-1)
u.pop()}j=new Array(26)
j.fixed$length=Array
j=H.i(j,y)
i=H.i(new Array(26),w)
h=H.i(new Array(26),w)
l=new B.d7(null,null,j,i,h)
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
if(J.t(i,-1)){i=x[0]
j[2]=i
if(J.t(i,-1))j[2]=B.bD(a,z,t,n,5)}B.dW(l,a,z,t,n,1)
if(B.dY(l))B.dL(l)
else{if(0>=u.length)return H.a(u,-1)
u.pop()}}}++n}t=o}y=$.aj
b.b=y
b.d=u.length
if(typeof y!=="number")return H.m(y)
b.c=H.i(new Array(y),[B.c_])
y=[P.x]
e=0
while(!0){w=$.aj
if(typeof w!=="number")return H.m(w)
if(!(e<w))break
w=b.c
u=new Array(4)
u.fixed$length=Array
u=H.i(u,y)
if(e>=w.length)return H.a(w,e)
w[e]=new B.c_(u,null)
u=b.c
if(e>=u.length)return H.a(u,e)
u=u[e].a
w=$.$get$C()
if(e>=w.length)return H.a(w,e)
C.c.cd(u,0,w[e].gw())
w=b.c
if(e>=w.length)return H.a(w,e)
w=w[e]
u=$.$get$C()
if(e>=u.length)return H.a(u,e)
w.b=u[e].gaZ();++e}},
dL:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=new B.lr(!1)
y=new Array(4)
y.fixed$length=Array
x=[P.x]
w=H.i(y,x)
v=H.i(new Array(4),x)
u=new Q.n(null,null,H.i(new Array(4),x))
y=new Float32Array(3)
u.a=y
t=C.a.i(0)
if(0>=3)return H.a(y,0)
y[0]=t
t=C.a.i(0)
if(1>=3)return H.a(y,1)
y[1]=t
t=C.a.i(0)
if(2>=3)return H.a(y,2)
y[2]=t
s=new Q.n(null,null,H.i(new Array(4),x))
y=new Float32Array(3)
s.a=y
t=C.a.i(0)
if(0>=3)return H.a(y,0)
y[0]=t
t=C.a.i(0)
if(1>=3)return H.a(y,1)
y[1]=t
t=C.a.i(0)
if(2>=3)return H.a(y,2)
y[2]=t
r=new Q.n(null,null,H.i(new Array(4),x))
y=new Float32Array(3)
r.a=y
t=C.a.i(0)
if(0>=3)return H.a(y,0)
y[0]=t
t=C.a.i(0)
if(1>=3)return H.a(y,1)
y[1]=t
t=C.a.i(0)
if(2>=3)return H.a(y,2)
y[2]=t
q=new Q.n(null,null,H.i(new Array(4),x))
y=new Float32Array(3)
q.a=y
x=C.a.i(0)
if(0>=3)return H.a(y,0)
y[0]=x
x=C.a.i(0)
if(1>=3)return H.a(y,1)
y[1]=x
x=C.a.i(0)
if(2>=3)return H.a(y,2)
y[2]=x
x=$.$get$C()
y=a4.a
if(y>>>0!==y||y>=x.length)return H.a(x,y)
B.ag(x[y].gw(),w)
p=B.eb(w,w[3])
y=a4.d
x=y.length
t=a4.c
o=t.length
n=0
while(!0){m=a4.b
if(typeof m!=="number")return H.m(m)
if(!(n<m))break
c$0:{if(n>=o)return H.a(t,n)
if(J.t(t[n],a4.a))break c$0
m=$.$get$C()
l=t[n]
if(l>>>0!==l||l>=m.length)return H.a(m,l)
B.ag(m[l].gw(),w)
if(n>=x)return H.a(y,n)
if(y[n]!==!0){w[0]=J.L(w[0])
w[1]=J.L(w[1])
w[2]=J.L(w[2])
w[3]=J.L(w[3])}p=B.d5(p,w,w[3],0.1)}++n}if(p==null)return
B.fu(p,u,s)
for(m=a4.e,l=m.length,k=null,j=0,i=null,h=0;j<3;++j)for(i=-1;i<=1;i+=2,++h){C.c.fR(w,0,3,0)
w[j]=i
if(i===1){g=s.a
if(j>=g.length)return H.a(g,j)
w[3]=g[j]}else{g=u.a
if(j>=g.length)return H.a(g,j)
w[3]=-g[j]}g=$.$get$C()
f=a4.a
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.ca(g[f],w,z))continue
k=0
while(!0){g=a4.b
if(typeof g!=="number")return H.m(g)
if(!(k<g))break
g=$.$get$C()
if(k>=o)return H.a(t,k)
f=t[k]
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.ca(g[f],w,z))break;++k}g=a4.b
if(k===g){if(typeof g!=="number")return g.O()
if(g>26)H.ak("ERROR: too many bevels\n")
g=a4.b
f=B.fW(w,z)
if(g>>>0!==g||g>=o)return H.a(t,g)
t[g]=f
f=a4.b
if(f>>>0!==f||f>=l)return H.a(m,f)
m[f]=!1
g=z.a
if(f>=x)return H.a(y,f)
y[f]=g
a4.b=f+1}}for(n=0,e=null,d=null,c=null;g=p.a,n<g;n=b){b=n+1
a=C.a.bi(b,g)
g=p.b
if(n>=g.length)return H.a(g,n)
g=r.m(0,g[n])
f=p.b
if(a>=f.length)return H.a(f,a)
f=f[a]
a0=g.a
if(0>=a0.length)return H.a(a0,0)
a1=a0[0]
a2=J.v(f)
a3=a2.h(f,0)
if(typeof a3!=="number")return H.m(a3)
a0[0]=a1-a3
a3=g.a
if(1>=a3.length)return H.a(a3,1)
a1=a3[1]
a0=a2.h(f,1)
if(typeof a0!=="number")return H.m(a0)
a3[1]=a1-a0
g=g.a
if(2>=g.length)return H.a(g,2)
a0=g[2]
f=a2.h(f,2)
if(typeof f!=="number")return H.m(f)
g[2]=a0-f
if(B.fs(r.a)<0.5)continue
B.nP(r)
for(g=r.a,f=g.length,a=0;a0=a<3,a0;++a){if(a>=f)return H.a(g,a)
a1=g[a]
if(a1===-1||a1===1)break}if(a0)continue
for(j=0;j<3;++j)for(i=-1;i<=1;i+=2){g=q.a
f=g.length
if(0>=f)return H.a(g,0)
g[0]=g[0]*0
if(1>=f)return H.a(g,1)
g[1]=g[1]*0
if(2>=f)return H.a(g,2)
g[2]=g[2]*0
if(j>=f)return H.a(g,j)
g[j]=i
f=r.a
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
if(B.fs(w)<0.5)continue
g=p.b
if(n>=g.length)return H.a(g,n)
w[3]=B.Y(g[n].gT(),w)
for(e=0;e<p.a;++e){g=p.b
if(e>=g.length)return H.a(g,e)
g=B.Y(g[e].gT(),w)
f=w[3]
if(typeof f!=="number")return H.m(f)
d=g-f
if(d>0.1)break}if(e<p.a)continue
g=$.$get$C()
f=a4.a
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.ca(g[f],w,z))continue
k=0
while(!0){g=a4.b
if(typeof g!=="number")return H.m(g)
if(!(k<g))break
g=$.$get$C()
if(k>=o)return H.a(t,k)
f=t[k]
if(f>>>0!==f||f>=g.length)return H.a(g,f)
if(B.ca(g[f],w,z))break;++k}g=a4.b
if(k===g){if(typeof g!=="number")return g.O()
if(g>26)H.ak("ERROR: too many bevels\n")
g=a4.b
f=B.fW(w,z)
if(g>>>0!==g||g>=o)return H.a(t,g)
t[g]=f
a=0
while(!0){g=a4.b
if(typeof g!=="number")return H.m(g)
if(!(a<g))break
if(g>=o)return H.a(t,g)
g=t[g]
if(a>=o)return H.a(t,a)
if(J.t(g,t[a]))H.ak("WARNING: bevel plane already used\n");++a}if(g>=l)return H.a(m,g)
m[g]=!1
f=z.a
if(g>=x)return H.a(y,g)
y[g]=f
c=B.iF(p)
f=$.$get$C()
g=a4.b
if(g>>>0!==g||g>=o)return H.a(t,g)
g=t[g]
if(g>>>0!==g||g>=f.length)return H.a(f,g)
B.ag(f[g].gw(),v)
g=a4.b
if(g>>>0!==g||g>=x)return H.a(y,g)
if(y[g]!==!0){v[0]=J.L(v[0])
v[1]=J.L(v[1])
v[2]=J.L(v[2])
v[3]=J.L(v[3])}B.d5(c,v,v[3],0.1)
g=a4.b
if(typeof g!=="number")return g.H()
a4.b=g+1}}}g=a4.b
f=a4.a
if(g>>>0!==g||g>=o)return H.a(t,g)
t[g]=f
if(g>=l)return H.a(m,g)
m[g]=!1
if(g>=x)return H.a(y,g)
y[g]=!0
a4.b=g+1},
iF:function(a){var z=B.dz(4)
z.a=a.a
z.b=P.a5(a.a,new B.iG(a),!0,Q.n)
return z},
fW:function(a,b){var z,y,x
z=0
while(!0){y=$.aj
if(typeof y!=="number")return H.m(y)
if(!(z<y))break
y=$.$get$C()
if(z>=y.length)return H.a(y,z)
if(B.ca(y[z],a,b))return z;++z}x=$.$get$C()
if(y>=x.length)return H.a(x,y)
B.ag(a,x[y].gw())
y=$.$get$C()
x=$.aj
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x].saZ(B.cc(a))
x=$.aj
if(typeof x!=="number")return x.H();++x
$.aj=x
b.a=!1
return x-1},
dY:function(a){var z,y,x,w,v,u,t,s,r,q
z=H.i(new Array(4),[P.x])
y=P.a5(2,new B.nX(),!0,Q.n)
if(J.t(a.a,-1))return!1
x=$.$get$C()
w=a.a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
B.ag(x[w].gw(),z)
v=B.eb(z,z[3])
x=a.d
w=x.length
u=a.c
t=u.length
s=0
while(!0){r=a.b
if(typeof r!=="number")return H.m(r)
if(!(s<r))break
if(s>=t)return H.a(u,s)
if(J.t(u[s],-1))return!1
r=$.$get$C()
q=u[s]
if(q>>>0!==q||q>=r.length)return H.a(r,q)
B.ag(r[q].gw(),z)
if(s>=w)return H.a(x,s)
if(x[s]!==!0){z[0]=J.L(z[0])
z[1]=J.L(z[1])
z[2]=J.L(z[2])
z[3]=J.L(z[3])}v=B.d5(v,z,z[3],0.1);++s}if(v==null)return!1
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
B.fu(v,w,y[1])
for(s=0;s<3;++s){if(1>=y.length)return H.a(y,1)
x=J.e(y[1],s)
if(0>=y.length)return H.a(y,0)
if(J.af(J.I(x,J.e(y[0],s)),65535))return!1
if(0>=y.length)return H.a(y,0)
if(J.hj(J.e(y[0],s),65535))return!1
if(1>=y.length)return H.a(y,1)
if(J.hk(J.e(y[1],s),-65535))return!1}return!0},
fu:function(a,b,c){var z,y,x,w,v,u
z=J.a9(b)
z.j(b,2,65535)
z.j(b,1,65535)
z.j(b,0,65535)
y=J.a9(c)
y.j(c,2,-65535)
y.j(c,1,-65535)
y.j(c,0,-65535)
for(x=0;x<a.a;++x)for(w=0;w<3;++w){v=a.b
if(x>=v.length)return H.a(v,x)
u=J.e(v[x],w)
v=J.P(u)
if(v.P(u,z.h(b,w)))z.j(b,w,u)
if(v.O(u,y.h(c,w)))y.j(c,w,u)}},
d5:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=[P.x]
y=H.i(new Array(68),z)
x=[P.q]
w=H.i(new Array(68),x)
v=H.i(new Array(3),x)
u=new Q.n(null,null,H.i(new Array(4),z))
z=new Float32Array(3)
u.a=z
x=C.a.i(0)
if(0>=3)return H.a(z,0)
z[0]=x
x=C.a.i(0)
if(1>=3)return H.a(z,1)
z[1]=x
x=C.a.i(0)
if(2>=3)return H.a(z,2)
z[2]=x
v[2]=0
v[1]=0
v[0]=0
for(z=w.length,x=-d,t=y.length,s=null,r=0;q=a.a,r<q;++r){q=a.b
if(r>=q.length)return H.a(q,r)
s=B.Y(q[r].gT(),b)
if(typeof c!=="number")return H.m(c)
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
if(typeof p!=="number")return p.H()
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
o=B.dz(q+4)
for(x=J.P(c),r=0,n=null,m=null;r<a.a;++r){q=a.b
if(r>=q.length)return H.a(q,r)
l=q[r]
if(r>=z)return H.a(w,r)
q=w[r]
if(q===2){q=o.b
p=o.a
if(p>=q.length)return H.a(q,p)
J.S(q[p],l);++o.a
continue}if(q===0){q=o.b
p=o.a
if(p>=q.length)return H.a(q,p)
J.S(q[p],l);++o.a}q=r+1
if(q>=z)return H.a(w,q)
p=w[q]
if(p!==2){k=w[r]
k=p==null?k==null:p===k
p=k}else p=!0
if(p)continue
p=a.b
k=C.a.bi(q,a.a)
if(k>=p.length)return H.a(p,k)
m=p[k]
if(r>=t)return H.a(y,r)
k=y[r]
if(q>=t)return H.a(y,q)
q=y[q]
if(typeof k!=="number")return k.E()
if(typeof q!=="number")return H.m(q)
s=k/(k-q)
for(q=J.v(l),p=J.v(m),n=0;n<3;++n)if(J.t(b[n],1)){k=u.a
if(n>=k.length)return H.a(k,n)
k[n]=c}else if(J.t(b[n],-1)){k=x.bj(c)
j=u.a
if(n>=j.length)return H.a(j,n)
j[n]=k}else{k=q.h(l,n)
j=J.I(p.h(m,n),q.h(l,n))
if(typeof j!=="number")return H.m(j)
j=J.K(k,s*j)
k=u.a
if(n>=k.length)return H.a(k,n)
k[n]=j}q=o.b
p=o.a
if(p>=q.length)return H.a(q,p)
J.S(q[p],u);++o.a}return o},
eb:function(a,b){var z,y,x,w,v,u,t,s,r
z=Q.k(0,0,0)
for(y=0,x=-1,w=-65535;y<3;++y){v=J.au(a[y])
if(J.af(v,w)){w=v
x=y}}switch(x){case 0:case 1:u=z.a
if(2>=u.length)return H.a(u,2)
u[2]=1
break
case 2:u=z.a
if(0>=u.length)return H.a(u,0)
u[0]=1
break}B.b4(z,-B.Y(z.a,a),a,z)
z.ao(0)
t=Q.bt(a)
s=Q.k(0,0,0).ay(z,t)
t.F(0,b)
z.F(0,65535)
s.F(0,65535)
r=B.dz(4)
u=r.b
if(0>=u.length)return H.a(u,0)
J.S(u[0],t).Z(s).L(0,z)
u=r.b
if(1>=u.length)return H.a(u,1)
J.S(u[1],t).L(0,s).L(0,z)
u=r.b
if(2>=u.length)return H.a(u,2)
J.S(u[2],t).L(0,s).Z(z)
u=r.b
if(3>=u.length)return H.a(u,3)
J.S(u[3],t).Z(s).Z(z)
r.a=4
return r},
dW:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o
z=P.a5(4,new B.nH(),!0,Q.n)
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
default:H.ak("setBorderInward: bad parameter")
v=0
break}y=a.d
x=y.length
w=a.c
u=w.length
t=0
while(!0){s=a.b
if(typeof s!=="number")return H.m(s)
if(!(t<s))break
for(r=0,q=0,p=0;p<v;++p){if(p>=z.length)return H.a(z,p)
s=z[p]
if(t>=u)return H.a(w,t)
o=B.nw(s,w[t])
if(o===0)++r
if(o===1)++q}if(r>0&&q===0){if(t>=x)return H.a(y,t)
y[t]=!0}else if(q>0&&r===0){if(t>=x)return H.a(y,t)
y[t]=!1}else if(r===0&&q===0){if(t>=u)return H.a(w,t)
w[t]=-1}else{H.ak("WARNING: CM_SetBorderInward: mixed plane sides\n")
if(t>=x)return H.a(y,t)
y[t]=!1}++t}},
nw:function(a,b){var z,y,x,w
if(J.t(b,-1))return 2
z=$.$get$C()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
y=z[b].gw()
z=B.Y(a.gT(),y)
x=J.e(y,3)
if(typeof x!=="number")return H.m(x)
w=z-x
if(w>0.1)return 0
if(w<-0.1)return 1
return 2},
bD:function(a,b,c,d,e){var z,y,x,w,v,u,t
z=new Q.n(null,null,H.i(new Array(4),[P.x]))
y=new Float32Array(3)
z.a=y
x=C.a.i(0)
if(0>=3)return H.a(y,0)
y[0]=x
x=C.a.i(0)
if(1>=3)return H.a(y,1)
y[1]=x
x=C.a.i(0)
if(2>=3)return H.a(y,2)
y[2]=x
switch(e){case 0:y=a.e
if(c>=y.length)return H.a(y,c)
w=J.e(y[c],d)
x=c+1
if(x>=y.length)return H.a(y,x)
v=J.e(y[x],d)
u=B.bH(b,c,d,0)
x=$.$get$C()
if(u>>>0!==u||u>=x.length)return H.a(x,u)
B.b4(w,4,x[u].gw(),z)
return B.aU(w,v,z)
case 2:y=a.e
if(c>=y.length)return H.a(y,c)
x=d+1
w=J.e(y[c],x)
t=c+1
if(t>=y.length)return H.a(y,t)
v=J.e(y[t],x)
u=B.bH(b,c,d,1)
x=$.$get$C()
if(u>>>0!==u||u>=x.length)return H.a(x,u)
B.b4(w,4,x[u].gw(),z)
return B.aU(v,w,z)
case 3:y=a.e
if(c>=y.length)return H.a(y,c)
w=J.e(y[c],d)
if(c>=y.length)return H.a(y,c)
v=J.e(y[c],d+1)
u=B.bH(b,c,d,1)
y=$.$get$C()
if(u>>>0!==u||u>=y.length)return H.a(y,u)
B.b4(w,4,y[u].gw(),z)
return B.aU(v,w,z)
case 1:y=a.e
x=c+1
if(x>=y.length)return H.a(y,x)
w=J.e(y[x],d)
if(x>=y.length)return H.a(y,x)
v=J.e(y[x],d+1)
u=B.bH(b,c,d,0)
x=$.$get$C()
if(u>>>0!==u||u>=x.length)return H.a(x,u)
B.b4(w,4,x[u].gw(),z)
return B.aU(w,v,z)
case 4:y=a.e
x=c+1
if(x>=y.length)return H.a(y,x)
w=J.e(y[x],d+1)
if(c>=y.length)return H.a(y,c)
v=J.e(y[c],d)
u=B.bH(b,c,d,0)
y=$.$get$C()
if(u>>>0!==u||u>=y.length)return H.a(y,u)
B.b4(w,4,y[u].gw(),z)
return B.aU(w,v,z)
case 5:y=a.e
if(c>=y.length)return H.a(y,c)
w=J.e(y[c],d)
x=c+1
if(x>=y.length)return H.a(y,x)
v=J.e(y[x],d+1)
u=B.bH(b,c,d,1)
x=$.$get$C()
if(u>>>0!==u||u>=x.length)return H.a(x,u)
B.b4(w,4,x[u].gw(),z)
return B.aU(w,v,z)}H.ak("edgePlaneNum: bad k")
return-1},
bH:function(a,b,c,d){var z,y
if(b>=a.length)return H.a(a,b)
z=J.e(J.e(a[b],c),d)
if(!J.t(z,-1))return z
if(b>=a.length)return H.a(a,b)
y=J.e(a[b],c)
z=J.e(y,d>0?0:1)
if(!J.t(z,-1))return z
P.ab("WARNING: CM_GridPlane unresolvable\n")
return-1},
aU:function(a,b,c){var z,y,x,w,v
z=H.i(new Array(4),[P.x])
if(!B.nv(z,a,b,c))return-1
y=0
x=null
while(!0){w=$.aj
if(typeof w!=="number")return H.m(w)
if(!(y<w))break
c$0:{w=$.$get$C()
if(y>=w.length)return H.a(w,y)
if(B.Y(z,w[y].gw())<0)break c$0
w=a.gT()
v=$.$get$C()
if(y>=v.length)return H.a(v,y)
v=B.Y(w,v[y].gw())
w=$.$get$C()
if(y>=w.length)return H.a(w,y)
w=J.e(w[y].gw(),3)
if(typeof w!=="number")return H.m(w)
x=v-w
if(x<-0.1||x>0.1)break c$0
w=b.gT()
v=$.$get$C()
if(y>=v.length)return H.a(v,y)
v=B.Y(w,v[y].gw())
w=$.$get$C()
if(y>=w.length)return H.a(w,y)
w=J.e(w[y].gw(),3)
if(typeof w!=="number")return H.m(w)
x=v-w
if(x<-0.1||x>0.1)break c$0
w=c.gT()
v=$.$get$C()
if(y>=v.length)return H.a(v,y)
v=B.Y(w,v[y].gw())
w=$.$get$C()
if(y>=w.length)return H.a(w,y)
w=J.e(w[y].gw(),3)
if(typeof w!=="number")return H.m(w)
x=v-w
if(x<-0.1||x>0.1)break c$0
return y}++y}v=$.$get$C()
if(w>=v.length)return H.a(v,w)
B.ag(z,v[w].gw())
w=$.$get$C()
v=$.aj
if(v>>>0!==v||v>=w.length)return H.a(w,v)
w[v].saZ(B.cc(z))
v=$.aj
if(typeof v!=="number")return v.H();++v
$.aj=v
return v-1},
nV:function(a){var z,y,x,w,v,u,t,s
z=Q.k(0,0,0)
y=a.a
x=a.b
if(typeof y!=="number")return y.O()
if(typeof x!=="number")return H.m(x)
if(y>x){x=a.e
w=0
while(!0){v=a.b
if(typeof v!=="number")return H.m(v)
if(!(w<v))break
u=w+1
t=u
while(!0){y=a.a
if(typeof y!=="number")return H.m(y)
if(!(t<y))break
y=a.b
if(typeof y!=="number")return H.m(y)
v=x.length
if(t<y){if(w>=v)return H.a(x,w)
z.m(0,J.e(x[w],t))
if(w>=x.length)return H.a(x,w)
y=J.e(x[w],t)
if(t>=x.length)return H.a(x,t)
J.S(y,J.e(x[t],w))
if(t>=x.length)return H.a(x,t)
J.S(J.e(x[t],w),z)}else{if(w>=v)return H.a(x,w)
y=J.e(x[w],t)
if(t>=x.length)return H.a(x,t)
J.S(y,J.e(x[t],w))}++t}w=u}x=v}else{y=a.e
w=0
while(!0){v=a.a
if(typeof v!=="number")return H.m(v)
if(!(w<v))break
u=w+1
t=u
while(!0){x=a.b
if(typeof x!=="number")return H.m(x)
if(!(t<x))break
x=a.a
if(typeof x!=="number")return H.m(x)
v=y.length
if(t<x){if(t>=v)return H.a(y,t)
z.m(0,J.e(y[t],w))
if(t>=y.length)return H.a(y,t)
x=J.e(y[t],w)
if(w>=y.length)return H.a(y,w)
J.S(x,J.e(y[w],t))
if(w>=y.length)return H.a(y,w)
J.S(J.e(y[w],t),z)}else{if(t>=v)return H.a(y,t)
x=J.e(y[t],w)
if(w>=y.length)return H.a(y,w)
J.S(x,J.e(y[w],t))}++t}w=u}y=v}a.a=x
a.b=y
s=a.c
a.c=a.d
a.d=s},
mU:function(a,b){var z,y,x,w
z=J.v(a)
y=J.v(b)
x=J.I(z.h(a,0),y.h(b,0))
w=J.P(x)
if(w.P(x,-0.1)||w.O(x,0.1))return!1
x=J.I(z.h(a,1),y.h(b,1))
w=J.P(x)
if(w.P(x,-0.1)||w.O(x,0.1))return!1
x=J.I(z.h(a,2),y.h(b,2))
z=J.P(x)
if(z.P(x,-0.1)||z.O(x,0.1))return!1
return!0},
h9:function(a){var z,y,x,w,v,u,t
z=a.e
y=0
x=null
while(!0){w=a.a
if(typeof w!=="number")return w.E()
if(!(y<w-1))break
c$0:{w=y+1
v=0
while(!0){u=a.b
if(typeof u!=="number")return H.m(u)
if(!(v<u))break
if(y<0||y>=z.length)return H.a(z,y)
u=J.e(z[y],v)
if(w<0||w>=z.length)return H.a(z,w)
if(!B.mU(u,J.e(z[w],v)))break;++v}if(v!==a.b)break c$0
t=y+2
v=0
while(!0){w=a.b
if(typeof w!=="number")return H.m(w)
if(!(v<w))break
x=t
while(!0){w=a.a
if(typeof w!=="number")return H.m(w)
if(!(x<w))break
w=x-1
if(w<0||w>=z.length)return H.a(z,w)
w=J.e(z[w],v)
if(x<0||x>=z.length)return H.a(z,x)
J.S(w,J.e(z[x],v));++x}++v}w=a.a
if(typeof w!=="number")return w.E()
a.a=w-1;--y}++y}},
nq:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=[P.x]
y=new Q.n(null,null,H.i(new Array(4),z))
x=new Float32Array(3)
y.a=x
w=C.a.i(0)
if(0>=3)return H.a(x,0)
x[0]=w
w=C.a.i(0)
if(1>=3)return H.a(x,1)
x[1]=w
w=C.a.i(0)
if(2>=3)return H.a(x,2)
x[2]=w
v=new Q.n(null,null,H.i(new Array(4),z))
x=new Float32Array(3)
v.a=x
w=C.a.i(0)
if(0>=3)return H.a(x,0)
x[0]=w
w=C.a.i(0)
if(1>=3)return H.a(x,1)
x[1]=w
w=C.a.i(0)
if(2>=3)return H.a(x,2)
x[2]=w
u=new Q.n(null,null,H.i(new Array(4),z))
z=new Float32Array(3)
u.a=z
x=C.a.i(0)
if(0>=3)return H.a(z,0)
z[0]=x
x=C.a.i(0)
if(1>=3)return H.a(z,1)
z[1]=x
x=C.a.i(0)
if(2>=3)return H.a(z,2)
z[2]=x
for(z=J.v(a),x=J.v(c),w=J.v(b),t=0;t<3;++t){s=J.K(z.h(a,t),x.h(c,t))
if(typeof s!=="number")return H.m(s)
r=v.a
if(t>=r.length)return H.a(r,t)
r[t]=0.5*s
s=J.K(z.h(a,t),w.h(b,t))
if(typeof s!=="number")return H.m(s)
r=J.K(w.h(b,t),x.h(c,t))
if(typeof r!=="number")return H.m(r)
q=y.a
if(t>=q.length)return H.a(q,t)
q[t]=0.5*(0.5*s+0.5*r)}z=u.m(0,y)
x=z.a
if(0>=x.length)return H.a(x,0)
x[0]=x[0]-v.h(0,0)
x=z.a
if(1>=x.length)return H.a(x,1)
x[1]=x[1]-v.h(0,1)
z=z.a
if(2>=z.length)return H.a(z,2)
z[2]=z[2]-v.h(0,2)
z=u.a
x=z.length
if(0>=x)return H.a(z,0)
p=z[0]
if(1>=x)return H.a(z,1)
o=z[1]
if(2>=x)return H.a(z,2)
n=z[2]
return Math.sqrt(p*p+o*o+n*n)>=16},
hf:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.e
y=0
x=null
while(!0){w=a.a
if(typeof w!=="number")return w.E()
if(!(y<w-2))break
c$0:{v=y+1
u=y+2
t=0
while(!0){w=a.b
if(typeof w!=="number")return H.m(w)
if(!(t<w))break
if(y>=z.length)return H.a(z,y)
w=J.e(z[y],t)
if(v>=z.length)return H.a(z,v)
s=J.e(z[v],t)
if(u>=z.length)return H.a(z,u)
if(B.nq(w,s,J.e(z[u],t)))break;++t}if(t===a.b){t=0
while(!0){w=a.b
if(typeof w!=="number")return H.m(w)
if(!(t<w))break
x=u
while(!0){w=a.a
if(typeof w!=="number")return H.m(w)
if(!(x<w))break
w=x-1
if(w>=z.length)return H.a(z,w)
w=J.e(z[w],t)
if(x>=z.length)return H.a(z,x)
J.S(w,J.e(z[x],t));++x}++t}w=a.a
if(typeof w!=="number")return w.E()
a.a=w-1
y=v
break c$0}w=y+3
t=0
while(!0){s=a.b
if(typeof s!=="number")return H.m(s)
if(!(t<s))break
if(y>=z.length)return H.a(z,y)
r=Q.bu(J.e(z[y],t))
if(v>=z.length)return H.a(z,v)
q=Q.bu(J.e(z[v],t))
if(u>=z.length)return H.a(z,u)
p=Q.bu(J.e(z[u],t))
s=a.a
if(typeof s!=="number")return s.E()
x=s-1
for(;x>v;--x){s=x+2
if(s>=z.length)return H.a(z,s)
s=J.e(z[s],t)
if(x>=z.length)return H.a(z,x)
J.S(s,J.e(z[x],t))}if(v>=z.length)return H.a(z,v)
s=J.e(z[v],t)
if(u>=z.length)return H.a(z,u)
o=J.e(z[u],t)
if(w>=z.length)return H.a(z,w)
B.nS(r,q,p,s,o,J.e(z[w],t));++t}w=a.a
if(typeof w!=="number")return w.H()
a.a=w+2}}},
nS:function(a,b,c,d,e,f){var z,y,x,w,v,u
for(z=J.a9(d),y=J.a9(f),x=J.a9(e),w=0;w<3;++w){v=a.a
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
v=J.K(z.h(d,w),y.h(f,w))
if(typeof v!=="number")return H.m(v)
x.j(e,w,0.5*v)}},
hc:function(a){var z,y,x,w,v,u
z=a.e
y=0
x=null
while(!0){w=a.b
if(typeof w!=="number")return H.m(w)
if(!(y<w))break
for(v=0;v<3;++v){if(0>=z.length)return H.a(z,0)
w=J.e(J.e(z[0],y),v)
u=a.a
if(typeof u!=="number")return u.E();--u
if(u<0||u>=z.length)return H.a(z,u)
x=J.I(w,J.e(J.e(z[u],y),v))
w=J.P(x)
if(w.P(x,-0.1)||w.O(x,0.1))break}if(v!==3)break;++y}a.c=y===a.b},
V:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=1-d
y=Q.bt(a.a)
x=Q.bt(b.a)
w=Q.bt(c.a)
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
cJ:function(a,b,c,d){var z,y,x,w,v,u,t
z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
z=z[1]
y=[P.x]
w=new Q.n(null,null,H.i(new Array(4),y))
v=new Float32Array(3)
w.a=v
x=C.b.i(x)
if(0>=3)return H.a(v,0)
v[0]=x
z=C.b.i(z)
if(1>=3)return H.a(v,1)
v[1]=z
z=C.a.i(0)
if(2>=3)return H.a(v,2)
v[2]=z
z=b.a
v=z.length
if(0>=v)return H.a(z,0)
x=z[0]
if(1>=v)return H.a(z,1)
z=z[1]
u=new Q.n(null,null,H.i(new Array(4),y))
v=new Float32Array(3)
u.a=v
x=C.b.i(x)
if(0>=3)return H.a(v,0)
v[0]=x
z=C.b.i(z)
if(1>=3)return H.a(v,1)
v[1]=z
z=C.a.i(0)
if(2>=3)return H.a(v,2)
v[2]=z
z=c.a
v=z.length
if(0>=v)return H.a(z,0)
x=z[0]
if(1>=v)return H.a(z,1)
z=z[1]
t=new Q.n(null,null,H.i(new Array(4),y))
y=new Float32Array(3)
t.a=y
x=C.b.i(x)
if(0>=3)return H.a(y,0)
y[0]=x
z=C.b.i(z)
if(1>=3)return H.a(y,1)
y[1]=z
z=C.a.i(0)
if(2>=3)return H.a(y,2)
y[2]=z
return B.V(w,u,t,d)},
nT:function(c3,c4,c5,c6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
z=c3.gbQ()
y=c6+1
c3.sbQ(c4.length)
c3.sfT(c5.length)
c3.sbd(0)
c3.sbV(0)
x=c6*c6*6
w=[P.x]
v=y*y
u=0
while(!0){t=c3.gap()
if(1>=t.length)return H.a(t,1)
if(!(u<t[1]-2))break
s=0
while(!0){t=c3.gap()
if(0>=t.length)return H.a(t,0)
if(!(s<t[0]-2))break
t=c3.gap()
if(0>=t.length)return H.a(t,0)
r=u*t[0]
t=z+r+s
q=c4.length
if(t>=q)return H.a(c4,t)
p=c4[t]
o=t+1
if(o>=q)return H.a(c4,o)
n=c4[o]
t+=2
if(t>=q)return H.a(c4,t)
m=c4[t]
t=c3.gap()
if(0>=t.length)return H.a(t,0)
r+=t[0]
t=z+r+s
q=c4.length
if(t>=q)return H.a(c4,t)
l=c4[t]
o=t+1
if(o>=q)return H.a(c4,o)
k=c4[o]
t+=2
if(t>=q)return H.a(c4,t)
j=c4[t]
t=c3.gap()
if(0>=t.length)return H.a(t,0)
t=z+(r+t[0])+s
q=c4.length
if(t>=q)return H.a(c4,t)
i=c4[t]
o=t+1
if(o>=q)return H.a(c4,o)
h=c4[o]
t+=2
if(t>=q)return H.a(c4,t)
g=c4[t]
f=c3.gbd()
c3.sbd(c3.gbd()+v)
for(e=0;e<y;++e){d=e/c6
c=B.V(new Q.n(p.a,null,H.i(new Array(4),w)),new Q.n(l.a,null,H.i(new Array(4),w)),new Q.n(i.a,null,H.i(new Array(4),w)),d)
t=p.c
q=t.length
if(0>=q)return H.a(t,0)
o=t[0]
if(1>=q)return H.a(t,1)
t=t[1]
q=new Q.n(null,null,H.i(new Array(4),w))
b=new Float32Array(3)
q.a=b
o=C.b.i(o)
if(0>=3)return H.a(b,0)
b[0]=o
t=C.b.i(t)
if(1>=3)return H.a(b,1)
b[1]=t
t=C.a.i(0)
if(2>=3)return H.a(b,2)
b[2]=t
t=l.c
b=t.length
if(0>=b)return H.a(t,0)
o=t[0]
if(1>=b)return H.a(t,1)
t=t[1]
b=new Q.n(null,null,H.i(new Array(4),w))
a=new Float32Array(3)
b.a=a
o=C.b.i(o)
if(0>=3)return H.a(a,0)
a[0]=o
t=C.b.i(t)
if(1>=3)return H.a(a,1)
a[1]=t
t=C.a.i(0)
if(2>=3)return H.a(a,2)
a[2]=t
t=i.c
a=t.length
if(0>=a)return H.a(t,0)
o=t[0]
if(1>=a)return H.a(t,1)
t=t[1]
a=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
a.a=a0
o=C.b.i(o)
if(0>=3)return H.a(a0,0)
a0[0]=o
t=C.b.i(t)
if(1>=3)return H.a(a0,1)
a0[1]=t
t=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=t
a1=B.cJ(q,b,a,d)
a=p.b
b=a.length
if(0>=b)return H.a(a,0)
q=a[0]
if(1>=b)return H.a(a,1)
a=a[1]
b=new Q.n(null,null,H.i(new Array(4),w))
t=new Float32Array(3)
b.a=t
q=C.b.i(q)
if(0>=3)return H.a(t,0)
t[0]=q
a=C.b.i(a)
if(1>=3)return H.a(t,1)
t[1]=a
a=C.a.i(0)
if(2>=3)return H.a(t,2)
t[2]=a
a=l.b
t=a.length
if(0>=t)return H.a(a,0)
q=a[0]
if(1>=t)return H.a(a,1)
a=a[1]
t=new Q.n(null,null,H.i(new Array(4),w))
o=new Float32Array(3)
t.a=o
q=C.b.i(q)
if(0>=3)return H.a(o,0)
o[0]=q
a=C.b.i(a)
if(1>=3)return H.a(o,1)
o[1]=a
a=C.a.i(0)
if(2>=3)return H.a(o,2)
o[2]=a
a=i.b
o=a.length
if(0>=o)return H.a(a,0)
q=a[0]
if(1>=o)return H.a(a,1)
a=a[1]
o=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
o.a=a0
q=C.b.i(q)
if(0>=3)return H.a(a0,0)
a0[0]=q
a=C.b.i(a)
if(1>=3)return H.a(a0,1)
a0[1]=a
a=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=a
a2=B.cJ(b,t,o,d)
o=p.e
t=o.length
if(0>=t)return H.a(o,0)
b=o[0]
if(1>=t)return H.a(o,1)
a=o[1]
if(2>=t)return H.a(o,2)
o=o[2]
t=new Q.n(null,null,H.i(new Array(4),w))
q=new Float32Array(3)
t.a=q
b=C.b.i(b)
if(0>=3)return H.a(q,0)
q[0]=b
a=C.b.i(a)
if(1>=3)return H.a(q,1)
q[1]=a
o=C.b.i(o)
if(2>=3)return H.a(q,2)
q[2]=o
o=l.e
q=o.length
if(0>=q)return H.a(o,0)
a=o[0]
if(1>=q)return H.a(o,1)
b=o[1]
if(2>=q)return H.a(o,2)
o=o[2]
q=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
q.a=a0
a=C.b.i(a)
if(0>=3)return H.a(a0,0)
a0[0]=a
b=C.b.i(b)
if(1>=3)return H.a(a0,1)
a0[1]=b
o=C.b.i(o)
if(2>=3)return H.a(a0,2)
a0[2]=o
o=i.e
a0=o.length
if(0>=a0)return H.a(o,0)
b=o[0]
if(1>=a0)return H.a(o,1)
a=o[1]
if(2>=a0)return H.a(o,2)
o=o[2]
a0=new Q.n(null,null,H.i(new Array(4),w))
a3=new Float32Array(3)
a0.a=a3
b=C.b.i(b)
if(0>=3)return H.a(a3,0)
a3[0]=b
a=C.b.i(a)
if(1>=3)return H.a(a3,1)
a3[1]=a
o=C.b.i(o)
if(2>=3)return H.a(a3,2)
a3[2]=o
a4=B.V(t,q,a0,d)
H.i(new Array(4),w)
t=new Float32Array(3)
q=C.a.i(0)
if(0>=3)return H.a(t,0)
t[0]=q
q=C.a.i(0)
if(1>=3)return H.a(t,1)
t[1]=q
q=C.a.i(1)
if(2>=3)return H.a(t,2)
t[2]=q
a5=new B.cA(null,null,null,null,null)
a5.a=c.a
a5.b=a2.a
a5.c=a1.a
a5.d=t
a5.e=a4.a
c4.push(a5)}for(e=1;e<y;++e){d=e/c6
a6=B.V(new Q.n(p.a,null,H.i(new Array(4),w)),new Q.n(n.a,null,H.i(new Array(4),w)),new Q.n(m.a,null,H.i(new Array(4),w)),d)
a7=B.V(new Q.n(l.a,null,H.i(new Array(4),w)),new Q.n(k.a,null,H.i(new Array(4),w)),new Q.n(j.a,null,H.i(new Array(4),w)),d)
a8=B.V(new Q.n(i.a,null,H.i(new Array(4),w)),new Q.n(h.a,null,H.i(new Array(4),w)),new Q.n(g.a,null,H.i(new Array(4),w)),d)
t=p.b
q=t.length
if(0>=q)return H.a(t,0)
o=t[0]
if(1>=q)return H.a(t,1)
t=t[1]
q=new Q.n(null,null,H.i(new Array(4),w))
b=new Float32Array(3)
q.a=b
o=C.b.i(o)
if(0>=3)return H.a(b,0)
b[0]=o
t=C.b.i(t)
if(1>=3)return H.a(b,1)
b[1]=t
t=C.a.i(0)
if(2>=3)return H.a(b,2)
b[2]=t
t=n.b
b=t.length
if(0>=b)return H.a(t,0)
o=t[0]
if(1>=b)return H.a(t,1)
t=t[1]
b=new Q.n(null,null,H.i(new Array(4),w))
a=new Float32Array(3)
b.a=a
o=C.b.i(o)
if(0>=3)return H.a(a,0)
a[0]=o
t=C.b.i(t)
if(1>=3)return H.a(a,1)
a[1]=t
t=C.a.i(0)
if(2>=3)return H.a(a,2)
a[2]=t
t=m.b
a=t.length
if(0>=a)return H.a(t,0)
o=t[0]
if(1>=a)return H.a(t,1)
t=t[1]
a=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
a.a=a0
o=C.b.i(o)
if(0>=3)return H.a(a0,0)
a0[0]=o
t=C.b.i(t)
if(1>=3)return H.a(a0,1)
a0[1]=t
t=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=t
a9=B.V(q,b,a,d)
a=l.b
b=a.length
if(0>=b)return H.a(a,0)
q=a[0]
if(1>=b)return H.a(a,1)
a=a[1]
b=new Q.n(null,null,H.i(new Array(4),w))
t=new Float32Array(3)
b.a=t
q=C.b.i(q)
if(0>=3)return H.a(t,0)
t[0]=q
a=C.b.i(a)
if(1>=3)return H.a(t,1)
t[1]=a
a=C.a.i(0)
if(2>=3)return H.a(t,2)
t[2]=a
a=k.b
t=a.length
if(0>=t)return H.a(a,0)
q=a[0]
if(1>=t)return H.a(a,1)
a=a[1]
t=new Q.n(null,null,H.i(new Array(4),w))
o=new Float32Array(3)
t.a=o
q=C.b.i(q)
if(0>=3)return H.a(o,0)
o[0]=q
a=C.b.i(a)
if(1>=3)return H.a(o,1)
o[1]=a
a=C.a.i(0)
if(2>=3)return H.a(o,2)
o[2]=a
a=j.b
o=a.length
if(0>=o)return H.a(a,0)
q=a[0]
if(1>=o)return H.a(a,1)
a=a[1]
o=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
o.a=a0
q=C.b.i(q)
if(0>=3)return H.a(a0,0)
a0[0]=q
a=C.b.i(a)
if(1>=3)return H.a(a0,1)
a0[1]=a
a=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=a
b0=B.V(b,t,o,d)
o=i.b
t=o.length
if(0>=t)return H.a(o,0)
b=o[0]
if(1>=t)return H.a(o,1)
o=o[1]
t=new Q.n(null,null,H.i(new Array(4),w))
q=new Float32Array(3)
t.a=q
b=C.b.i(b)
if(0>=3)return H.a(q,0)
q[0]=b
o=C.b.i(o)
if(1>=3)return H.a(q,1)
q[1]=o
o=C.a.i(0)
if(2>=3)return H.a(q,2)
q[2]=o
o=h.b
q=o.length
if(0>=q)return H.a(o,0)
b=o[0]
if(1>=q)return H.a(o,1)
o=o[1]
q=new Q.n(null,null,H.i(new Array(4),w))
a=new Float32Array(3)
q.a=a
b=C.b.i(b)
if(0>=3)return H.a(a,0)
a[0]=b
o=C.b.i(o)
if(1>=3)return H.a(a,1)
a[1]=o
o=C.a.i(0)
if(2>=3)return H.a(a,2)
a[2]=o
o=g.b
a=o.length
if(0>=a)return H.a(o,0)
b=o[0]
if(1>=a)return H.a(o,1)
o=o[1]
a=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
a.a=a0
b=C.b.i(b)
if(0>=3)return H.a(a0,0)
a0[0]=b
o=C.b.i(o)
if(1>=3)return H.a(a0,1)
a0[1]=o
o=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=o
b1=B.V(t,q,a,d)
a=p.c
q=a.length
if(0>=q)return H.a(a,0)
t=a[0]
if(1>=q)return H.a(a,1)
a=a[1]
q=new Q.n(null,null,H.i(new Array(4),w))
o=new Float32Array(3)
q.a=o
t=C.b.i(t)
if(0>=3)return H.a(o,0)
o[0]=t
a=C.b.i(a)
if(1>=3)return H.a(o,1)
o[1]=a
a=C.a.i(0)
if(2>=3)return H.a(o,2)
o[2]=a
a=n.c
o=a.length
if(0>=o)return H.a(a,0)
t=a[0]
if(1>=o)return H.a(a,1)
a=a[1]
o=new Q.n(null,null,H.i(new Array(4),w))
b=new Float32Array(3)
o.a=b
t=C.b.i(t)
if(0>=3)return H.a(b,0)
b[0]=t
a=C.b.i(a)
if(1>=3)return H.a(b,1)
b[1]=a
a=C.a.i(0)
if(2>=3)return H.a(b,2)
b[2]=a
a=m.c
b=a.length
if(0>=b)return H.a(a,0)
t=a[0]
if(1>=b)return H.a(a,1)
a=a[1]
b=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
b.a=a0
t=C.b.i(t)
if(0>=3)return H.a(a0,0)
a0[0]=t
a=C.b.i(a)
if(1>=3)return H.a(a0,1)
a0[1]=a
a=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=a
b2=B.V(q,o,b,d)
b=l.c
o=b.length
if(0>=o)return H.a(b,0)
q=b[0]
if(1>=o)return H.a(b,1)
b=b[1]
o=new Q.n(null,null,H.i(new Array(4),w))
t=new Float32Array(3)
o.a=t
q=C.b.i(q)
if(0>=3)return H.a(t,0)
t[0]=q
b=C.b.i(b)
if(1>=3)return H.a(t,1)
t[1]=b
b=C.a.i(0)
if(2>=3)return H.a(t,2)
t[2]=b
b=k.c
t=b.length
if(0>=t)return H.a(b,0)
q=b[0]
if(1>=t)return H.a(b,1)
b=b[1]
t=new Q.n(null,null,H.i(new Array(4),w))
a=new Float32Array(3)
t.a=a
q=C.b.i(q)
if(0>=3)return H.a(a,0)
a[0]=q
b=C.b.i(b)
if(1>=3)return H.a(a,1)
a[1]=b
b=C.a.i(0)
if(2>=3)return H.a(a,2)
a[2]=b
b=j.c
a=b.length
if(0>=a)return H.a(b,0)
q=b[0]
if(1>=a)return H.a(b,1)
b=b[1]
a=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
a.a=a0
q=C.b.i(q)
if(0>=3)return H.a(a0,0)
a0[0]=q
b=C.b.i(b)
if(1>=3)return H.a(a0,1)
a0[1]=b
b=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=b
b3=B.V(o,t,a,d)
a=i.c
t=a.length
if(0>=t)return H.a(a,0)
o=a[0]
if(1>=t)return H.a(a,1)
a=a[1]
t=new Q.n(null,null,H.i(new Array(4),w))
q=new Float32Array(3)
t.a=q
o=C.b.i(o)
if(0>=3)return H.a(q,0)
q[0]=o
a=C.b.i(a)
if(1>=3)return H.a(q,1)
q[1]=a
a=C.a.i(0)
if(2>=3)return H.a(q,2)
q[2]=a
a=h.c
q=a.length
if(0>=q)return H.a(a,0)
o=a[0]
if(1>=q)return H.a(a,1)
a=a[1]
q=new Q.n(null,null,H.i(new Array(4),w))
b=new Float32Array(3)
q.a=b
o=C.b.i(o)
if(0>=3)return H.a(b,0)
b[0]=o
a=C.b.i(a)
if(1>=3)return H.a(b,1)
b[1]=a
a=C.a.i(0)
if(2>=3)return H.a(b,2)
b[2]=a
a=g.c
b=a.length
if(0>=b)return H.a(a,0)
o=a[0]
if(1>=b)return H.a(a,1)
a=a[1]
b=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
b.a=a0
o=C.b.i(o)
if(0>=3)return H.a(a0,0)
a0[0]=o
a=C.b.i(a)
if(1>=3)return H.a(a0,1)
a0[1]=a
a=C.a.i(0)
if(2>=3)return H.a(a0,2)
a0[2]=a
b4=B.V(t,q,b,d)
b=p.e
q=b.length
if(0>=q)return H.a(b,0)
t=b[0]
if(1>=q)return H.a(b,1)
a=b[1]
if(2>=q)return H.a(b,2)
b=b[2]
q=new Q.n(null,null,H.i(new Array(4),w))
o=new Float32Array(3)
q.a=o
t=C.b.i(t)
if(0>=3)return H.a(o,0)
o[0]=t
a=C.b.i(a)
if(1>=3)return H.a(o,1)
o[1]=a
b=C.b.i(b)
if(2>=3)return H.a(o,2)
o[2]=b
b=n.e
o=b.length
if(0>=o)return H.a(b,0)
a=b[0]
if(1>=o)return H.a(b,1)
t=b[1]
if(2>=o)return H.a(b,2)
b=b[2]
o=new Q.n(null,null,H.i(new Array(4),w))
a0=new Float32Array(3)
o.a=a0
a=C.b.i(a)
if(0>=3)return H.a(a0,0)
a0[0]=a
t=C.b.i(t)
if(1>=3)return H.a(a0,1)
a0[1]=t
b=C.b.i(b)
if(2>=3)return H.a(a0,2)
a0[2]=b
b=m.e
a0=b.length
if(0>=a0)return H.a(b,0)
t=b[0]
if(1>=a0)return H.a(b,1)
a=b[1]
if(2>=a0)return H.a(b,2)
b=b[2]
a0=new Q.n(null,null,H.i(new Array(4),w))
a3=new Float32Array(3)
a0.a=a3
t=C.b.i(t)
if(0>=3)return H.a(a3,0)
a3[0]=t
a=C.b.i(a)
if(1>=3)return H.a(a3,1)
a3[1]=a
b=C.b.i(b)
if(2>=3)return H.a(a3,2)
a3[2]=b
b5=B.V(q,o,a0,d)
a0=l.e
o=a0.length
if(0>=o)return H.a(a0,0)
q=a0[0]
if(1>=o)return H.a(a0,1)
b=a0[1]
if(2>=o)return H.a(a0,2)
a0=a0[2]
o=new Q.n(null,null,H.i(new Array(4),w))
t=new Float32Array(3)
o.a=t
q=C.b.i(q)
if(0>=3)return H.a(t,0)
t[0]=q
b=C.b.i(b)
if(1>=3)return H.a(t,1)
t[1]=b
a0=C.b.i(a0)
if(2>=3)return H.a(t,2)
t[2]=a0
a0=k.e
t=a0.length
if(0>=t)return H.a(a0,0)
b=a0[0]
if(1>=t)return H.a(a0,1)
q=a0[1]
if(2>=t)return H.a(a0,2)
a0=a0[2]
t=new Q.n(null,null,H.i(new Array(4),w))
a=new Float32Array(3)
t.a=a
b=C.b.i(b)
if(0>=3)return H.a(a,0)
a[0]=b
q=C.b.i(q)
if(1>=3)return H.a(a,1)
a[1]=q
a0=C.b.i(a0)
if(2>=3)return H.a(a,2)
a[2]=a0
a0=j.e
a=a0.length
if(0>=a)return H.a(a0,0)
q=a0[0]
if(1>=a)return H.a(a0,1)
b=a0[1]
if(2>=a)return H.a(a0,2)
a0=a0[2]
a=new Q.n(null,null,H.i(new Array(4),w))
a3=new Float32Array(3)
a.a=a3
q=C.b.i(q)
if(0>=3)return H.a(a3,0)
a3[0]=q
b=C.b.i(b)
if(1>=3)return H.a(a3,1)
a3[1]=b
a0=C.b.i(a0)
if(2>=3)return H.a(a3,2)
a3[2]=a0
b6=B.V(o,t,a,d)
a=i.e
t=a.length
if(0>=t)return H.a(a,0)
o=a[0]
if(1>=t)return H.a(a,1)
a0=a[1]
if(2>=t)return H.a(a,2)
a=a[2]
t=new Q.n(null,null,H.i(new Array(4),w))
q=new Float32Array(3)
t.a=q
o=C.b.i(o)
if(0>=3)return H.a(q,0)
q[0]=o
a0=C.b.i(a0)
if(1>=3)return H.a(q,1)
q[1]=a0
a=C.b.i(a)
if(2>=3)return H.a(q,2)
q[2]=a
a=h.e
q=a.length
if(0>=q)return H.a(a,0)
a0=a[0]
if(1>=q)return H.a(a,1)
o=a[1]
if(2>=q)return H.a(a,2)
a=a[2]
q=new Q.n(null,null,H.i(new Array(4),w))
b=new Float32Array(3)
q.a=b
a0=C.b.i(a0)
if(0>=3)return H.a(b,0)
b[0]=a0
o=C.b.i(o)
if(1>=3)return H.a(b,1)
b[1]=o
a=C.b.i(a)
if(2>=3)return H.a(b,2)
b[2]=a
a=g.e
b=a.length
if(0>=b)return H.a(a,0)
o=a[0]
if(1>=b)return H.a(a,1)
a0=a[1]
if(2>=b)return H.a(a,2)
a=a[2]
b=new Q.n(null,null,H.i(new Array(4),w))
a3=new Float32Array(3)
b.a=a3
o=C.b.i(o)
if(0>=3)return H.a(a3,0)
a3[0]=o
a0=C.b.i(a0)
if(1>=3)return H.a(a3,1)
a3[1]=a0
a=C.b.i(a)
if(2>=3)return H.a(a3,2)
a3[2]=a
b7=B.V(t,q,b,d)
for(b8=0;b8<y;++b8){b9=b8/c6
c=B.V(a6,a7,a8,b9)
a2=B.cJ(a9,b0,b1,b9)
a1=B.cJ(b2,b3,b4,b9)
a4=B.V(b5,b6,b7,d)
H.i(new Array(4),w)
t=new Float32Array(3)
q=C.a.i(0)
if(0>=3)return H.a(t,0)
t[0]=q
q=C.a.i(0)
if(1>=3)return H.a(t,1)
t[1]=q
q=C.a.i(1)
if(2>=3)return H.a(t,2)
t[2]=q
a5=new B.cA(null,null,null,null,null)
a5.a=c.a
a5.b=a2.a
a5.c=a1.a
a5.d=t
a5.e=a4.a
c4.push(a5)}}c3.sbV(c3.gbV()+x)
for(c0=0;c0<c6;c0=c1)for(c1=c0+1,t=f+c1*y,q=f+c0*y,c2=0;c2<c6;){o=t+c2
c5.push(o)
c5.push(q+c2);++c2
b=q+c2
c5.push(b)
c5.push(o)
c5.push(b)
c5.push(t+c2)}s+=2}u+=2}},
i9:{"^":"d;a,b,c",
R:function(a){var z,y,x,w,v
z=this.a
y=2+a*2
x=z.length
if(y>=x)return H.a(z,y)
w=z[y];++y
if(y>=x)return H.a(z,y)
v=z[y]
P.ab("getLump: "+a+" "+w+" "+v)
y=new B.ie(w,v,null,0)
y.c=J.hr(this.b,w,v)
return y},
dQ:function(){var z,y,x,w,v,u
z=this.R(13)
y=H.i(new Array(C.a.I(z.b,104)),[B.cy])
x=y.length
P.ab("surfaces.length "+C.a.l(x))
for(w=0;w<x;++w){v=new B.cy(null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
v.y=z.c_(2)
v.z=z.c_(2)
v.Q=z.a5(3)
v.ch=z.a5(9)
v.cx=z.c_(2)
y[w]=v}return y},
dK:function(){var z,y,x,w,v,u,t,s,r,q
z=this.R(10)
y=C.a.I(z.b,44)
x=H.i([],[B.cA])
for(w=0;w<y;++w){v=new B.cA(null,null,null,null,null)
v.a=z.a5(3)
v.b=z.a5(2)
v.c=z.a5(2)
v.d=z.a5(3)
u=new Float32Array(3)
v.e=u
t=z.c
s=t.buffer
t=t.byteOffset
r=z.d
if(typeof t!=="number")return t.H()
r=t+r
s.toString
H.c9(s,r,4)
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
dJ:function(){var z,y,x,w,v
z=this.R(11)
y=C.a.I(z.b,4)
x=H.i([],[P.q])
for(w=0;w<y;++w){v=z.d+=4
x.push(z.c.getUint32(v-4,!0))}return x},
dP:function(){var z,y,x,w,v,u,t,s,r
z=this.R(1)
y=z.b
x=H.i(new Array(C.a.I(y,72)),[B.f6])
w=x.length
P.ab("shaders.length "+C.a.l(w))
P.ab(y)
P.ab(72)
for(v=0;v<w;++v){y=z.c
u=y.buffer
y=y.byteOffset
t=z.d
if(typeof y!=="number")return y.H()
t=y+t
u.toString
H.c9(u,t,64)
s=new Uint8Array(u,t,64)
z.d+=64
r=P.fb(s,0,null)
if(C.e.dd(r,"\x00")>=0)r=C.e.b_(r,0,C.e.dd(r,"\x00"))
y=z.d+=4
y=z.c.getUint32(y-4,!0)
u=z.d+=4
x[v]=new B.f6(r,y,z.c.getUint32(u-4,!0))}return x},
dH:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=P.D
y=new H.Z(0,null,null,null,null,null,0,[z,z])
x=new B.iu(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,y,new H.Z(0,null,null,null,null,null,0,[z,z]),0)
x.b=this.dP()
z=this.dQ()
x.cy=z
x.db=P.a5(z.length,new B.ia(x),!0,B.cy)
x.Q=this.dK()
x.ch=this.dJ()
for(z=x.cy,y=z.length,w=0;w<y;++w){v=z[w]
if(v.c===$.fc)B.nT(v,x.Q,x.ch,20)}x.d=B.i8(this.R(3))
x.c=B.kw(this.R(2))
x.e=B.kd(this.R(4))
z=this.R(5)
x.f=z.aq(C.a.I(z.b,4))
z=this.R(6)
x.r=z.aq(C.a.I(z.b,4))
z=B.ii(this.R(8))
x.y=z
for(y=z.length,w=0;w<y;++w){u=z[w]
t=x.b
s=u.c
if(s<0||s>=t.length)return H.a(t,s)
u.e=t[s].c}z=B.ij(this.R(9))
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
J.R(s,0,J.L(q[o].b))
if(1>=t.length)return H.a(t,1)
o=t[1]
q=x.c
s=x.z
p=u.a+1
if(p<0||p>=s.length)return H.a(s,p)
p=s[p].a
if(p<0||p>=q.length)return H.a(q,p)
J.R(o,0,q[p].b)
if(0>=t.length)return H.a(t,0)
p=t[0]
q=x.c
o=x.z
s=u.a+2
if(s<0||s>=o.length)return H.a(o,s)
s=o[s].a
if(s<0||s>=q.length)return H.a(q,s)
J.R(p,1,J.L(q[s].b))
if(1>=t.length)return H.a(t,1)
s=t[1]
q=x.c
p=x.z
o=u.a+3
if(o<0||o>=p.length)return H.a(p,o)
o=p[o].a
if(o<0||o>=q.length)return H.a(q,o)
J.R(s,1,q[o].b)
if(0>=t.length)return H.a(t,0)
o=t[0]
q=x.c
s=x.z
p=u.a+4
if(p<0||p>=s.length)return H.a(s,p)
p=s[p].a
if(p<0||p>=q.length)return H.a(q,p)
J.R(o,2,J.L(q[p].b))
if(1>=t.length)return H.a(t,1)
t=t[1]
p=x.c
q=x.z
o=u.a+5
if(o<0||o>=q.length)return H.a(q,o)
o=q[o].a
if(o<0||o>=p.length)return H.a(p,o)
J.R(t,2,p[o].b)}for(z=x.y,y=z.length,w=0;w<y;++w){t=z[w].d
if(0>=t.length)return H.a(t,0)
n=H.j(t[0])
H.ak(n)
if(1>=t.length)return H.a(t,1)
n=H.j(t[1])
H.ak(n)}x.x=B.kp(this.R(7))
return x}},
ia:{"^":"l:8;a",
$1:function(a){var z,y
z=this.a.cy
if(a>=z.length)return H.a(z,a)
z=z[a]
y=new B.cy(null,null,null,null,null,null,null,null,null,null,null,null,null,null)
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
ie:{"^":"d;a,k:b>,c,d",
a5:function(a){var z,y,x,w
z=H.N(a)
y=new Float32Array(z)
for(x=0;x<z;++x){w=this.d+=4
y[x]=this.c.getFloat32(w-4,!0)}return y},
hu:function(a){var z,y,x,w
z=this.c
y=z.buffer
z=z.byteOffset
x=this.d
if(typeof z!=="number")return z.H()
y.toString
w=H.eT(y,z+x,a)
this.d+=a
return w},
c_:function(a){var z,y,x,w
z=H.N(a)
y=new Uint32Array(z)
for(x=0;x<z;++x){w=this.d+=4
y[x]=this.c.getUint32(w-4,!0)}return y},
aq:function(a){var z,y,x,w
z=H.N(a)
y=new Int32Array(z)
for(x=0;x<z;++x){w=this.d+=4
y[x]=this.c.getInt32(w-4,!0)}return y}},
ee:{"^":"d;a,b,bm:c<,d,b7:e<,f",v:{
ii:function(a){var z,y,x,w,v
z=H.i(new Array(C.a.I(a.b,12)),[B.ee])
for(y=z.length,x=0;x<y;++x){w=new B.ee(null,null,null,B.cQ(2),null,0)
v=a.d+=4
w.a=a.c.getInt32(v-4,!0)
v=a.d+=4
w.b=a.c.getInt32(v-4,!0)
v=a.d+=4
w.c=a.c.getInt32(v-4,!0)
z[x]=w}return z}}},
ef:{"^":"d;a,bm:b<,b0:c<",v:{
ij:function(a){var z,y,x,w,v,u
z=C.a.I(a.b,8)
y=H.i(new Array(z),[B.ef])
for(x=y.length,w=0;w<z;++w){v=new B.ef(null,null,null)
u=a.d+=4
v.a=a.c.getInt32(u-4,!0)
u=a.d+=4
v.b=a.c.getInt32(u-4,!0)
if(w>=x)return H.a(y,w)
y[w]=v}return y}}},
ea:{"^":"d;a,b,c,d",v:{
i8:function(a){var z,y,x,w,v,u
z=C.a.I(a.b,36)
y=H.i(new Array(z),[B.ea])
for(x=y.length,w=0;w<z;++w){v=new B.ea(null,null,null,null)
u=a.d+=4
v.a=a.c.getInt32(u-4,!0)
v.b=a.aq(2)
v.c=a.aq(3)
v.d=a.aq(3)
if(w>=x)return H.a(y,w)
y[w]=v}return y}}},
iu:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go"},
lr:{"^":"d;a"},
nY:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
dh:{"^":"d;a,b,c,d,e,f,r,x",v:{
kd:function(a){var z,y,x,w,v,u
z=C.a.I(a.b,48)
y=H.i(new Array(z),[B.dh])
for(x=y.length,w=0;w<z;++w){v=new B.dh(null,null,null,null,null,null,null,null)
u=a.d+=4
v.a=a.c.getInt32(u-4,!0)
u=a.d+=4
v.b=a.c.getInt32(u-4,!0)
v.c=a.aq(3)
v.d=a.aq(3)
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
eN:{"^":"d;a,b,c,d,e,f",v:{
kp:function(a){var z,y,x,w,v,u,t
z=H.i(new Array(C.a.I(a.b,40)),[B.eN])
for(y=z.length,x=[P.x],w=0;w<y;++w){v=new B.eN(null,null,null,null,null,null)
u=a.a5(3)
v.a=new Q.n(u,null,H.i(new Array(4),x))
t=u.length
if(0>=t)return H.a(u,0)
u[0]=u[0]-1
if(1>=t)return H.a(u,1)
u[1]=u[1]-1
if(2>=t)return H.a(u,2)
u[2]=u[2]-1
u=a.a5(3)
v.b=new Q.n(u,null,H.i(new Array(4),x))
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
mT:{"^":"l:0;",
$1:function(a){var z=new Array(4)
z.fixed$length=Array
return new B.c_(H.i(z,[P.x]),null)}},
j_:{"^":"d;a,b,c,d,e",
l:function(a){var z,y,x,w,v
z="width: "+H.j(this.a)+", height: "+H.j(this.b)+", "+H.j(this.c)+", "+H.j(this.d)+"\n"
y=this.e
x=0
while(!0){w=this.a
if(typeof w!=="number")return H.m(w)
if(!(x<w))break
v=0
while(!0){w=this.b
if(typeof w!=="number")return H.m(w)
if(!(v<w))break
if(x>=y.length)return H.a(y,x)
z=z+H.j(J.e(y[x],v))+",";++v}z+="\n";++x}return z.charCodeAt(0)==0?z:z}},
mR:{"^":"l:0;",
$1:function(a){return P.a5(129,new B.mo(),!0,Q.n)}},
mo:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
lo:{"^":"d;a,b",
ew:function(a){this.b=P.a5(a,new B.lp(),!0,Q.n)},
v:{
dz:function(a){var z=new B.lo(0,null)
z.ew(a)
return z}}},
lp:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
c_:{"^":"d;w:a<,aZ:b@"},
d7:{"^":"d;a,b,c,d,e"},
ku:{"^":"d;a,b,c,d,e"},
mS:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
kt:{"^":"d;a,b0:b<,b7:c<,d"},
nu:{"^":"l:0;",
$1:function(a){return P.a5(129,new B.nt(),!0,[P.c,P.q])}},
nt:{"^":"l:0;",
$1:function(a){var z=new Array(2)
z.fixed$length=Array
return H.i(z,[P.q])}},
iG:{"^":"l:8;a",
$1:function(a){var z=this.a.b
if(a>=z.length)return H.a(z,a)
return Q.bu(z[a])}},
nX:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
nH:{"^":"l:0;",
$1:function(a){return Q.k(0,0,0)}},
cr:{"^":"d;hr:a<,d3:b<,n:c>,aZ:d@",
bl:function(){var z,y
z=this.a.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]===1)y=0
else{if(1>=y)return H.a(z,1)
if(z[1]===1)y=1
else{if(2>=y)return H.a(z,2)
y=z[2]===1?2:3}}this.c=y
this.d=B.cc(z)},
em:function(a,b){if(this.a==null)this.a=Q.k(0,0,0)
if(this.b==null)this.b=0
this.bl()},
v:{
c0:function(a,b){var z=new B.cr(a,b,null,null)
z.em(a,b)
return z},
kw:function(a){var z,y,x,w,v,u,t,s
z=C.a.I(a.b,16)
y=H.i(new Array(z),[B.cr])
for(x=y.length,w=[P.x],v=0;v<z;++v){u=new B.cr(null,null,null,null)
t=new Q.n(a.a5(3),null,H.i(new Array(4),w))
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
u.d=B.cc(t)
if(v>=x)return H.a(y,v)
y[v]=u}return y}}},
f6:{"^":"d;a,b0:b<,c"},
cy:{"^":"d;bm:a<,b,ef:c<,bQ:d@,bd:e@,fT:f?,bV:r@,x,y,z,Q,ch,ap:cx<,dq:cy@"},
cA:{"^":"d;a,b,c,d,e"}}],["","",,E,{"^":"",io:{"^":"d;a,b,c",
bT:function(a,b){var z=new XMLHttpRequest()
z.responseType="arraybuffer"
C.j.dm(z,"GET",a)
new W.ae(0,z,"loadend",W.a7(new E.iq(this,b,z)),!1,[W.f1]).S()
z.send("")},
bZ:function(a){var z,y
z=this.c
if(z.h(0,a)==null)return
y=this.a.createBufferSource()
y.buffer=z.h(0,a)
y.connect(this.b,0,0)
if(!!y.start)y.start(0)
else y.noteOn(0)},
ei:function(a){var z=new (window.AudioContext||window.webkitAudioContext)()
this.a=z
z=J.hx(z)
this.b=z
z.gain.value=a
z.connect(this.a.destination,0,0)}},iq:{"^":"l:0;a,b,c",
$1:[function(a){var z,y
z=H.bJ(W.fH(this.c.response),"$isbO")
y=this.a
J.hA(y.a,z).aS(new E.ip(y,this.b))},null,null,2,0,null,0,"call"]},ip:{"^":"l:23;a,b",
$1:[function(a){this.a.c.j(0,this.b,a)},null,null,2,0,null,28,"call"]}}],["","",,B,{"^":"",
nI:function(a){var z,y,x
z=document
y=[W.ck]
new W.ae(0,z,"keydown",W.a7(new B.nJ()),!1,y).S()
new W.ae(0,z,"keyup",W.a7(new B.nK()),!1,y).S()
if(!$.hd)new W.ae(0,z,"mousemove",W.a7(new B.nL()),!1,[W.ap]).S()
y=[W.ap]
new W.ae(0,z,"mousedown",W.a7(new B.nM()),!1,y).S()
x=J.hI(a)
new W.ae(0,x.a,x.b,W.a7(new B.nN()),!1,[H.bG(x,0)]).S()
new W.ae(0,z,"mouseup",W.a7(new B.nO()),!1,y).S()},
mM:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
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
H.ak("this sucks")
return 1}$.a8=1e5
$.az=0
if(B.bF(t-u,x-u,c,d,e)&&B.bI(e,a,b,1)){n=c.am(e)
if(n<$.a8){$.a8=n
$.az=1
$.$get$aT().m(0,e)}}z=c.a
if(1>=z.length)return H.a(z,1)
z=z[1]
y=a.a
if(1>=y.length)return H.a(y,1)
y=y[1]
x=d.a
if(1>=x.length)return H.a(x,1)
if(B.bF(z-y,x[1]-y,c,d,e)&&B.bI(e,a,b,2)){n=c.am(e)
if(n<$.a8){$.a8=n
$.az=2
$.$get$aT().m(0,e)}}z=c.a
if(2>=z.length)return H.a(z,2)
z=z[2]
y=a.a
if(2>=y.length)return H.a(y,2)
y=y[2]
x=d.a
if(2>=x.length)return H.a(x,2)
if(B.bF(z-y,x[2]-y,c,d,e)&&B.bI(e,a,b,3)){n=c.am(e)
if(n<$.a8){$.a8=n
$.az=3
$.$get$aT().m(0,e)}}z=c.a
if(0>=z.length)return H.a(z,0)
z=z[0]
y=b.a
if(0>=y.length)return H.a(y,0)
y=y[0]
x=d.a
if(0>=x.length)return H.a(x,0)
if(B.bF(z-y,x[0]-y,c,d,e)&&B.bI(e,a,b,1)){n=c.am(e)
if(n<$.a8){$.a8=n
$.az=4
$.$get$aT().m(0,e)}}z=c.a
if(1>=z.length)return H.a(z,1)
z=z[1]
y=b.a
if(1>=y.length)return H.a(y,1)
y=y[1]
x=d.a
if(1>=x.length)return H.a(x,1)
if(B.bF(z-y,x[1]-y,c,d,e)&&B.bI(e,a,b,2)){n=c.am(e)
if(n<$.a8){$.a8=n
$.az=5
$.$get$aT().m(0,e)}}z=c.a
if(2>=z.length)return H.a(z,2)
z=z[2]
y=b.a
if(2>=y.length)return H.a(y,2)
y=y[2]
x=d.a
if(2>=x.length)return H.a(x,2)
if(B.bF(z-y,x[2]-y,c,d,e)&&B.bI(e,a,b,3)){n=c.am(e)
if(n<$.a8){$.a8=n
$.az=6
$.$get$aT().m(0,e)}}if($.az>0)e.m(0,$.$get$aT())
return $.az},
bF:function(a,b,c,d,e){if(a*b>=0)return!1
if(a===b)return!1
$.$get$cd().m(0,d)
$.$get$cd().Z(c)
$.$get$cd().F(0,-a/(b-a))
e.m(0,$.$get$cd())
e.L(0,c)
return!0},
bI:function(a,b,c,d){var z,y,x,w,v,u,t
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
n0:function(){var z=new B.dv("Textured",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"","","","")
z.d="aVertexPosition"
z.f="aTextureCoord"
z.dx="uColor"
z.z="uMVMatrix"
z.ch="uPMatrix"
z.cx="uSampler"
z.k2="uniform vec3 uColor;"
z.k3="gl_FragColor = texture2D(uSampler, vaTextureCoord) + vec4( uColor, 0.0 );"
return B.fX(z)},
fX:function(a){var z,y,x
z="    precision mediump float;\r\n\r\n    attribute vec3 "+H.j(a.d)+";\r\n    \r\n    uniform mat4 "+H.j(a.z)+";\r\n    uniform mat4 "+H.j(a.ch)+";\r\n    "
y=a.f
if(y!=null)z+="        attribute vec2 "+H.j(y)+";\r\n        varying vec2 v"+H.j(a.f)+";\r\n        "
y=a.e
if(y!=null)z+="        attribute vec3 "+H.j(y)+";\r\n        varying vec3 v"+H.j(a.e)+";\r\n        "
z=z+(a.id+"\n")+"void main(void) {\n"+("gl_Position = "+H.j(a.ch)+" * "+H.j(a.z)+" * vec4("+H.j(a.d)+", 1.0);\n")
y=a.f
if(y!=null)z+="v"+H.j(y)+" = "+H.j(a.f)+";\n"
y=a.e
if(y!=null)z+="v"+H.j(y)+" = "+H.j(a.e)+";\n"
a.b=z+a.k1+"}\n"
y=a.f
x=y!=null?"precision mediump float;\n"+("varying vec2 v"+H.j(y)+";\n"):"precision mediump float;\n"
y=a.e
if(y!=null)x+="varying vec3 v"+H.j(y)+";\n"
y=a.cx
if(y!=null)x+="uniform sampler2D "+H.j(y)+";\n"
a.c=x+(a.k2+"\n")+"void main(void) {\n"+a.k3+"\n}\n"
return a},
n_:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b/2
y=[P.x]
x=H.i([],y)
w=H.i([],y)
v=H.i([],[P.q])
C.c.G(x,[0,z,0])
C.c.G(w,[0,0])
y=-z
C.c.G(x,[0,y,0])
C.c.G(w,[1,1])
for(u=0;u<c;++u){t=u/c
s=t*3.141592653589793*2
r=a*Math.sin(s)
q=a*Math.cos(s)
C.c.G(x,[r,z,q])
C.c.G(w,[t,t])
C.c.G(x,[r,y,q])
C.c.G(w,[1,t])
if(u>0){p=u*2+2
s=p-2
C.c.G(v,[0,s,p])
o=p-1
n=p+1
C.c.G(v,[1,o,n])
C.c.G(v,[s,p,n])
C.c.G(v,[o,n,s])}}p=c*2+2
y=p-2
C.c.G(v,[0,y,2])
s=p-1
C.c.G(v,[1,s,3])
C.c.G(v,[y,2,3])
C.c.G(v,[s,3,y])
return new B.dl(x,null,null,null,w,v,!1,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))},
e7:{"^":"d;b5:a>"},
ir:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1",
fo:function(a,b,c){var z,y
z=b.a
y=B.kR(this,b,z)
this.c.j(0,z,y)
return y},
d1:function(a,b){return this.fo(a,b,!0)},
bE:function(a,b,c){var z,y,x
for(z=this.d,z=z.gaC(z),z=z.gM(z);z.B();){y=z.gC()
x=J.o(y)
if(x.gb5(y)===!0)x.ab(y,c)}for(z=this.e,z=z.gaC(z),z=z.gM(z);z.B();)z.gC().$2(c,b)
for(z=this.c,z=z.gaC(z),z=z.gM(z);z.B();)J.hq(z.gC(),c)
z=this.cx
if(z!=null)z.ab(0,c)},
fH:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.Q
if(z!=null)J.e_(this.b,36160,z.d)
z=this.go
y=this.r
x=y.clientWidth
if(z==null?x==null:z===x){z=this.id
w=y.clientHeight
w=z==null?w!=null:z!==w
z=w}else z=!0
if(z){J.d0(y,x)
z=this.r
J.d_(z,z.clientHeight)
z=this.b
y=this.r
J.i2(z,0,0,y.clientWidth,y.clientHeight)
y=this.db
z=this.r
x=z.clientWidth
z=z.clientHeight
if(typeof x!=="number")return x.hT()
if(typeof z!=="number")return H.m(z)
w=this.fr
v=this.fx
u=w*Math.tan(0.4363323129985824)
t=u*(x/z)
z=-t
x=-u
s=t-z
r=u-x
q=v-w
y.ac(0)
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
this.id=w.clientHeight}J.e0(this.b,16640)
for(z=this.c,z=z.gaC(z),z=z.gM(z),y=this.db;z.B();)z.gC().fI(y)
z=this.Q
if(z!=null){o=J.hu(z.a,36160)===36053
if(!o)P.ab("FRAMEBUFFER_INCOMPLETE")
z=o}else z=!1
if(z){J.e_(this.b,36160,null)
J.e0(this.b,16640)
z=this.cy
this.cx.az(z,z)}},
be:[function(a){var z,y
if(a==null)a=0
if(J.t(this.k1,0))this.k1=a
z=J.I(a,this.k1)
this.k1=a
if(J.hG(z)){P.ab("isNaN(elapsed)")
z=0}this.bE(0,a,z)
this.fH()
y=window
C.p.eI(y)
C.p.eW(y,W.a7(this.ghy()))},function(){return this.be(null)},"ar","$1","$0","ghy",0,2,24,4,29],
ej:function(a,b,c,d,e,f){var z
this.r=document.querySelector(a)
z=J.hJ(this.r)
new W.ae(0,z.a,z.b,W.a7(new B.it()),!1,[H.bG(z,0)]).S()
z=this.r
J.d0(z,z.clientWidth)
z=this.r
J.d_(z,z.clientHeight)
z=J.hM(this.r,"experimental-webgl")
this.b=z
if(z==null)throw H.h(P.bS('calling canvas.getContext("experimental-webgl") failed, make sure you run on a computer that supports WebGL, test here: http://get.webgl.org/'))
$.eh=z
J.hv(z,0,0,0,1)
J.hE(this.b,2929)
this.f=this.d1(0,B.n0())
z=new B.l5(new H.Z(0,null,null,null,null,null,0,[P.D,B.c3]),this,null,!0,!1,9729,9729)
z.c=this.b
this.x=z
z=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
z.W()
this.y=new B.ik(null,z,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
z=new B.lm(this,null,null)
z.b=this.b
z.c=this.x
this.z=z
B.nI(this.r)},
v:{
is:function(a,b,c,d,e,f){var z,y,x,w,v
z=P.D
y=new H.Z(0,null,null,null,null,null,0,[z,B.f7])
x=new H.Z(0,null,null,null,null,null,0,[z,B.e7])
z=new H.Z(0,null,null,null,null,null,0,[z,{func:1,v:true,args:[P.x,P.x]}])
w=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
w.W()
v=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
v.W()
v=new B.ir(null,null,y,x,z,null,null,null,null,null,null,null,null,w,v,new B.kW(),new B.ig(1,770,771,32774,769,768,774),d,b,Q.k(0,0,0),0,0,0)
v.ej(a,b,c,d,!1,!1)
return v}}},
it:{"^":"l:3;",
$1:[function(a){J.cY(a)},null,null,2,0,null,30,"call"]},
ig:{"^":"d;a,b,c,d,e,f,r"},
ik:{"^":"f8;f,a,b,c,d,e",
cb:function(a,b){var z,y,x,w
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
nJ:{"^":"l:9;",
$1:[function(a){$.$get$cH().j(0,J.e1(a),!0)},null,null,2,0,null,0,"call"]},
nK:{"^":"l:9;",
$1:[function(a){$.$get$cH().j(0,J.e1(a),null)},null,null,2,0,null,0,"call"]},
nL:{"^":"l:3;",
$1:[function(a){var z,y,x
z=J.o(a)
$.mP=J.cV(z.ga4(a))
y=window.innerHeight
x=J.cW(z.ga4(a))
if(typeof y!=="number")return y.E()
if(typeof x!=="number")return H.m(x)
$.mQ=y-x
x=J.cV(z.ga4(a))
y=window.innerWidth
if(typeof y!=="number")return y.ag()
y=C.a.I(y,2)
if(typeof x!=="number")return x.E()
$.h4=x-y
z=J.cW(z.ga4(a))
y=window.innerHeight
if(typeof y!=="number")return y.ag()
y=C.a.I(y,2)
if(typeof z!=="number")return z.E()
$.h5=-(z-y)},null,null,2,0,null,0,"call"]},
nM:{"^":"l:3;",
$1:[function(a){var z,y,x
z=J.o(a)
y=J.cV(z.ga4(a))
x=window.innerWidth
if(typeof x!=="number")return x.ag()
x=C.a.I(x,2)
if(typeof y!=="number")return y.E()
$.no=y-x
x=J.cW(z.ga4(a))
y=window.innerHeight
if(typeof y!=="number")return y.ag()
y=C.a.I(y,2)
if(typeof x!=="number")return x.E()
$.np=-(x-y)
if(z.gcY(a)===2)$.$get$bB().j(0,"right",!0)
else $.$get$bB().j(0,"left",!0)},null,null,2,0,null,0,"call"]},
nN:{"^":"l:3;",
$1:[function(a){J.cY(a)},null,null,2,0,null,0,"call"]},
nO:{"^":"l:3;",
$1:[function(a){if(J.hF(a)===2)$.$get$bB().j(0,"right",null)
else $.$get$bB().j(0,"left",null)},null,null,2,0,null,0,"call"]},
da:{"^":"d;"},
kn:{"^":"b2;fr,fx,fy,go,id,k1,k2,k3,k4,a6:r1<,r2,rx,ry,x1,x2,y1,y2,fQ,d6,bO,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d,e",
d4:function(a){var z,y,x
J.al(this.fr,34962,this.x1)
J.d2(this.fr,a.f,3,5126,!1,0,0)
z=a.b
if(z.e!=null){J.al(this.fr,34962,this.x2)
J.d2(this.fr,a.r,3,5126,!1,0,0)}if(z.f!=null){J.al(this.fr,34962,this.y1)
J.d2(this.fr,a.x,2,5126,!1,0,0)}if(z.cx!=null){J.hp(this.fr,33984)
J.bK(this.fr,3553,this.r1)
J.hZ(this.fr,a.db,0)}if(z.dx!=null){y=a.fr
x=this.ry
J.i0(y.b,y.a,x.a)}z.y
J.e6(this.fr,a.ch,!1,this.Q.a)
z=this.d6
y=this.fr
if(z==null)J.hB(y,4,0,this.bO)
else{J.al(y,34963,z)
z=this.fr
y=this.bO
J.hC(z,4,y,$.d6?5125:5123,0)}},
el:function(a,b,c,d,e){var z,y,x
if(!a.r)a.dn()
z=$.eh
this.fr=z
z=J.bd(z)
this.x1=z
J.al(this.fr,34962,z)
J.aV(this.fr,34962,H.bJ(a.a,"$isb_"),35044)
if(a.b!=null){z=J.bd(this.fr)
this.x2=z
J.al(this.fr,34962,z)
J.aV(this.fr,34962,a.b,35044)}if(a.e!=null){z=J.bd(this.fr)
this.y1=z
J.al(this.fr,34962,z)
J.aV(this.fr,34962,H.bJ(a.e,"$isb_"),35044)}if(a.c!=null){z=J.bd(this.fr)
this.y2=z
J.al(this.fr,34962,z)
J.aV(this.fr,34962,a.c,35044)}if(a.d!=null){z=J.bd(this.fr)
this.fQ=z
J.al(this.fr,34962,z)
J.aV(this.fr,34962,a.d,35044)}this.bO=a.f.length
z=J.bd(this.fr)
this.d6=z
J.al(this.fr,34963,z)
z=$.d6
y=this.fr
x=a.f
if(z)J.aV(y,34963,H.bJ(x,"$islj"),35044)
else J.aV(y,34963,H.bJ(x,"$isli"),35044)},
v:{
dk:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=Q.k(0,0,0)
y=H.i([],[B.b2])
x=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
x.W()
w=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
w.W()
v=new Float32Array(H.N(9))
u=new Float32Array(H.N(9))
t=Q.k(0,0,0)
s=Q.k(0,0,0)
r=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
r.W()
r=new B.kn(null,!1,!0,!0,!1,770,771,32774,!1,c,d,e,z,null,null,null,null,null,null,null,"","",!0,!1,y,x,w,null,new Q.co(v),new Q.co(u),t,s,r,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
r.el(a,!1,c,d,e)
return r}}},
dl:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
dn:function(){var z,y
z=this.a
if(!J.p(z).$isb_)this.a=new Float32Array(H.ah(z))
z=this.b
if(z!=null&&!J.p(z).$isb_)this.b=new Float32Array(H.ah(z))
z=this.e
if(z!=null&&!J.p(z).$isb_)this.e=new Float32Array(H.ah(z))
z=this.c
if(z!=null&&!J.p(z).$isb_)this.c=new Float32Array(H.ah(z))
z=this.d
if(z!=null&&!J.p(z).$isb_)this.d=new Float32Array(H.ah(z))
if(!J.p(this.f).$isa6){z=$.d6
y=this.f
this.f=z?new Uint32Array(H.ah(y)):new Uint16Array(H.ah(y))}this.r=!0}},
b2:{"^":"f8;n:r>,b8:x>",
ab:function(a,b){},
d4:function(a){},
az:function(a,b){var z,y,x,w,v
z=this.Q
z.aY(b)
y=this.ch
x=this.a
y.aY(x)
if(this.y){y.hb()
w=y.a
x=x.a
w[12]=x[12]
w[13]=x[13]
w[14]=x[14]}z.hp(y)
this.d4(a)
for(y=this.z,x=y.length,v=0;v<y.length;y.length===x||(0,H.at)(y),++v)y[v].az(a,z)}},
dv:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3"},
f7:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,b5:k3>,k4,r1,r2,rx,ry",
ab:function(a,b){var z,y,x,w
z=this.ry
if(typeof b!=="number")return H.m(b)
this.ry=z+b
for(z=this.r2,y=z.length,x=0;x<z.length;z.length===y||(0,H.at)(z),++x){w=z[x]
if(w.x)w.ab(0,b)}},
h4:function(){if(C.c.bF(this.r2,new B.kS()))return!0
if(C.c.bF(this.r1,new B.kT()))return!0
if(C.c.bF(this.rx,new B.kU()))return!0
return!1},
az:function(a,b){var z,y,x,w,v,u
if(!this.h4())return
J.i1(this.d,this.e)
J.cT(this.d,this.f)
z=this.b
if(z.e!=null)J.cT(this.d,this.r)
if(z.f!=null)J.cT(this.d,this.x)
if(z.ch!=null)J.e6(this.d,this.cy,!1,a.gT())
z.go
y=this.a
x=y.y
w=this.k4
x.cb(w,!1)
if(z.dy!=null)J.e5(this.d,this.fx,y.fr)
if(z.fr!=null)J.e5(this.d,this.fy,y.fx)
if(z.fx!=null){v=this.d
u=this.go
y=y.r
J.i_(v,u,y.clientWidth,y.clientHeight)}this.d5(this.r1)
x.cb(w,!0)
z.Q
if(b!=null)w.aY(b)
this.d5(this.r2)
this.fL()
J.cS(this.d,this.f)
if(z.e!=null)J.cS(this.d,this.r)
if(z.f!=null)J.cS(this.d,this.x)
z.x},
fI:function(a){return this.az(a,null)},
fL:function(){var z,y,x,w
for(z=this.rx,y=this.k4,x=0;!1;++x){if(x>=0)return H.a(z,x)
w=z[x]
if(w.gb8(w))w.az(this,y)}},
d5:function(a){var z,y,x,w
for(z=a.length,y=this.k4,x=0;x<a.length;a.length===z||(0,H.at)(a),++x){w=a[x]
if(w.x)w.az(this,y)}},
eo:function(a,b,c){var z,y,x,w,v,u
z=this.a.b
this.d=z
y=new B.kV(z)
x=this.b
w=x.b
v=x.c
u=J.hy(z)
z.attachShader(u,y.cc(35633,w))
J.ht(y.a,u,y.cc(35632,v))
J.hR(y.a,u)
if(J.hO(y.a,u,35714)!==!0)H.H(J.hN(y.a,u))
this.e=u
this.f=J.cX(this.d,u,x.d)
z=x.e
if(z!=null)this.r=J.cX(this.d,this.e,z)
z=x.f
if(z!=null)this.x=J.cX(this.d,this.e,z)
z=x.ch
this.cy=J.aW(this.d,this.e,z)
z=x.z
this.ch=J.aW(this.d,this.e,z)
z=x.cx
if(z!=null)this.db=J.aW(this.d,this.e,z)
z=x.dx
if(z!=null)this.fr=new B.lk(J.aW(this.d,this.e,z),this.d)
z=x.dy
if(z!=null)this.fx=J.aW(this.d,this.e,z)
z=x.fr
if(z!=null)this.fy=J.aW(this.d,this.e,z)
z=x.fx
if(z!=null)this.go=J.aW(this.d,this.e,z)
x.go},
v:{
kR:function(a,b,c){var z,y
z=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
z.W()
y=[B.b2]
y=new B.f7(a,b,c,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,!1,null,z,H.i([],y),H.i([],y),H.i([],[B.da]),0)
y.eo(a,b,c)
return y}}},
kS:{"^":"l:10;",
$1:function(a){return J.cU(a)}},
kT:{"^":"l:10;",
$1:function(a){return J.cU(a)}},
kU:{"^":"l:25;",
$1:function(a){return J.cU(a)}},
lk:{"^":"d;a,b"},
kV:{"^":"d;a",
cc:function(a,b){var z,y
z=J.hz(this.a,a)
J.hV(this.a,z,b)
J.hw(this.a,z)
y=J.hQ(this.a,z,35713)
if(y!=null&&y===!1)throw H.h(J.hP(this.a,z))
return z}},
kW:{"^":"d;"},
f8:{"^":"d;",
as:function(){var z,y,x,w,v
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
bh:function(){var z,y,x,w,v
z=this.c
y=$.eE
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.eF
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.eG
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
dS:function(){var z,y,x,w,v
z=this.d
y=$.eK
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.eL
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.eM
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
aD:function(){var z,y,x,w,v
z=this.e
y=$.eH
x=this.a.a
if(y>=16)return H.a(x,y)
y=x[y]
w=z.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=y
y=$.eI
if(y>=16)return H.a(x,y)
y=x[y]
if(1>=v)return H.a(w,1)
w[1]=y
y=$.eJ
if(y>=16)return H.a(x,y)
y=x[y]
if(2>=v)return H.a(w,2)
w[2]=y
return z},
ae:function(a,b,c){var z,y,x,w
z=this.a
y=$.bn
x=z.a
w=C.a.i(a)
if(y>=16)return H.a(x,y)
x[y]=w
w=$.bo
y=z.a
x=C.a.i(b)
if(w>=16)return H.a(y,w)
y[w]=x
x=$.bp
z=z.a
w=C.a.i(c)
if(x>=16)return H.a(z,x)
z[x]=w},
ho:function(a){var z,y,x,w,v
z=this.a
y=$.bn
x=z.a
if(y>=16)return H.a(x,y)
w=x[y]
v=$.eE
if(v>=16)return H.a(x,v)
x[y]=C.b.i(w+x[v]*a)
v=$.bo
x=z.a
if(v>=16)return H.a(x,v)
w=x[v]
y=$.eF
if(y>=16)return H.a(x,y)
x[v]=C.b.i(w+x[y]*a)
y=$.bp
z=z.a
if(y>=16)return H.a(z,y)
x=z[y]
w=$.eG
if(w>=16)return H.a(z,w)
z[y]=C.b.i(x+z[w]*a)}},
l5:{"^":"d;a,b,c,d,e,f,r",
f3:function(a,b,c){var z,y,x
z=this.a
y=this.c
x=new B.c3(null,W.et(null,null,null),!1,!1,!1,3553,H.i([],[B.c3]))
x.a=J.cR(y)
z.j(0,b,x)
return x},
L:function(a,b){return this.f3(a,b,!1)},
hj:function(a){this.hi().aS(new B.l6(a))},
hi:function(){var z,y,x,w,v
z=H.i([],[[P.ax,W.ad]])
for(y=this.a,y=y.gaN(y),y=y.gM(y);y.B();){x=y.gC()
w=this.a.h(0,x)
if(J.hH(w)===!0)continue
v=J.hK(w.gba())
z.push(v.gbP(v))
J.hU(w.gba(),x)
w.gd2()}return P.iW(z,null,!1).aS(new B.l7(this))}},
l6:{"^":"l:0;a",
$1:[function(a){this.a.$0()},null,null,2,0,null,5,"call"]},
l7:{"^":"l:26;a",
$1:[function(a){var z,y,x,w,v,u,t,s,r,q,p
for(z=this.a,y=z.a,y=y.gaN(y),y=y.gM(y),x=z.r,w=z.f;y.B();){v=y.gC()
u=z.a.h(0,v)
t=J.o(u)
if(t.gaP(u)===!0&&t.gn(u)!==34067)continue
u.gd2()
J.bK(z.c,t.gn(u),u.ga6())
J.e4(z.c,37440,1)
J.bg(z.c,t.gn(u),10240,x)
J.bg(z.c,t.gn(u),10241,w)
if(t.gd0(u)===!0){J.bg(z.c,t.gn(u),10242,33071)
J.bg(z.c,t.gn(u),10243,33071)}if(t.gn(u)===34067)for(s=u.gfs(),r=0;!1;++r){if(r>=0)return H.a(s,r)
q=s[r]
J.d1(z.c,q.gn(q),0,6408,6408,5121,q.gba())}else J.d1(z.c,t.gn(u),0,6408,6408,5121,u.gba())
J.bK(z.c,3553,null)
t.saP(u,!0)
p="loaded: "+H.j(v)
H.ak(p)}},null,null,2,0,null,31,"call"]},
c3:{"^":"d;a6:a<,ba:b<,aP:c*,d0:d>,d2:e<,n:f>,fs:r<",
l:function(a){return H.j(J.hL(this.b))+" - loaded: "+this.c+", clamp: false, cubemap: false, type: "+this.f}},
lm:{"^":"d;a,b,c",
ax:function(a,b){var z=-1*b
return B.dk(new B.dl([z,z,0,b,z,0,b,b,0,z,b,0],null,null,null,[0,0,1,0,1,1,0,1],[0,1,2,0,2,3],!1,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0)),!1,a,null,null)},
hk:function(a,b){var z,y
z=new P.a2(0,$.u,null,[null])
y=new XMLHttpRequest()
C.j.dm(y,"GET",a)
y.responseType="arraybuffer"
new W.ae(0,y,"loadend",W.a7(new B.ln(new P.dA(z,[null]),y)),!1,[W.f1]).S()
y.send()
return z}},
ln:{"^":"l:0;a,b",
$1:[function(a){this.a.bM(0,W.fH(this.b.response))},null,null,2,0,null,0,"call"]}}],["","",,Q,{"^":"",co:{"^":"d;T:a<"},ao:{"^":"d;T:a<,b,c,d",
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z,y
z=this.a
y=J.aX(c)
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=y},
ac:function(a){var z,y
for(z=this.a,y=0;y<16;++y)z[y]=0},
W:function(){var z,y
for(z=this.a,y=0;y<16;++y)z[y]=C.a.bi(y,5)===0?1:0
return this},
hb:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
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
aR:function(a5,a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
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
dw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
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
c2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
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
dz:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
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
aY:function(a){var z,y,x
for(z=this.a,y=a.a,x=0;x<16;++x)z[x]=y[x]},
hp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
hl:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
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
y.ay(c,z)
y.ao(0)
x=this.c
x.ay(z,y)
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
l:function(a){return P.bi(this.a,"[","]")}},n:{"^":"d;T:a<,b,c",
gp:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
gq:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
e0:function(a,b,c,d){var z,y,x,w,v
z=J.p(b)
y=this.a
x=y.length
if(!!z.$isn){z=b.a
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
y=C.k.i(c)
if(1>=z.length)return H.a(z,1)
z[1]=y
y=this.a
z=C.k.i(d)
if(2>=y.length)return H.a(y,2)
y[2]=z}return this},
m:function(a,b){return this.e0(a,b,null,null)},
L:function(a,b){var z,y,x,w,v
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
Z:function(a){var z,y,x,w
z=this.a
if(0>=z.length)return H.a(z,0)
y=z[0]
x=J.v(a)
w=x.h(a,0)
if(typeof w!=="number")return H.m(w)
z[0]=y-w
w=this.a
if(1>=w.length)return H.a(w,1)
y=w[1]
z=x.h(a,1)
if(typeof z!=="number")return H.m(z)
w[1]=y-z
z=this.a
if(2>=z.length)return H.a(z,2)
y=z[2]
x=x.h(a,2)
if(typeof x!=="number")return H.m(x)
z[2]=y-x
return this},
F:function(a,b){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(typeof b!=="number")return H.m(b)
z[0]=x*b
if(1>=y)return H.a(z,1)
z[1]=z[1]*b
if(2>=y)return H.a(z,2)
z[2]=z[2]*b
return this},
cX:function(a,b){var z,y,x,w,v
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
ao:function(a){var z,y,x,w,v,u
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
ay:function(a,b){var z,y,x,w,v,u,t,s
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
N:function(a){var z,y,x,w,v,u,t,s
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
am:[function(a){var z,y,x,w,v,u
z=J.v(a)
y=z.h(a,0)
x=this.a
if(0>=x.length)return H.a(x,0)
w=J.I(y,x[0])
x=z.h(a,1)
y=this.a
if(1>=y.length)return H.a(y,1)
v=J.I(x,y[1])
z=z.h(a,2)
y=this.a
if(2>=y.length)return H.a(y,2)
u=J.I(z,y[2])
return Math.sqrt(H.mN(J.K(J.K(J.ac(w,w),J.ac(v,v)),J.ac(u,u))))},null,"gd3",2,0,null,32],
i1:[function(a){var z,y,x,w,v
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
return Math.sqrt(x*x+w*w+v*v)},"$0","gk",0,0,27],
l:function(a){return P.bi(this.a,"[","]")},
ev:function(a){var z,y,x,w
z=H.N(3)
y=new Float32Array(z)
this.a=y
x=J.v(a)
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
eu:function(a){var z,y,x,w
z=H.N(3)
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
es:function(a,b,c){var z,y,x
z=H.N(3)
y=new Float32Array(z)
this.a=y
x=J.aX(a)
if(0>=z)return H.a(y,0)
y[0]=x
x=this.a
y=J.aX(b)
if(1>=x.length)return H.a(x,1)
x[1]=y
y=this.a
x=J.aX(c)
if(2>=y.length)return H.a(y,2)
y[2]=x},
v:{
bt:function(a){var z=new Q.n(null,null,H.i(new Array(4),[P.x]))
z.eu(a)
return z},
bu:function(a){var z=new Q.n(null,null,H.i(new Array(4),[P.x]))
z.ev(a)
return z},
k:function(a,b,c){var z=new Q.n(null,null,H.i(new Array(4),[P.x]))
z.es(a,b,c)
return z}}}}],["","",,X,{"^":"",
r6:[function(){var z,y,x,w,v,u,t,s,r,q,p
$.hd=!0
z=new B.dv("Sobel",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"","","","")
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
$.as=B.is("#webgl-canvas",2520,z,0.1,!1,!1)
z=new B.dv("Color",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"","","","")
z.d="aVertexPosition"
z.e="aColor"
z.z="uMVMatrix"
z.ch="uPMatrix"
z.k3="gl_FragColor = vec4( vaColor, 1.0 );"
z=B.fX(z)
y=$.as.d1(0,z)
x=$.as.y
$.dM=x
x.ae(0,0,6)
x=$.dM
w=Q.k(1,0,6)
v=Q.k(0,0,1)
x.a.hl(x.as(),w,v)
u=X.kD($.dM)
$.as.d.j(0,"fpscam",u)
v=$.as
t=v.z
v=v.x
$.cP=v
w=v.c
s=new B.c3(null,W.et(null,null,null),!1,!1,!1,3553,H.i([],[B.c3]))
s.a=J.cR(w)
s.c=!0
w=v.b.z
w.toString
x=document
r=x.createElement("canvas")
J.d0(r,2)
J.d_(r,2)
x=J.o(r)
q=x.ca(r,"2d")
J.hT(q,"rgba(255,0,0,255)")
q.fillRect(0,0,x.gu(r),x.gt(r))
p=J.cR(w.b)
J.bK(w.b,3553,p)
J.e4(w.b,37440,1)
J.d1(w.b,3553,0,6408,6408,5121,r)
J.bg(w.b,3553,10241,9729)
J.bg(w.b,3553,10240,9729)
J.bK(w.b,3553,null)
s.a=p
v.a.j(0,"red",s)
C.c.U(["nx","px","nz","pz","ny","py"],new X.nk())
$.$get$bc().bT("data/jump1.wav","jump")
$.$get$bc().bT("data/jumppad.wav","jumppad")
$.$get$bc().bT("data/railgf1a.wav","rail")
$.cP.hj(new X.nl(y,u,t))},"$0","h_",0,0,2],
mC:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=$.as.f.r2
w=z.length
v=0
while(!0){if(!(v<w)){y=null
x=!1
break}u=z[v]
if("laser"===u.r&&!u.x){H.bJ(u,"$iseB")
y=u
x=!0
break}++v}if(x){y.x=!0
y.a.W()}else{t=B.dk(B.n_(0.1,30,20),!1,$.cP.a.h(0,"red").ga6(),null,null)
t.a.aR(0,1.5707963267948966,t.aD())
w=Q.k(0,0,0)
u=Q.k(0,0,0)
s=Q.k(0,0,0)
r=Q.k(0,0,0)
q=Q.k(0,0,0)
p=H.i([],[B.b2])
o=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
o.W()
n=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
n.W()
m=new Float32Array(H.N(9))
l=new Float32Array(H.N(9))
k=Q.k(0,0,0)
j=Q.k(0,0,0)
i=new Q.ao(new Float32Array(H.N(16)),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
i.W()
y=new X.eB(0,w,u,s,r,q,"","",!0,!1,p,o,n,null,new Q.co(m),new Q.co(l),k,j,i,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
p.push(t)
y.r="laser"
y.y=!0}y.fr=1e4
w=y.a
w.aY(a.a)
u=-b
s=$.bn
r=w.a
if(s>=16)return H.a(r,s)
q=r[s]
p=$.eH
if(p>=16)return H.a(r,p)
r[s]=C.b.i(q+r[p]*u)
p=$.bo
r=w.a
if(p>=16)return H.a(r,p)
q=r[p]
s=$.eI
if(s>=16)return H.a(r,s)
r[p]=C.b.i(q+r[s]*u)
s=$.bp
r=w.a
if(s>=16)return H.a(r,s)
q=r[s]
p=$.eJ
if(p>=16)return H.a(r,p)
r[s]=C.b.i(q+r[p]*u)
u=$.bn
p=w.a
if(u>=16)return H.a(p,u)
r=p[u]
q=$.eK
if(q>=16)return H.a(p,q)
p[u]=C.b.i(r+p[q]*c)
q=$.bo
p=w.a
if(q>=16)return H.a(p,q)
r=p[q]
u=$.eL
if(u>=16)return H.a(p,u)
p[q]=C.b.i(r+p[u]*c)
u=$.bp
p=w.a
if(u>=16)return H.a(p,u)
r=p[u]
q=$.eM
if(q>=16)return H.a(p,q)
p[u]=C.b.i(r+p[q]*c)
w.aR(0,-($.h5*0.0012),y.aD())
w.aR(0,-(-$.h4*0.0009),y.dS())
if(!x)$.as.f.r2.push(y)},
nG:function(a,b,c){var z,y,x,w,v,u,t,s
z=H.i([],[P.D])
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
y=H.i([],[P.q])
for(x=a.length,w=0;w<x;++w){v=a[w]
u=v.a
if(u>=b.length)return H.a(b,u)
if(C.c.aI(z,b[u].a))continue
for(t=0;t<v.r;++t){u=v.d
s=v.f+t
if(s>=c.length)return H.a(c,s)
y.push(u+c[s])}}return y},
mL:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=[P.D]
y=H.i([],z)
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
x=H.i([],z)
for(z=a.length,w=0;w<z;++w){v=a[w]
u=v.a
t=c.length
if(u>=t)return H.a(c,u)
if(C.c.aI(y,c[u].a))for(u=v.r,t=v.d,s=v.f,r=0;r<u;++r){q=s+r
if(q>=b.length)return H.a(b,q)
p=t+b[q]
if(p>=d.length)return H.a(d,p)
q=d[p].e
if(2>=q.length)return H.a(q,2)
q[2]=1}else{u=v.a
if(u>=t)return H.a(c,u)
if(C.c.aI(x,c[u].a))for(u=v.r,t=v.d,s=v.f,r=0;r<u;++r){q=s+r
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
kC:{"^":"e7;b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,a",
ab:function(a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=$.$get$cH()
$.$get$bB()
y=this.c
y.F(0,0)
if(z.h(0,$.kc)!=null)y.Z(this.b.bh())
if(z.h(0,$.k9)!=null)y.Z(this.b.aD())
if(z.h(0,$.kb)!=null)y.L(0,this.b.bh())
if(z.h(0,$.ka)!=null)y.L(0,this.b.aD())
x=y.a
if(2>=x.length)return H.a(x,2)
x[2]=0
x=this.e
w=this.b
x.m(0,w.as()).F(0,100)
if(z.h(0,$.eA)!=null){this.de(!1)
z.j(0,$.eA,null)}for(v=this.Q.a.fx,v=v.gaN(v),v=v.gM(v),u=this.db,t=this.dx,s=[P.x],r=this.d;v.B();){q=v.gC()
p=this.Q.a.fx.h(0,q)
o=H.kA(J.hX(q,1),null,null)
n=u.m(0,x)
m=this.dy
n=n.a
l=n.length
if(0>=l)return H.a(n,0)
k=n[0]
m=m.a
j=m.length
if(0>=j)return H.a(m,0)
n[0]=k+m[0]
if(1>=l)return H.a(n,1)
k=n[1]
if(1>=j)return H.a(m,1)
n[1]=k+m[1]
if(2>=l)return H.a(n,2)
l=n[2]
if(2>=j)return H.a(m,2)
n[2]=l+m[2]
m=t.m(0,x)
l=this.fr
m=m.a
n=m.length
if(0>=n)return H.a(m,0)
j=m[0]
l=l.a
k=l.length
if(0>=k)return H.a(l,0)
m[0]=j+l[0]
if(1>=n)return H.a(m,1)
j=m[1]
if(1>=k)return H.a(l,1)
m[1]=j+l[1]
if(2>=n)return H.a(m,2)
n=m[2]
if(2>=k)return H.a(l,2)
m[2]=n+l[2]
l=new Q.n(null,null,H.i(new Array(4),s))
n=new Float32Array(3)
l.a=n
m=C.a.i(0)
if(0>=3)return H.a(n,0)
n[0]=m
m=C.a.i(0)
if(1>=3)return H.a(n,1)
n[1]=m
m=C.a.i(0)
if(2>=3)return H.a(n,2)
n[2]=m
m=new B.cr(null,null,null,null)
n=new Q.n(null,null,H.i(new Array(4),s))
k=new Float32Array(3)
n.a=k
j=C.a.i(0)
if(0>=3)return H.a(k,0)
k[0]=j
j=C.a.i(0)
if(1>=3)return H.a(k,1)
k[1]=j
j=C.a.i(0)
if(2>=3)return H.a(k,2)
k[2]=j
m.a=n
m.b=0
n=n.a
k=n.length
if(0>=k)return H.a(n,0)
if(n[0]===1)k=0
else{if(1>=k)return H.a(n,1)
if(n[1]===1)k=1
else{if(2>=k)return H.a(n,2)
k=n[2]===1?2:3}}m.c=k
m.d=B.cc(n)
i=new X.c4(!1,!1,1,l,m,null,null,null)
m=this.Q
l=$.$get$dq()
m.hE(i,l,l,u,t,o,l,-1)
if(i.b){this.de(!0)
h=J.hW(this.Q.a.fy.h(0,p)," ")
n=this.Q.a.x
if(o>>>0!==o||o>=n.length)return H.a(n,o)
g=n[o]
if(0>=h.length)return H.a(h,0)
n=H.dt(h[0],null)
if(1>=h.length)return H.a(h,1)
m=H.dt(h[1],null)
if(2>=h.length)return H.a(h,2)
l=H.dt(h[2],null)
f=new Q.n(null,null,H.i(new Array(4),s))
k=new Float32Array(3)
f.a=k
n=J.aX(n)
if(0>=3)return H.a(k,0)
k[0]=n
m=J.aX(m)
if(1>=3)return H.a(k,1)
k[1]=m
l=J.aX(l)
if(2>=3)return H.a(k,2)
k[2]=l
e=Q.bu(g.a)
l=g.b
m=e.a
n=m.length
if(0>=n)return H.a(m,0)
j=m[0]
l=l.a
d=l.length
if(0>=d)return H.a(l,0)
m[0]=j+l[0]
if(1>=n)return H.a(m,1)
j=m[1]
if(1>=d)return H.a(l,1)
m[1]=j+l[1]
if(2>=n)return H.a(m,2)
n=m[2]
if(2>=d)return H.a(l,2)
m[2]=n+l[2]
m[0]=m[0]*0.5
m[1]=m[1]*0.5
m[2]=m[2]*0.5
if(2>=3)return H.a(k,2)
k=k[2]
m=m[2]
c=Math.sqrt((k-m)/400)
b=Q.bu(f)
n=b.a
if(0>=n.length)return H.a(n,0)
n[0]=n[0]-e.h(0,0)
n=b.a
if(1>=n.length)return H.a(n,1)
n[1]=n[1]-e.h(0,1)
n=b.a
if(2>=n.length)return H.a(n,2)
n[2]=n[2]-e.h(0,2)
n=b.a
if(2>=n.length)return H.a(n,2)
n[2]=0
a=n[0]
a0=n[1]
a1=n[2]
a2=Math.sqrt(a*a+a0*a0+a1*a1)
b.ao(0)
a3=a2/c
n=b.a
m=n.length
if(0>=m)return H.a(n,0)
n[0]=n[0]*a3
if(1>=m)return H.a(n,1)
n[1]=n[1]*a3
if(2>=m)return H.a(n,2)
n[2]=n[2]*a3
n[2]=c*800
n[0]=n[0]*0.161
n[1]=n[1]*0.161
n[2]=n[2]*0.161
r.m(0,b)
$.$get$bc().bZ("jumppad")}}$.cb=0.125
this.dT()
y.ao(0)
if(this.f)this.hR(y)
else{v=y.a
u=v.length
if(0>=u)return H.a(v,0)
a=v[0]
if(1>=u)return H.a(v,1)
a0=v[1]
if(2>=u)return H.a(v,2)
a1=v[2]
this.cV(y,Math.sqrt(a*a+a0*a0+a1*a1)*$.h8,$.nz)
this.cg(!0)}y=x.F(0,0.01)
x=w.a
v=$.bn
u=y.a
if(0>=u.length)return H.a(u,0)
u=u[0]
t=x.a
u=C.b.i(u)
if(v>=16)return H.a(t,v)
t[v]=u
u=$.bo
v=y.a
if(1>=v.length)return H.a(v,1)
v=v[1]
t=x.a
v=C.b.i(v)
if(u>=16)return H.a(t,u)
t[u]=v
v=$.bp
y=y.a
if(2>=y.length)return H.a(y,2)
y=y[2]
u=x.a
y=C.b.i(y)
if(v>=16)return H.a(u,v)
u[v]=y
y=this.cy
if(y!==0)x.aR(0,y*0.006,w.aD())
y=this.cx
if(y!==0)x.aR(0,y*0.006,this.ch)
this.cx=0
this.cy=0},
fW:function(){var z,y,x,w,v,u,t,s
if(!this.f)return
z=this.d
y=z.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
v=y[1]
if(2>=x)return H.a(y,2)
u=y[2]
t=Math.sqrt(w*w+v*v+u*u)
s=t-P.nn(t,$.nF)*$.nA*$.cb
if(s<0)s=0
if(t!==0)z.F(0,s/t)
else z.F(0,0)},
dT:function(){var z,y,x,w,v,u,t
z=this.fx
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
this.Q.aU(x,y,z,this.dy,this.fr)
if(x.c===1){this.f=!1
return}z=this.d
y=z.a
if(2>=y.length)return H.a(y,2)
if(y[2]>0&&z.N(x.e.a)>10){this.f=!1
return}z=x.e.a.a
if(2>=z.length)return H.a(z,2)
if(z[2]<0.7){this.f=!1
return}this.f=!0},
aj:function(a,b,c){var z,y,x,w,v
z=a.N(b)
y=$.nD
z=z<0?z*y:z/y
y=c.m(0,a)
x=this.fy.m(0,b)
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
cV:function(a,b,c){var z,y,x
z=this.d
y=b-z.N(a)
if(y<=0)return
x=c*$.cb*b
z.cX(a,x>y?y:x)},
de:function(a){var z,y,x,w,v,u
if(!this.f)return!1
this.f=!1
z=$.nC
y=this.d.a
if(2>=y.length)return H.a(y,2)
y[2]=z
z=this.e
y=this.r
x=z.N(y.e.a)
y=y.e
w=y.b
if(typeof w!=="number")return H.m(w)
v=$.nE
u=this.go
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
if(!a)$.$get$bc().bZ("jump")
return!0},
hR:function(a){var z,y,x,w,v
this.fW()
z=a.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
v=z[2]
this.cV(a,Math.sqrt(x*x+w*w+v*v)*$.h8,$.ny)
z=this.d
this.aj(z,this.r.e.a,z)
z=z.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]===0){if(1>=y)return H.a(z,1)
z=z[1]===0}else z=!1
if(z)return
this.cg(!1)},
cf:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=H.i([],[Q.n])
if(a){y=this.id
x=this.d
y.m(0,x)
y=y.a
if(2>=y.length)return H.a(y,2)
y[2]=y[2]-$.nB*$.cb
w=x.a
if(2>=w.length)return H.a(w,2)
w[2]=(w[2]+y[2])*0.5
if(this.r.e!=null)this.aj(x,this.r.e.a,x)}if(this.r.e!=null)z.push(this.r.e.a)
y=this.d
z.push(Q.bt(y.a).ao(0))
v=$.cb
u=Q.k(0,0,0)
for(x=this.x,w=[P.x],t=this.e,s=x.d,r=this.k1,q=this.id,p=this.k2,o=0;o<4;++o){u.m(0,t)
u.cX(y,v)
this.Q.aU(x,t,u,this.dy,this.fr)
if(x.a){x=y.a
if(2>=x.length)return H.a(x,2)
x[2]=0
return!0}n=x.c
if(typeof n!=="number")return n.O()
if(n>0)t.m(0,s)
n=x.c
if(n===1)break
if(typeof n!=="number")return H.m(n)
v-=v*n
n=new Q.n(null,null,H.i(new Array(4),w))
m=new Float32Array(3)
n.a=m
l=C.a.i(0)
if(0>=3)return H.a(m,0)
m[0]=l
l=C.a.i(0)
if(1>=3)return H.a(m,1)
m[1]=l
l=C.a.i(0)
if(2>=3)return H.a(m,2)
m[2]=l
z.push(n.m(0,x.e.a))
for(k=0;k<z.length;++k){if(y.N(z[k])>=0.1)continue
if(k>=z.length)return H.a(z,k)
this.aj(y,z[k],r)
if(k>=z.length)return H.a(z,k)
this.aj(q,z[k],p)
for(j=0;j<z.length;++j){if(j===k)continue
if(r.N(z[j])>=0.1)continue
if(j>=z.length)return H.a(z,j)
this.aj(r,z[j],r)
if(j>=z.length)return H.a(z,j)
this.aj(p,z[j],p)
if(k>=z.length)return H.a(z,k)
if(r.N(z[k])>=0)continue
i=new Q.n(null,null,H.i(new Array(4),w))
n=new Float32Array(3)
i.a=n
m=C.a.i(0)
if(0>=3)return H.a(n,0)
n[0]=m
m=C.a.i(0)
if(1>=3)return H.a(n,1)
n[1]=m
m=C.a.i(0)
if(2>=3)return H.a(n,2)
n[2]=m
m=z.length
if(k>=m)return H.a(z,k)
n=z[k]
if(j>=m)return H.a(z,j)
i.ay(n,z[j])
i.ao(0)
h=i.N(y)
r.m(0,i)
n=r.a
m=n.length
if(0>=m)return H.a(n,0)
n[0]=n[0]*h
if(1>=m)return H.a(n,1)
n[1]=n[1]*h
if(2>=m)return H.a(n,2)
n[2]=n[2]*h
n=z.length
if(k>=n)return H.a(z,k)
m=z[k]
if(j>=n)return H.a(z,j)
i.ay(m,z[j])
i.ao(0)
h=i.N(q)
p.m(0,i)
m=p.a
n=m.length
if(0>=n)return H.a(m,0)
m[0]=m[0]*h
if(1>=n)return H.a(m,1)
m[1]=m[1]*h
if(2>=n)return H.a(m,2)
m[2]=m[2]*h
for(g=0;g<z.length;++g){if(g===k||g===j)continue
if(r.N(z[g])>=0.1)continue
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
cg:function(a){var z,y,x,w,v,u,t,s
z=this.k3
y=this.e
z.m(0,y)
x=this.k4
w=this.d
x.m(0,w)
if(!this.cf(a))return
v=this.ry
v.m(0,z)
u=v.a
if(2>=u.length)return H.a(u,2)
u[2]=u[2]-$.f5
u=this.y
this.Q.aU(u,z,v,this.dy,this.fr)
t=this.rx
t.m(0,this.ch)
s=w.a
if(2>=s.length)return H.a(s,2)
if(s[2]>0)s=u.c===1||u.e.a.N(t)<0.7
else s=!1
if(s)return
this.r1.m(0,y)
this.r2.m(0,w)
t.m(0,z)
s=t.a
if(2>=s.length)return H.a(s,2)
s[2]=s[2]+$.f5
this.Q.aU(u,z,t,this.dy,this.fr)
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
this.cf(a)
v.m(0,y)
x=v.a
if(2>=x.length)return H.a(x,2)
x[2]=x[2]-(s-z)
this.Q.aU(u,y,v,this.dy,this.fr)
if(!u.a)y.m(0,t)
z=u.c
if(typeof z!=="number")return z.P()
if(z<1)this.aj(w,u.e.a,w)},
en:function(a){var z,y
z=document.body
z.toString
y=[W.ap]
new W.ae(0,z,"mousedown",W.a7(new X.kE(this,new X.kG(),new X.kH(),z)),!1,y).S()
new W.ae(0,z,"mousemove",W.a7(new X.kF(this)),!1,y).S()},
v:{
kD:function(a){var z=new X.kC(a,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),!1,new X.c4(!1,!1,1,Q.k(0,0,0),B.c0(null,null),null,null,null),new X.c4(!1,!1,1,Q.k(0,0,0),B.c0(null,null),null,null,null),new X.c4(!1,!1,1,Q.k(0,0,0),B.c0(null,null),null,null,null),Q.k(0,0,0),null,Q.k(0,0,1),0,0,Q.k(0,0,0),Q.k(0,0,0),Q.k(-15,-15,-24),Q.k(15,15,32),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,1),Q.k(0,0,0),!0)
z.en(a)
return z}}},
kG:{"^":"l:11;",
$1:function(a){var z,y,x,w,v
z=P.ez(a)
if(z.b9("requestFullscreen"))z.b6("requestFullscreen")
else{y=["moz","webkit","ms","o"]
for(x=0;x<4;++x){w=y[x]
v=w+"RequestFullscreen"
if(w==="moz")v=w+"RequestFullScreen"
if(z.b9(v)){z.b6(v)
return}}}}},
kH:{"^":"l:11;",
$1:function(a){var z,y,x,w
z=P.ez(a)
if(z.b9("requestPointerLock"))z.b6("requestPointerLock")
else{y=["moz","webkit","ms","o"]
for(x=0;x<4;++x){w=y[x]+"RequestPointerLock"
if(z.b9(w)){z.b6(w)
return}}}}},
kE:{"^":"l:3;a,b,c,d",
$1:[function(a){var z,y
J.cY(a)
z=document.pointerLockElement
y=this.d
if(z==null?y!=null:z!==y){this.c.$1(y)
this.b.$1(y)}else{$.$get$bc().bZ("rail")
X.mC(this.a.b,0,-0.2)}},null,null,2,0,null,0,"call"]},
kF:{"^":"l:3;a",
$1:[function(a){var z,y,x,w
z=J.o(a)
z.dt(a)
y=this.a
x=y.cx
w=z.gdi(a).a
if(typeof w!=="number")return H.m(w)
y.cx=x+w
w=y.cy
z=z.gdi(a).b
if(typeof z!=="number")return H.m(z)
y.cy=w+z},null,null,2,0,null,0,"call"]},
nk:{"^":"l:0;",
$1:function(a){return $.cP.L(0,"textures/skybox_"+H.j(a)+".png")}},
nl:{"^":"l:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.c
y=z.c.a.h(0,"textures/skybox_nx.png").ga6()
x=z.c.a.h(0,"textures/skybox_px.png").ga6()
w=z.c.a.h(0,"textures/skybox_nz.png").ga6()
v=z.c.a.h(0,"textures/skybox_pz.png").ga6()
u=z.c.a.h(0,"textures/skybox_ny.png").ga6()
t=z.c.a.h(0,"textures/skybox_py.png").ga6()
s=z.ax(y,1004)
s.ae(-2,2,-1000)
r=z.a
r.f.r1.push(s)
q=z.ax(x,1004)
q.ae(-2,2,1000)
q.a.c2(3.141592653589793)
r.f.r1.push(q)
p=z.ax(w,1004)
p.ae(-1000,2,-2)
p.a.c2(1.5707963267948966)
r.f.r1.push(p)
o=z.ax(v,1004)
o.ae(1000,2,-2)
o.a.c2(4.71238898038469)
r.f.r1.push(o)
n=z.ax(u,1004)
n.ae(-2,-1000,-2)
m=n.a
m.dw(4.71238898038469)
m.dz(4.71238898038469)
r.f.r1.push(n)
l=z.ax(t,1004)
l.ae(-2,1000,-2)
z=l.a
z.dw(1.5707963267948966)
z.dz(1.5707963267948966)
r.f.r1.push(l)
$.as.z.hk("data/q3dm17.bsp",!0).aS(new X.nj(this.a,this.b))}},
nj:{"^":"l:28;a,b",
$1:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=new B.i9(null,null,null)
z.a=J.hs(a,0,36)
z.b=a
y=z.dH()
x=z.R(0)
for(w=J.be(C.C.ft("["+H.dX(H.dX(H.dX(P.fb(x.hu(x.b-1),0,null),"}\n{","},\n{"),'" "','": "'),'"\n"','",\n"')+"]")),v=y.fy,u=y.fx;w.B();){t=w.gC()
s=J.v(t)
if(J.t(s.h(t,"classname"),"trigger_push"))u.j(0,s.h(t,"model"),s.h(t,"target"))
else if(J.t(s.h(t,"classname"),"target_position"))v.j(0,s.h(t,"targetname"),s.h(t,"origin"))}X.mL(y.cy,y.ch,y.b,y.Q)
w=[P.x]
r=H.i([],w)
q=H.i([],w)
p=H.i([],w)
o=H.i([],w)
n=H.i([],w)
for(w=y.Q,v=w.length,m=0;m<w.length;w.length===v||(0,H.at)(w),++m){l=w[m]
C.c.G(r,l.a)
C.c.G(q,l.d)
u=l.b
if(0>=u.length)return H.a(u,0)
p.push(u[0])
u=l.b
if(1>=u.length)return H.a(u,1)
p.push(u[1])
u=l.c
if(0>=u.length)return H.a(u,0)
o.push(u[0])
u=l.c
if(1>=u.length)return H.a(u,1)
o.push(u[1])
C.c.G(n,l.e)}k=new Uint16Array(H.ah(X.nG(y.cy,y.b,y.ch)))
j=new Float32Array(H.ah(r))
i=new Float32Array(H.ah(q))
h=new Float32Array(H.ah(n))
this.b.Q=X.ic(y)
for(w=j.length,g=0;g<w;++g)j[g]=j[g]/100
w=new B.dl(j,h,i,null,null,k,!1,Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0),Q.k(0,0,0))
w.dn()
this.a.r2.push(B.dk(w,!1,null,null,null))
$.as.ar()},null,null,2,0,null,21,"call"]},
eB:{"^":"b2;fr,fx,fy,go,id,k1,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,a,b,c,d,e",
ab:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.fr
if(typeof b!=="number")return H.m(b)
z-=b
this.fr=z
if(z<0){this.x=!1
return}this.ho(-(b/2))
z=this.go
z.m(0,this.as())
y=this.id
y.m(0,this.as())
x=this.bh()
x.F(0,15)
z.L(0,x)
y.Z(x)
w=$.as.f.r2
for(v=this.fx,u=this.fy,t=this.k1,s=!1,r=1000,q=null,p=0;p<w.length;++p){o=w[p]
if("block"===o.r&&o.x){v.m(0,o.as())
u.m(0,o.as())
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
if(B.mM(v,u,z,y,t)>0){l=z.am(t)
if(l<r){q=o
r=l}s=!0}}}if(s){q.x=!1
this.fr=0}}},
c4:{"^":"d;f5:a<,e6:b<,fV:c<,fO:d<,w:e<,b0:f<,b7:r<,fP:x<",
m:function(a,b){var z
this.a=b.gf5()
this.b=b.ge6()
this.c=b.gfV()
this.d.m(0,b.gfO())
if(b.gw()!=null){z=this.e
if(z==null){z=B.c0(null,null)
this.e=z}z.a.m(0,b.gw().ghr())
this.e.b=b.gw().gd3()
this.e.bl()}else this.e=null
this.f=b.gb0()
this.r=b.gb7()
this.x=b.gfP()}},
ld:{"^":"d;a,b,c,d,e,f,r,x,b7:y<,z,Q",
hx:function(a){var z,y
this.a.F(0,0)
this.b.F(0,0)
C.c.U(this.c,new X.le())
C.c.U(this.d,new X.lf())
this.e=0
this.f.F(0,0)
C.c.U(this.r,new X.lg())
this.x.F(0,0)
this.y=0
this.z=!1
z=this.Q
z.a=!1
z.b=!1
z.c=1
z.d.F(0,0)
y=z.e
y.a.F(0,0)
y.b=0
y.bl()
z.f=0
z.r=0
z.x=0}},
le:{"^":"l:0;",
$1:function(a){return J.cZ(a,0)}},
lf:{"^":"l:0;",
$1:function(a){return J.cZ(a,0)}},
lg:{"^":"l:0;",
$1:function(a){return J.cZ(a,0)}},
lq:{"^":"d;a,b,c"},
ib:{"^":"d;a,b,w:c<,d,e,f,r",
dD:function(a,b,c,d,e,f,g,h,i){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.N(3)
y=new Float32Array(z)
x=this.a;++x.go
w=this.b
w.hx(0)
if(g==null)g=$.$get$dq()
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
J.R(q[0],t,s[t]-y[t])
s=w.c
if(1>=s.length)return H.a(s,1)
s=s[1]
q=e.a
if(t>=q.length)return H.a(q,t)
J.R(s,t,q[t]-y[t])
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
s=J.K(z,J.e(s[1],1))
z=w.c
if(1>=z.length)return H.a(z,1)
w.e=J.K(s,J.e(z[1],2))
for(z=w.d,t=0;t<8;++t){if(t>=z.length)return H.a(z,t)
s=z[t]
r=w.c
q=(t&1)>0?1:0
if(q>=r.length)return H.a(r,q)
J.R(s,0,J.e(r[q],0))
if(t>=z.length)return H.a(z,t)
q=z[t]
r=w.c
s=(t&2)>0?1:0
if(s>=r.length)return H.a(r,s)
J.R(q,1,J.e(r[s],1))
if(t>=z.length)return H.a(z,t)
s=z[t]
r=w.c
q=(t&4)>0?1:0
if(q>=r.length)return H.a(r,q)
J.R(s,2,J.e(r[q],2))}for(z=w.r,t=0;t<3;++t){s=v.a
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
if(typeof p!=="number")return H.m(p)
J.R(r,t,s+p)
if(1>=z.length)return H.a(z,1)
p=z[1]
s=u.a
if(t>=s.length)return H.a(s,t)
s=s[t]
r=w.c
if(1>=r.length)return H.a(r,1)
r=J.e(r[1],t)
if(typeof r!=="number")return H.m(r)
J.R(p,t,s+r)}else{if(0>=q)return H.a(z,0)
s=z[0]
if(0>=o)return H.a(p,0)
p=J.e(p[0],t)
if(typeof p!=="number")return H.m(p)
J.R(s,t,r+p)
if(1>=z.length)return H.a(z,1)
p=z[1]
r=v.a
if(t>=r.length)return H.a(r,t)
r=r[t]
s=w.c
if(1>=s.length)return H.a(s,1)
s=J.e(s[1],t)
if(typeof s!=="number")return H.m(s)
J.R(p,t,r+s)}}z=b.a
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
if(z){z=J.P(f)
if(z.O(f,0))if(z.D(f,254))P.ab("Unimplemented: modelClipHandle == 254")
else{z=x.x
if(f>>>0!==f||f>=z.length)return H.a(z,f)
n=z[f]
this.eq(w,new B.dh(0,0,null,null,n.c,n.d,n.e,n.f))}else P.ab("Unimplemented: modelClipHandle == null")}else{z=w.c
if(0>=z.length)return H.a(z,0)
if(J.t(J.e(z[0],0),0)){z=w.c
if(0>=z.length)return H.a(z,0)
if(J.t(J.e(z[0],1),0)){z=w.c
if(0>=z.length)return H.a(z,0)
z=J.t(J.e(z[0],2),0)}else z=!1}else z=!1
x=w.f
if(z){w.z=!0
x.F(0,0)}else{w.z=!1
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
x[2]=z}if(!J.af(f,0))this.aV(w,0,0,1,b,c)}z=w.Q
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
if(typeof w!=="number")return w.X()
x[0]=u+w*(q-u)
if(1>=v)return H.a(x,1)
u=x[1]
if(1>=r)return H.a(s,1)
x[1]=u+w*(s[1]-u)
if(2>=v)return H.a(x,2)
v=x[2]
if(2>=r)return H.a(s,2)
x[2]=v+w*(s[2]-v)}a.m(0,z)},
hE:function(a,b,c,d,e,f,g,h){return this.dD(a,b,c,d,e,f,g,h,!1)},
aU:function(a,b,c,d,e){return this.dD(a,b,c,d,e,0,null,0,!1)},
eq:function(a,b){var z,y,x,w,v,u
for(z=a.Q,y=this.a,x=0;x<b.x;++x){w=y.y
v=b.r+x
if(v<0||v>=w.length)return H.a(w,v)
u=w[v]
w=u.f
v=y.go
if(w===v)continue
u.f=v
w=u.e
v=a.y
if(typeof w!=="number")return w.hS()
if(typeof v!=="number")return H.m(v)
if((w&v)>>>0===0)continue
this.ep(a,u)
if(z.a)return}},
ep:function(a,b){var z,y,x,w,v,u,t,s,r
if(b.b===0)return
z=a.r
if(0>=z.length)return H.a(z,0)
y=J.e(z[0],0)
x=b.d
if(1>=x.length)return H.a(x,1)
if(!J.af(y,J.e(x[1],0))){if(0>=z.length)return H.a(z,0)
y=J.e(z[0],1)
if(1>=x.length)return H.a(x,1)
if(!J.af(y,J.e(x[1],1))){if(0>=z.length)return H.a(z,0)
y=J.e(z[0],2)
if(1>=x.length)return H.a(x,1)
if(!J.af(y,J.e(x[1],2))){if(1>=z.length)return H.a(z,1)
y=J.e(z[1],0)
if(0>=x.length)return H.a(x,0)
if(!J.X(y,J.e(x[0],0))){if(1>=z.length)return H.a(z,1)
y=J.e(z[1],1)
if(0>=x.length)return H.a(x,0)
if(!J.X(y,J.e(x[0],1))){if(1>=z.length)return H.a(z,1)
z=J.e(z[1],2)
if(0>=x.length)return H.a(x,0)
x=J.X(z,J.e(x[0],2))
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
r=J.I(v,B.Y(y[u].gT(),s.a.a))
u=B.Y(x.a,s.a.a)
if(typeof r!=="number")return H.m(r)
if(u-r>0)return}z=a.Q
z.a=!0
z.b=!0
z.c=0
z.r=b.e},
hG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
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
if(u.b>0&&(t.c&1)===1)this.hF(a,u)}for(x=a.Q,s=0;s<b.f;++s){w=z.db
v=z.f
r=b.e+s
if(r<0||r>=v.length)return H.a(v,r)
r=v[r]
if(r<0||r>=w.length)return H.a(w,r)
q=w[r].gdq()
if(q==null)continue
p=x.c
this.hH(a,q.d)
w=x.c
if(typeof w!=="number")return w.P()
if(typeof p!=="number")return H.m(p)
if(w<p){x.f=q.b
x.r=q.c}}},
hH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
if(typeof p!=="number")return H.m(p)
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
B.ag(m.a,this.c)
n=m.b
if(n>>>0!==n||n>=w.length)return H.a(w,n)
l=B.Y(w[n].gT(),this.c)
n=this.c
n[3]=J.I(n[3],l)
y.m(0,v)
x.m(0,u)
if(!this.d_(this.c,y,x,z))break c$0
if(z.a!==0)C.c.cd(t,0,this.c)
p=o.d
n=p.length
k=o.c
j=k.length
r=0
i=-1
while(!0){h=o.b
if(typeof h!=="number")return H.m(h)
if(!(r<h))break
h=b.c
if(r>=j)return H.a(k,r)
g=k[r]
if(g>>>0!==g||g>=h.length)return H.a(h,g)
m=h[g]
if(r>=n)return H.a(p,r)
h=p[r]
g=this.c
if(h===!0){g[0]=J.L(m.a[0])
this.c[1]=J.L(m.a[1])
this.c[2]=J.L(m.a[2])
this.c[3]=J.L(m.a[3])}else B.ag(m.a,g)
h=m.b
if(h>>>0!==h||h>=w.length)return H.a(w,h)
l=B.Y(w[h].gT(),this.c)
h=this.c
h[3]=J.K(h[3],Math.abs(l))
y.m(0,v)
x.m(0,u)
if(!this.d_(this.c,y,x,z))break
if(z.a!==0){B.ag(this.c,t)
i=r}++r}p=o.b
if(typeof p!=="number")return H.m(p)
if(r<p)break c$0
if(i===p-1)break c$0
p=z.b
n=z.c
if(typeof p!=="number")return p.P()
if(typeof n!=="number")return H.m(n)
if(p<n&&p>=0){n=s.c
if(typeof n!=="number")return H.m(n)
if(p<n){if(p<0){z.b=0
p=0}s.c=p
B.ag(t,s.e.a.a)
s.e.b=t[3]}}}++q}},
d_:function(a,b,c,d){var z,y,x,w,v
d.a=0
z=B.Y(b.a,a)
y=a[3]
if(typeof y!=="number")return H.m(y)
x=z-y
y=B.Y(c.a,a)
z=a[3]
if(typeof z!=="number")return H.m(z)
w=y-z
if(x>0)z=w>=0.125||w>=x
else z=!1
if(z)return!1
if(x<=0&&w<=0)return!0
z=x-w
if(x>w){v=(x-0.125)/z
if(v<0)v=0
z=d.b
if(typeof z!=="number")return H.m(z)
if(v>z){d.b=v
d.a=1}}else{v=(x+0.125)/z
if(v>1)v=1
z=d.c
if(typeof z!=="number")return H.m(z)
if(v<z)d.c=v}return!0},
aV:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=Q.k(0,0,0)
y=a.Q.c
if(typeof y!=="number")return y.aX()
if(y<=c)return
if(b<0){y=this.a.e
x=-1-b
if(x>=y.length)return H.a(y,x)
this.hG(a,y[x])
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
if(typeof u!=="number")return H.m(u)
t=x-u
x=f.a
if(y>=x.length)return H.a(x,y)
x=x[y]-u
u=a.f.a
if(y>=u.length)return H.a(u,y)
s=u[y]
y=t}else{y=v.a.N(e)
x=v.b
if(typeof x!=="number")return H.m(x)
y-=x
x=v.a.N(f)
u=v.b
if(typeof u!=="number")return H.m(u)
x-=u
s=a.z===!0?0:2048}u=s+1
if(y>=u&&x>=u){y=w.b
if(0>=y.length)return H.a(y,0)
this.aV(a,y[0],c,d,e,f)
return}else{u=-s-1
if(y<u&&x<u){y=w.b
if(1>=y.length)return H.a(y,1)
this.aV(a,y[1],c,d,e,f)
return}}if(y<x){r=1/(y-x)
q=(y+s+0.125)*r
p=(y-s+0.125)*r
o=1}else{if(y>x){r=1/(y-x)
q=(y-s-0.125)*r
p=(y+s+0.125)*r}else{p=1
q=0}o=0}if(p<0)p=0
else if(p>1)p=1
y=d-c
for(x=z.a,u=x.length,n=0;n<3;++n){m=e.a
if(n>=m.length)return H.a(m,n)
m=m[n]
l=f.a
if(n>=l.length)return H.a(l,n)
l=l[n]
if(n>=u)return H.a(x,n)
x[n]=m+p*(l-m)}x=w.b
if(o>=x.length)return H.a(x,o)
this.aV(a,x[o],c,c+y*p,e,z)
if(q<0)q=0
else if(q>1)q=1
for(x=z.a,u=x.length,n=0;n<3;++n){m=e.a
if(n>=m.length)return H.a(m,n)
m=m[n]
l=f.a
if(n>=l.length)return H.a(l,n)
l=l[n]
if(n>=u)return H.a(x,n)
x[n]=m+q*(l-m)}x=w.b
u=o===0?1:0
if(u>=x.length)return H.a(x,u)
this.aV(a,x[u],c+y*q,d,z,f)},
hF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
j=J.I(n,y[m].N(k.a))
m=x.N(k.a)
if(typeof j!=="number")return H.m(j)
i=m-j
h=w.N(k.a)-j
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
if(typeof y!=="number")return H.m(y)
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
eh:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=this.a,y=z.db,x=y.length,w=Q.n,v=0;v<y.length;y.length===x||(0,H.at)(y),++v){u=y[v]
if(u.gef()!==$.fc)continue
t=u.gap()
if(0>=t.length)return H.a(t,0)
s=t[0]
t=u.gap()
if(1>=t.length)return H.a(t,1)
r=t[1]
q=P.a5(s*r,new X.id(this,u),!0,w)
t=z.b
p=u.gbm()
if(p<0||p>=t.length)return H.a(t,p)
p=t[p]
o=new B.kt(null,null,null,null)
o.c=p.c
o.b=p.b
o.d=B.n2(s,r,q)
u.sdq(o)}},
v:{
ic:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=Q.k(0,0,0)
y=Q.k(0,0,0)
x=B.cQ(2)
w=B.cQ(8)
v=Q.k(0,0,0)
u=B.cQ(2)
t=Q.k(0,0,0)
s=Q.k(0,0,0)
r=B.c0(null,null)
q=new Array(4)
q.fixed$length=Array
p=[P.x]
q=H.i(q,p)
o=new Array(4)
o.fixed$length=Array
p=new X.ib(a,new X.ld(z,y,x,w,null,v,u,t,null,null,new X.c4(!1,!1,1,s,r,null,null,null)),q,H.i(o,p),Q.k(0,0,0),Q.k(0,0,0),new X.lq(null,null,null))
p.eh(a)
return p}}},
id:{"^":"l:0;a,b",
$1:function(a){var z,y
z=this.a.a.Q
y=this.b.gbQ()+a
if(y>=z.length)return H.a(z,y)
return Q.bt(z[y].a)}}},1]]
setupProgram(dart,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ew.prototype
return J.jY.prototype}if(typeof a=="string")return J.bW.prototype
if(a==null)return J.ex.prototype
if(typeof a=="boolean")return J.jX.prototype
if(a.constructor==Array)return J.bU.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bX.prototype
return a}if(a instanceof P.d)return a
return J.cK(a)}
J.v=function(a){if(typeof a=="string")return J.bW.prototype
if(a==null)return a
if(a.constructor==Array)return J.bU.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bX.prototype
return a}if(a instanceof P.d)return a
return J.cK(a)}
J.a9=function(a){if(a==null)return a
if(a.constructor==Array)return J.bU.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bX.prototype
return a}if(a instanceof P.d)return a
return J.cK(a)}
J.P=function(a){if(typeof a=="number")return J.bV.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.c5.prototype
return a}
J.fY=function(a){if(typeof a=="number")return J.bV.prototype
if(typeof a=="string")return J.bW.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.c5.prototype
return a}
J.dQ=function(a){if(typeof a=="string")return J.bW.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.c5.prototype
return a}
J.o=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bX.prototype
return a}if(a instanceof P.d)return a
return J.cK(a)}
J.K=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.fY(a).H(a,b)}
J.t=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).D(a,b)}
J.hj=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.P(a).bg(a,b)}
J.af=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.P(a).O(a,b)}
J.hk=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.P(a).aX(a,b)}
J.X=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.P(a).P(a,b)}
J.ac=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.fY(a).X(a,b)}
J.L=function(a){if(typeof a=="number")return-a
return J.P(a).bj(a)}
J.dZ=function(a,b){return J.P(a).e3(a,b)}
J.I=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.P(a).E(a,b)}
J.hl=function(a,b){if(typeof a=="number"&&typeof b=="number")return(a^b)>>>0
return J.P(a).eg(a,b)}
J.e=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.h1(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.v(a).h(a,b)}
J.R=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.h1(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.a9(a).j(a,b,c)}
J.hm=function(a,b){return J.o(a).ez(a,b)}
J.hn=function(a,b,c,d){return J.o(a).eB(a,b,c,d)}
J.ho=function(a,b,c,d){return J.o(a).eV(a,b,c,d)}
J.au=function(a){return J.P(a).cU(a)}
J.hp=function(a,b){return J.o(a).f2(a,b)}
J.hq=function(a,b){return J.o(a).ab(a,b)}
J.hr=function(a,b,c){return J.o(a).f6(a,b,c)}
J.hs=function(a,b,c){return J.o(a).f7(a,b,c)}
J.ht=function(a,b,c){return J.o(a).f8(a,b,c)}
J.al=function(a,b,c){return J.o(a).f9(a,b,c)}
J.e_=function(a,b,c){return J.o(a).fa(a,b,c)}
J.bK=function(a,b,c){return J.o(a).fb(a,b,c)}
J.aV=function(a,b,c,d){return J.o(a).fd(a,b,c,d)}
J.hu=function(a,b){return J.o(a).ff(a,b)}
J.e0=function(a,b){return J.a9(a).fg(a,b)}
J.hv=function(a,b,c,d,e){return J.o(a).fh(a,b,c,d,e)}
J.hw=function(a,b){return J.o(a).fi(a,b)}
J.bd=function(a){return J.o(a).fl(a)}
J.hx=function(a){return J.o(a).fm(a)}
J.hy=function(a){return J.o(a).fn(a)}
J.hz=function(a,b){return J.o(a).fp(a,b)}
J.cR=function(a){return J.o(a).fq(a)}
J.hA=function(a,b){return J.o(a).fv(a,b)}
J.cS=function(a,b){return J.o(a).fG(a,b)}
J.hB=function(a,b,c,d){return J.o(a).fJ(a,b,c,d)}
J.hC=function(a,b,c,d,e){return J.o(a).fK(a,b,c,d,e)}
J.hD=function(a,b){return J.a9(a).A(a,b)}
J.hE=function(a,b){return J.o(a).fM(a,b)}
J.cT=function(a,b){return J.o(a).fN(a,b)}
J.hF=function(a){return J.o(a).gcY(a)}
J.cU=function(a){return J.o(a).gb8(a)}
J.bL=function(a){return J.o(a).gV(a)}
J.a4=function(a){return J.p(a).gJ(a)}
J.hG=function(a){return J.P(a).ghc(a)}
J.be=function(a){return J.a9(a).gM(a)}
J.e1=function(a){return J.o(a).ghf(a)}
J.bM=function(a){return J.v(a).gk(a)}
J.hH=function(a){return J.o(a).gaP(a)}
J.hI=function(a){return J.o(a).gdk(a)}
J.hJ=function(a){return J.o(a).gdl(a)}
J.hK=function(a){return J.o(a).gbW(a)}
J.e2=function(a){return J.o(a).gK(a)}
J.hL=function(a){return J.o(a).ga3(a)}
J.cV=function(a){return J.o(a).gp(a)}
J.cW=function(a){return J.o(a).gq(a)}
J.cX=function(a,b,c){return J.o(a).dG(a,b,c)}
J.hM=function(a,b){return J.o(a).ca(a,b)}
J.hN=function(a,b){return J.o(a).dL(a,b)}
J.hO=function(a,b,c){return J.o(a).dM(a,b,c)}
J.hP=function(a,b){return J.o(a).dN(a,b)}
J.hQ=function(a,b,c){return J.o(a).dO(a,b,c)}
J.aW=function(a,b,c){return J.o(a).dR(a,b,c)}
J.hR=function(a,b){return J.o(a).hh(a,b)}
J.e3=function(a,b){return J.a9(a).aB(a,b)}
J.hS=function(a,b){return J.p(a).bU(a,b)}
J.e4=function(a,b,c){return J.o(a).hs(a,b,c)}
J.cY=function(a){return J.o(a).dt(a)}
J.cZ=function(a,b){return J.o(a).F(a,b)}
J.bf=function(a,b){return J.o(a).ad(a,b)}
J.hT=function(a,b){return J.o(a).sfS(a,b)}
J.d_=function(a,b){return J.o(a).st(a,b)}
J.hU=function(a,b){return J.o(a).sa3(a,b)}
J.d0=function(a,b){return J.o(a).su(a,b)}
J.S=function(a,b){return J.o(a).m(a,b)}
J.hV=function(a,b,c){return J.o(a).e2(a,b,c)}
J.hW=function(a,b){return J.dQ(a).e5(a,b)}
J.hX=function(a,b){return J.dQ(a).ci(a,b)}
J.d1=function(a,b,c,d,e,f,g){return J.o(a).hB(a,b,c,d,e,f,g)}
J.bg=function(a,b,c,d){return J.o(a).hD(a,b,c,d)}
J.aX=function(a){return J.P(a).i(a)}
J.aY=function(a){return J.p(a).l(a)}
J.hY=function(a){return J.dQ(a).hI(a)}
J.e5=function(a,b,c){return J.o(a).hJ(a,b,c)}
J.hZ=function(a,b,c){return J.o(a).hK(a,b,c)}
J.i_=function(a,b,c,d){return J.o(a).hL(a,b,c,d)}
J.i0=function(a,b,c){return J.o(a).hM(a,b,c)}
J.e6=function(a,b,c,d){return J.o(a).hN(a,b,c,d)}
J.i1=function(a,b){return J.o(a).hO(a,b)}
J.d2=function(a,b,c,d,e,f,g){return J.o(a).hP(a,b,c,d,e,f,g)}
J.i2=function(a,b,c,d,e){return J.o(a).hQ(a,b,c,d,e)}
I.cM=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.j=W.j0.prototype
C.u=J.f.prototype
C.c=J.bU.prototype
C.a=J.ew.prototype
C.k=J.ex.prototype
C.b=J.bV.prototype
C.e=J.bW.prototype
C.B=J.bX.prototype
C.o=J.kv.prototype
C.h=J.c5.prototype
C.p=W.cB.prototype
C.q=new H.ek()
C.r=new P.ks()
C.t=new P.lE()
C.d=new P.md()
C.i=new P.aw(0)
C.v=function() {  var toStringFunction = Object.prototype.toString;  function getTag(o) {    var s = toStringFunction.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = toStringFunction.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: getTag,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.l=function(hooks) { return hooks; }
C.w=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.x=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.y=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.m=function getTagFallback(o) {  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.z=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.A=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.C=new P.k7(null,null)
C.D=new P.k8(null)
C.f=I.cM([])
C.E=H.i(I.cM([]),[P.c2])
C.n=new H.iD(0,{},C.E,[P.c2,null])
C.F=new H.dw("call")
$.eZ="$cachedFunction"
$.f_="$cachedInvocation"
$.am=0
$.bh=null
$.ec=null
$.dT=null
$.fR=null
$.h7=null
$.cI=null
$.cL=null
$.dU=null
$.b8=null
$.bx=null
$.by=null
$.dJ=!1
$.u=C.d
$.eq=0
$.hi=0
$.aj=null
$.fc=2
$.eh=null
$.d6=!1
$.mP=0
$.mQ=0
$.h4=0
$.h5=0
$.no=0
$.np=0
$.hd=!1
$.eA=32
$.k9=65
$.ka=68
$.kb=83
$.kc=87
$.a8=0
$.az=0
$.eH=0
$.eI=4
$.eJ=8
$.eK=1
$.eL=5
$.eM=9
$.eE=2
$.eF=6
$.eG=10
$.bn=12
$.bo=13
$.bp=14
$.nF=100
$.nC=50
$.ny=10
$.nz=0.1
$.nA=6
$.cb=0.3
$.nD=0.501
$.f5=18
$.nB=20
$.nE=10
$.h8=50
$.as=null
$.dM=null
$.cP=null
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
I.$lazy(y,x,w)}})(["ch","$get$ch",function(){return H.dR("_$dart_dartClosure")},"dc","$get$dc",function(){return H.dR("_$dart_js")},"eu","$get$eu",function(){return H.jS()},"ev","$get$ev",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.eq
$.eq=z+1
z="expando$key$"+z}return new P.iR(null,z)},"ff","$get$ff",function(){return H.ar(H.cz({
toString:function(){return"$receiver$"}}))},"fg","$get$fg",function(){return H.ar(H.cz({$method$:null,
toString:function(){return"$receiver$"}}))},"fh","$get$fh",function(){return H.ar(H.cz(null))},"fi","$get$fi",function(){return H.ar(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fm","$get$fm",function(){return H.ar(H.cz(void 0))},"fn","$get$fn",function(){return H.ar(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"fk","$get$fk",function(){return H.ar(H.fl(null))},"fj","$get$fj",function(){return H.ar(function(){try{null.$method$}catch(z){return z.message}}())},"fp","$get$fp",function(){return H.ar(H.fl(void 0))},"fo","$get$fo",function(){return H.ar(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dB","$get$dB",function(){return P.lu()},"bT","$get$bT",function(){return P.iV(null,null)},"bA","$get$bA",function(){return[]},"dC","$get$dC",function(){return H.dR("_$dart_dartObject")},"dG","$get$dG",function(){return function DartObject(a){this.o=a}},"aA","$get$aA",function(){return H.i(new Array(4),[P.x])},"dP","$get$dP",function(){return Q.k(0,0,0)},"bC","$get$bC",function(){return Q.k(0,0,0)},"C","$get$C",function(){return P.a5(2048,new B.mT(),!0,B.c_)},"cH","$get$cH",function(){return H.de(P.q,P.cG)},"bB","$get$bB",function(){return H.de(P.D,P.cG)},"aT","$get$aT",function(){return Q.k(0,0,0)},"cd","$get$cd",function(){return Q.k(0,0,0)},"bc","$get$bc",function(){var z=new E.io(null,null,H.de(P.D,P.bN))
z.ei(0.25)
return z},"dq","$get$dq",function(){return Q.k(0,0,0)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=["e","error","stackTrace","value",null,"_","o","x","invocation","data","result","arg4","each","object","isolate","numberOfArguments","closure","arg1","theError","theStackTrace","arg2","bspFile","arg3","callback","captureThis","self","arguments","sender","audioBuffer","timeNow","event","list","to","arg"]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[W.ap]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.c1]},{func:1,args:[,,]},{func:1,ret:P.D,args:[P.q]},{func:1,args:[P.q]},{func:1,args:[W.ck]},{func:1,args:[B.b2]},{func:1,v:true,args:[W.bQ]},{func:1,ret:P.bb,args:[,,]},{func:1,args:[P.D,,]},{func:1,args:[,P.D]},{func:1,args:[P.D]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,,]},{func:1,args:[P.d]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.c1]},{func:1,args:[P.c2,,]},{func:1,ret:[P.c,W.du]},{func:1,args:[P.bN]},{func:1,v:true,opt:[P.x]},{func:1,args:[B.da]},{func:1,args:[P.c]},{func:1,ret:P.x},{func:1,args:[P.bO]},{func:1,v:true,args:[,]},{func:1,ret:P.d,args:[,]}]
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
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.nU(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
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
Isolate.cM=a.cM
Isolate.U=a.U
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.he(X.h_(),b)},[])
else (function(b){H.he(X.h_(),b)})([])})})()