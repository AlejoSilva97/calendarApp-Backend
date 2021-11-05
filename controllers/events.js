
const {response} = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events = await Event.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        events
    });

}

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {
        
        event.user = req.uid;

        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Comuniquese con el administrador"
        });
    }

}

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);
        const uid = req.uid;

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Este usuario no puede editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: updatedEvent
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }

}

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id;

    try {

        const event = await Event.findById(eventId);
        const uid = req.uid;

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Este usuario no puede eliminar este evento'
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            deletedEvent: deletedEvent
        });
        
    } catch (err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });

    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}