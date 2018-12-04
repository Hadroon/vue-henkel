var mongoose = require('mongoose');

var submissionSchema = mongoose.Schema({

    userId: { type: ObjectId, required: true, index: true },
    dateOfBuying: { type: Date, required: true },
    apCode: { type: String, required: true },
    dateOfSubmission: { type: Date, required: true },
    winnings: { type: [String] },

});

module.exports = mongoose.model('Submission', submissionSchema);