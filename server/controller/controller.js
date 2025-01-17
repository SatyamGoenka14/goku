const Userdb = require('../model/model');
const Truck = require('../model/modals2');
const Managerdb = require('../model/manager');

// create and save a new truck
exports.create2 = async (req, res) => {
    try {
        const { truck_name, truck_model, truck_number, truck_year, truck_capacity, driver_name, driver_license, driver_contact, truck_status } = req.body;
        const newTruck = new Truck({
            truck_name,
            truck_model,
            truck_number,
            truck_year,
            truck_capacity,
            driver_name,
            driver_license,
            driver_contact,
            truck_status
        });
        await newTruck.save();
        res.status(201).redirect('/add1');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding truck to the database.');
    }
};

// find truck by truck number
exports.find2 = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Truck.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Truck not found with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving truck with id " + id });
            });
    } else {
        Truck.find()
            .then(trucks => {
                res.send(trucks);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving trucks from the database" });
            });
    }
}

// update an existing truck by truck number
exports.update2 = async (req, res) => {
    try {
        const { truck_name, truck_model, truck_number, truck_year, truck_capacity, driver_name, driver_license, driver_contact, truck_status } = req.body;
        const newTruck = new Truck({
            truck_name,
            truck_model,
            truck_number,
            truck_year,
            truck_capacity,
            driver_name,
            driver_license,
            driver_contact,
            truck_status
        });
        await newTruck.save();
        res.status(201).redirect('/updateTruck');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding truck to the database.');
    }
}

// create a new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    //create new instance
    const user = new Userdb({
        truckNumber: req.body.truckNumber,
        date: req.body.date,
        Truck: req.body.Truck,
        Sender: req.body.Sender,
        Receiver: req.body.Receiver,
        Status: req.body.Status,
        ConsignmentNumber: req.body.ConsignmentNumber,
        Addressreceiver: req.body.Addressreceiver,
        Addresssender: req.body.Addresssender,

        Volume: req.body.Volume,

        Summary: req.body.Summary,

    })


    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}

//search
// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving user with id " + id })
            })

    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }


}

//update an existing user using id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}





// create a new manager
exports.createManager = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    const manager = new Managerdb({
        mno: req.body.mno,
        mname: req.body.mname,
        leaveFrom: req.body.leaveFrom,
        leaveTill: req.body.leaveTill,
        nature: req.body.nature
    });
    manager.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating a manager"
            });
        });
}

// find manager by ID or retrieve all managers
exports.findManager = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Managerdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Manager not found with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving manager with id " + id });
            });
    } else {
        Managerdb.find()
            .then(managers => {
                res.send(managers);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send({ message: "Error retrieving managers from the database" });
            });
    }
}
