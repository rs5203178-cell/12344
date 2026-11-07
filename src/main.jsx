import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, AudioLines, Cake, Flower2, Heart, Headphones, Music2, Pause, Play, Sparkles, Star, Volume2, X, Mail, Moon, Sun, RotateCcw } from 'lucide-react';
import './style.css';

const ease = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 38 }, show: { opacity: 1, y: 0, transition: { duration: .85, ease } } };
const photos = {
  bouquet: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1100&q=88',
  flowers: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=900&q=88',
  garden: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=88',
  pink: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=88',
  sky: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=88',
  paper: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=88',
};
const wishes = [
  'May something unexpectedly lovely find you today.',
  'May your heart feel lighter than it did yesterday.',
  'May you laugh so much that you forget to check the time.',
  'May every kind thing you give find its way back to you.',
  'May your dreams feel closer with every little step.',
  'May life surprise you in the softest, sweetest ways.'
];
const letters = [
  { title: 'When the day feels heavy', tag: 'A SOFT LITTLE HUG', icon: '♡', body: 'Hey Jaadu, take a breath. You do not have to figure everything out today. You are allowed to pause, rest, and begin again tomorrow. I hope something small makes you smile today. And if nothing does, remember this little corner is cheering for you.' },
  { title: 'When sleep is far away', tag: 'A QUIET NIGHT NOTE', icon: '☾', body: 'Look at the sky for a moment. Somewhere under these same stars, someone is wishing you the sweetest dreams. Let today go gently. You have done enough, you are enough, and tomorrow can wait until morning.' },
  { title: 'When you need a smile', tag: 'A POCKETFUL OF SUNSHINE', icon: '✿', body: 'This is your reminder that your smile deserves to show up in every room, even the little rooms inside your own head. Drink some water, play your favourite song, and remember: you make ordinary moments feel special.' }
];

function FloatingPetals() {
  return <div className="petal-layer" aria-hidden="true">{Array.from({ length: 13 }, (_, i) => <motion.i key={i} style={{ left: `${(i * 41 + 5) % 100}%` }} animate={{ y: ['110vh', '-15vh'], x: [0, i % 2 ? 28 : -24, 0], rotate: [0, 170, 330], opacity: [0, .45, .5, 0] }} transition={{ duration: 13 + (i % 5) * 2, delay: i * .65, repeat: Infinity, ease: 'linear' }} />)}</div>;
}
function PhotoCard({ src, alt, className = '', label }) {
  return <figure className={`photo-card ${className}`}><img src={src} alt={alt} loading="lazy"/><span className="photo-grain"/><figcaption>{label}</figcaption></figure>;
}

