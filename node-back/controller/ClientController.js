const clientModel = require('../model/Client');
const crypto = require("crypto");

// Utility function to hash password
function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

exports.createClient = async (req, res) => {
    try {
        // Check for duplicates
        const exists = await clientModel.findOne({ Client_Email: req.body.Client_Email });
        if (exists) {
            return res.status(400).json({ message: 'Client already exists with the same email.' });
        }

        // Find the current max Client_ID
        const lastClient = await clientModel.findOne().sort({ Client_ID: -1 });
        const nextID = lastClient ? lastClient.Client_ID + 1 : 1;

        // Hash client password
        const hashedPassword = hashPassword(req.body.Client_Password);

        // Create new client
        const newClient = new clientModel({
            Client_ID: nextID,
            Client_Name: req.body.Client_Name,
            Client_Email: req.body.Client_Email,
            Client_Password: hashedPassword,
        });

        await newClient.save();
        res.status(201).json(newClient);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const clientId = Number(req.params.id);

        // Prevent updating Client_ID
        if ("Client_ID" in req.body) delete req.body.Client_ID;

        // Hash password if it is being updated
        if (req.body.Client_Password) {
            req.body.Client_Password = hashPassword(req.body.Client_Password);
        }

        const updatedClient = await clientModel.findOneAndUpdate(
            { Client_ID: clientId },
            req.body,
            { new: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(updatedClient);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const clientId = Number(req.params.id);

        const deletedClient = await clientModel.findOneAndDelete({ Client_ID: clientId });

        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json({ message: "Client deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
