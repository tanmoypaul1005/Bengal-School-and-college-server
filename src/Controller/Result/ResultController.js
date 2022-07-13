const Result = require("../../Model/Result/Result");
const ErrorHander = require("../../utils/ErrorHander");

module.exports.AddResult = (req, res, next) => {
  const { student, gpa, subject, term } = req.body;
  console.log(req.body)


  Result.findOne({student: req.body.student, term :req.body.term})
  .exec((error,data)=>{
    if (data) {return res.status(200).json({ message: "Result All Rady Published!!!!!!!!!!!!!!!!"});}

   Result.find({student: student, term :term}).exec((error, data) => {
    if (error) return next(new ErrorHander("Somethings is rong", 500));
    if (data) {
      Result.findOneAndUpdate(
        { student: student,term :term },
        { $push: { result: req.body } }
      ).exec((error, data) => {
        if (error) return next(new ErrorHander("Somethings is rong", 500));
        if (data) {
          return res
            .status(200)
            .json({ message: "Result has Been Published", data });
        }
      });

    }
      
  });


_result = new Result({ student, term });
_result.save((error, data) => {
  if (error) return next(new ErrorHander("Somethings is rong", 500));
  if (data) {
    // Result.findOneAndUpdate(
    //   { student: student },
    //   { $push: { result: req.body } }
    // ).exec((error, data2) => {
    //   if (error) return next(new ErrorHander("Somethings is rong", 403));
    //   if (data2) {
    //     return res
    //       .status(200)
    //       .json({ message: "Result has Been Published", data2 });
    //   }
    // });
   
  }
});

})


};




module.exports.getResult = (req, res, next) => {
//   console.log(req.body);
  const { term } = req.body;
  Result.findOne({student: req.body.student,term:req.body.term,}).populate("result.subject")
  .exec((error, data) => {
    if (error) return next(new ErrorHander("Somethings is rong", 400));
    if (data) {
      return res.status(200).json({ data });
    }
  });
};
