"use client"

import { Spinner } from '@/components/ui/spinner'
import * as helpers from '@/lib/api/helpers'
import Image from 'next/image'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';

const ResearchPage = () => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [researchData, setResearchData] = useState(null)

  const handleQuerySubmit = async () => {
    setIsLoading(true)
    const response = await helpers.research(query)
    console.log(response)
    setResearchData(response)
    setIsLoading(false)
  }

  return (
    <section className='flex flex-col h-dvh p-6'>
      <div className="flex flex-col flex-1 justify-center items-center w-2/3 mx-auto min-h-0 gap-6">
        {researchData ? (
          <div className="flex flex-row flex-1 w-full mt-16 min-h-0 gap-3">
            <div className="flex flex-1 flex-col rounded-2xl p-4 border-2 border-gray-300 gap-4">
              <div className="flex justify-center items-start w-full">
                <h3 className='text-2xl'>Research Summary</h3>
              </div>

              <div className='font-montserrat-alternates text-gray-500 text-sm h-full min-h-0 overflow-y-auto [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full'>
                <ReactMarkdown>
                  {researchData.summary}
                </ReactMarkdown>
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-2xl p-4 border-2 border-gray-300 gap-4">
              <div className="flex justify-center items-start w-full">
                <h3 className='text-2xl'>Research Critique</h3>
              </div>

              <div className='font-montserrat-alternates text-gray-500 text-sm min-h-0 overflow-y-auto [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full'>
                <ReactMarkdown>
                  {researchData.critique}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center gap-5'>
            <h1 className='text-7xl'>Hello, Researcher</h1>

            <div className="flex flex-col justify-center items-center gap-2">

              <h2 className='text-5xl font-montserrat-alternates font-bold text-gray-400'>Let&apos;s make your research easier.</h2>

              <p className='text-lg font-montserrat-alternates text-gray-400'>Your personal AI assistant for research and knowledge.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-start items-start w-full px-6 py-3 bg-amber-50/80 rounded-3xl gap-6">
          <input type="text" className='w-full text-lg outline-none ring-0 border-none' placeholder='Ask anything...' value={query} onChange={(event) => setQuery(event.target.value)} />

          <div className="flex justify-between items-center w-full">
            <div className="flex aspect-square h-10 w-10 rounded-lg relative cursor-pointer" onClick={() => { }}>
              <Image src="/add.svg" alt='add-icon' fill />
            </div>

            <div className="flex justify-center items-center bg-black rounded-lg aspect-square p-1 relative cursor-pointer" onClick={handleQuerySubmit}>
              {isLoading ? (
                <Spinner className="text-white size-6" />
              ) : (
                <Image src="/up-arrow.svg" alt='up-arrow' className='object-contain' height={24} width={24} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default ResearchPage