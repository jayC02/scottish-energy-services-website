interface Window {
  sesTrackEvent?: (name: string, details?: { placement?: string; link_path?: string; link_domain?: string; percent_scrolled?: number }) => void;
  sesVideosPaused?: boolean;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
