import mongoose from 'mongoose';

const schema = mongoose.Schema;

const refreshTokenSchema = new schema(
    {
        token: {type: String , unique:true }
    },{timestamps: false}
);

export default mongoose.model("Refresh Token",refreshTokenSchema,'refreshTokens');