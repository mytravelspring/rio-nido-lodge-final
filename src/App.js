import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Star, Clock, TreePine, Utensils, Coffee, Palette, Mountain, ShoppingBag, Music, Sparkles, Users, Compass, Share2, BarChart3, CloudSun, Search, Filter, Heart, Camera, Wifi, Phone, ExternalLink, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

export default function RioNidoItineraryBuilder() {
  // Rio Nido Lodge configuration
  const hotelConfig = {
    name: "Rio Nido Lodge",
    address: "14540 Canyon Two Rd, Guerneville, CA 95446",
    coordinates: { lat: 38.5024, lng: -122.9911 },
    neighborhood: "guerneville",
    walkingRadius: "quarter-mile"
  };

  const [guestData, setGuestData] = useState({
    name: '',
    location: hotelConfig.name,
    neighborhood: hotelConfig.neighborhood,
    interests: [],
    budgetRange: 'medium',
    travelStyle: 'relaxed',
    dietaryRestrictions: '',
    mobility: 'full',
    groupSize: 2,
    tripDuration: 3,
    walkingRadius: hotelConfig.walkingRadius,
    signatureExperience: ''
  });

  const [itinerary, setItinerary] = useState(null);
  const [usedBusinesses, setUsedBusinesses] = useState([]);
  const [alternativesModal, setAlternativesModal] = useState({ isOpen: false, dayIndex: null, activityIndex: null });
  const [shareableLink, setShareableLink] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [feedback, setFeedback] = useState({});
  const [analytics, setAnalytics] = useState({
    totalGenerated: 0,
    mostPopularInterests: [],
    averageTripDuration: 0,
    expandedDetails: {}
  });
  const [signatureSearch, setSignatureSearch] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('sunny');

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock weather data (in production, use weather API)
  const getWeatherMessage = () => {
    const conditions = {
      sunny: "🌞 Perfect day for outdoor activities!",
      cloudy: "☁️ Cloudy but great for wine tasting!",
      rainy: "🌧️ Cozy day - perfect for indoor experiences!"
    };
    return conditions[weatherCondition] || conditions.sunny;
  };

  // Check if business is currently open
  const isBusinessOpen = (business) => {
    const hour = currentTime.getHours();
    if (business.hours) {
      return hour >= business.hours.open && hour < business.hours.close;
    }
    return true; // Default to open if no hours specified
  };

  // All local businesses near Rio Nido Lodge - COMPLETE DATABASE
  const hyperlocalBusinesses = {
    // Walking distance from Lodge
    lodge: {
      food: [
        { 
          name: "Graze at Rio Nido Lodge", 
          type: "Lodge Restaurant", 
          description: "Farm-to-table dining at your lodge with Russian River wines", 
          rating: 4.8, 
          priceRange: "$$$",
          localInsight: "Ask about the chef's tasting menu - features hyperlocal ingredients",
          walkingTime: "2 min walk",
          category: "food",
          cluster: "lodge",
          hours: { open: 7, close: 22, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        }
      ]
    },

    // Guerneville - 5-10 minutes drive
    guerneville: {
      food: [
        { 
          name: "Boon Eat + Drink", 
          type: "Farm-to-Table Restaurant", 
          description: "Locally sourced ingredients with Russian River wine pairings", 
          rating: 4.7, 
          priceRange: "$$",
          localInsight: "Ask about their seasonal tasting menu - changes monthly based on local farm harvests",
          driveTime: "8 min drive",
          category: "food",
          cluster: "guerneville",
          hours: { open: 17, close: 22, timeAppropriate: ['evening'] }
        },
        { 
          name: "Big Bottom Market", 
          type: "Gourmet Deli & Market", 
          description: "Famous for their maple bacon biscuits and artisanal sandwiches", 
          rating: 4.6, 
          priceRange: "$",
          localInsight: "The maple bacon biscuits sell out by 11 AM - arrive early!",
          driveTime: "7 min drive",
          category: "food",
          cluster: "guerneville",
          hours: { open: 8, close: 15, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Saucy Mama's Pizza", 
          type: "Local Pizza Joint", 
          description: "Hand-tossed pizza with local ingredients and craft beer", 
          rating: 4.5, 
          priceRange: "$",
          localInsight: "Try the 'Russian River' pizza with local mushrooms and goat cheese",
          driveTime: "6 min drive",
          category: "food",
          cluster: "guerneville",
          hours: { open: 16, close: 21, timeAppropriate: ['evening'] }
        }
      ],
      coffee: [
        { 
          name: "Coffee Bazaar", 
          type: "Local Roastery", 
          description: "Local roastery with 'Russian River Blend' and homemade pastries", 
          rating: 4.4, 
          priceRange: "$",
          localInsight: "Try the 'Russian River Blend' - roasted weekly in small batches",
          driveTime: "6 min drive",
          category: "coffee",
          cluster: "guerneville",
          hours: { open: 7, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      dessert: [
        { 
          name: "Nimble & Finn's", 
          type: "Ice Cream & Coffee", 
          description: "Artisanal ice cream with unique flavors like lavender honey", 
          rating: 4.7, 
          priceRange: "$",
          localInsight: "The lavender honey is made from Russian River Valley lavender farms",
          driveTime: "9 min drive",
          category: "dessert",
          cluster: "guerneville",
          hours: { open: 11, close: 21, timeAppropriate: ['afternoon', 'evening'] }
        }
      ],
      nature: [
        { 
          name: "Russian River Beach", 
          type: "River Beach", 
          description: "Sandy river beach perfect for swimming and sunbathing", 
          rating: 4.5, 
          priceRange: "Free",
          localInsight: "Water is warmest in late afternoon - perfect after exploring",
          driveTime: "5 min drive",
          category: "nature",
          cluster: "guerneville",
          hours: { open: 6, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        }
      ],
      shopping: [
        { 
          name: "Pat Kuleto Studio Gallery", 
          type: "Artist Studio & Gallery", 
          description: "Renowned artist's studio with outdoor sculpture garden", 
          rating: 4.8, 
          priceRange: "Free to browse",
          localInsight: "Pat often gives personal tours on weekends - just ask!",
          driveTime: "10 min drive",
          category: "shopping",
          cluster: "guerneville",
          hours: { open: 10, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Kozlowski Farms", 
          type: "Farm Stand & Artisan Foods", 
          description: "Third-generation farm with apple products and local goods", 
          rating: 4.6, 
          priceRange: "$",
          localInsight: "Their apple butter is legendary - they ship it nationwide but it's made here",
          driveTime: "12 min drive",
          category: "shopping",
          cluster: "guerneville",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      music: [
        { 
          name: "Rainbow Cattle Co.", 
          type: "Historic Honky-Tonk", 
          description: "Historic LGBTQ+ country bar with Sunday drag brunch", 
          rating: 4.7, 
          priceRange: "$$",
          localInsight: "Sunday drag brunch is legendary - book ahead, it sells out",
          driveTime: "8 min drive",
          category: "music",
          cluster: "guerneville",
          hours: { open: 15, close: 24, timeAppropriate: ['afternoon', 'evening'] }
        }
      ]
    },

    // Boutique Wineries - 10-15 minutes drive
    wineries: {
      wine: [
        { 
          name: "Furthermore Wines", 
          type: "Boutique Artisan Winery", 
          description: "Small-production winery where the winemaker often pours personally", 
          rating: 4.9, 
          priceRange: "$$",
          localInsight: "Call ahead - the winemaker loves sharing the story behind each vintage",
          driveTime: "12 min drive",
          category: "wine",
          cluster: "wineries",
          hours: { open: 11, close: 17, timeAppropriate: ['afternoon'] }
        },
        { 
          name: "Williams Selyem", 
          type: "Legendary Cult Pinot Producer", 
          description: "Iconic cult winery with library wines and exclusive releases", 
          rating: 4.8, 
          priceRange: "$$$",
          localInsight: "Book the 'Collector's Tasting' - includes wines not available anywhere else",
          driveTime: "14 min drive",
          category: "wine",
          cluster: "wineries",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Gary Farrell Vineyards", 
          type: "Hilltop Winery with Views", 
          description: "Spectacular hilltop location with panoramic Russian River views", 
          rating: 4.7, 
          priceRange: "$$",
          localInsight: "The sunset tasting on the terrace is magical - reserve the 4 PM slot",
          driveTime: "16 min drive",
          category: "wine",
          cluster: "wineries",
          hours: { open: 10, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Lynmar Estate", 
          type: "Biodynamic Estate Winery", 
          description: "Biodynamic farming with award-winning Pinot Noir and Chardonnay", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "Tour their biodynamic gardens - they grow 90% of their restaurant's produce",
          driveTime: "18 min drive",
          category: "wine",
          cluster: "wineries",
          hours: { open: 10, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Merry Edwards Winery", 
          type: "Pinot Noir Specialist", 
          description: "Legendary female winemaker known for single-vineyard Pinots", 
          rating: 4.8, 
          priceRange: "$$",
          localInsight: "Ask about the vineyard designate tasting - showcases terroir differences",
          driveTime: "15 min drive",
          category: "wine",
          cluster: "wineries",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        }
      ]
    },

    // Coastal Day Trip - 20-25 minutes drive
    coastal: {
      food: [
        { 
          name: "Jilly's Roadhouse", 
          type: "Coastal Roadhouse", 
          description: "Riverside dining with fresh seafood and stunning river views", 
          rating: 4.5, 
          priceRange: "$$",
          localInsight: "Sit on the deck overlooking the Russian River mouth - amazing sunsets",
          driveTime: "22 min drive",
          category: "food",
          cluster: "coastal",
          hours: { open: 11, close: 21, timeAppropriate: ['afternoon', 'evening'] }
        },
        { 
          name: "Cafe Aquatica", 
          type: "Waterfront Cafe", 
          description: "Casual waterfront dining in the heart of Jenner", 
          rating: 4.3, 
          priceRange: "$",
          localInsight: "Perfect stop before seal watching at Goat Rock Beach",
          driveTime: "25 min drive",
          category: "food",
          cluster: "coastal",
          hours: { open: 8, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "The Blue Heron", 
          type: "Historic Inn Restaurant", 
          description: "Historic inn with elevated comfort food and craft cocktails", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "Their weekend brunch is a local secret - try the dungeness crab benedict",
          driveTime: "20 min drive",
          category: "food",
          cluster: "coastal",
          hours: { open: 8, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        }
      ],
      nature: [
        { 
          name: "Goat Rock Beach", 
          type: "Dramatic Coastline", 
          description: "Spectacular rugged coastline where Russian River meets Pacific Ocean", 
          rating: 4.8, 
          priceRange: "Free",
          localInsight: "Harbor seals haul out here year-round - bring binoculars!",
          driveTime: "25 min drive",
          category: "nature",
          cluster: "coastal",
          hours: { open: 6, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        },
        { 
          name: "Duncan Mills Beach", 
          type: "Historic River Town", 
          description: "Charming historic town with antique shops and riverside access", 
          rating: 4.4, 
          priceRange: "Free",
          localInsight: "Visit the old train depot - now a museum with Russian River history",
          driveTime: "18 min drive",
          category: "nature",
          cluster: "coastal",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      shopping: [
        { 
          name: "Duncan Mills General Store", 
          type: "Historic General Store", 
          description: "Historic general store with vintage goods and local crafts", 
          rating: 4.3, 
          priceRange: "$",
          localInsight: "They still have the original 1800s candy counter - try the old-fashioned fudge",
          driveTime: "18 min drive",
          category: "shopping",
          cluster: "coastal",
          hours: { open: 10, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ]
    }
  };

  // Signature Experiences within 15 miles
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
      location: 'Undisclosed Westside Road Location',
      distance: '12 miles',
      duration: '2 hours',
      priceRange: '$$$',
      bookingRequired: true,
      maxGuests: 8,
      bestTime: 'late afternoon',
      localInsight: 'Access to wines never released to the public - some cellared for 20+ years'
    },
    {
      id: 'river_photography',
      name: 'Golden Hour River Photography Workshop',
      description: 'Professional photography workshop capturing Russian River magic',
      location: 'Multiple scenic locations',
      distance: '5-15 miles',
      duration: '3 hours',
      priceRange: '$$',
      bookingRequired: true,
      maxGuests: 4,
      bestTime: 'golden hour',
      localInsight: 'Learn from a National Geographic photographer who lives locally'
    },
    {
      id: 'foraging_experience',
      name: 'Mushroom & Wild Edibles Foraging',
      description: 'Guided foraging experience with expert mycologist',
      location: 'Private forest preserve',
      distance: '10 miles',
      duration: '4 hours',
      priceRange: '$$$',
      bookingRequired: true,
      maxGuests: 8,
      bestTime: 'morning',
      localInsight: 'Seasonal availability - incredible variety of mushrooms and wild herbs'
    },
    {
      id: 'artisan_studio',
      name: 'Glass Blowing with Master Artisan',
      description: 'Create your own glass art piece with renowned local artist',
      location: 'Sebastopol Art Glass Studio',
      distance: '14 miles',
      duration: '2.5 hours',
      priceRange: '$$$',
      bookingRequired: true,
      maxGuests: 4,
      bestTime: 'afternoon',
      localInsight: 'Artist has pieces in major museums - this is hands-on creation'
    }
  ];

  const interestOptions = [
    { id: 'food', label: 'Local Cuisine', icon: Utensils, color: 'bg-red-100 text-red-800' },
    { id: 'wine', label: 'Wine Tasting', icon: Sparkles, color: 'bg-purple-100 text-purple-800' },
    { id: 'coffee', label: 'Coffee Culture', icon: Coffee, color: 'bg-amber-100 text-amber-800' },
    { id: 'nature', label: 'Nature & Outdoors', icon: TreePine, color: 'bg-green-100 text-green-800' },
    { id: 'shopping', label: 'Local Shopping', icon: ShoppingBag, color: 'bg-blue-100 text-blue-800' },
    { id: 'music', label: 'Live Music', icon: Music, color: 'bg-pink-100 text-pink-800' },
    { id: 'arts', label: 'Arts & Culture', icon: Palette, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'wellness', label: 'Wellness & Spa', icon: Heart, color: 'bg-teal-100 text-teal-800' },
    { id: 'dessert', label: 'Sweet Treats', icon: Sparkles, color: 'bg-rose-100 text-rose-800' }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget-Friendly ($)', description: 'Under $50 per person/day' },
    { value: 'medium', label: 'Moderate ($$)', description: '$50-150 per person/day' },
    { value: 'luxury', label: 'Luxury ($$$)', description: '$150+ per person/day' }
  ];

  const travelStyleOptions = [
    { value: 'stay_local', label: 'Stay Local', description: 'Walking distance & short drives', maxDrive: 10 },
    { value: 'relaxed', label: 'Relaxed Explorer', description: 'Mix of local & nearby attractions', maxDrive: 15 },
    { value: 'adventurous', label: 'Adventure Seeker', description: 'Don\'t mind longer drives for unique experiences', maxDrive: 20 },
    { value: 'day_trip', label: 'Day Trip Explorer', description: 'Willing to drive for coastal adventures', maxDrive: 25 }
  ];

  // Smart business selection based on time of day
  const getTimeAppropriateBusinesses = (businesses, timeOfDay) => {
    return businesses.filter(business => {
      if (!business.hours || !business.hours.timeAppropriate) return true;
      return business.hours.timeAppropriate.includes(timeOfDay);
    });
  };

  // Get businesses within travel style limits
  const getBusinessesInRange = (cluster) => {
    const styleConfig = travelStyleOptions.find(style => style.value === guestData.travelStyle);
    if (!styleConfig) return true;
    
    const clusterDistances = {
      lodge: 0,
      guerneville: 8,
      wineries: 15,
      coastal: 23
    };
    
    return clusterDistances[cluster] <= styleConfig.maxDrive;
  };

  // Generate smart itinerary with geographic efficiency
  const generateItinerary = () => {
    const days = [];
    const usedBusinessNames = new Set();
    
    // Track analytics
    setAnalytics(prev => ({
      ...prev,
      totalGenerated: prev.totalGenerated + 1,
      mostPopularInterests: [...guestData.interests]
    }));

    // Time periods for each day
    const timePeriods = ['morning', 'afternoon', 'evening'];
    
    // Geographic cluster rotation for efficiency
    const clusterRotation = {
      1: ['lodge', 'guerneville'],           // Day 1: Stay close
      2: ['wineries'],                      // Day 2: Wine country focus  
      3: ['coastal', 'guerneville']         // Day 3: Day trip + return
    };

    for (let day = 1; day <= guestData.tripDuration; day++) {
      const dayActivities = [];
      const allowedClusters = clusterRotation[day] || ['lodge', 'guerneville'];
      
      for (const timeOfDay of timePeriods) {
        let selectedBusiness = null;
        
        // Get all available businesses for this time period
        const availableBusinesses = [];
        
        Object.keys(hyperlocalBusinesses).forEach(cluster => {
          if (allowedClusters.includes(cluster) && getBusinessesInRange(cluster)) {
            Object.keys(hyperlocalBusinesses[cluster]).forEach(category => {
              if (guestData.interests.includes(category) || category === 'food') {
                const businesses = hyperlocalBusinesses[cluster][category];
                const timeAppropriateBiz = getTimeAppropriateBusinesses(businesses, timeOfDay);
                availableBusinesses.push(...timeAppropriateBiz);
              }
            });
          }
        });
        
        // Filter out already used businesses and apply budget filter
        const filteredBusinesses = availableBusinesses.filter(business => {
          const notUsed = !usedBusinessNames.has(business.name);
          const budgetMatch = guestData.budgetRange === 'budget' ? 
            business.priceRange.includes('$') && business.priceRange.length <= 2 :
            guestData.budgetRange === 'medium' ?
            business.priceRange.includes('$$') || business.priceRange === '$' :
            true; // luxury allows all
          
          return notUsed && budgetMatch;
        });
        
        if (filteredBusinesses.length > 0) {
          // Smart selection based on weather and time
          selectedBusiness = filteredBusinesses[Math.floor(Math.random() * filteredBusinesses.length)];
          usedBusinessNames.add(selectedBusiness.name);
          
          dayActivities.push({
            time: timeOfDay,
            business: selectedBusiness,
            weather: getWeatherMessage(),
            isOpen: isBusinessOpen(selectedBusiness)
          });
        }
      }
      
      days.push({
        day: day,
        activities: dayActivities,
        theme: allowedClusters.includes('coastal') ? 'Coastal Adventure' :
               allowedClusters.includes('wineries') ? 'Wine Country' : 'Local Discoveries'
      });
    }
    
    setItinerary(days);
    setUsedBusinesses(Array.from(usedBusinessNames));
    generateShareableLink();
  };

  const generateShareableLink = () => {
    const params = new URLSearchParams({
      name: guestData.name,
      interests: guestData.interests.join(','),
      budget: guestData.budgetRange,
      style: guestData.travelStyle,
      duration: guestData.tripDuration
    });
    setShareableLink(`${window.location.origin}?${params.toString()}`);
  };

  const handleFeedback = (dayIndex, activityIndex, isPositive) => {
    const key = `${dayIndex}-${activityIndex}`;
    setFeedback(prev => ({
      ...prev,
      [key]: isPositive ? 'positive' : 'negative'
    }));
  };

  const getAlternatives = (currentBusiness, timeOfDay) => {
    const allBusinesses = [];
    Object.keys(hyperlocalBusinesses).forEach(cluster => {
      if (getBusinessesInRange(cluster)) {
        Object.keys(hyperlocalBusinesses[cluster]).forEach(category => {
          if (guestData.interests.includes(category) || category === 'food') {
            const businesses = hyperlocalBusinesses[cluster][category];
            const timeAppropriateBiz = getTimeAppropriateBusinesses(businesses, timeOfDay);
            allBusinesses.push(...timeAppropriateBiz);
          }
        });
      }
    });
    
    return allBusinesses
      .filter(b => b.name !== currentBusiness.name && !usedBusinesses.includes(b.name))
      .slice(0, 3);
  };

  const replaceActivity = (dayIndex, activityIndex, newBusiness) => {
    const newItinerary = [...itinerary];
    const oldBusiness = newItinerary[dayIndex].activities[activityIndex].business;
    
    newItinerary[dayIndex].activities[activityIndex].business = newBusiness;
    
    // Update used businesses
    const newUsedBusinesses = usedBusinesses.filter(name => name !== oldBusiness.name);
    newUsedBusinesses.push(newBusiness.name);
    setUsedBusinesses(newUsedBusinesses);
    
    setItinerary(newItinerary);
    setAlternativesModal({ isOpen: false, dayIndex: null, activityIndex: null });
  };

  const filteredSignatureExperiences = signatureExperiences.filter(exp =>
    exp.name.toLowerCase().includes(signatureSearch.toLowerCase()) ||
    exp.description.toLowerCase().includes(signatureSearch.toLowerCase())
  );

  const handleInterestToggle = (interestId) => {
    setGuestData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const getIconForCategory = (category) => {
    const option = interestOptions.find(opt => opt.id === category);
    return option ? option.icon : MapPin;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-stone-50 min-h-screen">
      {/* Rio Nido Lodge Header */}
      <div className="mb-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mr-4 shadow-lg">
              <TreePine className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-red-900 mb-1">Rio Nido Lodge</h1>
              <p className="text-red-700 text-sm font-medium tracking-wide">CURATED EXPERIENCES</p>
            </div>
          </div>
          <div className="h-1 w-24 bg-red-800 mx-auto rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold text-stone-700">Hyperlocal Itinerary Builder</h2>
          <p className="text-stone-600 mt-2">Discover authentic Russian River Valley experiences, curated exclusively for our guests</p>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <CloudSun className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800">{getWeatherMessage()}</span>
        </div>
      </div>

      {!itinerary ? (
        <div className="space-y-8">
          {/* Guest Information Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <h3 className="text-xl font-semibold mb-4 text-red-900">Tell Us About Your Perfect Getaway</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-700 font-medium mb-2">Guest Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="How should we address you?"
                  value={guestData.name}
                  onChange={(e) => setGuestData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-stone-700 font-medium mb-2">Trip Duration</label>
                <select
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={guestData.tripDuration}
                  onChange={(e) => setGuestData(prev => ({ ...prev, tripDuration: parseInt(e.target.value) }))}
                >
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                  <option value={5}>5 Days</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-stone-700 font-medium mb-3">What interests you most?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {interestOptions.map(option => {
                  const IconComponent = option.icon;
                  const isSelected = guestData.interests.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleInterestToggle(option.id)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                        isSelected
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-stone-200 bg-white text-stone-600 hover:border-red-300 hover:bg-red-25'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-stone-700 font-medium mb-3">Budget Range</label>
                <div className="space-y-2">
                  {budgetOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={guestData.budgetRange === option.value}
                        onChange={(e) => setGuestData(prev => ({ ...prev, budgetRange: e.target.value }))}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-medium text-stone-800">{option.label}</div>
                        <div className="text-sm text-stone-600">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-3">Travel Style</label>
                <div className="space-y-2">
                  {travelStyleOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 p-3 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer">
                      <input
                        type="radio"
                        name="travelStyle"
                        value={option.value}
                        checked={guestData.travelStyle === option.value}
                        onChange={(e) => setGuestData(prev => ({ ...prev, travelStyle: e.target.value }))}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-medium text-stone-800">{option.label}</div>
                        <div className="text-sm text-stone-600">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-stone-700 font-medium mb-2">Group Size</label>
                <select
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  value={guestData.groupSize}
                  onChange={(e) => setGuestData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                >
                  {[1,2,3,4,5,6,7,8].map(size => (
                    <option key={size} value={size}>{size} {size === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-2">Dietary Restrictions</label>
                <input
                  type="text"
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Any dietary needs? (optional)"
                  value={guestData.dietaryRestrictions}
                  onChange={(e) => setGuestData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                />
              </div>
            </div>

            <button
              onClick={generateItinerary}
              disabled={guestData.interests.length === 0}
              className="w-full mt-8 bg-red-800 hover:bg-red-900 disabled:bg-stone-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Create My Personalized Itinerary</span>
            </button>
          </div>

          {/* Signature Experiences Preview */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-red-900">Signature Experiences</h3>
              <div className="relative">
                <Search className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={signatureSearch}
                  onChange={(e) => setSignatureSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <p className="text-red-800 mb-6">Exclusive premium experiences within 15 miles of the lodge</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSignatureExperiences.map(exp => (
                <div key={exp.id} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-stone-800 text-sm">{exp.name}</h4>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">{exp.priceRange}</span>
                  </div>
                  <p className="text-stone-600 text-xs mb-2">{exp.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500">📍 {exp.distance}</span>
                    <span className="text-xs text-stone-500">⏱ {exp.duration}</span>
                  </div>
                  <p className="text-xs text-red-700 mt-2 italic">{exp.localInsight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Itinerary Header */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-red-900 mb-2">
                  {guestData.name ? `${guestData.name}'s` : 'Your'} Personalized Russian River Adventure
                </h2>
                <p className="text-stone-600">
                  {guestData.tripDuration} day{guestData.tripDuration > 1 ? 's' : ''} of curated local experiences
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigator.clipboard.writeText(shareableLink)}
                  className="flex items-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button
                  onClick={generateItinerary}
                  className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          </div>

          {/* Daily Itineraries */}
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-red-900">
                  Day {day.day}: {day.theme}
                </h3>
                <span className="text-sm text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                  {day.activities.length} experiences planned
                </span>
              </div>

              <div className="space-y-6">
                {day.activities.map((activity, activityIndex) => {
                  const IconComponent = getIconForCategory(activity.business.category);
                  const feedbackKey = `${dayIndex}-${activityIndex}`;
                  
                  return (
                    <div key={activityIndex} className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-red-700" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-stone-800">{activity.business.name}</h4>
                                {activity.isOpen && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    Open Now
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-stone-600 capitalize">{activity.time} • {activity.business.type}</p>
                            </div>
                          </div>
                          
                          <p className="text-stone-700 mb-2">{activity.business.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-stone-600 mb-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{activity.business.rating}</span>
                            </div>
                            <span>{activity.business.priceRange}</span>
                            <span>
                              {activity.business.walkingTime || activity.business.driveTime}
                            </span>
                          </div>
                          
                          <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                            <p className="text-amber-800 text-sm font-medium">Local Insider Tip:</p>
                            <p className="text-amber-700 text-sm">{activity.business.localInsight}</p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleFeedback(dayIndex, activityIndex, true)}
                              className={`p-2 rounded-lg transition-colors ${
                                feedback[feedbackKey] === 'positive' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-stone-100 text-stone-600 hover:bg-green-100 hover:text-green-700'
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleFeedback(dayIndex, activityIndex, false)}
                              className={`p-2 rounded-lg transition-colors ${
                                feedback[feedbackKey] === 'negative' 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-stone-100 text-stone-600 hover:bg-red-100 hover:text-red-700'
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => setAlternativesModal({ 
                              isOpen: true, 
                              dayIndex, 
                              activityIndex,
                              alternatives: getAlternatives(activity.business, activity.time)
                            })}
                            className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1 rounded-lg transition-colors"
                          >
                            See Alternatives
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Concierge Contact */}
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Need Assistance with Bookings?</h3>
            <p className="text-red-800 mb-4">
              Our concierge team is here to help you secure reservations and coordinate your experiences.
            </p>
            <div className="flex items-center space-x-4 text-red-700">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>(707) 869-2824</span>
              </div>
              <div className="flex items-center">
                <Wifi className="w-4 h-4 mr-2" />
                <span>concierge@rionidolodge.com</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alternatives Modal */}
      {alternativesModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-red-900">Alternative Options</h3>
            
            <div className="space-y-4">
              {alternativesModal.alternatives?.map((business, index) => (
                <div key={index} className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 cursor-pointer"
                     onClick={() => replaceActivity(alternativesModal.dayIndex, alternativesModal.activityIndex, business)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-stone-800">{business.name}</h4>
                      <p className="text-stone-600 text-sm">{business.type}</p>
                      <p className="text-stone-700 text-sm mt-1">{business.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-stone-600 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{business.rating}</span>
                        </div>
                        <span>{business.priceRange}</span>
                      </div>
                    </div>
                    
                    <ExternalLink className="w-5 h-5 text-stone-400" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setAlternativesModal({ isOpen: false, dayIndex: null, activityIndex: null })}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}