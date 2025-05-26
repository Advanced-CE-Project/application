import { z } from 'zod';

// User
export type User = {
  id: string
  name: string
  email: string
}

// Group
export const groupCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
})

export type GroupCreateSchema = z.infer<typeof groupCreateSchema>

export type Group = {
  id: string
  name: string
  description?: string
  membersCount: number
}

export type Place = {
  id: string
  name: string
  distance: number
}

// Attendance
export type Attendance = {
  id: string
  date: string
  status: '출석' | '결석' | '지각'
}

// Sharing
export type SharedFile = {
  id: string
  title: string
  url: string
  type: 'image' | 'file'
  ownerId: string
}

export const sharingUploadSchema = z.object({
  title: z.string().min(1),
  type: z.union([z.literal('image'), z.literal('file')]),
  file: z.object({
    uri: z.string(),
    name: z.string().optional(),
    mimeType: z.string().optional(),
  }),
})

export type SharingUploadSchema = z.infer<typeof sharingUploadSchema>

// Mission
export const missionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
})

export type MissionSchema = z.infer<typeof missionSchema>

export type Mission = {
  id: string
  title: string
  description?: string
}

// Evaluation
export type Member = {
  id: string
  name: string
}

export const evaluationSchema = z.object({
  scores: z
    .array(
      z.object({
        score: z.string().refine((val) => ['1', '2', '3', '4', '5'].includes(val)),
        comment: z.string().optional(),
      })
    )
    .nonempty(),
})

export type EvaluationSchema = z.infer<typeof evaluationSchema>

// notification
export type NotificationItem = {
  id: string
  title: string
  message: string
  read: boolean
}
