import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Pier Grosvener',
    email: 'pgrosvener0@bandcamp.com',
    image: 'https://robohash.org/etquamdolor.png?size=50x50&set=set1',
    bio: 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
  },
  {
    name: 'Teresa Pichan',
    email: 'tpichan1@blogs.com',
    image: 'https://robohash.org/estanimiexplicabo.png?size=50x50&set=set1',
    bio: 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
  },
  {
    name: 'Fania Kearn',
    email: 'fkearn2@plala.or.jp',
    image: 'https://robohash.org/oditnostrumvelit.png?size=50x50&set=set1',
    bio: 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
  },
  {
    name: 'Mollee Haugh',
    email: 'mhaugh3@histats.com',
    image: 'https://robohash.org/sapientedoloresipsum.png?size=50x50&set=set1',
    bio: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
  },
  {
    name: 'Barby Dutton',
    email: 'bdutton4@e-recht24.de',
    image: 'https://robohash.org/ullamprovidentnon.png?size=50x50&set=set1',
    bio: 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
  },
  {
    name: 'Bradly Fulle',
    email: 'bfulle5@wikimedia.org',
    image: 'https://robohash.org/quisimiliquetenetur.png?size=50x50&set=set1',
    bio: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
  },
  {
    name: 'Dee dee Yashin',
    email: 'ddee6@amazon.co.uk',
    image: 'https://robohash.org/delectusquisaut.png?size=50x50&set=set1',
    bio: 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
  },
  {
    name: 'Pegeen Middlewick',
    email: 'pmiddlewick7@newsvine.com',
    image: 'https://robohash.org/etestsuscipit.png?size=50x50&set=set1',
    bio: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
  },
  {
    name: 'Glori Pfeffer',
    email: 'gpfeffer8@sciencedaily.com',
    image: 'https://robohash.org/nisietdolore.png?size=50x50&set=set1',
    bio: 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
  },
  {
    name: 'Ruy Pont',
    email: 'rpont9@squarespace.com',
    image: 'https://robohash.org/voluptatematsoluta.png?size=50x50&set=set1',
    bio: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
  },
];

