import React, { useEffect, useRef, useState } from "react";
const photos = [
  { src: "/photos/1.jpeg", caption: "Your smile is my favourite view ✨" },
  { src: "/photos/2.jpeg", caption: "A memory I wish I could relive 💗" },
  { src: "/photos/3.jpeg", caption: "The prettiest part of my every day 🌷" },
  { src: "/photos/4.jpeg", caption: "Every little moment with you matters ❤️" },
  { src: "/photos/5.jpeg", caption: "If I had to choose again, I'd still choose you" },
    { src: "/photos/6.jpeg", caption: "If I had to choose again, I'd still choose you" },

];

function Fireworks({ active }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth * devicePixelRatio;
    let height = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const particles = [];
    let frame;
    let lastBurst = 0;
    const burst = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.58 + 35;
      const hue = [320, 285, 42, 345][Math.floor(Math.random() * 4)];
      for (let i = 0; i < 65; i++) {
        const angle = (Math.PI * 2 * i) / 65;
        const speed = Math.random() * 3.2 + 1.2;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, hue });
      }
    };
    const animate = (time) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (time - lastBurst > 850) { burst(); lastBurst = time; }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.025; p.life -= 0.012;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${p.life})`; ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    const resize = () => {
      width = canvas.width = window.innerWidth * devicePixelRatio;
      height = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [active]);
  return <canvas ref={canvasRef} className="fireworks" aria-hidden="true" />;
}

function Cake({ candlesOut, onBlow }) {
  return (
    <div className={`cake-scene ${candlesOut ? "blown" : ""}`}>
      <div className="cake-glow" />
      <div className="cake">
        <div className="candles">
          {[0, 1, 2].map((n) => <div className="candle" key={n}><span className="flame" /></div>)}
        </div>
        <div className="cake-top"><span className="icing-drip" /></div>
        <div className="cake-middle"><span className="icing-line" /></div>
        <div className="cake-bottom"><span className="icing-line" /></div>
        <div className="cake-plate" />
      </div>
      <p className="cake-hint">{candlesOut ? "Your wish is in the universe ✨" : "Make a wish, Gullu!"}</p>
      <button className="button button-pink" onClick={onBlow}>{candlesOut ? "Light the candles again" : "Blow the candles ✨"}</button>
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (musicOn) { audio.pause(); setMusicOn(false); }
      else { await audio.play(); setMusicOn(true); }
    } catch { alert("Add your MP3 file at public/music/birthday.mp3, then try again."); }
  };

  const celebrate = () => {
    setCandlesOut(true);
    document.getElementById("cake")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <audio ref={audioRef} src="/music/birthday.mp3" loop />
      <Fireworks active={candlesOut} />
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <nav className="nav">
        <a className="brand" href="#home">for <span>Gullu</span> ♡</a>
        <div className="nav-actions">
          <a href="#memories">Memories</a><a href="#cake">Make a wish</a>
          <button className="music-button" onClick={toggleMusic}>{musicOn ? "♫ Music on" : "♫ Play music"}</button>
        </div>
      </nav>

      {!opened && <section className="intro-screen">
        <div className="intro-orbit">♡</div>
        <p className="eyebrow">A LITTLE SURPRISE, MADE WITH LOVE</p>
        <h1>Someone special<br />has a birthday<span>.</span></h1>
        <p className="intro-copy">And this little corner of the universe is just for her.</p>
        <button className="button button-pink" onClick={() => setOpened(true)}>Open your surprise <span>↗</span></button>
        <div className="intro-bottom">FOR GULLU · 15 NOVEMBER 2026</div>
      </section>}

      {opened && <>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="sparkle">✦</span> TODAY IS ALL ABOUT YOU</p>
            <h1>Happy Birthday,<br /><em>Gullu</em><span className="heart"> ♥</span></h1>
            <p className="hero-text">Tumhari ek smile mera poora din achha bana deti hai. Tum paas ho ya door, meri favourite feeling hamesha tum hi rahogi. Aaj ka din sirf tumhare naam, Gullu. ❤️</p>
            <div className="hero-actions"><button className="button button-pink" onClick={celebrate}>Make a birthday wish</button><a className="text-link" href="#letter">A little letter ↓</a></div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <figure className="hero-photo-card">
              <div className="hero-photo-frame">
                <img src="/photos/1.jpeg" alt="Gullu" />
              </div>
              <figcaption>A little piece of my heart ♡</figcaption>
            </figure>
            <span className="floating-star star-a">✦</span><span className="floating-star star-b">✧</span><span className="floating-star star-c">✦</span>
          </div>
          <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
        </section>

        <section className="section memories" id="memories">
          <div className="section-heading"><p className="eyebrow">A FEW LITTLE MOMENTS</p><h2>Our kind of <em>magic.</em></h2><p>Some memories deserve their own little gallery.</p></div>
          <div className="photo-grid">
            {photos.map((photo, i) => <figure className={`photo-card photo-${i + 1}`} key={photo.src}>
              <img src={photo.src} alt={`Memory ${i + 1}`} onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "grid"; }} />
              <div className="photo-placeholder"><span>♡</span><small>Add your photo</small></div>
              <figcaption>{photo.caption}</figcaption>
            </figure>)}
          </div>
          <p className="gallery-note">Replace the sample photo files in <code>public/photos</code> with your own pictures.</p>
        </section>

        <section className="section cake-section" id="cake">
          <div className="section-heading"><p className="eyebrow">CLOSE YOUR EYES & MAKE A WISH</p><h2>A cake made <em>for you.</em></h2><p>Ek wish maango, Gullu. The universe is listening. ✨</p></div>
          <Cake candlesOut={candlesOut} onBlow={() => setCandlesOut(!candlesOut)} />
          {candlesOut && <p className="celebration-line">May every little dream of yours find its way home. 💗</p>}
        </section>

        <section className="section letter-section" id="letter">
          <div className="letter-card">
            <div className="letter-icon">♡</div><p className="eyebrow">WORDS FROM MY HEART</p>
            <h2>To my <em>Gullu.</em></h2>
            <p className="letter-teaser">Kuch baatein hain jo shayad roz nahi keh pata...</p>
            {!letterOpen ? <button className="button button-outline" onClick={() => setLetterOpen(true)}>Read your letter ♡</button> :
              <div className="letter-content">
                <p>Hey meri Gullu, ❤️</p>
                <p>Happy Birthday, meri jaan! Kabhi kabhi sochta hoon ki tum meri life mein aayi, toh kitni saari ordinary si cheezein bhi special ban gayi. Tumhari smile, tumhari baatein, tumhara cute sa gussa… sab kuch mere dil ke bahut kareeb hai.</p>
                <p>Main wish karta hoon ki tumhari life ka har naya din tumhare liye dher saari khushiyan, peace aur success lekar aaye. Jo dreams tum apni aankhon mein sajati ho, woh ek-ek karke sach hon. Jab bhi tum thak jao, yaad rakhna ki tum bahut precious ho aur tumhari happiness matter karti hai.</p>
                <p>Thank you meri life mein itni pyaari memories add karne ke liye. Main har moment perfect hone ka promise nahi kar sakta, par itna zaroor chahta hoon ki tumhare saath har moment ko beautiful banane ki koshish karta rahoon.</p>
                <p>Aaj bas dil se itna kehna hai: keep smiling, keep shining, and never stop being the wonderful person you are. I am so lucky to have you. I love you, Gullu. ❤️</p>
                <p className="signature">With all my love,<br />Your favourite person ♡</p>
              </div>}
          </div>
        </section>

        <section className="final-section">
          <div className="final-spark">✦</div><p className="eyebrow">ONE LAST THING</p>
          <h2>Keep smiling,<br /><em>beautiful.</em></h2>
          <p>Chahe kitne bhi birthdays aayein, meri favourite wish hamesha tumhari smile hi rahegi. Happy Birthday, Gullu. ❤️</p>
          <button className="button button-pink" onClick={() => { setCandlesOut(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Celebrate again ✨</button>
          <div className="footer-heart">Made with love ♡</div>
        </section>
      </>}
    </main>
  );
}