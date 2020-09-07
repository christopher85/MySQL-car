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
            
    },
   
        getAddCars:(req,res)=>{

            const cars =[
                "SELECT * FROM factories"
                ,   
                "SELECT * FROM energies"   
            ]  
                
            db.query(cars.join(';'), (err, result) =>{
                if(err){
                    res.status(500).send(err)
                }
                    //res.json(result)
                    res.render('update', {
                        cars: result[0][0],
                        factories: result[1],
                        energies: result[2]
                    })
                    // console.log(result);
            })

    },
    

    addCars: (req, res) =>{

        const modele = req.body.modele
        const constructeur = req.body.constructeur
        const carburant = req.body.carburant
        const annee = req.body.annee
        const prix = req.body.prix
        const image = req.body.image

        const cars = "INSERT INTO cars (name, factoryId, years, price, energyId, image)\
        VALUES (?, ?, ?, ?, ?, ? );"

        db.query(cars,[modele, constructeur,annee , prix, carburant, image], (err, result) =>{
            if(err){
                res.status(500).send(err)
            }
                res.json(result)
        })
    }
}