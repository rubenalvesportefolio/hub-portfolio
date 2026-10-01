/* ---------- Shared project data ----------
   Single source of truth for every project across the site. Used by the
   Work page's category grids, the project detail page, and the Best
   Projects page - add a project once here and it's available everywhere.

   For 3D, Graphic Design, Contests, and Games, clicking a tile
   opens an internal detail page (project.html?id=...) showing the
   description and skills/tags below, with a "View full project" button
   linking to "link" - instead of jumping straight to an outside site.
   Commissions is the exception: those tiles link directly to their own
   dedicated case-study page (see commission-template.html), so they
   don't use "id"/"description" at all.

   "id" - required for 3D / Graphic Design / Contests / Games.
   A short, unique, URL-safe slug (no spaces) - this is what
   project.html?id=... looks up.

   "description" - shown on the project's detail page. Bracketed
   placeholders mean "replace me"; fill in the real brief/process/skills
   story whenever you have it.

   "link" - the "View full project" destination on the detail page:
   - a full URL (starting with http) opens in a NEW TAB (ArtStation,
     Rookies, itch.io, etc).
   - '' (empty) - the button is simply omitted; the detail page still
     shows the description/skills on their own.

   "image" is optional: leave it empty ('') to show a placeholder tile
   until you have a real image ready.

   "images" is optional: an array of extra image paths shown in a small
   gallery grid on the project's detail page, below the main cover/
   description (not shown on the grid tile itself, which only ever uses
   "image"). Use this when a project has more than one shot worth seeing
   (e.g. day/night renders, multiple angles). Like "image", each one
   needs a thumbs/ twin next to it.

   "fit" is optional: set to 'contain' for a cover image that should
   never be cropped (e.g. a wordmark/banner with transparent padding).
   Defaults to 'cover' (fills the tile, cropping as needed).

   "video" is optional: a YouTube video ID (the part after watch?v= in
   the address, e.g. 'I9UdgZKVZ8A'). The detail page then shows the
   cover image with a play button in place of the plain cover; clicking
   it loads the YouTube player right there (nothing is loaded from
   YouTube until then), and a "Watch on YouTube" button is added.

   "date" is optional but expected: when the project was made, as
   'YYYY' ('2025'), 'YYYY-MM' ('2025-07'), or a range 'start/end' with
   either form on each side ('2025/2026-04' -> "2025 - April 2026").
   Shown on the project page (month names follow the site language) and
   as a year on the tiles. npm run validate warns about projects
   without one.

   "hidden: true" is optional: keeps a draft in the file but out of the
   site - no Work tile, no Best Projects/home tile, and its
   project.html?id= page says "not found". Remove the line to publish.

   "downloadUrl" / "viewUrl" are optional: when either is set, the detail
   page shows extra buttons - one to download a file directly, one to
   open a link (e.g. a PDF preview) in a new tab.

   "i18n" is optional but expected on anything with English prose: it
   holds the same "title"/"description" in the site's other languages,
   e.g. i18n: { pt: { title: '...', description: '...' } }. Anything
   missing falls back to the English field above, so a proper noun
   ("Jorge", "UrbanEyePT") simply doesn't need an entry. Tags are NOT
   repeated here - they're translated once in i18n.js, since the same
   tag is shared by many projects. */
