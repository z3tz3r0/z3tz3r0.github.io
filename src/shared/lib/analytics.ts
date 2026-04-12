import type { Metric } from "web-vitals";

function sendToAnalytics(metric: Metric) {
  // In dev: log to console
  if (import.meta.env.DEV) {
    console.log(`[web-vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
    return;
  }

  // In prod: send via beacon (Cloudflare or custom endpoint)
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  // Cloudflare Web Analytics handles CWV natively via its beacon script.
  // To send to a custom endpoint, uncomment:
  // navigator.sendBeacon?.("/api/vitals", body);
  void body;
}

export async function initWebVitals() {
  const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import("web-vitals");

  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
