import PageHero from "./PageHero.jsx";
import NotFound from "./NotFound.jsx";
import Reveal from "../components/Reveal.jsx";
import Contact from "../components/Contact.jsx";
import { postBySlug, posts } from "../data/index.js";

function Block({ block }) {
  if (block.type === "h") {
    return (
      <h2 className="mt-12 font-display text-2xl font-bold leading-snug sm:text-3xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-5 space-y-3">
        {(block.items ?? []).map((item) => (
          <li key={item} className="flex gap-3 text-neutral-300">
            <span className="mt-1.5 text-accent-2">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-5 text-lg leading-relaxed text-neutral-300">{block.text}</p>;
}

export default function BlogPostPage({ slug }) {
  const post = postBySlug(slug);
  if (!post) {
    return (
      <NotFound
        title="Article not found"
        blurb="That article link doesn't exist. Read the rest of the blog instead."
        backHref="#/articles"
        backLabel="All articles"
      />
    );
  }

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        tag={`${post.category} · ${post.date} · ${post.read} read`}
        title={post.title}
        blurb={post.excerpt}
        backHref="#/articles"
        backLabel="All articles"
        ctaLabel=""
      />

      <article className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <Reveal className="border-t border-white/10 pt-10">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </Reveal>

        <Reveal className="mt-14 rounded-3xl border border-white/10 bg-ink-soft p-8 text-center sm:p-10">
          <p className="font-display text-2xl font-bold">
            Want this kind of night for your brand?
          </p>
          <a
            href="#contact"
            className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book a consultation →
          </a>
        </Reveal>
      </article>

      {more.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
          <p className="mb-8 font-mono text-xs tracking-[0.3em] text-accent-2">
            KEEP READING
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {more.map((a) => (
              <a
                key={a.slug}
                href={`#/articles/${a.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-ink-soft p-6 transition-colors duration-300 hover:border-white/25"
              >
                <span className="font-mono text-xs text-accent-2">
                  {a.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">
                  {a.title}
                </h3>
                <span className="mt-4 font-mono text-sm font-bold text-accent transition-transform duration-200 group-hover:translate-x-1">
                  Read →
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <Contact />
    </>
  );
}
