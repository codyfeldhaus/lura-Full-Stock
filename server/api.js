const axios = require('axios');
require('dotenv').config();


const apiCall = async (stockQuery) => {
   const currentDate = new Date();
   //const yesterday = new Date(currentDate.getDate() - 1);
   //const formattedDate = yesterday.toISOString().split('T')[0]; // Format to YYYY-MM-DD
   //console.log(yesterday)
   const formattedDate = "2024-02-05"
   console.log(formattedDate); 
   try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
         throw new Error('API key is not provided');
      }
      
      // Make HTTP request to the API endpoint, passing the API key in the request
      //stockQuery capitalized?
      const response = await axios.get(`https://api.polygon.io/v1/open-close/${stockQuery.toUpperCase()}/${formattedDate}?adjusted=true&apiKey=${apiKey}`)
      
      // Return the response data
      //console.log(response.data);
      return response.data;
   } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
      // Return null or throw the error, depending on how you want to handle it
      return null;
   }
}

//comment out like 28 when just testing file
module.exports = apiCall;
//comment out line 30 when testing app
//apiCall("AAPL");
