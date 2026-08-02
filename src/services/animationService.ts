export class AnimationService {
  public animate(
    element: SVGElement,
    duration: number,
    targetDistance: number,
    onComplete: () => void,
  ): () => void {
    const startTime = performance.now();
    const safeDuration = Math.max(duration, 1);

    let frameId: number | null = null;

    const animateFrame = (timestamp: number): void => {
      const elapsedTime = timestamp - startTime;

      const progress = Math.min(elapsedTime / safeDuration, 1);

      const position = targetDistance * progress;

      element.style.transform = `translateX(${position}px)`;

      if (progress < 1) {
        frameId = requestAnimationFrame(animateFrame);

        return;
      }

      onComplete();
    };

    frameId = requestAnimationFrame(animateFrame);

    return (): void => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }
}
