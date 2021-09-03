const mongoose = require('mongoose');
const UserModel = require('./user_model');

const Device = mongoose.model('device', {
    id: mongoose.ObjectId,
    name: String,
    devType: {
        type: String,
        enum: ['AA', 'AB', 'AC', 'BA', 'BB', 'BC'],
    },
    currentState: Boolean,
    lastUpdated: { type: Date, default: Date.now }
});

const device = new Device({ name: 'obd', devType: 'AA', currentState: true });




let getDevice = async (id) => {
    const device = await Device.findById(id);
    if(device){
        return device;
    }
};

let saveDevice = async (newDevice) =>  {
    const response = {status: false, data: {}};
        const device = new Device(newDevice);
        const saved = await device.save();
        console.log(saved);
if(saved){
                response.data=saved;
response.status=true;
                return response;
}
else{
    return response
}
}

let updateDevice = async (updateDeviceCondition) =>  {
   const updatedDevice=  await Device.updateOne({ id: updateDeviceCodition.id }, {
    name:updateDeviceCodition.name},{
        devType:updateDeviceCodition.devType
    },{
currentState:updateDeviceCodition.currentState
    }
      );
      console.log(updatedDevice)
      return updatedDevice;
}

let updateCurrentStatus = async (currentStateCondition) =>  {
    const updatedDevice=  await Device.updateOne({ id: currentStateCondition.id }, {
        currentState :currentStateCondition.currentState
       });
       console.log(updatedDevice)
       return updatedDevice;
 }

let deleteDevice = async (deleteDeviceId) =>  {
    const user =  await UserModel.findOne({ 'email': req.user.email });
    const index=user.devices.indexof(deletedDeviceId)
    const deleteDeviceArray=user.devices.splice(index,1)
    user.devices=deleteDeviceArray;
    await user.save();
    await Device.findByIdAndRemove(deleteDeviceId);
    return saveDevice;
 }

const getDevices = async (deviceIds) => {
const devices = await Device.find({
    '_id': { $in: deviceIds.map(s => mongoose.Types.ObjectId(s) )}
});
console.log("devices",devices);
return devices;
}




module.exports = { getDevice,getDevices,saveDevice,updateDevice,deleteDevice };