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



const getDevice = async (id) => {
    const device = await Device.findById(id);
    if (device) {
        return device;
    }
};

const saveDevice = async (newDevice) => {
    const response = { status: false, data: {} };
    const device = new Device(newDevice);
    const saved = await device.save();
    console.log(saved);
    if (saved) {
        response.data = saved;
        response.status = true;
        return response;
    }
    else {
        return response
    }
}

const updateDevice = async (updateDeviceCondition) => {
    const updatedDevice = await Device.updateOne({ _id: updateDeviceCondition.id }, {
        name: updateDeviceCondition.name
    });
    return updatedDevice;
}

const updateCurrentStatus = async (currentStateCondition) => {

    const updatedDevice = await Device.updateOne({ _id: currentStateCondition.id }, {
        currentState: currentStateCondition.currentState
    });
    return updatedDevice;
}

const deleteDevice = async (deleteDeviceId) => {

    let deletedDevice = await Device.findOneAndRemove({ id: deleteDeviceId });
    return deletedDevice;
}

const getDevices = async (deviceIds) => {
    const devices = await Device.find({
        '_id': { $in: deviceIds.map(s => mongoose.Types.ObjectId(s)) }
    });
    console.log("devices", devices);
    return devices;
}




module.exports = { getDevice, getDevices, saveDevice, updateDevice, deleteDevice, updateCurrentStatus };