var ownerWithAdd={
  id: 1,
  name: 'James Bond',
  address: '2417 taraval st, San Fancisco, CA',
  zipcode: 94116,
  numOfCats: 2,
  food: '1/2cup dry food for breakfast, 3oz can food for dinner',
  medical: null,
  personality : 'shy',
  other: null,
  phone: '415-213-4467',
  email: 'umihui86@gmail.com'
};

var ownerWithoutAdd={
  id: 2,
  name: 'Daniel Craig',
  address: '2075 sutter st, San Fancisco, CA',
  zipcode: 94115,
  numOfCats: 1,
  food: '1/2cup dry food for breakfast, 3oz can food for dinner',
  medical: null,
  personality : 'social',
  other: null,
  phone: '415-213-3456',
  email: 'umihui86@gmail.com'
};

export const sitters =[{
    id: 1,
    name: 'Feline Wishes and Caviar Dreams',
    address: '600 Bryant St, San Fancisco, CA',
    zipcode: 94107,
    phone: '415-543-5365',
    email: 'umihui86@gmail.com',
    description: 'trustful,experienced cat boarding service, inclusively for cats',
    boarding: true,
    comeIn: false,
    price: 40,
    unit: 'day',
    coordinates: [37.783176, -122.410854]
  },
  {
    id: 2,
    name: 'Andrew London',
    address: '1100 clement st, San Fancisco, CA',
    zipcode: 94121,
    phone: '415-213-8743',
    email: 'umihui86@gmail.com',
    description: 'animal lovers, have two cats in home, enjoy taking care of cats',
    boarding: false,
    comeIn: true,
    price: 30,
    unit: 'visit',
    coordinates: [37.784923, -122.412517]
  },
  {
    id: 3,
    name: 'Julia Child',
    address: '1100 clement st, San Fancisco, CA',
    zipcode: 94121,
    phone: '415-213-8743',
    email: 'umihui86@gmail.com',
    description: 'animal lovers, have two cats in home, enjoy taking care of cats',
    boarding: false,
    comeIn: true,
    price: 30,
    unit: 'visit',
    coordinates: [37.783252, -122.405951]
  },
  {
    id: 4,
    name: 'Tom Cruise',
    address: '1100 clement st, San Fancisco, CA',
    zipcode: 94121,
    phone: '415-213-8743',
    email: 'umihui86@gmail.com',
    description: 'animal lovers, have two cats in home, enjoy taking care of cats',
    boarding: false,
    comeIn: true,
    price: 30,
    unit: 'visit',
    coordinates: [37.781319, -122.409148]
  },
  {
    id: 5,
    name: 'Umi Hui',
    address: '1100 clement st, San Fancisco, CA',
    zipcode: 94121,
    phone: '415-213-8743',
    email: 'umihui86@gmail.com',
    description: 'animal lovers, have two cats in home, enjoy taking care of cats',
    boarding: false,
    comeIn: true,
    price: 30,
    unit: 'visit',
    coordinates: [37.784126, -122.408225]
  }
];

var sitterReviews = [
{
  id:2,
  text:'I was in need of a new pet sitter for my 2 kitties and fortunately Vanessa was available! She took great care of my cats, provided updates after each visit, and even left a cat toy. Vanessa is reliable, responsive, and loves animals!'},
{
  id:10,
  text:'I hired Vanessa to watch my baby Bleu while I was out of town. She was great--always on time, quick to respond to texts, and even left a few toys for Bleu, including a laser that he absolutely loves!'},
{
  id:15,
  text:'Vanessa was always so efficient and organized that we knew our Cleo was in good hands. She brought treats (always asking ahead if that was ok), she spent time with her & took photos which we LOVED! Now when we\'re away it will certainly be Vanessa we call!'
}
];

var ownerMessage = 'hi, I am in need of cat sitter for next week, come to my house every two days, scooping litter and feeding. My cat is nice and enjoy people around.';
var sitterAccept = {
  message: 'I could come every two days for next week, 30-min per visit in the morning.',
  price: 30,
  unit: 'visit'
};
