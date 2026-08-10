/**
 * REDRMY AIO - Personal Hub & Media Directory Logic
 * Mobile Responsive Directory with Category Scroll Controls & Day/Night Themes
 */

// Global App State
const state = {
    links: [],
    activeCategory: 'all',
    searchQuery: '',
    theme: 'night',
    viewMode: 'grid',
    soundMuted: true
};

// Category Definitions Metadata
const categories = {
    study: { name: 'Study', icon: 'fa-graduation-cap', colorClass: 'text-indigo' },
    movies: { name: 'Movies', icon: 'fa-film', colorClass: 'text-rose' },
    animes: { name: 'Animes', icon: 'fa-dragon', colorClass: 'text-purple' },
    manga: { name: 'Manga', icon: 'fa-book-open', colorClass: 'text-emerald' },
    livetv: { name: 'Live TV & Sports', icon: 'fa-tv', colorClass: 'text-sky' },
    comics: { name: 'Comic Books', icon: 'fa-mask-snake', colorClass: 'text-orange' }
};

// Initial Default Hand-Picked Curated Links
const defaultLinks = [
    // Study Section
    {
        id: '1',
        title: 'PW (Physics Wallah)',
        url: 'https://www.pw.live',
        category: 'study',
        desc: 'Online Education & Exam Preparation',
        clicks: 10,
        sublinks: [
            { title: 'Study Stark', url: 'https://studystark.in/' },
            { title: 'PW Thor', url: 'https://pwthor.live/' },
            { title: 'Delta Study Batches', url: 'https://deltastudy.site/study-v2/batches' },
            { title: 'VidCloud Batches', url: 'https://vidcloud.eu.org/#batches' },
            { title: 'Study Spark', url: 'https://studyspark.study/' },
            { title: 'StudyStrom PW', url: 'https://studystrom.studystrom-edu.workers.dev/main/pw' },
            { title: 'Study Parcham', url: 'https://studyparcham.in/pw/' },
            { title: 'Pi Study Spark', url: 'https://pi.studyspark.study/' }
        ]
    },
    { id: '2', title: 'Careerwill', url: 'https://www.careerwill.com', category: 'study', desc: 'Competitive Exams Preparation Platform', clicks: 8 },
    {
        id: '3',
        title: 'Testbook',
        url: 'https://testbook.com/',
        category: 'study',
        desc: 'Mock Tests & Exam Preparation Platform',
        clicks: 12,
        sublinks: [
            { title: 'Spidy Tests', url: 'https://spidytests.vercel.app/' }
        ]
    },
    {
        id: '4',
        title: 'Next Toppers',
        url: 'https://www.nexttoppers.com',
        category: 'study',
        desc: 'Learning & Test Prep Resources',
        clicks: 6,
        sublinks: [
            { title: 'Spidy Topper', url: 'https://spidytopper.vercel.app/' }
        ]
    },
    {
        id: '5',
        title: 'CDS Journey',
        url: 'https://www.cdsjourney.com/',
        category: 'study',
        desc: 'Defense Exams & CDS Prep Guide',
        clicks: 9,
        sublinks: [
            { title: 'Spidy Universe CDS', url: 'https://spidyuniversecds.vercel.app/' }
        ]
    },
    {
        id: '6',
        title: 'RWA (Rojgar with Ankit)',
        url: 'https://www.rojgarwithankit.com',
        category: 'study',
        desc: 'Government Job & Competitive Exams',
        clicks: 15,
        sublinks: [
            { title: 'Spidy RWA', url: 'https://spidyrwa.vercel.app/' }
        ]
    },
    { id: '7', title: 'Study IQ', url: 'https://www.studyiq.com', category: 'study', desc: 'UPSC & Civil Services Learning', clicks: 14 },
    {
        id: '8',
        title: 'Selection Way',
        url: 'https://www.selectionway.com/',
        category: 'study',
        desc: 'Exam Guidance & Practice Channel',
        clicks: 7,
        sublinks: [
            { title: 'Spidy Universe Way', url: 'https://spidyuniverseway.vercel.app/' }
        ]
    },
    {
        id: '9',
        title: 'Unacademy',
        url: 'https://unacademy.com',
        category: 'study',
        desc: 'India’s Largest Learning Platform',
        clicks: 20,
        sublinks: [
            { title: 'Spidy Unacademy', url: 'https://spidyunacademy.vercel.app/' }
        ]
    },
    { id: '10', title: 'Utkarsh Classes', url: 'https://utkarsh.com', category: 'study', desc: 'Online Learning & Test Series', clicks: 11 },
    {
        id: '11',
        title: 'KGS (Khan Global Studies)',
        url: 'https://khanglobalstudies.com/',
        category: 'study',
        desc: 'UPSC, State PCS & Competitive Exams Prep',
        clicks: 12,
        sublinks: [
            { title: 'Spidy KGS', url: 'https://spidy-kgs.vercel.app/' }
        ]
    },

    // Movies Section
    { id: 'm1', title: '1Shows', url: 'https://www.1shows.org/', category: 'movies', desc: 'Free Movies & TV Shows Streaming', noDropdown: true },
    { id: 'm2', title: '1Flex', url: 'https://www.1flex.org/', category: 'movies', desc: 'Free Movies & Series Streaming', noDropdown: true },
    { id: 'm3', title: '1Tube', url: 'https://www.1tube.org/', category: 'movies', desc: 'Watch Online Movies & Videos', noDropdown: true },
    { id: 'm4', title: 'ShuttleTV', url: 'https://shuttletv.su/', category: 'movies', desc: 'Movies, TV Shows & Series Portal', noDropdown: true },
    { id: 'm5', title: 'FlickyStream', url: 'https://flickystream.dad/', category: 'movies', desc: 'Watch Free Movies & TV Series', noDropdown: true },
    { id: 'm6', title: 'MeowTV', url: 'https://meowtv.ru/', category: 'movies', desc: 'Free Movies, TV Series & Cartoons', noDropdown: true },
    { id: 'm7', title: 'RiveStream', url: 'https://rivestream.ru/', category: 'movies', desc: 'Free Online Movie Streaming', noDropdown: true },
    { id: 'm8', title: 'Cinema', url: 'https://cinema.bz/', category: 'movies', desc: 'Popular Movies & Cinema Portal', noDropdown: true },
    { id: 'm9', title: 'FilmCave', url: 'https://filmcave.ru/', category: 'movies', desc: 'High Quality Movie Streaming', noDropdown: true },
    { id: 'm10', title: 'PopcornMovies', url: 'https://popcornmovies.io/', category: 'movies', desc: 'Stream New Movies & TV Shows', noDropdown: true },
    { id: 'm11', title: 'Cineby', url: 'https://www.cineby.at/', category: 'movies', desc: 'Free Movie Streaming Online', noDropdown: true },
    { id: 'm12', title: 'Nepu', url: 'https://nepu.to/', category: 'movies', desc: 'Popular HD Movie Directory', noDropdown: true },
    { id: 'm13', title: 'FlixGaze', url: 'https://www.flixgaze.com/', category: 'movies', desc: 'Watch Latest Movies Online', noDropdown: true },
    { id: 'm14', title: 'NetPlayz', url: 'https://netplayz.top/', category: 'movies', desc: 'Free HD Movies & Web Series', noDropdown: true },
    { id: 'm15', title: 'HollyMovieHD', url: 'https://hollymoviehd.cc/', category: 'movies', desc: 'Hollywood HD Movie Streams', noDropdown: true },
    { id: 'm16', title: 'CinemaCity', url: 'https://cinemacity.cc/', category: 'movies', desc: 'Latest Movies & Shows Streaming', noDropdown: true },
    { id: 'm17', title: 'InMovieBox', url: 'https://h5.inmoviebox.com/', category: 'movies', desc: 'Mobile-Optimized Movie Player', noDropdown: true },
    { id: 'm18', title: 'OnlyFlix', url: 'https://onlyflix.to/', category: 'movies', desc: 'Watch TV Shows & Movies Online', noDropdown: true },
    { id: 'm19', title: 'HDTodayz', url: 'https://hdtodayz.net/', category: 'movies', desc: 'Free Streaming in High Definition', noDropdown: true },
    { id: 'm20', title: 'Willow', url: 'https://willow.arlen.icu/', category: 'movies', desc: 'Alternative Media & Streaming Server', noDropdown: true },
    { id: 'm21', title: 'FMovies HD', url: 'https://fmovies-hd.to/home/', category: 'movies', desc: 'Watch FMovies Online Free in HD', noDropdown: true },
    { id: 'm22', title: 'WatchOTT', url: 'https://watchott.org/', category: 'movies', desc: 'OTT Platform & Movies Hub', noDropdown: true },
    { id: 'm23', title: 'FlixWay', url: 'https://flixway.ru/', category: 'movies', desc: 'Free Series & Film Portal', noDropdown: true },
    { id: 'm24', title: 'StreamingUnity', url: 'https://streamingunity.cc/', category: 'movies', desc: 'Unified Movie & Video Streaming', noDropdown: true },
    { id: 'm25', title: 'HDHub4U', url: 'https://hdhub4u.ec/', category: 'movies', desc: 'Free HD Movies & Web Series Download', noDropdown: true },
    { id: 'm26', title: 'VegaMovies', url: 'https://vegamoviess.fun/', category: 'movies', desc: 'Dual Audio & 4K Movies Download', noDropdown: true },

    // Animes Section
    { id: 'a1', title: 'ReAnime', url: 'https://reanime.to/home', category: 'animes', desc: 'Free HD Anime Streaming Portal', noDropdown: true },
    { id: 'a2', title: 'AnimePahe', url: 'https://animepahe.pw/', category: 'animes', desc: 'Stream Anime online in high quality', noDropdown: true },
    { id: 'a3', title: 'AniKotoTV', url: 'https://anikototv.to/', category: 'animes', desc: 'Watch Anime online free', noDropdown: true },
    { id: 'a4', title: 'Enma', url: 'https://www.enma.lol/', category: 'animes', desc: 'Latest Anime episodes streaming', noDropdown: true },
    { id: 'a5', title: 'Miruro', url: 'https://www.miruro.to/', category: 'animes', desc: 'Modern & Clean Anime stream site', noDropdown: true },
    { id: 'a6', title: 'AnimeNexus', url: 'https://anime.nexus/', category: 'animes', desc: 'Anime media hub & stream database', noDropdown: true },
    { id: 'a7', title: 'AniDB', url: 'https://anidb.app/home', category: 'animes', desc: 'Anime Database & community forum', noDropdown: true },
    { id: 'a8', title: 'Senshi', url: 'https://senshi.live/', category: 'animes', desc: 'Free Anime streaming online', noDropdown: true },
    { id: 'a9', title: 'AniKage', url: 'https://anikage.cc/home', category: 'animes', desc: 'Watch free anime episodes', noDropdown: true },
    { id: 'a10', title: 'AniDap', url: 'https://anidap.lol/', category: 'animes', desc: 'Anime streams & direct downloads', noDropdown: true },
    { id: 'a11', title: 'SenpaiFlix', url: 'https://senpaiflix.fun/', category: 'animes', desc: 'Premium Anime series directory', noDropdown: true },
    { id: 'a12', title: 'AnimeX', url: 'https://animex.one/home', category: 'animes', desc: 'Latest sub & dub anime', noDropdown: true },
    { id: 'a13', title: '1Anime', url: 'https://1anime.app/discover', category: 'animes', desc: 'Discover & watch anime episodes', noDropdown: true },
    { id: 'a14', title: 'AniStream', url: 'https://anistream.one/', category: 'animes', desc: 'Free online anime streaming', noDropdown: true },
    { id: 'a15', title: 'Kaa', url: 'https://kaa.lt/', category: 'animes', desc: 'Fast online anime streaming site', noDropdown: true },
    { id: 'a16', title: 'JustAnime', url: 'https://justanime.to/', category: 'animes', desc: 'Free Anime episodes online', noDropdown: true },
    { id: 'a17', title: 'AniWaves', url: 'https://aniwaves.ru/', category: 'animes', desc: 'Watch anime online free in Russian/Sub', noDropdown: true },
    { id: 'a18', title: 'AnimeHeaven', url: 'https://animeheaven.me/', category: 'animes', desc: 'Watch anime episodes and movies free', noDropdown: true },
    { id: 'a19', title: 'AniTaku', url: 'https://anitaku.io/', category: 'animes', desc: 'Free Anime streaming index', noDropdown: true },
    { id: 'a20', title: 'LunarAnime', url: 'https://lunaranime.ru/anime', category: 'animes', desc: 'Free Anime series tracker', noDropdown: true },

    // Manga Section
    { id: '21', title: 'MangaDex', url: 'https://mangadex.org', category: 'manga', desc: 'High quality online manga reader', clicks: 50, noDropdown: true },
    { id: '22', title: 'MANGA Plus', url: 'https://mangaplus.shueisha.co.jp', category: 'manga', desc: 'Official Shueisha manga release platform', clicks: 28, noDropdown: true },
    { id: '23', title: 'Webtoon', url: 'https://www.webtoons.com', category: 'manga', desc: 'Digital comics and webtoons', clicks: 16, noDropdown: true },
    { id: '24', title: 'ComicWalker', url: 'https://comic-walker.com', category: 'manga', desc: 'Free Japanese web manga', clicks: 3, noDropdown: true },
    { id: 'mg1', title: 'MangaBall', url: 'https://mangaball.net/', category: 'manga', desc: 'Read free manga online in high quality', noDropdown: true },
    { id: 'mg2', title: 'Atsu', url: 'https://atsu.moe/', category: 'manga', desc: 'Clean online manga reader', noDropdown: true },
    { id: 'mg3', title: 'OniSaga', url: 'https://onisaga.com/', category: 'manga', desc: 'Read latest manga & manhwa chapters', noDropdown: true },
    { id: 'mg4', title: 'Kagane', url: 'https://kagane.to/', category: 'manga', desc: 'Popular manga & webtoon reader', noDropdown: true },
    { id: 'mg5', title: 'AquaReader', url: 'https://aquareader.org/', category: 'manga', desc: 'Free high quality manga reader', noDropdown: true },
    { id: 'mg6', title: 'ComicK', url: 'https://comick.dev/', category: 'manga', desc: 'Comprehensive manga database & reader', noDropdown: true },
    { id: 'mg7', title: 'Comix', url: 'https://comix.to/', category: 'manga', desc: 'Read digital comics & manga online', noDropdown: true },
    { id: 'mg8', title: 'MangaDot', url: 'https://mangadot.net/', category: 'manga', desc: 'Online manga reading directory', noDropdown: true },
    { id: 'mg9', title: 'MangaBuddy', url: 'https://mangabuddy1.co.uk/', category: 'manga', desc: 'Read free manga & manhwa online', noDropdown: true },
    { id: 'mg10', title: 'QToon', url: 'https://qtoon.org/', category: 'manga', desc: 'Free Webtoon & Manhwa reader', noDropdown: true },
    { id: 'mg11', title: 'MangaGo', url: 'https://mangago.me/', category: 'manga', desc: 'Huge library of free manga', noDropdown: true },
    { id: 'mg12', title: 'MangaFire', url: 'https://mangafire.to/home', category: 'manga', desc: 'Free HD Manga reading platform', noDropdown: true },
    { id: 'mg13', title: 'AllManga', url: 'https://allmanga.to/manga?cty=ALL', category: 'manga', desc: 'Read all manga & manhwa online', noDropdown: true },
    { id: 'mg14', title: 'Mangakakalot', url: 'https://www.mangakakalot.gg/', category: 'manga', desc: 'Popular online manga reading portal', noDropdown: true },
    { id: 'mg15', title: 'Asura Scans', url: 'https://asurascans.com/', category: 'manga', desc: 'Popular Manhwa & Manga scanlations', noDropdown: true },
    { id: 'mg16', title: 'MangaHub', url: 'https://mangahub.io/', category: 'manga', desc: 'Read free manga online directory', noDropdown: true },
    { id: 'mg17', title: 'WeebCentral', url: 'https://weebcentral.com/', category: 'manga', desc: 'Weeb manga reading platform', noDropdown: true },
    { id: 'mg18', title: 'MangaKatana', url: 'https://mangakatana.com/', category: 'manga', desc: 'Fast online manga reader', noDropdown: true },
    { id: 'mg19', title: 'LikeManga', url: 'https://likemanga.ink/', category: 'manga', desc: 'Read latest manga & manhwa online', noDropdown: true },
    { id: 'mg20', title: 'MangaXO', url: 'https://mangaxo.com/home', category: 'manga', desc: 'Online manga reading catalog', noDropdown: true },
    { id: 'mg21', title: 'King of Shojo', url: 'https://kingofshojo.com/', category: 'manga', desc: 'Shojo & romance manga reader', noDropdown: true },

    // Live TV & Sports Section
    { id: '25', title: 'ESPN', url: 'https://www.espn.com', category: 'livetv', desc: 'Sports scores, news & live streams', clicks: 22, noDropdown: true },
    { id: '26', title: 'BBC Sport', url: 'https://www.bbc.com/sport', category: 'livetv', desc: 'Sports news, results & live commentary', clicks: 10, noDropdown: true },
    { id: '27', title: 'Pluto TV', url: 'https://pluto.tv', category: 'livetv', desc: 'Free live TV channels & movies', clicks: 13, noDropdown: true },
    { id: '28', title: 'Twitch', url: 'https://www.twitch.tv', category: 'livetv', desc: 'Live gaming & esports streaming', clicks: 38, noDropdown: true },
    { id: '29', title: 'Eurosport', url: 'https://www.eurosport.com', category: 'livetv', desc: 'European sports news & highlights', clicks: 5, noDropdown: true },
    { id: 'tv1', title: 'DLHD (DaddyLive)', url: 'https://dlhd.st/', category: 'livetv', desc: 'Live sports channels & TV streams', noDropdown: true },
    { id: 'tv2', title: 'OnDemand HD', url: 'https://ondemand.st/', category: 'livetv', desc: 'On demand sports & live channels', noDropdown: true },
    { id: 'tv3', title: 'Streamed.pk', url: 'https://streamed.pk/', category: 'livetv', desc: 'Free live sports streaming portal', noDropdown: true },
    { id: 'tv4', title: 'SportPlus Watch', url: 'https://en97.sportplus.watch/', category: 'livetv', desc: 'Global live sports streams', noDropdown: true },
    { id: 'tv5', title: 'VenueVault', url: 'https://venuevault.live/', category: 'livetv', desc: 'Live sports & events portal', noDropdown: true },
    { id: 'tv6', title: 'TheTVApp', url: 'https://thetvapptv.com/', category: 'livetv', desc: 'Free live cable channels & sports', noDropdown: true },
    { id: 'tv7', title: 'NTV', url: 'https://ntv.cx/', category: 'livetv', desc: 'Live TV channels & sports directory', noDropdown: true },
    { id: 'tv8', title: 'Public IPTV', url: 'https://publiciptv.com/', category: 'livetv', desc: 'Free IPTV playlist & live channels', noDropdown: true },
    { id: 'tv9', title: 'StreamEast Now', url: 'https://streameastnow.net/', category: 'livetv', desc: 'Popular live sports streaming index', noDropdown: true },
    { id: 'tv10', title: 'The StreamEast', url: 'https://thestreameast.top/', category: 'livetv', desc: 'Live HD sports streaming hub', noDropdown: true },
    { id: 'tv11', title: 'SportSurge V2', url: 'https://v2.sportsurge.net/', category: 'livetv', desc: 'Sports streams aggregator', noDropdown: true },
    { id: 'tv12', title: 'FameLack', url: 'https://famelack.com/', category: 'livetv', desc: 'Live sports & entertainment streams', noDropdown: true },
    { id: 'tv13', title: 'TVPass', url: 'https://tvpass.org/', category: 'livetv', desc: 'Free live TV channel streams', noDropdown: true },
    { id: 'tv14', title: 'MethStreams', url: 'https://methstreams.me/', category: 'livetv', desc: 'HD live sports streaming streams', noDropdown: true },
    { id: 'tv15', title: 'CrackStreams', url: 'https://crackstreams.app/', category: 'livetv', desc: 'Live MMA, Boxing, NBA & NFL streams', noDropdown: true },
    { id: 'tv16', title: 'BuffStreams', url: 'https://buffstreams.app/', category: 'livetv', desc: 'Free sports live streams directory', noDropdown: true },
    { id: 'tv17', title: 'LiveTV.sx', url: 'https://livetv.sx/', category: 'livetv', desc: 'Live sports scores & video broadcasts', noDropdown: true },

    // Comic Books Section
    { id: '30', title: 'Marvel Unlimited', url: 'https://www.marvel.com/unlimited', category: 'comics', desc: 'Read 30,000+ Marvel digital comics', clicks: 19, noDropdown: true },
    { id: '31', title: 'DC Universe Infinite', url: 'https://www.dcuniverseinfinite.com', category: 'comics', desc: 'Premium DC digital comic service', clicks: 17, noDropdown: true },
    { id: '32', title: 'Read Comics Online', url: 'https://readcomiconline.li', category: 'comics', desc: 'High quality comic book reader', clicks: 25, noDropdown: true },
    { id: '33', title: 'League of Comic Geeks', url: 'https://leagueofcomicgeeks.com', category: 'comics', desc: 'Comic book collection tracker & pull list', clicks: 8, noDropdown: true }
];

