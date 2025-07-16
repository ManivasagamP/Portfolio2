import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion, 
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import faqs from "../data/faq.json"

function LandingPage() {
  return (
    <div className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 bg-gradient-to-r from-blue-700 to-purple-800 '>
      <section className='text-center text-white'>
        <h1 className='flex flex-col items-center text-4xl font-extrabold sm:text-6xl lg:text-7xl py-4 '>
          Find Your Dream job{" "}
          <span className='flex items-center justify-center'>
            and get hired
          </span>
          <img src="/logo.png" alt="logo" className='h-30 mt-8 mb-8' />
        </h1>
        <div>
          <p className=' text-xl sm:text-2xl lg:text-3xl'>Explore thousands of job listings or find the perfect candidate</p>
        </div>
      </section>

      <div className='flex justify-center items-center gap-4'>
        <Link to="/jobs" >
          <Button variant="yellow" size="lg"> Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button variant="red" size="lg"> Post a job</Button>
        </Link>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl md:max-w-6xl mx-auto ">
        <Card className="opacity-80 hover:opacity-100 transition-opacity duration-300">
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="opacity-80 hover:opacity-100 transition-opacity duration-300">
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <section className='flex justify-center'>
        <Accordion type="single" collapsible className='max-w-4xl w-full bg-white p-6 rounded-2xl' >
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </section>
    </div>
  )
}

export default LandingPage 