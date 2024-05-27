import { useId } from 'react'
import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
}) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        className={clsx(
          'h-8 transition-all duration-300',
          invert ? 'fill-white' : 'fill-neutral-950',
          filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
        )}
      />
      <use
        href={`#${id}-path`}
        className={invert ? 'stroke-white' : 'stroke-neutral-950'}
        fill="none"
        strokeWidth="1.5"
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M3.25 26v.75H7c1.305 0 2.384-.21 3.346-.627.96-.415 1.763-1.02 2.536-1.752.695-.657 1.39-1.443 2.152-2.306l.233-.263c.864-.975 1.843-2.068 3.071-3.266 1.209-1.18 2.881-1.786 4.621-1.786h5.791V5.25H25c-1.305 0-2.384.21-3.346.627-.96.415-1.763 1.02-2.536 1.751-.695.658-1.39 1.444-2.152 2.307l-.233.263c-.864.975-1.843 2.068-3.071 3.266-1.209 1.18-2.881 1.786-4.621 1.786H3.25V26Z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    // <svg
    //   viewBox="0 0 130 32"
    //   aria-hidden="true"
    //   className={clsx(fillOnHover && 'group/logo', className)}
    //   {...props}
    // >
    //   <Logomark
    //     preserveAspectRatio="xMinYMid meet"
    //     invert={invert}
    //     filled={filled}
    //   />
    //   <path
    //     className={invert ? 'fill-white' : 'fill-neutral-950'}
    //     d="M52.928 23.716c5.184 0 7.992-1.992 7.992-5.28 0-3.888-2.688-4.8-7.512-5.376-3.36-.408-4.728-.672-4.728-2.448 0-1.464 1.44-2.376 3.912-2.376 2.4 0 3.936.864 4.104 2.784h3.576c-.24-3.288-3-5.232-7.536-5.232-4.728 0-7.68 1.896-7.68 5.208 0 3.48 2.712 4.464 7.416 5.04 3.216.408 4.8.648 4.8 2.664 0 1.584-1.392 2.544-4.224 2.544-3.048 0-4.68-1.176-4.752-3.288H44.6c.072 3.408 2.616 5.76 8.328 5.76Zm14.175-.216h3.312v-2.928h-1.968c-.84 0-1.272-.24-1.272-1.104v-6.144h3.24v-2.592h-3.24V6.676l-3.36.648v3.408h-2.496v2.592h2.496v7.2c0 2.04 1.248 2.976 3.288 2.976Zm10.078.216c2.16 0 4.104-1.008 4.944-2.64h.168l.144 2.424h3.288V10.732h-3.432v6.336c0 2.4-1.584 4.032-3.984 4.032-2.328 0-3.264-1.368-3.264-3.936v-6.432h-3.432v7.032c0 4.416 2.256 5.952 5.568 5.952Zm16.24.048c2.52 0 4.2-1.008 4.944-2.496h.168l.072 2.232h3.264V6.004h-3.408v7.008h-.168c-.792-1.56-2.592-2.52-4.848-2.52-3.816 0-6.384 2.592-6.384 6.624 0 4.056 2.568 6.648 6.36 6.648Zm1.032-2.616c-2.472 0-3.96-1.536-3.96-4.032s1.488-4.008 3.96-4.008 3.984 1.512 3.984 3.648v.744c0 2.136-1.536 3.648-3.984 3.648Zm9.485-12.216h3.408V6.004h-3.408v2.928Zm0 14.568h3.408V10.732h-3.408V23.5Zm12.481.24c4.584 0 7.56-2.52 7.56-6.624 0-4.152-3-6.624-7.56-6.624s-7.56 2.52-7.56 6.624c0 4.128 3.024 6.624 7.56 6.624Zm0-2.64c-2.592 0-4.128-1.56-4.128-3.984s1.536-3.984 4.128-3.984c2.616 0 4.152 1.536 4.152 3.984 0 2.424-1.56 3.984-4.152 3.984Zm8.794 2.4h3.384v-2.88h-3.384v2.88Z"
    //   />
    // </svg>
    <svg id="svg1" className={clsx(
      'h-8 lg:h-12 mr-2'
    )} version="1.1" viewBox="0 0 20.181313 7.0807161" xmlns="http://www.w3.org/2000/svg">
    <defs id="defs1"/>
    <g id="layer1" transform="translate(-99.747913,-143.93333)">
      <g id="g183" transform="translate(178.85833,191.55833)">
        <g id="g12-8-6" transform="translate(-92.2758,-63.87513)">
          <text id="text8-3-6" className={invert ? 'fill-white' : 'fill-meet-secondary'} style={{"fontSize":"7.45393px","fillOpacity":"1","strokeWidth":"0.621159"}} x="13.252734" y="22.022488" xmlSpace="preserve">
            <tspan id="tspan8-9-3" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontFamily":"'.New York'","strokeWidth":"0.621159"}} x="13.252734" y="22.022488">Meet</tspan>
          </text>
          <text id="text9-0-1" className={invert ? 'fill-white' : 'fill-meet-secondary'} style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"10.2662px","fontFamily":"'.New York'","fillOpacity":"1","strokeWidth":"0.855517"}} x="27.683336" y="21.083" xmlSpace="preserve">
            <tspan id="tspan9-5-6" style={{"strokeWidth":"0.855517"}} x="27.683336" y="21.083">.</tspan>
          </text>
          <text id="text11-2-1" className={invert ? 'fill-white' : 'fill-meet-secondary'} style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"normal","fontStretch":"normal","fontSize":"0.814424px","fontFamily":"'.New York'","letterSpacing":"0.603252px","fillOpacity":"1","strokeWidth":"0.101804"}} x="24.399694" y="23.317001" xmlSpace="preserve">
            <tspan id="tspan11-7-9" style={{"fontStyle":"normal","fontVariant":"normal","fontWeight":"bold","fontStretch":"normal","fontSize":"0.814424px","fontFamily":"'Bodoni 72 Bold'","letterSpacing":"0.603252px","strokeWidth":"0.101804"}} x="23.6" y="23.317001">STUDIO.CO</tspan>
          </text>
          <path id="path11-2-2" className={invert ? 'fill-white' : 'fill-meet-secondary'} style={{"strokeWidth":"0.0493304"}} d="m 32.078329,18.781899 a 1.2684793,1.2684793 0 0 0 -1.268565,1.268565 1.2684793,1.2684793 0 0 0 1.268565,1.268366 1.2684793,1.2684793 0 0 0 1.268366,-1.268366 1.2684793,1.2684793 0 0 0 -1.268366,-1.268565 z m 0,0.654364 a 0.61404097,0.61404097 0 0 1 0.614001,0.614201 0.61404097,0.61404097 0 0 1 -0.614001,0.614001 0.61404097,0.61404097 0 0 1 -0.6142,-0.614001 0.61404097,0.61404097 0 0 1 0.6142,-0.614201 z"/>
        </g>
        <rect height="1.0335284" id="rect1-7" className={invert ? 'fill-white' : 'fill-meet-secondary'} style={{"fillOpacity":"1","strokeWidth":"0.0755951"}} width="2.1" ry="0" x="-66" y="-47.625"/>
      </g>
    </g>
  </svg>
  )
}