// DOM Element References
const elements = {
    html: document.documentElement,
    videoSplashScreen: document.getElementById('videoSplashScreen'),
    introVideo: document.getElementById('introVideo'),
    contentContainer: document.getElementById('contentContainer'),
    categoryNav: document.getElementById('categoryNav'),
    scrollLeftBtn: document.getElementById('scrollLeftBtn'),
    scrollRightBtn: document.getElementById('scrollRightBtn'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    emptyState: document.getElementById('emptyState'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    themeLabel: document.getElementById('themeLabel'),
    layoutToggleBtn: document.getElementById('layoutToggleBtn'),
    layoutIcon: document.getElementById('layoutIcon'),
    headerTelegramBtn: document.getElementById('headerTelegramBtn'),
    telegramModal: document.getElementById('telegramModal'),
    closeTelegramModalBtn: document.getElementById('closeTelegramModalBtn'),
    skipTelegramBtn: document.getElementById('skipTelegramBtn'),
    exportImportBtn: document.getElementById('exportImportBtn'),
    dataModal: document.getElementById('dataModal'),
    closeDataModalBtn: document.getElementById('closeDataModalBtn'),
    closeDataModalBtn2: document.getElementById('closeDataModalBtn2'),
    exportDataBtn: document.getElementById('exportDataBtn'),
    importFileInput: document.getElementById('importFileInput'),
    resetDefaultsBtn: document.getElementById('resetDefaultsBtn'),
    totalLinksCount: document.getElementById('totalLinksCount'),
    toastContainer: document.getElementById('toastContainer')
};

/* ==========================================================================
   INITIALIZATION & LOCAL STORAGE
   ========================================================================== */

function init() {
    loadState();
    setupEventListeners();
    renderTheme();
    renderLayoutView();
    renderNavBadges();
    renderContent();
    initVideoIntro();
}

function initBgVideoManager() {
    // Background video removed
}

function initVideoIntro() {
    const splash = elements.videoSplashScreen;
    const video = elements.introVideo;
    if (!splash) return;

    let isDismissed = false;

    function dismissVideoSplash() {
        if (isDismissed) return;
        isDismissed = true;

        if (video) {
            video.pause();
        }

        splash.classList.add('fade-out');

        // Open Telegram modal smoothly 400ms after video splash fades out
        setTimeout(() => {
            openModal(elements.telegramModal);
        }, 400);
    }

    if (video) {
        // Evaluate responsive <source> media query rules (intro2.mp4 on mobile / intro.mp4 on desktop)
        video.load();

        // Dismiss when video finishes playing
        video.addEventListener('ended', dismissVideoSplash);

        // Fallback: If video encounters error or fails to load, dismiss immediately
        video.addEventListener('error', dismissVideoSplash);

        // Attempt to play video (handles browsers requiring interaction or muted autoplay)
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // If autoplay is blocked by browser, dismiss splash cleanly
                dismissVideoSplash();
            });
        }
    } else {
        dismissVideoSplash();
    }

    // Safety fallback timeout (10 seconds max)
    setTimeout(dismissVideoSplash, 10000);
}

