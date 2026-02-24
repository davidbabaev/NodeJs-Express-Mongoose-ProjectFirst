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
    } 
];

const mockCards = [
    {
        title: "Learning React",
        content: "React hooks changed the way I build frontend apps",
        category: "Technology",
        image: { 
            url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg", 
            alt: "React code" 
        },
        location: "Tel Aviv",
    },
    {
        title: "Best Hummus in Town",
        content: "Found an amazing place near the market",
        category: "Food",
        image: { 
            url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg", 
            alt: "Hummus plate" 
        },
        location: "Haifa",
    },
    {
        title: "Sunset Photography",
        content: "Caught this incredible sunset from the rooftop",
        category: "Photography",
        image: { 
            url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg", 
            alt: "Sunset view"
        },
    },
    {
        title: "UI Design Tips",
        content: "Clean interfaces start with good spacing and typography",
        category: "Design",
        image: { 
            url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg", 
            alt: "Design mockup"
        },
        web: "https://designtips.example.com",
        location: "New York",
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
