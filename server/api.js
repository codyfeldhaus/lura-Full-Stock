const axios = require('axios');
require('dotenv').config();


const apiCall = async (stockQuery) => {
    const date = "2023-12-12"; //how to get current date?
   try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
         throw new Error('API key is not provided');
      }
      
      // Make HTTP request to the API endpoint, passing the API key in the request
      const response = await axios.get(`https://api.polygon.io/v1/open-close/${stockQuery}/${date}?adjusted=true&apiKey=${apiKey}`)
      
      // Return the response data
      console.log(response.data);
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
