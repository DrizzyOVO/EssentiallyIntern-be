import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({ 
    username: String, 
    password: String, 
}); 

const stocksSchema = new mongoose.Schema({ 
    symbol: String, 
    open: Number,
}); 

export const User = mongoose.models.User || mongoose.model('User', userSchema); 
export const Stock = mongoose.models.Stock || mongoose.model('Stock', stocksSchema); 

