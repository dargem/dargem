import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper";

import { Document, Page, pdfjs} from 'react-pdf';
import { Download } from "lucide-react";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
    return (
        <>
            <div className="window-header">
                <WindowControls target="resume"/>
                <h2>Resume.pdf</h2>

                <a 
                    href="/files/Resume.pdf"
                    download 
                    className="cursor-pointer"
                    title="Download resume"
                >
                    <Download className="icon" />
                </a>
            </div>

            <Document file="/files/Resume.pdf">
                <Page pageNumber={1} 
                scale={1.15}
                renderTextlayer 
                renderAnnotationLayer 
            />
            </Document>
        </>
    )
};

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;