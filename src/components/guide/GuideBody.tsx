'use client'

import ReactMarkdown from 'react-markdown'

export default function GuideBody({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
