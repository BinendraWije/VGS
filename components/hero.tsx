import VideoThumb from '@/public/images/hero-image-01.jpg'
import ModalVideo from '@/components/modal-video'

export default function Hero() {
  return (
    <section className='position: relative'>
      {/*Hero image*/}
      <div className="herocontent position: relative"> 
      <img className="heroimage flex w-full min-h-95vh" src="./images/heroart.png" alt="" />
      <div className="herocontent position: absolute md:container md:mx-auto">
        <div className="herocontentbody">
        <img className="saluslogo max-w-md"src="./images/Salus Logo glowed.png" alt="" />
        <h2 className='herocontentdescription max-w-md'>
        A UNIQUE MULTIPLAYER 4X TURN BASED GAME   
        </h2>
        <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 max-w-md	" />
        <div className="buttonholder max-w-md	flex justify-around">
          <a href="" className="CTAbutton website border-yellow-100"  >Visit Website</a>
          <a href="" className="CTAbutton CTAmain steamlink">Wishlist On Steam</a>
        </div>
        </div>

    </div>
      </div> 
   
    </section>
  )
}
