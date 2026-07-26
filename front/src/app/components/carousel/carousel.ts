import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  alt?: string;
  title?: string;
  caption?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './carousel.html',
})
export class Carousel implements OnInit, OnDestroy {
  /** Slides to render */
  @Input({ required: true }) slides: CarouselSlide[] = [];

  /** Autoplay interval in ms. Set to 0 to disable. */
  @Input() autoplayInterval = 5000;

  /** Pause autoplay on hover */
  @Input() pauseOnHover = true;

  activeIndex = signal(0);

  private timer?: ReturnType<typeof setInterval>;
  private dragStartX = 0;
  private dragDeltaX = 0;
  private isDragging = false;

  slideCount = computed(() => this.slides.length);

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    if (!this.autoplayInterval) return;
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.autoplayInterval);
  }

  stopAutoplay(): void {
    if (this.timer) clearInterval(this.timer);
  }

  onMouseEnter(): void {
    if (this.pauseOnHover) this.stopAutoplay();
  }

  onMouseLeave(): void {
    if (this.pauseOnHover) this.startAutoplay();
  }

  next(): void {
    this.activeIndex.set((this.activeIndex() + 1) % this.slideCount());
  }

  prev(): void {
    this.activeIndex.set(
      (this.activeIndex() - 1 + this.slideCount()) % this.slideCount()
    );
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }

  // --- Drag / swipe support ---
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.dragStartX = this.getClientX(event);
    this.dragDeltaX = 0;
    this.stopAutoplay();
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    this.dragDeltaX = this.getClientX(event) - this.dragStartX;
  }

  onDragEnd(): void {
    if (!this.isDragging) return;
    const threshold = 50;
    if (this.dragDeltaX > threshold) {
      this.prev();
    } else if (this.dragDeltaX < -threshold) {
      this.next();
    }
    this.isDragging = false;
    this.dragDeltaX = 0;
    this.startAutoplay();
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent
      ? event.clientX
      : event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX ?? 0;
  }
}