const PROJECTS = {
  '3d': [
    {
      id: '3d-001',
      date: '2025-07', // Rookies page: "Made in 21 July 2025"
      title: 'Tower - 001',
      tags: ['3D Modelling', 'Hard-Surface Modelling'],
      link: 'https://www.therookies.co/projects/103669',
      image: 'images/work/3d/project-001.webp',
      description: 'A hand-built medieval tower house, modelled from a single reference image. An early hard-surface modelling exercise focused on translating a 2D concept into a fully realised 3D structure in Blender.',
      i18n: {
        pt: {
          title: 'Torre - 001',
          description: 'Uma torre medieval construída de raiz, modelada a partir de uma única imagem de referência. Um exercício inicial de modelação hard-surface focado em traduzir um conceito 2D numa estrutura 3D completa em Blender.',
        },
      },
    },
    {
      id: '3d-002',
      date: '2025-08', // Rookies page: "Made in 4 August 2025"
      title: 'Pocket Clock - 002',
      tags: ['3D Modelling', 'Detail', 'Shading & Materials'],
      link: 'https://www.therookies.co/projects/103670',
      image: 'images/work/3d/project-002.webp',
      description: "A detailed steampunk-style pocket clock, modelled and rendered in Blender. This project introduced fine hard-surface detailing at a small scale, along with a first custom material built from scratch using Blender's Shading Nodes.",
      i18n: {
        pt: {
          title: 'Relógio de Bolso - 002',
          description: 'Um relógio de bolso ao estilo steampunk, modelado e renderizado em Blender. Este projeto introduziu detalhe hard-surface fino em pequena escala, a par de um primeiro material personalizado construído de raiz com os Shading Nodes do Blender.',
        },
      },
    },
    {
      id: '3d-003',
      date: '2025-08', // Rookies page: "Made in 14 Aug 2025"
      title: 'Star Destroyer - 003',
      tags: ['3D Animation', 'Geometry Nodes'],
      link: 'https://www.therookies.co/projects/104394',
      image: 'images/work/3d/project-003.webp',
      description: 'A Star Wars-inspired hyperspace jump animation built around an original Titan-class Star Destroyer. Modelled and animated in Blender using Geometry Nodes - an exercise in combining hard-surface spaceship design with procedural animation.',
      i18n: {
        pt: {
          description: 'Uma animação de salto para hiperespaço inspirada em Star Wars, construída à volta de um Star Destroyer original da classe Titan. Modelado e animado em Blender com Geometry Nodes - um exercício de combinação entre design hard-surface de naves e animação procedural.',
        },
      },
    },
    {
      id: '3d-004',
      hidden: true, // draft - not shown anywhere until this line is removed
      title: 'Project 004',
      tags: ['3D Modelling', 'Nature'],
      link: '',
      image: 'images/work/3d/project-004.webp',
      description: '[Add a short description of this project - the brief, the process, and any specific techniques or software used.]',
      i18n: {
        pt: {
          title: 'Projeto 004',
          description: '[Adiciona uma breve descrição deste projeto - o briefing, o processo e quaisquer técnicas ou software utilizados.]',
        },
      },
    },
    {
      id: '3d-005',
      hidden: true, // draft - not shown anywhere until this line is removed
      title: 'Project 005',
      tags: ['Game Asset'],
      link: '',
      image: 'images/work/3d/project-005.webp',
      description: '[Add a short description of this project - the brief, the process, and any specific techniques or software used.]',
      i18n: {
        pt: {
          title: 'Projeto 005',
          description: '[Adiciona uma breve descrição deste projeto - o briefing, o processo e quaisquer técnicas ou software utilizados.]',
        },
      },
    },
    {
      id: '3d-006',
      date: '2026-08', // Rookies page: "Made in 5 August 2026"
      title: 'Sand',
      tags: ['Environment', 'Procedural Shading'],
      link: 'https://www.therookies.co/projects/104813',
      image: 'images/work/3d/project-006.webp',
      description: "A close-up, realistic beach sand environment with a stylised edge. Several approaches were tested - displacement and Subdivision rendered in Cycles, then a lighter EEVEE-based setup using Geometry Nodes - with final colour work finished in Photoshop.",
      i18n: {
        pt: {
          title: 'Areia',
          description: 'Um ambiente realista de areia de praia em grande plano, com um toque estilizado. Foram testadas várias abordagens - displacement e Subdivision renderizados em Cycles, depois uma montagem mais leve em EEVEE com Geometry Nodes - com o trabalho final de cor feito em Photoshop.',
        },
      },
    },
    {
      id: '3d-007',
      date: '2026-08', // Rookies publish date (25 Aug 2026) - no "made in" date given
      title: 'Medieval Library Interior',
      tags: ['3D Modelling', 'Interior', 'Compositing'],
      link: 'https://www.therookies.co/projects/105375',
      image: 'images/work/3d/project-007.webp',
      description: "A low-poly medieval library interior, built as a foundations project exploring environment design and set dressing in Blender. Modelled from a curated reference board, then finished using Blender's Compositor, with renders compared between Eevee and Cycles.",
      i18n: {
        pt: {
          title: 'Interior de Biblioteca Medieval',
          description: 'Um interior de biblioteca medieval em low-poly, criado como projeto de fundamentos para explorar design de ambientes e set dressing em Blender. Modelado a partir de um painel de referências, depois finalizado com o Compositor do Blender, comparando renders entre Eevee e Cycles.',
        },
      },
    },
    {
      id: '3d-008',
      date: '2026-06',
      title: 'Exposição - Telefones do Mundo',
      tags: ['3D Modelling', 'University Work'],
      link: '',
      image: 'images/work/3d/project-008.webp',
      images: ['images/work/3d/project-008-b.webp', 'images/work/3d/project-008-c.webp', 'images/work/3d/project-008-d.webp'],
      description: 'In this project made during university we were tasked to create all the necessary graphic assets to build an expo about phones in a specific space we were given. It was a 3-person group; I was responsible for taking the graphic work made in Illustrator by my teammates and building a mockup of the exhibition space in Blender, placing the phones according to our vision for the exhibition.',
      i18n: {
        pt: {
          description: 'Neste projeto académico foi-nos pedido que criássemos todos os materiais gráficos necessários para montar uma exposição sobre telefones num espaço que nos foi atribuído. Foi um grupo de 3 pessoas; fiquei responsável por pegar no trabalho gráfico feito em Illustrator pelos meus colegas e construir uma maquete do espaço da exposição em Blender, colocando os telefones de acordo com a nossa visão para a exposição.',
        },
      },
    },
    {
      id: '3d-009',
      date: '2025/2026-04', // 1st semester of 3rd year (2025/26) -> final report, April 2026
      title: 'Protocol - Marked',
      tags: ['3D Animation', '3D Modelling', 'University Work'],
      link: '',
      video: 'I9UdgZKVZ8A', // youtube.com/watch?v=I9UdgZKVZ8A
      downloadUrl: 'files/protocol-marked-final-report.pdf',
      viewUrl: 'files/protocol-marked-final-report.pdf',
      image: 'images/work/3d/project-009.webp',
      images: ['images/work/3d/project-009-b.webp', 'images/work/3d/project-009-c.webp'],
      description: "<p>My final degree project in Communication Design and Audiovisual (ESART/IPCB). A solo, original sci-fi 3D cinematic created as a game teaser trailer and submitted to the Casa da Anima\u00e7\u00e3o competition.</p>\n<p>Set in a hyper-surveilled future metropolis, the piece follows an AI hunting for the identity of a masked figure it can never quite pin down. The story unfolds through corrupted files and forgotten protocols.</p>",
      caseStudy: "<h2>Pre-Production</h2>\n\n<h3>Idea &amp; Story</h3>\n<p>The character and world concept were developed during Illustration class. The narrative centres on invisibility inside a fully monitored society: an AI searches for a masked figure whose identity remains hidden behind corrupted files and forgotten protocols.</p>\n\n<h3>Script</h3>\n<p>A full screenplay was written and structured around the key narrative beats of the teaser.</p>\n\n<h3>Design</h3>\n<p>Extensive character studies defined the silhouette, armour details and a dark + red colour palette that communicates decades of combat experience and danger. Environment studies established a blue-dominated futuristic city with orange accents, large-scale architecture and artificial lighting.</p>\n\n<h2>Production</h2>\n\n<h3>Layout</h3>\n<p>Scene composition, camera framing and blocking for the three main environments (opening corridor, city, mysterious corridor) were developed using simple block-outs to lock scale, depth and staging.</p>\n\n<h3>Modelling</h3>\n<p>The entire world was modelled from scratch:</p>\n<ul>\n<li>Protagonist armour, accessories and weapon</li>\n<li>Hero spacecraft and six secondary ships</li>\n<li>Futuristic train and track</li>\n<li>15 unique buildings</li>\n</ul>\n<p>The city was populated with <strong>Geometry Nodes</strong> (weighted collections favouring shorter buildings for a natural skyline). Distant buildings were replaced by parallax cards to keep the scene light on limited hardware.</p>\n\n<h3>Texturing</h3>\n<p>Materials were hand-built with Blender\u2019s <strong>Shading Nodes</strong>, including a deliberately worn red metallic armour designed to visually tell the character\u2019s combat history.</p>\n\n<h3>Rigging</h3>\n<p>A custom armature was created and weighted by hand. <strong>Mixamo</strong> was then used to automate skinning and weight painting.</p>\n\n<h3>Animation</h3>\n<p>Mixamo walk and kneel-to-fire animations were retargeted via a Blender add-on. Ships were animated procedurally along a path with Geometry Nodes instead of hand-keying each one.</p>\n\n<h3>VFX</h3>\n<p>HUD and interface graphics suggesting the AI search were built directly in Blender, together with volumetric fog for atmosphere and scale.</p>\n\n<h3>Lighting</h3>\n<p>Minimal cinematic lighting (Spot, Sun and Area lights) was tuned for the night-city and mysterious-corridor moods.</p>\n\n<h3>Rendering</h3>\n<p><strong>Cycles</strong> was chosen over EEVEE for superior light, shadow and reflection quality. An external render farm was used because some frames exceeded 10 hours locally.</p>\n\n<h2>Post-Production</h2>\n\n<h3>Compositing</h3>\n<p>The <strong>Blender Compositor</strong> (glare/bloom and final image tuning) was applied consistently across every scene.</p>\n\n<h3>Editing &amp; 2D VFX</h3>\n<p>The final cut was assembled in <strong>Premiere Pro</strong>. A glitch-style VFX pass, colour grading with <strong>Lumetri</strong>, and timed transitions (cross-dissolves, volumetric rays, VR-leak, roll) were completed in <strong>After Effects</strong>.</p>\n\n<h3>Sound</h3>\n<p>The score was commissioned from an external composer. Sound effects were sourced and placed in Premiere Pro.</p>\n\n<h2>Physical Outcome</h2>\n<p>The character mesh was optimised, re-posed and prepared for 3D printing, producing the first physical miniatures of the project.</p>",
      i18n: {
        pt: {
          description: "<p>O meu projeto final de licenciatura em Design de Comunica\u00e7\u00e3o e Audiovisual (ESART/IPCB). Um cinematic 3D original de fic\u00e7\u00e3o cient\u00edfica, feito a solo como teaser de videojogo e submetido ao concurso Casa da Anima\u00e7\u00e3o.</p>\n<p>Ambientado numa metr\u00f3pole futurista de vigil\u00e2ncia total, acompanha uma intelig\u00eancia artificial \u00e0 procura da identidade de uma figura mascarada que nunca consegue identificar por completo. A hist\u00f3ria revela-se atrav\u00e9s de ficheiros corrompidos e protocolos esquecidos.</p>",
          caseStudy: "<h2>Pr\u00e9-Produ\u00e7\u00e3o</h2>\n\n<h3>Ideia &amp; Hist\u00f3ria</h3>\n<p>A personagem e o universo foram conceptualizados na cadeira de Ilustra\u00e7\u00e3o. A narrativa centra-se na invisibilidade dentro de uma sociedade totalmente monitorizada: uma IA procura uma figura mascarada cuja identidade permanece oculta por detr\u00e1s de ficheiros corrompidos e protocolos esquecidos.</p>\n\n<h3>Gui\u00e3o</h3>\n<p>Foi escrito um gui\u00e3o completo, estruturado em torno dos principais momentos narrativos do teaser.</p>\n\n<h3>Design</h3>\n<p>Estudos extensivos de personagem definiram a silhueta, os detalhes da armadura e uma paleta escura + vermelho que comunica d\u00e9cadas de combate e perigo. Estudos de ambiente estabeleceram uma cidade futurista dominada por azuis, com acentos a laranja, arquitetura de grande escala e ilumina\u00e7\u00e3o artificial.</p>\n\n<h2>Produ\u00e7\u00e3o</h2>\n\n<h3>Layout</h3>\n<p>A composi\u00e7\u00e3o de cenas, o enquadramento de c\u00e2mara e o blocking dos tr\u00eas ambientes principais (corredor inicial, cidade, corredor misterioso) foram desenvolvidos a partir de block-outs simples para fixar escala, profundidade e staging.</p>\n\n<h3>Modela\u00e7\u00e3o</h3>\n<p>O mundo completo foi modelado de raiz:</p>\n<ul>\n<li>Armadura, acess\u00f3rios e arma do protagonista</li>\n<li>Nave principal e seis naves secund\u00e1rias</li>\n<li>Comboio futurista e respetiva linha</li>\n<li>15 edif\u00edcios \u00fanicos</li>\n</ul>\n<p>A cidade foi preenchida com <strong>Geometry Nodes</strong> (cole\u00e7\u00f5es com pesos que privilegiam edif\u00edcios mais baixos para um horizonte natural). Os edif\u00edcios distantes foram substitu\u00eddos por cart\u00f5es de parallax para manter a cena leve no equipamento dispon\u00edvel.</p>\n\n<h3>Texturas</h3>\n<p>Os materiais foram constru\u00eddos \u00e0 m\u00e3o nos <strong>Shading Nodes</strong> do Blender, incluindo uma armadura met\u00e1lica vermelha propositadamente desgastada pensada para contar visualmente o hist\u00f3rico de combate da personagem.</p>\n\n<h3>Rigging</h3>\n<p>Foi criado e pesado manualmente um armature personalizado. O <strong>Mixamo</strong> foi depois usado para automatizar o skinning e o weight painting.</p>\n\n<h3>Anima\u00e7\u00f5es</h3>\n<p>As anima\u00e7\u00f5es de caminhada e ajoelhar-para-disparar do Mixamo foram retargetadas via add-on no Blender. As naves foram animadas de forma procedural ao longo de um percurso com Geometry Nodes, em vez de animar cada uma \u00e0 m\u00e3o.</p>\n\n<h3>VFX</h3>\n<p>Gr\u00e1ficos de HUD e interface que sugerem a procura da IA foram constru\u00eddos diretamente no Blender, juntamente com nevoeiro volum\u00e9trico para atmosfera e escala.</p>\n\n<h3>Ilumina\u00e7\u00e3o</h3>\n<p>Ilumina\u00e7\u00e3o cinematogr\u00e1fica minimalista (Spot, Sun e Area lights) foi ajustada para o ambiente noturno da cidade e para o corredor misterioso.</p>\n\n<h3>Renderiza\u00e7\u00e3o</h3>\n<p>O <strong>Cycles</strong> foi escolhido em vez do EEVEE pela superior qualidade de luz, sombras e reflexos. Foi utilizada uma render farm externa porque alguns frames ultrapassaram as 10 horas localmente.</p>\n\n<h2>P\u00f3s-Produ\u00e7\u00e3o</h2>\n\n<h3>Compositing</h3>\n<p>O <strong>Compositor do Blender</strong> (glare/bloom e ajustes finais de imagem) foi aplicado de forma consistente em todas as cenas.</p>\n\n<h3>Edi\u00e7\u00e3o &amp; VFX 2D</h3>\n<p>A montagem final foi feita no <strong>Premiere Pro</strong>. Uma passagem de VFX em estilo glitch, corre\u00e7\u00e3o de cor com <strong>Lumetri</strong> e transi\u00e7\u00f5es cronometradas (dissolu\u00e7\u00f5es cruzadas, raios volum\u00e9tricos, vazamento VR, rolagem) foram realizadas no <strong>After Effects</strong>.</p>\n\n<h3>Sonoriza\u00e7\u00e3o</h3>\n<p>A banda sonora foi encomendada a um compositor externo. Os efeitos sonoros foram obtidos e aplicados no Premiere Pro.</p>\n\n<h2>Resultado F\u00edsico</h2>\n<p>A malha da personagem foi otimizada, reposicionada e preparada para impress\u00e3o 3D, resultando nas primeiras miniaturas f\u00edsicas do projeto.</p>",
        },
      },
    },
  ],
  graphic: [
    {
      id: 'graphic-icon-library',
      date: '2026-07',
      title: 'Icon Library',
      tags: ['Icon Design'],
      link: 'https://www.behance.net/gallery/253470149/Icon-Library-UrbanEye',
      image: 'images/work/commissions/urbaneyept-icon-library.webp',
      description: 'A custom UI icon set designed for UrbanEyePT’s product interface, covering actions like editing, sharing, image uploads, notifications and layout views.',
      i18n: {
        pt: {
          title: 'Biblioteca de Ícones',
          description: 'Um conjunto de ícones de interface desenhado à medida para o produto da UrbanEyePT, cobrindo ações como edição, partilha, carregamento de imagens, notificações e vistas de layout.',
        },
      },
    },
  ],
  // Each tile links to its own internal case-study page (see
  // commission-template.html / commission-template-multi.html) rather
  // than an outside site. The client name is a proper noun, so there's
  // nothing to translate here - the page itself carries the copy.
  commissions: [
    { title: 'UrbanEyePT', date: '2026-07', tags: ['Graphic Design', '3D Modelling'], link: 'commission-urbaneyept.html', image: 'images/work/commissions/urbaneyept-mosaic.webp' },
  ],
  // One tile per row, full width - set up in styles.css via the
  // "grid-full" class applied automatically to this category below.
  contests: [
    {
      id: 'contests-jorge',
      date: '2024-06', // Micro Jam 017: 28-30 June 2024
      title: 'Jorge',
      tags: ['Game Jam!'],
      link: 'https://fmag.itch.io/jorge',
      image: 'images/work/contests/jorge-cover.webp',
      fit: 'contain',
      downloadUrl: 'files/jorge-descriptive-memory.pdf',
      viewUrl: 'https://acrobat.adobe.com/id/urn:aaid:sc:eu:b65756da-3ff8-4b00-8046-59eacebe818a',
      description: 'A survival game made in 48 hours for Micro Jam 017: Islands, where a castaway named Roberto Rambo must escape a volcanic archipelago. Built with a 3-person team (Francisco Magueijo and Tomás Gonçalves on programming); I created every 2D art asset in the game - environments, props, items and enemy sprites - using Aseprite for the first time.',
      i18n: {
        pt: {
          description: 'Um jogo de sobrevivência feito em 48 horas para a Micro Jam 017: Islands, em que um náufrago chamado Roberto Rambo tem de escapar de um arquipélago vulcânico. Feito com uma equipa de 3 pessoas (Francisco Magueijo e Tomás Gonçalves na programação); criei todos os assets de arte 2D do jogo - ambientes, adereços, itens e sprites de inimigos - usando Aseprite pela primeira vez.',
        },
      },
    },
  ],
  games: [],
  '3dprint': [
    {
      id: '3dprint-mysterybox',
      date: '2025/2026-01', // 3rd year, 1st semester 2025/2026 (report Jan 2026)
      title: 'Mystery Box - Mystery Travel',
      tags: ['3D Printing', 'University Work'],
      link: '',
      image: 'images/work/3dprint/mysterybox.webp',
      images: ['images/work/3dprint/mysterybox-b.webp', 'images/work/3dprint/mysterybox-c.webp'],
      downloadUrl: 'files/mystery-box-project-report.pdf',
      description: "A university project for Design de Interfaces e Usabilidade III (3rd year, Communication Design and Audiovisual, ESART), built with a 3-person team (João Teixeira and Tiago Crispim): Mystery Travel, a surprise travel service centred on a physical Mystery Box. The box holds a symbolic coin and an NFC tag that opens a companion app revealing the trip. I designed the box itself in Blender - including the world-map side panels and lid branding - and sent it out for 3D printing (PLA); I was also responsible for the transition from the visual design into the app prototype using Adobe XD.",
      i18n: {
        pt: {
          description: 'Um projeto académico para Design de Interfaces e Usabilidade III (3.º ano, Design de Comunicação e Audiovisual, ESART), feito com uma equipa de 3 pessoas (João Teixeira e Tiago Crispim): Mystery Travel, um serviço de viagens surpresa centrado numa Mystery Box física. A caixa contém uma moeda simbólica e uma tag NFC que abre uma app complementar a revelar a viagem. Desenhei a própria caixa em Blender - incluindo os painéis laterais com o mapa-múndi e a marca na tampa - e enviei-a para impressão 3D (PLA); fui também responsável pela transição do design visual para o protótipo da app em Adobe XD.',
        },
      },
    },
  ],
};

