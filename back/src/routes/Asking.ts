// @ts-ignore
import {Context, Hono} from 'hono';
import {Asking} from '../models/asking';
import {CreationsUsers} from '../models/user';
import { exec } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

const api = new Hono().basePath('/');


api.post('/asking', async (c :any) => {
    try {
        const { title, description, start_date, mentor_id } = await c.req.json();

        const user_id = c.user._id;

        const startDateObj = new Date(start_date);
        const endDateObj = new Date(startDateObj.getTime() + 60 * 60 * 1000);
        const end_date = endDateObj.toISOString();

        const newAsking = new Asking({
            title,
            user_id,
            description,
            start_date,
            end_date,
            mentor_id
        });

        const savedAsking = await newAsking.save();
        return c.json(savedAsking);
    } catch (error: any) {
        return c.json({ msg: 'Error creating asking', error: error.message }, 500);
    }
});

api.get('/askings/mentor/:mentor_id', async (c: any) => {
    const mentor_id = c.req.param('mentor_id')
    try {
        const mentor_id = c.req.param('mentor_id');
        const askings = await Asking.find({ mentor_id }).populate('mentor_id', 'pseudo').populate('user_id', 'pseudo');
        const results = askings.map((asking) => ({
            id: asking._id,
            start_date: asking.start_date,
            end_date: asking.end_date,
            mentor: asking.mentor_id,
            user: asking.user_id,
            title: asking.title,
            description: asking.description,
            state: asking.state

        }));
        return c.json(results);
    } catch (error: any) {
        return c.json({ msg: 'Error user', error: error.message }, 500);
    }
});

api.get('/askings/user/:user_id', async (c: any) => {
    const user_id = c.req.param('user_id');
    try {
        const askings = await Asking.find({ user_id }).populate('mentor_id', 'pseudo').populate('user_id', 'pseudo');

        const results = askings.map((asking) => ({
            id: asking._id,
            start_date: asking.start_date,
            end_date: asking.end_date,
            mentor: asking.mentor_id,
            user: asking.user_id,
            title: asking.title,
            description: asking.description,
            state: asking.state
        }));
        return c.json(results);
    } catch (error: any) {
        return c.json({ msg: 'Error user', error: error.message }, 500);
    }
});

api.patch('/accept-asking/:id', async (c: any) => {
    try {
        const userId = c.user.id;

        const _id = c.req.param('id');
        const asking = await Asking.findById(_id);
        if (!asking) {
            return c.json({ msg: 'Asking not found' }, 404);
        }

        if (asking.mentor_id.toString() !== userId.toString()) {
            return c.json({ msg: 'Unauthorized' }, 403);
        }

        const { state } = await c.req.json();
        asking.state = state;
        const updatedAsking = await asking.save();

        return c.json(updatedAsking);
    } catch (error: any) {
        return c.json({ msg: 'Error updating asking', error: error.message }, 500);
    }
});


api.patch('/asking/:id', async (c: any) => {
    try {
        const _id = c.req.param('id');
        const updateData = await c.req.json();

        const asking = await Asking.findByIdAndUpdate(_id, updateData, { new: true });

        if (!asking) {
            return c.json({ msg: 'Asking not found' }, 404);
        }

        return c.json(asking);
    } catch (error: any) {
        return c.json({ msg: 'Error updating asking', error: error.message }, 500);
    }
});

api.get('/asking/:id', async (c: any) => {
    try {
        const _id = c.req.param('id');
        const asking = await Asking.findOne({ _id })
            .populate('user_id', 'pseudo')
            .populate('mentor_id', 'pseudo');

        if (!asking) {
            return c.status(404).json({ msg: 'Asking not found' });
        }

        const result = {
            id: asking._id,
            title: asking.title,
            description: asking.description,
            state: asking.state,
            start_date: asking.start_date,
            end_date: asking.end_date,
            user: {
                pseudo: asking.user_id.pseudo ? asking.user_id.pseudo : 'Pseudo not found'
            },
            mentor: {
                pseudo: asking.mentor_id.pseudo ? asking.mentor_id.pseudo : 'Pseudo not found'
            }
        };

        return c.json(result);
    } catch (error: any) {
        return c.status(500).json({ msg: 'Error fetching asking details', error: error.message });
    }
});

api.delete('/asking/:id', async (c: any) => {
    try {
        const _id = c.req.param('id');
        const asking = await Asking.findByIdAndDelete(_id);

        if (!asking) {
            return c.json({ msg: 'Asking not found' }, 404);
        }

        return c.json({ msg: 'Asking deleted successfully' });
    } catch (error: any) {
        return c.json({ msg: 'Error deleting asking', error: error.message }, 500);
    }
});

api.get('/asking', async (c: any) => {
    try {
        const askings = await Asking.find({})
            .populate('user_id', 'pseudo')
            .populate('mentor_id', 'pseudo');

        if (!askings || askings.length === 0) {
            return c.status(404).json({ msg: 'No askings found' });
        }

        const results = askings.map((asking: any) => ({
            id: asking._id,
            title: asking.title,
            description: asking.description,
            state: asking.state,
            start_date: asking.start_date,
            end_date: asking.end_date,
            user: {
                pseudo: asking.user_id ? asking.user_id.pseudo : 'Pseudo not found'
            },
            mentor: {
                pseudo: asking.mentor_id ? asking.mentor_id.pseudo : 'Pseudo not found'
            }
        }));

        return c.json(results);
    } catch (error: any) {
        return c.status(500).json({ msg: 'Error fetching asking details', error: error.message });
    }
});

api.post('/execute-command', async (c: any) => {
    const { commandKey } = await c.req.json();

    if (!commandKey) {
        return c.json({ msg: 'No command provided' }, 400);
    }

    try {
        return new Promise((resolve) => {
            exec(commandKey, (error, stdout, stderr) => {
                if (error) {
                    resolve(c.json({ error: `Erreur: ${stderr}` }, 500));
                } else {
                    resolve(c.json({ result: stdout.trim() }));
                }
            });
        });
    } catch (error: any) {
        return c.json({ msg: 'Erreur lors de l’exécution de la commande', error: error.message }, 500);
    }
});

api.get('/read-file', async (c: any) => {
    const { filePath } = c.req.query(); // Récupère le paramètre filePath

    if (!filePath) {
        return c.json({ msg: 'No file path provided' }, 400);
    }

    try {
        const requestedPath = path.resolve(filePath);

        const fileContent = readFileSync(requestedPath, 'utf8'); // Lit le fichier
        return c.json({ content: fileContent });
    } catch (error: any) {
        return c.json({ msg: 'Error reading file', error: error.message }, 500);
    }
});


export default api;
