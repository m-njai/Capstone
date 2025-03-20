const mongoose = require('mongoose');

const costEstimationSchema = new mongoose.Schema({
    timber_type: {
        type: String,
        required: true,
        enum: ['Pine', 'Oak']
    },
    length_m: {
        type: Number,
        required: true
    },
    width_m: {
        type: Number,
        required: true
    },
    height_m: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_volume_m3: {
        type: Number,
        required: true
    },
    price_per_m3: {
        type: Number,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const CostEstimation = mongoose.model('CostEstimation', costEstimationSchema);

module.exports = CostEstimation;