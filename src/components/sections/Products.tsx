import { products } from "@/content/home";

export function Products() {
  // Rendered twice so the CSS marquee can loop seamlessly.
  const row = [...products.brands, ...products.brands];

  return (
    <section className="section-space border-b border-line">
      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <h2 className="type-h3 max-w-md">
          {products.title}
        </h2>
        <div className="group relative min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {row.map((brand, i) => (
              <li
                key={`${brand}-${i}`}
                aria-hidden={i >= products.brands.length}
                className="type-h4 whitespace-nowrap text-muted italic"
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
