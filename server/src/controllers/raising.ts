import { v4 as uuidv4 } from 'uuid';
import { Raising } from '../models/models';
import { Request, Response } from 'express';

export const createRaising = async (req: Request, res: Response) => {
    try {
        const raising = new Raising(req.body);
        raising.save()
            .then(() => {
                raising.id = uuidv4();
                raising.save()
                res.status(404).json({ success: true, raising })
            })
            .catch(err => res.status(404).json({ "Success": "false", "message": err.message.split(":").pop() }));

    } catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' })
    }
}

export const getRaisings = async (req: Request, res: Response) => {
    try {
        const raisings = await Raising.find();

        if (raisings) {
            res.status(201).json({ "success": true, raisings })
        } else {
            res.status(404).json({ "success": false, "message": "No raisings" });
        }

    } catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' })
    }
}

export const getRaising = async (req: Request, res: Response) => {
    try {
        const raising = await Raising.findOne({ id: req.params.id });

        if (raising) {
            res.status(201).json({ "success": true, raising })
        } else {
            res.status(404).json({ "success": false, "message": "No raising" });
        }

    } catch (err) {
        res.status(404).json({ success: false, msg: (err instanceof Error) ? err.message : 'Some error occurred' })
    }
}

export const updateRaising = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let raising = await Raising.findOne({ id: id })
        if (raising) {
            raising = await Raising.findOneAndUpdate({ id: id }, req.body, { returnDocument: 'after' })
            raising?.save()
                .then(() => { return res.status(200).json({ "Success": true, "message": "raising updated successully", "raising": raising }) })
                .catch((err) => { return res.status(404).json({ "Success": "false", "message": "Failed to save raising", "error": (err instanceof Error) ? err.message : 'Some error occurred' }) })
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" })
        }

    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to update raising", err: err })
    }
}

export const removeRaising = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        let raising = await Raising.findOne({ id: id })
        if (raising) {
            raising = await Raising.findOneAndDelete({ id: id })
            res.status(200).json({ "Success": true, "message": raising })
        }
        else {
            res.status(404).json({ "success": false, "message": "raising not found" })
        }
    } catch (err) {
        res.status(404).json({ "success": false, "message": "Failed to fetch raising" })
    }
}