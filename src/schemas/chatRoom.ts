import { defineField, defineType } from 'sanity';

export const chatRoom = defineType({
  name: 'chatRoom',
  title: 'Chat Room',
  type: 'document',
  fields: [
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['mental_health'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'requestId',
      title: 'Request ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastMessage',
      title: 'Last Message',
      type: 'text',
    }),
    defineField({
      name: 'lastMessageAt',
      title: 'Last Message At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'archived'],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        defineField({
          name: 'studentName',
          title: 'Student Name',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'counselorName',
          title: 'Counselor Name',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'requestType',
          title: 'Request Type',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'confidential',
          title: 'Confidential',
          type: 'boolean',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'priority',
          title: 'Priority',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
    }),
  ],
});