// Drafts marked "hidden: true" are dropped here, once, so every page
// below (Work grid, project.html, Best Projects, home) simply never sees
// them.
Object.keys(PROJECTS).forEach((category) => {
  PROJECTS[category] = PROJECTS[category].filter((project) => !project.hidden);
});

/* ---------- Best Projects (best-projects.html) ----------
   A short, hand-picked list for the "See my best projects" page.
   References existing projects by "id" (same PROJECTS object above, so
   there's nothing to duplicate or keep in sync) - each keeps its normal
   link/behaviour (3D / Graphic Design tiles still route
   through project.html, exactly as they do on the Work page).

   BEST_PROJECTS_EXTRA is for the one exception: the UrbanEyePT Instagram
   post isn't a standalone entry anywhere in PROJECTS (it's one of two
   works shown inside the UrbanEyePT commission page), so it's listed
   here directly with its own real link - kept identical to the link
   used on that commission page (straight to Instagram, new tab). It
   takes the same optional "i18n" block as a normal project. */
const BEST_PROJECTS = {
  '3d': ['3d-009', '3d-007', '3d-006', '3d-003'],
  graphic: ['graphic-icon-library'],
};
const BEST_PROJECTS_EXTRA = {
  '3d': [
    {
      title: 'UrbanEyePT - Instagram Post',
      date: '2026-07',
      tags: ['3D Modelling'],
      image: 'images/work/commissions/urbaneyept-mosaic.webp',
      link: 'https://www.instagram.com/urbaneyept/',
      i18n: { pt: { title: 'UrbanEyePT - Publicação no Instagram' } },
    },
  ],
  graphic: [],
};

