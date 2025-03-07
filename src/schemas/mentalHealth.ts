import { defineField, defineType } from 'sanity';
import { RequestStatus, RequestPriority, CounselorStatus } from '../constants';

export const mentalHealthRequest = defineType({
  name: 'mentalHealthRequest',
  title: 'Mental Health Request',
  type: 'document',
  fields: [
    defineField({
      name: 'studentId',
      title: 'Student ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'studentName',
      title: 'Student Name',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: Object.values(RequestPriority),
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'confidential',
      title: 'Confidential',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: Object.values(RequestStatus),
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'counselorId',
      title: 'Counselor ID',
      type: 'string',
    }),
    defineField({
      name: 'counselorName',
      title: 'Counselor Name',
      type: 'string',
    }),
  ],
});
