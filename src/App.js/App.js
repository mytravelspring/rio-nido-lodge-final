// RioNidoLodgeApp.jsx
import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Star,
  Calendar,
  DollarSign,
  Sparkles,
  Wine,
  TreePine,
  Utensils,
  Mountain,
  Camera,
  Heart,
  ExternalLink,
} from "lucide-react";

const RioNidoLodgeApp = () => {
  const [guestData, setGuestData] = useState({
    name: "",
    tripDuration: 3,
    budget: "moderate",
    travelStyle: "moderate",
    includeAlternateDestinations: true,
    interests: [],
  });

  const [generatedItinerary, setGeneratedItinerary] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedSignatureExperience, setSelectedSignatureExperience] = useState(null);
  const [alternativesModal, setAlternativesModal] = useState({
    isOpen: false,
    dayIndex: null,
    activityIndex: null,
    alternatives: [],
  });

  // --- DATA (unchanged) ---
  const businesses = {
    food: [
      { name: "boon eat + drink", type: "Farm-to-Table Restaurant", description: "Celebrity Chef Crista Luedtke's flagship farm-to-table restaurant", rating: 4.9, budget: "splurge", hours: "5:00 PM - 9:00 PM", location: "16248 Main St, Guerneville", phone: "(707) 869-0780", website: "boonhotels.com", priceRange: "$$$", category: "restaurant" },
      { name: "Road Trip", type: "Casual American", description: "Chef Crista Luedtke's casual spot famous for the Mac Daddy burger", rating: 4.7, budget: "moderate", hours: "11:00 AM - 9:00 PM", location: "16248 Main St, Guerneville", phone: "(707) 869-0780", website: "boonhotels.com", priceRange: "$$", category: "restaurant" },
      { name: "El Barrio", type: "Mexican Cantina", description: "Lively spot with craft cocktails and elevated Mexican street food", rating: 4.6, budget: "budget", hours: "4:00 PM - 10:00 PM", location: "16233 Main St, Guerneville", phone: "(707) 604-7601", website: "elbarrioguerneville.com", priceRange: "$", category: "restaurant" },
      { name: "Pat's Restaurant", type: "Classic Diner", description: "Local breakfast favorite with hearty portions and friendly service", rating: 4.3, budget: "budget", hours: "7:00 AM - 2:00 PM", location: "16236 Main St, Guerneville", phone: "(707) 869-9904", website: "patsrestaurantguerneville.com", priceRange: "$", category: "restaurant" },
      { name: "The Farmhand", type: "Farm Fresh Restaurant", description: "Farm-fresh restaurant with craft cocktails and local ingredients", rating: 4.5, budget: "moderate", hours: "4:00 PM - 9:00 PM", location: "16235 Main St, Guerneville", phone: "(707) 604:7014", website: "thefarmhandguerneville.com", priceRange: "$$", category: "restaurant" },
      { name: "Seaside Metal", type: "Oyster Bar", description: "Fresh oysters and natural wines with Tuesday half-price nights", rating: 4.4, budget: "moderat