/* ---------- Homepage: selected work ----------
   The three tiles under the hero on index.html, in order - the first
   one is shown large. Ids from PROJECTS (picked from BEST_PROJECTS: an
   interior environment, a procedural animation and a graphic design
   piece, to show range). */
const HOME_FEATURED = ['3d-007', '3d-003', 'graphic-icon-library'];

const ICONS = {
  download:
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>',
  play:
    '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  view:
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
};

/* ---------- Language helpers ----------
   i18n.js is loaded first (in <head>), so I18N is ready by the time
   this file runs. These four wrappers are all the rest of the file
   needs to know about translation:

   - t()            UI copy, from the dictionary in i18n.js
   - titleOf() /
     descriptionOf() project copy, from PROJECTS[...].i18n
   - tagsOf()       project tags, translated via i18n.js

   Anything a language switch changes has to be redrawn, so each
   renderer below registers itself with onLanguageChange(). */
const t = (key, vars) => I18N.t(key, vars);
const localized = (project) => (project.i18n && project.i18n[I18N.language]) || {};
const titleOf = (project) => localized(project).title || project.title;
const descriptionOf = (project) => localized(project).description || project.description;
const caseStudyOf = (project) => localized(project).caseStudy || project.caseStudy || '';
const tagsOf = (project) => (project.tags || []).map((tag) => I18N.tTag(tag));

