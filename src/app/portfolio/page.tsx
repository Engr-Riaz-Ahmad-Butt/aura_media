export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-alabaster px-4 pb-20 pt-24 sm:px-6 sm:pt-28 md:pb-24 md:pt-32">
      <div className="container mx-auto">
        <h1 className="mb-6 text-5xl font-display italic leading-none text-midnight sm:text-6xl md:mb-8 md:text-9xl">
          The Archive
        </h1>
        <div className="w-20 h-[1px] bg-champagne/40 mb-10" />
        <p className="mb-14 max-w-2xl font-body text-base font-light leading-relaxed text-midnight/50 sm:text-lg md:mb-20 md:text-xl">
          A definitive collection of our masterworks. Explore how we capture light and emotion to immortalize the moments that matter most.
        </p>
        
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-14">
          {[
            '1511795409834-ef04bbd61622', 
            '1469334031218-e382a71b716b', 
            '1511285560929-80b456fea0bc', 
            '1522673607200-164d1b6ce486', 
            '1511578314322-379afb476865', 
            '1507003211169-0a1dd7228f2d'
          ].map((imgId, i) => (
            <div key={i} className="group relative aspect-[3/4] bg-black/[0.02] overflow-hidden border border-black/[0.04] rounded-3xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-110"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80')` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-midnight/0 transition-colors duration-700 group-hover:bg-midnight/20" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-100 transition-all duration-700 sm:p-6 md:p-8 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                 <span className="text-[10px] font-body text-champagne uppercase tracking-[0.4em] font-bold mb-2 block">Editorial</span>
                 <h3 className="font-display text-2xl text-alabaster italic sm:text-3xl">Project {i + 1}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
