import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
    certificateNumber: {
        type: String,
        unique: [true, 'Certificate Number already exists!'],
        required: [true, "Certificate number is required"]
    },
    recipientName: {
        type: String,
    },
    recipientEmail: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    }
}, {
        timestamps: true
});

export const Certificate = mongoose.model("Certificate", CertificateSchema);
