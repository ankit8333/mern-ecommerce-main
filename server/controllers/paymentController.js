const axios = require("axios");

const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_AUTH;

// Initialize Payment
const initializePayment = async (req, res) => {
    const config = {
        headers: {
            Authorization: `Bearer ${CHAPA_AUTH}`
        }
    };

    const CALLBACK_URL = "http://localhost:3000/payment-success";
    const TEXT_REF = "tx-myecommerce-" + Date.now();

    const data = {
        amount: req.body.amount,
        currency: 'ETB',
        email: req.body.email || 'ato@ekele.com',
        first_name: req.body.first_name || 'Ato',
        last_name: req.body.last_name || 'Ekele',
        tx_ref: TEXT_REF,
        callback_url: CALLBACK_URL
    };

    try {
        const response = await axios.post(CHAPA_URL, data, config);
        res.status(200).json({
            success: true,
            checkout_url: response.data.data.checkout_url
        });
    } catch (error) {
        console.error("Chapa payment initialization failed", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Verify Payment
const verifyPayment = async (req, res) => {
    const config = {
        headers: {
            Authorization: `Bearer ${CHAPA_AUTH}`
        }
    };

    try {
        const response = await axios.get(
            `https://api.chapa.co/v1/transaction/verify/${req.params.id}`,
            config
        );
        res.status(200).json({
            success: true,
            data: response.data
        });
    } catch (err) {
        console.error("Payment verification failed", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { initializePayment, verifyPayment };
