import mongoose from 'mongoose';

export interface FileResponseDTO {
  id: mongoose.Types.ObjectId;
  url: string;
}

export interface FileCreateDTO {
  location: string;
  originalname: string;
}