// "date" -> readable text in the current language. Accepts 'YYYY',
// 'YYYY-MM' or a range 'start/end' (see "date" in PROJECTS above).
//   dateOf(p)        "July 2025" / "julho de 2025", "2025 – April 2026"
//   dateOf(p, true)  years only, for tiles: "2025", "2025–2026"
const DATE_LOCALES = { en: 'en-GB', pt: 'pt-PT' };
function dateOf(project, yearsOnly = false) {
  if (!project.date) return '';
  const parts = String(project.date).split('/').map((part) => {
    const [year, month] = part.split('-').map(Number);
    return { year, month };
  });
  const monthYear = new Intl.DateTimeFormat(DATE_LOCALES[I18N.language] || I18N.language, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const one = ({ year, month }) =>
    yearsOnly || !month ? String(year) : monthYear.format(new Date(Date.UTC(year, month - 1, 1)));
  if (parts.length === 1) return one(parts[0]);
  const [from, to] = parts;
  if (yearsOnly) return from.year === to.year ? String(from.year) : `${from.year}–${to.year}`;
  return `${one(from)} – ${one(to)}`;
}

const languageListeners = [];
function onLanguageChange(render) {
  languageListeners.push(render);
}
document.addEventListener('i18n:change', () => languageListeners.forEach((render) => render()));

/* Project titles are data, and several tiles are built as HTML strings,
   so everything interpolated into markup goes through this first - an
   apostrophe or angle bracket in a title should show up as text, not
   break the tile around it. */
const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

/* sessionStorage is blocked outright in some privacy modes. Losing
   "which tab was I on" is fine; throwing on every page load is not. */
const session = {
  get(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* ignore - the page works without it */
    }
  },
};

/* ---------- Nav menu toggle ---------- */
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
  });
}
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => nav && nav.classList.remove('open'));
});

/* ---------- Footer year (contact page only) ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- "Back" links always return to exactly where you were ----------
   Runs on every page. Two separate things happen here:

   1. The plain "Work" nav link (in the header, on every page) always
      goes to the Work page itself, restoring whichever category tab was
      last active there - it should never redirect to a different list
      page like Best Projects.

   2. Every "← Back to ..." link/button (marked with [data-smart-back] -
      used on commission pages, project.html, and any future detail
      page) returns to whichever list page the person actually arrived
      from - the Work page (with its tab) OR the Best Projects page -
      and its label updates to match ("Back to Work" / "Back to Best
      Projects"). This applies automatically to any future page that
      marks its own "back" links this way; no per-page setup needed.

   What's stored is the label's translation KEY, not the label itself,
   so a visitor who switches language mid-visit gets the back link in
   the language they're reading now, not the one they arrived in. */
(function restoreSmartBackLinks() {
  const savedCategory = session.get('activeWorkCategory');
  if (savedCategory) {
    document.querySelectorAll('a[href="work.html"]:not([data-smart-back])').forEach((link) => {
      link.href = `work.html?tab=${encodeURIComponent(savedCategory)}`;
    });
  }

  function updateBackLinks() {
    const lastPage = session.get('lastListPage');
    const labelKey = session.get('lastListLabelKey') || 'back.work';
    document.querySelectorAll('[data-smart-back]').forEach((link) => {
      if (lastPage) link.href = lastPage;
      link.textContent = t('back.template', { target: t(labelKey) });
    });
  }

  updateBackLinks();
  onLanguageChange(updateBackLinks);
})();

/* ---------- Shared helper: thumbnail path ----------
   Every full-size image in PROJECTS has a matching small thumbnail next
   to it (images/.../thumbs/<same filename>). Used by the Work page grid
   for categories whose tiles render small, to keep pages light -
   especially on mobile. */
function toThumbPath(imagePath) {
  const parts = imagePath.split('/');
  const filename = parts.pop();
  parts.push('thumbs', filename);
  return parts.join('/');
}

/* ---------- Work page: category tabs + tag search + gallery ---------- */
const galleryGrid = document.querySelector('[data-gallery-grid]');

