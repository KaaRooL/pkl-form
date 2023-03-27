import Image from 'next/image'
import { useMediaQuery } from '../utils/helpers'

function Banner() {
  const isMobile = useMediaQuery(1024)

  return(
     isMobile 
     ?  <Image src="/banner.jpg" alt="banner" width="1920" height="100" />
     :  <Image src="/banner-desktop.jpg" alt="banner" width="1920" height="100" />
     )
}

export default Banner