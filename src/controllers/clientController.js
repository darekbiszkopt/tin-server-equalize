const db = require('./../models');

// create Client Model
const Clients = db.clients;

// 1. add Client
const addClient = async (req, res) => {
    try {
        const { pesel, first_name, surname, address, can_get_loan } = req.body;

        //Encrypt user password
        const data = { pesel, first_name, surname, address, can_get_loan };

        // Create client in our database
        await Clients.create(data);

        res.status(201).json({ created: true });

    } catch (err) {
        console.log(err);
    }
};

// 2. get all users
const getAllClients = async (req, res) => {

    const clients = await Clients.findAll({
    });

    res.status(200).send(clients);
};

// 3. get single user
const getClient = async (req, res) => {
    try {
        const { id } = req.body;

        if (!(pesel && first_name && surname && address)) {
            return res.status(400).send('Inputs required');
        }
        const peselOld = await Clients.findOne({ where: { pesel } });

        if (peselOld) {
            return res.status(409).send('Pesel Already Exist');
        }

        const client = await Clients.findOne({ where: { id } });

        if (client) {
            return res.status(200).json({ client });
        }

        res.status(400).send(`Not Found Client by id: ${id}`);

    } catch (err) {
        console.log(err);
    }
};

// 4. update Client
const updateClient = async (req, res) => {
    const id = req.body.id;

    const user = await Clients.update(req.body, { where: { id } });

    res.status(200).send(user);
};

// 6. delete Client
const deleteClient = async (req, res) => {
    const id = req.body.id;

    await Clients.destroy({ where: { id } });

    res.status(200).send('Client deleted!');
};


module.exports = {
    addClient, getAllClients, getClient, updateClient, deleteClient
};