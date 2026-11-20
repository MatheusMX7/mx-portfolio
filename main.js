const TEX="assets/face.webp",N=32936,T=47742,BB=[-0.38916015625, 9.1552734375e-05, -0.387237548828125, 0.389190673828125, 0.98046875, 0.38714599609375];
const B=await (await fetch("assets/geo.bin")).arrayBuffer();
const Q=new Int16Array(B,0,N*3),U=new Uint16Array(B,N*6,N*2),IX=new Uint16Array(B,N*10,T*3);
const S=[BB[3]-BB[0],BB[4]-BB[1],BB[5]-BB[2]],P=new Float32Array(N*3),UV=new Float32Array(N*2);
for(let i=0;i<N;i++){for(let k=0;k<3;k++)P[i*3+k]=Q[i*3+k]/65534*S[k];UV[i*2]=U[i*2]/65535;UV[i*2+1]=U[i*2+1]/65535}
const cv=document.getElementById('webgl'),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
R.outputEncoding=THREE.sRGBEncoding;R.setClearColor(0,0);
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,50),g=new THREE.Group();sc.add(g);
sc.add(new THREE.AmbientLight(0xffffff,1.05));const dl=new THREE.DirectionalLight(0xffffff,.55);dl.position.set(2,3,4);sc.add(dl);
const rl=new THREE.PointLight(0xff173d,6,12);rl.position.set(-2.5,.3,2.5);sc.add(rl);
const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(P,3));geo.setAttribute('uv',new THREE.BufferAttribute(UV,2));geo.setIndex(new THREE.BufferAttribute(IX,1));geo.computeVertexNormals();
const tex=new THREE.Texture();tex.flipY=false;tex.encoding=THREE.sRGBEncoding;const im=new Image();
const pre=document.querySelector('.preloader'),t0=performance.now();
im.onload=()=>{tex.image=im;tex.needsUpdate=true;setTimeout(()=>pre.classList.add('done'),Math.max(0,900-(performance.now()-t0)))};im.src=TEX;setTimeout(()=>pre.classList.add('done'),6000);
const mat=new THREE.MeshStandardMaterial({map:tex,roughness:.85,metalness:0,transparent:true}),mesh=new THREE.Mesh(geo,mat);g.add(mesh);
const mob=innerWidth<760,NP=mob?14000:26000;
const src=new Float32Array(NP*3),dst=new Float32Array(NP*3),cur=new Float32Array(NP*3),col=new Float32Array(NP*3),dcol=new Float32Array(NP*3),dl_=new Float32Array(NP);
for(let i=0;i<NP;i++){const v=(Math.random()*N)|0;for(let k=0;k<3;k++)src[i*3+k]=P[v*3+k];dl_[i]=Math.random()*.4}
const dot=document.createElement('canvas');dot.width=dot.height=32;const dx=dot.getContext('2d');dx.fillStyle='#fff';dx.beginPath();dx.arc(16,16,15,0,7);dx.fill();
const pm=new THREE.PointsMaterial({size:.011,map:new THREE.CanvasTexture(dot),transparent:true,alphaTest:.2,depthWrite:false,vertexColors:true});
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(cur,3));pg.setAttribute('color',new THREE.BufferAttribute(col,3));const pts=new THREE.Points(pg,pm);pts.frustumCulled=false;g.add(pts);
let visW=1,lastM=-1,B0=[0,0,1],B1=[0,0,1];
function letters(){const w=1000,h=520,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.font="700 430px 'Space Grotesk',Arial,sans-serif";x.textBaseline='middle';
const tw=x.measureText('MX').width,mw=x.measureText('M').width,sx=(w-tw)/2;x.fillText('MX',sx,h/2+20);
const d=x.getImageData(0,0,w,h).data,L=[];for(let y=0;y<h;y+=2)for(let X=0;X<w;X+=2)if(d[(y*w+X)*4+3]>128)L.push([X,y]);
const k=Math.min(1.55,visW*(innerWidth<760?.8:.46))/tw;for(let i=0;i<NP;i++){const p=L[(Math.random()*L.length)|0]||[w/2,h/2];dst[i*3]=(p[0]-w/2)*k;dst[i*3+1]=-(p[1]-h/2)*k;dst[i*3+2]=(Math.random()-.5)*.03;const red=p[0]>=sx+mw;dcol[i*3]=red?.94:1;dcol[i*3+1]=red?.09:.95;dcol[i*3+2]=red?.21:.95}lastM=-1}
function size(){const w=innerWidth,h=innerHeight,a=w/h;R.setPixelRatio(Math.min(devicePixelRatio,mob?1.75:2));R.setSize(w,h,false);cam.aspect=a;cam.position.z=Math.max(3.05,1.82/a);cam.updateProjectionMatrix();visW=2*cam.position.z*Math.tan(15*Math.PI/180)*a;
const H=2*cam.position.z*Math.tan(15*Math.PI/180);if(a>1){B0=[visW*.22,-.02,1];B1=B0}else{B0=[visW*.2,H*.23,.5];B1=[0,-H*.1,1]}letters()}
addEventListener('resize',size);size();if(document.fonts)document.fonts.load("700 100px 'Space Grotesk'").then(letters);
const sm=(x,a,b)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
let mx=0,my=0,tx=0,ty=0,Qc=0;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')});
const mt=document.querySelector('.menu-toggle'),nv=document.querySelector('.nav');mt.onclick=()=>{const o=nv.classList.toggle('open');mt.setAttribute('aria-expanded',o)};nv.onclick=()=>nv.classList.remove('open');
const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();
const E=document.getElementById('rosto');
function loop(){const r=E.getBoundingClientRect(),vh=innerHeight,q=Math.min(1,Math.max(0,(vh-r.top)/r.height)),out=Math.min(1,Math.max(0,(vh*.9-r.bottom)/(vh*.5)));
Qc+=(q-Qc)*.14;tx+=(mx*.45-tx)*.08;ty+=(my*.2-ty)*.08;
g.rotation.y=tx*(1-sm(Qc,.3,.5))+sm(Qc,.12,.55)*Math.PI*2;g.rotation.x=ty*(1-sm(Qc,.1,.3));const pz=sm(Qc,.3,.6);g.position.set(B0[0]+(B1[0]-B0[0])*pz,B0[1]+(B1[1]-B0[1])*pz,0);g.scale.setScalar(B0[2]+(B1[2]-B0[2])*pz);
const f=sm(Qc,.1,.3);mat.opacity=1-f;pm.opacity=f*(1-out);mesh.visible=mat.opacity>.01;pts.visible=pm.opacity>.01;
const M=sm(Qc,.5,.85);if(Math.abs(M-lastM)>.0005||(M>0&&M<1)){lastM=M;const t=performance.now()/1000;for(let i=0;i<NP;i++){const m=sm(M,dl_[i],dl_[i]+.6),fl=(1-m)*.004;for(let k=0;k<3;k++){const j=i*3+k;cur[j]=src[j]+(dst[j]-src[j])*m+Math.sin(t*1.3+i+k)*fl;col[j]=.96+(dcol[j]-.96)*m}}pg.attributes.position.needsUpdate=true;pg.attributes.color.needsUpdate=true}
R.render(sc,cam);requestAnimationFrame(loop)}
loop();
