/**
 * Centralized Moroccan Locations Data Source for SAMSAR
 * Covers all 12 administrative regions of Morocco, their provinces/prefectures,
 * canonical city/place names, realistic geographic coordinates (lat/lng),
 * and alternate names/spellings for accent-insensitive search.
 */

export const MOROCCO_LOCATIONS = [
  // ==========================================
  // 1. Casablanca-Settat
  // ==========================================
  {
    city: "Casablanca",
    region: "Casablanca-Settat",
    province: "Casablanca",
    latitude: 33.5731,
    longitude: -7.5898,
    aliases: ["Casa", "Dar el Beida", "Ad-Dar al-Bayda"],
  },
  {
    city: "Mohammedia",
    region: "Casablanca-Settat",
    province: "Mohammedia",
    latitude: 33.6861,
    longitude: -7.383,
    aliases: ["Mohammedia", "Fedala"],
  },
  {
    city: "El Jadida",
    region: "Casablanca-Settat",
    province: "El Jadida",
    latitude: 33.2316,
    longitude: -8.5007,
    aliases: ["El-Jadida", "Mazagan"],
  },
  {
    city: "Settat",
    region: "Casablanca-Settat",
    province: "Settat",
    latitude: 33.001,
    longitude: -7.6166,
    aliases: ["Settat"],
  },
  {
    city: "Berrechid",
    region: "Casablanca-Settat",
    province: "Berrechid",
    latitude: 33.2655,
    longitude: -7.5875,
    aliases: ["Berrechid"],
  },
  {
    city: "Bouskoura",
    region: "Casablanca-Settat",
    province: "Nouaceur",
    latitude: 33.4497,
    longitude: -7.6486,
    aliases: ["Bouskoura"],
  },
  {
    city: "Dar Bouazza",
    region: "Casablanca-Settat",
    province: "Nouaceur",
    latitude: 33.5217,
    longitude: -7.8189,
    aliases: ["Dar Bouazza", "Tamaris"],
  },
  {
    city: "Nouaceur",
    region: "Casablanca-Settat",
    province: "Nouaceur",
    latitude: 33.3644,
    longitude: -7.5806,
    aliases: ["Nouaceur"],
  },
  {
    city: "Benslimane",
    region: "Casablanca-Settat",
    province: "Benslimane",
    latitude: 33.6144,
    longitude: -7.1219,
    aliases: ["Ben Slimane", "Benslimane"],
  },
  {
    city: "Azemmour",
    region: "Casablanca-Settat",
    province: "El Jadida",
    latitude: 33.2878,
    longitude: -8.3425,
    aliases: ["Azemmour"],
  },
  {
    city: "Sidi Bennour",
    region: "Casablanca-Settat",
    province: "Sidi Bennour",
    latitude: 32.6517,
    longitude: -8.4289,
    aliases: ["Sidi Bennour"],
  },

  // ==========================================
  // 2. Marrakech-Safi
  // ==========================================
  {
    city: "Marrakech",
    region: "Marrakech-Safi",
    province: "Marrakech",
    latitude: 31.6295,
    longitude: -7.9811,
    aliases: ["Marrakesh", "Marrakush", "Guéliz", "Hivernage", "Medina"],
  },
  {
    city: "Safi",
    region: "Marrakech-Safi",
    province: "Safi",
    latitude: 32.2994,
    longitude: -9.2372,
    aliases: ["Asfi", "Safi"],
  },
  {
    city: "Essaouira",
    region: "Marrakech-Safi",
    province: "Essaouira",
    latitude: 31.5085,
    longitude: -9.7595,
    aliases: ["Mogador", "Essaouira"],
  },
  {
    city: "El Kelaa des Sraghna",
    region: "Marrakech-Safi",
    province: "El Kelâa des Sraghna",
    latitude: 32.0544,
    longitude: -7.4116,
    aliases: ["El Kelaa", "Kelaat Sraghna"],
  },
  {
    city: "Benguerir",
    region: "Marrakech-Safi",
    province: "Rehamna",
    latitude: 32.235,
    longitude: -7.9536,
    aliases: ["Benguerir", "Ben Guerir"],
  },
  {
    city: "Chichaoua",
    region: "Marrakech-Safi",
    province: "Chichaoua",
    latitude: 31.5333,
    longitude: -8.7667,
    aliases: ["Chichaoua"],
  },
  {
    city: "Youssoufia",
    region: "Marrakech-Safi",
    province: "Youssoufia",
    latitude: 32.2464,
    longitude: -8.5294,
    aliases: ["Youssoufia", "Louis Gentil"],
  },
  {
    city: "Tahannaout",
    region: "Marrakech-Safi",
    province: "Al Haouz",
    latitude: 31.3533,
    longitude: -7.9511,
    aliases: ["Tahanaout", "Ourika", "Al Haouz"],
  },

  // ==========================================
  // 3. Rabat-Salé-Kénitra
  // ==========================================
  {
    city: "Rabat",
    region: "Rabat-Salé-Kénitra",
    province: "Rabat",
    latitude: 34.0209,
    longitude: -6.8416,
    aliases: ["Rabat", "Agdal", "Hay Riad", "Souissi", "Hassan"],
  },
  {
    city: "Salé",
    region: "Rabat-Salé-Kénitra",
    province: "Salé",
    latitude: 34.0331,
    longitude: -6.8166,
    aliases: ["Sale", "Salé"],
  },
  {
    city: "Kénitra",
    region: "Rabat-Salé-Kénitra",
    province: "Kénitra",
    latitude: 34.261,
    longitude: -6.5802,
    aliases: ["Kenitra", "Kénitra", "Port Lyautey", "Mehdia"],
  },
  {
    city: "Témara",
    region: "Rabat-Salé-Kénitra",
    province: "Skhirate-Témara",
    latitude: 33.9264,
    longitude: -6.9122,
    aliases: ["Temara", "Témara", "Harhoura"],
  },
  {
    city: "Skhirat",
    region: "Rabat-Salé-Kénitra",
    province: "Skhirate-Témara",
    latitude: 33.8553,
    longitude: -7.0347,
    aliases: ["Skhirate", "Skhirat Plage"],
  },
  {
    city: "Khémisset",
    region: "Rabat-Salé-Kénitra",
    province: "Khémisset",
    latitude: 33.8242,
    longitude: -6.0667,
    aliases: ["Khemisset", "Khémisset"],
  },
  {
    city: "Tiflet",
    region: "Rabat-Salé-Kénitra",
    province: "Khémisset",
    latitude: 33.8939,
    longitude: -6.3061,
    aliases: ["Tifelt", "Tiflet"],
  },
  {
    city: "Sidi Kacem",
    region: "Rabat-Salé-Kénitra",
    province: "Sidi Kacem",
    latitude: 34.2217,
    longitude: -5.7078,
    aliases: ["Sidi Kacem"],
  },
  {
    city: "Sidi Slimane",
    region: "Rabat-Salé-Kénitra",
    province: "Sidi Slimane",
    latitude: 34.26,
    longitude: -5.92,
    aliases: ["Sidi Slimane"],
  },
  {
    city: "Souk El Arbaa",
    region: "Rabat-Salé-Kénitra",
    province: "Kénitra",
    latitude: 34.6833,
    longitude: -5.9833,
    aliases: ["Souk El Arbaa du Gharb"],
  },

  // ==========================================
  // 4. Tanger-Tétouan-Al Hoceïma
  // ==========================================
  {
    city: "Tangier",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Tanger-Assilah",
    latitude: 35.7595,
    longitude: -5.834,
    aliases: ["Tanger", "Tangier", "Tanja", "Malabata"],
  },
  {
    city: "Tétouan",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Tétouan",
    latitude: 35.5785,
    longitude: -5.3684,
    aliases: ["Tetouan", "Tétouan", "Titwan", "Martil", "Cabo Negro"],
  },
  {
    city: "Al Hoceïma",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Al Hoceïma",
    latitude: 35.2472,
    longitude: -3.9322,
    aliases: ["Al Hoceima", "El Hoceima", "Villa Sanjurjo"],
  },
  {
    city: "Chefchaouen",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Chefchaouen",
    latitude: 35.1714,
    longitude: -5.2697,
    aliases: ["Chaouen", "Chefchaouen", "Xauen"],
  },
  {
    city: "Larache",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Larache",
    latitude: 35.1932,
    longitude: -6.1557,
    aliases: ["Larache", "El Araich"],
  },
  {
    city: "Asilah",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Tanger-Assilah",
    latitude: 35.465,
    longitude: -6.0347,
    aliases: ["Assilah", "Asilah", "Arzila"],
  },
  {
    city: "Ksar El Kebir",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Larache",
    latitude: 35.0019,
    longitude: -5.9039,
    aliases: ["Ksar El Kebir", "Alcazarquivir"],
  },
  {
    city: "M'diq",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "M'diq-Fnideq",
    latitude: 35.6858,
    longitude: -5.3253,
    aliases: ["Mdiq", "Rincon"],
  },
  {
    city: "Fnideq",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "M'diq-Fnideq",
    latitude: 35.85,
    longitude: -5.35,
    aliases: ["Fnideq", "Castillejos"],
  },
  {
    city: "Ouezzane",
    region: "Tanger-Tétouan-Al Hoceïma",
    province: "Ouezzane",
    latitude: 34.7972,
    longitude: -5.5822,
    aliases: ["Ouazzane", "Ouezzane"],
  },

  // ==========================================
  // 5. Fès-Meknès
  // ==========================================
  {
    city: "Fès",
    region: "Fès-Meknès",
    province: "Fès",
    latitude: 34.0181,
    longitude: -5.0078,
    aliases: ["Fes", "Fez", "Fas"],
  },
  {
    city: "Meknès",
    region: "Fès-Meknès",
    province: "Meknès",
    latitude: 33.8938,
    longitude: -5.5516,
    aliases: ["Meknes", "Meknès"],
  },
  {
    city: "Taza",
    region: "Fès-Meknès",
    province: "Taza",
    latitude: 34.2139,
    longitude: -4.0108,
    aliases: ["Taza"],
  },
  {
    city: "Ifrane",
    region: "Fès-Meknès",
    province: "Ifrane",
    latitude: 33.5228,
    longitude: -5.1111,
    aliases: ["Ifrane", "Michlifen"],
  },
  {
    city: "Azrou",
    region: "Fès-Meknès",
    province: "Ifrane",
    latitude: 33.4344,
    longitude: -5.2214,
    aliases: ["Azrou"],
  },
  {
    city: "Sefrou",
    region: "Fès-Meknès",
    province: "Sefrou",
    latitude: 33.8317,
    longitude: -4.8344,
    aliases: ["Sefrou"],
  },
  {
    city: "El Hajeb",
    region: "Fès-Meknès",
    province: "El Hajeb",
    latitude: 33.6928,
    longitude: -5.3719,
    aliases: ["El Hajeb"],
  },
  {
    city: "Moulay Yacoub",
    region: "Fès-Meknès",
    province: "Moulay Yacoub",
    latitude: 34.0872,
    longitude: -5.18,
    aliases: ["Moulay Yacoub"],
  },
  {
    city: "Missour",
    region: "Fès-Meknès",
    province: "Boulemane",
    latitude: 33.0494,
    longitude: -3.9961,
    aliases: ["Missour", "Boulemane"],
  },

  // ==========================================
  // 6. Souss-Massa
  // ==========================================
  {
    city: "Agadir",
    region: "Souss-Massa",
    province: "Agadir-Ida-Ou-Tanane",
    latitude: 30.4278,
    longitude: -9.5981,
    aliases: ["Agadir", "Taghazout", "Tamraght"],
  },
  {
    city: "Inezgane",
    region: "Souss-Massa",
    province: "Inezgane-Aït Melloul",
    latitude: 30.3556,
    longitude: -9.5375,
    aliases: ["Inezgane"],
  },
  {
    city: "Aït Melloul",
    region: "Souss-Massa",
    province: "Inezgane-Aït Melloul",
    latitude: 30.3342,
    longitude: -9.4972,
    aliases: ["Ait Melloul", "Aït Melloul"],
  },
  {
    city: "Taroudant",
    region: "Souss-Massa",
    province: "Taroudant",
    latitude: 30.4703,
    longitude: -8.877,
    aliases: ["Taroudant", "Taroudannt"],
  },
  {
    city: "Tiznit",
    region: "Souss-Massa",
    province: "Tiznit",
    latitude: 29.6974,
    longitude: -9.7316,
    aliases: ["Tiznit", "Mirleft"],
  },
  {
    city: "Tafraout",
    region: "Souss-Massa",
    province: "Tiznit",
    latitude: 29.7247,
    longitude: -8.9772,
    aliases: ["Tafraoute", "Tafraout"],
  },
  {
    city: "Biougra",
    region: "Souss-Massa",
    province: "Chtouka-Aït Baha",
    latitude: 30.2144,
    longitude: -9.3708,
    aliases: ["Biougra", "Chtouka Ait Baha"],
  },
  {
    city: "Tata",
    region: "Souss-Massa",
    province: "Tata",
    latitude: 29.7431,
    longitude: -7.9739,
    aliases: ["Tata"],
  },

  // ==========================================
  // 7. Béni Mellal-Khénifra
  // ==========================================
  {
    city: "Béni Mellal",
    region: "Béni Mellal-Khénifra",
    province: "Béni Mellal",
    latitude: 32.3394,
    longitude: -6.3608,
    aliases: ["Beni Mellal", "Béni Mellal", "Ain Asserdoun"],
  },
  {
    city: "Khouribga",
    region: "Béni Mellal-Khénifra",
    province: "Khouribga",
    latitude: 32.8811,
    longitude: -6.9063,
    aliases: ["Khouribga"],
  },
  {
    city: "Khénifra",
    region: "Béni Mellal-Khénifra",
    province: "Khénifra",
    latitude: 32.9394,
    longitude: -5.6675,
    aliases: ["Khenifra", "Khénifra"],
  },
  {
    city: "Fquih Ben Salah",
    region: "Béni Mellal-Khénifra",
    province: "Fquih Ben Salah",
    latitude: 32.5008,
    longitude: -6.7006,
    aliases: ["Fkih Ben Salah", "Fquih Ben Salah"],
  },
  {
    city: "Oued Zem",
    region: "Béni Mellal-Khénifra",
    province: "Khouribga",
    latitude: 32.8628,
    longitude: -6.5736,
    aliases: ["Oued Zem", "Oued-Zem"],
  },
  {
    city: "Kasba Tadla",
    region: "Béni Mellal-Khénifra",
    province: "Béni Mellal",
    latitude: 32.5975,
    longitude: -6.2681,
    aliases: ["Kasbah Tadla", "Kasba Tadla"],
  },
  {
    city: "Azilal",
    region: "Béni Mellal-Khénifra",
    province: "Azilal",
    latitude: 31.9611,
    longitude: -6.5694,
    aliases: ["Azilal", "Ouzoud", "Bin El Ouidane"],
  },
  {
    city: "Demnate",
    region: "Béni Mellal-Khénifra",
    province: "Azilal",
    latitude: 31.7311,
    longitude: -7.0164,
    aliases: ["Demnate", "Imi n'Ifri"],
  },

  // ==========================================
  // 8. L'Oriental
  // ==========================================
  {
    city: "Oujda",
    region: "L'Oriental",
    province: "Oujda-Angad",
    latitude: 34.6814,
    longitude: -1.9086,
    aliases: ["Oujda", "Wujda"],
  },
  {
    city: "Nador",
    region: "L'Oriental",
    province: "Nador",
    latitude: 35.1667,
    longitude: -2.9333,
    aliases: ["Nador", "Marchica"],
  },
  {
    city: "Berkane",
    region: "L'Oriental",
    province: "Berkane",
    latitude: 34.9167,
    longitude: -2.3333,
    aliases: ["Berkane"],
  },
  {
    city: "Saïdia",
    region: "L'Oriental",
    province: "Berkane",
    latitude: 35.0833,
    longitude: -2.2333,
    aliases: ["Saidia", "Saïdia", "Perle Bleue"],
  },
  {
    city: "Taourirt",
    region: "L'Oriental",
    province: "Taourirt",
    latitude: 34.4072,
    longitude: -2.8972,
    aliases: ["Taourirt"],
  },
  {
    city: "Guercif",
    region: "L'Oriental",
    province: "Guercif",
    latitude: 34.2256,
    longitude: -3.3536,
    aliases: ["Guercif"],
  },
  {
    city: "Jerada",
    region: "L'Oriental",
    province: "Jerada",
    latitude: 34.3117,
    longitude: -2.1633,
    aliases: ["Jerada"],
  },
  {
    city: "Driouch",
    region: "L'Oriental",
    province: "Driouch",
    latitude: 34.9786,
    longitude: -3.3889,
    aliases: ["Driouch", "Midar"],
  },
  {
    city: "Figuig",
    region: "L'Oriental",
    province: "Figuig",
    latitude: 32.1081,
    longitude: -1.2289,
    aliases: ["Figuig", "Bouarfa"],
  },

  // ==========================================
  // 9. Drâa-Tafilalet
  // ==========================================
  {
    city: "Errachidia",
    region: "Drâa-Tafilalet",
    province: "Errachidia",
    latitude: 31.9319,
    longitude: -4.4244,
    aliases: ["Errachidia", "Ksar Es Souk"],
  },
  {
    city: "Ouarzazate",
    region: "Drâa-Tafilalet",
    province: "Ouarzazate",
    latitude: 30.9189,
    longitude: -6.8934,
    aliases: ["Ouarzazate", "Ait Benhaddou"],
  },
  {
    city: "Tinghir",
    region: "Drâa-Tafilalet",
    province: "Tinghir",
    latitude: 31.5147,
    longitude: -5.5328,
    aliases: ["Tinghir", "Tinerhir", "Todra"],
  },
  {
    city: "Midelt",
    region: "Drâa-Tafilalet",
    province: "Midelt",
    latitude: 32.6853,
    longitude: -4.7333,
    aliases: ["Midelt"],
  },
  {
    city: "Zagora",
    region: "Drâa-Tafilalet",
    province: "Zagora",
    latitude: 30.3325,
    longitude: -5.8381,
    aliases: ["Zagora", "Draa"],
  },
  {
    city: "Erfoud",
    region: "Drâa-Tafilalet",
    province: "Errachidia",
    latitude: 31.4333,
    longitude: -4.2333,
    aliases: ["Erfoud", "Merzouga", "Rissani"],
  },

  // ==========================================
  // 10. Guelmim-Oued Noun
  // ==========================================
  {
    city: "Guelmim",
    region: "Guelmim-Oued Noun",
    province: "Guelmim",
    latitude: 28.987,
    longitude: -10.0574,
    aliases: ["Guelmim", "Porte du Sahara"],
  },
  {
    city: "Tan-Tan",
    region: "Guelmim-Oued Noun",
    province: "Tan-Tan",
    latitude: 28.4378,
    longitude: -11.1033,
    aliases: ["Tan Tan", "Tan-Tan Plage", "El Ouatia"],
  },
  {
    city: "Sidi Ifni",
    region: "Guelmim-Oued Noun",
    province: "Sidi Ifni",
    latitude: 29.3797,
    longitude: -10.1731,
    aliases: ["Sidi Ifni", "Legzira"],
  },
  {
    city: "Assa",
    region: "Guelmim-Oued Noun",
    province: "Assa-Zag",
    latitude: 28.6083,
    longitude: -9.4278,
    aliases: ["Assa", "Zag"],
  },

  // ==========================================
  // 11. Laâyoune-Sakia El Hamra
  // ==========================================
  {
    city: "Laâyoune",
    region: "Laâyoune-Sakia El Hamra",
    province: "Laâyoune",
    latitude: 27.1536,
    longitude: -13.2033,
    aliases: ["Laayoune", "Laâyoune", "El Aaiun"],
  },
  {
    city: "Boujdour",
    region: "Laâyoune-Sakia El Hamra",
    province: "Boujdour",
    latitude: 26.1264,
    longitude: -14.4842,
    aliases: ["Boujdour", "Cabo Bojador"],
  },
  {
    city: "Tarfaya",
    region: "Laâyoune-Sakia El Hamra",
    province: "Tarfaya",
    latitude: 27.9386,
    longitude: -12.9264,
    aliases: ["Tarfaya", "Cap Juby"],
  },
  {
    city: "Es-Semara",
    region: "Laâyoune-Sakia El Hamra",
    province: "Es-Semara",
    latitude: 26.7383,
    longitude: -11.6719,
    aliases: ["Smara", "Es-Semara", "Semara"],
  },

  // ==========================================
  // 12. Dakhla-Oued Ed-Dahab
  // ==========================================
  {
    city: "Dakhla",
    region: "Dakhla-Oued Ed-Dahab",
    province: "Oued Ed-Dahab",
    latitude: 23.7136,
    longitude: -15.9347,
    aliases: ["Dakhla", "Villa Cisneros", "Dakhla Lagoon"],
  },
  {
    city: "Aousserd",
    region: "Dakhla-Oued Ed-Dahab",
    province: "Aousserd",
    latitude: 22.5564,
    longitude: -14.3317,
    aliases: ["Aousserd", "Auserd"],
  },
];

