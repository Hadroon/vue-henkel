const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// mongoose.Types.ObjectId

var submissionSchema = mongoose.Schema({

    userId: { type: ObjectId, required: true, index: true },
    dateOfPurchase: { type: Number, required: true },
    apCode: { type: String, required: true },
    dateOfSubmission: { type: Number, required: true },
    winnings: { type: [String] },

});

module.exports = mongoose.model('Submission', submissionSchema);