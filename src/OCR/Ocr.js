
import 'dotenv/config';
import axios from 'axios';
import Tesseract from 'tesseract.js';

class GeminiAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async generateContent(req, res) {
    let imgUrl = req.body.url;
    let { data: { text } } = await Tesseract.recognize(imgUrl, "eng");
    text+='give me name,address and total amount';

    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAc61ymBvHajTYwvQjdl7Wnl2kald_0t2o`, {
        contents: [{ parts: [{ text: text }] }]
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const str = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      const data = {
        name: str.match(/\*\*\s*Name:\s*(.+)/)?.[1] || '',
        address: str.match(/\*\*\s*Address:\s*(.+)/)?.[1] || '',
        total: str.match(/\*\*\s*Total Amount:\s*(.+)/)?.[1] || ''
    };

      return res.json({ str:data});
    } catch (error) {
      console.error("Error:", error.response?.data || error.str);
      return null;
    }
  }
}

// Create an instance of the class
export default new GeminiAPI('AIzaSyAc61ymBvHajTYwvQjdl7Wnl2kald_0t2o');

