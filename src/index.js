//import "glslCanvas";
import * as lottie from 'lottie-web';
import './styles/index.scss';
import './assets/fonts/Roboto-Regular.ttf';
import './component.js';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
var preloader = lottie.loadAnimation({
    container: document.getElementById('glslCanvas'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/json/preloader.json'
});
//let sandbox = new GlslCanvas(document.querySelector(".glslCanvas"));
let isMobileOrTablet = function() {
  var check = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    check = true;
  }
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    check = true;
  }
  return check;
}
let local = {};
local.blend = 0;
local.endPosition = '';
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
window.local = local;
local.curSpeed = 0;
local.minSpeed = .02;
local.RSpeed = .06;
local.WSpeed = .06;
local.idleR = 1;
local.walkR = 4;
let ground = [];
var canvas = document.getElementById("babylon");
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false
  });
};

function $_GET(key) {
  var p = window.location.search;
  p = p.match(new RegExp(key + '=([^&=]+)'));
  return p ? p[1] : false;
}
function pause(){
  return new Promise(function(resolve, reject) {
    setTimeout(()=>{resolve(true)},500);
  });
}
var createScene = async function() {
  let aw = await pause();
  const scene = await BABYLON.SceneLoader.LoadAsync(
    "scene/",
    "Girl_animated_ready.glb",
    engine
  );
  local.hero = scene.getMeshByName("__root__");
  scene.getMeshByName("__root__").name = "rootgirl";
  scene.getMaterialByName("Hair_1").albedoColor.set(0,230/255,20/255);
  scene.getMaterialByName("Hair_0").albedoColor.set(1,0,0);
  scene.getMaterialByName("Material #108").albedoColor.set(1,0,0);
  scene.getMaterialByName("Hair_1").transparencyMode=2;
  scene.getMaterialByName("Hair_1").albedoTexture.hasAlpha=true;
  scene.meshes.forEach((item, i) => {
    item.name+="girl"
  });

  //BABYLON.SceneLoader.ImportMesh("", "scene/","boots.glb", scene, function(newMeshes, particleSystems, skeletons, animationGroups) {
  //  scene.getMeshByName("hair_base001_primitive0").visibility=.6
  //  scene.getMeshByName("DarkMagicBoots_Retopo_Vert_mesh").dispose();
  //  scene.getMeshByName("hair_base001_primitive0").material.metallic=.2
  //})
  let names = ["arena_no_1.glb", ];
  let nameNum = 0;
  asyncLoad();

  function asyncLoad() {
    BABYLON.SceneLoader.AppendAsync("scene/", names[nameNum], scene).then(() => { //"https://motyo.monster/webdav/"
      if (nameNum < names.length - 1) {
        scene.meshes.forEach((item, i) => {
          if (i > 2) {
            item.setEnabled(false);
          }
          item.setParent(null);
        });
        nameNum++;
        asyncLoad();
      } else {
        ground.push(scene.getMeshByName("ground"));
        initWalk(scene);
        addHeroGravitation(local.hero,ground);
        addShadows(scene);
      }
    })
  }

  function addCamera() {
    local.camera = new BABYLON.ArcRotateCamera("heroCamera", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, -5, 0), scene);
    //local.camera.lowerBetaLimit = local.camera.beta;
    //local.camera.upperBetaLimit = local.camera.beta;
    scene.activeCamera = local.camera;
    //local.camera.attachControl(true);
  }

  addCamera()
  let light = new BABYLON.PointLight("light", new BABYLON.Vector3(-31,16,-1.71), scene);
  light.diffuse.set(.337,.580,.706)
  light.intensity = 2000;
  let light1 = new BABYLON.PointLight("light", new BABYLON.Vector3(25,27,6.22), scene);
  light1.diffuse.set(.945,.318,.027);
  light1.intensity = 2500;
  //let lighting = BABYLON.CubeTexture.CreateFromPrefilteredData("https://assets.babylonjs.com/environments/studio.env", scene);
  let lighting = new BABYLON.HDRCubeTexture("scene/textures/blackhole-03-low.hdr", scene, 128, false, true, false, true);
  lighting.name = "runyonCanyon";
  lighting.level = 1;
  scene.environmentIntensity=.01
  lighting.gammaSpace = false;
  scene.environmentTexture = lighting;
  scene.createDefaultSkybox(scene.environmentTexture, true, 1000);
  scene.getMeshByName("hdrSkyBox").visibility = 0;
  scene.clearColor.set(0,0,0);


  //let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
  //let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  //skyboxMaterial.backFaceCulling = false;
  //skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("scene/textures/skybox/skybox", scene);
  //skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  //skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  //skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  //skybox.material = skyboxMaterial;

  return scene;
};

