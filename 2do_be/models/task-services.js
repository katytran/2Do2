const mongoose = require("mongoose");
const taskModel = require("./task");
const dotenv = require("dotenv")




// READ THISSSSSSSS ///
// Working through transfering this over to tasks
// Need to connect it to backend.js and make sure that is all transfered over too
// THEN we can try to connect to database

dotenv.config({
  path: "/home/martog/code/learning/school/CSC307/2Do/.env",
});

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://" 
        + process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PWD +
        "@"+
        process.env.MONGO_CLUSTER +
        "/"+
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users"
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getTasks(status, category) {
  let result;
  if (status  === undefined && title === undefined) { // Returns all tasks?
    result = await taskModel.find();
  } else if (status && !category) {
    result = await findTaskByStatus(status); //Returns just tasks with certain status: Complete, in progress?
  } else if (!status && title) {
    result = await findTaskByCategory(category);
  } else {
    result = await findTaskByStatusAndCategory(status, category); //Would we ever need to find task by status and title?
                                                              //Maybe task that is in progress and contains certain text
                                                              //Could make this a category instead!
  }
  return result;
}

async function findTaskById(id) {
  try {
    console.log(id)
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addTask(title, desc) {
  try {
    const taskToAdd = new taskModel(title, desc);
    const savedTask = await taskToAdd.save();
    return savedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteTask(id) {
  try {
    return await taskModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findTaskByStatus(status) {
  return await taskModel.find({ status: status });
}

async function findTaskByCategory(status, category) {
  return await userModel.find({ status: status, category: category });
}

async function findTaskByStatusAndCategory(status, category) {
  return await userModel.find({ status: status, category: category });
}


async function findTaskByDate(status, category) {
  return await userModel.find({ status: status, category: category });
}



exports.getTasks = getTasks;

exports.findTaskByStatus = findTaskByStatus;
exports.findTaskByStatusAndCategory = findTaskByStatusAndCategory;

exports.addTask = addTask;
exports.deleteTask = deleteTask;
