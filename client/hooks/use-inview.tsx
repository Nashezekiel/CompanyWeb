import { useEffect, useRef, useState } from "react";

export default function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.threshold === undefined) {
              // keep observing but once in view, leave true
            }
          } else {
            // don't remove true once visible; keep animations
          }
        });
      },
      { threshold: 0.12, rootMargin: "-10% 0px -10% 0px", ...options },
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [options]);

  return { ref, inView } as const;
}