function loadState() {
    const savedLinks = localStorage.getItem('redrmy_aio_links_v5');
    if (savedLinks) {
        try {
            state.links = JSON.parse(savedLinks);
        } catch (e) {
            console.error('Failed to parse links from localStorage', e);
            state.links = [...defaultLinks];
        }
    } else {
        state.links = [...defaultLinks];
        saveState();
    }

    // Ensure PW (id: '1') contains Study Stark in sublinks
    const pwLink = state.links.find(l => l.id === '1' || (l.title && l.title.toLowerCase().includes('pw')));
    if (pwLink) {
        if (!pwLink.sublinks) pwLink.sublinks = [];
        const hasStudyStark = pwLink.sublinks.some(s => s.url && s.url.includes('studystark.in'));
        if (!hasStudyStark) {
            pwLink.sublinks.unshift({
                title: 'Study Stark',
                url: 'https://studystark.in/'
            });
            saveState();
        } else {
            pwLink.sublinks.forEach(s => {
                if (s.title && s.title.includes('(Iframe)')) {
                    s.title = s.title.replace('(Iframe)', '').trim();
                }
            });
        }
    }

    // Sync Testbook (formerly Study and Fun, id: '3')
    const link3 = state.links.find(l => l.id === '3' || (l.title && (l.title.toLowerCase().includes('study and fun') || l.title.toLowerCase().includes('testbook'))));
    if (link3) {
        link3.title = 'Testbook';
        link3.url = 'https://testbook.com/';
        link3.desc = 'Mock Tests & Exam Preparation Platform';
        if (!link3.sublinks) link3.sublinks = [];
        const hasSpidyTests = link3.sublinks.some(s => s.url && s.url.includes('spidytests.vercel.app'));
        if (!hasSpidyTests) {
            link3.sublinks.unshift({
                title: 'Spidy Tests',
                url: 'https://spidytests.vercel.app/'
            });
            saveState();
        }
    }

    // Sync Next Toppers (id: '4')
    const link4 = state.links.find(l => l.id === '4' || (l.title && l.title.toLowerCase().includes('next topper')));
    if (link4) {
        if (!link4.sublinks) link4.sublinks = [];
        const hasSpidyTopper = link4.sublinks.some(s => s.url && s.url.includes('spidytopper.vercel.app'));
        if (!hasSpidyTopper) {
            link4.sublinks.unshift({
                title: 'Spidy Topper',
                url: 'https://spidytopper.vercel.app/'
            });
            saveState();
        }
    }

    // Update URLs and sublinks for id '5' (CDS Journey)
    const link5 = state.links.find(l => l.id === '5' || (l.title && l.title.toLowerCase().includes('cds journey')));
    if (link5) {
        if (link5.url.includes('youtube.com')) {
            link5.url = 'https://www.cdsjourney.com/';
        }
        if (!link5.sublinks) link5.sublinks = [];
        const hasSpidyCDS = link5.sublinks.some(s => s.url && s.url.includes('spidyuniversecds.vercel.app'));
        if (!hasSpidyCDS) {
            link5.sublinks.unshift({
                title: 'Spidy Universe CDS',
                url: 'https://spidyuniversecds.vercel.app/'
            });
            saveState();
        }
    }

    // Sync Selection Way (id: '8')
    const link8 = state.links.find(l => l.id === '8' || (l.title && l.title.toLowerCase().includes('selection way')));
    if (link8) {
        if (link8.url.includes('youtube.com')) {
            link8.url = 'https://www.selectionway.com/';
        }
        if (!link8.sublinks) link8.sublinks = [];
        const hasSpidyWay = link8.sublinks.some(s => s.url && s.url.includes('spidyuniverseway.vercel.app'));
        if (!hasSpidyWay) {
            link8.sublinks.unshift({
                title: 'Spidy Universe Way',
                url: 'https://spidyuniverseway.vercel.app/'
            });
            saveState();
        }
    }

    // Sync Unacademy (id: '9')
    const link9 = state.links.find(l => l.id === '9' || (l.title && l.title.toLowerCase().includes('unacademy')));
    if (link9) {
        if (!link9.sublinks) link9.sublinks = [];
        const hasSpidyUnacademy = link9.sublinks.some(s => s.url && s.url.includes('spidyunacademy.vercel.app'));
        if (!hasSpidyUnacademy) {
            link9.sublinks.unshift({
                title: 'Spidy Unacademy',
                url: 'https://spidyunacademy.vercel.app/'
            });
            saveState();
        }
    }

    // Sync Spidy RWA sublink for RWA (id '6') in localStorage
    const rwaLink = state.links.find(l => l.id === '6' || (l.title && l.title.toLowerCase().includes('rojgar')));
    if (rwaLink) {
        if (!rwaLink.sublinks) rwaLink.sublinks = [];
        const hasSpidyRWA = rwaLink.sublinks.some(s => s.url && s.url.includes('spidyrwa.vercel.app'));
        if (!hasSpidyRWA) {
            rwaLink.sublinks.unshift({
                title: 'Spidy RWA',
                url: 'https://spidyrwa.vercel.app/'
            });
            saveState();
        }
    }

    // Sync KGS (Khan Global Studies) link & sublink in localStorage
    const kgsLink = state.links.find(l => l.id === '11' || (l.title && l.title.toLowerCase().includes('kgs')));
    if (!kgsLink) {
        state.links.push({
            id: '11',
            title: 'KGS (Khan Global Studies)',
            url: 'https://khanglobalstudies.com/',
            category: 'study',
            desc: 'UPSC, State PCS & Competitive Exams Prep',
            clicks: 12,
            sublinks: [
                { title: 'Spidy KGS', url: 'https://spidy-kgs.vercel.app/' }
            ]
        });
        saveState();
    } else {
        if (!kgsLink.sublinks) kgsLink.sublinks = [];
        const hasSpidyKGS = kgsLink.sublinks.some(s => s.url && s.url.includes('spidy-kgs.vercel.app'));
        if (!hasSpidyKGS) {
            kgsLink.sublinks.unshift({
                title: 'Spidy KGS',
                url: 'https://spidy-kgs.vercel.app/'
            });
            saveState();
        }
    }

    // Sync HDHub4U & VegaMovies in Movies section
    const hdhubLink = state.links.find(l => l.id === 'm25' || (l.url && l.url.includes('hdhub4u')));
    if (!hdhubLink) {
        state.links.push({
            id: 'm25',
            title: 'HDHub4U',
            url: 'https://hdhub4u.ec/',
            category: 'movies',
            desc: 'Free HD Movies & Web Series Download',
            noDropdown: true
        });
        saveState();
    } else {
        if (hdhubLink.url !== 'https://hdhub4u.ec/') {
            hdhubLink.url = 'https://hdhub4u.ec/';
            saveState();
        }
    }

    const hasVegaMovies = state.links.some(l => l.id === 'm26' || (l.url && l.url.includes('vegamoviess')));
    if (!hasVegaMovies) {
        state.links.push({
            id: 'm26',
            title: 'VegaMovies',
            url: 'https://vegamoviess.fun/',
            category: 'movies',
            desc: 'Dual Audio & 4K Movies Download',
            noDropdown: true
        });
        saveState();
    }

    // Sync new Manga links into localStorage
    const newMangaLinks = [
        { id: 'mg1', title: 'MangaBall', url: 'https://mangaball.net/', category: 'manga', desc: 'Read free manga online in high quality', noDropdown: true },
        { id: 'mg2', title: 'Atsu', url: 'https://atsu.moe/', category: 'manga', desc: 'Clean online manga reader', noDropdown: true },
        { id: 'mg3', title: 'OniSaga', url: 'https://onisaga.com/', category: 'manga', desc: 'Read latest manga & manhwa chapters', noDropdown: true },
        { id: 'mg4', title: 'Kagane', url: 'https://kagane.to/', category: 'manga', desc: 'Popular manga & webtoon reader', noDropdown: true },
        { id: 'mg5', title: 'AquaReader', url: 'https://aquareader.org/', category: 'manga', desc: 'Free high quality manga reader', noDropdown: true },
        { id: 'mg6', title: 'ComicK', url: 'https://comick.dev/', category: 'manga', desc: 'Comprehensive manga database & reader', noDropdown: true },
        { id: 'mg7', title: 'Comix', url: 'https://comix.to/', category: 'manga', desc: 'Read digital comics & manga online', noDropdown: true },
        { id: 'mg8', title: 'MangaDot', url: 'https://mangadot.net/', category: 'manga', desc: 'Online manga reading directory', noDropdown: true },
        { id: 'mg9', title: 'MangaBuddy', url: 'https://mangabuddy1.co.uk/', category: 'manga', desc: 'Read free manga & manhwa online', noDropdown: true },
        { id: 'mg10', title: 'QToon', url: 'https://qtoon.org/', category: 'manga', desc: 'Free Webtoon & Manhwa reader', noDropdown: true },
        { id: 'mg11', title: 'MangaGo', url: 'https://mangago.me/', category: 'manga', desc: 'Huge library of free manga', noDropdown: true },
        { id: 'mg12', title: 'MangaFire', url: 'https://mangafire.to/home', category: 'manga', desc: 'Free HD Manga reading platform', noDropdown: true },
        { id: 'mg13', title: 'AllManga', url: 'https://allmanga.to/manga?cty=ALL', category: 'manga', desc: 'Read all manga & manhwa online', noDropdown: true },
        { id: 'mg14', title: 'Mangakakalot', url: 'https://www.mangakakalot.gg/', category: 'manga', desc: 'Popular online manga reading portal', noDropdown: true },
        { id: 'mg15', title: 'Asura Scans', url: 'https://asurascans.com/', category: 'manga', desc: 'Popular Manhwa & Manga scanlations', noDropdown: true },
        { id: 'mg16', title: 'MangaHub', url: 'https://mangahub.io/', category: 'manga', desc: 'Read free manga online directory', noDropdown: true },
        { id: 'mg17', title: 'WeebCentral', url: 'https://weebcentral.com/', category: 'manga', desc: 'Weeb manga reading platform', noDropdown: true },
        { id: 'mg18', title: 'MangaKatana', url: 'https://mangakatana.com/', category: 'manga', desc: 'Fast online manga reader', noDropdown: true },
        { id: 'mg19', title: 'LikeManga', url: 'https://likemanga.ink/', category: 'manga', desc: 'Read latest manga & manhwa online', noDropdown: true },
        { id: 'mg20', title: 'MangaXO', url: 'https://mangaxo.com/home', category: 'manga', desc: 'Online manga reading catalog', noDropdown: true },
        { id: 'mg21', title: 'King of Shojo', url: 'https://kingofshojo.com/', category: 'manga', desc: 'Shojo & romance manga reader', noDropdown: true }
    ];

    let hasAddedManga = false;
    newMangaLinks.forEach(manga => {
        const exists = state.links.some(l => l.id === manga.id || (l.url && l.url.includes(new URL(manga.url).hostname.replace('www.', ''))));
        if (!exists) {
            state.links.push(manga);
            hasAddedManga = true;
        }
    });
    if (hasAddedManga) {
        saveState();
    }

    // Sync new Live TV & Sports links into localStorage
    const newTvLinks = [
        { id: 'tv1', title: 'DLHD (DaddyLive)', url: 'https://dlhd.st/', category: 'livetv', desc: 'Live sports channels & TV streams', noDropdown: true },
        { id: 'tv2', title: 'OnDemand HD', url: 'https://ondemand.st/', category: 'livetv', desc: 'On demand sports & live channels', noDropdown: true },
        { id: 'tv3', title: 'Streamed.pk', url: 'https://streamed.pk/', category: 'livetv', desc: 'Free live sports streaming portal', noDropdown: true },
        { id: 'tv4', title: 'SportPlus Watch', url: 'https://en97.sportplus.watch/', category: 'livetv', desc: 'Global live sports streams', noDropdown: true },
        { id: 'tv5', title: 'VenueVault', url: 'https://venuevault.live/', category: 'livetv', desc: 'Live sports & events portal', noDropdown: true },
        { id: 'tv6', title: 'TheTVApp', url: 'https://thetvapptv.com/', category: 'livetv', desc: 'Free live cable channels & sports', noDropdown: true },
        { id: 'tv7', title: 'NTV', url: 'https://ntv.cx/', category: 'livetv', desc: 'Live TV channels & sports directory', noDropdown: true },
        { id: 'tv8', title: 'Public IPTV', url: 'https://publiciptv.com/', category: 'livetv', desc: 'Free IPTV playlist & live channels', noDropdown: true },
        { id: 'tv9', title: 'StreamEast Now', url: 'https://streameastnow.net/', category: 'livetv', desc: 'Popular live sports streaming index', noDropdown: true },
        { id: 'tv10', title: 'The StreamEast', url: 'https://thestreameast.top/', category: 'livetv', desc: 'Live HD sports streaming hub', noDropdown: true },
        { id: 'tv11', title: 'SportSurge V2', url: 'https://v2.sportsurge.net/', category: 'livetv', desc: 'Sports streams aggregator', noDropdown: true },
        { id: 'tv12', title: 'FameLack', url: 'https://famelack.com/', category: 'livetv', desc: 'Live sports & entertainment streams', noDropdown: true },
        { id: 'tv13', title: 'TVPass', url: 'https://tvpass.org/', category: 'livetv', desc: 'Free live TV channel streams', noDropdown: true },
        { id: 'tv14', title: 'MethStreams', url: 'https://methstreams.me/', category: 'livetv', desc: 'HD live sports streaming streams', noDropdown: true },
        { id: 'tv15', title: 'CrackStreams', url: 'https://crackstreams.app/', category: 'livetv', desc: 'Live MMA, Boxing, NBA & NFL streams', noDropdown: true },
        { id: 'tv16', title: 'BuffStreams', url: 'https://buffstreams.app/', category: 'livetv', desc: 'Free sports live streams directory', noDropdown: true },
        { id: 'tv17', title: 'LiveTV.sx', url: 'https://livetv.sx/', category: 'livetv', desc: 'Live sports scores & video broadcasts', noDropdown: true }
    ];

    let hasAddedTv = false;
    newTvLinks.forEach(tv => {
        const exists = state.links.some(l => l.id === tv.id || (l.url && l.url.includes(new URL(tv.url).hostname.replace('www.', ''))));
        if (!exists) {
            state.links.push(tv);
            hasAddedTv = true;
        }
    });
    if (hasAddedTv) {
        saveState();
    }

    const savedTheme = localStorage.getItem('redrmy_aio_theme');
    if (savedTheme) {
        state.theme = savedTheme;
    }

    const savedViewMode = localStorage.getItem('redrmy_aio_view_mode');
    if (savedViewMode) {
        state.viewMode = savedViewMode;
    }

    const savedSound = localStorage.getItem('redrmy_aio_sound');
    if (savedSound !== null) {
        state.soundMuted = savedSound === 'true';
    }
}

