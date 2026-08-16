import { useState, useEffect } from 'react';

interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: string;
  favicon?: string;
}

interface UseOGDataResult {
  data: OGData | null;
  loading: boolean;
  error: string | null;
}

export function useOGData(url: string | null): UseOGDataResult {
  const [data, setData] = useState<OGData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || !url.trim()) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }
    try {
      new URL(url);
    } catch {
      setData(null);
      setError('Invalid URL format');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();

    const fetchOGData = async () => {
      try {
        const response = await fetch(`/api/og-data?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch OG data');
        }

        const ogData = await response.json();
        setData(ogData);
      } catch (err) {

        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    const timeoutId = setTimeout(fetchOGData, 500);

    return () => clearTimeout(timeoutId);
  }, [url]);

  return { data, loading, error };
}