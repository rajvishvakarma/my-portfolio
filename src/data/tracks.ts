export interface TrackItem {
  title: string;
  artist: string;
  album: string;
  src: string;
  img?: string;
  color: string;
  glyph: string;
}

export const tracks: TrackItem[] = [
  {
    title: 'Wanna Be Yours',
    artist: 'Arctic Monkeys',
    album: 'AM',
    src: 'https://pagallworlds.com/wp-content/uploads/2023/06/I-Wanna-Be-Yours-Slowed-Reverb.mp3',
    img: 'https://cdn-images.dzcdn.net/images/cover/64e54e307bd5e2bdb27ffeb662fd910d/1900x1900-000000-80-0-0.jpg',
    color: 'from-[#111] via-[#222] to-[#333]',
    glyph: 'AM',
  },
  {
    title: "we can't be friends (wait for your love)",
    artist: 'Ariana Grande',
    album: 'eternal sunshine',
    src: "/audio/Ariana Grande - we can't be friends (wait for your love).mp3",
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/2e/88/88/2e8888ad-a0cf-eece-70a7-1ff81377a3ab/24UMGIM00198.rgb.jpg/500x500bb.jpg',
    color: 'from-[#d97706] via-[#b45309] to-[#78350f]',
    glyph: 'AG',
  },
  {
    title: 'BLUE',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    src: '/audio/Billie Eilish - BLUE.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/500x500bb.jpg',
    color: 'from-[#1e3a8a] via-[#1d4ed8] to-[#0284c7]',
    glyph: 'BE',
  },
  {
    title: 'How Long',
    artist: 'Charlie Puth',
    album: 'Voicenotes',
    src: '/audio/Charlie Puth - How Long.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a8/e2/1b/a8e21b3b-9c8d-2974-2318-6bcd4c9d2370/075679884336.jpg/500x500bb.jpg',
    color: 'from-[#4c1d95] via-[#5b21b6] to-[#7c3aed]',
    glyph: 'CP',
  },
  {
    title: 'Chemtrails Over The Country Club',
    artist: 'Lana Del Rey',
    album: 'Chemtrails Over The Country Club',
    src: '/audio/Chemtrails Over The Country Club.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/99/20/18/992018eb-25c1-5b88-733a-b2444eb20810/24UMGIM34897.rgb.jpg/500x500bb.jpg',
    color: 'from-[#475569] via-[#334155] to-[#1e293b]',
    glyph: 'LR',
  },
  {
    title: 'Love Again',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    src: '/audio/Dua Lipa - Love Again.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/9e/26/86/9e268670-6f4c-c2f3-794a-7a3775c81749/190296421112.jpg/500x500bb.jpg',
    color: 'from-[#be123c] via-[#e11d48] to-[#fb7185]',
    glyph: 'DL',
  },
  {
    title: 'Haareya',
    artist: 'Arijit Singh',
    album: 'Meri Pyaari Bindu',
    src: '/audio/Haareya Meri Pyaari Bindu 128 Kbps.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ad/e9/99/ade999c7-ba3e-433a-baf2-9c4cf60ee9d8/849486085824_cover.jpg/500x500bb.jpg',
    color: 'from-[#c2410c] via-[#ea580c] to-[#f97316]',
    glyph: 'AS',
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    album: 'Purpose',
    src: '/audio/Justin Bieber - Love Yourself.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/81/a4/dc/81a4dc50-8d7e-6ae5-71d3-f83393348248/15UMGIM59807.rgb.jpg/500x500bb.jpg',
    color: 'from-[#0f766e] via-[#0d9488] to-[#14b8a6]',
    glyph: 'JB',
  },
  {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    src: '/audio/Michael Jackson - Billie Jean.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/500x500bb.jpg',
    color: 'from-[#831843] via-[#9d174d] to-[#be185d]',
    glyph: 'MJ',
  },
  {
    title: 'Is There Someone Else',
    artist: 'The Weeknd',
    album: 'Dawn FM',
    src: '/audio/The Weeknd - Is There Someone Else.mp3',
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/92/14/e3/9214e352-3322-3708-4903-cf5059c4985f/21UM1IM58861.rgb.jpg/500x500bb.jpg',
    color: 'from-[#312e81] via-[#3730a3] to-[#4338ca]',
    glyph: 'TW',
  },
  {
    title: 'Night Drive',
    artist: 'Raj’s Studio',
    album: 'Focus Sessions',
    src: '/audio/night-drive.ogg',
    color: 'from-[#be4b72] via-[#643a97] to-[#1c2855]',
    glyph: 'ND',
  },
  {
    title: 'Blue Hour',
    artist: 'Raj’s Studio',
    album: 'Focus Sessions',
    src: '/audio/blue-hour.ogg',
    color: 'from-[#1e96bd] via-[#27558e] to-[#172546]',
    glyph: 'BH',
  },
  {
    title: 'Open Sky',
    artist: 'Raj’s Studio',
    album: 'Focus Sessions',
    src: '/audio/open-sky.ogg',
    color: 'from-[#f09354] via-[#bc5681] to-[#5e4187]',
    glyph: 'OS',
  },
];
