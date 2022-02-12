import { AboutParagraphAtom } from "../Atoms/AboutParagraph"

export const AboutSection = (sectionTitle: string, content: string ) => {
  return (
    <section className="mb-8">
      <h1 className="text-lg border-b-2 border-b-black">{ sectionTitle }</h1>
      { AboutParagraphAtom(content)}
    </section>
  )
}