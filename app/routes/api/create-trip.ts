import { GoogleGenerativeAI } from "@google/generative-ai";
import { ID } from "appwrite";
import { data, type ActionFunctionArgs } from "react-router";
import { appWriteConfig, database } from "~/appwrite/client";
import { parseMarkdownToJson } from "~/lib/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    country,
    numberOfDays,
    travelStyle,
    interests,
    budget,
    groupType,
    userId,
  } = await request.json();

  const getAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const unSplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

  try {
    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
        Budget: '${budget}'
        Interests: '${interests}'
        TravelStyle: '${travelStyle}'
        GroupType: '${groupType}'
        Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
        {
        "name": "A descriptive title for the trip",
        "description": "A brief description of the trip and its highlights not exceeding 100 words",
        "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
        "duration": ${numberOfDays},
        "budget": "${budget}",
        "travelStyle": "${travelStyle}",
        "country": "${country}",
        "interests": ${interests},
        "groupType": "${groupType}",
        "bestTimeToVisit": [
          '🌸 Season (from month to month): reason to visit',
          '☀️ Season (from month to month): reason to visit',
          '🍁 Season (from month to month): reason to visit',
          '❄️ Season (from month to month): reason to visit'
        ],
        "weatherInfo": [
          '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
        ],
        "location": {
          "city": "name of the city or region",
          "coordinates": [latitude, longitude],
          "openStreetMap": "link to open street map"
        },
        "itinerary": [
        {
          "day": 1,
          "location": "City/Region Name",
          "activities": [
            {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
            {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
            {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
          ]
        },
        ...
        ]
    }`;

    const textResult = await getAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);
    const trip = parseMarkdownToJson(textResult.response.text());
    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unSplashApiKey}`
    );
    const imageUrls = (await imageResponse.json()).results
      .slice(0, 3)
      .map((res: any) => res.urls?.regular || null);
    const result = await database.createDocument(
      appWriteConfig.databaseId,
      "6834a6200001502f18f3",
      ID.unique(),
      {
        tripDetails: JSON.stringify(trip),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    );
    return data({ id: result.$id });
  } catch (error) {
    console.error("error generating travel plan", error);
  }
};