function saveState() {
    localStorage.setItem('redrmy_aio_links_v5', JSON.stringify(state.links));
    localStorage.setItem('redrmy_aio_theme', state.theme);
    localStorage.setItem('redrmy_aio_view_mode', state.viewMode);
    localStorage.setItem('redrmy_aio_sound', state.soundMuted);
}

/* ==========================================================================
   UI RENDERING FUNCTIONS
   ========================================================================== */

function renderTheme() {
    elements.html.setAttribute('data-theme', state.theme);
    if (state.theme === 'day') {
        elements.themeIcon.className = 'fa-solid fa-sun text-amber';
        elements.themeLabel.textContent = 'Day';
    } else {
        elements.themeIcon.className = 'fa-solid fa-moon';
        elements.themeLabel.textContent = 'Night';
    }
}

function renderLayoutView() {
    if (state.viewMode === 'list') {
        elements.contentContainer.classList.add('list-view');
        elements.layoutIcon.className = 'fa-solid fa-list-ul';
    } else {
        elements.contentContainer.classList.remove('list-view');
        elements.layoutIcon.className = 'fa-solid fa-border-all';
    }
}

function renderSoundState(showNotification = false) {
    // Background sound removed
}

function renderNavBadges() {
    const totalCount = state.links.length;
    document.getElementById('badge-all').textContent = totalCount;

    Object.keys(categories).forEach(catKey => {
        const count = state.links.filter(l => l.category === catKey).length;
        const badgeEl = document.getElementById(`badge-${catKey}`);
        if (badgeEl) badgeEl.textContent = count;
    });

    elements.totalLinksCount.textContent = `${totalCount} Directory Links`;
}

