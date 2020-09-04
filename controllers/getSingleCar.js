module.exports = {
    getSingleCar: (req, res) => {

        const id = req.params.id

        const cars = "SELECT c.id AS id, c.name AS modèle, f.name AS Constructeur, c.years AS année, c.price AS prix, c.image AS photo FROM cars AS c JOIN factories AS f ON c.factoryId = f.id JOIN energies AS e ON c.energyId = e.id  WHERE c.id = '"+ id +"';"

        db.query(cars, (err, result) =>{
            if(err){
                res.status(500).send(err)
            }
                res.render('singleCar', {cars: result[0]})
                // console.log(result);
        })
    },
    getUpdateCars: (req, res) => {
        const id = req.params.id

        const cars =[
            "SELECT c.name AS modèle, f.name AS Constructeur, c.years AS année, c.price AS prix,e.name AS carburant, c.image AS photo \
            FROM cars AS c \
            JOIN factories AS f ON c.factoryId = f.id \
            JOIN energies AS e ON c.energyId = e.id \
            WHERE c.id = '"+ id +"'"
            ,
            "SELECT * FROM factories"
            ,   
            "SELECT * FROM energies"   
        ]  
            
        db.query(cars.join(';'), (err, result) =>{
            if(err){
                res.status(500).send(err)
            }
                res.render('update', {
                    cars: result[0][0],
                    factories: result[1],
                    energies: result[2]
                })
                console.log(result);
        })
    }
}