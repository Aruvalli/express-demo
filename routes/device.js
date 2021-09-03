var express = require('express');
var router = express.Router();
const UserModel = require('./../adapter/user_model')


const {getDevice,getDevices,saveDevice,updateDevice,deleteDevice} = require('../adapter/mongo_adapter');

router.get('/device/read', async function (req, res, next) {
    const user =  await UserModel.findOne({ 'email': req.user.email });
    const devices = await getDevices(user.devices);
    res.json( devices);
});

router.post('/device/create', async function (req, res, next) {
const device = await saveDevice(req.body)
console.log(device);
await addDeviceToUser(req.user.email,device.data._id);
res.send(device);
});

addDeviceToUser = async (email,deviceId) => {
    const user =  await UserModel.findOne({ 'email': email });
    user.devices = user.devices ? user.devices : [];
    user.devices.push(deviceId);
    const savedDevice =await user.save();
}


router.get('/device/delete',async function (req, res, next) {
// const user =  await UserModel.findOne({ 'email': req.user.email });
 const deletedDevice = await deleteDevice(req.params.id)
    res.send(deletedDevice);
    console.log(req.params);
});

router.post('/device/edit', async function(req, res, next) {
    const updatedDevice = await updateDevice(req.body)
res.send(updatedDevice);
    console.log(req.body);
  });

  router.post('/device/currentStatus', async function(req, res, next) {
    const updatedDevice = await updateCurrentStatus(req.body)
res.send(updatedDevice);
    console.log(req.body);
  });

  router.post('/device/share',async function(req,res,next){
    await addDeviceToUser(req.params.email,req.params.id);
    res.send('Device shared successfully')
  });



module.exports = router;
