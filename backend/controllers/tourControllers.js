
const Tour = require('./../models/tourModel'); 
const APIFeatures = require('../utils/APIFeaturs');

 
// this class act as middleware 
exports.aliasTopTours = async(req, res, next) =>{
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'; 
  next()
}
exports.getAllTours = async (req, res) => {
  try {


/* 
    // 1. Build the query
    const queryObj = {...req.query}
    const exculdedField = ['page', 'limit','sort','fields'];
    exculdedField.forEach(el => delete (queryObj[el]))


   // 2) Advanced filtering
   let queryStr = JSON.stringify(queryObj);
   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // g helps to loop and check match for all
   console.log(JSON.parse(queryStr))



    // console.log(req.query, queryObj)

    // const query =  Tour.find( queryObj)  
    let query =  Tour.find(JSON.parse(queryStr)) 
    
    // 3 Sorting 
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        // query = query.sort(req.query.sort);
        query = query.sort(sortBy);
    }else{
        query = query.sort('_CreatedAt')
    }
    // 5. Limiting the Fields (the fileds that pass are not shown to the user)
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields)
    }else{
        query = query.select('-__v')
    }
    // 6 pagination
    const page = req.query.page *1 || 1;
    const limit = req.query.limit *1  || 100 // loaded data for first time from the whole data
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // check if page exist
    if(req.query.page){
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) throw new Error("This Page is not Found")
    }

//  excute query
    const tours = await query



*/

// excute query
// req.query  implis for quer comming from the express router
const featurs = new APIFeatures (Tour.find(), req.query).filter().sort().limitFields().paginate();
    const tours = await featurs.query

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      totalRes:tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    if(!tour) return res.status(404).json({
        status:"Error",
        message:`no data found on this id  ${req.params.id}`
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    // thes same as the above
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

