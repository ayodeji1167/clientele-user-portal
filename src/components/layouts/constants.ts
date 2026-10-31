// Up to the 2xl breakpoint (1536px) the content column keeps the laptop
// layout from the designs: left-aligned beside the sidebar, 1070px of content
// plus the page padding. Past it, the column widens to this cap and centers,
// so monitors don't end up with all the content on the left and empty space
// on the right.
export const WIDE_CONTENT_MAX_W = "90rem";
export const LAPTOP_CONTENT_MAX_W = "71.875rem";

// The layout only sizes and centers the column; each page template sets its
// own padding. Use this for the sides so pages line up with the top bar.
export const PAGE_PADDING_X = { base: "1rem", md: "2.5rem" };
