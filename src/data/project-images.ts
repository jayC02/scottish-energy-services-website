export type ProjectImage = {
  src: string;
  small?: string;
  smallWidth?: number;
  alt: string;
  position?: string;
  width?: number;
  height?: number;
  caption?: string;
  credit?: { name: string; source: string; license?: string; licenseUrl?: string };
};

// Supplied media, matched building photographs and explicitly labelled context views.
// Source/permission review: docs/PROJECT-CONTENT.md. Do not assume a credit grants reuse.
export const projectImages: Record<string, ProjectImage> = {
  'glasgow-airport': {
    src: '/images/projects/glasgow-airport-poster.webp',
    small: '/images/projects/glasgow-airport-poster-small.webp',
    alt: 'Glasgow Airport', position: '50% 54%'
  },
  'university-of-edinburgh': {
    src: '/images/projects/university-of-edinburgh-poster.webp',
    small: '/images/projects/university-of-edinburgh-poster-small.webp',
    alt: 'University of Edinburgh buildings', position: '50% 44%'
  },
  'st-james-quarter': {
    src: '/images/projects/st-james-centre-poster.webp',
    small: '/images/projects/st-james-centre-poster-small.webp',
    alt: 'St James Quarter in Edinburgh', position: '50% 47%'
  },
  'sec-armadillo': {
    src: '/images/projects/sec-armadillo-poster.webp',
    small: '/images/projects/sec-armadillo-poster-small.webp',
    alt: 'The SEC Armadillo beside the River Clyde', position: '50% 45%'
  },
  'kelvingrove-art-gallery': {
    src: '/images/projects/kelvingrove-art-gallery-poster.webp',
    small: '/images/projects/kelvingrove-art-gallery-poster-small.webp',
    alt: 'Kelvingrove Art Gallery and Museum', position: '50% 47%'
  },
  'glasgow-life': {
    "src": "/images/projects/glasgow-life-photo.webp",
    "alt": "Kelvin Hall in Glasgow",
    "width": 1280,
    "height": 672,
    "credit": {
      "name": "Tom Parnell",
      "source": "https://commons.wikimedia.org/wiki/File:Kelvin_Hall_-_view_from_N_with_2016_extension.jpg",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "small": "/images/projects/glasgow-life-photo-small.webp"
  },
  'moda-springside': {
    "src": "/images/projects/moda-springside-photo.webp",
    "alt": "The McEwan at Moda Springside in Edinburgh",
    "width": 1280,
    "height": 857,
    "credit": {
      "name": "Paul Zanre, via CDA",
      "source": "https://www.cda-group.co.uk/architecture-projects/the-mcewan-springside-edinburgh/"
    },
    "small": "/images/projects/moda-springside-photo-small.webp"
  },
  'uws-ayr': {
    "src": "/images/projects/uws-ayr-photo.webp",
    "alt": "University of the West of Scotland Ayr campus",
    "width": 693,
    "height": 555,
    "credit": {
      "name": "Goodreg3",
      "source": "https://commons.wikimedia.org/wiki/File:UWS,_Ayr_Campus.jpg",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "small": "/images/projects/uws-ayr-photo-small.webp"
  },
  'crossbasket-hotel': {
    "src": "/images/projects/crossbasket-hotel-photo.webp",
    "alt": "Crossbasket Castle hotel",
    "width": 640,
    "height": 481,
    "credit": {
      "name": "Elliott Simpson",
      "source": "https://commons.wikimedia.org/wiki/File:Crossbasket_House,_near_East_Kilbride_-_geograph.org.uk_-_1086499.jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  'rusacks-hotel': {
    "src": "/images/projects/rusacks-hotel-photo.webp",
    "alt": "Rusacks Hotel in St Andrews",
    "width": 1280,
    "height": 628,
    "credit": {
      "name": "Drkirstyross",
      "source": "https://commons.wikimedia.org/wiki/File:Rusacks_Hotel_landscape_panorama.jpg",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "small": "/images/projects/rusacks-hotel-photo-small.webp"
  },
  'seaton-house-hotel': {
    "src": "/images/projects/seaton-house-hotel-photo.webp",
    "alt": "Seaton House hotel in St Andrews",
    "width": 1280,
    "height": 720,
    "credit": {
      "name": "Seaton House",
      "source": "https://www.seatonhouse.com/"
    },
    "small": "/images/projects/seaton-house-hotel-photo-small.webp"
  },
  'clyde-shopping-centre': {
    "src": "/images/projects/clyde-shopping-centre-photo.webp",
    "alt": "Retail units inside Clyde Shopping Centre",
    "width": 1280,
    "height": 916,
    "credit": {
      "name": "Richard Sutcliffe",
      "source": "https://commons.wikimedia.org/wiki/File:Clyde_Shopping_Centre_-_geograph.org.uk_-_7178576.jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    "small": "/images/projects/clyde-shopping-centre-photo-small.webp"
  },
  'st-enoch-centre': {
    "src": "/images/projects/st-enoch-centre-photo.webp",
    "alt": "Entrance to St Enoch Centre in Glasgow",
    "width": 1280,
    "height": 853,
    "credit": {
      "name": "Postdlf",
      "source": "https://commons.wikimedia.org/wiki/File:St._Enoch_Centre_entrance.jpg",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/"
    },
    "small": "/images/projects/st-enoch-centre-photo-small.webp"
  },
  'theatre-royal-glasgow': {
    "src": "/images/projects/theatre-royal-glasgow-photo.webp",
    "alt": "Theatre Royal in Glasgow",
    "width": 1280,
    "height": 853,
    "credit": {
      "name": "Glaspark",
      "source": "https://commons.wikimedia.org/wiki/File:Theatre_Royal_(Page_Park_Architects_Facade).jpg",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "small": "/images/projects/theatre-royal-glasgow-photo-small.webp"
  },
  'motherwell-shopping-centre': {
    "src": "/images/projects/motherwell-shopping-centre-photo.webp",
    "alt": "Motherwell Shopping Centre",
    "width": 640,
    "height": 480,
    "credit": {
      "name": "Ross4587",
      "source": "https://commons.wikimedia.org/wiki/File:Motherwell_Shopping_Centre_-_geograph.org.uk_-_3710443.jpg",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  'forum-shopping-centre': {
    "src": "/images/projects/forum-shopping-centre-photo.webp",
    "alt": "The Forum Shopping Centre in Wallsend",
    "width": 640,
    "height": 425,
    "credit": {
      "name": "A McCarron",
      "source": "https://commons.wikimedia.org/wiki/File:The_Forum,_High_Street_West,_Wallsend_-_geograph.org.uk_-_578784.jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
  },
  'vita-edinburgh': {
    "src": "/images/projects/vita-edinburgh-photo.webp",
    "alt": "Vita Student Fountainbridge in Edinburgh",
    "width": 1280,
    "height": 854,
    "credit": {
      "name": "Vita Student",
      "source": "https://www.vitastudent.com/en/cities/edinburgh/fountainbridge/"
    },
    "small": "/images/projects/vita-edinburgh-photo-small.webp"
  },
  'mowi-ardessie': {
    "src": "/images/projects/mowi-ardessie-photo.webp",
    "alt": "The Mowi Ardessie broodstock facility during construction",
    "width": 1080,
    "height": 1080,
    "credit": {
      "name": "TSL Contractors, via Mowi",
      "source": "https://mowi.com/uk/blog/2024/12/03/construction-of-permanent-broodstock-facility-for-mowi-scotland-well-underway/"
    },
    "small": "/images/projects/mowi-ardessie-photo-small.webp"
  },
  'aldi-stores': {
    "src": "/images/projects/aldi-stores-photo.webp",
    "alt": "ALDI store at Westway Retail Park in Cumbernauld",
    "width": 1000,
    "height": 1000,
    "credit": {
      "name": "Smith Design",
      "source": "https://www.smithdesign.co.uk/project/westwayretailpark"
    },
    "small": "/images/projects/aldi-stores-photo-small.webp"
  },
  "station-house-glasgow": {
    "src": "/images/projects/station-house-glasgow-photo.webp",
    "alt": "Station House at St Enoch Square in Glasgow",
    "width": 1280,
    "height": 603,
    "small": "/images/projects/station-house-glasgow-photo-small.webp",
    "smallWidth": 640,
    "caption": "Station House exterior before redevelopment.",
    "credit": {
      "name": "CCG",
      "source": "https://www.c-c-g.co.uk/plans-to-transform-historic-st-enoch-square-station-building-approved/"
    }
  },
  "banchory-business-park": {
    "src": "/images/projects/banchory-business-park-photo.webp",
    "alt": "Aerial photograph of the trade park on Burn O’Bennie Road in Banchory",
    "width": 1090,
    "height": 562,
    "small": "/images/projects/banchory-business-park-photo-small.webp",
    "smallWidth": 640,
    "credit": {
      "name": "Lismore Real Estate",
      "source": "https://lismore-re.com/banchory-trade-park-banchory/"
    }
  },
  "old-courthouse-campbeltown": {
    "src": "/images/projects/old-courthouse-campbeltown-photo.webp",
    "alt": "The former courthouse on Bolgam Street in Campbeltown",
    "width": 992,
    "height": 760,
    "small": "/images/projects/old-courthouse-campbeltown-photo-small.webp",
    "smallWidth": 640,
    "caption": "Archive exterior photograph, published in 2018.",
    "credit": {
      "name": "Argyll and Bute Council",
      "source": "https://www.argyll-bute.gov.uk/news/2018/aug/brighter-future-campbeltown-old-courthouse"
    }
  },
  "love-loan-glasgow": {
    "src": "/images/projects/love-loan-glasgow-photo.webp",
    "alt": "Buildings within the Love Loan development in Glasgow",
    "width": 1280,
    "height": 853,
    "small": "/images/projects/love-loan-glasgow-photo-small.webp",
    "smallWidth": 640,
    "caption": "View of the wider Love Loan development.",
    "credit": {
      "name": "Love Loan / Chris Stewart Group",
      "source": "https://www.loveloan.co.uk/development/"
    }
  },
  "st-bees-boarding-house": {
    "src": "/images/projects/st-bees-boarding-house-photo.webp",
    "alt": "Buildings and grounds at St Bees School",
    "width": 1280,
    "height": 960,
    "small": "/images/projects/st-bees-boarding-house-photo-small.webp",
    "smallWidth": 640,
    "caption": "St Bees School campus shown.",
    "credit": {
      "name": "Airjevans",
      "source": "https://commons.wikimedia.org/wiki/File:StBeesSchoolFront.JPG",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    }
  },
  "spice-direct-warehouse": {
    "src": "/images/projects/spice-direct-warehouse-photo.webp",
    "alt": "Spice Direct warehouse and delivery vehicle in Glasgow",
    "width": 1280,
    "height": 720,
    "small": "/images/projects/spice-direct-warehouse-photo-small.webp",
    "smallWidth": 640,
    "credit": {
      "name": "Spice Direct Wholesale",
      "source": "https://spicedirectwholesale.co.uk/"
    }
  },
  "tytherington-high-school": {
    "src": "/images/projects/tytherington-high-school-photo.webp",
    "alt": "Learning resource centre at Tytherington School in Macclesfield",
    "width": 1200,
    "height": 630,
    "small": "/images/projects/tytherington-high-school-photo-small.webp",
    "smallWidth": 640,
    "caption": "Tytherington School campus shown.",
    "credit": {
      "name": "Image via Pozzoni Architecture",
      "source": "https://www.pozzoni.co.uk/projects/tytherington-high"
    }
  },
  "scarborough-college-boarding-house": {
    "src": "/images/projects/scarborough-college-boarding-house-photo.webp",
    "alt": "Scarborough College buildings viewed across the sports field",
    "width": 640,
    "height": 480,
    "caption": "College campus shown; the instruction concerns boarding accommodation.",
    "credit": {
      "name": "martin dawes",
      "source": "https://commons.wikimedia.org/wiki/File:Scarborough_College_and_Sportsfield_-_geograph.org.uk_-_1131863.jpg",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    "position": "50% 40%"
  },
  "adventure-planet-paisley": {
    "src": "/images/projects/adventure-planet-paisley-photo.webp",
    "alt": "Indoor play facilities at Adventure Planet in Paisley",
    "width": 1280,
    "height": 720,
    "small": "/images/projects/adventure-planet-paisley-photo-small.webp",
    "smallWidth": 640,
    "credit": {
      "name": "Adventure Planet",
      "source": "https://adventureplanet.co.uk/paisley/"
    }
  },
  "rutherglen-glencairn-fc": {
    "src": "/images/projects/rutherglen-glencairn-fc-photo.webp",
    "alt": "The football ground at Rutherglen Glencairn FC",
    "width": 1280,
    "height": 960,
    "small": "/images/projects/rutherglen-glencairn-fc-photo-small.webp",
    "smallWidth": 640,
    "credit": {
      "name": "Crowsus",
      "source": "https://commons.wikimedia.org/wiki/File:Glencairn_2023_1.jpg",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "position": "50% 60%"
  },
  "covault-polmadie": {
    "src": "/images/projects/covault-polmadie-photo.webp",
    "alt": "Published development visualisation of CoVault Polmadie beside Polmadie Road",
    "width": 1200,
    "height": 587,
    "small": "/images/projects/covault-polmadie-photo-small.webp",
    "smallWidth": 640,
    "caption": "Development visualisation published in 2022.",
    "credit": {
      "name": "Image via The Herald",
      "source": "https://www.heraldscotland.com/news/20119295.first-rate-commercial-facility-polmadie-nears-completion/"
    }
  }
};
