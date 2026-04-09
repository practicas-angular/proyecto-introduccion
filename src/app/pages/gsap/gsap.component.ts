import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-gsap-page',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './gsap.component.html',
  styleUrls: ['./gsap.component.scss'],
})
export class GsapPageComponent implements AfterViewInit {
  // Grab the element from the DOM
  @ViewChild('mainTitle') mainTitle!: ElementRef;
  @ViewChild('follower') follower!: ElementRef;
  @ViewChild('mouseContainer') mouseContainer!: ElementRef;

  animationStatus = 'Waiting...';

  private controlTl!: gsap.core.Timeline;

  private xSetter: any;
  private ySetter: any;

  constructor() {}

  ngAfterViewInit(): void {
    this.initExercise1();
    this.initExercise2();
    this.initExercise3();
    this.initExercise4();
    this.initExercise5();
    this.initExercise6();
    this.initExercise7();
    this.initExercise9();
    // Initialize the setters here
    this.xSetter = gsap.quickSetter(this.follower.nativeElement, 'x', 'px');
    this.ySetter = gsap.quickSetter(this.follower.nativeElement, 'y', 'px');

    // Optional: Set initial position so it's not stuck at 0,0
    this.xSetter(100);
    this.ySetter(100);
    this.initExercise11();
  }

  ngOnDestroy(): void {
    // 1. Kill all active GSAP animations globally
    gsap.killTweensOf('.ball'); // You can kill specific elements

    // 2. Or kill everything currently running to be safe
    gsap.globalTimeline.clear();

    // 3. Specifically for ScrollTrigger
    ScrollTrigger.getAll().forEach((t) => t.kill());

    console.log('GSAP animations cleaned up!');
  }

  initExercise1() {
    gsap.from('.exercise-title', {
      y: -100, // Move from 100px up
      opacity: 0, // Move from transparent
      duration: 2, // Slow enough to see it clearly
      ease: 'bounce.out', // Added a bounce so it's very obvious
      delay: 0.5, // Wait half a second after load
    });
  }

  initExercise2() {
    // Create the timeline instance
    const tl = gsap.timeline();

    tl.from('.seq-title', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from(
        '.seq-subtitle',
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      ) // Start 0.4 seconds BEFORE the previous animation ends (overlap)
      .from('.seq-button', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });
  }

  initExercise3() {
    gsap.from('.skill-list li', {
      y: 50, // Pop up from below
      opacity: 0, // Fade in
      duration: 0.6,
      stagger: 0.2, // 0.2 seconds delay between the start of each item
      ease: 'back.out(1.2)',
    });
  }

  initExercise4() {
    gsap.to('.ball', {
      y: 100, // Move down 100px
      duration: 0.6,
      ease: 'bounce.out',
      repeat: -1, // -1 means infinite loop
      yoyo: true, // Reverse the animation on the way back
      repeatDelay: 0.2, // Small pause before restarting
    });
  }

  initExercise5() {
    const tl = gsap.timeline();

    tl.addLabel('start')
      .from('.card', { scale: 0, opacity: 0, duration: 1 }, 'start')

      .addLabel('contentIn', '+=0.2') // Mark a spot 0.2s after the card scale starts
      .from('.card-header', { x: -100, opacity: 0 }, 'contentIn')
      .from('.card-body', { x: 100, opacity: 0 }, 'contentIn')

      .addLabel('end')
      .from('.card-footer', { y: 20, opacity: 0 }, 'end');
  }

  initExercise6() {
    gsap.to('.callback-box', {
      x: 100,
      duration: 2,
      delay: 1,
      onStart: () => {
        this.animationStatus = 'Moving...';
        console.log('Animation started!');
      },
      onComplete: () => {
        this.animationStatus = 'Finished!';
        console.log('Animation done!');
      },
    });
  }

  initExercise7() {
    // Create a paused timeline
    this.controlTl = gsap.timeline({ paused: true });

    this.controlTl.to('.control-box', {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: 'none',
    });
  }

  play() {
    this.controlTl.play();
  }
  pause() {
    this.controlTl.pause();
  }
  reverse() {
    this.controlTl.reverse();
  }

  animateBox() {
    // Every click will trigger a "pop" animation
    gsap.to('.interactive-box', {
      scale: 1.2,
      rotation: 15,
      backgroundColor: '#ff4081',
      duration: 0.3,
      yoyo: true,
      repeat: 1, // Goes back to original after one repeat
      ease: 'power2.inOut',
    });
  }

  initExercise9() {
    gsap.to('.scroll-box', {
      scrollTrigger: {
        trigger: '.scroll-box',
        start: 'top 80%', // When the top of the box hits 80% of the viewport height
        toggleActions: 'play none none reverse', // Play when entering, reverse when leaving
      },
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power4.out',
    });
  }

  moveFollower(event: MouseEvent) {
    // Get the bounding box of the container to calculate relative position
    const rect = this.mouseContainer.nativeElement.getBoundingClientRect();

    // Calculate X and Y relative to the black box
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Use the setters (this is much faster than gsap.to)
    this.xSetter(x - 10);
    this.ySetter(y - 10);
  }

  initExercise11() {
    const mm = gsap.matchMedia();

    // Desktop Setup (768px and up)
    mm.add('(min-width: 768px)', () => {
      // This animation only exists on Desktop
      gsap.to('.responsive-box', {
        x: 500, // Move far to the right
        rotation: 360, // Spin
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    });

    // Mobile Setup (767px and down)
    mm.add('(max-width: 767px)', () => {
      // This animation only exists on Mobile
      gsap.to('.responsive-box', {
        scale: 1.3, // Grow and shrink
        backgroundColor: '#ff5722', // Change color
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });
  }
}
