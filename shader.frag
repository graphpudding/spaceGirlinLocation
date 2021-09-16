precision mediump float;
uniform vec2      u_resolution;           // viewport resolution (in pixels)
uniform float     u_time;                 // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec2      u_mouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
uniform vec4      iDate;                 // (year, month, day, time in seconds)

#define iterations 12
#define formuparam 0.57

#define volsteps 19
#define stepsize 0.2

#define zoom   1.200
#define tile   3.0
#define speed  0.010

#define brightness 0.0015
#define darkmatter 1.00
#define distfading 0.930
#define saturation .816

#define mo (2.0 * u_mouse.xy - u_resolution.xy) / u_resolution.y
#define blackholeCenter vec3(time*2.,time,-2.)
#define blackholeRadius 1.2
#define blackholeIntensity 1.0
vec3 iPlane(vec3 ro, vec3 rd, vec3 po, vec3 pd){
    float d = dot(po - ro, pd) / dot(rd, pd);
    return d * rd + ro;
}

vec3 r(vec3 v, vec2 r)//incomplete but ultrafast rotation fcn thnx to rodolphito
{
    vec4 t = sin(vec4(r, r + 1.5707963268));
    float g = dot(v.yz, t.yw);
    return vec3(v.x * t.z - g * t.x,
                v.y * t.w - v.z * t.y,
                v.x * t.x + g * t.z);
}

void main()
{
  //get coords and direction
  vec2 uv = gl_FragCoord.xy/u_resolution.xy-.5;
  uv.y*=u_resolution.y/u_resolution.x;
  vec3 dir=vec3(uv*zoom,1.);
  float time=u_time*speed+.25;

  //mouse rotation
  vec3 from=vec3(0.0, 0.0, -15.0);
   // from = r(from, mo / 1000.0);
  //  dir = r(dir, mo / 1000.0);
  from+=blackholeCenter;

    vec3 nml = normalize(blackholeCenter - from);
    vec3 pos = iPlane(from, dir, blackholeCenter, nml);
    pos = blackholeCenter - pos;
    float intensity = dot(pos, pos);
    if(intensity > blackholeRadius * blackholeRadius){
        intensity = 1.0 / intensity;
      dir = mix(dir, pos * sqrt(intensity), blackholeIntensity * intensity);

    //volumetric rendering
    float s=0.1,fade=1.;
    vec3 v=vec3(0.);
    for (int r=0; r<volsteps; r++) {
      vec3 p=from+s*dir*.5;
      p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
      float pa,a=pa=0.;
      for (int i=0; i<iterations; i++) {
        p=abs(p)/dot(p,p)-formuparam; // the magic formula
        a+=abs(length(p)-pa); // absolute sum of average change
        pa=length(p);
      }
      float dm = max(0.,darkmatter-a*a*.005); //dark matter
      a*=a*a; // add contrast
    if (r<6) fade*=1.-dm; // dark matter, don't render near
      //v+=vec3(dm,dm*.5,0.);
      v+=fade;
      v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
      fade*=distfading; // distance fading
      s+=stepsize;
    }
    v=mix(vec3(length(v)),v,saturation); //color adjust
    gl_FragColor = vec4(v*.01,1.);
    }
    else
    gl_FragColor = vec4(0.,0.,0.,1.);
}
