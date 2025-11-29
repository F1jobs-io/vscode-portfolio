import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import user from '../data/user.json';
import { getAssetPath } from '../lib/utils';

const ResumePage = () => {
  const [error, setError] = React.useState(null);
  const resumeLink = getAssetPath(user.resumeUrl);

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">My Resume</h3>
      <div className="h-[90vh]">
        {error ? (
          <div className="text-red-500">
            Failed to load PDF: {error}
          </div>
        ) : (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer 
              fileUrl={resumeLink}
              onError={(error) => setError(error.message)}
            />
          </Worker>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Resume' },
  };
}

export default ResumePage;