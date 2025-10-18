import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { LenguajesService } from '../../services/lenguajes.service';
import Lenguajes from '../../Models/Lenguajes';
import { Observable } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-lenguajes',
  templateUrl: './lenguajes.component.html',
  styleUrls: ['./lenguajes.component.scss'],
  imports: [NavComponent, NgIf],
  standalone: true,
})
export class LenguajesComponent implements AfterViewInit {
  // Observable que contiene los lenguajes desde el servicio
  lenguajes: Observable<Lenguajes[]>;

  // Referencia al contenedor del globo en el HTML
  @ViewChild('globeContainer') globeContainer!: ElementRef;

  // Lenguaje seleccionado y estado del modal
  selectedLenguaje?: Lenguajes;
  showModal = false;

  // Referencias de cámara y posición original para animaciones
  private camera!: THREE.PerspectiveCamera;
  private originalCameraPosition!: THREE.Vector3;

  constructor(private lenguajesService: LenguajesService) {
    this.lenguajes = lenguajesService.getLenguages();
  }

  ngAfterViewInit(): void {
    // Esperamos a que los lenguajes estén cargados para inicializar el globo
    this.lenguajes.subscribe((langs) => {
      this.initGlobe(langs);
    });
  }

  initGlobe(langs: Lenguajes[]) {
    const container = this.globeContainer.nativeElement;

    // --------------------------
    // Escena principal
    // --------------------------
    const scene = new THREE.Scene();

    // --------------------------
    // Cámara principal
    // --------------------------
    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 6;
    this.originalCameraPosition = this.camera.position.clone(); // Guardamos posición inicial

    // --------------------------
    // Renderer WebGL
    // --------------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --------------------------
    // Globo
    // --------------------------
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: new THREE.Color(0x1f8fff),
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.2,
      })
    );
    scene.add(globe);

    // --------------------------
    // Luces
    // --------------------------
    scene.add(new THREE.PointLight(0x1f8fff, 1.5, 10));
    scene.add(new THREE.AmbientLight(0x1f8fff, 0.2));

    // --------------------------
    // Anillos alrededor del globo
    // --------------------------
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f8fff,
      transparent: true,
      opacity: 0.7,
    });
    const ringGeo = new THREE.TorusGeometry(2, 0.02, 16, 100);
    const rings: THREE.Mesh[] = [];

    const rotations = [
      { x: Math.PI / 2, y: 0, z: 0 },
      { x: 0, y: Math.PI / 2, z: 0 },
      { x: 0, y: 0, z: Math.PI / 2 },
    ];

    rotations.forEach((rot) => {
      const r = new THREE.Mesh(ringGeo, ringMaterial);
      r.rotation.set(rot.x, rot.y, rot.z);
      scene.add(r);
      rings.push(r);
    });

    // --------------------------
    // Posiciones de los "electrones" (sprites)
    // --------------------------
    const buttonPositions: [number, number, number][] = [
      // Capa ecuatorial
      [2.6, 0, 0],
      [0, 0, 2.6],
      [-2.6, 0, 0],
      [0, 0, -2.6],
      [1.8, 1.0, 0],
      [-1.8, 1.0, 0],
      [0, 1.0, 1.8],
      [0, 1.0, -1.8],
      [1.8, -1.0, 0],
      [-1.8, -1.0, 0],
      [0, -1.0, 1.8],
      [0, -1.0, -1.8],

      // Capa media intermedia
      [2.3, 0, 1.2],
      [-2.3, 0, 1.2],
      [2.3, 0, -1.2],
      [-2.3, 0, -1.2],
      [1.2, 0, 1.2],
      [-1.2, 0, 1.2],
      [1.2, 0, -1.2],
      [-1.2, 0, -1.2],

      // Capa superior
      [0, 2.6, 0],
      [1.2, 2.6, 0],
      [-1.2, 2.6, 0],
      [0, 2.6, 1.2],
      [0, 2.6, -1.2],

      // Capa inferior
      [0, -2.6, 0],
      [1.2, -2.6, 0],
      [-1.2, -2.6, 0],
      [0, -2.6, 1.2],
    ];

    const sprites: THREE.Sprite[] = [];

    // Crear sprites con nombres de lenguajes
    buttonPositions.forEach((pos, index) => {
      const [x, y, z] = pos;
      const nombre = langs[index]?.Nombre || '...';

      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(nombre, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.6, 0.6, 0.6);
      sprite.position.set(x, y, z);

      scene.add(sprite);
      sprites.push(sprite);
    });

    // --------------------------
    // Controles de la cámara
    // --------------------------
    const controls = new OrbitControls(this.camera, renderer.domElement);
    controls.enableDamping = true;

    // --------------------------
    // Raycaster para detectar clicks en los sprites
    // --------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('click', (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(sprites);

      // Filtramos los sprites que están detrás del globo (mirando desde la cámara)
      const visibleIntersects = intersects.filter((i) => {
        const dirToSprite = new THREE.Vector3().subVectors(
          i.object.position,
          this.camera.position
        );
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
          this.camera.quaternion
        );
        return dirToSprite.dot(forward) > 0; // > 0 significa que está frente a la cámara
      });

      if (intersects.length > 0) {
        const clicked = visibleIntersects[0].object as THREE.Sprite;
        const index = sprites.indexOf(clicked);
        const lenguaje = langs[index];

        // Mostrar modal con datos
        this.selectedLenguaje = lenguaje;
        this.showModal = true;

        // Animación de acercamiento
        const targetPos = new THREE.Vector3()
          .copy(clicked.position)
          .multiplyScalar(1.2);
        const startPos = this.camera.position.clone();
        const duration = 60; // frames
        let frame = 0;

        const animateCamera = () => {
          frame++;
          this.camera.position.lerpVectors(
            startPos,
            targetPos,
            frame / duration
          );
          this.camera.lookAt(clicked.position);
          if (frame < duration) requestAnimationFrame(animateCamera);
        };
        animateCamera();
      }
    });

    // --------------------------
    // Animación principal del globo y anillos
    // --------------------------
    const animate = () => {
      requestAnimationFrame(animate);

      globe.rotation.y += 0.002;
      rings[0].rotation.x += 0.003;
      rings[0].rotation.y += 0.002;
      rings[1].rotation.y += 0.004;
      rings[1].rotation.z += 0.002;
      rings[2].rotation.x += 0.002;
      rings[2].rotation.z += 0.003;

      controls.update();
      renderer.render(scene, this.camera);
    };
    animate();

    // --------------------------
    // Ajuste al cambiar tamaño de ventana
    // --------------------------
    window.addEventListener('resize', () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  // --------------------------
  // Cerrar modal y regresar cámara
  // --------------------------
  closeModal() {
    this.showModal = false;

    const startPos = this.camera.position.clone();
    const targetPos = this.originalCameraPosition.clone();
    const duration = 60;
    let frame = 0;

    const animateCamera = () => {
      frame++;
      this.camera.position.lerpVectors(startPos, targetPos, frame / duration);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      if (frame < duration) requestAnimationFrame(animateCamera);
    };
    animateCamera();
  }
}