var asyncEngineCreation = async function() {
  console.log(createDefaultEngine())
  try {
    return createDefaultEngine();
  } catch (e) {
    console.log("the available createEngine function failed. Creating the default engine instead");
    return createDefaultEngine();
  }
}
window.initFunction = async function() {

  engine = await asyncEngineCreation();
  if (!engine) throw 'engine should not be null.';
  scene = await createScene();
  window.scene = scene;
};
window.initFunction().then(() => {
  sceneToRender = scene
  engine.runRenderLoop(function() {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
});

// Resize
window.addEventListener("resize", function() {
  engine.resize();
});


function initWalk(scene) {
  scene.meshes.forEach((item, i) => {
    item.isPickable = false
    if(item.name=="ground"){
      item.visibility=0;
      item.isPickable = true;
    }
    if(item.name=="walls"){
      item.visibility=0;
      item.checkCollisions = true
    }
    if(item.name.search("girl")==-1){
      item.setParent(null);
      item.receiveShadows = true;
    }
  });

  //move functions
  local.hero.position.set( -40.557757203789606, 5.553006882577251, 4.107644696583529);
  local.hero.rotation.y=0.11000000000000164;

  local.hero.rotationQuaternion = null;
  local.hero.scaling.set(.15, .15, .15);
  local.endPosition = local.hero.position;
  getAnimationGroup();
  moveEventer();
  startHeroMove();
  startLazyCameraMk_2(scene);
  local.someActions = scene.onBeforeRenderObservable.add(function() {
    if (local.mouseDown) {
      let pickInfo = scene.pick(local.eInfo.clientX, local.eInfo.clientY);
      movePrepare(pickInfo);
    }
    local.fps = engine.getFps().toFixed();
    //local.pointer.position = local.endPosition;
    local.RSpeed = 5.55*1.75 / engine.getFps().toFixed();
    local.WSpeed = 1.825*1.45 / engine.getFps().toFixed();
    local.rotSpeed = (.125 * engine.getFps().toFixed()) / 75;
    local.mRotSpeed = (.07 * 75) / engine.getFps().toFixed();
    local.distR = .95 + local.curSpeed * local.fps / 6;

    //  document.querySelector(".stat").innerHTML = "stat"+local.StatBOTS;
    //document.querySelector(".walk").innerHTML = "walk"+local.WalkBOTS+"free"+local.wTrueBots.length+"local.wTruePoints"+local.wTruePoints.length+"local.sTruePoints"+local.sTruePoints.length;
  })

  function startHeroMove() {
    local.mouseMove = scene.onBeforeRenderObservable.add(function() {
      if (local.fps > 15) {
        let curPos = new BABYLON.Vector3(local.hero.position.x, local.hero.position.y, local.hero.position.z);
        let endPos = new BABYLON.Vector3(local.endPosition.x, local.endPosition.y, local.endPosition.z);
        let dirPos = curPos.subtract(endPos).normalize();
        let forward = local.hero.forward;
        let rotDir = BABYLON.Vector3.Cross(forward, dirPos).y < 0 ? 1 : -1;
        if (curPos.subtract(endPos).length() < local.idleR) {
          blendTo("blend", 0, local.fps / 3);
        } else if (curPos.subtract(endPos).length() < local.walkR) {
          blendTo("blend", 1, local.fps / 2);
        } else {
          blendTo("blend", 2, local.fps / 2);
        }
        if (local.blend < 0.2) {
          BlendAnims(0);
        } else {
          BlendAnims(local.blend);
        }
        local.hero.moveWithCollisions(local.hero.forward.scaleInPlace(local.curSpeed));
        //if(local.hero.position.y > local.endPosition.y)
        let deltaR = Math.abs(BABYLON.Vector3.Cross(forward, dirPos).y)
        if (deltaR > local.rotSpeed) {
          // //console.log(Math.abs(BABYLON.Vector3.Cross(forward, dirPos).y));
          local.hero.rotation.y += local.rotSpeed * rotDir;
        }
      }
    });
  }
  moveEventer()
  //emulate click on canvas
  function moveEventer() {
    local.pointerTimer = 0;
    local.thisCanvas = engine.getRenderingCanvas();
    local.mouseDown = false;
    local.thisCanvas.addEventListener('pointerdown', (e) => {
      local.pointerTimer = 0;
      timerTimer(true);
      local.mouseDown = true;
      local.eInfo = e;
      let pickInfo = scene.pick(e.clientX, e.clientY);
      movePrepare(pickInfo);
      if (pickInfo.pickedMesh) {
        //if (pickInfo.pickedMesh.name.search("_EV_TYPE_1") > -1) {
        //    ////console.log(pickInfo.pickedMesh.name)
        //    interactiveScale(false,pickInfo.pickedMesh);
        //}
      }
    })
    local.thisCanvas.addEventListener('pointerup', () => {
      local.mouseDown = false;
      timerTimer(false);
      if (local.pointerTimer > 1) {
        local.endPosition = local.hero.position;
      }
    })
    local.thisCanvas.addEventListener('pointermove', (e) => {
      if (local.mouseDown) {
        local.eInfo = e;
      }
    })
  }

  function movePrepare(pickInfo) {
    // if the click hits the local.ground object, we change the impact position
    if (pickInfo.hit) {
      //console.log(pickInfo.pickedMesh.name);
    }
    if (
      pickInfo.hit && pickInfo.pickedMesh.name == "ground"
    ) {
      local.endPosition = pickInfo.pickedPoint;
    }
  }


  function getAnimationGroup() {
    scene.getAnimationGroupByName("Idle").name = "heroIdle";
    local.idleAnim = scene.animationGroups.find(a => a.name === "heroIdle");
    local.idleParam = {
      name: "heroIdle",
      anim: local.idleAnim,
      weight: 1
    };
    local.idleAnim.play(true);
    local.idleAnim.setWeightForAllAnimatables(1);
    scene.getAnimationGroupByName("Walk").name = "heroWalk";
    local.walkAnim = scene.animationGroups.find(a => a.name === "heroWalk");
    local.walkParam = {
      name: "heroWalk",
      anim: local.walkAnim,
      weight: 0
    };
    local.walkAnim.play(true);
    local.walkAnim.setWeightForAllAnimatables(1);
    scene.getAnimationGroupByName("Run").name = "heroRun";
    local.runAnim = scene.animationGroups.find(a => a.name === "heroRun");
    local.runParam = {
      name: "heroRun",
      anim: local.runAnim,
      weight: 0
    };
    local.runAnim.play(true);
    local.runAnim.setWeightForAllAnimatables(1);
  }

  function BlendAnims(blend) {
    //idle
    local.idleParam.weight = 1 - clamp(blend, 0, 1);
    local.idleParam.anim.setWeightForAllAnimatables(local.idleParam.weight);
    //walk
    local.walkParam.weight = 1 - Math.abs(blend - 1);
    local.walkParam.anim.setWeightForAllAnimatables(local.walkParam.weight);
    //run
    local.runParam.weight = clamp(blend - 1, 0, 1);
    local.runParam.anim.setWeightForAllAnimatables(local.runParam.weight);
    //heroSpeed
    local.curSpeed = local.runParam.weight * local.RSpeed + local.walkParam.weight * local.WSpeed;
    if (blend < 0.01) {
      local.curSpeed = 0
    } //можэет сработает может нет надо затестить
  }
}


function blendTo(name, to, det) {
  if (local[name] > to) {
    local[name] -= (1 / det);
  } else {
    local[name] += (1 / det);
  }
}

function timerTimer(isStart) {
  if (isStart) {
    local.timer = setInterval(() => {
      local.pointerTimer += .1
    }, 10)
  } else {
    clearInterval(local.timer);
  }
}



function addHeroGravitation(rootOfTarget,ground) {
  let rayName =  "heroRay";
  rootOfTarget.rayBox = BABYLON.MeshBuilder.CreateBox("rayBox", {
    height: .1,
    width: .1,
    depth: .1
  }, scene);
  rootOfTarget.rayBox.parent = rootOfTarget;
  rootOfTarget.rayBox.position = new BABYLON.Vector3(0, 0.7, 0);
  rootOfTarget.rayBox.visibility = 0;
  let ray = new BABYLON.Ray();
  let rayHelper = new BABYLON.RayHelper(ray);
  let localMeshDirection = new BABYLON.Vector3(0, -1*Math.PI, 0);
  let length = 20;
  rayHelper.attachToMesh(rootOfTarget.rayBox, localMeshDirection, rootOfTarget.rayBox.position, length);
  //rayHelper.show(scene);
  scene.onBeforeRenderObservable.add(function() {
    rootOfTarget.rayBox.position = new BABYLON.Vector3(0, .7, 0)
    var hitInfo = ray.intersectsMeshes(ground);
    if (hitInfo.length) {
        local.hero.position.y = hitInfo[0].pickedPoint.y;
    }
  });
}




function startLazyCameraMk_2(scene) {
  local.camTarget = {};
  local.camTarget.targetName = "hero";
  local.camTarget.position = local.hero.position;
  local.camTarget.rotation = local.hero.rotation;
  local.cameraParent = BABYLON.MeshBuilder.CreateBox("CB", {
    height: .01,
    width: .01,
    depth: .01
  })
  local.cameraParent.visibility = 0;
  local.cameraParent.position = new BABYLON.Vector3(local.hero.position.x, local.hero.position.y + 2.3, local.hero.position.z);
  local.cameraParent.rotation = new BABYLON.Vector3(local.hero.rotation.x, local.hero.rotation.y, local.hero.rotation.z);
  local.curCamPos = new BABYLON.Vector3(-0.04231647145375691, 2.5949745264318524, -6.405287094651479);
  local.camera.setPosition(new BABYLON.Vector3(local.curCamPos.x, local.curCamPos.y, local.curCamPos.z));
  local.camera.target = new BABYLON.Vector3(0,0,0);
  local.camera.parent = local.cameraParent;
  local.lazyCam = scene.onBeforeRenderObservable.add(function() {
    if (local.fps > 15) {
      let camDist = new BABYLON.Vector3(local.camTarget.position.x, local.camTarget.position.y + 2.3, local.camTarget.position.z).subtract(local.cameraParent.position);
      let multyFloat = (camDist.length() / (local.fps/3));
      if (isMobileOrTablet()) {
        multyFloat = camDist.length() / 10;
      }
      let camDistNorm = new BABYLON.Vector3(camDist.x, camDist.y, camDist.z).normalize().multiplyByFloats(multyFloat, multyFloat, multyFloat);
      local.cameraParent.position.x += camDistNorm.x;
      local.cameraParent.position.y += camDistNorm.y;
      local.cameraParent.position.z += camDistNorm.z;
    }
    // scene.onBeforeRenderObservable.remove(local.lazyCam);
  })
  local.lazyCamR = scene.onBeforeRenderObservable.add(function() {
    if (local.fps > 15) {
      let camDist = local.camTarget.rotation.subtract(local.cameraParent.rotation);
      let multyFloat = (camDist.length() / local.fps);
      if (isMobileOrTablet()) {
        multyFloat = camDist.length() / 10;
      }
      let camDistNorm = new BABYLON.Vector3(camDist.x, camDist.y, camDist.z).normalize().multiplyByFloats(multyFloat, multyFloat, multyFloat);
      local.cameraParent.rotation.x += camDistNorm.x;
      local.cameraParent.rotation.y += camDistNorm.y;
      local.cameraParent.rotation.z += camDistNorm.z;
      // scene.onBeforeRenderObservable.remove(local.lazyCam);
    }
  })
}


function addShadows(scene) {
  setTimeout(() => {
    local.shadowGenerator = new BABYLON.ShadowGenerator(1024, scene.lights[0]);
    local.shadowGenerator.blurKernel = 4;
    local.shadowGenerator.useBlurExponentialShadowMap = true;
    local.shadowGenerator.blurBoxOffset = 4;
    //local.shadowGenerator.transparencyShadow = true;
    local.shadowGenerator.addShadowCaster(local.hero);

    local.shadowGenerator1 = new BABYLON.ShadowGenerator(1024, scene.lights[1]);
    local.shadowGenerator1.blurKernel = 4;
    local.shadowGenerator1.useBlurExponentialShadowMap = true;
    local.shadowGenerator1.blurBoxOffset = 4;
    //local.shadowGenerator1.transparencyShadow = true;
    local.shadowGenerator1.addShadowCaster(local.hero);
    // preLoader
    document.getElementById('glslCanvas').classList.remove("active")
  setTimeout(()=>{
    lottie.destroy();
    document.getElementById('glslCanvas').remove();
  },1000)
  }, 3000)
}
