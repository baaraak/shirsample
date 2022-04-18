import { SampleFormData } from '../pages/upload';

import prisma from './prisma';

export async function getUser(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(userId, data) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}

export async function getSample(id) {
  return prisma.sample.findUnique({
    where: { id },
    include: {
      user: { select: { name: true } },
      comments: true,
      proposals: true,
    },
  });
}

export async function createSample(
  data: SampleFormData & { url: string; duration: string },
  userId: string
) {
  return prisma.sample.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
    },
  });
}

export async function getComments(sampleId) {
  return prisma.comment.findMany({
    where: { sampleId },
  });
}

export async function createComment(body, userId, sampleId) {
  return prisma.comment.create({
    data: {
      body,
      sample: { connect: { id: sampleId } },
      user: { connect: { id: userId } },
    },
  });
}

export async function createProposal(data, userId, sampleId) {
  return prisma.proposal.create({
    data: {
      ...data,
      sample: { connect: { id: sampleId } },
      user: { connect: { id: userId } },
    },
  });
}
