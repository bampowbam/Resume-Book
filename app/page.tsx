import AnimatedBook from '../components/AnimatedBook'

const RESUME_PDF_HREF = encodeURI('/Luke Balogun Resume 2025.docx (3).pdf')
const RESUME_DOCX_HREF = encodeURI('/Luke Balogun Resume 2025.docx')

export default function Home() {
  return (
    <>
      <h1>Scroll</h1>
      <main>
        <AnimatedBook />
      </main>

      <div className="resume-downloads" aria-label="Resume downloads">
        <div className="resume-downloads__label">Download resume</div>
        <div className="resume-downloads__actions">
          <a className="resume-downloads__button" href={RESUME_PDF_HREF} download="Luke-Balogun-Resume-2025.pdf">
            PDF
          </a>
          <a className="resume-downloads__button" href={RESUME_DOCX_HREF} download="Luke-Balogun-Resume-2025.docx">
            DOCX
          </a>
        </div>
      </div>
    </>
  )
}