if (galleryGrid) {
  // A tab marked "hidden" in work.html (currently Games, until it has
  // projects) is skipped entirely - it can't be opened, not even with
  // ?tab=games or a remembered choice. Remove the attribute to bring it back.
  const tabs = document.querySelectorAll('[data-tab]:not([hidden])');
  const availableCategories = [...tabs].map((tab) => tab.dataset.tab);
  const searchInput = document.querySelector('[data-gallery-search]');
  const tagOptions = document.getElementById('tag-options');

  const VARIANTS = ['gal-v1', 'gal-v2', 'gal-v3', 'gal-v4'];
  const FULL_WIDTH_CATEGORIES = ['contests'];
  // Categories whose tiles open the shared project.html detail page
  // instead of linking straight out. Commissions is deliberately left
  // out - it already links to its own dedicated case-study page.
  const DETAIL_PAGE_CATEGORIES = ['3d', 'graphic', 'contests', 'games', '3dprint'];

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('tab');
  const isAvailable = (category) => Boolean(category && PROJECTS[category] && availableCategories.includes(category));
  let activeCategory =
    (isAvailable(requestedCategory) ? requestedCategory : null) ||
    (isAvailable(session.get('activeWorkCategory')) ? session.get('activeWorkCategory') : null) ||
    '3d';

  function isExternalLink(link) {
    return /^https?:\/\//i.test(link);
  }

  function buildTile(project, index, category) {
    const variant = VARIANTS[index % VARIANTS.length];
    const imgClass = project.fit === 'contain' ? 'gallery-img contain' : 'gallery-img';
    const title = titleOf(project);
    const tags = tagsOf(project).join(' · ');
    // Full-width tiles (Contests) can render quite large, so they keep the
    // full-size image. Every other grid is small (3-column, or 1-column on
    // mobile but still narrow), so those use the pre-generated thumbnail -
    // meaningfully lighter, especially on phones.
    const isFullWidth = FULL_WIDTH_CATEGORIES.includes(category);
    const gridImageSrc = project.image ? (isFullWidth ? project.image : toThumbPath(project.image)) : '';
    const visual = project.image
      ? `<img class="${imgClass}" src="${esc(gridImageSrc)}" alt="${esc(title)}" loading="lazy" decoding="async">`
      : `<div class="gallery-visual ${variant}"><div class="gallery-shape"></div></div>`;

    // Most categories route through the shared project detail page, which
    // shows a description + skills before sending people to the outside
    // link - always same-tab since it's part of this site.
    if (DETAIL_PAGE_CATEGORIES.includes(category) && project.id) {
      const el = document.createElement('a');
      el.className = 'gallery-item';
      el.href = `project.html?id=${encodeURIComponent(project.id)}`;
      el.innerHTML = `
        ${visual}
        <span class="gallery-tag">${esc(tags)}</span>
        <div class="gallery-caption"><h3>${esc(title)}</h3><p>${esc([dateOf(project, true), t('gallery.viewDetails')].filter(Boolean).join(' · '))}</p></div>
      `;
      return el;
    }

    // Fallback - used by Commissions, which link straight to their own
    // dedicated case-study page rather than the generic project template.
    const hasLink = Boolean(project.link);
    const el = document.createElement(hasLink ? 'a' : 'div');
    el.className = 'gallery-item';
    if (hasLink) {
      el.href = project.link;
      if (isExternalLink(project.link)) {
        el.target = '_blank';
        el.rel = 'noopener';
      }
      // relative links (internal pages, e.g. commission case studies)
      // intentionally open in the same tab.
    } else {
      el.classList.add('no-link');
    }

    let caption = t('gallery.noLink');
    if (hasLink) {
      caption = isExternalLink(project.link) ? t('gallery.viewProject') : t('gallery.viewCase');
    }
    caption = [dateOf(project, true), caption].filter(Boolean).join(' · ');

    el.innerHTML = `
      ${visual}
      <span class="gallery-tag">${esc(tags)}</span>
      <div class="gallery-caption"><h3>${esc(title)}</h3><p>${esc(caption)}</p></div>
    `;

    return el;
  }

  // Search runs against the tags as they're shown on screen, so typing
  // "modelação" works in Portuguese and "modelling" works in English.
  function matchesQuery(project, terms) {
    if (terms.length === 0) return true;
    const tags = tagsOf(project).map((tag) => tag.toLowerCase());
    return terms.every((term) => tags.some((tag) => tag.includes(term)));
  }

  // Rebuilds the search suggestions from whatever tags actually exist in
  // the active category, so categories never share a keyword list.
  function updateTagSuggestions(category) {
    const projects = PROJECTS[category] || [];
    const uniqueTags = [...new Set(projects.flatMap((project) => tagsOf(project)))];
    if (tagOptions) {
      tagOptions.innerHTML = uniqueTags.map((tag) => `<option value="${esc(tag)}">`).join('');
    }
    if (searchInput) {
      searchInput.placeholder = uniqueTags.length
        ? t('gallery.searchHint', { tag: uniqueTags[0] })
        : t('gallery.searchFallback');
    }
  }

  function renderGallery() {
    galleryGrid.classList.toggle('grid-full', FULL_WIDTH_CATEGORIES.includes(activeCategory));
    galleryGrid.innerHTML = '';
    const rawQuery = (searchInput ? searchInput.value : '').trim();
    const terms = rawQuery
      .split(',')
      .map((term) => term.trim().toLowerCase())
      .filter(Boolean);
    const allProjects = PROJECTS[activeCategory] || [];
    const projects = allProjects.filter((project) => matchesQuery(project, terms));

    if (allProjects.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'gallery-empty';
      empty.textContent = t('gallery.empty');
      galleryGrid.appendChild(empty);
      return;
    }

    if (projects.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'gallery-empty';
      const tagList = terms.map((term) => `"${term}"`).join(', ');
      empty.textContent = t('gallery.noMatches', { tags: tagList });
      galleryGrid.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    projects.forEach((project, index) => fragment.appendChild(buildTile(project, index, activeCategory)));
    galleryGrid.appendChild(fragment);
  }

  function syncTabs() {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === activeCategory;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  }

  function rememberCategory() {
    session.set('activeWorkCategory', activeCategory);
    session.set('lastListPage', `work.html?tab=${encodeURIComponent(activeCategory)}`);
    session.set('lastListLabelKey', 'back.work');
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.tab === activeCategory) return;
      activeCategory = tab.dataset.tab;
      syncTabs();
      rememberCategory();
      if (searchInput) searchInput.value = '';
      updateTagSuggestions(activeCategory);
      renderGallery();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderGallery);
  }

  // Reflect the restored category in the tab bar, then clean up the URL
  // so refreshing the page doesn't keep re-appending ?tab=...
  rememberCategory();
  syncTabs();
  if (requestedCategory) {
    window.history.replaceState({}, '', window.location.pathname);
  }

  updateTagSuggestions(activeCategory);
  renderGallery();

  // A tag typed in one language won't match the other, so the box is
  // cleared rather than silently showing "no results".
  onLanguageChange(() => {
    if (searchInput) searchInput.value = '';
    updateTagSuggestions(activeCategory);
    renderGallery();
  });
}

/* ---------- Project detail page (project.html?id=...) ----------
   Looks up the requested id in PROJECTS (every category except
   Commissions, which uses its own dedicated pages), then fills in the
   title, skill tags, cover image, description, and a "View full
   project" button linking out - plus download/view buttons for any
   attached document (see Jorge's PDF for an example).

   Written so it can be run again from scratch when the language
   changes: every part it owns is cleared first. */
