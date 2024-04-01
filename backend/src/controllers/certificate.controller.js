// we will use asyncHandler

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ShortUniqueId from 'short-unique-id';
import { Certificate } from "../models/CertificateModel.js";
import chalk from "chalk";



const { randomUUID } = new ShortUniqueId({ length: 16 });


const createCertificate = asyncHandler(async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return next(new ApiError(400, "All fields are required"));
        }

        const certificate = await Certificate.findOne({ recipientEmail: email });
        if (certificate) {
            return next(new ApiError(400, "Certificate already exists"));
        }

        const generatedCertificateNumber = randomUUID();
        const certificateNumber = String(generatedCertificateNumber).toLowerCase();
        
        console.log(certificateNumber);

        const newCertificate = new Certificate({
            certificateNumber,
            recipientName: name,
            recipientEmail: email.toLowerCase(),
        });

        await newCertificate.save();

        return res.status(201).json(new ApiResponse(201, newCertificate, "Certificate created successfully"));

    } catch (error) {
        console.log(error);
        return next(new ApiError(500, chalk.red("Problem in Creating Certificate")));
    }
});

const getCertificate = asyncHandler(async (req, res, next) => {
    try {
        const { certificateNumber } = req.params;
        if (!certificateNumber) {
            return next(new ApiError(400, "Certificate Number is required"));
        }

        const certificate = await Certificate.findOne({ certificateNumber });

        if (!certificate) {
            return next(new ApiError(404, "Certificate not found"));
        }

        return res.status(200).json(new ApiResponse(200, certificate, "Certificate found successfully"));

    } catch (error) {
        console.log(error);
        return next(new ApiError(500, chalk.red("Problem in Getting Certificate")));
    }
});

const getEmail = asyncHandler(async (req, res, next) => {
    try {
        const { certificateNumber } = req.params;
        if (!certificateNumber) {
            return next(new ApiError(400, "Certificate Number is required"));
        }

        const certificate = await Certificate.findOne({ certificateNumber: certificateNumber });

        if (!certificate) {
            return next(new ApiError(404, "Certificate not found"));
        }

        return res.status(200).json(new ApiResponse(200, certificate, "Certificate found successfully"));

    } catch (error) {
        console.log(error);
        return next(new ApiError(500, chalk.red("Problem in Getting Certificate")));
    }
})



export {
    createCertificate,
    getCertificate
}