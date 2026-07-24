const so = {
  translation: {
    // Nav
    nav: {
      home: "Bogga Hore",
      about: "Ku Saabsan",
      chapters: "Xarumaha",
      news: "Wararka",
      events: "Dhacdooyinka",
      shareArticle: "La Wadaag Maqaal",
      programs: "Barnaamijyada",
      contact: "La Xiriir",
      getInvolved: "Ku Biir",
    },
    // Hero
    hero: {
      tagline: "Midnimo · Horumar · Wadajir",
      headline: "Midowga Bulshada Mustaqbalka Fiican",
      subheadline:
        "UMAD — Ururka Midnimada Adal — waxay xoojinaysaa bulshada iyada oo lagu saleynayo hal-abuurnimada, midnimada, iyo horumarinta joogtada ah ee dhulkayaga iyo soo-galootiga.",
      ctaLearnMore: "Wax Dheeraad ah",
      ctaJoinUs: "Nagu Soo Biir",
      ctaChapters: "Xarumaha Baadh",
    },
    // About
    about: {
      eyebrow: "Cidda Nahay",
      title: "Midnimo Dhis, Horumar Wadi",
      description:
        "UMAD waa urur caalami ah oo u heellantahay xoojinta bulshada iyada oo loo marayo horumarinta joogtada ah, waxbarashada, caafimaadka, iyo koboca dhaqaale.",
      vision: "Aragtida",
      visionText:
        "In la dhiso gobol ay bulshadu ku midoobayso, nabadda laga dareemayo, isdhexgalka laga helo, oo leh kheyraadka iyo xirfadaha looga baahan yahay in la gaaro horumarkooda dhaqaale-bulsheed adduunyada ka ilaalinaysa.",
      mission: "Hawsha",
      missionText:
        "In bulshada loo xoojiyo iyada oo loo sameeyo oo loo hirgeliyo xalal la mid ah meesha ka jiraan, kuwaas oo keeni doona faa'iidada guud ee dadweynaha gaar ahaan dadka ku nool xaaladaha baadiyaha.",
    },
    // Impact
    impact: {
      eyebrow: "Saameyntayada",
      title: "Farqi Dhabta ah Samaynaynta",
      description: "Tirooyinka ka muujinaya xillisnimadayada xoojinta bulshada",
      volunteers: "Iskaa Wax u Qabtayaasha",
      countries: "Wadamada La Adeegay",
      projects: "Mashaariicda La Dhameeyay",
      people: "Dadka La Gaaray",
    },
    // Chapters
    chapters: {
      eyebrow: "Xarumahayaga",
      title: "Shabakad Caalami ah, Hal Hadaf",
      description:
        "UMAD waxay shaqaysaa iyada oo loo marayo xarumaha kala duwan ee Waqooyiga Ameerika iyo Soomaaliya, mid walba oo adeegeysa bulshadeeda goboleedka.",
      viewChapter: "Xarunta Arag",
      ottawa: {
        name: "Xarunta Ottawa",
        location: "Ottawa, Kanada",
        description:
          "Adeegeysa bulshada Soomaalida ee caasimadda Kanada, iyadoo bixinaysa barnaamijyada dhaqanka, kalsoonida dhallinyarada, iyo horumarka bulshada.",
      },
      washington: {
        name: "Xarunta Washington",
        location: "Washington D.C., Maraykanka",
        description:
          "Bulshada Soomaalida-Mareykanka ee caasimadda US ku lug leh taageerida, waxbarashada, iyo barnaamijyada taageerada bulshada.",
      },
      somalia: {
        name: "Xarunta Soomaaliya",
        location: "Soomaaliya",
        description:
          "Hawlgallada dhulka ka socda ee keenaya badbaadada cuntada, helitaanka caafimaadka, iyo waxbarashada bulshada baadiyaha iyo kuwa aan la adeeg gaarin.",
      },
    },
    // Programs
    programs: {
      eyebrow: "Barnaamijyadayada",
      title: "Waxa Aan Samaynno",
      description:
        "UMAD waxay hirgelisaa barnaamijyo la yeedhay oo ka jawaaba baahiyaha ugu muhiimsan bulshadeena.",
      education: {
        title: "Waxbarasho",
        description:
          "Warshado waxbarasho dhijitaalka ah, deeqaha, iyo hindisayaasha dhismaha dugsiyada si loo baaxiyo helitaanka waxbarashada tayo leh.",
      },
      healthcare: {
        title: "Caafimaad",
        description:
          "Rugaha waaweyn ee gaadiidka, hubinta caafimaadka, iyo iskaashiyaasha si caafimaadka kahortagga iyo asaasiga loogu geeyo meelaha aan la gaadhnayn.",
      },
      foodSecurity: {
        title: "Badbaadada Cuntada",
        description:
          "Barnaamijyada taageerada beeraha iyo xoolaha ee xaqiijinaya in bulshadu naftooda ku soo noqon karto oo dakhli ka heli karto.",
      },
      environment: {
        title: "Deegaanka",
        description:
          "Mashaariicda beerta dhirta, tamarta cusboon, iyo dalxiiska eco-tourism ee ilaaliya kheyraadka dabiiciga ah.",
      },
      youth: {
        title: "Barnaamijyada Dhallinyarada",
        description:
          "Kalsoonida, tababarka hoggaanka, iyo ka qaybgalka shacabiga ee jiilka soo socda ee hogaamiyeyaasha bulshada.",
      },
      smallBusiness: {
        title: "Ganacsiga Yar",
        description:
          "Taageerida ganacsatada maxalliga ah ee maalgelin-yar ah, tababar, iyo helitaanka suuqyada goboleedka.",
      },
    },
    // News
    news: {
      eyebrow: "Wararka Ugu Dambeeyay",
      title: "La Warqabso",
      description:
        "Cusboonaysiinta xarumahayaga iyo barnaamijyada adduunka oo dhan.",
      readMore: "Wax Dheeraad ah Akhri",
      allChapters: "Dhammaan Xarumaha",
      viewAll: "Dhammaan Wararka Arag",
      by: "Qoray",
      relatedNews: "Maqaallada La xiriira",
    },
    // Events
    events: {
      eyebrow: "Dhacdooyinka Soo Socda",
      title: "Nagu Soo Biir",
      description:
        "Dhacdooyinka bulshada, ururinta lacagta, iyo warshado dhammaan xarumaha UMAD.",
      register: "Is Diiwaan Geli",
      learnMore: "Wax Dheeraad ah",
      allChapters: "Dhammaan Xarumaha",
      location: "Goobta",
      date: "Taariikhda",
      viewAll: "Dhammaan Dhacdooyinka Arag",
      searchPlaceholder: "Dhacdooyinka Baadh...",
    },
    // Get Involved
    involved: {
      eyebrow: "Ku Biir",
      title: "Qayb ka Noqo Isbedelka",
      description:
        "Ha ahaato in aad iskaa u shaqayso, lacag bixiso, ama farinta faafiso — ficil kasta waa muhiim.",
      volunteer: "Iskaa Wax u Qabd",
      donate: "Tabi",
      contact: "La Xiriir",
    },
    // Newsletter
    newsletter: {
      title: "Xiriirka Sii Hayso",
      description:
        "Is-diiwaan-geli si aad u hesho wararka ugu dambeeyay, war-gelinta dhacdooyinka, iyo warbixinnada saamaynta UMAD.",
      placeholder: "Cinwaankaaga iimaylka",
      subscribe: "Is Diiwaan Geli",
      success: "Waad ku mahadsan tahay is-diiwaan-gelintaada!",
    },
    // Footer
    footer: {
      tagline: "Midnimo · Horumar · Wadajir",
      description:
        "UMAD — Ururka Midnimada Adal — waxay u heellantahay xoojinta bulshada iyada oo loo marayo midnimada iyo horumarinta joogtada ah.",
      quickLinks: "Xiriiriyayaasha Degdegga ah",
      chapters: "Xarumaha",
      contact: "La Xiriir",
      rights: "Dhammaan xuquuqaha way dhawrsanyihiin.",
      language: "Luuqadda",
    },
    // Admin
    admin: {
      dashboard: "Guddiga",
      totalPosts: "Dhammaan Qoraalada",
      pendingApprovals: "Ansixinta Sugaysa",
      upcomingEvents: "Dhacdooyinka Soo Socda",
      users: "Isticmaalayaasha",
      newsManagement: "Maaraynta Wararka",
      eventManagement: "Maaraynta Dhacdooyinka",
      chapterManagement: "Maaraynta Xarumaha",
      userManagement: "Maaraynta Isticmaalayaasha",
      createPost: "Qoraal Samee",
      editPost: "Qoraalka Wax ka Badel",
      deletePost: "Qoraalka Tirtir",
      approve: "Ansixo",
      reject: "Diiday",
      viewPosts: "Qoraalada Arag",
      createEvent: "Dhacdada Samee",
      editEvent: "Dhacdada Wax ka Badel",
      manageRegistrations: "Diiwaan Gelinta Maaree",
      viewChapters: "Xarumaha Arag",
      editChapter: "Xarunta Wax ka Badel",
      roles: "Doorarka",
      superAdmin: "Maamulaha Guud",
      chapterAdmin: "Maamulaha Xarunta",
      contributor: "Gacangeliye",
    },
    // Chapter detail
    chapterDetail: {
      contactChapter: "Xarunta La Xiriir",
      volunteer: "Iskaa Wax u Qabd",
      viewEvents: "Dhacdooyinka Arag",
      aboutChapter: "Xarunta Ku Saabsan",
      history: "Taariikhda",
      purpose: "Ujeedada",
      community: "Bulshada La Adeegay",
      goals: "Hadafyada",
      leadership: "Kooxda Hoggaanka",
      programsInitiatives: "Barnaamijyada & Hindisayaasha",
      chapterNews: "Wararka Xarunta",
      chapterEvents: "Dhacdooyinka Xarunta",
      gallery: "Galeriida",
      volunteerSection: "Nala Iskaa u Shaqee",
      contactInfo: "Macluumaadka Xiriirka",
    },
    // General
    general: {
      learnMore: "Wax Dheeraad ah",
      viewAll: "Dhammaan Arag",
      readMore: "Wax Dheeraad ah Akhri",
      register: "Is Diiwaan Geli",
      close: "Xidh",
      search: "Baadh",
      filter: "Shaandhayn",
      bilingualNotice:
        "Boggan wuxuu ku qoran yahay laba luqadood: Ingiriisi iyo Soomaali.",
      loading: "Waa la rarayo...",
      notFound: "Bogga lama helin",
      backHome: "Bogga Hore u Noqo",
    },
    // About Page (extended)
    aboutPage: {
      heroTitle: "Midnimo Dhis, Horumar Wadi",
      heroDesc:
        "UMAD — Ururka Midnimada Adal — waa urur caalami ah oo u heellantahay xoojinta bulshada iyada oo loo marayo horumarinta joogtada ah, waxbarashada, caafimaadka, iyo koboca dhaqaale.",
      valuesEyebrow: "Waxa Nagu Hagaya",
      valuesTitle: "Qiyamkayaga Aasaasiga ah",
      value1Title: "Bulshada Horeba",
      value1Desc:
        "Go'aan walba oo aan gaarsiinaynno waxaa haga baahiyaha iyo farta bulshada aan u adeegno, gaadiidka Soomaaliya oo ilaa soo-galootiga.",
      value2Title: "Shaafafaad",
      value2Desc:
        "Nafta ayaan u xisaabtamaynaa deeqbiixiyeyaasha, ortada, iyo bulshadeena iyada oo loo marayo warbixi furan oo ku saabsan barnaamijyadayada iyo maaliyadda.",
      value3Title: "Midnimo Xadoodka ka Gudbaysa",
      value3Desc:
        "UMAD waxay xidh-xidh u samaynaysaa soo-galootiga iyo dhulka hooyo, iyagoo u beddelaysa aqoonsiga wadaagga ficil wadajir ah iyo saamayn gaar ah.",
      value4Title: "Hal-abuurnimo",
      value4Desc:
        "Xalalo ayaan u naqshadeynaa oo ku habboon xaaladaha dhulka, iyada oo la qaadanayo hab cusub oo ku saabsan beeraha, caafimaadka, waxbarashada, iyo tiknoolaajiga.",
      objectivesEyebrow: "Qodobadayada Diiradda",
      objectivesTitle: "Hadafyada",
      objectivesDesc:
        "Maaddaama hadafka koowaad uu yahay yaraynta saboolnimada, UMAD waxay bilaabaysaa, taageeraysaa, oo caawisaysaa maaliyadda mashaariicdda ee ka jawaabaya baahiyaha ugu muhiimsan bulshadeena:",
      obj1: "Xaqiijinta badbaadada cuntada (beeraha iyo xoolaha) halka ay u adeegto isha dakhliga si ay xooluhu uga baxaan saboolnimada daraha ah.",
      obj2: "Helitaanka caafimaadka iyo waxbarashada waa la kordhiyaa.",
      obj3: "Maalgalinta ganacsiyada yar-yar ee dhinaca isticmaalka kheyraadka dabiiciga ah ee gobolka (milixda, kalluumaysiga, macadinaha, iwm.) waa la dhiirrigeliyaa.",
      obj4: "Deegaanka (dib-u-beerta dhirta, eco-tourism, tamarta cusboon, iwm.) waa la ilaaliyaa.",
      obj5: "Dhammaan qodob-hayaha: bulshada maxalliga ah, soo-galootiga, maalgaliyeyaasha gaarka ah, dowladda, NGO-yada, iyo hay'adaha Qaramada Midoobey waa la kula xiriiraa.",
      timelineEyebrow: "Socdaalkayaga",
      timelineTitle: "UMAD Sannadaha Gudahood",
      tl2015Title: "Soomaaliya lagu Aasaasay",
      tl2015Desc:
        "Koox hoggaamiyeyaasha bulshada ah ee gobolka Adal ayaa UMAD aasaasay si loo xooriyo dadaallada horumarinta maxalliga ah.",
      tl2018Title: "Xarunta Ottawa Furmaysaa",
      tl2018Desc:
        "Soo-galootiga caasimadda Kanada waxay is-abaabuleen, iyagoo samaynayay Xarunta Ottawa oo bilaabayay ololeynta dhaqaale ee kala-joogada ah.",
      tl2019Title: "Xarunta Washington Furmaysaa",
      tl2019Desc:
        "Xirfadlayaasha Soomaalida-Mareykanka ee gobolka DC ayaa bilaabay Xarunta Washington, iyagoo ku daray dhinaca u doodidda shaqada UMAD.",
      tl2021Title: "Rugaha Caafimaadka Gaadiidka ah ee Koowaad",
      tl2021Desc:
        "Xarunta Soomaaliya waxay bilowday barnaamijkeeda rugaha caafimaadka gaadiidka ah, iyagoo gaara kumanaan bukaannood oo ku nool tuulooyinka fog.",
      tl2023Title: "Bilaabista Barnaamijka Beeraha",
      tl2023Desc:
        "Hindise weyn oo taageeraya beeraha ayaa la bilaabay, iyagoo siinaya 500 qoys oo beeraha leh abuur, qalabyo, iyo tababar.",
      tl2026Title: "Saamaynta Kordheysa",
      tl2026Desc:
        "UMAD hadda waxay u adeegaysaa in ka badan 50,000 qof oo ku nool Soomaaliya iyo soo-galootiga, iyagoo qorsheynayay xarumaha mustaqbalka.",
      ctaTitle: "Diyaar ma u tahay Farqi Samaysid?",
      ctaDesc:
        "Xarumahayaga baadh, wararkayaga ugu dambeeyay akhri, ama si toos ah uga qayb gal iskaa wax u qabasho.",
      ctaNews: "Wararkayaga Akhri",
    },
    // Submit Article Page
    submitArticle: {
      eyebrow: "Sheegtaadaada la Wadaag",
      title: "Maqaallo Soo Gudbi",
      heroDesc:
        "Ma haysaa sheeko, khibrad, ama cusboonaysiin xaruntaada ka socota oo la wadaagi karto? Halkan ka soo gudbi — marka maamulaha ay ansixiyaan — waxay ku muuqan doontaa bogga wararka UMAD.",
      step1Title: "Maqaalkaaga Soo Gudbi",
      step1Desc: "Foomka ku buuxi sheekadaada, sawirrada, iyo faahfaahinta.",
      step2Title: "Dib-u-eegista Maamulaha",
      step2Desc:
        "Kooxdayadu waxay dib u eegaan gudbinaha tayo iyo khusus ahaan.",
      step3Title: "UMAD-ka lagu Daabacay",
      step3Desc:
        "Maqaallada la ansixiyad ayaa si toos ah ugu soo baxaysa bogga wararka UMAD.",
      successTitle: "Maqaalka Waa La Gudbiyay!",
      successDesc:
        "Waad ku mahadsan tahay gacangelintaada. Maqaalkaaga waa la helay waxaana dib u eegi doona kooxda maamulayaasha. Waa lagugu soo wargelinayaa iimaylkaaga marka la ansixiyo oo la daabaco.",
      submitAnother: "Maqaal Kale Soo Gudbi",
      yourInfo: "Macluumaadkaaga",
      fullName: "Magaca Buuxa",
      emailAddress: "Cinwaanka Iimaylka",
      relatedChapter: "Xarunta La Xiriirta",
      selectChapter: "Xarun dooro…",
      category: "Qaybta",
      selectCategory: "Qaybta dooro…",
      mediaLabel: "Miidiyaha",
      mediaOptional: "(ikhtiyaari)",
      mediaDesc: "Sawir qabad ama fiidiyaha ku dar maqaalkaaga.",
      uploadFromDevice: "Qalabkaaga ka Soo Gali",
      useUrl: "URL Isticmaal",
      clickToSelect: "Guji si aad u doorato",
      anImage: "sawir",
      aVideo: "fiidiyow",
      imageFormats: "PNG, JPG, WEBP — ilaa 10 MB",
      videoFormats: "MP4, MOV, WEBM — ilaa 100 MB",
      imageUrl: "URL Sawirka",
      videoUrl: "URL Fiidiyowga (YouTube ama Vimeo)",
      articleContent: "Waxa Maqaalku Ka Kooban Yahay",
      articleTitle: "Cinwaanka Maqaalka",
      titlePlaceholder: "Madax-bannaan oo xiiseeya sheekadaada…",
      excerpt: "Kooban / Soo-koobid",
      excerptHint: "(ku muuqda warqadaha wararka)",
      excerptPlaceholder: "1–2 jumlood oo kooban maqaalkaaga…",
      fullArticle: "Maqaalka Buuxa",
      fullArticlePlaceholder:
        "Halkan ku qor maqaalkaaga buuxa. Khadka banaan u isticmaal si aad cutubyo uga samaysato…",
      chars: "xaraf",
      guidelinesTitle: "Tilmaamaha Gudbinta",
      guideline1:
        "Maqaalladu waa inay la xiriiraan hawsha UMAD ama hawlaha xarumaha.",
      guideline2:
        "Ha ku darin waxa ku mid ah difaac-xumo, nacayb, ama macluumaad khaldan.",
      guideline3:
        "Marka aad gudbisid, waxaad siinaysaa UMAD xaqqa daabacaadda iyo wax-ka-beddelka maqaalkaaga.",
      guideline4:
        "Iimaylkaaga kaliya ayaa loogu isticmaali doonaa in lagugu soo war-geliyo go'aanka ansixinta.",
      submitBtn: "Maqaalka Dib u Eegis u Gudbi",
    },
  },
};

export default so;
