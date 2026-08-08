import type { MenuCategory } from "@/lib/types";

/**
 * Placeholder-Inhalt, übernommen aus der bisherigen Speisekarte (Stand 2021,
 * als .docx auf der alten Jimdo-Seite verlinkt). Gerichte und Preise bitte
 * im Sanity Studio (/studio) auf Aktualität prüfen und pflegen.
 */
export const menuGroups: { id: "speisen" | "getraenke"; label: string; categories: MenuCategory[] }[] = [
  {
    id: "speisen",
    label: "Speisen",
    categories: [
      {
        slug: "antipasti",
        title: "Antipasti",
        subtitle: "Vorspeisen",
        items: [
          { name: "Carpaccio di Manzo", description: "Rindercarpaccio auf Rucola mit gehobeltem Parmesan", price: "14,00 €" },
          { name: "Vitello Tonnato", description: "Dünn aufgeschnittenes Kalbfleisch mit Thunfischcreme", price: "16,00 €" },
          { name: "Antipasto Misto", description: "Gemischter Vorspeisenteller (für 2 Personen)", price: "24,00 €" },
          { name: "Bruschetta", description: "Geröstetes Weißbrot mit Tomaten, Rucola und gehobeltem Parmesan", price: "5,50 €" },
        ],
      },
      {
        slug: "zuppe",
        title: "Zuppe",
        subtitle: "Suppen",
        items: [
          { name: "Crema di Pomodoro", description: "Tomatencremesuppe", price: "6,00 €" },
          { name: "Minestrone", description: "Gemüsesuppe", price: "6,00 €" },
        ],
      },
      {
        slug: "insalate",
        title: "Insalate",
        subtitle: "Salate",
        items: [
          { name: "Insalata Verde", description: "Grüner Salat", price: "6,00 €" },
          { name: "Insalata Mista", description: "Gemischter Salat", price: "7,00 €" },
          { name: "Insalata Tonno e Cipolla", description: "Gemischter Salat mit Thunfisch und Zwiebeln", price: "9,00 €" },
          { name: "Insalata Capricciosa", description: "Gemischter Salat mit Vorderschinken, Oliven, Artischocken, Peperoni, Mozzarella und Ei", price: "14,00 €", note: "2,3" },
          { name: "Insalata Caprese", description: "Büffelmozzarella mit frischen Tomaten und Basilikum", price: "11,00 €" },
          { name: "Insalata Rucola, Pomodoro e Parmigiano", description: "Rucola, frische Tomaten und gehobeltem Parmesan", price: "7,50 €" },
          { name: "Insalata Pomodoro", description: "Frische Tomaten und Zwiebel", price: "6,00 €" },
          { name: "Insalata di Mare", description: "Frischer Meeresfrüchtesalat", price: "16,00 €" },
        ],
      },
      {
        slug: "pasta-al-forno",
        title: "Pasta al Forno",
        subtitle: "Nudeln gratiniert",
        items: [
          { name: "Lasagne al Forno", description: "Lasagne nach Art des Hauses", price: "12,50 €" },
          { name: "Maccheroni Gratinati", description: "Maccheroni mit Vorderschinken und Champignons gratiniert", price: "13,00 €", note: "2,3" },
        ],
      },
      {
        slug: "pasta",
        title: "Pasta",
        subtitle: "Nudelgerichte",
        items: [
          { name: "Spaghetti al Pomodoro", description: "mit Tomatensoße", price: "8,00 €" },
          { name: "Spaghetti Bolognese", description: "mit Fleischsoße", price: "11,50 €" },
          { name: "Spaghetti Aglio e Olio", description: "mit Knoblauch und Olivenöl, pikant", price: "8,00 €" },
          { name: "Spaghetti Carbonara", description: "mit Speck, Ei und Parmesan in Sahnesoße", price: "11,50 €", note: "2,3" },
          { name: "Spaghetti Frutti di Mare", description: "mit Meeresfrüchten in leichter Tomatensoße", price: "17,00 €" },
          { name: "Penne Arrabbiata", description: "Schnittnudeln mit Tomaten und Knoblauch, pikant", price: "9,00 €" },
          { name: "Penne Quattro Formaggi", description: "Schnittnudeln mit vier verschiedenen Käsesorten", price: "12,50 €" },
          { name: "Penne Amatriciana", description: "Schnittnudeln mit Speck, Zwiebeln in Tomatensoße, mit Parmesan", price: "11,00 €", note: "2,3" },
          { name: "Fettuccine all'Emiliana", description: "Eierbandnudeln mit Erbsen, Pilzen und Vorderschinken in Aurorasoße", price: "13,00 €", note: "2,3" },
        ],
      },
      {
        slug: "pizza",
        title: "Pizza",
        subtitle: "35 cm · original italienischer Mozzarella",
        items: [
          { name: "Pizza Pane", description: "Rosmarin und Knoblauch", price: "5,50 €" },
          { name: "Pizza Pane Rossa", description: "Tomate und Knoblauch", price: "6,50 €" },
          { name: "Margherita", description: "Tomaten und Mozzarella", price: "10,00 €" },
          { name: "Funghi", description: "Tomaten, Mozzarella und Champignons", price: "11,00 €" },
          { name: "Salami", description: "Tomaten, Mozzarella und Salami", price: "11,00 €", note: "2,3" },
          { name: "Prosciutto", description: "Tomaten, Mozzarella und Vorderschinken", price: "11,00 €", note: "2,3" },
          { name: "Regina", description: "Tomaten, Mozzarella, Vorderschinken und Champignons", price: "12,50 €", note: "2,3" },
          { name: "Hawaii", description: "Tomaten, Mozzarella, Vorderschinken und Ananas", price: "12,00 €", note: "2,3" },
          { name: "Quattro Formaggi", description: "Tomate und vier verschiedene Käsesorten", price: "13,00 €" },
          { name: "Quattro Stagioni", description: "Tomaten, Mozzarella, Vorderschinken, Champignons, Artischocken und Oliven", price: "13,00 €", note: "2,3" },
          { name: "Alle Verdure", description: "Tomaten, Mozzarella und verschiedenes Gemüse", price: "12,50 €" },
          { name: "Tonno e Cipolla", description: "Tomaten, Mozzarella, Thunfisch und Zwiebeln", price: "12,00 €" },
          { name: "Diavola", description: "Mozzarella, Salami pikant und Peperoni", price: "12,00 €", note: "2,3" },
          { name: "Bella Napoli", description: "Tomaten, Mozzarella, Sardellen und Kapern", price: "11,00 €" },
          { name: "Frutti di Mare", description: "Tomaten, Mozzarella, Meeresfrüchte und Knoblauch", price: "17,00 €" },
          { name: "Con Tutto", description: "Tomaten, Mozzarella, Salami, Vorderschinken, Champignons, Artischocken, Peperoni und Oliven", price: "14,50 €", note: "2,3" },
          { name: "Roma", description: "Tomaten, Mozzarella, Parmaschinken, Rucola und Parmesan", price: "15,00 €", note: "2,3" },
          { name: "Calzone Speciale", description: "Frische Tomaten, Gorgonzola, Vorderschinken, Parmaschinken, Rucola und Parmesan", price: "16,00 €", note: "2,3" },
          { name: "Pizza Buffalina", description: "Mozzarella, Büffelmozzarella, frische Tomaten und Basilikum", price: "14,00 €" },
        ],
      },
      {
        slug: "carne-di-manzo",
        title: "Carne di Manzo",
        subtitle: "Rindfleisch",
        items: [
          { name: "Costata di Manzo alla Griglia", description: "Rinderlende vom Grill (300 g)", price: "28,00 €" },
          { name: "Filetto di Manzo alla Griglia", description: "Rinderfilet vom Grill (300 g)", price: "31,00 €" },
        ],
      },
      {
        slug: "carne-di-vitello",
        title: "Carne di Vitello",
        subtitle: "Kalbfleisch",
        items: [
          { name: "Scaloppine di Vitello ai Funghi", description: "Kalbsmedaillons mit verschiedenen Pilzen in Cognac-Sahne-Soße", price: "24,00 €" },
          { name: "Saltimbocca alla Romana", description: "Kalbsmedaillon mit San Daniele Schinken und Salbei, in Weißweinsoße", price: "24,00 €", note: "2,3" },
          { name: "Scaloppine alla Sorrentina", description: "Kalbsmedaillon mit Mozzarella überbacken", price: "24,00 €" },
          { name: "Scaloppina alla Pizzaiola", description: "Kalbsschnitzel mit Tomaten, Kapern und Oliven", price: "24,00 €" },
        ],
      },
      {
        slug: "pesce",
        title: "Pesce",
        subtitle: "Fisch",
        items: [
          { name: "Calamari alla Griglia", description: "Tintenfisch vom Grill", price: "24,00 €" },
          { name: "Calamari Fritti", description: "Tintenfisch frittiert", price: "24,00 €" },
          { name: "Scampi alla Griglia", description: "Scampi vom Grill (Sea-Water)", price: "29,00 €" },
          { name: "Scampi San Benedetto", description: "Scampi mit Knoblauch und frischen Tomaten in Weißweinsoße, pikant", price: "30,00 €" },
          { name: "Pesce Misto", description: "Verschiedene Fische vom Grill", price: "30,00 €" },
        ],
      },
      {
        slug: "dolce",
        title: "Dolce",
        subtitle: "Dessert",
        items: [
          { name: "Panna Cotta", description: "Hausgemachter Sahnepudding", price: "7,00 €" },
          { name: "Cassata Siciliana", description: "Sizilianische Eisspezialität", price: "7,50 €" },
          { name: "Tartufo Nero", description: "Tartufo-Eis", price: "7,00 €" },
          { name: "Tiramisù", description: "Hausgemacht", price: "7,00 €" },
        ],
      },
    ],
  },
  {
    id: "getraenke",
    label: "Getränke",
    categories: [
      {
        slug: "aperitivo",
        title: "Aperitivo",
        subtitle: "Aperitif",
        items: [
          { name: "Campari Orange", description: "10 % vol. · 4 cl", price: "7,00 €", note: "1" },
          { name: "Campari Soda", description: "10 % vol. · 4 cl", price: "6,00 €", note: "1" },
          { name: "Sanbitter alkoholfrei", description: "0,2 Ltr.", price: "4,00 €", note: "1" },
          { name: "Martini Bianco", description: "15 % vol. · 4 cl", price: "5,00 €" },
          { name: "Martini Rosso", description: "15 % vol. · 4 cl", price: "5,00 €" },
          { name: "Sherry dry", description: "15 % vol. · 4 cl", price: "5,00 €" },
          { name: "Aperol Spritz", description: "15 % vol. · 0,3 Ltr.", price: "7,50 €", note: "1" },
          { name: "Prosecco Brut", description: "11 % vol. · 0,1 Ltr.", price: "6,00 €" },
          { name: "Hugo", description: "11 % vol. · 0,3 Ltr.", price: "7,00 €" },
          { name: "Julia", description: "Prosecco, Mineralwasser, Mangosirup, Orange · 0,3 Ltr.", price: "7,00 €" },
        ],
      },
      {
        slug: "digestivo",
        title: "Digestivo",
        subtitle: "Digestif",
        items: [
          { name: "Fernet Branca", description: "39 % vol. · 2 cl", price: "3,50 €" },
          { name: "Averna", description: "32 % vol. · 2 cl", price: "3,50 €" },
          { name: "Ramazzotti", description: "30 % vol. · 2 cl", price: "3,50 €" },
          { name: "Cynar", description: "16,5 % vol. · 4 cl", price: "6,00 €" },
        ],
      },
      {
        slug: "liquore",
        title: "Liquore",
        subtitle: "Liköre",
        items: [
          { name: "Sambuca", description: "40 % vol. · 2 cl", price: "4,00 €" },
          { name: "Amaretto", description: "28 % vol. · 2 cl", price: "3,50 €" },
          { name: "Baileys", description: "17 % vol. · 2 cl", price: "3,50 €" },
          { name: "Limoncello", description: "28 % vol. · 2 cl", price: "3,50 €" },
        ],
      },
      {
        slug: "weisswein",
        title: "Vino Bianco",
        subtitle: "Weißwein",
        items: [
          { name: "Vino Bianco della Casa", description: "0,25 Ltr.", price: "6,50 €" },
          { name: "Trebbiano", description: "0,25 Ltr.", price: "7,00 €" },
          { name: "Lugana", description: "0,25 Ltr.", price: "7,00 €" },
          { name: "Weinschorle", description: "0,25 Ltr.", price: "4,50 €" },
        ],
      },
      {
        slug: "rotwein",
        title: "Vino Rosso",
        subtitle: "Rotwein",
        items: [
          { name: "Vino Rosso della Casa", description: "0,25 Ltr.", price: "7,00 €" },
          { name: "Montepulciano", description: "0,25 Ltr.", price: "7,00 €" },
          { name: "Primitivo", description: "0,25 Ltr.", price: "7,00 €" },
          { name: "Lambrusco", description: "0,25 Ltr.", price: "6,50 €" },
        ],
      },
      {
        slug: "rose",
        title: "Vino Rosé",
        subtitle: "Rosé",
        items: [{ name: "Vino Rosé della Casa", description: "0,25 Ltr.", price: "7,00 €" }],
      },
      {
        slug: "birra",
        title: "Birra",
        subtitle: "Bierspezialitäten",
        items: [
          { name: "Tegernseer Hell vom Fass", description: "0,25 Ltr.", price: "3,00 €" },
          { name: "Tegernseer Hell vom Fass", description: "0,5 Ltr.", price: "4,50 €" },
          { name: "Paulaner alkoholfrei", description: "0,5 Ltr.", price: "4,10 €" },
          { name: "Tegernseer Pils", description: "0,3 Ltr.", price: "3,50 €" },
          { name: "Hopf Weißbier hell vom Fass", description: "0,3 Ltr.", price: "3,50 €" },
          { name: "Hopf Weißbier hell vom Fass", description: "0,5 Ltr.", price: "4,80 €" },
          { name: "Hopf Weißbier dunkel", description: "0,5 Ltr.", price: "4,80 €" },
          { name: "Hopf Weißbier leicht", description: "0,5 Ltr.", price: "4,80 €" },
          { name: "Hopf Weißbier alkoholfrei", description: "0,5 Ltr.", price: "4,80 €" },
          { name: "Radler", description: "0,5 Ltr.", price: "4,00 €", note: "11" },
          { name: "Russ", description: "0,5 Ltr.", price: "4,50 €" },
        ],
      },
      {
        slug: "alkoholfreie-getraenke",
        title: "Bevande Analcoliche",
        subtitle: "Alkoholfreie Getränke",
        items: [
          { name: "San Pellegrino", description: "0,5 Ltr.", price: "4,00 €" },
          { name: "San Pellegrino", description: "0,75 Ltr.", price: "7,00 €" },
          { name: "Aqua Panna (still)", description: "0,5 Ltr.", price: "4,00 €" },
          { name: "Aqua Panna (still)", description: "0,75 Ltr.", price: "7,00 €" },
          { name: "Tafelwasser", description: "0,5 Ltr.", price: "3,50 €" },
          { name: "Coca-Cola", description: "0,3 Ltr.", price: "3,50 €", note: "1, 9, 11, 12" },
          { name: "Fanta", description: "0,3 Ltr.", price: "3,50 €", note: "1, 11" },
          { name: "Zitronenlimonade", description: "0,5 Ltr.", price: "4,00 €", note: "11" },
          { name: "Spezi", description: "0,5 Ltr.", price: "4,00 €", note: "1, 9" },
          { name: "Apfelsaft naturtrüb", description: "0,3 Ltr.", price: "3,00 €" },
          { name: "Johannisbeersaft schwarz", description: "0,3 Ltr.", price: "3,00 €" },
          { name: "Orangensaft", description: "0,3 Ltr.", price: "3,00 €" },
          { name: "Saftschorle", description: "Orange, Maracuja, Apfel, Rhabarber oder Johannisbeer · 0,4 Ltr.", price: "4,00 €" },
          { name: "Saftschorle klein", description: "0,3 Ltr.", price: "3,00 €" },
        ],
      },
      {
        slug: "warme-getraenke",
        title: "Bevande Calde",
        subtitle: "Warme Getränke",
        items: [
          { name: "Espresso", price: "2,50 €" },
          { name: "Espresso doppio", price: "4,50 €" },
          { name: "Tasse Kaffee", price: "2,80 €" },
          { name: "Cappuccino", price: "3,00 €" },
          { name: "Latte Macchiato", price: "3,50 €" },
          { name: "Tasse Tee", description: "Schwarz, Grün, Kamille oder Pfefferminz", price: "2,50 €" },
        ],
      },
      {
        slug: "grappa",
        title: "Grappa",
        items: [
          { name: "Grappa della Casa Bianca", description: "41 % vol. · 2 cl", price: "3,50 €" },
          { name: "Grappa della Casa Barrique", description: "41 % vol. · 2 cl", price: "4,50 €" },
          { name: "Grappa Riserva di Nebbiolo", description: "10 Jahre · 41 % vol. · 2 cl", price: "6,00 €" },
        ],
      },
      {
        slug: "brandy",
        title: "Brandy",
        subtitle: "Weinbrand",
        items: [
          { name: "Vecchia Romagna", description: "48 % vol. · 2 cl", price: "4,50 €" },
          { name: "Remy Martin", description: "40 % vol. · 2 cl", price: "7,00 €" },
        ],
      },
      {
        slug: "whisky",
        title: "Whisky",
        items: [
          { name: "Jack Daniel's Bourbon", description: "7 Jahre · 40 % vol. · 2 cl", price: "6,00 €" },
          { name: "Chivas Regal Scotch", description: "40 % vol. · 2 cl", price: "7,00 €" },
        ],
      },
    ],
  },
];

export const menuFootnotes =
  "1) mit Farbstoff(en) · 2) mit Konservierungsstoff(en) · 3) geschmacksverstärkt · 9) koffeinhaltig · 11) mit Süßungsmittel · 12) enthält eine Phenylalaninquelle";

export const menuGeneralNotes = [
  "Alle Fleisch- und Fischgerichte werden mit Beilagen serviert.",
  "Auf jede Speise, die mit zwei Tellern serviert wird, berechnen wir 1,00 € Zuschlag.",
];
