import React, { useMemo, useState } from "react";
import {
  Menu, X, Search, UserRound, Heart, ChevronDown, ArrowRight, Play,
  ShieldCheck, BadgeCheck, Handshake, Wrench, Settings, Headphones,
  CarFront, Gauge, Fuel, CalendarDays, MapPin, ShoppingBag, Star,
  SlidersHorizontal, CheckCircle2, Phone, Mail, Clock, Cog, Disc3,
  ClipboardCheck, Package, Truck, Sparkles
} from "lucide-react";

const photo = (id, w=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
const cars = [
  {id:1, brand:"BMW", model:"BMW 5 Series", trim:"530i Luxury Sedan", year:2022, price:56900000, type:"Sedan", fuel:"Petrol", transmission:"Automatic", image:photo("photo-1555215695-3004980ad54e"), tag:"Popular"},
  {id:2, brand:"Mercedes-Benz", model:"Mercedes-Benz GLE", trim:"GLE 450 Luxury SUV", year:2023, price:72500000, type:"SUV", fuel:"Petrol", transmission:"Automatic", image:photo("photo-1618843479313-40f8afb4b4d8"), tag:"Featured"},
  {id:3, brand:"Audi", model:"Audi A6", trim:"Premium Executive Sedan", year:2022, price:61300000, type:"Sedan", fuel:"Petrol", transmission:"Automatic", image:photo("photo-1606664515524-ed2f786a0bd6")},
  {id:4, brand:"Porsche", model:"Porsche Panamera", trim:"Sport Turismo", year:2023, price:148000000, type:"Sports", fuel:"Petrol", transmission:"Automatic", image:photo("photo-1503376780353-7e6692767b70"), tag:"New arrival"},
  {id:5, brand:"Toyota", model:"Toyota Land Cruiser", trim:"300 Series VXR", year:2022, price:112000000, type:"SUV", fuel:"Petrol", transmission:"Automatic", image:photo("photo-1519641471654-76ce0107ad1b")},
  {id:6, brand:"Lexus", model:"Lexus RX 350", trim:"Luxury AWD", year:2023, price:78500000, type:"SUV", fuel:"Petrol", transmission:"Automatic", image:photo("photo-1519608487953-e999c86e7455")}
];
const parts = [
  {id:1,name:"Premium brake disc set",category:"Brakes",price:185000,image:photo("photo-1486262715619-67b85e0b08d3")},
  {id:2,name:"Performance alloy wheel",category:"Wheels & Tyres",price:320000,image:photo("photo-1507136566006-cfc505b114fc")},
  {id:3,name:"Engine air filter",category:"Engine",price:42000,image:photo("photo-1487754180451-c456f719a1fc")},
  {id:4,name:"LED headlamp assembly",category:"Electrical",price:245000,image:photo("photo-1504222490345-c075b6008014")}
];
const brands = ["Mercedes-Benz","BMW","Audi","Lexus","Tesla","Toyota","Honda","Porsche"];
const money = n => "₦" + n.toLocaleString("en-NG");

function App(){
  const [active,setActive] = useState("Home");
  const [mobile,setMobile] = useState(false);
  const [brand,setBrand] = useState("All brands");
  const [search,setSearch] = useState("");
  const [sort,setSort] = useState("Featured");
  const [liked,setLiked] = useState([]);
  const [modal,setModal] = useState(null);
  const [toast,setToast] = useState("");
  const [partCategory,setPartCategory] = useState("All parts");
  const [repairType,setRepairType] = useState("General servicing");
  const [form,setForm] = useState({name:"",phone:"",email:"",message:""});
  const [rentalMode,setRentalMode] = useState(false);

  const shownCars = useMemo(()=>{
    let list = cars.filter(c => (brand==="All brands" || c.brand===brand) && `${c.brand} ${c.model} ${c.trim}`.toLowerCase().includes(search.toLowerCase()));
    if(sort==="Price: low to high") list=[...list].sort((a,b)=>a.price-b.price);
    if(sort==="Price: high to low") list=[...list].sort((a,b)=>b.price-a.price);
    return list;
  },[brand,search,sort]);
  const showToast = msg => { setToast(msg); window.setTimeout(()=>setToast(""),2600); };
  const go = (name, id) => { setActive(name); setMobile(false); if(id) document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); else window.scrollTo({top:0,behavior:"smooth"}); };
  const openModal = (kind,item) => setModal({kind,item});
  const submit = e => {e.preventDefault(); showToast("Request received in this demo. Connect a backend to process enquiries."); setModal(null); setForm({name:"",phone:"",email:"",message:""});};
  const toggleLike = id => setLiked(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);

  const nav = [{name:"Home",id:"top"},{name:"Buy Cars",id:"inventory"},{name:"Rentals",id:"rentals"},{name:"Repairs",id:"repairs"},{name:"Spare Parts",id:"parts"},{name:"About",id:"about"}];
  return <div id="top">
    <div className="topline"><div className="topline-inner"><span className="topline-promo"><Sparkles size={15}/> YOUR COMPLETE AUTOMOTIVE MARKETPLACE</span><span className="topline-contact">Need help finding a car? <a href="mailto:hello@gearlock.example">Talk to our team</a></span><button className="top-cta" onClick={()=>openModal("contact")}>Get Started <ArrowRight size={14}/></button></div></div>
    <header className="header">
      <a className="logo" href="#top" onClick={e=>{e.preventDefault();go("Home")}}><span className="logo-mark"><Cog size={29}/><span className="logo-dot"/></span><span className="logo-type">GEAR <b>LOCK</b><small>BUY • SELL • RENT • REPAIR</small></span></a>
      <nav className="desktop-nav">{nav.map(n=><button key={n.name} className={active===n.name?"selected":""} onClick={()=>go(n.name,n.id)}>{n.name}</button>)}</nav>
      <div className="header-actions"><button aria-label="Search" onClick={()=>go("Buy Cars","inventory")}><Search/></button><button aria-label="Account" onClick={()=>openModal("account")}><UserRound/></button><button aria-label="Wishlist" onClick={()=>showToast(`${liked.length} saved vehicle${liked.length===1?"":"s"}`)}><Heart/><span className="count">{liked.length}</span></button><button className="mobile-menu" onClick={()=>setMobile(!mobile)} aria-label="Toggle menu">{mobile?<X/>:<Menu/>}</button></div>
    </header>
    {mobile&&<div className="mobile-nav">{nav.map(n=><button key={n.name} onClick={()=>go(n.name,n.id)}>{n.name}<ArrowRight size={15}/></button>)}</div>}

    <main>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade"/>
        <div className="hero-content">
          <div className="eyebrow"><span/> PREMIUM AUTOMOTIVE MARKETPLACE</div>
          <h1>Unlock Your<br/><em>Next Drive.</em></h1>
          <p>Discover exceptional cars, trusted repair professionals and quality spare parts — all in one place.</p>
          <div className="hero-buttons"><button className="gold-btn" onClick={()=>go("Buy Cars","inventory")}>Explore vehicles <ArrowRight size={17}/></button><button className="play-btn" onClick={()=>openModal("tour")}><span><Play size={15} fill="currentColor"/></span> Discover GEAR LOCK</button></div>
          <div className="trust-row"><div><BadgeCheck/><span>Verified<br/>Listings</span></div><div><ShieldCheck/><span>Trusted<br/>Partners</span></div><div><Handshake/><span>Support<br/>You Can Trust</span></div></div>
        </div>
        <div className="hero-caption"><span>01 / 04</span><i/> THE DRIVE STARTS HERE</div>
      </section>

      <section className="finder-wrap">
        <div className="finder-title"><span>Find Your Perfect Match</span><small>Search the GEAR LOCK marketplace</small></div>
        <div className="finder-fields">
          <label><CarFront/><select value={brand} onChange={e=>{setBrand(e.target.value);go("Buy Cars","inventory")}}><option>All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select><ChevronDown/></label>
          <label><Gauge/><select onChange={e=>{setSearch(e.target.value==="Any model"?"":e.target.value);go("Buy Cars","inventory")}}><option>Any model</option>{cars.map(c=><option key={c.id}>{c.model}</option>)}</select><ChevronDown/></label>
          <label><SlidersHorizontal/><select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown/></label>
          <button className="gold-btn" onClick={()=>go("Buy Cars","inventory")}>Search cars <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="brand-strip">
        {brands.slice(0,7).map((b,i)=><button key={b} onClick={()=>{setBrand(b);go("Buy Cars","inventory")}} className="brand-item"><span className="brand-symbol">{["✧","◉","◎","L","T","◉","H"][i]}</span><small>{b}</small></button>)}
        <button className="all-brands" onClick={()=>{setBrand("All brands");go("Buy Cars","inventory")}}>View all brands <ArrowRight size={15}/></button>
      </section>

      <section className="section inventory" id="inventory">
        <div className="section-heading"><div><span className="eyebrow dark">HANDPICKED FOR YOU</span><h2>Featured <em>Vehicles</em></h2></div><button className="text-link" onClick={()=>{setBrand("All brands");setSearch("")}}>View all inventory <ArrowRight size={16}/></button></div>
        <div className="inventory-tools"><div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by make, model or keyword..."/></div><div className="filter-note"><SlidersHorizontal size={15}/> {shownCars.length} vehicles available</div></div>
        <div className="car-grid">{shownCars.map(c=><article className="car-card" key={c.id}>
          <div className="car-image"><img src={c.image} alt={c.model}/>{c.tag&&<span className="car-tag">{c.tag}</span>}<button className={`heart ${liked.includes(c.id)?"liked":""}`} onClick={()=>toggleLike(c.id)} aria-label="Save vehicle"><Heart size={19} fill={liked.includes(c.id)?"currentColor":"none"}/></button></div>
          <div className="car-info"><div className="car-meta"><span>{c.year}</span><span>{c.type}</span><span>{c.transmission}</span></div><h3>{c.model}</h3><p>{c.trim}</p><div className="car-bottom"><div><small>Asking price</small><strong>{money(c.price)}</strong></div><button className="round-arrow" onClick={()=>openModal("vehicle",c)} aria-label={`View ${c.model}`}><ArrowRight/></button></div></div>
        </article>)}</div>
        {shownCars.length===0&&<div className="empty">No vehicles match your search. Try another brand or keyword.</div>}
      </section>

      <section className="feature-banner" id="rentals">
        <div className="banner-photo rental-photo"/>
        <div className="banner-copy"><span className="eyebrow">FLEXIBLE MOBILITY</span><h2>Find a ride.<br/><em>Make it yours.</em></h2><p>From a quick city trip to a weekend escape, explore cars available for rent.</p><button className="gold-btn" onClick={()=>{setRentalMode(true);openModal("rental")}}>Explore rentals <ArrowRight size={16}/></button></div>
        <div className="banner-index">02 <span>/ RENTALS</span></div>
      </section>

      <section className="section services" id="repairs">
        <div className="section-heading"><div><span className="eyebrow dark">CARE FOR EVERY JOURNEY</span><h2>Automotive <em>Services</em></h2></div><p className="heading-note">Keep your vehicle in excellent condition with reliable professionals.</p></div>
        <div className="service-grid">
          <article className="service-card service-dark"><div className="service-icon"><Wrench/></div><span className="service-number">01 / REPAIR</span><h3>Car Repair &<br/><em>Maintenance</em></h3><p>Find mechanics and workshops for diagnostics, servicing, bodywork and more.</p><button onClick={()=>openModal("repair")}>Find a repair service <ArrowRight size={16}/></button><div className="service-watermark"><Settings/></div></article>
          <article className="service-card service-light"><div className="service-icon"><Cog/></div><span className="service-number">02 / PARTS</span><h3>Quality Spare<br/><em>Parts & Accessories</em></h3><p>Shop essential parts, components and accessories for your vehicle.</p><button onClick={()=>go("Spare Parts","parts")}>Shop spare parts <ArrowRight size={16}/></button><div className="service-watermark"><Disc3/></div></article>
          <article className="service-card service-gold"><div className="service-icon"><ClipboardCheck/></div><span className="service-number">03 / EXPERT HELP</span><h3>Vehicle Checks &<br/><em>Expert Advice</em></h3><p>Get support with inspections, pre-purchase checks and vehicle questions.</p><button onClick={()=>openModal("inspection")}>Request an inspection <ArrowRight size={16}/></button><div className="service-watermark"><ShieldCheck/></div></article>
        </div>
      </section>

      <section className="section parts-section" id="parts">
        <div className="section-heading"><div><span className="eyebrow dark">THE RIGHT PART, RIGHT HERE</span><h2>Shop Spare <em>Parts</em></h2></div><button className="text-link" onClick={()=>showToast("Full parts catalogue can be connected to your inventory backend.")}>Explore parts store <ArrowRight size={16}/></button></div>
        <div className="parts-categories">{["All parts","Engine","Brakes","Wheels & Tyres","Electrical"].map(x=><button key={x} className={partCategory===x?"active":""} onClick={()=>setPartCategory(x)}>{x}</button>)}</div>
        <div className="parts-grid">{parts.filter(p=>partCategory==="All parts"||p.category===partCategory).map(p=><article className="part-card" key={p.id}><div className="part-image"><img src={p.image} alt={p.name}/><span><Package size={13}/> {p.category}</span></div><div className="part-info"><h3>{p.name}</h3><strong>{money(p.price)}</strong><button onClick={()=>openModal("part",p)}>View part <ArrowRight size={15}/></button></div></article>)}</div>
      </section>

      <section className="new-arrivals">
        <div className="new-arrivals-photo"/>
        <div className="new-arrivals-copy"><span className="eyebrow">JUST ARRIVED</span><h2>Discover<br/><em>New Arrivals.</em></h2><p>Be among the first to explore exciting new models and exclusive listings.</p><button className="gold-btn" onClick={()=>go("Buy Cars","inventory")}>Explore vehicles <ArrowRight size={16}/></button></div>
      </section>

      <section className="benefits" id="about">
        <div><CarFront/><b>Vehicle Marketplace</b><small>Buy, sell and rent</small></div><div><ShieldCheck/><b>Trusted Partners</b><small>Confidence on every step</small></div><div><Settings/><b>Repair Network</b><small>Care for your vehicle</small></div><div><Headphones/><b>Helpful Support</b><small>Here when you need us</small></div>
      </section>

      <section className="bottom-panels">
        <div className="testimonial"><div className="quote">“</div><div className="stars"><Star/><Star/><Star/><Star/><Star/></div><p>“A smooth experience from browsing to finding the right vehicle. The process felt clear and straightforward.”</p><div className="reviewer"><div className="avatar">DO</div><span><b>Daniel O.</b><small>GEAR LOCK community</small></span></div></div>
        <div className="test-drive"><div className="test-drive-bg"/><div><span className="eyebrow">EXPERIENCE IT YOURSELF</span><h2>Book a Test Drive.</h2><p>Get behind the wheel and experience your next car before you decide.</p><button className="gold-btn" onClick={()=>openModal("testdrive")}>Schedule a drive <ArrowRight size={16}/></button></div></div>
      </section>

      <section className="newsletter"><div><span className="eyebrow">STAY IN THE FAST LANE</span><h2>Good things are <em>in motion.</em></h2><p>Get updates on new listings, offers and automotive tips.</p></div><form onSubmit={e=>{e.preventDefault();showToast("Thanks for subscribing to GEAR LOCK updates.")}}><input type="email" placeholder="Enter your email address" required/><button className="gold-btn">Subscribe <ArrowRight size={15}/></button></form></section>
    </main>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><a className="logo" href="#top"><span className="logo-mark"><Cog size={29}/></span><span className="logo-type">GEAR <b>LOCK</b><small>BUY • SELL • RENT • REPAIR</small></span></a><p>Your destination for cars, rentals, repairs and quality spare parts.</p></div><div><h4>Explore</h4><button onClick={()=>go("Buy Cars","inventory")}>Buy a car</button><button onClick={()=>go("Rentals","rentals")}>Rent a car</button><button onClick={()=>openModal("contact")}>Sell your car</button></div><div><h4>Automotive care</h4><button onClick={()=>go("Repairs","repairs")}>Car repairs</button><button onClick={()=>go("Spare Parts","parts")}>Spare parts</button><button onClick={()=>openModal("inspection")}>Vehicle inspection</button></div><div><h4>Contact</h4><span><Mail size={14}/> hello@gearlock.example</span><span><Phone size={14}/> Contact details coming soon</span><span><MapPin size={14}/> Nigeria</span></div></div><div className="footer-bottom"><span>© 2026 GEAR LOCK. All rights reserved.</span><span>Unlock your next drive.</span></div></footer>

    {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><div className="modal">
      <button className="modal-close" onClick={()=>setModal(null)}><X/></button>
      {modal.kind==="vehicle"&&<><img className="modal-image" src={modal.item.image} alt={modal.item.model}/><span className="eyebrow dark">{modal.item.year} • {modal.item.brand}</span><h2>{modal.item.model}</h2><p>{modal.item.trim} · {modal.item.transmission} · {modal.item.fuel}</p><div className="modal-price">{money(modal.item.price)}</div><p className="modal-note">This is a sample listing. Submit an enquiry to express interest in this vehicle.</p><button className="gold-btn full" onClick={()=>setModal({kind:"enquiry",item:modal.item})}>Enquire about this vehicle <ArrowRight size={16}/></button></>}
      {modal.kind==="part"&&<><img className="modal-image" src={modal.item.image} alt={modal.item.name}/><span className="eyebrow dark">{modal.item.category}</span><h2>{modal.item.name}</h2><div className="modal-price">{money(modal.item.price)}</div><p className="modal-note">Sample catalogue item. Confirm compatibility with your vehicle before purchase.</p><button className="gold-btn full" onClick={()=>setModal({kind:"enquiry",item:modal.item})}>Enquire about this part <ArrowRight size={16}/></button></>}
      {["contact","repair","inspection","testdrive","rental","enquiry","account"].includes(modal.kind)&&<><span className="eyebrow dark">{modal.kind==="repair"?"GEAR LOCK SERVICE NETWORK":modal.kind==="rental"?"FIND YOUR RENTAL":modal.kind==="testdrive"?"GET BEHIND THE WHEEL":"LET'S GET YOU MOVING"}</span><h2>{modal.kind==="repair"?"Request a repair service":modal.kind==="inspection"?"Book a vehicle inspection":modal.kind==="testdrive"?"Schedule a test drive":modal.kind==="rental"?"Rental enquiry":modal.kind==="account"?"Welcome to GEAR LOCK":modal.kind==="enquiry"?"Send an enquiry":"Talk to GEAR LOCK"}</h2><p>Share your details and our team can follow up. This demo form is ready to connect to your backend.</p><form className="modal-form" onSubmit={submit}><input required placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input required placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><input type="email" placeholder="Email address (optional)" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>{modal.kind==="repair"&&<select value={repairType} onChange={e=>setRepairType(e.target.value)}><option>General servicing</option><option>Engine diagnostics</option><option>Brake repair</option><option>Electrical repair</option><option>Bodywork & paint</option><option>Air conditioning</option></select>}<textarea placeholder={modal.kind==="repair"?"Tell us about your vehicle and the issue...":"How can we help you?"} rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/><button className="gold-btn full" type="submit">Submit request <ArrowRight size={16}/></button></form></>}
      {modal.kind==="tour"&&<><span className="eyebrow dark">WELCOME TO GEAR LOCK</span><h2>Everything automotive.<br/><em>All in one place.</em></h2><p>Browse cars, discover rental options, connect with repair services and explore spare parts — from one modern marketplace.</p><button className="gold-btn full" onClick={()=>{setModal(null);go("Buy Cars","inventory")}}>Explore the marketplace <ArrowRight size={16}/></button></>}
    </div></div>}
    {toast&&<div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
    <button className="floating-help" onClick={()=>openModal("contact")}><Headphones size={18}/><span>Need help?</span></button>
  </div>
}
export default App;
