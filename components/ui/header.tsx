import Link from 'next/link'
import MobileMenu from './mobile-menu'

export default function Header() {
  return (
    <header className="absolute w-full z-30 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" >
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
        
          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-center flex-wrap items-center">
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-darkestgray-100 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-darkestgray-100 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Forums
                </Link>
              </li>
              <li>
              <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
            <img src="./images/LOGO.png" alt="" className="logoimage" />
            </Link>
          </div>

              </li>
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-darkestgray-100 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="font-medium text-darkestgray-100 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Support
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
