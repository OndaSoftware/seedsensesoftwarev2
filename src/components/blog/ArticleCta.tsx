interface ArticleCtaProps {
  text: string;
  buttonLabel: string;
}

/** The mint gradient call-to-action box that closes every article. */
export default function ArticleCta({ text, buttonLabel }: ArticleCtaProps) {
  return (
    <div className="mt-10 rounded-xl bg-gradient-to-br from-mint to-[#d4f0e1] px-9 py-8 text-center">
      <p className="mb-4 text-[1.1rem] font-semibold text-ink">{text}</p>
      <a
        href="#contact"
        className="inline-block rounded bg-primary px-5 py-3 text-center font-medium text-white transition-colors hover:bg-mint hover:text-primary"
      >
        {buttonLabel} &rarr;
      </a>
    </div>
  );
}