const sampleData = [
  {
    title: 'Morbi porttitor lorem id ligula.',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
    genre: 'Big Band/Swing',
    language: 'hi',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418018/shirsample-samples/46b92e4fc69ef90cc4ee5055273f6fdf.mp3',
    duration: '15.084',
  },
  {
    title: 'Nullam varius.',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    genre: 'Soul/Funk/R&B',
    language: 'hr',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418016/shirsample-samples/2b8883f6582bd1bc3e40e0195e490dd5.mp3',
    duration: '30.06',
  },
  {
    title: 'Suspendisse accumsan tortor .',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    genre: 'Hip Hop',
    language: 'lg',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418015/shirsample-samples/4f93697554a05aa09a148aa2fa5afd44.mp3',
    duration: '18.756',
  },
  {
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    genre: 'World',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418015/shirsample-samples/1a76871d96ad7603c651b5898da3edf9.mp3',
    duration: '15.336',
    language: 'et',
  },
  {
    title: 'Morbi porttitor lorem id ligula.',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    genre: 'Folk/Country',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418017/shirsample-samples/83c0f331c7d5acb554c6bcd5a9eeca74.mp3',
    duration: '10.476',
    language: 'mr',
  },
  {
    title: 'Nunc purus.',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    genre: 'World',
    language: 'sm',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418018/shirsample-samples/96591d8994b7e5a0a74feeb2de1725d5.mp3',
    duration: '6.444',
  },
  {
    title: 'Pellentesque viverra pede ac diam.',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    genre: 'Big Band/Swing',
    language: 'ee',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418016/shirsample-samples/1b5479cc18015377010966b040a42c6b.mp3',
    duration: '29.916',
  },
  {
    title: 'Nunc rhoncus',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    genre: 'Big Band/Swing',
    language: 'ku',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418018/shirsample-samples/00347339597c3a211f6c897ba960c436.mp3',
    duration: '11.484',
  },
  {
    title: 'Fusce consequat.',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    genre: 'Folk/Country',
    language: 'sd',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418017/shirsample-samples/31b83ecdd0d8e145240501ed1e25044b.mp3',
    duration: '27.18',
  },
  {
    title: 'Ut at dolor quis odio consequat varius.',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
    genre: 'Big Band/Swing',
    language: 'ja',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418019/shirsample-samples/a7f22e07028392a7c9a79e69f9c6e947.mp3',
    duration: '9.864',
  },
  {
    title: 'Duis bibendum. Morbi non quam nec dui luctus',
    description:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    genre: 'Soundtrack/Film/Theater',
    gender: 'Polygender',
    language: 'fo',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418018/shirsample-samples/6a43162b730b51faaa85c8dea923b90f.mp3',
    duration: '30.06',
  },
  {
    title: 'Ut tellus.',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    genre: 'Jazz',
    language: 'ht',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418019/shirsample-samples/363e171c12f36144f051206dc2af8a3f.mp3',
    duration: '30.06',
  },
  {
    title: 'Integer non velit.',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    genre: 'Other',
    language: 'fa',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418017/shirsample-samples/4b4c5cf36d24326f93acbfa1b097f931.mp3',
    duration: '30.06',
  },
  {
    title: 'Vestibulum sed magna at nunc.',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
    genre: 'Big Band/Swing',
    language: 'ln',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418020/shirsample-samples/d840cbff2f894518b1f5001bb64228a8.mp3',
    duration: '28.872',
  },
  {
    title: 'Phasellus id sapien in sapien iaculis congue.',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    genre: 'Ambient/Instrumental',
    language: 'cs',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418020/shirsample-samples/caa6863c8a2d24234302ae0e0653b87e.mp3',
    duration: '30.06',
  },
  {
    title: 'Donec ut mauris eget massa ',
    description:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    genre: 'Big Band/Swing',
    language: 'or',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418019/shirsample-samples/ce68011dec03a8cef454e2c548f6144b.mp3',
    duration: '9.756',
  },
  {
    title: 'Aliquam augue quam, sollicitudin.',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    genre: 'Other',
    language: 'ca',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418020/shirsample-samples/cd6345aefa3dfb06382158e5214f38aa.mp3',
    duration: '6.984',
  },
  {
    title: 'Vivamus vestibulum sagittis sapien.',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    genre: 'Other',
    language: 'sl',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418021/shirsample-samples/f3eafc531644eab97fd188bca79c3447.mp3',
    duration: '30.06',
  },
  {
    title: 'Morbi vel lectus in quam',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
    genre: 'Blues',
    language: 'dz',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418022/shirsample-samples/d2680aac842f7a62354f331d879c1a8e.mp3',
    duration: '30.06',
  },
  {
    title: 'Nullam sit amet turpis elementum',
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
    genre: 'Electronic',
    language: 'mh',
    url: 'http://res.cloudinary.com/djyerevgr/video/upload/v1650418022/shirsample-samples/dae21037293b627de03af0774a013b66.mp3',
    duration: '30.06',
  },
];
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function main() {
  console.log(`Removing old data...`);
  await prisma.comment.deleteMany({});
  await prisma.proposal.deleteMany({});
  await prisma.sample.deleteMany({});
  await prisma.user.deleteMany({});
  console.log(`Start seeding ...`);
  for (const u of userData) {
    console.log('in user');
    const user = await prisma.user.create({
      data: u,
    });
    for (const s of [1, 2]) {
      console.log('in sample');
      const sample = await prisma.sample.create({
        data: {
          ...sampleData[s],
          user: { connect: { id: user.id } },
        },
      });
      console.log(`Created sample ${sample.id}`);
    }
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}
