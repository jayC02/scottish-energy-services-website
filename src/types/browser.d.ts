interface Window {
  sesTrackEvent?: (name: string) => void;
  sesVideosPaused?: boolean;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
