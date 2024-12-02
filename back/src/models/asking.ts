import { Schema, model } from 'mongoose';
import User from "../routes/User";


interface Askings {
    title: string;
    user_id: typeof User;
    start_date: Date;
    end_date: Date;
    mentor_id: typeof User;
    state?: boolean;
    description?: string;
}

const askingSchema = new Schema<Askings>({
    title: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    mentor_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    start_date: { type: Date, required: true },
    end_date:{ type: Date, required: true },
    state: { type: Boolean, required: false, default: null },
    description: { type: String, required: false }
});

const Asking = model<Askings>('Asking', askingSchema);

export { Asking };
