import { useState } from 'react'

const COLLECTIONS = [
  { id: 'kitchens', name: 'Kitchens', image: '/images/luxury_kitchen_hero_1785351624417.png' },
  { id: 'wardrobes', name: 'Wardrobes', image: '/images/luxury_wardrobe_1785351636494.png' },
  { id: 'bathrooms', name: 'Bathrooms', image: '/images/luxury_bathroom_1785351647878.png' },
  { id: 'living', name: 'Living Spaces', image: '/images/luxury_kitchen_hero_1785351624417.png' }
]

export function ProductCollection() {
  const [activeImage, setActiveImage] = useState(COLLECTIONS[0].image)

  return (
    <section className="relative min-h-screen bg-brand-dark text-brand-bg py-16 md:py-32 overflow-hidden">
      {/* Background Image that changes on hover */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out opacity-40">
        <img 
          src={activeImage} 
          alt="Room Transform" 
          className="w-full h-full object-cover transition-transform duration-[20s] ease-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-dark/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="font-mono text-sm tracking-widest text-brand-stone mb-12 md:mb-16 uppercase">Product Collection</h3>
        
        <div className="flex flex-col">
          {COLLECTIONS.map((item) => (
            <div 
              key={item.id}
              className="group border-b border-brand-stone/20 py-8 cursor-pointer flex justify-between items-center transition-colors hover:border-brand-stone"
              onMouseEnter={() => setActiveImage(item.image)}
            >
              <h2 className="font-heading text-4xl md:text-7xl text-brand-stone/50 transition-colors duration-500 group-hover:text-brand-bg">
                {item.name}
              </h2>
              <span className="font-mono text-brand-stone/50 group-hover:text-brand-bg transition-colors duration-500">
                0{item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
