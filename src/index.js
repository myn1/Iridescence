import './common.css';
import * as THREE from '../node_modules/three/build/three.min.js';
import * as frag from './shader.frag';
import * as vert from './shader.vert';

  class Canvas{
    constructor(){
      this.scene = new THREE.Scene();
      //this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
      this.camera = new THREE.Camera();
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.clock = new THREE.Clock();
      this.mouse = new THREE.Vector2(0.5, 0.5);
      this.m = new THREE.Vector2(0.0, 0.0);
    }
    
    
    init(){
      const geo = new THREE.PlaneBufferGeometry(2, 2, 10, 10);

      let uni = {
        u_time: {type: "f", value: 0.0},
        u_resolution: {type: "v2", value: new THREE.Vector2(this.w, this.h)},
        u_mouse: {type: "v2", value: this.mouse},
        u_m: {type: "v2", value: this.m},
      }
      
      this.mat = new THREE.ShaderMaterial({
        vertexShader:vert,
        fragmentShader:frag,
        uniforms: uni
      });

      this.mesh = new THREE.Mesh( geo, this.mat );
      this.scene.add( this.mesh );
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(this.w/1.9, this.h/1.9 );
      this.renderer.setClearColor( 0xffffff, 1 );

      const container = document.getElementById("canvas-container");
            container.appendChild(this.renderer.domElement);
    }


    render(){
      
      requestAnimationFrame(() => {
        this.render();
      });
      
      this.mat.uniforms.u_time.value = this.clock.getElapsedTime();
      this.renderer.render( this.scene, this.camera );
    }
  }


(function(){
  const canvas = new Canvas();
  canvas.init();
  canvas.render();

})();