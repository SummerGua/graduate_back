import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema() // 可以映射到同名的Collection
export class Article extends Document {
  // id: number; mongo会自动添加_id
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
