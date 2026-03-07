require('dotenv').config();

const User = require('../users/models/User');
const Card = require('../cards/models/Card');

const normalizeUser = require('../users/helpers/normalizeUser');
const normalizeCard = require('../cards/helpers/normalizeCard');

const {generateUserPassword} = require('../users/helpers/bcrypt');

const {connectToDB, disconnectDB} = require('../dbService');

const mockUsers = [
   {
        name: "David",
        lastName: "Cohen",
        email: "david@test.com",
        password: "Test1234!",
        phone: "050-1234567",
        age: 28,
        birthDate: "1997-05-12",
        gender: "Male",
        job: "Developer",
        aboutMe: "Full-stack developer who loves building apps",
        address: {
            country: "Israel",
            city: "Tel Aviv",
            street: "Rothschild",
            house: 42,
            zip: 12345
        },
        isAdmin: true
    },
    {
        name: "Sarah",
        lastName: "Levi",
        email: "sarah@test.com",
        password: "Test1234!",
        phone: "052-9876543",
        age: 25,
        birthDate: "2000-08-23",
        gender: "Female",
        address: {
            country: "Israel",
            city: "Haifa",
        }
    },
    {
        name: "Mike",
        lastName: "Ross",
        email: "mike@test.com",
        password: "Test1234!",
        phone: "054-5551234",
        age: 32,
        birthDate: "1993-11-07",
        profilePicture: 'https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo=',
        gender: "Male",
        job: "Designer",
        aboutMe: "UI/UX designer with a passion for clean interfaces",
        address: {
            country: "United States",
            city: "New York",
            street: "Broadway",
            house: 100,
            zip: 10001
        }
    },
        {
        name: "Noa",
        lastName: "Mizrahi",
        email: "noa@test.com",
        password: "Test1234!",
        phone: "053-1112233",
        age: 27,
        birthDate: "1998-03-15",
        gender: "Female",
        job: "Marketing",
        aboutMe: "Marketing specialist obsessed with brand storytelling",
        address: { country: "Israel", city: "Jerusalem", street: "Jaffa", house: 18, zip: 91000 }
    },
    {
        name: "Ethan",
        lastName: "Brown",
        email: "ethan@test.com",
        password: "Test1234!",
        phone: "057-4445566",
        age: 30,
        birthDate: "1995-07-22",
        gender: "Male",
        job: "Software Engineer",
        aboutMe: "Backend engineer who enjoys distributed systems",
        address: { country: "United Kingdom", city: "London", street: "Baker", house: 22, zip: 10002 }
    },
    {
        name: "Maya",
        lastName: "Shapiro",
        email: "maya@test.com",
        password: "Test1234!",
        phone: "058-7778899",
        age: 24,
        birthDate: "2001-01-10",
        gender: "Female",
        job: "Photographer",
        aboutMe: "Capturing moments one frame at a time",
        address: { country: "Israel", city: "Tel Aviv", street: "Dizengoff", house: 55, zip: 64332 }
    },
    {
        name: "James",
        lastName: "Walker",
        email: "james@test.com",
        password: "Test1234!",
        phone: "050-3334455",
        age: 35,
        birthDate: "1990-09-30",
        gender: "Male",
        job: "Finance",
        aboutMe: "Finance analyst by day, guitarist by night",
        address: { country: "Canada", city: "Toronto", street: "King", house: 77, zip: 30301 }
    },
    {
        name: "Lior",
        lastName: "Ben David",
        email: "lior@test.com",
        password: "Test1234!",
        phone: "052-6667788",
        age: 29,
        birthDate: "1996-12-05",
        gender: "Male",
        job: "Cybersecurity",
        aboutMe: "Making the internet a safer place one bug at a time",
        address: { country: "Israel", city: "Beer Sheva", street: "Rager", house: 10, zip: 84100 }
    },
    {
        name: "Sofia",
        lastName: "Garcia",
        email: "sofia@test.com",
        password: "Test1234!",
        phone: "054-9990011",
        age: 26,
        birthDate: "1999-04-18",
        gender: "Female",
        job: "Education",
        aboutMe: "Teacher who believes technology can transform learning",
        address: { country: "Spain", city: "Barcelona", street: "Las Ramblas", house: 5, zip: 20001 }
    },
    {
        name: "Omer",
        lastName: "Katz",
        email: "omer@test.com",
        password: "Test1234!",
        phone: "056-2223344",
        age: 31,
        birthDate: "1994-06-25",
        gender: "Male",
        job: "Data",
        aboutMe: "Turning raw data into stories that drive decisions",
        address: { country: "Israel", city: "Ramat Gan", street: "Arlozorov", house: 33, zip: 52521 }
    },
    {
        name: "Anna",
        lastName: "Petrov",
        email: "anna@test.com",
        password: "Test1234!",
        phone: "053-5556677",
        age: 23,
        birthDate: "2002-11-02",
        gender: "Female",
        job: "Graphic Design",
        aboutMe: "Visual thinker who speaks in colors and shapes",
        address: { country: "Germany", city: "Berlin", street: "Unter den Linden", house: 9, zip: 40001 }
    },
    {
        name: "Yoav",
        lastName: "Stern",
        email: "yoav@test.com",
        password: "Test1234!",
        phone: "050-8889900",
        age: 33,
        birthDate: "1992-08-14",
        gender: "Male",
        job: "Architecture",
        aboutMe: "Designing spaces where people actually want to be",
        address: { country: "Israel", city: "Herzliya", street: "Sokolov", house: 21, zip: 46100 }
    },
];

