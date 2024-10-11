import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { counterContext } from './Context/Context';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaCampground, FaPlusCircle, FaUsers, FaComments } from 'react-icons/fa';

function App() {
  const userId = Cookies.get('userIdYelp');
  const [campData, setCampData] = useState([]);
  const [userData, setUserData] = useState({});
  const location = useLocation();

  const func = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/campground`, {
          headers: {
            Accept: 'application/json',
          },
        });
        setCampData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  useEffect(func, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const isOutletRendered = location.pathname !== '/home';

  return (
    <>
      <counterContext.Provider value={{ campData, setCampData }}>
        <Navbar refetchNewCamp={func} />
        <Outlet />
      </counterContext.Provider>
      {!isOutletRendered && (
        <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
          <header className="text-center mb-10">
            <div className="flex flex-col items-center mb-6">
              <img
                src={userData.profilePic || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="rounded-full w-24 h-24 border-4 border-lime-300 mb-2"
              />
              <h2 className="text-2xl font-bold text-lime-300">{userData.name || 'Guest'}</h2>
            </div>
            <h1 className="text-4xl font-bold text-lime-300 mb-4">Welcome to YelpCamp</h1>
            <p className="text-xl mb-6">Discover and share the best campgrounds around the world.</p>
          </header>

          {/* Additional Dummy Text */}
          <section className="bg-gray-900 p-8 rounded-lg shadow-lg mb-10">
            <h2 className="text-3xl font-bold text-lime-300 mb-6">Why Choose YelpCamp?</h2>
            <p className="mb-4">
              YelpCamp is the best place to discover new campsites and share your own experiences with fellow campers. Whether
              you're planning a solo adventure or a group camping trip, our community provides reviews, photos, and detailed
              information on campgrounds all over the world. From majestic forests to serene lakeside spots, find your perfect
              getaway.
            </p>
            <p className="mb-4">
              We offer comprehensive information, including weather conditions, amenities, and difficulty levels for accessing
              each site. Whether you're a seasoned camper or just starting out, YelpCamp will help you find your next outdoor
              destination with ease.
            </p>
          </section>

          {/* Main Sections */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {/* Explore Campgrounds */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaCampground className="text-lime-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-lime-300 mb-4">Explore Campgrounds</h2>
              <p className="mb-4">
                Find the perfect campground for your next adventure with detailed reviews and ratings.
              </p>
              <img
                src="https://assets.creationmuseum.org/img/cms/content/contentnode/og_image/explore-camp-1200x628.jpg"
                alt="Campground"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="explorecampground"
                onClick={func}
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400 transition duration-200"
              >
                Explore Campgrounds
              </NavLink>
            </div>

                        {/* View Campgrounds on maps */}
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaCampground className="text-lime-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-lime-300 mb-4">View Campgrounds on maps</h2>
              <p className="mb-4">
                Find the perfect campground for your next adventure, View Campgrounds on maps.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_OKaMUyivk6YaqLIso8eP1UD77Oyk-C59Q&s"
                alt="Campground"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="map"
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400 transition duration-200"
              >
                Open Map
              </NavLink>
            </div>

            {/* Add a New Campground */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaPlusCircle className="text-lime-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-lime-300 mb-4">Add a New Campground</h2>
              <p className="mb-4">
                Share your favorite camping spots with the community and help others plan their trip.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUCKV6_HVsRKpzpHNdMtxy-JGQJU8xp49GA&s"
                alt="Campground"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="newcampground"
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400 transition duration-200"
              >
                Add Campground
              </NavLink>
            </div>

            {/* View All Camp Experiences */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaComments className="text-lime-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-lime-300 mb-4">View All Camp Experiences</h2>
              <p className="mb-4">Read posts shared by fellow YelpCamp users to learn about different campsites.</p>
              <img
                src="https://i.ytimg.com/vi/wF_lsScEArw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBJDQwsd-lfC3bnFmgS5gcw4ByTng"
                alt="Camp Experiences"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="viewposts"
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400 transition duration-200"
              >
                View Posts
              </NavLink>
            </div>

            {/* Search a Friend */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaUsers className="text-lime-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-lime-300 mb-4">Search a Friend</h2>
              <p className="mb-4">Search and connect with other YelpCamp users to share tips and plan trips together.</p>
              <img
                src="https://media.assettype.com/bloombergquint%2F2023-06%2F741f8544-ad5e-46d3-bd19-95a52e3ac068%2Fchang_duong_Sj0iMtq_Z4w_unsplash.jpg?auto=format%2Ccompress&w=576"
                alt="Friends"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="userlist"
                className="inline-block mt-4 p-2 bg-lime-300 text-gray-800 font-bold rounded hover:bg-lime-400 transition duration-200"
              >
                Search Friend
              </NavLink>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-900 text-white p-6 rounded-lg font-sans">
  <h2 className="text-lime-300 font-bold text-2xl mb-4">Essential Camping Tips</h2>

  <ul className="list-none p-0">
    <li className="mb-4">
      <span className="text-lime-300 font-bold">1. Pack the Right Gear:</span>
      <p className="text-white">
        Bring a durable tent, appropriate sleeping bags, and sleeping pads for comfort and insulation. Don’t forget essential tools like a <strong>multi-tool</strong>, <strong>flashlight</strong>, <strong>portable stove</strong>, and a <strong>first aid kit</strong>.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">2. Plan Your Meals:</span>
      <p className="text-white">
        Prepare easy-to-cook meals and pack enough non-perishable food. Use lightweight camping cookware, and always pack extra water or a portable water filter.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">3. Dress in Layers:</span>
      <p className="text-white">
        Weather can be unpredictable, so <em>pack layers of clothing</em> that can keep you warm, dry, and comfortable. Opt for <em>moisture-wicking</em> and <em>quick-drying fabrics</em>.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">4. Know the Weather:</span>
      <p className="text-white">
        Check the weather forecast before leaving, and be prepared for sudden changes. Always bring a <strong>waterproof jacket</strong> and a rain cover for your gear.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">5. Respect Wildlife:</span>
      <p className="text-white">
        Maintain a safe distance from animals and never feed them. Secure your food and trash in bear-proof containers or hung out of reach.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">6. Practice Campfire Safety:</span>
      <p className="text-white">
        Build campfires only in designated areas and keep them small. Never leave a fire unattended, and ensure it’s completely extinguished before leaving.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">7. Leave No Trace:</span>
      <p className="text-white">
        <em>Carry out everything you bring in.</em> Pack out all trash, including food scraps. Avoid damaging plants and respect the campsite to preserve it for others.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">8. Choose the Right Campsite:</span>
      <p className="text-white">
        Look for established campsites whenever possible to reduce environmental impact. Set up your tent on flat ground, away from water sources to avoid flooding risks.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">9. Stay Safe:</span>
      <p className="text-white">
        Always inform someone of your camping location and expected return time. Carry a map, compass, or GPS, and know how to use them in case of emergency.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">10. Be Mindful of Wildlife Habits:</span>
      <p className="text-white">
        Camp during appropriate times to avoid disrupting local wildlife routines, especially in the early morning or evening when animals are most active.
      </p>
    </li>
  </ul>
</div>

<div className="bg-gray-900 text-white p-6 rounded-lg font-sans">
  <h2 className="text-lime-300 font-bold text-2xl mb-4">Community Contributions</h2>

  <ul className="list-none p-0">
    <li className="mb-4">
      <span className="text-lime-300 font-bold">1. Share Your Experiences:</span>
      <p className="text-white">
        Your camping adventures can help others discover hidden gems. Share detailed reviews and personal stories to provide valuable insights into various campgrounds, including what to expect and how to prepare.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">2. Upload Photos:</span>
      <p className="text-white">
        A picture is worth a thousand words! Contribute photos of your camping trips to give fellow campers a glimpse of the scenery, facilities, and overall atmosphere of each campground.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">3. Rate Campgrounds:</span>
      <p className="text-white">
        Help fellow campers by providing ratings based on your experiences. A simple star rating system allows users to quickly gauge the quality of a campground before deciding to visit.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">4. Provide Helpful Tips:</span>
      <p className="text-white">
        Share useful tips and tricks that you’ve learned along the way. Whether it's advice on gear, local regulations, or best practices for campfire safety, your insights can make a big difference for others.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">5. Engage with the Community:</span>
      <p className="text-white">
        Participate in discussions and forums within the YelpCamp community. Ask questions, share advice, and connect with fellow campers to build friendships and enhance your outdoor experience.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">6. Report Updates:</span>
      <p className="text-white">
        If you notice any changes at a campground, such as new facilities or closures, report these updates to keep the community informed. Accurate and timely information is essential for safe and enjoyable camping.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">7. Organize Group Trips:</span>
      <p className="text-white">
        Collaborate with other users to organize group camping trips. Sharing the experience with others not only enhances the fun but also promotes safety in numbers while exploring the great outdoors.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">8. Mentor New Campers:</span>
      <p className="text-white">
        If you're an experienced camper, consider mentoring those new to the camping scene. Sharing your knowledge and experience can help beginners feel more confident and prepared for their adventures.
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">9. Foster Inclusivity:</span>
      <p className="text-white">
        Encourage diversity and inclusivity within the camping community. Make it a welcoming space for everyone, regardless of their background or level of experience. Everyone deserves to enjoy nature!
      </p>
    </li>

    <li className="mb-4">
      <span className="text-lime-300 font-bold">10. Celebrate the Community:</span>
      <p className="text-white">
        Celebrate the contributions of fellow campers by recognizing their posts and achievements. Share appreciation for their insights and experiences to foster a positive and encouraging environment.
      </p>
    </li>
  </ul>
</div>

          </section>
        </div>
      )}
    </>
  );
}

export default App;
