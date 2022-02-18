import { AboutParagraphAtom } from "../Atoms/AboutParagraph"

export const AboutSection = (sectionTitle: string, content: string ) => {
  return (
    <section className="mb-16 leading-relaxed">
      <h1 className="text-xl border-b-2 mb-2 pb-2 border-b-black dark:border-b-gray-200">{ sectionTitle }</h1>
      { AboutParagraphAtom(content)}
    </section>
  )
}