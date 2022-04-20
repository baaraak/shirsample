import { SampleFormData } from 'pages/upload';
import prisma from './prisma';

export async function getUser(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(
  userId: string,
  data: { name?: string; bio?: string; image?: string }
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}

export async function getSample(id: string) {
  return prisma.sample.findUnique({
    where: { id },
    include: {
      user: { select: { name: true } },
      comments: true,
      proposals: true,
    },
  });
}

export async function getSamples(id) {
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

export async function createComment(
  body: string,
  userId: string,
  parentId?: string
) {
  return prisma.comment.create({
    data: {
      body,
      user: { connect: { id: userId } },
      parent_id: parentId || null,
    },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
  });
}

export async function createProposal(
  artist_name: string,
  song_title: string,
  userId: string,
  sampleId: string
) {
  return prisma.proposal.create({
    data: {
      artist_name,
      song_title,
      user: { connect: { id: userId } },
      sample: { connect: { id: sampleId } },
    },
  });
}