(function renderProjectDetail() {
  const titleEl = document.querySelector('[data-project-title]');
  if (!titleEl) return;

  const eyebrowEl = document.querySelector('[data-project-eyebrow]');
  const skillsEl = document.querySelector('[data-project-skills]');
  const dateWrapEl = document.querySelector('[data-project-date-wrap]');
  const dateEl = document.querySelector('[data-project-date]');
  const coverWrapEl = document.querySelector('[data-project-cover-wrap]');
  const coverEl = document.querySelector('[data-project-cover]');
  const descEl = document.querySelector('[data-project-description]');
  const caseStudyWrapEl = document.querySelector('[data-project-casestudy-wrap]');
  const caseStudyEl = document.querySelector('[data-project-casestudy]');
  const galleryEl = document.querySelector('[data-project-gallery]');
  const actionsEl = document.querySelector('[data-project-actions]');

  const id = new URLSearchParams(window.location.search).get('id');

  let found = null;
  let foundCategory = null;
  Object.entries(PROJECTS).forEach(([category, list]) => {
    list.forEach((project) => {
      if (project.id && project.id === id) {
        found = project;
        foundCategory = category;
      }
    });
  });

  // YouTube video in the cover slot. Until someone presses play it's
  // just the cover image with a play button - no YouTube player, scripts
  // or cookies are loaded, so the page stays as light as any other.
  // Pressing play swaps in the (privacy-enhanced) embed, already playing.
  function renderVideo(project, title) {
    coverWrapEl.style.display = '';
    coverWrapEl.classList.add('is-video');
    coverEl.hidden = true;

    // A language switch re-runs render(); don't stop a video mid-play.
    const playing = coverWrapEl.querySelector('iframe');
    if (playing) {
      playing.title = t('project.videoTitle', { title });
      return;
    }

    let facade = coverWrapEl.querySelector('.video-facade');
    if (!facade) {
      facade = document.createElement('button');
      facade.type = 'button';
      facade.className = 'video-facade';
      facade.addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.video)}?autoplay=1&rel=0`;
        iframe.title = t('project.videoTitle', { title: titleOf(project) });
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        facade.replaceWith(iframe);
        iframe.focus();
      });
      coverWrapEl.appendChild(facade);
    }
    facade.setAttribute('aria-label', t('project.playVideo', { title }));
    facade.innerHTML = `
      ${project.image ? `<img class="video-poster" src="${esc(project.image)}" alt="" decoding="async">` : ''}
      <span class="video-play">${ICONS.play}</span>
      <span class="video-label">${esc(t('project.watchTeaser'))}</span>
    `;
  }

  // Everything added by the last run, so a language switch doesn't
  // stack a second set of buttons or skill pills on top of the first.
  function resetActions() {
    const backBtn = actionsEl.querySelector('[data-smart-back]');
    [...actionsEl.children].forEach((child) => {
      if (child !== backBtn) child.remove();
    });
    return backBtn;
  }

  function render() {
    skillsEl.innerHTML = '';
    const backBtn = resetActions();

    // This page sets its own description (per project, per language), so
    // its <meta name="description"> has no data-i18n-attr for i18n.js to
    // overwrite.
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t('meta.project.desc');

    if (!found) {
      document.title = t('meta.project.title');
      eyebrowEl.textContent = t('project.eyebrow');
      titleEl.textContent = t('project.notFound.title');
      descEl.innerHTML = t('project.notFound.body');
      coverWrapEl.style.display = 'none';
      skillsEl.style.display = 'none';
      if (dateWrapEl) dateWrapEl.hidden = true;
      if (caseStudyWrapEl) caseStudyWrapEl.style.display = 'none';
      if (galleryEl) galleryEl.style.display = 'none';
      return;
    }

    const title = titleOf(found);
    document.title = `${title} - Ruben Alves`;
    // Search engines run this page's script, so give each project its own
    // description (first ~155 characters of its text) instead of the
    // generic one.
    if (metaDesc) {
      const plain = String(descriptionOf(found) || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (plain) metaDesc.content = plain.length > 155 ? `${plain.slice(0, 152).replace(/\s+\S*$/, '')}...` : plain;
    }
    eyebrowEl.textContent = t(`cat.${foundCategory}`).toUpperCase();
    titleEl.textContent = title;

    if (found.video) {
      renderVideo(found, title);
    } else if (found.image) {
      coverWrapEl.style.display = '';
      coverEl.src = found.image;
      coverEl.alt = title;
      coverEl.classList.toggle('contain', found.fit === 'contain');
    } else {
      coverWrapEl.style.display = 'none';
    }

    if (dateWrapEl) {
      dateEl.textContent = dateOf(found);
      dateWrapEl.hidden = !found.date;
    }

    skillsEl.style.display = '';
    tagsOf(found).forEach((tag) => {
      const pill = document.createElement('span');
      pill.className = 'tool-pill';
      pill.textContent = tag;
      skillsEl.appendChild(pill);
    });

    if (galleryEl) {
      galleryEl.innerHTML = '';
      const extraImages = found.images || [];
      // These render as small 3-up tiles, so they load the thumbnail;
      // the full-size file is only fetched if someone zooms into it.
      extraImages.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'project-gallery-item';
        const img = document.createElement('img');
        img.src = toThumbPath(src);
        img.dataset.full = src;
        img.alt = t('project.galleryAlt', { title, n: i + 2 });
        img.loading = 'lazy';
        img.decoding = 'async';
        item.appendChild(img);
        galleryEl.appendChild(item);
      });
      galleryEl.style.display = extraImages.length > 0 ? '' : 'none';
    }

    descEl.innerHTML = descriptionOf(found) || t('project.descFallback');

    const caseStudyHtml = caseStudyOf(found);
    if (caseStudyEl && caseStudyWrapEl) {
      if (caseStudyHtml) {
        caseStudyEl.innerHTML = caseStudyHtml;
        caseStudyWrapEl.style.display = '';
      } else {
        caseStudyEl.innerHTML = '';
        caseStudyWrapEl.style.display = 'none';
      }
    }

    // Extra buttons inserted before the existing "Back to ..." button:
    // the outside link (if any), then download/view for an attached doc.
    if (found.link) {
      const linkBtn = document.createElement('a');
      linkBtn.className = 'button button-dark';
      linkBtn.href = found.link;
      linkBtn.target = '_blank';
      linkBtn.rel = 'noopener';
      linkBtn.innerHTML = `${esc(t('project.viewFull'))} <span>↗</span>`;
      actionsEl.insertBefore(linkBtn, backBtn);
    }
    if (found.video) {
      const ytBtn = document.createElement('a');
      ytBtn.className = 'button button-light';
      ytBtn.href = `https://www.youtube.com/watch?v=${encodeURIComponent(found.video)}`;
      ytBtn.target = '_blank';
      ytBtn.rel = 'noopener';
      ytBtn.innerHTML = `${esc(t('project.watchYoutube'))} <span>↗</span>`;
      actionsEl.insertBefore(ytBtn, backBtn);
    }
    if (found.downloadUrl) {
      const dlBtn = document.createElement('a');
      dlBtn.className = 'button button-light button-icon';
      dlBtn.href = found.downloadUrl;
      dlBtn.setAttribute('download', '');
      dlBtn.innerHTML = `${ICONS.download} ${esc(t('project.downloadPdf'))}`;
      actionsEl.insertBefore(dlBtn, backBtn);
    }
    if (found.viewUrl) {
      const viewBtn = document.createElement('a');
      viewBtn.className = 'button button-light button-icon';
      viewBtn.href = found.viewUrl;
      viewBtn.target = '_blank';
      viewBtn.rel = 'noopener';
      viewBtn.innerHTML = `${ICONS.view} ${esc(t('project.viewPdf'))}`;
      actionsEl.insertBefore(viewBtn, backBtn);
    }
  }

  render();
  onLanguageChange(render);
})();

