const userData = [
  {
    first_name: 'dana',
    last_name: 'smith',
    username: 'dSmith91',
    password: 'testtest1',
    email: 'dsmith@test.com',
    role: 'member',
    phone: '9177777777',
  },
  {
    first_name: 'chris',
    last_name: 'falcon',
    username: 'bird_guy',
    password: 'testtest2',
    email: 'birdguy@test.com',
    role: 'member',
    phone: '9174444444',
  },
  {
    first_name: 'sheri',
    last_name: 'george',
    username: 'sg1995',
    password: 'testtest3',
    email: 'sg@test.com',
    role: 'member',
    phone: '2125555555',
  },
  {
    first_name: 'clarence',
    last_name: 'samuel',
    username: 'clary55',
    password: 'testtest4',
    email: 'c.sam@test.com',
    role: 'admin',
    phone: '2129999999',
  },
  {
    first_name: 'audrey',
    last_name: 'alister',
    username: 'aatesting',
    password: 'testtest5',
    email: 'aa@test.com',
    role: 'admin',
    phone: '2128888888',
  },
  {
    first_name: 'franklin',
    last_name: 'parker',
    username: 'frparker',
    password: 'testtest6',
    email: 'franklin@test.com',
    role: 'member',
    phone: '2121111111',
  },
  {
    first_name: 'Lady',
    last_name: 'Gaga',
    username: 'ladygaga',
    password: 'ghfgbnfgn',
    email: 'ladygaga@user.com',
    role: 'member',
    phone: '5918725656',
  },
  {
    first_name: 'Britney',
    last_name: 'Spears',
    username: 'itsbritneyb',
    password: 'bbbb',
    email: 'britney@gmail.com',
    role: 'member',
    phone: '3168795432',
  },
  {
    first_name: 'Jane',
    last_name: 'Yeh',
    username: 'janeyeh',
    password: 'jane',
    email: 'janeyeh@matcha.com',
    role: 'admin',
    phone: '5641208752',
  },
  {
    first_name: 'Kate',
    last_name: 'Grant',
    username: 'kategrant',
    password: 'kg',
    email: 'kategrant@matcha.com',
    role: 'admin',
    phone: '4425896324',
  },
  {
    first_name: 'Sheyla',
    last_name: 'De los Santos',
    username: 'sheyladelossantos',
    password: 'sheyla',
    email: 'sheyladelossantos@matcha.com',
    role: 'admin',
    phone: '52168752398',
  },
];

// {first_name: , last_name: , username: , password: , email: , role: , phone: }

const productData = [
  {
    name: 'Delicious Green',
    price: 30.95,
    quantity: 10,
    description: 'A delicious blend of green teas.',
    category: 'tea',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/green-matcha-tea-powder-top-view-royalty-free-image-904776948-1555092847.jpg',
  },
  {
    name: 'Notorious',
    price: 40.95,
    quantity: 6,
    description: 'A unique mix of flavors to energize your palate.',
    category: 'tea',
    image:
      'https://www.justonecookbook.com/wp-content/uploads/2019/03/How-To-Make-Matcha-1766-III.jpg',
  },
  {
    name: 'The Hulk',
    price: 30.95,
    quantity: 36,
    description:
      'Big, bold, in your face flavor that gets the energy you need.',
    category: 'tea',
    image:
      'https://i0.wp.com/tching.com/wp-content/uploads/2017/05/Matcha-in-bowl.jpg?w=2160&ssl=1',
  },
  {
    name: 'Green Goodness',
    price: 30.95,
    quantity: 46,
    description: 'Smooth and can be enjoyed at any time.',
    category: 'tea',
    image:
      'https://cdn.shopify.com/s/files/1/0311/4398/5197/products/20200312_ArtofTea__AudreyMa__0393_Web_1_800x.jpg?v=1586549727',
  },
  {
    name: 'The Whisk',
    price: 38.99,
    quantity: 20,
    description: 'A whisk away from your foamy dreams.',
    category: 'accessories',
    image:
      'https://images.pexels.com/photos/8474098/pexels-photo-8474098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'The Superior',
    price: 30.99,
    quantity: 20,
    description: 'Grassy and earthy flavor.',
    category: 'tea',
    image:
      'https://images.pexels.com/photos/5946649/pexels-photo-5946649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Spoonful',
    price: 9.95,
    quantity: 27,
    description: 'The only spoon you need.',
    category: 'accessories',
    image:
      'https://images.pexels.com/photos/8474088/pexels-photo-8474088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'White Trouble',
    price: 24.95,
    quantity: 13,
    description: 'Mischevous and aromatic.',
    category: 'tea',
    image:
      'https://cdn.shopify.com/s/files/1/0311/4398/5197/products/MATCHA_GRADE_A_600x.jpg?v=1582421040',
  },
  {
    name: 'The Basic',
    price: 24.95,
    quantity: 33,
    description: 'Perfect for matcha lattes.',
    category: 'tea',
    image:
      'https://images.pexels.com/photos/8329677/pexels-photo-8329677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'A Trip to Kyoto',
    price: 24.95,
    quantity: 23,
    description: 'Hints of sweet nuttiness.',
    category: 'tea',
    image:
      'https://images.pexels.com/photos/6833705/pexels-photo-6833705.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Eisai',
    price: 20.95,
    quantity: 20,
    description: 'Notes of fresh green leaves with a complex deep flavor.',
    category: 'tea',
    image:
      'https://images.pexels.com/photos/6833900/pexels-photo-6833900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: `The Good Ol' Pot`,
    price: 59.95,
    quantity: 30,
    description: 'Cast iron tea pot for all pour overs.',
    category: 'accessories',
    image: 'https://m.media-amazon.com/images/I/715DQkdCvnL._AC_SL1500_.jpg',
  },
  {
    name: 'A Handful Mug',
    price: 39.95,
    quantity: 30,
    description: 'Fill it with tea.',
    category: 'accessories',
    image:
      'https://images.pexels.com/photos/8474201/pexels-photo-8474201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Bowl',
    price: 29.95,
    quantity: 30,
    description: 'Ceramic bowl for matcha mixing with the whisk.',
    category: 'accessories',
    image:
      'https://images.pexels.com/photos/8474140/pexels-photo-8474140.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    name: 'Matcha Cup',
    price: 19.95,
    quantity: 30,
    description: 'The perfect cup for sips.',
    category: 'accessories',
    image:
      'https://images.pexels.com/photos/5946681/pexels-photo-5946681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'Matcha Madness',
    price: 20.95,
    quantity: 46,
    description: 'Culinary grade powder great for baking.',
    category: 'tea',
    image:
      'https://www.baked-theblog.com/wp-content/uploads/2018/10/IMG_8877-683x1024.jpg',
  },
  {
    name: 'Baby Leaf',
    price: 20.95,
    quantity: 46,
    description: 'Slightly mild in flavor but still super green.',
    category: 'tea',
    image:
      'https://images.pexels.com/photos/8474066/pexels-photo-8474066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

module.exports = { userData, productData };
