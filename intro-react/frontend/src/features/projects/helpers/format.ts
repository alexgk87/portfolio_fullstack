import { formatDistance as fDistance } from "date-fns";
import { nb } from "date-fns/locale";

export function formatDistance(publishedAt: Date): string {
  return fDistance(publishedAt, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: nb,
  });
}