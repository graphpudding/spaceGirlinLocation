!function(e){function n(n){for(var r,i,s=n[0],l=n[1],u=n[2],d=0,m=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&m.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(c&&c(n);m.length;)m.shift()();return a.push.apply(a,u||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,s=1;s<t.length;s++){var l=t[s];0!==o[l]&&(r=!1)}r&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={0:0},a=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var u=0;u<s.length;u++)n(s[u]);var c=l;a.push([124,1]),t()}({124:function(e,n,t){t(125),e.exports=t(314)},311:function(e,n,t){},312:function(e,n){},314:function(e,n,t){"use strict";t.r(n);var r=t(89),o=(t(311),t.p,t(312),t(1));t(313);function a(e,n,t,r,o,a,i){try{var s=e[a](i),l=s.value}catch(e){return void t(e)}s.done?n(l):Promise.resolve(l).then(r,o)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function s(e){a(i,r,o,s,l,"next",e)}function l(e){a(i,r,o,s,l,"throw",e)}s(void 0)}))}}r.loadAnimation({container:document.getElementById("glslCanvas"),renderer:"svg",loop:!0,autoplay:!0,path:"/json/preloader.json"});var s=function(){var e=!1;return/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)&&(e=!0),"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1&&(e=!0),e},l={blend:0,endPosition:""},u=function(e,n,t){return Math.min(Math.max(e,n),t)};window.local=l,l.curSpeed=0,l.minSpeed=.02,l.RSpeed=.06,l.WSpeed=.06,l.idleR=1,l.walkR=4;var c=[],d=document.getElementById("babylon"),m=null,h=null,p=null,f=function(){return new o.Engine(d,!0,{preserveDrawingBuffer:!0,stencil:!0,disableWebGL2Support:!1})};var g=function(){var e=i(regeneratorRuntime.mark((function e(){var n,t,r,a,i,s,u,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=function(){l.camera=new o.ArcRotateCamera("heroCamera",Math.PI/2,Math.PI/4,10,new o.Vector3(0,-5,0),n),n.activeCamera=l.camera},a=function(){o.SceneLoader.AppendAsync("scene/",t[r],n).then((function(){r<t.length-1?(n.meshes.forEach((function(e,n){n>2&&e.setEnabled(!1),e.setParent(null)})),r++,a()):(c.push(n.getMeshByName("ground")),y(n),P(l.hero,c),x(n))}))},e.next=4,new Promise((function(e,n){setTimeout((function(){e(!0)}),500)}));case 4:return e.sent,e.next=7,o.SceneLoader.LoadAsync("scene/","Girl_animated_ready.glb",m);case 7:return n=e.sent,l.hero=n.getMeshByName("__root__"),n.getMeshByName("__root__").name="rootgirl",n.getMaterialByName("Hair_1").albedoColor.set(0,230/255,20/255),n.getMaterialByName("Hair_0").albedoColor.set(1,0,0),n.getMaterialByName("Material #108").albedoColor.set(1,0,0),n.getMaterialByName("Hair_1").transparencyMode=2,n.getMaterialByName("Hair_1").albedoTexture.hasAlpha=!0,n.meshes.forEach((function(e,n){e.name+="girl"})),t=["arena_no_1.glb"],r=0,a(),i(),(s=new o.PointLight("light",new o.Vector3(-31,16,-1.71),n)).diffuse.set(.337,.58,.706),s.intensity=2e3,(u=new o.PointLight("light",new o.Vector3(25,27,6.22),n)).diffuse.set(.945,.318,.027),u.intensity=2500,(d=new o.HDRCubeTexture("scene/textures/blackhole-03-low.hdr",n,128,!1,!0,!1,!0)).name="runyonCanyon",d.level=1,n.environmentIntensity=.01,d.gammaSpace=!1,n.environmentTexture=d,n.createDefaultSkybox(n.environmentTexture,!0,1e3),n.getMeshByName("hdrSkyBox").visibility=0,n.clearColor.set(0,0,0),e.abrupt("return",n);case 36:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(f()),e.prev=1,e.abrupt("return",f());case 5:return e.prev=5,e.t0=e.catch(1),console.log("the available createEngine function failed. Creating the default engine instead"),e.abrupt("return",f());case 9:case"end":return e.stop()}}),e,null,[[1,5]])})));return function(){return e.apply(this,arguments)}}();function y(e){function n(){l.pointerTimer=0,l.thisCanvas=m.getRenderingCanvas(),l.mouseDown=!1,l.thisCanvas.addEventListener("pointerdown",(function(n){l.pointerTimer=0,b(!0),l.mouseDown=!0,l.eInfo=n;var r=e.pick(n.clientX,n.clientY);t(r),r.pickedMesh})),l.thisCanvas.addEventListener("pointerup",(function(){l.mouseDown=!1,b(!1),l.pointerTimer>1&&(l.endPosition=l.hero.position)})),l.thisCanvas.addEventListener("pointermove",(function(e){l.mouseDown&&(l.eInfo=e)}))}function t(e){e.hit,e.hit&&"ground"==e.pickedMesh.name&&(l.endPosition=e.pickedPoint)}function r(e){l.idleParam.weight=1-u(e,0,1),l.idleParam.anim.setWeightForAllAnimatables(l.idleParam.weight),l.walkParam.weight=1-Math.abs(e-1),l.walkParam.anim.setWeightForAllAnimatables(l.walkParam.weight),l.runParam.weight=u(e-1,0,1),l.runParam.anim.setWeightForAllAnimatables(l.runParam.weight),l.curSpeed=l.runParam.weight*l.RSpeed+l.walkParam.weight*l.WSpeed,e<.01&&(l.curSpeed=0)}e.meshes.forEach((function(e,n){e.isPickable=!1,"ground"==e.name&&(e.visibility=0,e.isPickable=!0),"walls"==e.name&&(e.visibility=0,e.checkCollisions=!0),-1==e.name.search("girl")&&(e.setParent(null),e.receiveShadows=!0)})),l.hero.position.set(-40.557757203789606,5.553006882577251,4.107644696583529),l.hero.rotation.y=.11000000000000164,l.hero.rotationQuaternion=null,l.hero.scaling.set(.15,.15,.15),l.endPosition=l.hero.position,e.getAnimationGroupByName("Idle").name="heroIdle",l.idleAnim=e.animationGroups.find((function(e){return"heroIdle"===e.name})),l.idleParam={name:"heroIdle",anim:l.idleAnim,weight:1},l.idleAnim.play(!0),l.idleAnim.setWeightForAllAnimatables(1),e.getAnimationGroupByName("Walk").name="heroWalk",l.walkAnim=e.animationGroups.find((function(e){return"heroWalk"===e.name})),l.walkParam={name:"heroWalk",anim:l.walkAnim,weight:0},l.walkAnim.play(!0),l.walkAnim.setWeightForAllAnimatables(1),e.getAnimationGroupByName("Run").name="heroRun",l.runAnim=e.animationGroups.find((function(e){return"heroRun"===e.name})),l.runParam={name:"heroRun",anim:l.runAnim,weight:0},l.runAnim.play(!0),l.runAnim.setWeightForAllAnimatables(1),n(),l.mouseMove=e.onBeforeRenderObservable.add((function(){if(l.fps>15){var e=new o.Vector3(l.hero.position.x,l.hero.position.y,l.hero.position.z),n=new o.Vector3(l.endPosition.x,l.endPosition.y,l.endPosition.z),t=e.subtract(n).normalize(),a=l.hero.forward,i=o.Vector3.Cross(a,t).y<0?1:-1;e.subtract(n).length()<l.idleR?v("blend",0,l.fps/3):e.subtract(n).length()<l.walkR?v("blend",1,l.fps/2):v("blend",2,l.fps/2),l.blend<.2?r(0):r(l.blend),l.hero.moveWithCollisions(l.hero.forward.scaleInPlace(l.curSpeed)),Math.abs(o.Vector3.Cross(a,t).y)>l.rotSpeed&&(l.hero.rotation.y+=l.rotSpeed*i)}})),function(e){l.camTarget={},l.camTarget.targetName="hero",l.camTarget.position=l.hero.position,l.camTarget.rotation=l.hero.rotation,l.cameraParent=o.MeshBuilder.CreateBox("CB",{height:.01,width:.01,depth:.01}),l.cameraParent.visibility=0,l.cameraParent.position=new o.Vector3(l.hero.position.x,l.hero.position.y+2.3,l.hero.position.z),l.cameraParent.rotation=new o.Vector3(l.hero.rotation.x,l.hero.rotation.y,l.hero.rotation.z),l.curCamPos=new o.Vector3(-.04231647145375691,2.5949745264318524,-6.405287094651479),l.camera.setPosition(new o.Vector3(l.curCamPos.x,l.curCamPos.y,l.curCamPos.z)),l.camera.target=new o.Vector3(0,0,0),l.camera.parent=l.cameraParent,l.lazyCam=e.onBeforeRenderObservable.add((function(){if(l.fps>15){var e=new o.Vector3(l.camTarget.position.x,l.camTarget.position.y+2.3,l.camTarget.position.z).subtract(l.cameraParent.position),n=e.length()/(l.fps/3);s()&&(n=e.length()/10);var t=new o.Vector3(e.x,e.y,e.z).normalize().multiplyByFloats(n,n,n);l.cameraParent.position.x+=t.x,l.cameraParent.position.y+=t.y,l.cameraParent.position.z+=t.z}})),l.lazyCamR=e.onBeforeRenderObservable.add((function(){if(l.fps>15){var e=l.camTarget.rotation.subtract(l.cameraParent.rotation),n=e.length()/l.fps;s()&&(n=e.length()/10);var t=new o.Vector3(e.x,e.y,e.z).normalize().multiplyByFloats(n,n,n);l.cameraParent.rotation.x+=t.x,l.cameraParent.rotation.y+=t.y,l.cameraParent.rotation.z+=t.z}}))}(e),l.someActions=e.onBeforeRenderObservable.add((function(){l.mouseDown&&t(e.pick(l.eInfo.clientX,l.eInfo.clientY));l.fps=m.getFps().toFixed(),l.RSpeed=9.7125/m.getFps().toFixed(),l.WSpeed=1.825*1.45/m.getFps().toFixed(),l.rotSpeed=.125*m.getFps().toFixed()/75,l.mRotSpeed=.07*75/m.getFps().toFixed(),l.distR=.95+l.curSpeed*l.fps/6})),n()}function v(e,n,t){l[e]>n?l[e]-=1/t:l[e]+=1/t}function b(e){e?l.timer=setInterval((function(){l.pointerTimer+=.1}),10):clearInterval(l.timer)}function P(e,n){e.rayBox=o.MeshBuilder.CreateBox("rayBox",{height:.1,width:.1,depth:.1},h),e.rayBox.parent=e,e.rayBox.position=new o.Vector3(0,.7,0),e.rayBox.visibility=0;var t=new o.Ray,r=new o.RayHelper(t),a=new o.Vector3(0,-1*Math.PI,0);r.attachToMesh(e.rayBox,a,e.rayBox.position,20),h.onBeforeRenderObservable.add((function(){e.rayBox.position=new o.Vector3(0,.7,0);var r=t.intersectsMeshes(n);r.length&&(l.hero.position.y=r[0].pickedPoint.y)}))}function x(e){setTimeout((function(){l.shadowGenerator=new o.ShadowGenerator(1024,e.lights[0]),l.shadowGenerator.blurKernel=4,l.shadowGenerator.useBlurExponentialShadowMap=!0,l.shadowGenerator.blurBoxOffset=4,l.shadowGenerator.addShadowCaster(l.hero),l.shadowGenerator1=new o.ShadowGenerator(1024,e.lights[1]),l.shadowGenerator1.blurKernel=4,l.shadowGenerator1.useBlurExponentialShadowMap=!0,l.shadowGenerator1.blurBoxOffset=4,l.shadowGenerator1.addShadowCaster(l.hero),document.getElementById("glslCanvas").classList.remove("active"),setTimeout((function(){r.destroy(),document.getElementById("glslCanvas").remove()}),1e3)}),3e3)}window.initFunction=i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w();case 2:if(m=e.sent){e.next=5;break}throw"engine should not be null.";case 5:return e.next=7,g();case 7:h=e.sent,window.scene=h;case 9:case"end":return e.stop()}}),e)}))),window.initFunction().then((function(){p=h,m.runRenderLoop((function(){p&&p.activeCamera&&p.render()}))})),window.addEventListener("resize",(function(){m.resize()}))}});