/* ---------- Best Projects page (best-projects.html) ---------- */
(function renderBestProjects() {
  const threeDGrid = document.querySelector('[data-best-3d]');
  if (!threeDGrid) return;

  // So "← Back to ..." links on project.html (reached by clicking a tile
  // here) return to this page instead of defaulting to the Work page.
  session.set('lastListPage', 'best-projects.html');
  session.set('lastListLabelKey', 'back.best');

  const graphicGrid = document.querySelector('[data-best-graphic]');

  const VARIANTS = ['gal-v1', 'gal-v2', 'gal-v3', 'gal-v4'];

  function findById(id) {
    let found = null;
    Object.values(PROJECTS).forEach((list) => {
      list.forEach((project) => {
        if (project.id === id) found = project;
      });
    });
    return found;
  }

  function buildBestTile({ title, tags, image, href, external, year }, index) {
    const variant = VARIANTS[index % VARIANTS.length];
    const el = document.createElement('a');
    el.className = 'gallery-item';
    el.href = href;
    if (external) {
      el.target = '_blank';
      el.rel = 'noopener';
    }
    const visual = image
      ? `<img class="gallery-img" src="${esc(toThumbPath(image))}" alt="${esc(title)}" loading="lazy" decoding="async">`
      : `<div class="gallery-visual ${variant}"><div class="gallery-shape"></div></div>`;
    const caption = [year, external ? t('gallery.viewProject') : t('gallery.viewDetails')].filter(Boolean).join(' · ');
    el.innerHTML = `
      ${visual}
      <span class="gallery-tag">${esc(tags.join(' · '))}</span>
      <div class="gallery-caption"><h3>${esc(title)}</h3><p>${esc(caption)}</p></div>
    `;
    return el;
  }

  function renderSection(grid, category) {
    if (!grid) return;
    grid.innerHTML = '';
    let index = 0;
    (BEST_PROJECTS[category] || []).forEach((id) => {
      const project = findById(id);
      if (!project) return;
      grid.appendChild(
        buildBestTile(
          {
            title: titleOf(project),
            tags: tagsOf(project),
            image: project.image,
            href: `project.html?id=${encodeURIComponent(project.id)}`,
            external: false,
            year: dateOf(project, true),
          },
          index++
        )
      );
    });
    (BEST_PROJECTS_EXTRA[category] || []).forEach((item) => {
      grid.appendChild(
        buildBestTile(
          { title: titleOf(item), tags: tagsOf(item), image: item.image, href: item.link, external: true, year: dateOf(item, true) },
          index++
        )
      );
    });
  }

  function render() {
    renderSection(threeDGrid, '3d');
    renderSection(graphicGrid, 'graphic');
  }

  render();
  onLanguageChange(render);
})();

/* ---------- Homepage: selected work (index.html) ----------
   Three tiles from HOME_FEATURED: the first large on the left, the
   other two stacked beside it (one column on phones). Each opens its
   project page, and "Back to ..." there then returns to Home. */
(function renderHomeFeatured() {
  const grid = document.querySelector('[data-home-featured]');
  if (!grid) return;

  function find(id) {
    for (const [category, list] of Object.entries(PROJECTS)) {
      const project = list.find((p) => p.id === id);
      if (project) return { project, category };
    }
    return null;
  }

  grid.addEventListener('click', (event) => {
    if (!event.target.closest('.featured-item')) return;
    session.set('lastListPage', 'index.html');
    session.set('lastListLabelKey', 'back.home');
  });

  function render() {
    grid.innerHTML = '';
    HOME_FEATURED.map(find).filter(Boolean).forEach(({ project, category }, i) => {
      const title = titleOf(project);
      const isMain = i === 0;
      const el = document.createElement('a');
      el.className = `featured-item${isMain ? ' featured-main' : ''}`;
      el.href = `project.html?id=${encodeURIComponent(project.id)}`;
      // Thumbnail (640px) or full image (1400px) - the browser picks by
      // the tile's on-screen size, so the big tile stays sharp and the
      // small ones stay light.
      const image = project.image
        ? `<img src="${esc(toThumbPath(project.image))}"
             srcset="${esc(toThumbPath(project.image))} 640w, ${esc(project.image)} 1400w"
             sizes="${isMain ? '(max-width: 850px) 100vw, 58vw' : '(max-width: 850px) 100vw, 36vw'}"
             alt="" loading="lazy" decoding="async">`
        : '';
      el.innerHTML = `
        ${image}
        <span class="featured-arrow" aria-hidden="true">↗</span>
        <div class="featured-caption">
          <p class="featured-index">${esc([String(i + 1).padStart(2, '0'), t(`cat.${category}`), dateOf(project, true)].filter(Boolean).join(' · '))}</p>
          <h3>${esc(title)}</h3>
          <p class="featured-tags">${esc(tagsOf(project).join(' · '))}</p>
        </div>
      `;
      grid.appendChild(el);
    });
  }

  render();
  onLanguageChange(render);
})();

/* ---------- Project image lightbox ----------
   On project.html, clicking the cover image or any image in the extra
   gallery opens it larger in an overlay. Uses event delegation on
   document so it works no matter when those images get added to the
   page (they're inserted dynamically by renderProjectDetail above). */
(function projectLightbox() {
  const lightbox = document.querySelector('[data-lightbox]');
  if (!lightbox) return;

  lightbox.setAttribute('aria-hidden', 'true');
  const lightboxImg = lightbox.querySelector('[data-lightbox-img]');
  const closeBtn = lightbox.querySelector('[data-lightbox-close]');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('[data-project-cover-wrap] img:not(.video-poster), .project-gallery-item img');
    // Gallery tiles show a thumbnail but zoom to the full-size file.
    if (clickedImg) openLightbox(clickedImg.dataset.full || clickedImg.src, clickedImg.alt);
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* ---------- Visitor stats (GoatCounter) - off until a code is set ----------
   GoatCounter (goatcounter.com) is a free, open-source counter for
   personal sites: no cookies, no personal data, no consent banner
   needed for it. It shows which pages and projects get opened, and
   where visitors came from (LinkedIn, Behance...).

   To turn it on: sign up at https://www.goatcounter.com/signup, pick a
   code (e.g. "rubenalves" -> rubenalves.goatcounter.com), and put that
   code between the quotes below. Leave it empty and nothing is loaded.

   Each project counts separately (project.html?id=3d-009 etc), and
   local test copies (localhost, file://) are never counted. To stop
   your own visits being counted, open the site once with
   #toggle-goatcounter at the end of the address. */
const GOATCOUNTER_CODE = '';

(function visitorStats() {
  if (!GOATCOUNTER_CODE) return;
  if (window.location.protocol === 'file:' || /^(localhost|127\.|\[::1\])/.test(window.location.hostname)) return;
  // Count project pages by their ?id=, not as one "project.html".
  window.goatcounter = { path: () => window.location.pathname + window.location.search };
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = new URL('/count', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com').href;
  document.body.appendChild(script);
})();
