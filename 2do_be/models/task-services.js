const mongoose = require("mongoose");
const taskModel = require("./task");
const dotenv = require("dotenv");

dotenv.config({
  path: "../.env",
});

mongoose.set("debug", true);

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/users"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    
  )
  .catch((error) => console.log(error));
  console.log(process.env.MONGO_DB)

async function getTasks(status, title, description, dueDate) {
  let result;
  if (status === undefined && title === undefined) {
    // Returns all tasks?
    result = await taskModel.find();
  // } else if (status && !title) {
  //   result = await findTaskByStatus(status); //Returns just tasks with certain status: Complete, in progress?
  // } else if (!status && title) {
  //   result = await findTaskByCategory(title);
  // } else {
  //   result = await findTaskByStatusAndCategory(status, title);
    return result;
  }
}

async function addTask(status, title, desc, dueDate) {
  try {
    const taskToAdd = new taskModel(status, title, desc, dueDate);
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

//Need to fix this up to align with our new approach of updating all fields
//when updating any field in the task 

async function updateTaskDescription(description, id) {
  try {
    const filter = { id: `${findTaskById(id)}` };
    const update = { description: description };
    let updatedTask = await taskModel.findOneAndUpdate(filter, update);
    return updatedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateTaskCategory(category, id) {
  try {
    const filter = { id: `${findTaskById(id)}` };
    const update = { category: category };
    let updatedTask = await taskModel.findOneAndUpdate(filter, update);
    return updatedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateTaskTitle(title, id) {
  try {
    const filter = { id: `${findTaskById(id)}` };
    const update = { title: title };
    let updatedTask = await taskModel.findOneAndUpdate(filter, update);
    return updatedTask;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findTaskById(id) {
  try {
    return await taskModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findTaskByStatus(status) {
  return await taskModel.find({ status: status });
}

async function findTaskByCategory(status, category) {
  return await taskModel.find({ status: status, category: category });
}

async function findTaskByStatusAndCategory(status, category) {
  return await taskModel.find({ status: status, category: category });
}

async function findTaskByDate(status, category) {
  return await taskModel.find({ status: status, category: category });
}

exports.getTasks = getTasks;

exports.addTask = addTask;
exports.deleteTask = deleteTask;

exports.findTaskByStatus = findTaskByStatus;
exports.findTaskByStatusAndCategory = findTaskByStatusAndCategory;
exports.findTaskByCategory = findTaskByCategory;
exports.findTaskByDate = findTaskByDate;

exports.updateTaskCategory = updateTaskCategory;
exports.updateTaskDescription = updateTaskDescription;
exports.updateTaskTitle = updateTaskTitle;