function getFilteredLinks() {
    return state.links.filter(link => {
        // Category Filter
        let matchesCategory = true;
        if (state.activeCategory !== 'all') {
            matchesCategory = link.category === state.activeCategory;
        }

        // Search Query Filter
        let matchesSearch = true;
        if (state.searchQuery.trim() !== '') {
            const query = state.searchQuery.toLowerCase();
            const titleMatch = link.title.toLowerCase().includes(query);
            const urlMatch = link.url.toLowerCase().includes(query);
            const descMatch = (link.desc || '').toLowerCase().includes(query);
            const sublinkMatch = (link.sublinks || []).some(s => s.title.toLowerCase().includes(query) || s.url.toLowerCase().includes(query));
            matchesSearch = titleMatch || urlMatch || descMatch || sublinkMatch;
        }

        return matchesCategory && matchesSearch;
    });
}

function renderContent() {
    renderNavBadges();
    elements.contentContainer.innerHTML = '';

    const filtered = getFilteredLinks();

    if (filtered.length === 0) {
        elements.emptyState.style.display = 'block';
        return;
    } else {
        elements.emptyState.style.display = 'none';
    }

    // Determine which sections to show
    let categoriesToShow = [];
    if (state.activeCategory === 'all') {
        categoriesToShow = Object.keys(categories);
    } else {
        categoriesToShow = [state.activeCategory];
    }

    categoriesToShow.forEach(catKey => {
        const sectionLinks = filtered.filter(l => l.category === catKey);
        if (sectionLinks.length === 0 && state.activeCategory === 'all') {
            return;
        }

        const categoryData = categories[catKey];
        const sectionEl = document.createElement('div');
        sectionEl.className = `category-section category-${catKey}`;

        if (catKey === 'comics') {
            sectionEl.innerHTML = `
                <div class="section-header">
                    <div class="section-title-wrapper">
                        <div class="section-icon-badge ${categoryData.colorClass}">
                            <i class="fa-solid ${categoryData.icon}"></i>
                        </div>
                        <h2 class="section-title">${categoryData.name}</h2>
                        <span class="section-count">(Soon)</span>
                    </div>
                </div>
                <div class="coming-soon-card">
                    <div class="coming-soon-badge"><i class="fa-solid fa-clock-rotate-left"></i></div>
                    <h3>Coming Soon</h3>
                    <p>Comic books section is currently being curated. Stay tuned!</p>
                </div>
            `;
            elements.contentContainer.appendChild(sectionEl);
            return;
        }

        sectionEl.innerHTML = `
            <div class="section-header">
                <div class="section-title-wrapper">
                    <div class="section-icon-badge ${categoryData.colorClass}">
                        <i class="fa-solid ${categoryData.icon}"></i>
                    </div>
                    <h2 class="section-title">${categoryData.name}</h2>
                    <span class="section-count">(${sectionLinks.length})</span>
                </div>
            </div>
            <div class="links-grid" id="grid-${catKey}"></div>
        `;

        const gridEl = sectionEl.querySelector(`#grid-${catKey}`);
        sectionLinks.forEach(link => {
            gridEl.appendChild(createLinkCard(link));
        });

        elements.contentContainer.appendChild(sectionEl);
    });
}

