import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { MemberSection } from '@/components/MemberSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import imageLaptop from '@/images/laptop.jpg'
import landingSelfie from '@/images/landing-selfie.jpeg'
import mic from '@/images/audiomic.jpg'
import mic2 from '@/images/mic2.jpg'
import podcast from '@/images/podcast.jpg'
import musicStudio from '@/images/musicstudio.jpg'
import photography from '@/images/clients/photography/photography.svg'
import editing from '@/images/clients/photography/editing.svg'
import clientArea from '@/images/clients/photography/client-area.svg'
import gallery from '@/images/clients/photography/gallary.svg'
import videography from '@/images/clients/photography/videography.svg'
import presentations from '@/images/clients/photography/presentation.svg'
import production from '@/images/clients/photography/production.svg'
import podcasting from '@/images/clients/photography/podcasting.svg'
import { SelfieImage } from '@/components/SelfieImage'
import { url } from 'inspector'
import { PortraitImage } from '@/components/PortraitImage'

const options = [
  ['Photography', photography],
  ['Editing', editing],
  ['Client Area', clientArea],
  ['Gallery', gallery],
  ['Videography', videography],
  ['Presentations', presentations],
  ['Production', production],
  ['Podcasting', podcasting],
]

function Options() {
  return (
    <div className='mt-14 py-10 px-2 sm:px-4 sm:mt-12 sm:py-4 lg:mt-16 mx-2 sm:mx-4 relative'>
      <div className='rounded-3xl bg-meet-primary py-8 sm:py-12'>
        <Container>
        <FadeIn className="flex items-center gap-x-8">
          <p className="mt-6 text-xl text-white">
            Our Studio is built to cover more than Podcast Recording
          </p>
        </FadeIn>
          <FadeInStagger faster>
            <ul
              role="list"
              className="mt-6 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 items-center"
            >
              {options.map(([option, logo]) => (
                <li key={option}>
                  <FadeIn>
                    <div className='flex gap-2 items-center'>
                      <Image className='sm:w-12 w-6' src={logo} alt={option} unoptimized />
                      <h3 className="sm:text-2xl text-white" style={{"fontFamily":"'.New York'",}} >{option}</h3>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </div>
      <div className='absolute w-7 sm:w-10 top-8 sm:top-0 left-0'>
        <svg  id="svg1" version="1.1" viewBox="0 0 9.8420754 10.24519" xmlns="http://www.w3.org/2000/svg">
          <defs id="defs1"/>
          <g id="layer1" transform="translate(-6.486444,-100.59057)">
            <path id="path34-8" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="translate(2.357332,-75.66499)"/>
          </g>
        </svg>
      </div>
      <div className='absolute w-7 sm:w-10 bottom-8 sm:bottom-0 right-0'>
        <svg  id="svg1" version="1.1" viewBox="0 0 9.8420754 10.24519" xmlns="http://www.w3.org/2000/svg">
          <defs id="defs1"/>
          <g id="layer1" transform="translate(-211.91697,-200.08572)">
            <path id="path34-8-9-3" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="rotate(180,112.94408,193.29323)"/>
          </g>
        </svg>
      </div>
  </div>

  )
}

function PhotographyPortraits() {
  return (
    <>
      <SectionIntro
        title="PHOTOGRAPHY PORTRAITS"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
                  Our photography packages include consultations, 
          storyboards, online galleries, retouched images, 
          and image coaching. We cover engagements, birthdays, 
          portraits, and more. Enhance your session with styling, 
          creative direction, and printing services.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FadeIn>
            <PortraitImage shape={1} src={mic} alt="Photography portrait" />
          </FadeIn>
          <div className='sm:mt-32'>
            <FadeIn>
              <PortraitImage shape={1} src={mic2} alt="Photography portrait" />
            </FadeIn>
          </div>
          <FadeIn>
            <PortraitImage shape={1} src={podcast} alt="Photography portrait" />
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="PODCAST AND AUDIO RECORDING STUDIO"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        Record and stream your Audio & Podcast Recording 
All in One Space. Record clear capture for you and 
up to 3 guests. Meet and start your podcast recording today.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={musicStudio}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Elevate">
              your studio experience and 
              tailor it to your exact needs with our gear 
              rentals
            </ListItem>
            <ListItem title="This space">
              is modular to work well for any 
              media needs you may have. Whether it's 
              Podcasting, Live Streaming, or Corporate 
              Training - Meet Studio is equipped to handle it!
            </ListItem>
            <ListItem title="Travel Light?">
              we got you covered! Just walk 
              with your favourite camera!
            </ListItem>
            <ListItem title="Ideal">
              for small to medium-sized productions 
              individual and group portrait shoots, green 
              screen, editorial, music video &ashion product
              launches.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'Meet Studio.Co in Mandeville provides a versatile space for photo and video shoots, podcasts, and live streams, featuring a white Cyc wall, sound booth, and dressing room.',
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 sm:mt-32">
        <FadeInStagger>
          <div className='flex justify-center items-center sm:flex-row gap-8 flex-col-reverse lg:justify-end lg:pr-12'>
            <div className='sm:w-1/2'>
              <FadeIn>
                  <h1 className="font-display text-5xl font-bold tracking-tight text-meet-primary lg:leading-[6rem] [text-wrap:balance] lg:text-[5.5rem]">
                      ALL-WHITE STUDIO WITH EVERYTHING YOU NEED IN ONE PLACE
                  </h1>
              </FadeIn>
            </div>
              <div className='sm:w-1/2'>
                <FadeIn>
                <SelfieImage 
                src={landingSelfie} 
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"/>
                </FadeIn>
              </div>
          </div>
          <FadeIn>
            <p className="mt-6 text-xl text-meet-secondary">
              Meet Studio.Co in Mandeville provides a versatile space for photo and video shoots, podcasts, and live 
                streams, featuring a white Cyc wall, sound booth, and dressing room.
            </p>
          </FadeIn>
        </FadeInStagger>
      </Container>

      <Options />

      <PhotographyPortraits />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
      />

      <Services />

      <MemberSection />
    </>
  )
}
