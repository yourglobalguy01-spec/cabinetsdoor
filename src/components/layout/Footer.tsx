export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-bg py-32 px-8 border-t border-brand-stone/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl tracking-widest uppercase mb-6">Maple Leaf Doors</h2>
            <p className="font-body font-light text-brand-stone max-w-sm text-lg mb-6">
              Crafting the world's finest architectural woodwork and luxury cabinetry.
            </p>
            <div className="font-mono text-xs tracking-widest text-brand-stone/70 flex flex-col gap-2 uppercase">
              <p>173 Glidden Rd Unit 9</p>
              <p>Brampton, ON L6W 3L9, Canada</p>
              <p className="mt-2 text-white/90">+1 905-670-6871</p>
            </div>
          </div>
          
          <div className="mt-16 md:mt-0">
            <h4 className="font-mono text-sm tracking-widest text-brand-stone uppercase mb-4">Newsletter</h4>
            <div className="flex border-b border-brand-stone/30 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none w-full font-body text-brand-bg placeholder:text-brand-stone/50"
              />
              <button className="font-button uppercase text-sm tracking-widest hover:text-brand-oak transition-colors">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-between">
          <div className="flex gap-16">
            <ul className="flex flex-col gap-4 font-button text-sm tracking-widest uppercase">
              <li><a href="#" className="hover:text-brand-oak transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-brand-oak transition-colors">Pinterest</a></li>
              <li><a href="#" className="hover:text-brand-oak transition-colors">LinkedIn</a></li>
            </ul>
            <ul className="flex flex-col gap-4 font-button text-sm tracking-widest uppercase text-brand-stone">
              <li><a href="#" className="hover:text-brand-bg transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-bg transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-bg transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div className="mt-16 md:mt-0 font-mono text-xs text-brand-stone/50 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Maple Leaf Doors Inc. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  )
}
