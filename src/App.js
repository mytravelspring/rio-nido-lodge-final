// Enhanced UI with better feedback and loading states
  const generateItinerary = () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const days = [];
      const usedBusinesses = new Set();
      
      // Validate that we have enough businesses for the trip
      const neighborhoodBusinesses = hyperlocalBusinesses[guestData.neighborhood] || {};
      const totalAvailableBusinesses = Object.values(neighborhoodBusinesses)
        .flat().length;
      
      const requiredBusinesses = guestData.tripDuration * 3; // 3 activities per day
      
      if (totalAvailableBusinesses < requiredBusinesses) {
        console.warn(`Limited business pool: ${totalAvailableBusinesses} available for ${requiredBusinesses} needed`);
      }
      
      // Create balanced daily schedules with variety
      for (let day = 1; day <= guestData.tripDuration; day++) {
        const dayActivities = [];
        
        // Create a balanced mix of interests for each day
        const dailyInterestMix = createBalancedDailyMix(day, guestData.interests);
        
        console.log(`Planning Day ${day} with mix: ${dailyInterestMix.join(', ')}`);
        
        // Morning activity (9:00-11:00 AM)
        const morningActivity = getBestBusinessForSlot('morning', dailyInterestMix[0], usedBusinesses, day);
        if (morningActivity) {
          dayActivities.push({
            time: '9:00 AM',
            activity: morningActivity,
            type: dailyInterestMix[0]
          });
          usedBusinesses.add(morningActivity.name);
        }
        
        // Lunch break (11:30 AM - 1:00 PM)
        const lunchActivity = getBestBusinessForSlot('lunch', 'dining', usedBusinesses, day);
        if (lunchActivity) {
          dayActivities.push({
            time: '12:00 PM',
            activity: lunchActivity,
            type: 'dining'
          });
          usedBusinesses.add(lunchActivity.name);
        }
        
        // Afternoon activity (2:00-4:00 PM)
        const afternoonActivity = getBestBusinessForSlot('afternoon', dailyInterestMix[1], usedBusinesses, day);
        if (afternoonActivity) {
          dayActivities.push({
            time: '2:00 PM',
            activity: afternoonActivity,
            type: dailyInterestMix[1]
          });
          usedBusinesses.add(afternoonActivity.name);
        }
        
        // Evening activity (5:00-7:00 PM)  
        const eveningActivity = getBestBusinessForSlot('evening', dailyInterestMix[2], usedBusinesses, day);
        if (eveningActivity) {
          dayActivities.push({
            time: '5:30 PM',
            activity: eveningActivity,
            type: dailyInterestMix[2]
          });
          usedBusinesses.add(eveningActivity.name);
        }
        
        // Ensure day has at least one activity
        if (dayActivities.length === 0) {
          setError(`Unable to generate activities for Day ${day}. Please try different preferences or contact our concierge.`);
          setIsGenerating(false);
          return;
        }
        
        days.push({
          day: day,
          activities: dayActivities
        });
      }
      
      setItinerary(days);
      console.log(`Successfully generated ${days.length}-day itinerary with ${days.reduce((sum, day) => sum + day.activities.length, 0)} total activities`);
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError('Unable to generate your itinerary. Please try again or contact our concierge for assistance.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Create balanced daily mixes to avoid category clustering
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
    
    // Rotate interests for days beyond 3
    const rotationKey = ((dayNumber - 1) % 3) + 1;
    return interestRotations[rotationKey];
  };