function createLinkCard(link) {
    const wrapper = document.createElement('div');
    wrapper.className = 'link-card-wrapper';

    let domainName = '';
    try {
        const parsedUrl = new URL(link.url);
        domainName = parsedUrl.hostname.replace('www.', '');
    } catch (e) {
        domainName = link.url;
    }

    const faviconSrc = link.customIcon || `https://www.google.com/s2/favicons?domain=${encodeURIComponent(link.url)}&sz=128`;
    const initial = link.title ? link.title.charAt(0).toUpperCase() : '?';

    // Square App Cards for Non-Study Categories (Icon & Title only)
    if (link.category !== 'study') {
        wrapper.className = 'link-card-wrapper square-card-wrapper';
        wrapper.innerHTML = `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-card square-card" style="text-decoration: none;" title="${escapeHtml(link.title)}">
                <div class="link-favicon-wrapper">
                    <img src="${faviconSrc}" class="link-favicon" alt="${link.title} icon"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="favicon-fallback" style="display:none;">${initial}</div>
                </div>
                <div class="link-title">${escapeHtml(link.title)}</div>
            </a>
        `;
        const cardAnchor = wrapper.querySelector('.link-card');
        cardAnchor.addEventListener('click', () => {
            link.clicks = (link.clicks || 0) + 1;
            saveState();
        });
        return wrapper;
    }

    const hasSublinks = Array.isArray(link.sublinks) && link.sublinks.length > 0;

    let dropdownHtml = '';
    if (hasSublinks) {
        dropdownHtml = link.sublinks.map(sub => {
            let subDomain = '';
            try {
                subDomain = new URL(sub.url).hostname.replace('www.', '');
            } catch (e) {
                subDomain = sub.url;
            }
            const subFavicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(sub.url)}&sz=128`;
            const subInitial = sub.title ? sub.title.charAt(0).toUpperCase() : '?';
            return `
                <a href="${sub.url}" target="_blank" rel="noopener noreferrer" class="sublink-item">
                    <div class="sublink-favicon-wrapper">
                        <img src="${subFavicon}" class="sublink-favicon" alt="${sub.title} icon"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="favicon-fallback" style="display:none;">${subInitial}</div>
                    </div>
                    <div class="sublink-info">
                        <div class="sublink-title">${escapeHtml(sub.title)}</div>
                        <div class="sublink-domain">${escapeHtml(subDomain)}</div>
                    </div>
                    <i class="fa-solid fa-arrow-up-right-from-square external-arrow"></i>
                </a>
            `;
        }).join('');
    }

    const encodedTitle = encodeURIComponent(link.title);
    dropdownHtml += `
        <div class="sublink-empty-panel">
            <i class="fa-brands fa-telegram sublink-empty-icon"></i>
            <p class="sublink-empty-text">Know a mirror or alternative for <strong>${escapeHtml(link.title)}</strong>?</p>
            <a href="https://t.me/Redrmy_bot?text=Add%20link%20for%20${encodedTitle}%20-%20YOUR_LINK_HERE" 
               target="_blank" rel="noopener noreferrer" class="sublink-add-btn">
                <i class="fa-brands fa-telegram"></i> Add Link
            </a>
        </div>
    `;

    wrapper.innerHTML = `
        <div class="link-card main-card-with-dropdown">
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="main-card-clickable">
                <div class="link-favicon-wrapper">
                    <img src="${faviconSrc}" class="link-favicon" alt="${link.title} icon"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="favicon-fallback" style="display:none;">${initial}</div>
                </div>
                <div class="link-info">
                    <div class="link-title">${escapeHtml(link.title)}</div>
                    <div class="link-domain">${escapeHtml(domainName)}</div>
                    ${link.desc ? `<div class="link-desc">${escapeHtml(link.desc)}</div>` : ''}
                </div>
            </a>
            <button class="dropdown-toggle-btn" title="Show more links">
                <i class="fa-solid fa-chevron-down toggle-icon"></i>
            </button>
        </div>
        <div class="sublinks-dropdown-container">
            ${dropdownHtml}
        </div>
    `;

    // Track clicks on main link
    const mainAnchor = wrapper.querySelector('.main-card-clickable');
    mainAnchor.addEventListener('click', () => {
        link.clicks = (link.clicks || 0) + 1;
        saveState();
    });

    const toggleBtn = wrapper.querySelector('.dropdown-toggle-btn');
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('dropdown-open');
    });

    return wrapper;
}

/* ==========================================================================
   BACKUP, IMPORT & EXPORT
   ========================================================================== */

function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.links, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `REDRMY_AIO_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported backup JSON!');
}

function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                state.links = imported;
                saveState();
                renderContent();
                closeModal(elements.dataModal);
                showToast('Successfully imported links!');
            } else {
                showToast('Invalid JSON backup file format', 'danger');
            }
        } catch (err) {
            showToast('Error reading JSON file', 'danger');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function resetToDefaults() {
    if (confirm('Are you sure you want to restore default directory links?')) {
        state.links = [...defaultLinks];
        saveState();
        renderContent();
        closeModal(elements.dataModal);
        showToast('Restored default bookmarks');
    }
}

/* ==========================================================================
   MODAL & TOAST HELPERS
   ========================================================================== */

function openModal(modalEl) {
    if (modalEl) modalEl.classList.add('active');
}

function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('active');
}



