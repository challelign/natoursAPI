
const fs = require('fs'); 

 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: "Success",
        requsetAt:  req.requestTime,
        totalResult: tours.length,
        data: {
            // tours 
            tours: tours
        }
    })
}
exports.getSingleTour = (req, res) => {
    console.log(req.params)
    const id = req.params.id * 1 // to cast id  as an integer string * int = int
    // if(id > tours.length){
    //     res.status(404).json({
    //         status:"fail",
    //         message:"Invalid Id"
    //     })
    // }
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        res.status(404).json({
            status: "fail",
            message: "Invalid Id"
        })
    }
    res.status(201).json({
        status: "success",
        data: {
            tour
        }
    })
}
exports.updateTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    if (!tour) {
        res.status(404).json({
            status: "fail",
            message: "Invalid Id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}

exports.createTour = (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), error => {
        res.status(201).json({
            status: "sucess",
            data: {
                newTour
            }
        })
    })
}

