import Image from "next/image"
import Link from "next/link"
import { ChevronDown, MapPin, Calendar, Users, Info, Package, Ticket, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { FadeInSection } from "@/components/FadeInSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Animated Background with frame sequence */}
      <AnimatedBackground />
      
      {/* Header - Vertical Glassmorphism Sidebar with Icons - now on the right */}
      <header className="fixed top-6 right-6 z-50 p-2">
        <div className="flex flex-col h-[75vh] w-[60px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-3 shadow-lg">
          <div className="flex flex-col items-center gap-1 font-bold text-sm mb-8">
            <span className="text-white text-shadow tracking-widest text-xs">CASA</span>
            <span className="text-white text-shadow tracking-widest text-xs">TIGRE</span>
          </div>
          <nav className="flex flex-col items-center gap-8 flex-grow">
            <Link
              href="#about"
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="About"
            >
              <Info className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                About
              </span>
            </Link>
            <Link
              href="#included"
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="What's Included"
            >
              <Package className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                What's Included
              </span>
            </Link>
            <Link
              href="#schedule"
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="Schedule"
            >
              <Calendar className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Schedule
              </span>
            </Link>
            <Link
              href="#booking"
              className="p-1.5 rounded-full hover:bg-white/30 transition-colors group relative"
              aria-label="Booking"
            >
              <Ticket className="h-5 w-5 text-white" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Booking
              </span>
            </Link>
          </nav>
          <Link
            href="#booking"
            className="mt-auto p-2.5 bg-[#e67e22] hover:bg-[#d35400] text-white rounded-full flex items-center justify-center group relative transition-colors"
            aria-label="Book Now"
          >
            <BookOpen className="h-5 w-5" />
            <span className="absolute right-full mr-2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Book Now
            </span>
          </Link>
        </div>
      </header>

      <div className="content-overlay">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="container relative z-10 px-4 md:px-6 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-shadow">CASA TIGRE</h1>
              <p className="text-xl md:text-2xl font-light mb-8 text-shadow">DevConnect Island Retreat</p>
              <p className="text-lg md:text-xl max-w-2xl mb-12 text-shadow">
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
              <span className="text-sm font-medium text-shadow">Scroll Down</span>
              <ChevronDown className="h-6 w-6" />
            </Link>
          </div>
        </section>

        {/* About Section */}
        <FadeInSection>
          <section id="about" className="relative py-24 transparent-section my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-shadow">Welcome to CASA Tigre</h2>
                  <p className="text-lg text-white mb-6 leading-relaxed text-shadow">
                    A tropical escape meets builder paradise. Nestled in the lush islands of the Tigre Delta, CASA Tigre is
                    your DevConnect sanctuary — just 45 minutes from the city, and a world away.
                  </p>
                  <p className="text-lg text-white leading-relaxed text-shadow">
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
        </FadeInSection>

        {/* What's Included Section */}
        <FadeInSection>
          <section id="included" className="relative py-24 transparent-section my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">🛶 What's Included</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="grid gap-4">
                    <p className="text-lg text-white text-shadow">✨ 4-day retreat (or book per night)</p>
                    <p className="text-lg text-white text-shadow">🏡 Airbnb-style riverside mansion</p>
                    <p className="text-lg text-white text-shadow">🧘 Morning yoga & stretching</p>
                  </div>
                </div>
                <div className="glass-card p-8 rounded-2xl">
                  <div className="grid gap-4">
                    <p className="text-lg text-white text-shadow">🍳 Gourmet home chefs + Argentine BBQ</p>
                    <p className="text-lg text-white text-shadow">🔥 Night firepits & marshmallows</p>
                    <p className="text-lg text-white text-shadow">🛶 Canoe rides & jetski fun</p>
                  </div>
                </div>
                <div className="glass-card p-8 rounded-2xl">
                  <div className="grid gap-4">
                    <p className="text-lg text-white text-shadow">💻 Cowork spaces & a chill Web3 workshop</p>
                    <p className="text-lg text-white text-shadow">🌅 Epic sunsets & riverside hangs</p>
                    <p className="text-lg text-white text-shadow">🤝 Amazing company — devs, designers, dreamers</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Visual Break */}
        <FadeInSection>
          <section className="relative h-[400px] z-10">
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl mx-4 md:mx-8" />
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center max-w-3xl z-10 relative text-shadow">
                Come reset. Come inspired. Come build.
              </h2>
            </div>
          </section>
        </FadeInSection>

        {/* Schedule Section (Small) */}
        <FadeInSection>
          <section id="schedule" className="relative py-24 transparent-section my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">📆 Schedule at a Glance</h2>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">Day 1</h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">ARRIVAL & FLOW</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">15:00</span>
                      <span className="text-white text-shadow">Arrival by boat</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">19:00</span>
                      <span className="text-white text-shadow">BBQ night</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">21:00</span>
                      <span className="text-white text-shadow">Firepit + marshmallows</span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">Day 2</h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">BODY & MIND</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">08:00</span>
                      <span className="text-white text-shadow">Yoga on the deck</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">12:00</span>
                      <span className="text-white text-shadow">Cowork & connect</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">19:00</span>
                      <span className="text-white text-shadow">Dinner & chill</span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">Day 3</h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">PLAY & BUILD</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">10:00</span>
                      <span className="text-white text-shadow">Jetski & canoe</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">14:00</span>
                      <span className="text-white text-shadow">Open mic</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">17:00</span>
                      <span className="text-white text-shadow">Sunset asado</span>
                    </li>
                  </ul>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="font-bold text-xl mb-3 text-white text-shadow">Day 4</h3>
                  <h4 className="font-medium text-lg mb-2 text-white text-shadow">WIND DOWN</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">08:00</span>
                      <span className="text-white text-shadow">Light yoga & breakfast</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">11:00</span>
                      <span className="text-white text-shadow">Reflections & goodbyes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-white text-shadow">12:00</span>
                      <span className="text-white text-shadow">Checkout by boat</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Booking Options */}
        <FadeInSection>
          <section id="booking" className="relative py-24 transparent-section my-8 mx-4 md:mx-8">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white text-shadow">🏝️ Booking Options</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="glass-card p-8 rounded-2xl border border-white/20 flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-white text-shadow">Drop-in Day Pass</h3>
                  <p className="text-white mb-6 flex-grow text-shadow">Join us for a day of activities, meals, and connections.</p>
                  <Button className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white">Apply to Visit</Button>
                </div>
                <div className="glass-card p-8 rounded-2xl border border-white/20 flex flex-col">
                  <h3 className="text-xl font-bold mb-4 text-white text-shadow">Single Night Stay</h3>
                  <p className="text-white mb-6 flex-grow text-shadow">
                    Experience a night at CASA Tigre with all amenities included.
                  </p>
                  <Button className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white">Book Now</Button>
                </div>
                <div className="glass-card p-8 rounded-2xl border border-white/20 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#e67e22] text-white px-4 py-1 text-sm font-medium">
                    BEST VALUE
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white text-shadow">Full Retreat Pass</h3>
                  <p className="text-white mb-6 flex-grow text-shadow">4 days, 3 nights - the complete CASA Tigre experience.</p>
                  <Button className="w-full bg-[#e67e22] hover:bg-[#d35400] text-white">Reserve Now</Button>
                </div>
              </div>
              <div className="text-center mt-12">
                <p className="text-lg font-medium mb-4 text-white text-shadow">Limited spots – Reserve your hammock!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button className="bg-[#e67e22] hover:bg-[#d35400] text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Apply to Visit
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    See Location
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
        
        {/* Footer */}
        <FadeInSection>
          <footer className="relative py-12 bg-[#2c3e50]/60 backdrop-blur-md text-white my-8 mx-4 md:mx-8 rounded-2xl">
            <div className="container px-4 md:px-6 text-center">
              <div className="font-bold text-xl mb-6 text-shadow">CASA TIGRE</div>
              <p className="mb-8 text-shadow">Hosted by builders for builders.</p>
              <p className="text-sm text-gray-200 text-shadow">© {new Date().getFullYear()} CASA Tigre. All rights reserved.</p>
            </div>
          </footer>
        </FadeInSection>
      </div>
    </div>
  )
}
