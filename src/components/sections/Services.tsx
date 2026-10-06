import Image from "next/image";
import { services } from "@/content/home";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";

export function Services() {
  return (
    <section className="section-space bg-ivory-light">
      <div className="container-site flex flex-col gap-24 lg:gap-32">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="grid grid-cols-1 scroll-mt-8 items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <Reveal className={index % 2 === 1 ? "lg:order-2" : ""}>
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h2 className="type-h2">{service.title}</h2>
              <p className="mt-6 max-w-xl text-muted">{service.body}</p>

              <ul className="mt-8 grid gap-1 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 py-4 pr-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-dotted border-rose text-burgundy">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="type-h4 block">{item.title}</span>
                      <span className="type-small block text-muted">{item.subtitle}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button href={service.cta.href} variant="secondary">
                  {service.cta.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={150} className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-[4/5]">
                <Image
                  src={`${service.image}?w=1400&q=75`}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
