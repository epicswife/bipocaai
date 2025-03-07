import { defineField, defineType } from 'sanity';
import { CounselorStatus } from '../constants';

export const counselor = defineType({
  name: 'counselor',
  title: 'Counselor',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: Object.values(CounselorStatus),
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'currentLoad',
      title: 'Current Load',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'maxLoad',
      title: 'Maximum Load',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'object',
      fields: [
        defineField({
          name: 'slots',
          title: 'Time Slots',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'day', type: 'string' },
              { name: 'start', type: 'string' },
              { name: 'end', type: 'string' }
            ]
          }]
        })
      ]
    }),
    defineField({
      name: 'lastActive',
      title: 'Last Active',
      type: 'datetime',
    }),
  ],
});
