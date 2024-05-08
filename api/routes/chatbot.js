const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const Product = require("../models/Product"); // Ensure this path is correct
dotenv.config();

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.SCRTKEYOPENAI,
});

let conversationHistory = [{ role: 'system', content: "You are a helpful assistant" }];

router.post('/ask', async (req, res) => {
    const userMessage = req.body.message; // Convert to lowercase for case-insensitive matching
    conversationHistory.push({ role: "user", content: userMessage });

    try {
        // Handle questions about the platform
        if (userMessage.includes("platform") || userMessage.includes("pixel vault")) {
            return res.json({ message: "Pixel Vault is an online marketplace platform that specializes in the resale of a wide range of entertainment products, including video games, movies, and fan merchandise. It provides a platform for companies to offer these items to a broad audience, facilitating both the buying and selling processes." });
        }

        // Handle questions about the purpose of Pixel Vault
        if (userMessage.includes("purpose")) {
            return res.json({ message: "The purpose of Pixel Vault is to create a centralized marketplace where consumers can find and purchase various entertainment products from different resellers. The platform is designed to streamline the buying process, making it easier for customers to find rare or sought-after items, and for resellers to reach a wider market effectively." });
        }

        // Handle questions about what sets Pixel Vault apart
        if (userMessage.includes("different") || userMessage.includes("unique")) {
            return res.json({ message: "Pixel Vault sets itself apart from other marketplace platforms by focusing specifically on entertainment-related products. It caters to the unique interests of enthusiasts in video games, movies, and fan merchandise, offering a tailored shopping experience. Additionally, Pixel Vault incorporates features that facilitate easy navigation and transaction processes specifically designed for these product categories, enhancing user satisfaction and engagement." });
        }

        // Handle inquiries about products on sale generally
        if (userMessage.includes("what products are on sale") || userMessage.includes("products on sale")) {
            const products = await Product.find({ onSale: true });
            if (products.length > 0) {
                const saleDetails = products.map(product => {
                    const discountedPrice = (1 - product.salePercentage) * product.price;
                    return `${product.title} in ${product.categories.join(", ")} is ${product.salePercentage * 100}% off, priced at $${discountedPrice.toFixed(2)}`;
                }).join("\n\n");

                return res.json({ message: `Here are the products on sale:\n\n${saleDetails}` });
            } else {
                return res.json({ message: "Currently, there are no products on sale." });
            }
        }

        // Handling more detailed product inquiries
        const detailMatch = userMessage.match(/(?:tell me more|want details|show me information|can you give me the specs) about (.+)/i);
        if (detailMatch && detailMatch[1]) {
            const productTitle = detailMatch[1].trim();
            const product = await Product.findOne({ title: productTitle });

            if (product) {
                let productDetails = [
                    `Title: ${product.title}`,
                    `Description: ${product.description}`,
                    `Category: ${product.categories.join(", ")}`,
                    `Price: ${product.onSale ? `On Sale: $${((1 - product.salePercentage) * product.price).toFixed(2)} (Discounted from $${product.price})` : `$${product.price}`}`
                ];

                if (product.console && product.categories.includes('VideoGames')) {
                    productDetails.push(`Available in Consoles: ${product.console.join(", ")}`);
                }

                return res.json({ message: productDetails.join("\n\n") });
            } else {
                return res.json({ message: `No product found with the title '${productTitle}'.` });
            }
        }

        // Checking if a specific product is on sale
        const onSalePatterns = [
            /is (.+) on sale\??/i,                // "Is [product] on sale?"
            /are there any sales on (.+)\??/i,    // "Are there any sales on [product]?"
            /can you tell me if (.+) is discounted\??/i, // "Can you tell me if [product] is discounted?"
            /check if (.+) has discounts\??/i,    // "Check if [product] has discounts"
            /sale on (.+)/i                       // "Sale on [product]"
        ];

        let productTitle = '';

        // Try to find a match for any of the patterns
        for (let pattern of onSalePatterns) {
            const match = userMessage.match(pattern);
            if (match && match[1]) {
                productTitle = match[1].trim();
                break;  // Break the loop once a match is found
            }
        }

        // Process the matched product title
        if (productTitle) {
            const product = await Product.findOne({ title: productTitle });

            if (product) {
                const discountedPrice = (1 - product.salePercentage) * product.price;
                const discountPercent = product.salePercentage * 100;

                if (product.onSale) {
                    return res.json({
                        message: `Yes, ${productTitle} is on sale! It is currently ${discountPercent.toFixed(0)}% off, and the discounted price is $${discountedPrice.toFixed(2)}.`
                    });
                } else {
                    return res.json({ message: `There is no sale on ${productTitle} at the moment.` });
                }
            } else {
                return res.json({ message: `No product found with the title '${productTitle}'. Please check the spelling and try again.` });
            }
        }


        const categoryRegexPatterns = [
            /products in (\w+)/i,                               // "products in [category]"
            /what products are in (\w+)/i,                      // "what products are in [category]"
            /show me items in (\w+)/i,                          // "show me items in [category]"
            /list all products in (\w+)/i                       // "list all products in [category]"
        ];

        let categoryQuery = '';
        // Check each regex pattern for a match
        for (let pattern of categoryRegexPatterns) {
            const match = userMessage.match(pattern);
            if (match && match[1]) {
                categoryQuery = match[1].trim(); // Extract the category from the regex match
                break;
            }
        }

        if (categoryQuery) {
            const products = await Product.find({
                categories: { $in: [categoryQuery] } // Search in categories array
            });

            if (products.length > 0) {
                const productTitles = products.map(product => `${product.title} - $${product.price.toFixed(2)}`).join("\n\n");
                return res.json({ message: `Here are the products in ${categoryQuery}:\n\n${productTitles}` });
            } else {
                return res.json({ message: `No products found in the category '${categoryQuery}'.` });
            }
        }

        // Default response using OpenAI if no conditions are met
        const completion = await openai.chat.completions.create({
            messages: conversationHistory,
            model: "gpt-3.5-turbo",
        });

        const botResponse = completion.choices[0].message.content;
        res.json({ message: botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your request');
    }
});

module.exports = router;
