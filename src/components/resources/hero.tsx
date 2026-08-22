import { HeroSearch } from "@/components/resources/search/search-provider";

/**
 * A trial in SeedSense is a grid of plots, so that grid is the help center's
 * one piece of ornament: a faint plot layout behind the search, with a handful
 * of cells "planted" in the brand green.
 *
 * Positions are whole multiples of the 56px grid pitch, measured from the same
 * left edge the background gradient starts from, so a planted cell lands
 * exactly inside a plot rather than floating over the lines. Columns are kept
 * to the outer edges so nothing sits behind the headline; on narrower viewports
 * the outer ones fall outside the box and are clipped.
 *
 * Depth comes from varying the opacity, not from varying the hue — the whole
 * site runs on the single app green. The wash uses --brand-tint (#34A853)
 * rather than the primary, because the primary is dark enough that a 10% fill
 * composites to grey.
 *
 * The section fades into the page background rather than ending on a hard rule,
 * so the grid dissolves instead of stopping.
 *
 * Fixed, not random: the composition is identical on every render. The layer is
 * aria-hidden; it carries no meaning.
 */
const PLOT = 56;

const PLANTED_PLOTS = [
  { column: 1, row: 1, strength: 18 },
  { column: 4, row: 4, strength: 10 },
  { column: 2, row: 6, strength: 14 },
  { column: 20, row: 0, strength: 12 },
  { column: 22, row: 3, strength: 18 },
  { column: 19, row: 5, strength: 9 },
];

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,var(--brand-canvas),var(--background))]"
    >
      <div aria-hidden className="plot-grid absolute inset-0" />

      <div aria-hidden className="absolute inset-0 hidden lg:block">
        {PLANTED_PLOTS.map((plot) => (
          <span
            key={`${plot.column}-${plot.row}`}
            className="absolute"
            style={{
              // +1px so the cell sits inside its plot rather than on the line.
              left: plot.column * PLOT + 1,
              top: plot.row * PLOT + 1,
              width: PLOT - 1,
              height: PLOT - 1,
              backgroundColor: `color-mix(in srgb, var(--brand-tint) ${plot.strength}%, transparent)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-16">
        <h1 className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-[3.25rem]">
          How can we help?
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-pretty text-muted-foreground">
          Guides and short video walkthroughs for planning trials, running
          evaluations, and keeping field data in sync.
        </p>
        <div className="mx-auto mt-9 max-w-xl">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
