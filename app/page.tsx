import Image from "next/image"
import Link from "next/link"
import { ChevronDown, MapPin, Calendar, Users, Info, Package, Ticket, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f4] pl-[100px] md:pl-[180px]">
      {/* Header - Vertical Glassmorphism Sidebar with Icons */}
      <header className="fixed top-0 left-0 z-50 h-screen p-4">
        <div className="flex flex-col h-full bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg">
          <Link href="/" className="flex flex-col items-center gap-2 font-bold text-xl mb-12 p-2">
            <span className="text-center">CASA TIGRE</span>
          </Link>
          <nav className="flex flex-col items-center gap-8 flex-grow">
            <Link
              href="#about"
              className="p-2 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="About"
            >
              <Info className="h-6 w-6" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                About
              </span>
            </Link>
            <Link
              href="#included"
              className="p-2 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="What's Included"
            >
              <Package className="h-6 w-6" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                What's Included
              </span>
            </Link>
            <Link
              href="#schedule"
              className="p-2 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="Schedule"
            >
              <Calendar className="h-6 w-6" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Schedule
              </span>
            </Link>
            <Link
              href="#booking"
              className="p-2 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="Booking"
            >
              <Ticket className="h-6 w-6" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Booking
              </span>
            </Link>
          </nav>
          <Link
            href="#booking"
            className="mt-auto p-3 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full flex items-center justify-center group relative transition-colors"
            aria-label="Book Now"
          >
            <BookOpen className="h-6 w-6" />
            <span className="absolute left-full ml-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Book Now
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Tigre Delta"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 px-4 md:px-6 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">CASA TIGRE</h1>
            <p className="text-xl md:text-2xl font-light mb-8">DevConnect Island Retreat</p>
            <p className="text-lg md:text-xl max-w-2xl mb-12">
              4 days to connect, create & chill in Buenos Aires' magical river delta
            </p>
          </div>
        </div>
        <div className="absolute bottom-16 left-16 z-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-[#e67e22] hover:bg-[#d35400] text-white text-lg px-8 py-6">Book Now</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 right-16 text-white animate-bounce">
          <Link href="#about" className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Welcome to CASA Tigre</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A tropical escape meets builder paradise. Nestled in the lush islands of the Tigre Delta, CASA Tigre is
                your DevConnect sanctuary — just 45 minutes from the city, and a world away.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Think: riverside mansion, BBQ smoke in the air, great WiFi, deep convos, and hammock naps between Web3
                lightning talks. Whether you're staying for the full retreat or just dropping by, come vibe with us.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="CASA Tigre Mansion"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section id="included" className="py-24 bg-[#faf8f4]">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">🛶 What's Included</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="grid gap-4">
                <p className="text-lg">✨ 4-day retreat (or book per night)</p>
                <p className="text-lg">🏡 Airbnb-style riverside mansion</p>
                <p className="text-lg">🧘 Morning yoga & stretching</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="grid gap-4">
                <p className="text-lg">🍳 Gourmet home chefs + Argentine BBQ</p>
                <p className="text-lg">🔥 Night firepits & marshmallows</p>
                <p className="text-lg">🛶 Canoe rides & jetski fun</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="grid gap-4">
                <p className="text-lg">💻 Cowork spaces & a chill Web3 workshop</p>
                <p className="text-lg">🌅 Epic sunsets & riverside hangs</p>
                <p className="text-lg">🤝 Amazing company — devs, designers, dreamers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=800&width=1920" alt="Riverside view" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative h-full flex items-center justify-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center max-w-3xl">
            Come reset. Come inspired. Come build.
          </h2>
        </div>
      </section>

      {/* Schedule Section (Small) */}
      <section id="schedule" className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">📆 Schedule at a Glance</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#faf8f4] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">Day 1</h3>
              <h4 className="font-medium text-lg mb-2">ARRIVAL & FLOW</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-medium">15:00</span>
                  <span>Arrival by boat</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">19:00</span>
                  <span>BBQ night</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">21:00</span>
                  <span>Firepit + marshmallows</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#faf8f4] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">Day 2</h3>
              <h4 className="font-medium text-lg mb-2">BODY & MIND</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-medium">08:00</span>
                  <span>Yoga on the deck</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">12:00</span>
                  <span>Cowork & connect</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">19:00</span>
                  <span>Dinner & chill</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#faf8f4] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">Day 3</h3>
              <h4 className="font-medium text-lg mb-2">PLAY & BUILD</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-medium">10:00</span>
                  <span>Jetski & canoe</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">14:00</span>
                  <span>Open mic</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">17:00</span>
                  <span>Sunset asado</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#faf8f4] p-6 rounded-xl">
              <h3 className="font-bold text-xl mb-3">Day 4</h3>
              <h4 className="font-medium text-lg mb-2">WIND DOWN</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-medium">08:00</span>
                  <span>Light yoga & breakfast</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">11:00</span>
                  <span>Reflections & goodbyes</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium">12:00</span>
                  <span>Checkout by boat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Options */}
      <section id="booking" className="py-24 bg-[#faf8f4]">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">🏝️ Booking Options</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0ddd5] flex flex-col">
              <h3 className="text-xl font-bold mb-4">Drop-in Day Pass</h3>
              <p className="text-gray-600 mb-6 flex-grow">Join us for a day of activities, meals, and connections.</p>
              <Button className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white">Apply to Visit</Button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0ddd5] flex flex-col">
              <h3 className="text-xl font-bold mb-4">Single Night Stay</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Experience a night at CASA Tigre with all amenities included.
              </p>
              <Button className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white">Book Now</Button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0ddd5] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#e67e22] text-white px-4 py-1 text-sm font-medium">
                BEST VALUE
              </div>
              <h3 className="text-xl font-bold mb-4">Full Retreat Pass</h3>
              <p className="text-gray-600 mb-6 flex-grow">4 days, 3 nights - the complete CASA Tigre experience.</p>
              <Button className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white">Reserve Now</Button>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg font-medium mb-4">Limited spots – Reserve your hammock!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button className="bg-[#e67e22] hover:bg-[#d35400] text-white flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Book Now
              </Button>
              <Button
                variant="outline"
                className="border-[#e67e22] text-[#e67e22] hover:bg-[#e67e22]/10 flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Apply to Visit
              </Button>
              <Button
                variant="outline"
                className="border-[#e67e22] text-[#e67e22] hover:bg-[#e67e22]/10 flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                See Location
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#2c3e50] text-white">
        <div className="container px-4 md:px-6 text-center">
          <div className="font-bold text-xl mb-6">CASA TIGRE</div>
          <p className="mb-8">Hosted by builders for builders.</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} CASA Tigre. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
