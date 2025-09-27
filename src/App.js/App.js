import React, { useState } from 'react';

function App() {
  const [guestData, setGuestData] = useState({
    neighborhood: 'Rio Nido Lodge',
    tripDuration: 3,
    interests: ['wine', 'nature'],
    travelStyle: 'relaxed'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [showSignatureExperiences, setShowSignatureExperiences] = useState(false);

  const contact = {
    email: 'concierge@rionidolodge.com',
    phone: '(707) 869-0821',
    address: '14711 Canyon Two Road, Guerneville, CA 95446',
    website: 'https://rionidolodge.com',
    hours: 'Concierge available 8:00 AM - 8:00 PM daily'
  };

  const signatureExperiences = [
    {
      id: 'redwood_meditation',
      name: 'Private Redwood Grove Meditation',
      description: 'Guided meditation among 800-year-old redwoods at dawn',
      location: 'Armstrong Redwoods State Natural Reserve',
      distance: '8 miles',
      duration: '90 minutes',
      priceRange: '$$$',
      bookingRequired: true,
      maxGuests: 6,
      bestTime: 'sunrise',
      localInsight: 'This grove has trees that were saplings when the Vikings reached America'
    },
    {
      id: 'hidden_winery_tour',
      name: 'Secret Cellar Wine Experience',
      description: 'Private tour of hidden wine cellars with the winemaker',
      location: 'Undisclosed boutique winery',
      distance: '12 miles',
      duration: '2 hours',
      priceRange: '$$$',
      bookingRequired: true,
      maxGuests: 8,
      bestTime: 'afternoon',
      localInsight: 'Access to wines not available to the public - some bottles are $300+'
    },
    {
      id: 'russian_river_glamping',
      name: 'Luxury River Glamping Experience',
      description: 'Overnight glamping with gourmet meals and river activities',
      location: 'Private riverfront property',
      distance: '5 miles',
      duration: 'overnight',
      priceRange: '$$$$',
      bookingRequired: true,
      maxGuests: 4,
      bestTime: 'sunset to sunrise',
      localInsight: 'The only luxury glamping directly on the Russian River - completely private'
    },
    {
      id: 'foraging_feast',
      name: 'Wild Mushroom Foraging & Chef Dinner',
      description: 'Guided foraging followed by a multi-course feast using your finds',
      location: 'Private redwood grove',
      distance: '15 miles',
      duration: '6 hours',
      priceRange: '$$$',
      bookingRequired: true,
      maxGuests: 12,
      bestTime: 'morning start',
      localInsight: 'Michelin-trained chef creates dishes based on what you forage that day'
    },
    {
      id: 'coastal_helicopter',
      name: 'Private Coastal Helicopter Tour',
      description: 'Helicopter tour of Sonoma Coast with wine country landing',
      location: 'Departs from Guerneville',
      distance: '0 miles',
      duration: '3 hours',
      priceRange: '$$$$',
      bookingRequired: true,
      maxGuests: 3,
      bestTime: 'golden hour',
      localInsight: 'Land at a private vineyard for exclusive tasting - only accessible by air'
    },
    {
      id: 'artisan_workshop',
      name: 'Master Craftsman Workshop Series',
      description: 'Learn traditional crafts from local artisan masters',
      location: 'Historic Sebastopol workshop',
      distance: '18 miles',
      duration: '4 hours',
      priceRange: '$$',
      bookingRequired: true,
      maxGuests: 6,
      bestTime: 'morning',
      localInsight: 'These artisans supply galleries in San Francisco and Napa Valley'
    }
  ];

  const hyperlocalBusinesses = {
    'Rio Nido Lodge': {
      dining: [
        { 
          name: "Villa Grande Market", 
          type: "Local Market & Deli", 
          description: "Family-owned market with artisanal sandwiches, local wines, and gourmet picnic supplies.", 
          rating: 4.6, 
          priceRange: "$",
          localInsight: "Try their famous tri-tip sandwich - a local legend for over 30 years",
          driveTime: "3 min drive",
          contact: "(707) 869-0949",
          address: "16380 Canyon Two Rd, Guerneville, CA",
          category: "dining",
          cluster: "lodge",
          hours: { open: 7, close: 19, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Big Bottom Market", 
          type: "Gourmet Market & Cafe", 
          description: "Upscale market featuring local artisanal foods, wine, and their famous biscuits.", 
          rating: 4.4, 
          priceRange: "$$",
          localInsight: "Weekend brunch gets busy - arrive before 10 AM or after 2 PM for shorter waits",
          driveTime: "8 min drive",
          contact: "(707) 604-7295",
          address: "16228 Main St, Guerneville, CA",
          category: "dining",
          cluster: "guerneville",
          hours: { open: 8, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "boon eat + drink", 
          type: "Farm-to-Table Restaurant", 
          description: "Rustic-chic restaurant serving California cuisine with local ingredients", 
          rating: 4.5, 
          priceRange: "$$$",
          localInsight: "Book ahead for dinner - their wood-fired dishes are worth the wait",
          driveTime: "8 min drive",
          contact: "(707) 869-0780",
          address: "16248 Main St, Guerneville, CA",
          category: "dining",
          cluster: "guerneville",
          hours: { open: 17, close: 22, timeAppropriate: ['evening'] }
        },
        { 
          name: "River's End Restaurant", 
          type: "Oceanfront Fine Dining", 
          description: "Dramatic clifftop restaurant overlooking the Russian River mouth and Pacific Ocean", 
          rating: 4.2, 
          priceRange: "$$$",
          localInsight: "Reserve a window table for sunset - the view is unforgettable",
          driveTime: "25 min drive",
          contact: "(707) 865-2484",
          address: "11048 CA-1, Jenner, CA",
          category: "dining",
          cluster: "coastal",
          hours: { open: 17, close: 21, timeAppropriate: ['evening'] }
        }
      ],
      wine: [
        { 
          name: "Furthermore Wines", 
          type: "Boutique Winery & Tasting Room", 
          description: "Intimate tasting room specializing in Russian River Valley Pinot Noir and Chardonnay", 
          rating: 4.7, 
          priceRange: "$$",
          localInsight: "Ask winemaker Erin about their limited-production Syrah - exceptional but rarely advertised",
          driveTime: "12 min drive",
          contact: "(707) 869-0390",
          address: "16280 Main St, Guerneville, CA",
          category: "wine",
          cluster: "guerneville",
          hours: { open: 11, close: 18, timeAppropriate: ['afternoon', 'evening'] }
        },
        { 
          name: "Williams Selyem Winery", 
          type: "Prestigious Pinot Noir Producer", 
          description: "Legendary winery known for exceptional Russian River Valley Pinot Noir", 
          rating: 4.8, 
          priceRange: "$$$",
          localInsight: "Book well in advance - their allocation list is highly coveted",
          driveTime: "12 min drive",
          contact: "(707) 433-6425",
          address: "7227 Westside Rd, Healdsburg, CA",
          category: "wine",
          cluster: "westside",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Rochioli Vineyards", 
          type: "Family Estate Winery", 
          description: "Fourth-generation family winery producing world-class Pinot Noir and Chardonnay", 
          rating: 4.9, 
          priceRange: "$$$",
          localInsight: "Try their estate Pinot Noir - some say it rivals Burgundy's finest",
          driveTime: "15 min drive",
          contact: "(707) 433-2305",
          address: "6192 Westside Rd, Healdsburg, CA",
          category: "wine",
          cluster: "westside",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Iron Horse Vineyards", 
          type: "Sparkling Wine Specialists", 
          description: "Historic estate known for sparkling wines served at White House state dinners", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "Their outdoor tastings on the terrace are magical at sunset",
          driveTime: "18 min drive",
          contact: "(707) 887-1507",
          address: "9786 Ross Station Rd, Sebastopol, CA",
          category: "wine",
          cluster: "sebastopol",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      nature: [
        { 
          name: "Armstrong Redwoods State Natural Reserve", 
          type: "Ancient Redwood Grove", 
          description: "Walk among 800-year-old coast redwoods in this cathedral-like grove", 
          rating: 4.8, 
          priceRange: "Free (parking $8)",
          localInsight: "Take the Pioneer Nature Trail early morning for magical light filtering through the canopy",
          driveTime: "8 min drive",
          contact: "(707) 869-2015",
          address: "17000 Armstrong Woods Rd, Guerneville, CA",
          category: "nature",
          cluster: "guerneville",
          hours: { open: 8, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Russian River", 
          type: "River Recreation", 
          description: "Gentle river perfect for kayaking, canoeing, swimming, and beach lounging", 
          rating: 4.6, 
          priceRange: "Free",
          localInsight: "Monte Rio Beach is less crowded than Guerneville's main beach",
          driveTime: "5 min walk",
          contact: "Various outfitters",
          address: "Multiple access points near lodge",
          category: "nature",
          cluster: "lodge",
          hours: { open: 6, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        },
        { 
          name: "Goat Rock Beach", 
          type: "Dramatic Coastal Beach", 
          description: "Stunning Pacific coastline where the Russian River meets the ocean", 
          rating: 4.7, 
          priceRange: "Free",
          localInsight: "Visit during pupping season (March-August) to see harbor seals, but keep your distance",
          driveTime: "25 min drive",
          contact: "(707) 875-3483",
          address: "Goat Rock Rd, Jenner, CA",
          category: "nature",
          cluster: "coastal",
          hours: { open: 6, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        }
      ],
      wellness: [
        { 
          name: "Osmosis Day Spa Sanctuary", 
          type: "Japanese-Inspired Spa", 
          description: "Unique spa featuring enzyme baths, massage, and meditation gardens", 
          rating: 4.4, 
          priceRange: "$$$",
          localInsight: "Book the cedar enzyme bath - their signature treatment and deeply detoxifying",
          driveTime: "20 min drive",
          contact: "(707) 823-8231",
          address: "209 Bohemian Hwy, Freestone, CA",
          category: "wellness",
          cluster: "freestone",
          hours: { open: 9, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Salt Point Yoga", 
          type: "Ocean View Yoga", 
          description: "Outdoor yoga classes on bluffs overlooking the Pacific Ocean", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "The sunset classes are transformative - bring layers as it gets windy",
          driveTime: "45 min drive",
          contact: "(707) 847-3570",
          address: "25050 CA-1, Jenner, CA",
          category: "wellness",
          cluster: "coastal",
          hours: { open: 7, close: 19, timeAppropriate: ['morning', 'evening'] }
        }
      ],
      adventure: [
        { 
          name: "Russian River Adventures", 
          type: "Kayak & Canoe Outfitter", 
          description: "Full-service outfitter offering kayak and canoe rentals, guided trips, and river shuttles", 
          rating: 4.5, 
          priceRange: "$$",
          localInsight: "The half-day trip from Forestville to Guerneville is perfect for beginners",
          driveTime: "8 min drive",
          contact: "(707) 869-9009",
          address: "20 Healdsburg Ave, Guerneville, CA",
          category: "adventure",
          cluster: "guerneville",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Sonoma Canopy Tours", 
          type: "Zipline Adventure", 
          description: "Thrilling zipline tours through redwood and Douglas fir canopy", 
          rating: 4.7, 
          priceRange: "$$$",
          localInsight: "Book the first tour of the day for the best wildlife viewing opportunities",
          driveTime: "25 min drive",
          contact: "(707) 849-1130",
          address: "6250 Bohemian Hwy, Occidental, CA",
          category: "adventure",
          cluster: "occidental",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      shopping: [
        { 
          name: "Guerneville 5 & 10", 
          type: "Vintage Five & Dime", 
          description: "Charming old-fashioned five and dime store with vintage goods and local crafts", 
          rating: 4.4, 
          priceRange: "$",
          localInsight: "They still have penny candy and vintage postcards - great for unique souvenirs",
          driveTime: "8 min drive",
          contact: "(707) 869-0632",
          address: "16290 Main St, Guerneville, CA",
          category: "shopping",
          cluster: "guerneville",
          hours: { open: 10, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        }
      ]
    }
  };

  const createBalancedDailyMix = (dayNumber, interests) => {
    const interestRotations = {
      1: interests.length >= 3 ? [interests[0], interests[1], interests[2]] : 
         interests.length >= 2 ? [interests[0], interests[1], interests[0]] : 
         [interests[0], interests[0], interests[0]],
      2: interests.length >= 3 ? [interests[1], interests[2], interests[0]] : 
         interests.length >= 2 ? [interests[1], interests[0], interests[1]] : 
         [interests[0], interests[0], interests[0]],
      3: interests.length >= 3 ? [interests[2], interests[0], interests[1]] : 
         interests.length >= 2 ? [interests[0], interests[1], interests[0]] : 
         [interests[0], interests[0], interests[0]]
    };
    
    const rotationKey = ((dayNumber - 1) % 3) + 1;
    return interestRotations[rotationKey];
  };

  const getBestBusinessForSlot = (timeSlot, interest, usedBusinesses, dayNumber) => {
    const neighborhoodBusinesses = hyperlocalBusinesses[guestData.neighborhood] || {};
    
    const timeSlotMapping = {
      'morning': ['wine', 'nature', 'wellness', 'shopping', 'adventure'],
      'lunch': ['dining'],
      'afternoon': ['wine', 'nature', 'adventure', 'shopping', 'wellness'],
      'evening': ['dining', 'wine', 'wellness']
    };
    
    const targetCategory = timeSlot === 'lunch' ? 'dining' : interest;
    const validCategories = timeSlot === 'lunch' ? ['dining'] : timeSlotMapping[timeSlot] || [];
    
    if (!validCategories.includes(targetCategory)) {
      return null;
    }
    
    const businessPool = neighborhoodBusinesses[targetCategory] || [];
    
    const availableBusinesses = businessPool.filter(business => {
      if (usedBusinesses.has(business.name)) return false;
      
      const hours = business.hours;
      if (!hours) return true;
      
      const timeSlotHours = {
        'morning': 9,
        'lunch': 12,
        'afternoon': 14,
        'evening': 17
      };
      
      const slotHour = timeSlotHours[timeSlot];
      return slotHour >= hours.open && slotHour < hours.close;
    });
    
    if (availableBusinesses.length === 0) {
      const fallbackBusinesses = validCategories.flatMap(cat => 
        (neighborhoodBusinesses[cat] || []).filter(b => !usedBusinesses.has(b.name))
      );
      
      if (fallbackBusinesses.length > 0) {
        return fallbackBusinesses[0];
      }
      
      const anyAvailableBusiness = Object.values(neighborhoodBusinesses)
        .flat()
        .find(b => !usedBusinesses.has(b.name));
      
      return anyAvailableBusiness || null;
    }
    
    return availableBusinesses[Math.floor(Math.random() * availableBusinesses.length)];
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const days = [];
      const usedBusinesses = new Set();
      
      for (let day = 1; day <= guestData.tripDuration; day++) {
        const dayActivities = [];
        const dailyInterestMix = createBalancedDailyMix(day, guestData.interests);
        
        const morningActivity = getBestBusinessForSlot('morning', dailyInterestMix[0], usedBusinesses, day);
        if (morningActivity) {
          dayActivities.push({
            time: '9:00 AM',
            activity: morningActivity,
            type: dailyInterestMix[0]
          });
          usedBusinesses.add(morningActivity.name);
        }
        
        const lunchActivity = getBestBusinessForSlot('lunch', 'dining', usedBusinesses, day);
        if (lunchActivity) {
          dayActivities.push({
            time: '12:00 PM',
            activity: lunchActivity,
            type: 'dining'
          });
          usedBusinesses.add(lunchActivity.name);
        }
        
        const afternoonActivity = getBestBusinessForSlot('afternoon', dailyInterestMix[1], usedBusinesses, day);
        if (afternoonActivity) {
          dayActivities.push({
            time: '2:00 PM',
            activity: afternoonActivity,
            type: dailyInterestMix[1]
          });
          usedBusinesses.add(afternoonActivity.name);
        }
        
        const eveningActivity = getBestBusinessForSlot('evening', dailyInterestMix[2], usedBusinesses, day);
        if (eveningActivity) {
          dayActivities.push({
            time: '5:30 PM',
            activity: eveningActivity,
            type: dailyInterestMix[2]
          });
          usedBusinesses.add(eveningActivity.name);
        }
        
        if (dayActivities.length === 0) {
          setError('Unable to generate activities for Day ' + day + '. Please contact our concierge.');
          setIsGenerating(false);
          return;
        }
        
        days.push({
          day: day,
          activities: dayActivities
        });
      }
      
      setItinerary(days);
      
    } catch (error) {
      setError('Unable to generate your itinerary. Please contact our concierge for assistance.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInterestChange = (interest) => {
    setGuestData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const getDurationButtonClass = (days) => {
    const baseClass = 'px-6 py-3 rounded-xl border-2 transition duration-300 font-semibold ';
    if (guestData.tripDuration === days) {
      return baseClass + 'border-red-600 bg-red-100 text-red-800 shadow-lg transform scale-105';
    }
    return baseClass + 'border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700';
  };

  const getInterestCardClass = (interestId) => {
    const baseClass = 'p-6 rounded-xl border-2 cursor-pointer transition duration-300 hover:shadow-lg ';
    if (guestData.interests.includes(interestId)) {
      return baseClass + 'border-red-600 bg-red-100 shadow-lg transform scale-105';
    }
    return baseClass + 'border-red-200 hover:border-red-400 hover:bg-red-50';
  };

  const getStyleCardClass = (styleId) => {
    const baseClass = 'p-6 rounded-xl border-2 cursor-pointer transition duration-300 hover:shadow-lg ';
    if (guestData.travelStyle === styleId) {
      return baseClass + 'border-red-600 bg-red-100 shadow-lg transform scale-105';
    }
    return baseClass + 'border-red-200 hover:border-red-400 hover:bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-400">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 leading-tight">RN</div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-red-800 text-sm font-bold">★</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4 tracking-wide">
            Rio Nido Lodge
          </h1>
          <p className="text-xl text-yellow-200 mb-4 font-light">
            Curated Russian River Valley Experiences
          </p>
          <p className="text-sm text-yellow-300 opacity-90">
            {contact.address} • {contact.phone}
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-yellow-400">
          <h2 className="text-3xl font-bold text-red-900 mb-8 text-center">
            Tell Us About Your Perfect Trip
          </h2>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-red-800 mb-4">
              How many days will you be staying?
            </label>
            <div className="flex gap-3 flex-wrap">
              {[1, 2, 3, 4].map(days => (
                <button
                  key={days}
                  onClick={() => setGuestData(prev => ({ ...prev, tripDuration: days }))}
                  className={getDurationButtonClass(days)}
                >
                  {days} day{days > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-red-800 mb-4">
              What interests you most? (Select multiple)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'wine', label: '🍷 Wine Tasting', desc: 'Boutique wineries & tastings' },
                { id: 'nature', label: '🌲 Nature', desc: 'Redwoods, rivers & trails' },
                { id: 'wellness', label: '🧘 Wellness', desc: 'Spas, yoga & relaxation' },
                { id: 'dining', label: '🍽️ Dining', desc: 'Farm-to-table & local cuisine' },
                { id: 'adventure', label: '🚣 Adventure', desc: 'Kayaking, hiking & outdoor fun' },
                { id: 'shopping', label: '🛍️ Shopping', desc: 'Local crafts & unique finds' }
              ].map(interest => (
                <div
                  key={interest.id}
                  onClick={() => handleInterestChange(interest.id)}
                  className={getInterestCardClass(interest.id)}
                >
                  <div className="font-semibold text-red-800 text-lg mb-2">{interest.label}</div>
                  <div className="text-red-600">{interest.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-red-800 mb-4">
              What's your travel style?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'stay-local', label: '🏡 Stay Local', desc: 'Within 10 minutes of the lodge' },
                { id: 'relaxed', label: '🚗 Relaxed Explorer', desc: 'Up to 20 minutes drive' },
                { id: 'day-trips', label: '🗺️ Day Trip Adventurer', desc: 'Willing to drive 30+ minutes' }
              ].map(style => (
                <div
                  key={style.id}
                  onClick={() => setGuestData(prev => ({ ...prev, travelStyle: style.id }))}
                  className={getStyleCardClass(style.id)}
                >
                  <div className="font-semibold text-red-800 text-lg mb-2">{style.label}</div>
                  <div className="text-red-600">{style.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={generateItinerary}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white font-bold py-6 px-8 rounded-xl hover:from-red-800 hover:to-red-900 transition duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-xl"
            >
              {isGenerating ? 'Creating Your Perfect Itinerary...' : 'Create My Curated Itinerary'}
            </button>
            
            <button 
              onClick={() => setShowSignatureExperiences(!showSignatureExperiences)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-bold py-6 px-8 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition duration-300 shadow-2xl transform hover:scale-105 text-xl"
            >
              ✨ Signature Experiences
            </button>
          </div>

          {error && (
            <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-red-800 font-semibold">{error}</p>
              <p className="text-red-600 mt-2">
                Need help? Contact our concierge at {contact.phone} or {contact.email}
              </p>
            </div>
          )}
        </div>

        {showSignatureExperiences && (
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-2xl p-8 mb-8 border-2 border-yellow-400">
            <h2 className="text-3xl font-bold text-red-900 mb-8 text-center">
              ✨ Signature Experiences Within 15 Miles
            </h2>
            <p className="text-center text-red-700 mb-8 text-lg">
              Exclusive experiences available only through Rio Nido Lodge
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {signatureExperiences.map((experience, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-yellow-300 hover:shadow-2xl transition duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-red-900 flex-1">{experience.name}</h3>
                    <span className="bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-sm font-bold">
                      {experience.priceRange}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{experience.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">📍 Location:</span> {experience.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">🚗 Distance:</span> {experience.distance}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">⏱️ Duration:</span> {experience.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">👥 Max Guests:</span> {experience.maxGuests}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">🕐 Best Time:</span> {experience.bestTime}
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg">
                    <p className="text-blue-900 text-sm">
                      <span className="font-bold">Insider Secret:</span> {experience.localInsight}
                    </p>
                  </div>

                  {experience.bookingRequired && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-800 text-sm font-semibold">
                        📞 Advance booking required - Contact concierge for reservations
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {itinerary.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
              Your Curated {guestData.tripDuration}-Day Experience
            </h2>

            {itinerary.map((day, index) => (
              <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-yellow-400">
                <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 px-8 py-6">
                  <h3 className="text-2xl font-bold text-yellow-400">
                    Day {day.day}
                  </h3>
                </div>

                <div className="p-8">
                  <div className="space-y-8">
                    {day.activities.map((item, activityIndex) => (
                      <div key={activityIndex} className="flex gap-6 p-6 bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl border border-yellow-300 shadow-lg">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-yellow-400 font-bold text-sm text-center">
                              {item.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-bold text-red-900">
                              {item.activity.name}
                            </h4>
                            <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full">
                              <span className="text-red-900">★</span>
                              <span className="text-sm font-semibold text-red-900">{item.activity.rating}</span>
                            </div>
                          </div>

                          <p className="text-red-700 font-semibold mb-3 text-lg">
                            {item.activity.type} • {item.activity.priceRange}
                          </p>

                          <p className="text-gray-800 mb-4 leading-relaxed">
                            {item.activity.description}
                          </p>

                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg">
                            <p className="text-blue-900">
                              <span className="font-bold">Insider Tip:</span> {item.activity.localInsight}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-red-700">
                              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                              <span className="font-semibold">Drive time from lodge: {item.activity.driveTime}</span>
                            </div>
                            {item.activity.contact && (
                              <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-lg">📞</span>
                                <span>{item.activity.contact}</span>
                              </div>
                            )}
                            {item.activity.address && (
                              <div className="flex items-center gap-3 text-gray-700">
                                <span className="text-lg">📍</span>
                                <span>{item.activity.address}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-2xl p-8 text-center shadow-2xl">
              <h3 className="text-2xl font-bold text-red-900 mb-4">
                Need Assistance?
              </h3>
              <p className="text-red-800 mb-6 text-lg">
                Our concierge team is here to help with reservations, directions, and recommendations.
              </p>
              <div className="space-y-3 text-red-700">
                <p className="flex items-center justify-center gap-3 text-lg">
                  <span>📞</span> {contact.phone}
                </p>
                <p className="flex items-center justify-center gap-3 text-lg">
                  <span>✉️</span> {contact.email}
                </p>
                <p className="flex items-center justify-center gap-3 text-lg">
                  <span>🕐</span> {contact.hours}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;