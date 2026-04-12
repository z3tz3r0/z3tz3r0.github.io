import type { Metric } from "web-vitals";

const FIXED_DECIMAL_PLACES = 2;

const sendToAnalytics = (metric: Metric): void => {
  if (import.meta.env.DEV) {
    // oxlint-disable-next-line no-console -- Dev-only web vitals logging
    console.log(`[web-vitals] ${metric.name}: ${metric.value.toFixed(FIXED_DECIMAL_PLACES)} (${metric.rating})`);
  }

  // Cloudflare Web Analytics handles CWV natively via its beacon script.
  // To send to a custom endpoint, add: navigator.sendBeacon?.("/api/vitals", body);
};

const initWebVitals = async (): Promise<void> => {
  const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import("web-vitals");

  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
};

export { initWebVitals };
