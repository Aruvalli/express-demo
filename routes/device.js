const express = require('express');
const router = express.Router();
const UserModel = require('./../adapter/user_model')


const { getDevices, saveDevice, updateDevice, deleteDevice, updateCurrentStatus } = require('../adapter/device_adapter');

router.get('/device/read', async function (req, res, next) {
  const response = { status: false, data: {} };
  const user = await UserModel.findOne({ 'email': req.user.email });
  const devices = await getDevices(user.devices);
  if (devices) {
    response.status = true;
    response.data = devices;
  }
  res.send(response);
});

router.post('/device/create', async function (req, res, next) {
  const device = await saveDevice(req.body)
  await addDeviceToUser(req.user.email, device.data._id);
  res.send(device);
});

addDeviceToUser = async (email, deviceId) => {
  const user = await UserModel.findOne({ 'email': email });
  user.devices = user.devices ? user.devices : [];
  user.devices.push(deviceId);
  const savedDevice = await user.save();
}


router.post('/device/delete', async function (req, res, next) {
  const response = { status: false, data: {} };
  const user = await UserModel.findOne({ 'email': req.user.email });
  const index = user.devices.indexOf(req.body.id)
  user.devices.splice(index, 1)
  await user.save();
  const deletedDevice = await deleteDevice(req.body.id)
  if (deletedDevice == null) {
    response.status = true;
    response.message = "Device removed successfully"
    res.send(response);
  }
});

router.post('/device/edit', async function (req, res, next) {
  const response = { status: false, message: "Not updated" };
  const updatedDevice = await updateDevice(req.body)
  if (updatedDevice.modifiedCount != 0) {
    response.status = true;
    response.message = "updated successfully"
  }
  res.send(response);
});

router.post('/device/currentState', async function (req, res, next) {
  const response = { status: false, message: "currentState Not updated" };
  const updatedDevice = await updateCurrentStatus(req.body)
  if (updatedDevice.modifiedCount != 0) {
    response.status = true;
    response.message = " currentState updated successfully"
  }
  res.send(response);

});

router.post('/device/share', async function (req, res, next) {
  await addDeviceToUser(req.params.email, req.params.id);
  res.send('Device shared successfully')
});



module.exports = router;