function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid ${type === 'danger' ? 'fa-circle-exclamation text-rose' : 'fa-circle-check text-emerald'}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ==========================================================================
   EVENT LISTENERS SETUP
   ========================================================================== */

function setupEventListeners() {
    // Nav Tab Filtering
    elements.categoryNav.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.nav-tab');
        if (!tabBtn) return;

        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tabBtn.classList.add('active');

        state.activeCategory = tabBtn.dataset.category;
        renderContent();

        // Scroll active tab into view smoothly
        tabBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });

    // Scroll Buttons for Categories
    elements.scrollLeftBtn.addEventListener('click', () => {
        elements.categoryNav.scrollBy({ left: -220, behavior: 'smooth' });
    });

    elements.scrollRightBtn.addEventListener('click', () => {
        elements.categoryNav.scrollBy({ left: 220, behavior: 'smooth' });
    });

    // Live Search Input
    elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (state.searchQuery.length > 0) {
            elements.clearSearchBtn.style.display = 'block';
        } else {
            elements.clearSearchBtn.style.display = 'none';
        }
        renderContent();
    });

    // Clear Search Button
    elements.clearSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchQuery = '';
        elements.clearSearchBtn.style.display = 'none';
        renderContent();
        elements.searchInput.focus();
    });

    // Telegram Modal Triggers
    if (elements.headerTelegramBtn) {
        elements.headerTelegramBtn.addEventListener('click', () => openModal(elements.telegramModal));
    }
    if (elements.closeTelegramModalBtn) {
        elements.closeTelegramModalBtn.addEventListener('click', () => closeModal(elements.telegramModal));
    }
    if (elements.skipTelegramBtn) {
        elements.skipTelegramBtn.addEventListener('click', () => closeModal(elements.telegramModal));
    }
    if (elements.telegramModal) {
        elements.telegramModal.addEventListener('click', (e) => {
            if (e.target === elements.telegramModal) closeModal(elements.telegramModal);
        });
    }

    // Sound Toggle (Mute / Unmute Background Video)
    if (elements.soundToggleBtn) {
        elements.soundToggleBtn.addEventListener('click', () => {
            state.soundMuted = !state.soundMuted;
            saveState();
            renderSoundState(true);
        });
    }

    // Theme Toggle (Day / Night)
    elements.themeToggleBtn.addEventListener('click', () => {
        state.theme = state.theme === 'night' ? 'day' : 'night';
        saveState();
        renderTheme();
    });

    // Layout Toggle (Grid / List)
    elements.layoutToggleBtn.addEventListener('click', () => {
        state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
        saveState();
        renderLayoutView();
    });

    // Data Modal Triggers
    if (elements.exportImportBtn) {
        elements.exportImportBtn.addEventListener('click', () => openModal(elements.dataModal));
    }
    if (elements.closeDataModalBtn) {
        elements.closeDataModalBtn.addEventListener('click', () => closeModal(elements.dataModal));
    }
    if (elements.closeDataModalBtn2) {
        elements.closeDataModalBtn2.addEventListener('click', () => closeModal(elements.dataModal));
    }

    elements.dataModal.addEventListener('click', (e) => {
        if (e.target === elements.dataModal) closeModal(elements.dataModal);
    });

    elements.exportDataBtn.addEventListener('click', exportJSON);
    elements.importFileInput.addEventListener('change', importJSON);
    elements.resetDefaultsBtn.addEventListener('click', resetToDefaults);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(elements.dataModal);
            closeModal(elements.telegramModal);
        }
        if (e.key === '/' && document.activeElement !== elements.searchInput) {
            e.preventDefault();
            elements.searchInput.focus();
        }
    });
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
