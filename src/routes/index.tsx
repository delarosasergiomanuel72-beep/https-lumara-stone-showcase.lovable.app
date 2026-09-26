import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

import heroImage from "@/assets/lumara-hero.jpg";
import carraraImage from "@/assets/material-carrara.jpg";
import calacattaImage from "@/assets/material-calacatta.jpg";
import neroMarquinaImage from "@/assets/material-nero-marquina.jpg";
import travertinoImage from "@/assets/material-travertino.jpg";
import verdeAlpiImage from "@/assets/material-verde-alpi.jpg";
import modernOne from "@/assets/kitchen-modern-1.jpg";
import modernTwo from "@/assets/kitchen-modern-2.jpg";
import rusticImage from "@/assets/kitchen-rustic.jpg";
import artDecoImage from "@/assets/kitchen-artdeco.jpg";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marmolería en Madrid | Encimeras de mármol y salpicaderos" },
      { name: "description", content: "Marmolería en Madrid: encimeras de mármol, granito y cuarzo, salpicaderos e islas a medida. Presupuesto sin compromiso y atención todos los días de la semana." },
      { property: "og:title", content: "LUMARA STONE — Marmolería en Madrid · Encimeras de mármol y salpicaderos" },
      { property: "og:description", content: "Diseñamos, fabricamos e instalamos encimeras de mármol, salpicaderos e islas de cocina a medida en Madrid. Pide tu presupuesto sin compromiso." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          name: "LUMARA STONE",
          description: "Marmolería en Madrid especializada en encimeras de mármol, granito y cuarzo, salpicaderos e islas de cocina a medida.",
          telephone: "+34684403692",
          email: "lumarastone26@gmail.com",
          areaServed: { "@type": "City", name: "Madrid" },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const materials = [
  { name: "Carrara", origin: "Italia", description: "Luminoso, sereno y atemporal.", image: carraraImage },
  { name: "Calacatta", origin: "Italia", description: "Veta expresiva para piezas protagonistas.", image: calacattaImage },
  { name: "Nero Marquina", origin: "España", description: "Negro profundo y contraste rotundo.", image: neroMarquinaImage },
  { name: "Travertino", origin: "Italia", description: "Textura cálida de carácter mediterráneo.", image: travertinoImage },
  { name: "Verde Alpi", origin: "Italia", description: "Verde mineral, elegante y singular.", image: verdeAlpiImage },
];

const projects = [
  { title: "Calacatta continuo", style: "Moderna", image: modernOne, material: "Calacatta" },
  { title: "Verde protagonista", style: "Moderna", image: modernTwo, material: "Verde Alpi" },
  { title: "Casa de campo", style: "Rústica", image: rusticImage, material: "Travertino" },
  { title: "Contraste madrileño", style: "Art déco", image: artDecoImage, material: "Nero Marquina" },
];

const processSteps: [string, string, string, string][] = [
  ["I", "A domicilio", "Medición", "Visitamos el espacio y tomamos medidas exactas."],
  ["II", "En estudio", "Diseño", "Definimos material, acabado, cantos y despiece."],
  ["III", "En taller", "Corte y pulido", "Fabricamos cada pieza con precisión artesanal."],
  ["IV", "En tu cocina", "Instalación", "Montamos, ajustamos y dejamos todo listo."],
];

const testimonials: [string, string][] = [
  ["Nos hicieron la encimera y el salpicadero en Carrara. Vinieron a medir un sábado, nos enseñaron muestras reales en casa y en tres semanas teníamos la cocina montada. La veta encaja a la perfección con el frente del fregadero.", "Encimera y salpicadero · Chamberí"],
  ["Trabajamos con ellos en la reforma de un piso de los años 60. Nos asesoraron con criterio: el mármol que queríamos en un principio no era el más adecuado para el uso diario y nos propusieron una alternativa igual de bonita y mucho más resistente. Se nota la experiencia.", "Reforma integral · Retiro"],
  ["Desde el estudio coordinamos varias cocinas al año y con LUMARA STONE el despiece llegó puntual, con los planos claros y sin sorpresas en obra. El montaje del Nero Marquina quedó impecable y el cliente encantado. Repetiremos.", "Estudio de interiorismo · Salamanca"],
  ["La isla en Verde Alpi es lo primero que ve todo el mundo al entrar. Nos explicaron cómo continuar la veta en las esquinas y el resultado parece una sola pieza. El trato fue cercano de principio a fin, siempre disponibles por WhatsApp.", "Isla de cocina · La Moraleja"],
  ["Pedí presupuesto un domingo por la noche y el lunes por la mañana ya tenía respuesta. Vinieron a medir la semana siguiente y cumplieron con la fecha de instalación exactamente. Con dos niños en casa, la encimera de granito está aguantando de maravilla.", "Encimera de granito · Vallecas"],
  ["Queríamos un travertino cálido para una cocina rústica y nos enseñaron varias tablas hasta dar con la perfecta. Cuidan tanto el acabado de los cantos como el detalle más pequeño. Merece la pena pagar por un trabajo así hecho.", "Cocina rústica · Boadilla del Monte"],
  ["Nos recomendaron a través de nuestro arquitecto. Lo que más valoro es la transparencia: presupuesto cerrado por escrito, sin extras al final, y nos avisaron de cada fase. El Calacatta de la isla es espectacular con la luz de la mañana.", "Encimera e isla · Aravaca"],
  ["Renovamos solo la encimera y el salpicadero, sin tocar más. Vinieron, midieron con láser y en una sola mañana tuvieron todo instalado y la cocina limpia, como si no hubieran estado. Un trabajo fino y un precio justo.", "Salpicadero · Moncloa"],
];


const faqs = [
  ["¿Cuánto tarda una encimera a medida?", "Tras aprobar el diseño y realizar la medición final, el plazo habitual de fabricación e instalación se confirma según el material y la complejidad de la pieza."],
  ["¿Qué material es mejor para una cocina de uso diario?", "Depende del uso y del acabado que busques. El granito y el cuarzo ofrecen gran resistencia; el mármol y el travertino aportan una belleza natural que requiere cuidados específicos."],
  ["¿Realizáis la medición en casa?", "Sí. Nos desplazamos en Madrid para tomar medidas precisas y revisar encuentros, huecos y detalles antes de fabricar."],
  ["¿Incluís transporte e instalación?", "Sí. Preparamos cada propuesta contemplando fabricación, transporte e instalación para que tengas una visión clara del proyecto."],
  ["¿Cómo se cuida la piedra natural?", "Recomendamos limpieza con jabón neutro y evitar productos abrasivos. Al entregar la pieza te explicamos el mantenimiento adecuado para tu piedra."],
  ["¿Trabajáis con arquitectos e interioristas?", "Sí. Colaboramos con profesionales, aceptamos planos y coordinamos muestras, despieces, plazos y montaje en obra."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [submitted, setSubmitted] = useState(false);
  const visibleProjects = filter === "Todos" ? projects : projects.filter((project) => project.style === filter);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [contactError, setContactError] = useState(false);

  const makeMessage = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const contactText = [
      String(data.get("phone") ?? "").trim() && `Teléfono: ${String(data.get("phone")).trim()}`,
      String(data.get("email") ?? "").trim() && `Correo: ${String(data.get("email")).trim()}`,
    ].filter(Boolean).join(" · ");
    return `Hola LUMARA STONE, soy ${data.get("name")}. Quiero solicitar presupuesto para ${data.get("project")}. Material de interés: ${data.get("material")}. Contacto: ${contactText}. Detalles: ${data.get("message")}`;
  };

  const saveQuote = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    const { error } = await supabase.from("solicitudes_presupuesto").insert({
      nombre: String(data.get("name") ?? ""),
      contacto: [
        String(data.get("phone") ?? "").trim() && `Teléfono: ${String(data.get("phone")).trim()}`,
        String(data.get("email") ?? "").trim() && `Correo: ${String(data.get("email")).trim()}`,
      ].filter(Boolean).join(" · "),
      tipo_proyecto: String(data.get("project") ?? ""),
      material: String(data.get("material") ?? ""),
      mensaje: String(data.get("message") ?? ""),
    });
    if (error) throw error;
  };

  const handleSubmit = async (form: HTMLFormElement, channel: "whatsapp" | "email") => {
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (!String(data.get("phone") ?? "").trim() && !String(data.get("email") ?? "").trim()) {
      setContactError(true);
      return;
    }
    setContactError(false);
    setSaving(true);
    setSaveError(false);
    try {
      await saveQuote(form);
      setSubmitted(true);
      if (channel === "whatsapp") {
        window.open(`https://wa.me/34684403692?text=${encodeURIComponent(makeMessage(form))}`, "_blank", "noopener,noreferrer");
      } else {
        const subject = encodeURIComponent("Solicitud de presupuesto — LUMARA STONE");
        const body = encodeURIComponent(makeMessage(form));
        window.location.href = `mailto:lumarastone26@gmail.com?subject=${subject}&body=${body}`;
      }
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const sendWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(event.currentTarget, "whatsapp");
  };

  const sendEmail = () => {
    const form = document.getElementById("quote-form");
    if (form instanceof HTMLFormElement) void handleSubmit(form, "email");
  };

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-hero-foreground/25 text-hero-foreground">
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
          <a href="#inicio" className="min-w-0 font-display text-xl uppercase tracking-[0.18em] sm:text-2xl">Lumara <span className="text-gold-light">Stone</span></a>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.12em] lg:flex" aria-label="Navegación principal">
            <a href="#materiales" className="hover:text-gold-light">Materiales</a><a href="#proyectos" className="hover:text-gold-light">Proyectos</a><a href="#proceso" className="hover:text-gold-light">Proceso</a><a href="#contacto" className="hover:text-gold-light">Contacto</a>
            <Button asChild variant="light"><a href="#contacto">Pide presupuesto</a></Button>
          </nav>
          <Button variant="light" size="icon" className="lg:hidden" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-hero-foreground/20 bg-primary px-5 py-6 lg:hidden" aria-label="Navegación móvil">{["materiales", "proyectos", "proceso", "contacto"].map((item) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="block border-b border-primary-foreground/15 py-3 text-sm uppercase">{item}</a>)}</nav>}
      </header>

      <section id="inicio" className="relative min-h-[92svh] text-hero-foreground">
        <img src={heroImage} alt="Cocina luminosa con isla de mármol Calacatta a medida" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">Marmolería en Madrid · Piedra natural a medida</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">La piedra que define tu cocina.</h1>
          <div className="mt-8 flex max-w-3xl flex-col items-start justify-between gap-7 border-t border-hero-foreground/35 pt-6 sm:flex-row sm:items-end">
            <p className="max-w-lg text-base leading-relaxed text-hero-foreground/85 sm:text-lg">Diseñamos, fabricamos e instalamos encimeras, islas y salpicaderos a medida para hogares y estudios de interiorismo.</p>
            <Button asChild variant="light" size="large"><a href="#contacto">Pide presupuesto <ArrowRight size={17} /></a></Button>
          </div>
          <a href="#materiales" aria-label="Descubrir materiales" className="absolute bottom-5 right-5 grid size-11 place-items-center border border-hero-foreground/35 sm:right-8 lg:right-12"><ArrowDown size={18} /></a>
        </div>
      </section>

      <section id="materiales" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 border-b border-border pb-10 lg:grid-cols-2">
            <div><p className="section-kicker">01 — Materiales</p><h2 className="section-title">Una materia.<br /><em>Infinitas posibilidades.</em></h2></div>
            <p className="max-w-xl self-end text-base leading-7 text-muted-foreground lg:justify-self-end">Seleccionamos cada tabla por la belleza de su veta, su procedencia y su adecuación al uso. Te ayudamos a elegir con criterio técnico y sensibilidad estética.</p>
          </div>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
            {materials.map((material) => <article key={material.name} className="group bg-background">
              <div className="aspect-[4/5] overflow-hidden"><img src={material.image} alt={`Muestra de mármol ${material.name}`} width={400} height={400} loading="lazy" className="h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-[1.08]" /></div>
              <div className="px-1 pb-6 pt-5"><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{material.origin}</p><h3 className="mt-2 font-display text-2xl">{material.name}</h3><p className="mt-2 text-sm text-muted-foreground">{material.description}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="proyectos" className="bg-secondary px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="section-kicker">02 — Proyectos</p><h2 className="section-title">Cocinas con<br /><em>carácter propio.</em></h2></div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos">{["Todos", "Moderna", "Rústica", "Art déco"].map((name) => <Button key={name} variant={filter === name ? "primary" : "outline"} onClick={() => setFilter(name)} aria-pressed={filter === name}>{name}</Button>)}</div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {visibleProjects.map((project, index) => <figure key={project.title} className={index === 0 && visibleProjects.length > 2 ? "md:row-span-2" : ""}><div className={index === 0 && visibleProjects.length > 2 ? "aspect-[4/5] overflow-hidden" : "aspect-[4/3] overflow-hidden"}><img src={project.image} alt={`${project.title}, cocina de estilo ${project.style.toLowerCase()}`} width={1408} height={1056} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]" /></div><figcaption className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 pt-4"><div className="min-w-0"><h3 className="truncate font-display text-2xl">{project.title}</h3><p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{project.material}</p></div><span className="shrink-0 text-xs uppercase tracking-[0.14em]">{project.style}</span></figcaption></figure>)}
          </div>
        </div>
      </section>

      <section id="proceso" className="relative overflow-hidden bg-primary px-5 py-24 text-primary-foreground sm:px-8 lg:px-12 lg:py-36">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-stone-grain opacity-[0.05] mix-blend-soft-light" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-process-glow" />
        <div className="relative mx-auto max-w-[1440px]">
          <header className="mx-auto max-w-3xl text-center">
            <p className="section-kicker text-gold-light">03 — El proceso</p>
            <h2 className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">De la primera medida<br /><em>a la última veta.</em></h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-primary-foreground/60">Un proceso cuidado, claro y coordinado. Tú sabes en todo momento qué ocurre y cuándo.</p>
          </header>

          <div className="relative mt-20 lg:mt-28">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-primary-foreground/12 lg:block" />
            <span aria-hidden="true" className="process-rail absolute inset-x-0 top-0 hidden h-px bg-gradient-to-r from-gold-light via-accent/50 to-transparent lg:block" />
            <ol className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
              {processSteps.map(([numeral, place, title, text], index) => (
                <li key={title} className="process-step relative border-l border-primary-foreground/15 pl-7 lg:border-l-0 lg:pl-0 lg:pt-14">
                  <span aria-hidden="true" className="absolute top-1.5 -left-[5px] size-[9px] rotate-45 bg-accent lg:hidden" />
                  <span aria-hidden="true" className="absolute -top-[4px] left-0 hidden size-[9px] rotate-45 bg-accent lg:block" />
                  <span aria-hidden="true" className="pointer-events-none absolute right-0 top-10 hidden select-none font-display text-[6.5rem] leading-none text-primary-foreground/[0.055] lg:block">{numeral}</span>
                  <span aria-hidden="true" className="pointer-events-none absolute -top-9 right-0 select-none font-display text-[4.5rem] leading-none text-primary-foreground/[0.07] lg:hidden">{numeral}</span>
                  <div className={`relative ${index % 2 === 1 ? "lg:mt-16" : ""}`}>
                    <p className="relative text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light/85">{place}</p>
                    <h3 className="relative mt-3 font-display text-3xl leading-tight lg:max-w-[7ch] lg:text-[2.5rem]">{title}</h3>
                    <p className="relative mt-4 max-w-xs text-sm leading-7 text-primary-foreground/60">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20 flex flex-col items-center gap-5 sm:mt-24 sm:flex-row sm:justify-center sm:gap-7 lg:mt-28">
            <span aria-hidden="true" className="hidden h-px w-28 bg-gradient-to-r from-transparent to-accent/70 sm:block" />
            <span aria-hidden="true" className="h-px w-16 bg-accent/45 sm:hidden" />
            <p className="text-center font-display text-lg italic text-gold-light sm:text-xl">Precisión en cada fase del proyecto</p>
            <span aria-hidden="true" className="hidden h-px w-28 bg-gradient-to-l from-transparent to-accent/70 sm:block" />
          </div>
          <div className="mt-9 flex justify-center lg:mt-11">
            <Button asChild variant="gold" size="large"><a href="#contacto">Pide presupuesto <ArrowRight size={17} /></a></Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]"><p className="section-kicker">04 — Confianza</p><h2 className="section-title max-w-3xl">El detalle se nota.<br /><em>El trato también.</em></h2><p className="mt-5 text-xs text-muted-foreground">Opiniones ilustrativas — pendientes de sustituir por testimonios verificados.</p>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">{testimonials.map(([quote, author]) => <blockquote key={author} className="bg-background p-8 lg:p-10"><span className="font-display text-5xl text-accent">“</span><p className="mt-5 font-display text-xl leading-snug lg:text-2xl">{quote}</p><footer className="mt-8 text-xs uppercase tracking-[0.12em] text-muted-foreground">{author}</footer></blockquote>)}<div aria-hidden="true" className="hidden bg-background lg:block" /></div>
        </div>
      </section>

      <section className="bg-secondary px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="section-kicker">05 — Preguntas frecuentes</p><h2 className="section-title">Antes de<br /><em>empezar.</em></h2></div><div className="border-t border-border">{faqs.map(([question, answer], index) => <details key={question} className="group border-b border-border py-5" open={index === 0}><summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4 font-display text-xl"><span>{question}</span><span className="text-2xl font-light group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-2 pt-4 text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></div>
      </section>

      <section id="contacto" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-2 lg:gap-20"><div><p className="section-kicker">06 — Presupuesto</p><h2 className="section-title">Cuéntanos<br /><em>tu proyecto.</em></h2><p className="mt-7 max-w-lg leading-7 text-muted-foreground">Envíanos las primeras ideas. Te responderemos en pocos minutos para entender el espacio, orientarte y preparar un presupuesto sin compromiso.</p>
            <div className="mt-10 space-y-4 border-t border-border pt-7"><a href="tel:+34684403692" className="flex items-center gap-3 text-sm hover:text-accent"><Phone size={18} /> 684 403 692</a><a href="mailto:lumarastone26@gmail.com" className="flex items-center gap-3 break-all text-sm hover:text-accent"><Mail size={18} /> lumarastone26@gmail.com</a><p className="flex items-center gap-3 text-sm"><Check size={18} /> Consultas disponibles todos los días</p></div>
          </div>
          <form id="quote-form" onSubmit={sendWhatsApp} className="grid gap-5" noValidate={false}>
            <label className="field-label">Nombre y apellidos<input name="name" required maxLength={100} autoComplete="name" className="field-input" placeholder="Tu nombre" /></label>
            <div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Teléfono<input name="phone" type="tel" maxLength={30} autoComplete="tel" className="field-input" placeholder="Ej. 600 123 456" /></label><label className="field-label">Correo electrónico<input name="email" type="email" maxLength={150} autoComplete="email" className="field-input" placeholder="tucorreo@ejemplo.com" /></label></div>
            {contactError && <p className="text-sm text-destructive" role="alert">Indícanos un teléfono, un correo o ambos para poder responderte.</p>}
            <div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Tipo de proyecto<select name="project" required className="field-input"><option value="">Selecciona</option><option>Encimera</option><option>Isla</option><option>Salpicadero</option><option>Proyecto completo</option></select></label><label className="field-label">Material<select name="material" required className="field-input"><option value="">Selecciona</option>{materials.map((m) => <option key={m.name}>{m.name}</option>)}<option>Necesito asesoramiento</option></select></label></div>
            <label className="field-label">Háblanos del espacio<textarea name="message" required minLength={10} maxLength={1000} rows={4} className="field-input resize-none" placeholder="Medidas aproximadas, zona de Madrid, estilo..." /></label>
            <div className="grid gap-3 sm:grid-cols-2"><Button type="submit" size="large" disabled={saving}><MessageCircle size={18} /> {saving ? "Enviando…" : "Enviar por WhatsApp"}</Button><Button type="button" variant="outline" size="large" disabled={saving} onClick={sendEmail}><Mail size={18} /> {saving ? "Enviando…" : "Enviar por correo"}</Button></div>
            {submitted && !saveError && <p className="text-sm text-success" role="status">Solicitud recibida. Te contactaremos lo antes posible; también puedes completar el envío en la aplicación que se ha abierto.</p>}
            {saveError && <p className="text-sm text-destructive" role="alert">No se ha podido registrar la solicitud. Inténtalo de nuevo o escríbenos por WhatsApp.</p>}
            <p className="text-xs leading-5 text-muted-foreground">Al enviar aceptas que usemos tus datos únicamente para responder a tu solicitud.</p>
          </form></div>
          <div className="mt-20 overflow-hidden border border-border"><iframe title="Mapa de zona de servicio en Madrid" src="https://www.openstreetmap.org/export/embed.html?bbox=-3.888%2C40.300%2C-3.500%2C40.570&amp;layer=mapnik" className="h-[360px] w-full grayscale" loading="lazy" /><div className="grid gap-2 border-t border-border p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-display text-xl">Servicio en Madrid</p><p className="mt-1 text-sm text-muted-foreground">Nos desplazamos para medir e instalar tu proyecto.</p></div><a href="https://www.openstreetmap.org/#map=10/40.435/-3.694" target="_blank" rel="noreferrer" className="text-xs font-semibold uppercase tracking-[0.12em]">Ver mapa ↗</a></div></div>
        </div>
      </section>

      <footer className="bg-primary px-5 py-12 text-primary-foreground sm:px-8 lg:px-12"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 border-b border-primary-foreground/20 pb-12 md:grid-cols-3"><div><p className="font-display text-3xl uppercase tracking-[0.15em]">Lumara <span className="text-gold-light">Stone</span></p><p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/55">Piedra natural y superficies a medida para cocinas en Madrid.</p></div><div><p className="footer-title">Disponibilidad</p><p className="mt-3 text-sm text-primary-foreground/65">Atención los 7 días de la semana</p><p className="mt-1 text-sm text-primary-foreground/65">Consultas por teléfono, WhatsApp y correo</p></div><div><p className="footer-title">Contacto</p><a href="tel:+34684403692" className="mt-3 block text-sm text-primary-foreground/65">+34 684 403 692</a><a href="mailto:lumarastone26@gmail.com" className="mt-1 block break-all text-sm text-primary-foreground/65">lumarastone26@gmail.com</a></div></div><div className="flex flex-col gap-2 pt-6 text-[11px] uppercase tracking-[0.12em] text-primary-foreground/45 sm:flex-row sm:justify-between"><p>© 2026 LUMARA STONE</p><p>Diseño y piedra a medida · Madrid</p></div></div></footer>

      <a href="https://wa.me/34684403692?text=Hola%20LUMARA%20STONE%2C%20quiero%20solicitar%20presupuesto." target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-contact transition-transform hover:scale-105"><MessageCircle size={24} /></a>
    </main>
  );
}