/**
 * Top curated cities used for quick filter pills and suggestions
 */
export const POPULAR_CITIES = [
  "Casablanca",
  "Marrakech",
  "Rabat",
  "Tangier",
  "Agadir",
  "Fès",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "Béni Mellal",
  "Essaouira",
];

/**
 * All 12 official Moroccan administrative regions
 */
export const MOROCCAN_REGIONS = [
  "Casablanca-Settat",
  "Marrakech-Safi",
  "Rabat-Salé-Kénitra",
  "Tanger-Tétouan-Al Hoceïma",
  "Fès-Meknès",
  "Souss-Massa",
  "Béni Mellal-Khénifra",
  "L'Oriental",
  "Drâa-Tafilalet",
  "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab",
];

/**
 * Strips accents, diacritics, and normalizes for robust accent-insensitive comparison
 * Example: "Béni Mellal" -> "beni mellal", "Kénitra" -> "kenitra"
 */
export const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

/**
 * Search locations by query string (matching city, region, province, or aliases)
 */
export const searchLocations = (query) => {
  if (!query || !query.trim()) return MOROCCO_LOCATIONS;

  const normalizedQuery = normalizeText(query);

  return MOROCCO_LOCATIONS.filter((loc) => {
    const cityNorm = normalizeText(loc.city);
    const regionNorm = normalizeText(loc.region);
    const provinceNorm = normalizeText(loc.province);
    const aliasMatches = loc.aliases?.some((a) =>
      normalizeText(a).includes(normalizedQuery),
    );

    return (
      cityNorm.includes(normalizedQuery) ||
      regionNorm.includes(normalizedQuery) ||
      provinceNorm.includes(normalizedQuery) ||
      aliasMatches
    );
  });
};

/**
 * Find location object by exact or normalized city name
 */
export const findLocationByCity = (cityName) => {
  if (!cityName) return null;
  const target = normalizeText(cityName);

  // 1. Check exact canonical match
  const exact = MOROCCO_LOCATIONS.find((l) => normalizeText(l.city) === target);
  if (exact) return exact;

  // 2. Check alias match (e.g. "Fez" -> "Fès", "Kenitra" -> "Kénitra", "Beni Mellal" -> "Béni Mellal")
  const aliasMatch = MOROCCO_LOCATIONS.find((l) =>
    l.aliases?.some((a) => normalizeText(a) === target),
  );
  if (aliasMatch) return aliasMatch;

  // 3. Check partial inclusion
  const partial = MOROCCO_LOCATIONS.find((l) =>
    normalizeText(l.city).includes(target),
  );
  return partial || null;
};