const mockCards = [
    {
        title: "Learning React",
        content: "React hooks changed the way I build frontend apps",
        category: "Technology",
        image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        location: "Tel Aviv",
    },
    {
        title: "Best Hummus in Town",
        content: "Found an amazing place near the market",
        category: "Food & Recipes",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Haifa",
    },
    {
        title: "Sunset Photography",
        content: "Caught this incredible sunset from the rooftop",
        category: "Photography",
        image: "https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        title: "UI Design Tips",
        content: "Clean interfaces start with good spacing and typography",
        category: "UI/UX Design",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
        web: "https://www.designtips.com",
        location: "New York",
    },
    {
        title: "Morning Run in the City",
        content: "Started waking up at 6am for runs and honestly it changed everything",
        category: "Fitness & Health",
        image: "https://images.pexels.com/photos/2803158/pexels-photo-2803158.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Tel Aviv",
    },
    {
        title: "My Sourdough Journey",
        content: "After three failed attempts I finally got the perfect crust",
        category: "Food & Recipes",
        image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Jerusalem",
    },
    {
        title: "Exploring Barcelona",
        content: "Gaudi's architecture is something you have to see in person",
        category: "Travel & Places",
        image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Barcelona",
    },
    {
        title: "My Home Studio Setup",
        content: "Finally built the desk setup I always dreamed about",
        category: "Home Decor",
        image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "London",
    },
    {
        title: "Getting Into Machine Learning",
        content: "Started a course on neural networks and my brain hurts in the best way",
        category: "Science & Tech",
        image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Beer Sheva",
    },
    {
        title: "Street Art in Berlin",
        content: "Every wall in this city tells a different story",
        category: "Art & Design",
        image: "https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Berlin",
    },
    {
        title: "Books That Changed My Thinking",
        content: "These three books rewired how I approach problems completely",
        category: "Books & Literature",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Toronto",
    },
    {
        title: "Nature Walk After Work",
        content: "Twenty minutes in the forest does more than an hour of Netflix",
        category: "Nature & Outdoors",
        image: "https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Herzliya",
    },
    {
        title: "Portfolio Redesign Complete",
        content: "Spent two weeks rebuilding my portfolio from scratch and super happy with the result",
        category: "Graphic Design",
        image: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Ramat Gan",
    },
    {
        title: "Coffee Shop Review",
        content: "This place has the best flat white in the city and the vibe is unreal",
        category: "Lifestyle",
        image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
        location: "Tel Aviv",
    },
];     

const createSeedData = async () => {
    // 1. Connect to DB
    await connectToDB();

    try{
        // 2. Clear old data
        await User.deleteMany({})
        // this deletes all users from the collection. Run it once before the map, and you're guranteed no duplicates.

        // 3. Create users (map + Promise.all)
        const saveUser = mockUsers.map(async(mUser) => {
                mUser.password = await generateUserPassword(mUser.password)
                const normalizedUser = normalizeUser(mUser);
                let newUser = new User(normalizedUser);
                newUser = await newUser.save();
                return newUser;
            })
        // 4. Log success
        const savedUsers = await Promise.all(saveUser)
        // this wait for every user in the array to finish saving, then gives you the actual results. and you'll need savedUser later - why? because when you create cards, each card needs a user_id that points to a real saved user. where do you get those IDs? from the saved users that MongoDB gave _id values to.   

        console.log(`${savedUsers.length} users saved successfully`);

        await Card.deleteMany({});
        const saveCard = mockCards.map(async(mCard, index) => {
            mCard.userId = savedUsers[index % savedUsers.length]._id;
            const normalizedCard = normalizeCard(mCard);
            let newCard = new Card(normalizedCard);
            newCard = await newCard.save();
            return newCard;
        })

        const savedCards = await Promise.all(saveCard);
        console.log(`${savedCards.length} cards saved successfully`);
    }
    catch(err){
        console.log(err.message);
    }
    finally{
        // 5. Disconnect
        await disconnectDB();
    }
}

createSeedData();
