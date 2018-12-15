const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var submissionSchema = mongoose.Schema({


    dates: { type: Number, required: true },
    apCode: { type: String, required: true },
    dateOfSubmission: { type: Number, required: true },
    winnings: { type: [String] },
    email: { type: String, required: true }

});

module.exports = mongoose.model('Submission', submissionSchema);
