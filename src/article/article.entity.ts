import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // 可以映射到同名的Collection
export class Article extends Document {
  // id: number; mongo会自动添加_id
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
