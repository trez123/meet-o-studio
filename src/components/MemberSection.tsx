import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function MemberSection() {
  return (
    <div className='mt-14 py-10 px-2 sm:px-4 sm:mt-12 sm:py-4 lg:mt-32 mx-2 sm:mx-4 relative'>
    <div className='rounded-3xl bg-meet-primary py-8 sm:py-12'>
      <Container>
        <FadeInStagger faster>
          <div className='grid grid-cols-1 sm:gap-x-8 gap-y-8 sm:gap-y-2 lg:grid-cols-3 sm:mb-8'>
              <div className='sm:col-span-3'>
                <FadeIn>
                  <h1 className="sm:my-6 text-4xl sm:text-7xl text-white font-bold text-center sm:text-start">
                  Become A Member
                  </h1>
                </FadeIn>
              </div>
              <div className='sm:col-span-2'>
                <FadeIn>
                  <Button href="/contact" invert={true}>
                      Contact Us
                  </Button>
                </FadeIn>
              </div>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>12</span> hours / 8 episodes 
                per month (Studio 
                Create / Podcast Start)
                </p>
              </FadeIn>
              <p className='hidden sm:block'></p>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl sm:mb-16 sm:mt-8'>
                <span className='font-bold'>15% off </span> Podcast Studio Complete & Editing Bay
                </p>
              </FadeIn>
              <p className='hidden sm:block'></p>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>15% off </span> for additional hours booked
                </p>
              </FadeIn>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>10% off</span> gear rental
                </p>
              </FadeIn>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>No</span> minimum hourly 
                  booking requirement 
                  and  <span className='font-bold'>no deposit</span>required
                </p>
              </FadeIn>
          </div>
        </FadeInStagger>
      </Container>
    </div>
    <div className='absolute w-7 sm:w-10 bottom-8 sm:bottom-0 left-0'>
    <svg version="1.1" viewBox="0 0 10.24519 9.8420992" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
      <defs id="defs1"/>
      <g id="layer1" transform="translate(-6.32139,-748.29052)">
        <path id="path34-8-9-4-1" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="rotate(-90,296.16381,466.09797)"/>
      </g>
      <title id="title1">Twitter-color</title>
      <title id="title1-6">instagram [#167]</title>
    </svg>
    </div>
    <div className='absolute w-7 sm:w-10 top-8 sm:top-0 right-0'>
    <svg version="1.1" viewBox="0 0 10.245192 9.8420344" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
      <defs id="defs1"/>
      <g id="layer1" transform="translate(-193.43343,-656.22131)">
        <path id="path34-8-9-4" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="rotate(90,-136.07901,516.01318)"/>
      </g>
      <title id="title1">Twitter-color</title>
      <title id="title1-6">instagram [#167]</title>
    </svg>
    </div>
</div>
  )
}
