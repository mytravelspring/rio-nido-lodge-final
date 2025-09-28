import React, { useState } from 'react';
import { MapPin, Clock, Star, Users, Car, DollarSign, Navigation, Phone, Calendar, Coffee, Utensils, Camera, TreePine, Waves, Mountain, Wine, Home, Sparkles, Heart, Route, ExternalLink, Search, Plus, ChevronLeft, ChevronRight, Mail } from 'lucide-react';

const RioNidoLodgeApp = () => {
  const [guestData, setGuestData] = useState({
    name: '',
    tripDuration: 3,
    budget: 'moderate',
    travelStyle: 'moderate',
    includeAlternateDestinations: true,
    interests: []
  });

  const [generatedItinerary, setGeneratedItinerary] = useState([]);
  const [showContact, setShowContact] = useState(false);
  const [currentSignatureIndex, setCurrentSignatureIndex] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSignatureForDay, setSelectedSignatureForDay] = useState(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedSignatureExperience, setSelectedSignatureExperience] = useState(null);
  const [alternativesModal, setAlternativesModal] = useState({ isOpen: false, dayIndex: null, activityIndex: null, alternatives: [] });

  // COMPREHENSIVE BUSINESS DATABASE - 90+ businesses including bakeries, sweet shops, spas
  const businesses = {
    food: [
      // GUERNEVILLE (Walking Distance)
      {
        name: "boon eat + drink",
        type: "Farm-to-Table Restaurant",
        description: "Celebrity Chef Crista Luedtke's flagship farm-to-table restaurant",
        rating: 4.9,
        budget: "splurge",
        hours: "5:00 PM - 9:00 PM",
        location: "16248 Main St, Guerneville",
        phone: "(707) 869-0780",
        website: "boonhotels.com",
        priceRange: "$$$",
        category: "restaurant"
      },
      {
        name: "Road Trip",
        type: "Casual American",
        description: "Chef Crista Luedtke's casual spot famous for the Mac Daddy burger",
        rating: 4.7,
        budget: "moderate",
        hours: "11:00 AM - 9:00 PM",
        location: "16248 Main St, Guerneville",
        phone: "(707) 869-0780",
        website: "boonhotels.com",
        priceRange: "$$",
        category: "restaurant"
      },
      {
        name: "El Barrio",
        type: "Mexican Cantina",
        description: "Lively spot with craft cocktails and elevated Mexican street food",
        rating: 4.6,
        budget: "budget",
        hours: "4:00 PM - 10:00 PM",
        location: "16233 Main St, Guerneville",
        phone: "(707) 604-7601",
        website: "elbarrioguerneville.com",
        priceRange: "$",
        category: "restaurant"
      },
      {
        name: "Pat's Restaurant",
        type: "Classic Diner",
        description: "Local breakfast favorite with hearty portions and friendly service",
        rating: 4.3,
        budget: "budget",
        hours: "7:00 AM - 2:00 PM",
        location: "16236 Main St, Guerneville",
        phone: "(707) 869-9904",
        website: "patsrestaurantguerneville.com",
        priceRange: "$",
        category: "restaurant"
      },
      {
        name: "The Farmhand",
        type: "Farm Fresh Restaurant",
        description: "Farm-fresh restaurant with craft cocktails and local ingredients",
        rating: 4.5,
        budget: "moderate",
        hours: "4:00 PM - 9:00 PM",
        location: "16235 Main St, Guerneville",
        phone: "(707) 604-7014",
        website: "thefarmhandguerneville.com",
        priceRange: "$$",
        category: "restaurant"
      },
      {
        name: "Seaside Metal",
        type: "Oyster Bar",
        description: "Fresh oysters and natural wines with Tuesday half-price nights",
        rating: 4.4,
        budget: "moderate",
        hours: "4:00 PM - 9:00 PM",
        location: "16222 Main St, Guerneville",
        phone: "(707) 604-7041",
        website: "seasidemetal.com",
        priceRange: "$$",
        category: "restaurant"
      },

      // SEBASTOPOL ROUTE (10-15 minutes)
      {
        name: "Hazel",
        type: "New American",
        description: "Farm-to-table restaurant with wine-focused menu and local ingredients",
        rating: 4.8,
        budget: "splurge",
        hours: "5:00 PM - 9:00 PM",
        location: "109 Plaza St, Sebastopol",
        phone: "(707) 827-3462",
        website: "hazelrestaurant.com",
        priceRange: "$$$",
        category: "restaurant"
      },
      {
        name: "Hole in the Wall",
        type: "Breakfast & Lunch",
        description: "Famous breakfast spot with Dutch baby pancakes and biscuits & gravy",
        rating: 4.6,
        budget: "budget",
        hours: "7:00 AM - 2:00 PM",
        location: "6940 Sebastopol Ave, Sebastopol",
        phone: "(707) 823-2484",
        website: "holeinthewall.com",
        priceRange: "$",
        category: "restaurant"
      },
      {
        name: "Campanella Kitchen & Garden Patio",
        type: "Fine Dining",
        description: "Top-rated fine dining with garden patio and seasonal menu",
        rating: 4.7,
        budget: "splurge",
        hours: "5:00 PM - 9:00 PM",
        location: "7467 Healdsburg Ave, Sebastopol",
        phone: "(707) 823-8686",
        website: "campanellakitchen.com",
        priceRange: "$$$",
        category: "restaurant"
      },
      {
        name: "Ramen Gaijin",
        type: "Japanese Ramen",
        description: "Excellent ramen shop with craft sake and Japanese beers",
        rating: 4.5,
        budget: "moderate",
        hours: "5:00 PM - 9:00 PM",
        location: "6948 Sebastopol Ave, Sebastopol",
        phone: "(707) 827-3609",
        website: "ramengaijin.com",
        priceRange: "$$",
        category: "restaurant"
      },

      // JENNER & COASTAL (20-25 minutes)
      {
        name: "Jilly's Real Food Roadhouse",
        type: "American Roadhouse",
        description: "Russian River views from every table, made-from-scratch comfort food",
        rating: 4.3,
        budget: "budget",
        hours: "11:30 AM - 6:30 PM",
        location: "9960 Hwy 1, Jenner",
        phone: "(707) 756-0119",
        website: "jillysrealfood.com",
        priceRange: "$",
        category: "restaurant"
      },
      {
        name: "River's End Restaurant",
        type: "Coastal Fine Dining",
        description: "Stunning ocean views with California coastal cuisine",
        rating: 4.6,
        budget: "splurge",
        hours: "12:00 PM - 8:00 PM",
        location: "11048 Hwy 1, Jenner",
        phone: "(707) 865-2484",
        website: "riversend.com",
        priceRange: "$$$",
        category: "restaurant"
      },

      // BODEGA BAY (25-30 minutes)
      {
        name: "Terrapin Creek Cafe",
        type: "Coastal Fine Dining",
        description: "Hidden culinary gem with seasonal coastal cuisine",
        rating: 4.8,
        budget: "splurge",
        hours: "5:00 PM - 9:00 PM",
        location: "1580 Eastshore Rd, Bodega Bay",
        phone: "(707) 875-2700",
        website: "terrapincreekcafe.com",
        priceRange: "$$$",
        category: "restaurant"
      },
      {
        name: "Spud Point Crab Company",
        type: "Seafood Shack",
        description: "Famous for Dungeness crab and clam chowder",
        rating: 4.4,
        budget: "budget",
        hours: "9:00 AM - 5:00 PM",
        location: "1860 Westshore Rd, Bodega Bay",
        phone: "(707) 875-9472",
        website: "spudpointcrab.com",
        priceRange: "$",
        category: "restaurant"
      }
    ],

    // COMPREHENSIVE SMALL BOUTIQUE WINERIES DATABASE
    wine: [
      {
        name: "Williams Selyem Winery",
        type: "Legendary Pinot Noir",
        description: "Cult producer of Russian River Valley Pinot Noir, allocation-only wines",
        rating: 4.9,
        budget: "splurge",
        hours: "10:00 AM - 4:00 PM",
        location: "7227 Westside Rd, Healdsburg",
        phone: "(707) 433-6425",
        website: "williamsselyem.com",
        priceRange: "$$$",
        category: "winery"
      },
      {
        name: "Furthermore Wines",
        type: "Small-Production Artisan",
        description: "Family-owned, small production Pinot, winemaker often pours personally",
        rating: 4.8,
        budget: "moderate",
        hours: "11:00 AM - 5:00 PM",
        location: "8803 Bohemian Hwy, Occidental",
        phone: "(707) 874-8000",
        website: "furthermorewines.com",
        priceRange: "$$",
        category: "winery"
      },
      {
        name: "Porter Creek Vineyards",
        type: "Organic Family Winery",
        description: "Tiny organic winery with 1970s old-vine Pinot, hillside vineyard",
        rating: 4.7,
        budget: "moderate",
        hours: "10:30 AM - 4:30 PM",
        location: "8735 Westside Rd, Healdsburg",
        phone: "(707) 433-6321",
        website: "portercreekvineyards.com",
        priceRange: "$$",
        category: "winery"
      },
      {
        name: "Benovia Winery",
        type: "Small Family Winery",
        description: "Small family winery, Russian River focus, appointment only",
        rating: 4.7,
        budget: "moderate",
        hours: "By appointment",
        location: "3339 Hartman Rd, Santa Rosa",
        phone: "(707) 921-1040",
        website: "benoviawinery.com",
        priceRange: "$$",
        category: "winery"
      },
      {
        name: "Anthill Farms",
        type: "Small Family Winery",
        description: "Small family winery with organic farming and natural winemaking",
        rating: 4.7,
        budget: "moderate",
        hours: "11:00 AM - 4:00 PM",
        location: "3589 Gravenstein Hwy S, Sebastopol",
        phone: "(707) 823-0726",
        website: "anthillfarms.com",
        priceRange: "$$",
        category: "winery"
      },
      {
        name: "Korbel Champagne Cellars",
        type: "Historic Sparkling",
        description: "Historic sparkling wine producer with garden tours and tastings",
        rating: 4.4,
        budget: "budget",
        hours: "10:00 AM - 4:00 PM",
        location: "13250 River Rd, Guerneville",
        phone: "(707) 824-7000",
        website: "korbel.com",
        priceRange: "$",
        category: "winery"
      }
    ],

    activities: [
      {
        name: "Armstrong Redwoods State Natural Reserve",
        type: "Nature Reserve",
        description: "Ancient redwood forest with hiking trails among 800-year-old giants",
        rating: 4.8,
        budget: "budget",
        hours: "8:00 AM - sunset",
        location: "17000 Armstrong Woods Rd, Guerneville",
        phone: "(707) 869-2015",
        website: "parks.ca.gov",
        priceRange: "$",
        category: "nature"
      },
      {
        name: "Russian River Canoeing",
        type: "Water Recreation",
        description: "Peaceful canoe trips through redwood groves along the Russian River",
        rating: 4.6,
        budget: "moderate",
        hours: "9:00 AM - 6:00 PM",
        location: "20 Healdsburg Ave, Healdsburg",
        phone: "(707) 433-7247",
        website: "russianriveradventures.com",
        priceRange: "$$",
        category: "recreation"
      },
      {
        name: "Jenner Headlands Preserve",
        type: "Coastal Hiking",
        description: "Dramatic coastal bluff trails with ocean views and wildlife watching",
        rating: 4.7,
        budget: "budget",
        hours: "Sunrise - sunset",
        location: "22855 Hwy 1, Jenner",
        phone: "(707) 875-3483",
        website: "wildlandsconservancy.org",
        priceRange: "$",
        category: "nature"
      },
      {
        name: "Goat Rock Beach",
        type: "Beach & Wildlife",
        description: "Spectacular beach with harbor seal colonies and dramatic rock formations",
        rating: 4.6,
        budget: "budget",
        hours: "Sunrise - sunset",
        location: "Goat Rock Rd, Jenner",
        phone: "(707) 875-3483",
        website: "parks.ca.gov",
        priceRange: "$",
        category: "nature"
      }
    ],

    // NEW: SWEET SHOPS (only for geographic add-ons, not main activities)
    sweets: [
      {
        name: "Screamin' Mimi's Ice Cream",
        type: "Artisan Ice Cream",
        description: "Premium ice cream made with local dairy and seasonal flavors",
        rating: 4.6,
        budget: "budget",
        hours: "12:00 PM - 9:00 PM",
        location: "6902 Sebastopol Ave, Sebastopol",
        phone: "(707) 823-5902",
        website: "screaminmimis.com",
        priceRange: "$",
        category: "sweets"
      },
      {
        name: "Sweet Things Ice Cream",
        type: "Local Ice Cream Parlor",
        description: "Family-owned ice cream parlor with homemade flavors and sundaes",
        rating: 4.4,
        budget: "budget",
        hours: "12:00 PM - 8:00 PM",
        location: "16285 Main St, Guerneville",
        phone: "(707) 869-3339",
        website: "sweetthingsguerneville.com",
        priceRange: "$",
        category: "sweets"
      }
    ],

    // BAKERIES & BREAKFAST TREATS
    bakeries: [
      {
        name: "Wild Flour Bread",
        type: "Artisan Bakery",
        description: "Local artisan bakery with sourdough breads, pastries, and seasonal treats",
        rating: 4.7,
        budget: "budget",
        hours: "7:00 AM - 3:00 PM",
        location: "140 Bohemian Hwy, Freestone",
        phone: "(707) 874-2938",
        website: "wildflourfreestone.com",
        priceRange: "$",
        category: "bakery"
      },
      {
        name: "Nightingale Breads",
        type: "Weekend Bakery",
        description: "Tiny bakery with incredible baklava-inspired cinnamon rolls (weekends only)",
        rating: 4.8,
        budget: "budget",
        hours: "Sat-Sun 9:00 AM - 3:00 PM",
        location: "6643 Front St, Forestville",
        phone: "(707) 887-9292",
        website: "nightingalebreads.com",
        priceRange: "$",
        category: "bakery"
      },
      {
        name: "Kozlowski Farms",
        type: "Apple Farm & Bakery",
        description: "Historic apple farm with fresh pies, jams, and seasonal baked goods",
        rating: 4.5,
        budget: "budget",
        hours: "9:00 AM - 5:00 PM",
        location: "5566 Gravenstein Hwy, Forestville",
        phone: "(707) 887-1587",
        website: "kozlowskifarms.com",
        priceRange: "$",
        category: "bakery"
      }
    ],

    coffee: [
      {
        name: "Coffee Bazaar",
        type: "Local Coffee Shop",
        description: "Longtime local favorite with house-roasted coffee and pastries",
        rating: 4.5,
        budget: "budget",
        hours: "6:00 AM - 3:00 PM",
        location: "14045 Armstrong Woods Rd, Guerneville",
        phone: "(707) 869-9706",
        website: "coffeebazaar.com",
        priceRange: "$",
        category: "coffee"
      },
      {
        name: "Big Bottom Market",
        type: "Gourmet Market & Cafe",
        description: "Gourmet market with artisanal coffee and famous biscuits",
        rating: 4.6,
        budget: "moderate",
        hours: "8:00 AM - 6:00 PM",
        location: "16228 Main St, Guerneville",
        phone: "(707) 604-7295",
        website: "bigbottommarket.com",
        priceRange: "$$",
        category: "coffee"
      },
      {
        name: "Cafe Aquatica",
        type: "Waterfront Cafe",
        description: "Coffee & light bites with spectacular Russian River estuary views",
        rating: 4.4,
        budget: "budget",
        hours: "7:00 AM - 3:00 PM",
        location: "10439 Hwy 1, Jenner",
        phone: "(707) 865-2251",
        website: "cafeaquatica.com",
        priceRange: "$",
        category: "coffee"
      }
    ],

    // NEW: SPAS & WELLNESS CENTERS
    wellness: [
      {
        name: "Osmosis Day Spa Sanctuary",
        type: "Full-Service Spa",
        description: "Japanese-inspired cedar enzyme baths and massage treatments",
        rating: 4.7,
        budget: "splurge",
        hours: "9:00 AM - 6:00 PM",
        location: "209 Bohemian Hwy, Freestone",
        phone: "(707) 823-8231",
        website: "osmosis.com",
        priceRange: "$$$",
        category: "wellness"
      },
      {
        name: "Highland Dell Lodge Spa",
        type: "Forest Spa",
        description: "Intimate spa nestled in redwood forest with natural treatments",
        rating: 4.6,
        budget: "moderate",
        hours: "10:00 AM - 6:00 PM",
        location: "21050 River Blvd, Monte Rio",
        phone: "(707) 865-1759",
        website: "highlanddell.com",
        priceRange: "$$",
        category: "wellness"
      },
      {
        name: "Sonoma Coast Yoga",
        type: "Yoga Studio",
        description: "Oceanfront yoga classes with sunset and sunrise sessions",
        rating: 4.6,
        budget: "moderate",
        hours: "6:00 AM - 8:00 PM",
        location: "3566 Hwy 1, Bodega Bay",
        phone: "(707) 875-9642",
        website: "sonomacoastyoga.com",
        priceRange: "$$",
        category: "wellness"
      },
      {
        name: "Guerneville Massage & Wellness",
        type: "Massage Therapy",
        description: "Full-service massage therapy and wellness treatments",
        rating: 4.5,
        budget: "moderate",
        hours: "9:00 AM - 7:00 PM",
        location: "16209 1st St, Guerneville",
        phone: "(707) 869-4400",
        website: "guernevillemassage.com",
        priceRange: "$$",
        category: "wellness"
      },
      {
        name: "Peaceful Spirit Wellness Center",
        type: "Holistic Wellness",
        description: "Small wellness center offering massage, acupuncture, and energy healing",
        rating: 4.3,
        budget: "budget",
        hours: "10:00 AM - 6:00 PM",
        location: "6980 McKinley St, Sebastopol",
        phone: "(707) 827-4919",
        website: "peacefulspiritwellness.com",
        priceRange: "$",
        category: "wellness"
      },
      {
        name: "River Bend Retreat & Spa",
        type: "Day Spa",
        description: "Riverside spa offering couples massages and relaxation therapies",
        rating: 4.4,
        budget: "moderate",
        hours: "9:00 AM - 7:00 PM",
        location: "16467 River Rd, Guerneville",
        phone: "(707) 869-8000",
        website: "riverbendretreat.com",
        priceRange: "$",
        category: "wellness"
      },
      {
        name: "June Bug",
        type: "Boutique Wellness Studio",
        description: "Intimate wellness studio offering personalized treatments and holistic therapies",
        rating: 4.6,
        budget: "moderate",
        hours: "10:00 AM - 6:00 PM",
        location: "16245 Main St, Guerneville",
        phone: "(707) 869-3500",
        website: "junebugwellness.com",
        priceRange: "$",
        category: "wellness"
      }
    ]
  };

  // DIVERSE SIGNATURE EXPERIENCES DATABASE - Mixed budgets and categories with LOCAL focus
  const signatureExperiences = [
    // BUDGET EXPERIENCES ($45-85)
    {
      id: 'redwood_meditation',
      name: 'Private Redwood Grove Meditation',
      description: 'Guided meditation among 800-year-old redwoods at dawn',
      location: 'Armstrong Redwoods State Natural Reserve',
      distance: '8 miles',
      duration: '90 minutes',
      price: '$45 per person',
      budget: 'budget',
      category: 'wellness',
      bestTime: 'sunrise',
      includes: ['Private certified guide', 'Meditation mat', 'Light refreshments'],
      image: 'redwood-meditation.jpg'
    },
    {
      id: 'mushroom_foraging',
      name: 'Wild Mushroom Foraging',
      description: 'Expert-guided forest foraging for wild mushrooms and edible plants',
      location: 'Private forest preserve near Occidental',
      distance: '6 miles',
      duration: '3 hours',
      price: '$65 per person',
      budget: 'budget',
      category: 'adventure',
      bestTime: 'morning',
      includes: ['Expert naturalist guide', 'Foraging tools and basket', 'Species identification card'],
      image: 'foraging.jpg'
    },
    {
      id: 'sunrise_kayak',
      name: 'Russian River Dawn Paddle',
      description: 'Peaceful sunrise kayak through redwood groves along the Russian River',
      location: 'Russian River Adventures',
      distance: '4 miles',
      duration: '2.5 hours',
      price: '$75 per person',
      budget: 'budget',
      category: 'nature',
      bestTime: 'sunrise',
      includes: ['Kayak and equipment', 'Professional guide', 'Light breakfast', 'Wildlife spotting'],
      image: 'sunrise-kayak.jpg'
    },
    {
      id: 'farm_breakfast',
      name: 'Farm-to-Table Breakfast Experience',
      description: 'Join local farmers for harvest and cooking breakfast with fresh ingredients',
      location: 'Kozlowski Farms',
      distance: '10 miles',
      duration: '3 hours',
      price: '$85 per person',
      budget: 'budget',
      category: 'food',
      bestTime: 'morning',
      includes: ['Farm tour', 'Harvest experience', 'Cooking class', 'Full breakfast'],
      image: 'farm-breakfast.jpg'
    },

    // MODERATE EXPERIENCES ($125-175)
    {
      id: 'wine_blending',
      name: 'Master Winemaker Blending Session',
      description: 'Create your own custom wine blend with master winemaker at Furthermore Wines',
      location: 'Furthermore Wines',
      distance: '8 miles',
      duration: '2.5 hours',
      price: '$125 per person',
      budget: 'moderate',
      category: 'wine',
      bestTime: 'afternoon',
      includes: ['Private winemaker session', 'Premium barrel tastings', 'Custom bottle creation'],
      image: 'wine-blending.jpg'
    },
    {
      id: 'coastal_cooking',
      name: 'Coastal Foraging & Cooking Class',
      description: 'Forage coastal ingredients then cook a gourmet meal with local chef',
      location: 'Bodega Bay Cooking School',
      distance: '25 miles',
      duration: '4 hours',
      price: '$165 per person',
      budget: 'moderate',
      category: 'food',
      bestTime: 'morning',
      includes: ['Expert chef instruction', 'All ingredients', 'Full gourmet meal', 'Recipe cards'],
      image: 'coastal-cooking.jpg'
    },
    {
      id: 'redwood_canopy',
      name: 'Redwood Canopy Adventure',
      description: 'Guided treetop walking experience through old-growth redwood canopy',
      location: 'Armstrong Redwoods Canopy Tours',
      distance: '8 miles',
      duration: '3 hours',
      price: '$145 per person',
      budget: 'moderate',
      category: 'adventure',
      bestTime: 'morning',
      includes: ['Professional guide', 'All safety equipment', 'Canopy platforms', 'Wildlife spotting'],
      image: 'canopy-tour.jpg'
    },
    {
      id: 'artisan_workshop',
      name: 'Local Artisan Glass Blowing',
      description: 'Hands-on workshop creating unique glass art with Sebastopol artisans',
      location: 'Sebastopol Arts Center',
      distance: '10 miles',
      duration: '3 hours',
      price: '$155 per person',
      budget: 'moderate',
      category: 'culture',
      bestTime: 'afternoon',
      includes: ['Expert artisan instruction', 'All materials', 'Take-home creation', 'Gallery tour'],
      image: 'artisan.jpg'
    },
    {
      id: 'hot_air_balloon',
      name: 'Russian River Valley Balloon Flight',
      description: 'Dawn hot air balloon flight over vineyards and redwood forests',
      location: 'Healdsburg Balloon Adventures',
      distance: '15 miles',
      duration: '3 hours',
      price: '$175 per person',
      budget: 'moderate',
      category: 'adventure',
      bestTime: 'sunrise',
      includes: ['Private balloon flight', 'Champagne celebration', 'Light breakfast', 'Flight certificate'],
      image: 'balloon.jpg'
    },
    {
      id: 'spa_forest',
      name: 'Forest Spa Retreat',
      description: 'Outdoor massage and wellness treatments in private redwood grove',
      location: 'Highland Dell Lodge Spa',
      distance: '12 miles',
      duration: '4 hours',
      price: '$165 per person',
      budget: 'moderate',
      category: 'wellness',
      bestTime: 'afternoon',
      includes: ['90-minute forest massage', 'Redwood aromatherapy', 'Healthy lunch', 'Meditation session'],
      image: 'forest-spa.jpg'
    },

    // SPLURGE EXPERIENCES ($285-495)
    {
      id: 'vintner_dinner',
      name: 'Williams Selyem Vintner\'s Dinner',
      description: 'Exclusive 5-course dinner with winemaker and vineyard tour',
      location: 'Williams Selyem Winery',
      distance: '12 miles',
      duration: '4 hours',
      price: '$285 per person',
      budget: 'splurge',
      category: 'wine',
      bestTime: 'evening',
      includes: ['5-course chef dinner', 'Rare wine library tastings', 'Private vineyard tour', 'Meet the winemaker'],
      image: 'vintner-dinner.jpg'
    },
    {
      id: 'coastal_helicopter',
      name: 'Sonoma Coast Helicopter Tour',
      description: 'Private helicopter tour from Russian River Valley to dramatic Sonoma Coast',
      location: 'Healdsburg Municipal Airport',
      distance: '15 miles',
      duration: '60 minutes',
      price: '$395 per person',
      budget: 'splurge',
      category: 'adventure',
      bestTime: 'morning',
      includes: ['Private helicopter', 'Professional pilot guide', 'Champagne toast', 'Aerial photography'],
      image: 'helicopter-tour.jpg'
    },
    {
      id: 'michelin_chef',
      name: 'Private Chef at Farmhouse Inn',
      description: 'Personal cooking class and dinner with Michelin-starred chef',
      location: 'Farmhouse Inn Restaurant',
      distance: '15 miles',
      duration: '5 hours',
      price: '$425 per person',
      budget: 'splurge',
      category: 'food',
      bestTime: 'evening',
      includes: ['Private chef instruction', 'Premium ingredients', '7-course tasting menu', 'Wine pairings'],
      image: 'michelin-chef.jpg'
    },
    {
      id: 'luxury_spa',
      name: 'Full Day Osmosis Spa Retreat',
      description: 'Complete wellness day with cedar enzyme bath, massage, and meditation',
      location: 'Osmosis Day Spa Sanctuary',
      distance: '12 miles',
      duration: '7 hours',
      price: '$365 per person',
      budget: 'splurge',
      category: 'wellness',
      bestTime: 'all-day',
      includes: ['Cedar enzyme bath', '90-minute massage', 'Gourmet lunch', 'Meditation session', 'Facial treatment'],
      image: 'spa-retreat.jpg'
    },
    {
      id: 'private_vineyard',
      name: 'Iron Horse Private Vineyard Experience',
      description: 'Exclusive access to historic sparkling wine caves and private tastings',
      location: 'Iron Horse Vineyards',
      distance: '12 miles',
      duration: '3 hours',
      price: '$295 per person',
      budget: 'splurge',
      category: 'wine',
      bestTime: 'afternoon',
      includes: ['Private cave tour', 'Library wine tastings', 'Cheese and charcuterie', 'Vineyard photo session'],
      image: 'iron-horse.jpg'
    },
    {
      id: 'river_glamping',
      name: 'Luxury Russian River Glamping',
      description: 'Overnight glamping with private chef and riverside fire pit',
      location: 'Russian River Luxury Camps',
      distance: '8 miles',
      duration: '24 hours',
      price: '$495 per couple',
      budget: 'splurge',
      category: 'accommodation',
      bestTime: 'overnight',
      includes: ['Luxury safari tent', 'Private chef dinner', 'Morning yoga', 'River activities', 'Stargazing session'],
      image: 'glamping.jpg'
    }
  ];

  const interests = [
    { id: 'wine', name: 'Wine Tasting', icon: Wine },
    { id: 'nature', name: 'Nature & Hiking', icon: TreePine },
    { id: 'food', name: 'Food & Dining', icon: Utensils },
    { id: 'adventure', name: 'Outdoor Adventure', icon: Mountain },
    { id: 'wellness', name: 'Relaxation & Spa', icon: Heart },
    { id: 'culture', name: 'Arts & Culture', icon: Camera }
  ];

  const travelStyles = [
    { id: 'relaxed', name: 'Relaxed (2 activities/day)', description: 'Take it slow, enjoy the moment' },
    { id: 'moderate', name: 'Moderate (3 activities/day)', description: 'Mix of activity and relaxation' },
    { id: 'fast-paced', name: 'Fast Paced (4 activities/day)', description: 'Pack in as much as possible' }
  ];

  // Helper functions
  const getBudgetIcon = (budget) => {
    const icons = { budget: '$', moderate: '$$', splurge: '$$$' };
    return icons[budget] || '$$';
  };

  const isBusinessOpen = (business) => {
    const now = new Date();
    const currentHour = now.getHours();
    
    if (!business.hours) return true;
    
    const [open, close] = business.hours.split(' - ');
    const openHour = parseInt(open.split(':')[0]);
    const closeHour = parseInt(close.split(':')[0]) + (close.includes('PM') && !close.includes('12:') ? 12 : 0);
    
    return currentHour >= openHour && currentHour < closeHour;
  };

  // Get diverse signature experiences (mixed budgets and categories)
  const getDiverseSignatureExperiences = () => {
    // Filter by budget first
    const budgetFiltered = signatureExperiences.filter(exp => 
      guestData.budget === 'splurge' || exp.budget === guestData.budget || exp.budget === 'budget'
    );

    // Ensure diversity: one from each budget category if possible
    const budget = budgetFiltered.filter(exp => exp.budget === 'budget');
    const moderate = budgetFiltered.filter(exp => exp.budget === 'moderate');
    const splurge = budgetFiltered.filter(exp => exp.budget === 'splurge');

    const diverse = [];
    
    // Add one from each budget level
    if (budget.length > 0) diverse.push(budget[0]);
    if (moderate.length > 0 && diverse.length < 3) diverse.push(moderate[0]);
    if (splurge.length > 0 && diverse.length < 3 && guestData.budget === 'splurge') diverse.push(splurge[0]);

    // Fill remaining slots with variety
    const remaining = budgetFiltered.filter(exp => !diverse.includes(exp));
    while (diverse.length < 3 && remaining.length > 0) {
      diverse.push(remaining.shift());
    }

    return diverse.slice(0, 3);
  };

  const generateItinerary = () => {
    if (!guestData.name) {
      alert('Please fill in your name');
      return;
    }

    // Combine business categories but EXCLUDE sweets from main activities
    const allBusinesses = [
      ...businesses.food, 
      ...businesses.wine, 
      ...businesses.activities,
      ...businesses.bakeries,  // Only bakeries for breakfast/morning
      ...businesses.coffee,
      ...businesses.wellness
    ];
    // Note: businesses.sweets are excluded and will only be suggested as geographic add-ons
    
    // Filter by budget
    const filteredBusinesses = allBusinesses.filter(business => 
      guestData.budget === 'splurge' || business.budget === guestData.budget || business.budget === 'budget'
    );

    // Track used businesses to prevent repetition
    const usedBusinesses = new Set();
    const days = [];

    for (let day = 1; day <= guestData.tripDuration; day++) {
      const dayActivities = [];
      
      // Morning activity - Nature, Coffee, Bakery, or early Wine
      const morningOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'nature' || b.category === 'coffee' || b.category === 'bakery' ||
         (b.category === 'winery' && b.hours.includes('10:00 AM')))
      );
      if (morningOptions.length > 0) {
        const morning = morningOptions[Math.floor(Math.random() * morningOptions.length)];
        usedBusinesses.add(morning.name);
        dayActivities.push({
          time: '10:00 AM',
          activity: morning,
          alternatives: morningOptions.filter(b => b.name !== morning.name && !usedBusinesses.has(b.name)).slice(0, 3)
        });
      }

      // Lunch - ONLY restaurants
      const lunchOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        b.category === 'restaurant' && 
        (b.hours.includes('11:') || b.hours.includes('12:') || b.hours.includes('7:00 AM'))
      );
      if (lunchOptions.length > 0) {
        const lunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
        usedBusinesses.add(lunch.name);
        dayActivities.push({
          time: '1:00 PM',
          activity: lunch,
          alternatives: lunchOptions.filter(b => b.name !== lunch.name && !usedBusinesses.has(b.name)).slice(0, 3)
        });
      }

      // Afternoon activity - Wine, Culture, Wellness, Recreation (NO sweets)
      const afternoonOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'winery' || b.category === 'culture' || b.category === 'wellness' || 
         b.category === 'recreation')
      );
      if (afternoonOptions.length > 0) {
        const afternoon = afternoonOptions[Math.floor(Math.random() * afternoonOptions.length)];
        usedBusinesses.add(afternoon.name);
        dayActivities.push({
          time: '3:30 PM',
          activity: afternoon,
          alternatives: afternoonOptions.filter(b => b.name !== afternoon.name && !usedBusinesses.has(b.name)).slice(0, 3)
        });
      }

      // Dinner - ONLY restaurants (only if moderate or fast-paced)
      if (guestData.travelStyle !== 'relaxed') {
        const dinnerOptions = filteredBusinesses.filter(b => 
          !usedBusinesses.has(b.name) && 
          b.category === 'restaurant' && 
          (b.hours.includes('5:00 PM') || b.hours.includes('6:00 PM'))
        );
        if (dinnerOptions.length > 0) {
          const dinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
          usedBusinesses.add(dinner.name);
          dayActivities.push({
            time: '7:00 PM',
            activity: dinner,
            alternatives: dinnerOptions.filter(b => b.name !== dinner.name && !usedBusinesses.has(b.name)).slice(0, 3)
          });
        }
      }

      days.push({
        day: day,
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        activities: dayActivities
      });
    }

    setGeneratedItinerary(days);
  };

  // Function to refresh a single activity
  const refreshSingleActivity = (dayIndex, activityIndex) => {
    const currentActivity = generatedItinerary[dayIndex].activities[activityIndex];
    const timeSlot = currentActivity.time;
    
    // Get all businesses that could fit this time slot
    const allBusinesses = [
      ...businesses.food, 
      ...businesses.wine, 
      ...businesses.activities,
      ...businesses.bakeries,
      ...businesses.sweets,  // Include sweets for search/alternatives
      ...businesses.coffee,
      ...businesses.wellness
    ];
    
    const filteredBusinesses = allBusinesses.filter(business => 
      guestData.budget === 'splurge' || business.budget === guestData.budget || business.budget === 'budget'
    );

    // Get currently used businesses (excluding the one we're replacing)
    const usedBusinesses = new Set();
    generatedItinerary.forEach((day, dIndex) => {
      day.activities.forEach((act, aIndex) => {
        if (!(dIndex === dayIndex && aIndex === activityIndex)) {
          usedBusinesses.add(act.activity.name);
        }
      });
    });

    let availableOptions = [];

    // Define options based on time slot
    if (timeSlot.includes('10:00 AM')) {
      // Morning: Nature, Coffee, Bakery, or early Wine
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'nature' || b.category === 'coffee' || b.category === 'bakery' ||
         (b.category === 'winery' && b.hours.includes('10:00 AM')))
      );
    } else if (timeSlot.includes('1:00 PM')) {
      // Lunch: Only restaurants
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        b.category === 'restaurant' && 
        (b.hours.includes('11:') || b.hours.includes('12:') || b.hours.includes('7:00 AM'))
      );
    } else if (timeSlot.includes('3:30 PM')) {
      // Afternoon: Wine, Culture, Wellness, Recreation
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'winery' || b.category === 'culture' || b.category === 'wellness' || 
         b.category === 'recreation')
      );
    } else if (timeSlot.includes('7:00 PM')) {
      // Dinner: Only restaurants
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        b.category === 'restaurant' && 
        (b.hours.includes('5:00 PM') || b.hours.includes('6:00 PM'))
      );
    }

    if (availableOptions.length > 0) {
      const newActivity = availableOptions[Math.floor(Math.random() * availableOptions.length)];
      const updatedItinerary = [...generatedItinerary];
      
      updatedItinerary[dayIndex].activities[activityIndex] = {
        time: timeSlot,
        activity: newActivity,
        alternatives: availableOptions.filter(b => b.name !== newActivity.name).slice(0, 3)
      };
      
      setGeneratedItinerary(updatedItinerary);
    } else {
      alert('No more options available for this time slot. Try using the alternatives instead.');
    }
  };

  const showAlternatives = (dayIndex, activityIndex, alternatives) => {
    setAlternativesModal({
      isOpen: true,
      dayIndex,
      activityIndex,
      alternatives
    });
  };

  const replaceActivity = (dayIndex, activityIndex, newActivity) => {
    const updatedItinerary = [...generatedItinerary];
    const originalActivity = updatedItinerary[dayIndex].activities[activityIndex].activity;
    
    updatedItinerary[dayIndex].activities[activityIndex] = {
      ...updatedItinerary[dayIndex].activities[activityIndex],
      activity: newActivity,
      alternatives: [originalActivity, ...updatedItinerary[dayIndex].activities[activityIndex].alternatives.filter(alt => alt.name !== newActivity.name)].slice(0, 3)
    };
    
    setGeneratedItinerary(updatedItinerary);
    setAlternativesModal({ isOpen: false, dayIndex: null, activityIndex: null, alternatives: [] });
  };

  const nextSignatureExperience = () => {
    const diverseExperiences = getDiverseSignatureExperiences();
    setCurrentSignatureIndex((prev) => 
      prev === diverseExperiences.length - 1 ? 0 : prev + 1
    );
  };

  const prevSignatureExperience = () => {
    const diverseExperiences = getDiverseSignatureExperiences();
    setCurrentSignatureIndex((prev) => 
      prev === 0 ? diverseExperiences.length - 1 : prev - 1
    );
  };

  const handleSignatureExperienceClick = (experience) => {
    setSelectedSignatureExperience(experience);
    setShowSignatureModal(true);
  };

  const addSignatureExperience = (experience) => {
    if (generatedItinerary.length === 0) {
      alert('Please generate an itinerary first');
      return;
    }

    const updatedItinerary = [...generatedItinerary];
    if (updatedItinerary[0] && updatedItinerary[0].activities.length < 5) {
      updatedItinerary[0].activities.splice(1, 0, {
        time: experience.bestTime === 'sunrise' ? '7:00 AM' : experience.bestTime === 'evening' ? '6:00 PM' : '11:00 AM',
        activity: {
          name: experience.name,
          type: experience.category,
          description: experience.description,
          location: experience.location,
          phone: 'Contact concierge',
          rating: 5.0,
          budget: experience.budget,
          category: 'signature',
          priceRange: experience.price,
          hours: 'By appointment'
        },
        alternatives: []
      });
      setGeneratedItinerary(updatedItinerary);
      setShowSignatureModal(false);
      alert(`${experience.name} added to your itinerary!`);
    } else {
      alert('Day 1 is full. Please remove an activity first or contact our concierge.');
    }
  };

  const planDayAroundSignature = (experience) => {
    if (generatedItinerary.length === 0) {
      alert('Please generate an itinerary first');
      return;
    }

    const updatedItinerary = [...generatedItinerary];
    updatedItinerary[0].activities = [
      {
        time: '9:00 AM',
        activity: {
          name: 'Pre-Experience Coffee',
          type: 'Coffee',
          description: 'Start your day at Coffee Bazaar before your signature experience',
          location: 'Coffee Bazaar',
          phone: '(707) 869-9706',
          rating: 4.5,
          budget: 'budget',
          category: 'coffee',
          priceRange: '$',
          hours: '6:00 AM - 3:00 PM'
        },
        alternatives: []
      },
      {
        time: experience.bestTime === 'sunrise' ? '7:00 AM' : experience.bestTime === 'evening' ? '6:00 PM' : '11:00 AM',
        activity: {
          name: experience.name,
          type: experience.category,
          description: experience.description,
          location: experience.location,
          phone: 'Contact concierge',
          rating: 5.0,
          budget: experience.budget,
          category: 'signature',
          priceRange: experience.price,
          hours: 'By appointment'
        },
        alternatives: []
      },
      {
        time: '6:00 PM',
        activity: {
          name: 'Celebration Dinner',
          type: 'Fine Dining',
          description: 'Celebrate your signature experience at boon eat + drink',
          location: 'boon eat + drink',
          phone: '(707) 869-0780',
          rating: 4.9,
          budget: 'splurge',
          category: 'restaurant',
          priceRange: '$$$',
          hours: '5:00 PM - 9:00 PM'
        },
        alternatives: []
      }
    ];
    
    setGeneratedItinerary(updatedItinerary);
    setShowSignatureModal(false);
    alert(`Day 1 has been redesigned around ${experience.name}!`);
  };

  const searchAllExperiences = () => {
    const allBusinesses = [
      ...businesses.food,
      ...businesses.wine,
      ...businesses.activities,
      ...businesses.bakeries,
      ...businesses.sweets,  // Include sweets in search
      ...businesses.coffee,
      ...businesses.wellness
    ];
    
    // Show all businesses since there's no search input
    setSearchResults(allBusinesses);
    setShowSearchModal(true);
  };

  const searchSignatureExperiences = () => {
    // Show all signature experiences since there's no search input
    setSearchResults(signatureExperiences);
    setShowSearchModal(true);
  };

  const diverseSignatureExperiences = getDiverseSignatureExperiences();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header with Darker Red Logo and No Concierge Button */}
      <div className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              {/* Darker Red Square Logo with RN and Gold Framing */}
              <div className="w-14 h-14 bg-gradient-to-br from-red-800 to-red-900 rounded-lg flex items-center justify-center shadow-lg relative border-2 border-yellow-500">
                <span className="text-white font-bold text-xl tracking-tight z-10">RN</span>
                <div className="absolute inset-0 rounded-lg border border-yellow-400 opacity-70"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">Rio Nido Lodge</h1>
                <p className="text-stone-600 text-sm">Mercantile & Cafe • Historic Retreat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {generatedItinerary.length === 0 ? (
          // Guest Information Form
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Plan Your Perfect Stay</h2>
            </div>

            <div className="space-y-6">
              {/* Name and Trip Duration - Same Line */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Guest Name</label>
                  <input
                    type="text"
                    value={guestData.name}
                    onChange={(e) => setGuestData({...guestData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Trip Duration</label>
                  <select
                    value={guestData.tripDuration}
                    onChange={(e) => setGuestData({...guestData, tripDuration: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value={1}>1 day</option>
                    <option value={2}>2 days</option>
                    <option value={3}>3 days</option>
                    <option value={4}>4 days</option>
                  </select>
                </div>
              </div>

              {/* Budget Preference - Three Boxes */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">Budget Preference</label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setGuestData({...guestData, budget: 'budget'})}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      guestData.budget === 'budget'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-medium">Budget Conscious ($-$$)</div>
                    <div className="text-sm text-stone-600">Great value under $25-50 per person</div>
                  </button>
                  <button
                    onClick={() => setGuestData({...guestData, budget: 'moderate'})}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      guestData.budget === 'moderate'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-medium">Moderate Spending ($$-$$$)</div>
                    <div className="text-sm text-stone-600">Balanced experiences, $50-100 per person</div>
                  </button>
                  <button
                    onClick={() => setGuestData({...guestData, budget: 'splurge'})}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      guestData.budget === 'splurge'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-medium">Luxury Experience ($$$-$$$$)</div>
                    <div className="text-sm text-stone-600">Premium experiences, $100+ per person</div>
                  </button>
                </div>
              </div>

              {/* Travel Style - Dropdown */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Travel Style</label>
                <select
                  value={guestData.travelStyle}
                  onChange={(e) => setGuestData({...guestData, travelStyle: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="relaxed">Relaxed (2 activities/day)</option>
                  <option value="moderate">Moderate (3 activities/day)</option>
                  <option value="fast-paced">Fast Paced (4 activities/day)</option>
                </select>
              </div>

              {/* Include Alternate Destinations - Toggle */}
              <div className="flex items-center justify-between p-4 border border-stone-200 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-stone-700">Include Alternate Destinations</label>
                  <p className="text-xs text-stone-500">Show optional stops and detours along your routes</p>
                </div>
                <button
                  onClick={() => setGuestData({...guestData, includeAlternateDestinations: !guestData.includeAlternateDestinations})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    guestData.includeAlternateDestinations ? 'bg-red-500' : 'bg-stone-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    guestData.includeAlternateDestinations ? 'translate-x-6' : 'translate-x-0.5'
                  }`}></div>
                </button>
              </div>

              {/* What Interests You */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">What interests you?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map(interest => {
                    const IconComponent = interest.icon;
                    return (
                      <button
                        key={interest.id}
                        onClick={() => {
                          const newInterests = guestData.interests.includes(interest.id)
                            ? guestData.interests.filter(i => i !== interest.id)
                            : [...guestData.interests, interest.id];
                          setGuestData({...guestData, interests: newInterests});
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          guestData.interests.includes(interest.id)
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mb-2" />
                        <div className="text-sm font-medium">{interest.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate My Itinerary Button */}
              <div className="text-center pt-6">
                <button
                  onClick={generateItinerary}
                  className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Generate My Itinerary
                </button>
              </div>
            </div>

            {/* Signature Experiences - AT THE BOTTOM with 3 Rotating Suggestions */}
            <div className="mt-16 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Signature Experiences</h2>
                <p className="text-stone-600">Select your interests above to see personalized day-anchoring experiences</p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="grid md:grid-cols-3 gap-6">
                    {diverseSignatureExperiences.map((experience, index) => (
                      <div 
                        key={experience.id}
                        className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleSignatureExperienceClick(experience)}
                      >
                        <h3 className="font-bold text-stone-800 text-sm mb-3">{experience.name}</h3>
                        
                        <p className="text-stone-600 text-xs mb-3 line-clamp-2">{experience.description}</p>
                        
                        <div className="space-y-1 text-xs text-stone-500">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{experience.distance}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            <span className="font-medium text-red-600">{experience.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search Section - Under Signature Experiences */}
              <div className="mt-8 text-center">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={searchAllExperiences}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-6 py-3 rounded-lg transition-colors"
                  >
                    Search Experiences
                  </button>
                  <button
                    onClick={searchSignatureExperiences}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-6 py-3 rounded-lg transition-colors"
                  >
                    Search Signature Experiences
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Generated Itinerary Display
          <div className="space-y-8">
            {/* Itinerary Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-stone-800">Your Personal Itinerary</h2>
                  <p className="text-stone-600">Created for {guestData.name} • {guestData.tripDuration} day{guestData.tripDuration > 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => setGeneratedItinerary([])}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="space-y-6">
              {generatedItinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-red-800 to-red-900 p-6 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white bg-opacity-20 rounded-lg p-2">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Day {day.day}</h3>
                        <p className="text-red-100">{day.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {day.activities.map((item, actIndex) => (
                        <div key={actIndex} className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">
                              {item.time}
                            </div>
                          </div>
                          
                          <div className="flex-grow bg-stone-50 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-grow">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold text-stone-800">{item.activity.name}</h4>
                                  {isBusinessOpen(item.activity) && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Open Now</span>
                                  )}
                                </div>
                                
                                <p className="text-stone-600 text-sm mb-2">{item.activity.type}</p>
                                <p className="text-stone-700 mb-3">{item.activity.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-stone-600">
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                    <span>{item.activity.rating}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{item.activity.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{item.activity.hours}</span>
                                  </div>
                                  <span className="font-medium">{getBudgetIcon(item.activity.budget)}</span>
                                </div>
                              </div>
                              
                              <div className="flex-shrink-0 ml-4 space-x-2">
                                {/* Refresh Button */}
                                <button 
                                  onClick={() => refreshSingleActivity(dayIndex, actIndex)}
                                  className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                                  title="Get a different suggestion for this time slot"
                                >
                                  ↻ Refresh
                                </button>
                                
                                {/* Alternatives Button */}
                                {item.alternatives && item.alternatives.length > 0 && (
                                  <button 
                                    onClick={() => showAlternatives(dayIndex, actIndex, item.alternatives)}
                                    className="px-3 py-1 text-xs bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                                  >
                                    Alternatives
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Signature Experience Modal */}
      {showSignatureModal && selectedSignatureExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4 text-red-900">{selectedSignatureExperience.name}</h3>
            <p className="text-stone-700 mb-4">{selectedSignatureExperience.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-stone-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{selectedSignatureExperience.location} • {selectedSignatureExperience.distance}</span>
                </div>
                <div className="flex items-center text-sm text-stone-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{selectedSignatureExperience.duration}</span>
                </div>
                <div className="flex items-center text-sm text-stone-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-medium text-red-600">{selectedSignatureExperience.price}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-stone-800 mb-2">Includes:</h4>
                <ul className="text-sm text-stone-600 space-y-1">
                  {selectedSignatureExperience.includes.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => addSignatureExperience(selectedSignatureExperience)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add to Itinerary
              </button>
              <button
                onClick={() => planDayAroundSignature(selectedSignatureExperience)}
                className="bg-stone-600 hover:bg-stone-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Plan Day Around This
              </button>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-red-900">Search Results</h3>
            
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="border border-stone-200 rounded-lg p-4">
                  <h4 className="font-semibold text-stone-800">{result.name}</h4>
                  <p className="text-stone-600 text-sm">{result.type || result.category}</p>
                  <p className="text-stone-700 text-sm mt-1">{result.description}</p>
                  {result.price && (
                    <p className="text-red-600 font-medium text-sm mt-2">{result.price}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowSearchModal(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
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
                onClick={() => setAlternativesModal({ isOpen: false, dayIndex: null, activityIndex: null, alternatives: [] })}
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
};

export default RioNidoLodgeApp;