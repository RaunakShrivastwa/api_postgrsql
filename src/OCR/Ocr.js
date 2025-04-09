
import 'dotenv/config';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import venderRepo from '../repositery/EntityRepositery.js';
import transactionrepo from '../repositery/EntityRepositery.js';
const repo = new venderRepo('vender')
const Trepo = new transactionrepo('transaction');
class GeminiAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async generateContent(req, res) {
    let imgUrl = req.body.url;
    let { data: { text } } = await Tesseract.recognize(imgUrl, "eng");
    text += 'give me name,address and total amount';

    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAc61ymBvHajTYwvQjdl7Wnl2kald_0t2o`, {
        contents: [{ parts: [{ text: text }] }]
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const str = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      const nameMatch = str.match(/\*\*Name:\*\*\s*(.*)/);
      const addressMatch = str.match(/\*\*Address:\*\*\s*(.*)/);
      const amountMatch = str.match(/\*\*Total Amount:\*\*\s*[$₹]?([\d.,]+)/);

      const name = nameMatch ? nameMatch[1] : null;
      const address = addressMatch ? addressMatch[1] : null;
      const totalAmount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null;

      console.log(name, address, totalAmount);

      const body = {
        venderName: name ? name : 'root',
        address: address ? address : 'lorem1',
        email: "tempVender.com",
        phone: "+912222222222"
      }

      const vender = await repo.create(body);
      const transaction = {
        vendorId: vender.id,
        userid: req.user.id,
        amount: totalAmount,
        image: req.body.url
      }
      const trans = await Trepo.create(transaction);
      return res.status(201).json(await Trepo.getTransactionsByUserId(req.user.id));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

// Create an instance of the class
export default new GeminiAPI('AIzaSyAc61ymBvHajTYwvQjdl7Wnl2kald_0t2o');

