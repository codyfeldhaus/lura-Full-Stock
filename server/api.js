const axios = require('axios');
require('dotenv').config();


const apiCall = async (stockQuery) => {
   //Get today's date
   const today = new Date();
   // Subtract one day
   const yesterday = new Date(today);
   yesterday.setDate(yesterday.getDate() - 2);
   // Format as YYYY-MM-DD
   const formattedYesterday = yesterday.toISOString().split('T')[0];
   console.log(formattedYesterday); 
   // const options = {
   //           year: 'numeric',
   //           month: '2-digit',
   //           day: '2-digit',
   //           hour: '2-digit',
   //           minute: '2-digit',
   //           second: '2-digit',
   //           timeZone: 'America/New_York' // Eastern Standard Time (EST)
   //       };
   //       const currentDate = new Date().toLocaleString('en-US', options);
   // const formattedDate = "2024-02-05"
   // console.log(formattedDate); 
   try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
         throw new Error('API key is not provided');
      }
      
      // Make HTTP request to the API endpoint, passing the API key in the request
      //stockQuery capitalized?
      const response = await axios.get(`https://api.polygon.io/v1/open-close/${stockQuery.toUpperCase()}/${formattedYesterday}?adjusted=true&apiKey=${apiKey}`)
      
      // Return the response data
      //console.log(response.data);
      return response.data;
   } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
      
      return null;
   }
}

const apiCallGetCompanyName = async (stockQuery) => {
   try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
         throw new Error('API key is not provided');
      }
    
      const response = await axios.get(`https://api.polygon.io/v3/reference/tickers/${stockQuery.toUpperCase()}?apiKey=${apiKey}`)
      
      
      return response.data;
   } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
      
      return null;
   }
}

module.exports = { apiCall, apiCallGetCompanyName }

//    const options = {
//        year: 'numeric',
//        month: '2-digit',
//        day: '2-digit',
//        hour: '2-digit',
//        minute: '2-digit',
//        second: '2-digit',
//        timeZone: 'America/New_York' // Eastern Standard Time (EST)
//    };
//    const currentDate = new Date().toLocaleString('en-US', options);
//    console.log(currentDate); // Output current date in EST format