import mongoose, { Schema } from 'mongoose'

const matchSchema = new Schema({
  team1_id: {
    type: String
  },
  team2_id: {
    type: String
  },
  team1_score: {
    type: String
  },
  team2_score: {
    type: String
  },
  group: {
    type: String
  },
  user_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

matchSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      team1_id: this.team1_id,
      team2_id: this.team2_id,
      team1_score: this.team1_score,
      team2_score: this.team2_score,
      group: this.group,
      user_id: this.user_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Match', matchSchema)

export const schema = model.schema
export default model
