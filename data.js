export const data = [
  {
    id: 1,
    title: 'Title1',
    content: 'Description1',
    user: {
      username: 'User1'
    },
    date: new Date('2020-04-10T16:45:00'),
    votes: 202,
    comments: [
      {
        id: 1,
        user: {
          username: 'User2'
        },
        content: 'Comment1',
        date: new Date('2020-04-18T20:45:00'),
        votes: 10
      }
    ]
  },
  {
    id: 2,
    title: 'Title2',
    content: 'Description2',
    user: {
      username: 'User2'
    },
    date: new Date('2020-04-11T16:45:00'),
    votes: 200,
    comments: [
      {
        id: 1,
        user: {
          username: 'User3'
        },
        content: 'Comment1',
        date: new Date('2020-04-18T20:45:00'),
        votes: 10
      },
      {
        id: 2,
        user: {
          username: 'User3'
        },
        content: 'Comment2',
        date: new Date('2020-04-18T21:45:00'),
        votes: 20
      }
    ]
  },
  {
    id: 3,
    title: 'Title3',
    content: 'Description3',
    user: {
      username: 'User3'
    },
    date: new Date('2020-04-12T16:45:00'),
    votes: 100,
    comments: [
      {
        id: 1,
        user: {
          username: 'User4'
        },
        content: 'Comment1',
        date: new Date('2020-04-18T20:45:00'),
        votes: 10
      },
      {
        id: 2,
        user: {
          username: 'User4'
        },
        content: 'Comment2',
        date: new Date('2020-04-18T21:45:00'),
        votes: 20
      },
      {
        id: 3,
        user: {
          username: 'User4'
        },
        content: 'Comment3',
        date: new Date('2020-04-18T22:45:00'),
        votes: 30
      }
    ]
  }
];