module.exports = {
    getHomePage: (req, res) => {

        const cars = "SELECT c.id AS id, c.name AS modèle, f.name AS Constructeur, c.years AS année, e.name AS carburant, c.price AS prix, c.image AS photo FROM cars AS c JOIN factories AS f ON c.factoryId = f.id JOIN energies AS e ON c.energyId = e.id;"

        db.query(cars , (err, result) =>{
            if(err){
                res.status(500).send(err)
            }
            res.render("index", {cars: result})
            // console.log(result);
        })
            
    }
}