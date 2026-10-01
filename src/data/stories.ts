import { JournalArticle, Offer } from '../types';
import BrandAssets from '../assets/images';

export const STORIES_DATA: JournalArticle[] = [
  {
    slug: 'the-1996-brigade-road-revolution',
    title: '1996: When India Discovered the Cyber Café and the Espresso Machine',
    subtitle: 'How a modest café on Bengaluru’s Brigade Road sparked a national coffee movement.',
    readTime: '4 min read',
    publishedDate: '11 July 1996 · Archive',
    category: 'Heritage & Origins',
    summary: 'Before high-speed home internet and co-working spaces, India had Café Coffee Day on Brigade Road. Guests paid ₹100 for an hour of browsing and received a free espresso.',
    content: [
      'On 11 July 1996, the first Café Coffee Day opened on Brigade Road in Bangalore. In the mid-nineties, coffee in urban India was primarily either traditional South Indian filter kaapi at local darshinis or instant granules stirred at home. The concept of an espresso bar paired with high-speed internet surfing was radically foreign.',
      'Guests were invited to sit on swivel chairs, browse the emerging World Wide Web on cathode-ray monitors, and sip hot cappuccinos freshly pulled from Italian commercial espresso machines fed by shade-grown beans from Chikmagalur estates.',
      'It quickly turned into something far bigger than a tech novelty: it became India’s authentic "Third Place" — a warm neutral ground between home and work where young Indians, entrepreneurs, couples, and creators found their voice. The slogan "A Lot Can Happen Over Coffee" wasn’t marketing copy; it was what was happening on the floor every afternoon.'
    ],
    image: BrandAssets.craftPour,
    author: 'CCD Heritage Archive',
    authorRole: 'Bengaluru Historian'
  },
  {
    slug: 'chikmagalur-the-cradle-of-indian-coffee',
    title: 'Under the Western Ghats Canopy: The Story of Chikmagalur Arabica',
    subtitle: 'High altitudes, monsoon mist, and two centuries of shade-grown coffee stewardship.',
    readTime: '6 min read',
    publishedDate: 'Karnataka Estate Dispatch',
    category: 'Coffee Craft',
    summary: 'Unlike open-sun plantations across the globe, Indian coffee thrives beneath a two-tier canopy of native silver oaks, jackfruit, and fig trees, yielding slower ripening and complex natural sweetness.',
    content: [
      'According to historical lore, the revered Sufi saint Baba Budan smuggled seven raw coffee beans wrapped in his robes from Yemen in the 17th century and planted them in the Chandragiri Hills of Chikmagalur.',
      'Today, that terroir produces some of the most nuanced shade-grown coffees in the world. High above sea level, sheltered by indigenous forest canopies, coffee cherries mature slowly under heavy monsoon rains and filtered mountain sunlight.',
      'Café Coffee Day works directly with estate growers, handpicking deep-red cherries, pulping with natural mountain spring water, and roasting in precision Italian drum roasters to unlock caramel notes and low-acidity dark chocolate tones.'
    ],
    image: BrandAssets.coffeeEstate,
    author: 'Estate Master Roaster',
    authorRole: 'Western Ghats Agronomy'
  },
  {
    slug: 'the-anatomy-of-the-devils-own',
    title: 'Deconstructing "The Devil’s Own": How a Cold Coffee Became a National Legend',
    subtitle: 'The secret balance of cocoa fudge, cold-pulled espresso, and ice-crushed indulgence.',
    readTime: '3 min read',
    publishedDate: 'CCD Signature Journal',
    category: 'Barista Lab',
    summary: 'Every CCD regular remembers their first Devil’s Own. A closer look at how this chocolate-drenched icon redefined cold coffee culture for Indian college students and professionals.',
    content: [
      'In the early 2000s, cold coffee in India was typically milk whipped with instant powder and sugar in household blenders. The introduction of The Devil’s Own at CCD created a sensory earthquake.',
      'Beginning with an intense chilled espresso extraction to cut through rich dairy fats, baristas blend homemade dark chocolate ganache, thick fresh cream, and crushed crystal ice until the consistency is velvety yet thick enough to hold chocolate curls.',
      'Finished with a crown of whipped dairy cream and a double spiral of chocolate drizzle, it proved that cold coffee in India could be celebratory, decadent, and unapologetically bold.'
    ],
    image: BrandAssets.signatureFrappe,
    author: 'Beverage Innovation Team',
    authorRole: 'CCD Culinary Lab'
  }
];

export const OFFERS_DATA: Offer[] = [
  {
    id: 'ccd-welcome-kaapi',
    code: 'FIRSTCUP',
    title: 'First Sips Welcome Offer',
    description: 'Flat ₹50 OFF on any handcrafted hot or cold beverage on orders above ₹199.',
    discount: '₹50 OFF',
    validTill: 'Ongoing 2026',
    terms: 'Applicable once per customer. Valid on hot coffees and signature frappes.',
    minOrder: 199,
    highlight: true
  },
  {
    id: 'ccd-frappe-hour',
    code: 'FRAPPE4TO7',
    title: 'Sunset Frappe Hour (4:00 PM – 7:00 PM)',
    description: 'Upgrade to a Large Devil’s Own or Kaapi Nirvana with complimentary dessert brownie bite.',
    discount: 'Free Bite Upgrade',
    validTill: 'Daily 4-7 PM',
    terms: 'Valid on in-store pickup and dine-in across participating metro cafés.',
    highlight: false
  },
  {
    id: 'ccd-bean-bundle',
    code: 'ESTATEBEAN',
    title: 'Chikmagalur Roast Bean Bundle',
    description: '15% OFF when purchasing 2 or more 250g whole bean or ground coffee packs.',
    discount: '15% OFF',
    validTill: 'Weekend Special',
    terms: 'Valid on Chikmagalur Arabica and Dark Forest Estate Roasts.',
    minOrder: 800,
    highlight: true
  }
];
