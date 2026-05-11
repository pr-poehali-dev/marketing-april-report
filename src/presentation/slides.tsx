// ─── SLIDE PROP TYPE ──────────────────────────────────────────────────────────
export interface SlideProps {
  active: boolean;
  n: number;
  total: number;
}

// ─── RE-EXPORTS ───────────────────────────────────────────────────────────────
export { S1, S2, S3 } from "./slides-overview";
export { S4, S5, S6, S7 } from "./slides-analysis";
export { S8, S9, S10 } from "./slides-strategy";

// ─── SLIDES REGISTRY ──────────────────────────────────────────────────────────
import { S1, S2, S3 } from "./slides-overview";
import { S4, S5, S6, S7 } from "./slides-analysis";
import { S8, S9, S10 } from "./slides-strategy";

export const ALL_SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];