function App() {
  const [opened, setOpened] = useState(false);
  const [shayariPlaying, setShayariPlaying] = useState(false);
  const [songOpen, setSongOpen] = useState(false);
  const [finale, setFinale] = useState(false);
  const [postscriptOpen, setPostscriptOpen] = useState(false);
  const [cakeBlown, setCakeBlown] = useState(false);
  const [cakeCelebration, setCakeCelebration] = useState(false);
  const [openLetter, setOpenLetter] = useState(-1);
  const [wishIndex, setWishIndex] = useState(-1);
  const [letterModal, setLetterModal] = useState(false);
  const audioRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ended = () => setShayariPlaying(false);
    audio.addEventListener('ended', ended);
    return () => audio.removeEventListener('ended', ended);
  }, []);

  const toggleShayari = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (shayariPlaying) { audio.pause(); setShayariPlaying(false); }
    else { try { await audio.play(); setShayariPlaying(true); } catch { setShayariPlaying(false); } }
  };
  const daysLeft = Math.max(0, Math.ceil((new Date('2026-11-14T00:00:00') - new Date()) / 86400000));

  return <>
    <motion.div className="scroll-progress" style={{ width: progress }} />
    <FloatingPetals />
    <audio ref={audioRef} src="/audio/jaadu-shayari.mp3" preload="metadata" />

    <AnimatePresence>
      {!opened && <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025, transition: { duration: .9 } }}>
        <div className="intro-wash"/><div className="intro-frame"/>
        <motion.div className="intro-seal" animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 7, repeat: Infinity }}>୨୧</motion.div>
        <motion.div className="intro-content" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .25, duration: 1 }}>
          <span className="eyebrow"><Sparkles size={12}/> A LITTLE WORLD MADE FOR YOU <Sparkles size={12}/></span>
          <p className="script intro-for">a tiny surprise for</p>
          <h1>Jaadu<span>♡</span></h1>
          <p className="intro-copy">A little paper, a little poetry,<br/>and a whole lot of warmth.</p>
          <motion.button className="open-button" onClick={() => setOpened(true)} whileHover={{ y: -3 }} whileTap={{ scale: .97 }}>Step inside <ArrowUpRight size={15}/></motion.button>
          <span className="intro-foot">14 NOVEMBER · YOUR DAY, YOUR WORLD</span>
        </motion.div>
        <span className="intro-side intro-side-left">A NOTE FROM AFAR</span><span className="intro-side intro-side-right">VOL. 01 — FOR JAADU</span>
        <PhotoCard src={photos.bouquet} alt="Soft pastel flowers" className="intro-photo intro-photo-left" label="little things, big feelings"/>
        <PhotoCard src={photos.pink} alt="Flowers in soft light" className="intro-photo intro-photo-right" label="a day made softer"/>
      </motion.div>}
    </AnimatePresence>

    <main className="site-shell">
      <nav className="top-nav">
        <a className="brand" href="#top">little things <span>♡</span></a>
        <div className="nav-links"><a href="#note">the note</a><a href="#letters">little letters</a><a href="#voice">your shayari</a><a href="#song">our song</a><a href="#cake">make a wish</a></div>
        <span className="nav-date">14 / 11 <i>✳</i> 2026</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-topline"><span>THE BIRTHDAY EDITION</span><span>ISSUE Nº 014 <i>✳</i> NOVEMBER 2026</span></div>
        <div className="hero-grid">
          <motion.div className="hero-copy" initial="hidden" animate={opened ? 'show' : 'hidden'} variants={fadeUp}>
            <p className="eyebrow">✳ A DAY THAT DESERVES ITS OWN LITTLE UNIVERSE</p>
            <p className="script hero-pretitle">to my favourite little</p>
            <h2>Jaadu<span className="pink-dot">.</span></h2>
            <p className="hero-description">Some people make the world feel warmer<br/>without even being in the same room.</p>
            <a href="#note" className="round-down" aria-label="Scroll to the note"><ArrowDown size={17}/><span>SCROLL TO EXPLORE</span></a>
          </motion.div>
          <div className="hero-collage">
            <PhotoCard src={photos.bouquet} alt="Pastel bouquet in soft daylight" className="collage-main" label="a little softness for your day"/>
            <PhotoCard src={photos.garden} alt="Green botanical leaves" className="collage-small" label="collected with care"/>
            <div className="collage-note"><span className="script">a little magic</span><b>made<br/>just for you</b><i>♡</i></div>
            <div className="collage-stamp">14<br/><small>NOV</small></div>
            <span className="collage-scribble">୨୧</span>
          </div>
        </div>
        <div className="hero-bottom"><span>SCROLL A LITTLE, SMILE A LOT</span><span>✳</span><span>MADE ESPECIALLY FOR JAADU</span></div>
      </section>

      <section className="note-section section-pad" id="note">
        <div className="section-kicker"><span>01 / A LITTLE NOTE</span><span>✳</span><span>READ SLOWLY</span></div>
        <div className="note-layout">
          <motion.div className="note-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="script">if words could hug,</p><h3>this would<br/><em>be one.</em></h3><span className="tiny-underline"/><p className="small-note">A few words, wrapped up<br/>like a tiny present.</p>
            <PhotoCard src={photos.flowers} alt="Delicate flowers" className="note-mini-photo" label="pressed flowers, kept forever"/>
          </motion.div>
          <motion.article className="letter-card" initial={{ opacity: 0, rotate: 1.7, y: 35 }} whileInView={{ opacity: 1, rotate: 0, y: 0 }} viewport={{ once: true }} transition={{ duration: .95 }}>
            <span className="letter-tape"/><span className="letter-stamp">✿</span><p className="letter-date">14 · 11 · 2026 <span>✳</span></p>
            <p className="script letter-dear">Dear Jaadu,</p>
            <p className="letter-body">Dhyan se suno aur yeh baat hamesha yaad rakhna tum sirf apne careere or padhai pe dhyan dena jyda stress mat liya karo logo ka.</p>
            <p className="letter-body">Tum bohot aacha kar rahe ho apni life me aur tum dekhna ek din bohot bade Doctor banonge mujhe tumpe pura yakeen hai aur haa hamesha khush rehna kyunki tumhari smile hi sabse badkar hai aur kuch nhi.</p>
            <p className="letter-body">Khuda tumhe hamesha pyaar karte rahe ese hi khush rakhe aur tumhe ek kamyab insaan banaye 😇.</p>
            <p className="script letter-sign">A little surprise, made just for you <Heart size={14} fill="currentColor"/></p><span className="letter-flower">✿</span>
          </motion.article>
        </div>
      </section>

      <section className="distance-section">
        <div className="distance-sky" style={{ backgroundImage: `linear-gradient(90deg,rgba(42,35,49,.64),rgba(42,35,49,.22)),url(${photos.sky})` }}>
          <div className="distance-grain"/><motion.div className="moon" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }}/>
          <span className="constellation c-one">✦　·　✧</span><span className="constellation c-two">·　✦　·</span><span className="constellation c-three">✧　·</span>
          <motion.div className="distance-copy" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="eyebrow light">02 / EVEN FROM FAR AWAY</p><p className="script">different skies,</p><h3>same little<br/><em>universe.</em></h3>
            <p className="distance-text">We may be miles apart, but a kind thought<br/>doesn't need a map to find its way.</p>
            <div className="distance-line"><span>YOU</span><i>✧ ───────────── ✧</i><span>JAADU</span></div>
          </motion.div>
          <div className="distance-caption">SOMEWHERE UNDER THE SAME SKY · ALWAYS</div>
        </div>
      </section>

      <section className="little-letters-section section-pad" id="letters">
        <div className="section-kicker"><span>03 / FOR DIFFERENT LITTLE DAYS</span><span>✳</span><span>OPEN ONE</span></div>
        <div className="letters-heading-row"><div className="letters-intro"><p className="script">a few tiny reminders,</p><h3>for whenever<br/><em>you need them.</em></h3></div><p className="letters-deck">Not every day feels the same. So I left you a few little notes to open whenever you need a smile.</p></div>
        <div className="open-when-grid">{letters.map((letter, i) => <motion.button key={letter.title} className={`when-card when-card-${i} ${openLetter === i ? 'when-open' : ''}`} onClick={() => setOpenLetter(openLetter === i ? -1 : i)} whileHover={{ y: -8, rotate: i === 1 ? 1 : -1 }} whileTap={{ scale: .985 }}><span className="when-card-top">{letter.tag}</span><span className="when-card-icon">{letter.icon}</span><strong>{letter.title}</strong><span className="when-card-hint">{openLetter === i ? 'TAP TO FOLD ↑' : 'TAP TO OPEN ↗'}</span><AnimatePresence>{openLetter === i && <motion.span className="when-letter-body" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .35 }}>{letter.body}</motion.span>}</AnimatePresence></motion.button>)}</div>
        <div className="wish-jar-wrap"><div className="wish-jar-art"><span>♡</span><i>✧</i><b>little<br/>wishes</b><small>take one</small></div><div className="wish-jar-copy"><p className="script">pick a tiny wish from the jar</p><h4>A wish, just<br/>for today.</h4><p>{wishIndex < 0 ? 'Whenever you need a little reminder, take one from here.' : wishes[wishIndex]}</p><button className="wish-button" onClick={() => setWishIndex((wishIndex + 1) % wishes.length)}><Sparkles size={15}/> {wishIndex < 0 ? 'Pick a little wish' : 'Pick another wish'}</button></div></div>
      </section>

      <section className="voice-section section-pad" id="voice">
        <div className="section-kicker"><span>04 / SOMETHING IN MY VOICE</span><span>✳</span><span>PRESS PLAY</span></div>
        <div className="voice-layout"><div className="voice-copy"><p className="script">not just words this time…</p><h3>A little<br/><em>shayari</em><br/>for you.</h3><p>I wanted you to hear this one in my own voice. So here's a small piece of my heart, saved just for your day.</p><span className="voice-caption">RECORDED WITH LOVE · YOUR VERY OWN VOICE NOTE</span></div>
          <motion.div className="cassette-wrap" initial={{ opacity: 0, scale: .94, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: .85 }}><div className="cassette-label"><span>VOICE NOTE NO. 01</span><span>♡ JAADU ♡</span></div><div className={`cassette ${shayariPlaying ? 'is-playing' : ''}`}><div className="cassette-top"><span>MY LITTLE RECORDING</span><span>TYPE I · CHROME</span></div><div className="cassette-window"><div className="reel reel-left"><i/></div><div className="tape-line"/><div className="reel reel-right"><i/></div></div><div className="cassette-bottom"><span>PLAY SIDE A</span><span>MADE FOR YOU</span></div></div><div className="audio-controls"><button className="play-round" onClick={toggleShayari} aria-label={shayariPlaying ? 'Pause shayari' : 'Play shayari'}>{shayariPlaying ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</button><div className="audio-meta"><b>{shayariPlaying ? 'Playing your shayari…' : 'Your personal voice note'}</b><span><AudioLines size={14}/> A voice note, not a thousand texts.</span></div><span className="audio-heart">♡</span></div><div className="sound-wave" aria-hidden="true">{Array.from({length:39},(_,i)=><i key={i} style={{'--h':`${10+((i*17)%29)}px`,'--d':`${(i%7)*.08}s`}}/>)}</div><span className="cassette-sticker">P.S. listen<br/>with your heart ♡</span></motion.div>
        </div>
      </section>

      <section className="song-section section-pad" id="song"><div className="section-kicker"><span>05 / A SONG THAT REMINDS ME</span><span>✳</span><span>LISTEN TOGETHER</span></div><div className="song-card"><div className="song-art"><div className="song-art-photo"/><div className="song-art-overlay"/><span className="song-art-small">A SONG FOR YOU</span><span className="song-art-title">hawayein</span><span className="song-art-sub">ARJIT SINGH · PRITAM</span><span className="song-art-flower">✿</span></div><div className="song-info"><p className="script">because some songs feel like a feeling</p><h3>Hawayein<span> ♡</span></h3><p className="song-by">Arijit Singh · Jab Harry Met Sejal</p><p className="song-description">A little melody for the miles between us. Press play, take a breath, and let the moment be yours.</p><button className="song-button" onClick={() => setSongOpen(!songOpen)}>{songOpen ? <><X size={16}/> Close player</> : <><Play size={15} fill="currentColor"/> Play Hawayein</>} <ArrowUpRight size={15}/></button><a className="official-link" href="https://www.youtube.com/watch?v=cYOB941gyXI" target="_blank" rel="noreferrer">Open official video on YouTube <ArrowUpRight size={12}/></a></div></div><AnimatePresence>{songOpen && <motion.div className="youtube-player" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}><iframe src="https://www.youtube-nocookie.com/embed/cYOB941gyXI?autoplay=1&rel=0" title="Hawayein - Sony Music India" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></motion.div>}</AnimatePresence></section>

      <section className="cake-section" id="cake"><div className="cake-section-deco deco-left">✿</div><div className="cake-section-deco deco-right">୨୧</div><div className="section-kicker cake-kicker"><span>06 / MAKE A LITTLE WISH</span><span>✳</span><span>YOUR MOMENT</span></div><motion.div className="cake-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}><p className="script">close your eyes, make a wish…</p><h3>A cake made<br/><em>just for you.</em></h3><p>Tap the button when you're ready to blow out your candles. Make the biggest wish, Jaadu. ♡</p></motion.div>
        <motion.div className={`cake-stage ${cakeBlown ? 'cake-blown' : ''}`} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.9}}><div className="cake-halo"/><div className="cake-spark cake-spark-a">✧</div><div className="cake-spark cake-spark-b">✦</div><div className="cake-spark cake-spark-c">♡</div><div className="cake-3d" role="img" aria-label="A three-tier pink birthday cake with candles"><div className="cake-candles">{[0,1,2,3,4].map(n=><div className={`candle candle-${n}`} key={n}><span className="flame"/><i/></div>)}</div><div className="cake-tier tier-top"><span className="icing-drip drip-a"/><span className="icing-drip drip-b"/><span className="icing-drip drip-c"/><span className="tier-flower">✿</span></div><div className="cake-tier tier-middle"><span className="icing-drip drip-a"/><span className="icing-drip drip-b"/><span className="icing-drip drip-c"/><span className="cake-ribbon"/><span className="cake-bow">୨୧</span></div><div className="cake-tier tier-bottom"><span className="icing-drip drip-a"/><span className="icing-drip drip-b"/><span className="icing-drip drip-c"/><span className="cake-pearls">· · · · · · · · · · · ·</span></div><div className="cake-plate"/></div><div className="cake-shadow"/></motion.div>
        <div className="cake-action"><p className="cake-whisper">{cakeBlown ? 'your wish is on its way to the universe ♡' : 'one, two, three… ready, Jaadu?'}</p><button className="blow-button" onClick={() => {setCakeBlown(true);setCakeCelebration(true);}} disabled={cakeBlown}><span>{cakeBlown ? 'Wish sent to the universe' : 'Blow out the candles'}</span><span className="button-heart">♡</span></button>{cakeBlown && <button className="cake-reset" onClick={() => {setCakeBlown(false);setCakeCelebration(false);}}>Light the candles again ↗</button>}</div>
      </section>

      <section className="birthday-section"><div className="birthday-inner"><div className="birthday-sparkle sparkle-a">✧</div><div className="birthday-sparkle sparkle-b">✳</div><div className="birthday-sparkle sparkle-c">♡</div><p className="eyebrow">07 / THE DAY IS ALL YOURS</p><p className="script birthday-script">and now, the most important part…</p><h3>Happy Birthday,<br/><em>Jaadu!</em></h3><p className="birthday-message">May life be gentle with you, may your dreams find you,<br/>and may you always have a reason to smile.</p><div className="countdown-pill"><Cake size={16}/><span>{daysLeft === 0 ? "IT'S YOUR DAY!" : `${daysLeft} DAYS TO YOUR DAY`}</span><Heart size={14} fill="currentColor"/></div><button className="final-button" onClick={() => setFinale(true)}>One last little surprise <Sparkles size={15}/></button><span className="birthday-foot">14 NOVEMBER 2026 · MADE WITH ♡</span></div></section>
      <section className="postscript-section" aria-label="A little postscript">
        <div className="postscript-paper">
          <span className="postscript-stamp">୨୧</span>
          <p className="script">psst… one tiny thing</p>
          <h3>There is a little<br/><em>more for you.</em></h3>
          <p className="postscript-intro">I tucked one last note away. Open it whenever you're ready.</p>
          <motion.button className={`postscript-seal ${postscriptOpen ? 'is-open' : ''}`} onClick={() => setPostscriptOpen(v => !v)} whileTap={{ scale: .96 }} aria-expanded={postscriptOpen}>
            <span>{postscriptOpen ? '♡' : '୨୧'}</span><small>{postscriptOpen ? 'FOLD THE NOTE' : 'BREAK THE SEAL'}</small>
          </motion.button>
          <AnimatePresence>{postscriptOpen && <motion.div className="postscript-reveal" initial={{ opacity: 0, y: 16, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: 10, height: 0 }} transition={{ duration: .55, ease }}>
            <p className="script">until the day we meet…</p>
            <p>Kabhi kuch esa lage ke tum kio mushqil main ho toh hamesha yaad rakhna hai tumhare pass ek esa shaqs hai jo tumhare liye har waqt khada honga  ♡</p>
            <span>— A LITTLE NOTE FROM AFAR</span>
          </motion.div>}</AnimatePresence>
        </div>
        <span className="postscript-flower flower-left">✿</span><span className="postscript-flower flower-right">✧</span>
      </section>

      <footer className="footer"><span>FOR JAADU, WITH A LITTLE MAGIC ♡</span><span>THE END? JUST THE BEGINNING.</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>

    <AnimatePresence>{cakeCelebration && <motion.div className="cake-celebration" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCakeCelebration(false)}><button className="celebration-close" onClick={() => setCakeCelebration(false)} aria-label="Close celebration"><X size={18}/></button>{Array.from({length:72},(_,i)=><motion.span key={i} className={`celebration-piece piece-${i%5}`} style={{left:`${(i*37)%100}%`,top:`${-10-(i%8)*8}px`}} animate={{y:['0vh','110vh'],x:[0,(i%2?1:-1)*(20+(i%7)*12),(i%2?-1:1)*12],rotate:[0,220+(i%6)*90],opacity:[0,1,1,0]}} transition={{duration:3.8+(i%6)*.45,delay:(i%13)*.055,repeat:Infinity,ease:'linear'}}/>)}{Array.from({length:15},(_,i)=><motion.span key={`flower-${i}`} className="celebration-flower" style={{left:`${(i*61)%100}%`}} animate={{y:['-10vh','110vh'],rotate:[0,360],x:[0,i%2?38:-32,0],opacity:[0,.9,.9,0]}} transition={{duration:6+(i%4),delay:(i%7)*.2,repeat:Infinity,ease:'linear'}}>{['✿','❀','♡','✧'][i%4]}</motion.span>)}<motion.div className="celebration-note" initial={{scale:.75,y:25}} animate={{scale:1,y:0}} transition={{type:'spring',damping:15}}><span className="script">the candles are out…</span><div className="celebration-bow">୨୧</div><h2>Make a wish,<br/><em>Jaadu!</em></h2><p>May every little thing your heart wishes for<br/>find its way to you. Happy Birthday ♡</p><span className="celebration-sign">WITH LOVE, FROM A LITTLE FAR AWAY</span><button onClick={() => setCakeCelebration(false)}>Keep this wish safe <Heart size={14} fill="currentColor"/></button></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{finale && <motion.div className="final-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="close-final" onClick={() => setFinale(false)} aria-label="Close"><X/></button>{Array.from({length:34},(_,i)=><motion.span key={i} className="confetti" style={{left:`${(i*31)%100}%`,background:['#e8a4b5','#f5d7a6','#b9b4d8','#fff0e9'][i%4]}} initial={{y:-30,rotate:0,opacity:0}} animate={{y:'110vh',rotate:500+i*20,opacity:1}} transition={{duration:3.8+(i%5),delay:(i%8)*.1,repeat:Infinity,ease:'linear'}}/>)}<motion.div className="final-message" initial={{scale:.8,y:30}} animate={{scale:1,y:0}} transition={{type:'spring',damping:16}}><span className="script">one last thing…</span><h2>You are<br/><em>so loved.</em></h2><p>Never forget how special you are, Jaadu.<br/>Keep shining, always. ♡</p><div className="final-bow">୨୧</div><button onClick={() => setFinale(false)}>Keep this little moment <Heart size={14} fill="currentColor"/></button></motion.div></motion.div>}</AnimatePresence>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
